from fastapi import FastAPI, Request
from fastapi.middleware.cors import CORSMiddleware
from pydantic import BaseModel

from .logic.sql_handler import run_sql_query
from .routers import items, auth

app = FastAPI(debug=True)

# Routers
app.include_router(items.router, prefix="/items", tags=["items (protected)"])
app.include_router(auth.router, prefix="/users", tags=["auth"])

notebook: list = None

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


@app.post("/save")
def save(new_notebook: list):
    global notebook
    notebook = new_notebook
    print("saving\n", notebook)
    return {"result": "saved"}


@app.get("/notebook")
def notebook():
    print("getting\n", notebook)
    return {"notebook": notebook}


@app.get("/healthcheck")
def health_check():
    return {"msg": "OK"}
