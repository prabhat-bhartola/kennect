from app.common.common import verify_password
from app.common.models import User
from fastapi import Security
from fastapi.security import HTTPAuthorizationCredentials, HTTPBearer
from jose import JWTError, jwt
from pydantic import SecretStr

from .models import CurrentUser

security = HTTPBearer()


def current_user_from_token(token):
    try:
        payload = jwt.decode(token, key="")
    except JWTError:
        raise ValueError("Invalid JWT!")
    return CurrentUser.from_token(payload)


def get_current_user(
    credentials: HTTPAuthorizationCredentials = Security(security),
) -> CurrentUser:
    return current_user_from_token(credentials.credentials)


async def authenticate_user(username: str, password: SecretStr):
    search_criteria = {"username": username}

    user: User = await User.find_one(search_criteria)

    if not user:
        return False
    if not verify_password(
        password.get_secret_value(), user.password.get_secret_value()
    ):
        return False
    return user


def create_access_token(data: dict):
    to_encode = data.copy()
    encoded_jwt = jwt.encode(to_encode, key="")

    return encoded_jwt
