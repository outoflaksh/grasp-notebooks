from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware
from pydantic import BaseModel

from main import run_sql_query

app = FastAPI(debug=True)

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
