from fastapi import APIRouter, Depends, HTTPException
from sqlalchemy.orm import Session

from ..models import NotebookRequest, Notebook
from ..database import get_db
from ..utils.notebook_utils import save_nb_data, load_saved_nb_data

router = APIRouter()


@router.post("/save", status_code=201)
def save_notebook(notebook: NotebookRequest, db: Session = Depends(get_db)):
    nb_url = save_nb_data(nb_data=notebook.data, nb_id=notebook.id)

    notebook = {
        "id": notebook.id,
        "name": notebook.name,
        "url": nb_url,
        "author_username": notebook.author_username
    }

    notebook = Notebook(**notebook)

    db.add(notebook)
    db.commit()

    return {"detail": "Notebook saved"}


@router.get("/{notebook_id}")
def read_notebook_by_id(notebook_id: str, db: Session = Depends(get_db)):
    nb_result = db.query(Notebook).filter_by(id=notebook_id).first()

    if nb_result is None:
        raise HTTPException(
            status_code=404,
            detail="Requested notebook id not found!"
        )

    try:
        nb = {
            "id": nb_result.id,
            "name": nb_result.name,
            "data": load_saved_nb_data(notebook_id),
            "author_username": nb_result.author_username
        }

        return nb
    except:
        raise HTTPException(
            status_code=500,
            detail="Requested notebook not found on server!"
        )
