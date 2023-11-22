from uuid import UUID

from fastapi import HTTPException, status
from pydantic import BaseModel, SecretStr


class Token(BaseModel):
    access_token: str
    token_type: str = "bearer"


class Credentials(BaseModel):
    username: str
    password: SecretStr

    class Config:
        schema_extra = {
            "example": {
                "username": "prabhat1811",
                "password": "SecretStr",
            }
        }


class CurrentUser(BaseModel):
    id: str
    username: str

    @classmethod
    def from_token(cls, payload: dict):
        user_metadata = payload["user_metadata"]
        try:
            curr_user = cls(
                id=user_metadata["id"],
                username=user_metadata["username"],
            )

            return curr_user
        except:
            raise HTTPException(
                status_code=status.HTTP_403_FORBIDDEN,
                detail="Invalid authentication credentials",
            )

    class Config:
        json_encoders = {UUID: str}
