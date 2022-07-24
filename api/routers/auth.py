from datetime import timedelta
from fastapi import APIRouter, Depends, HTTPException
from fastapi.security import OAuth2PasswordBearer, OAuth2PasswordRequestForm

from ..utils.users_utils import get_user, verify_user, hash_password
from ..utils.token_utils import create_access_token

from ..models import User, UserInDB, SignupForm, Token

# Auth flow: username and password are sent once and then a token is returned,
# which then has to be included in the headers of any protected route

router = APIRouter()

ACCESS_TOKEN_EXPIRE_MINUTES = 30

users_db = [
    {
        "username": "user1",
        "email": "user@email.com",
        "name": "user1",
        "hashed_password": "$2b$12$bTuZG0mNK2ciF1U2viC1YOuiV6cG2FCIzd..wXMBfpqnQCYbzlm6q",
    }
]


@router.post("/register", status_code=201)
def create_user(form_data: SignupForm = Depends()):
    user = get_user(form_data.username, users_db)

    if user:
        raise HTTPException(status_code=400, detail="Username already in use!")

    # user doesn't already exist
    hashed_password = hash_password(form_data.password)
    user = UserInDB(
        username=form_data.username,
        name=form_data.name,
        email=form_data.email,
        hashed_password=hashed_password,
    )

    users_db.append(dict(user))

    return {"detail": "User created successfully!"}


@router.post("/login", response_model=Token)
def user_login(form_data: OAuth2PasswordRequestForm = Depends()):
    user = verify_user(form_data, users_db)

    if user is None:
        raise HTTPException(status_code=401, detail="Invalid username or password!")

    access_token_expires_delta = timedelta(minutes=ACCESS_TOKEN_EXPIRE_MINUTES)

    payload = {"sub": user.username}
    access_token = create_access_token(
        data=payload, expires_delta=access_token_expires_delta
    )

    return {"access_token": access_token, "token_type": "bearer"}
