from uuid import UUID

from app.common.models import CustomBaseModel, UserMin
from beanie import Document
from pydantic import BaseModel


class CommentBase(BaseModel):
    content: str
    post_id: str  # using UUID giving error here, Will fix later


class Comment(CustomBaseModel, CommentBase, Document):
    user: UserMin

    class Settings:
        name = "Comments"

    class Config:
        json_encoders = {UUID: str}
        schema_extra = {
            "example": {
                "_id": "3bfd4cd2-6413-4abb-b00a-442f21f8e0d8",
                "content": "This is my first comment!",
                "user": {
                    "id": "f054e9ef-4a64-4d3e-ae9b-005792cc54e6",
                    "username": "prabhat1811",
                },
                "post_id": "c123980b-967b-4437-8d10-8778d84cb0ca",
                "created_at": "2023-11-23T04:34:45.803548",
            }
        }


class CommentIn(CommentBase):
    class Config:
        json_encoders = {UUID: str}
        schema_extra = {
            "example": {
                "content": "This is my first comment!",
                "post_id": "76a8a9d5-860e-42a5-bee9-43a2d4ebee16",
            }
        }
