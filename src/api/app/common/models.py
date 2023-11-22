from datetime import datetime
from uuid import UUID, uuid4

from app.common.common import get_password_hash
from beanie import Document, Indexed
from pydantic import BaseModel, Field, SecretStr, validator


class CustomBaseModel(BaseModel):
    id: UUID = Field(default_factory=uuid4, alias="_id")
    created_at: datetime = Field(default_factory=lambda: datetime.now().isoformat())


class UserMin(BaseModel):
    id: UUID
    username: str


class User(CustomBaseModel, Document):
    username: Indexed(str, unique=True)  # type: ignore
    password: SecretStr

    @validator("password")
    def validate_password(cls, v):
        # Password must be atleast 8 characters long
        if len(v) < 8:
            raise ValueError("Password must be atleast 8 characters long.")
        return v

    def set_default_values(user):
        user.password = get_password_hash(user.password.get_secret_value())

        return user

    class Settings:
        name = "Users"

    class Config:
        json_encoders = {UUID: str}
        schema_extra = {
            "example": {
                "_id": "757dae17-966f-4e2f-ab71-64fd4a6b1c22",
                "username": "prabhat1811",
                "password": "SecretStr",
                "created_at": "2023-11-23T04:36:17.657105",
            }
        }
