from uuid import UUID

from app.common.models import CustomBaseModel
from beanie import Indexed


class UserBase(CustomBaseModel):
    username: Indexed(str, unique=True)  # type: ignore

    class Config:
        json_encoders = {UUID: str}
        schema_extra = {
            "example": {
                "username": "prabhat1811",
            }
        }
