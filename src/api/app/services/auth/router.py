from fastapi import APIRouter, Body, HTTPException, status

from .models import Credentials, Token
from .utils import authenticate_user, create_access_token

router = APIRouter(prefix="/auth", tags=["auth"])


@router.post(
    "", response_model=Token, response_description="Get the auth token for user."
)
async def get_token(credentials: Credentials = Body(...)):
    user = await authenticate_user(credentials.username, credentials.password)

    if not user:
        raise HTTPException(
            status_code=status.HTTP_401_UNAUTHORIZED,
            detail="Incorrect username or password",
            headers={"WWW-Authenticate": "Bearer"},
        )

    access_token = create_access_token(
        data={
            "user_metadata": {
                "id": str(user.id),
                "username": user.username,
            }
        }
    )
    return Token(access_token=access_token)
