from fastapi import Depends
from passlib.context import CryptContext

from ..models import UserInDB
from .token_utils import decode_access_token, oauth2_scheme


def hash_password(password: str):
    passwd_context = CryptContext(schemes=["bcrypt"], deprecated="auto")

    return passwd_context.hash(password)


def verify_hash(password_input, hashed_password):
    passwd_context = CryptContext(schemes=["bcrypt"], deprecated="auto")

    return passwd_context.verify(password_input, hashed_password)


def get_user(username: str, db):
    for user in db:
        if user["username"] == username:
            return UserInDB(**user)
    return None


def verify_user(form_data, db):
    user = get_user(form_data.username, db)

    if user:
        password_input = form_data.password
        hashed_password = user.hashed_password

        if verify_hash(password_input, hashed_password):
            return user


def get_current_user(token: str = Depends(oauth2_scheme)):
    return decode_access_token(token)
