from uuid import UUID

from app.common.models import CustomBaseModel, UserMin
from beanie import Document
from pydantic import BaseModel


class Post(CustomBaseModel, Document):
    content: str
    user: UserMin

    class Settings:
        name = "Posts"

    class Config:
        json_encoders = {UUID: str}
        schema_extra = {
            "example": {
                "_id": "3bfd4cd2-6413-4abb-b00a-442f21f8e0d8",
                "content": "This is my first post!",
                "user": {
                    "id": "f054e9ef-4a64-4d3e-ae9b-005792cc54e6",
                    "username": "prabhat1811",
                },
                "created_at": "2023-11-23T04:34:45.803548",
            }
        }


class PostIn(BaseModel):
    content: str

    class Config:
        json_encoders = {UUID: str}
        schema_extra = {
            "example": {
                "content": "This is my first post!",
            }
        }
