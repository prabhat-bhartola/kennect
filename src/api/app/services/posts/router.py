from typing import List, Optional
from uuid import UUID

from app.common.common import uid
from app.common.models import UserMin
from app.config import KennectConfig
from app.services.auth.models import CurrentUser
from app.services.auth.utils import get_current_user
from beanie import init_beanie
from fastapi import APIRouter, Body, Depends, HTTPException, status
from motor.motor_asyncio import AsyncIOMotorClient
from pymongo import DESCENDING

from .models import Post, PostIn

router = APIRouter(prefix="/posts", tags=["post"])


@router.on_event("startup")
async def startup():
    db_client = AsyncIOMotorClient(KennectConfig.MONGO_URL)
    await init_beanie(database=db_client["kennect"], document_models=[Post])


@router.get(
    "/{post_id}",
    response_model=Post,
    response_description="Search post document with id.",
)
async def get_post_by_id(
    post_id: UUID, current_user: CurrentUser = Depends(get_current_user)
):
    search_criteria = {"_id": uid(post_id)}

    post: Optional[Post] = await Post.find_one(search_criteria)

    if not post:
        raise HTTPException(status_code=404, detail="Post not found")
    return post


@router.get(
    "",
    response_model=List[Post],
    response_description="Get all posts.",
)
async def get_all_posts(
    limit: int = 25,
    skip: int = 0,
    current_user: CurrentUser = Depends(get_current_user),
):
    all_posts = (
        await Post.find().sort([(Post.created_at, DESCENDING)])
        # Will need for pagination
        # .skip(skip)
        # .limit(limit)
        .to_list()
    )

    return all_posts


@router.post("", response_model=Post, response_description="Create a new post.")
async def create_post(
    post_data: PostIn = Body(...), current_user: CurrentUser = Depends(get_current_user)
):
    user_min = UserMin(id=current_user.id, username=current_user.username)

    new_post = Post(content=post_data.content, user=user_min)
    post: Optional[Post] = await Post.insert_one(new_post)

    if post is None:
        raise HTTPException(
            status_code=status.HTTP_500_INTERNAL_SERVER_ERROR,
            detail="Internal Server Error",
        )

    return post
