import pickle
import pathlib

BASE_DIR = pathlib.Path(__file__).parent.parent
UPLOAD_DIR = BASE_DIR / "uploads"

print(UPLOAD_DIR)


def save_nb_data(nb_data: list, nb_id: str):
    UPLOAD_DIR.mkdir(exist_ok=True)

    upload_path = UPLOAD_DIR / f"{nb_id}.pkl"
    with open(upload_path, "wb") as f:
        pickle.dump(nb_data, f)

    print("Saved successfully")
    return str(upload_path)


def load_saved_nb_data(nb_id: str):
    upload_path = UPLOAD_DIR / f"{nb_id}.pkl"
    with open(upload_path, "rb") as f:
        data = pickle.load(f)

    print("Retrieved data:", data)

    return data
