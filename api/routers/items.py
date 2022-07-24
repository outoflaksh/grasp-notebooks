from fastapi import APIRouter, Depends, HTTPException

from . import auth
from ..utils.token_utils import decode_access_token, oauth2_scheme
from ..utils.users_utils import get_current_user, get_user

router = APIRouter()

items = ["apple", "mango", "banana"]


@router.get("/")
def read_items(curr_user: str = Depends(get_current_user)):
    if not get_user(curr_user.username, auth.users_db):
        raise HTTPException(status_code=401, detail="Not authorized")

    return {"results": items}
