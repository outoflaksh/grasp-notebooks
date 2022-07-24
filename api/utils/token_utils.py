import os
from datetime import datetime, time, timedelta
from typing import Union
from jose import jwt, JWTError
from fastapi import HTTPException
from fastapi.security import OAuth2PasswordBearer


# Env vars
from dotenv import load_dotenv

from ..models import TokenData

load_dotenv()


oauth2_scheme = OAuth2PasswordBearer(tokenUrl="users/login")

# Token config
SECRET_KEY = os.environ.get("SECRET_KEY")
ALGORITHM = "HS256"


def create_access_token(data: dict, expires_delta: Union[timedelta, None] = None):
    to_encode = data.copy()

    if expires_delta:
        expire = datetime.utcnow() + expires_delta
    else:
        expire = datetime.utcnow() + timedelta(minutes=15)

    to_encode.update({"exp": expire})

    access_token = jwt.encode(to_encode, SECRET_KEY, algorithm=ALGORITHM)

    return access_token


def decode_access_token(token: str):
    credential_exception = HTTPException(status_code=401, detail="Invalid credentials!")
    try:
        payload = jwt.decode(token, SECRET_KEY, algorithms=[ALGORITHM])

        username = payload.get("sub")
        if username is None:
            raise credential_exception

        token_data = TokenData(username=username)
    except JWTError:
        raise credential_exception

    return token_data
