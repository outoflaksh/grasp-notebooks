from fastapi import FastAPI, Request
from fastapi.middleware.cors import CORSMiddleware
from pydantic import BaseModel
from pprint import pprint
from main import run_sql_query

app = FastAPI(debug=True)

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

    return {
        "result": result[1],
        "status": result[0]
        }

@app.post("/save")
def save(new_notebook: list):
    global notebook
    notebook = new_notebook
    print("saving\n",notebook)
    return {"result":"saved"}


@app.get("/notebook")
def notebook():
    print("getting\n",notebook)
    return {"notebook":notebook}