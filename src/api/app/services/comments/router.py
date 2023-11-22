from typing import List, Optional
from uuid import UUID

from app.common.common import uid
from app.common.models import UserMin
from app.config import KennectConfig
from app.services.auth.models import CurrentUser
from app.services.auth.utils import get_current_user
from app.services.posts.utils import get_post_by_id
from beanie import init_beanie
from fastapi import APIRouter, Body, Depends, HTTPException, status
from motor.motor_asyncio import AsyncIOMotorClient
from pymongo import DESCENDING

from .models import Comment, CommentIn

router = APIRouter(prefix="/comments", tags=["comment"])


@router.on_event("startup")
async def startup():
    db_client = AsyncIOMotorClient(KennectConfig.MONGO_URL)
    await init_beanie(database=db_client["kennect"], document_models=[Comment])


@router.get(
    "/{post_id}",
    response_model=List[Comment],
    response_description="Get all Comments.",
)
async def get_all_comments_for_post(
    post_id: UUID,
    limit: int = 25,
    skip: int = 0,
    current_user: CurrentUser = Depends(get_current_user),
):
    search_criteria = {"post_id": uid(post_id)}

    all_comments = (
        await Comment.find(search_criteria).sort([(Comment.created_at, DESCENDING)])
        # Will need for pagination
        # .skip(skip)
        # .limit(limit)
        .to_list()
    )

    return all_comments


@router.post("", response_model=Comment, response_description="Create a new comment.")
async def create_comment(
    comment_data: CommentIn = Body(...),
    current_user: CurrentUser = Depends(get_current_user),
):
    # Check if post exists or not
    if not await get_post_by_id(comment_data.post_id):
        raise HTTPException(
            status_code=status.HTTP_404_NOT_FOUND,
            detail="Post not found",
        )

    user_min = UserMin(id=current_user.id, username=current_user.username)

    new_comment = Comment(
        content=comment_data.content, post_id=comment_data.post_id, user=user_min
    )
    comment: Optional[Comment] = await Comment.insert_one(new_comment)

    if comment is None:
        raise HTTPException(
            status_code=status.HTTP_500_INTERNAL_SERVER_ERROR,
            detail="Internal Server Error",
        )

    return comment
