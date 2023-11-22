from typing import Optional

from app.common.common import uid
from app.common.models import User
from app.config import KennectConfig
from app.services.auth.models import CurrentUser
from app.services.auth.utils import get_current_user
from beanie import init_beanie
from fastapi import APIRouter, Body, Depends, HTTPException, status
from motor.motor_asyncio import AsyncIOMotorClient
from pymongo.errors import DuplicateKeyError

from .models import UserBase

router = APIRouter(prefix="/users", tags=["user"])


@router.on_event("startup")
async def startup():
    db_client = AsyncIOMotorClient(KennectConfig.MONGO_URL)
    await init_beanie(database=db_client["kennect"], document_models=[User])


@router.get(
    "/{user_id}",
    response_model=UserBase,
    response_description="Search user document with id.",
)
async def get_user_by_id(
    user_id, current_user: CurrentUser = Depends(get_current_user)
):
    search_criteria = {"_id": uid(user_id)}

    user: Optional[UserBase] = await User.find_one(search_criteria)

    if not user:
        raise HTTPException(status_code=404, detail="User not found")
    return user


@router.post("", response_model=UserBase, response_description="Create a new user.")
async def create_user(user: User = Body(...)):
    user = User.set_default_values(user)

    try:
        result: Optional[UserBase] = await User.insert_one(user)
    except DuplicateKeyError as e:
        raise HTTPException(
            status_code=status.HTTP_422_UNPROCESSABLE_ENTITY,
            detail="User with username already exists",
        ) from e

    if result is None:
        raise HTTPException(
            status_code=status.HTTP_500_INTERNAL_SERVER_ERROR,
            detail="Internal Server Error",
        )

    return result
