from fastapi import APIRouter, Depends, HTTPException

from ..models import Notebook

router = APIRouter()

notebooks = []


@router.post("/save", status_code=201)
def save_notebook(notebook: Notebook):
    notebooks.append(dict(notebook))

    return {"detail": "Notebook saved."}


@router.get("/{notebook_id}")
def read_notebook_by_id(notebook_id: str):
    for nb in notebooks:
        if nb["id"] == notebook_id:
            return nb

    raise HTTPException(
        status_code=404,
        detail="Requested notebook id not found!"
    )
