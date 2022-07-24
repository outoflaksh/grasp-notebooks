import email
from fastapi import Depends, FastAPI, Request
from fastapi.middleware.cors import CORSMiddleware
from pydantic import BaseModel
from sqlalchemy.orm import Session

from .models import Base, UserDB
from .logic.sql_handler import run_sql_query
from .database import engine, get_db

from .routers import items, auth, notebook

app = FastAPI(debug=True)

# Routers
app.include_router(items.router, prefix="/items", tags=["items (protected)"])
app.include_router(auth.router, prefix="/users", tags=["auth"])
app.include_router(notebook.router, prefix="/nb", tags=["notebook"])

# Database setup
Base.metadata.create_all(bind=engine)


origins = ["*"]

app.add_middleware(
    CORSMiddleware,
    allow_origins=origins,
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)


class Query(BaseModel):
    query: str


@app.post("/run")
def run_query(query: Query):
    result = run_sql_query(query.query)

    return {"result": result[1], "status": result[0]}


@app.get("/healthcheck")
def health_check():
    return {"msg": "OK"}
