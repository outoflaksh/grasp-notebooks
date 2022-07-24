from pydantic import BaseModel
from typing import Union
from sqlalchemy import Boolean, Column, ForeignKey, String
from sqlalchemy.orm import relationship

from .database import Base


class UserDB(Base):
    __tablename__ = "users"

    username = Column(String, primary_key=True, index=True)
    email = Column(String, unique=True, index=True)
    name = Column(String)
    hashed_password = Column(String)
    is_active = Column(Boolean, default=True)

    notebooks = relationship("Notebook", back_populates="author")


class Notebook(Base):
    __tablename__ = "notebooks"

    id = Column(String, primary_key=True, index=True)
    name = Column(String, index=True)
    url = Column(String, index=True)
    author_username = Column(String, ForeignKey("users.username"))

    author = relationship("UserDB", back_populates="notebooks")


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


class NotebookRequest(BaseModel):
    id: str
    name: str
    data: list
    author_username: str
