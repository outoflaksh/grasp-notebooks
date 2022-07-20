import os
from sqlalchemy import create_engine, text
from sqlalchemy.exc import OperationalError, ResourceClosedError
from dotenv import load_dotenv

load_dotenv()


def get_conn_obj(DATABASE_URL: str = os.environ.get("DATABASE_URL")):

    engine = create_engine(os.environ.get("DATABASE_URL"))

    conn = engine.connect()

    return conn


def run_sql_query(query: str):
    conn = get_conn_obj()

    try:
        result = conn.execute(query)
        conn.close()

        return [True, list(result)]
    except ResourceClosedError as err:
        return [False, ["Ran successfully"]]
    except Exception as err:
        return [False, [str(err)]]
