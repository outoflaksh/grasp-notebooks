from pydantic import BaseModel
from typing import Union


class Token(BaseModel):
    access_token: str
    token_type: str


class TokenData(BaseModel):
    username: Union[str, None] = None


class User(BaseModel):
    username: str
    email: str = None
    name: str = None


class SignupForm(User):
    username: str
    password: str


class UserInDB(User):
    hashed_password: str
