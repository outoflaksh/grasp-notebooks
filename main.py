import os
from sqlalchemy import create_engine, text
from sqlalchemy.exc import OperationalError
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
        return list(result)

    except Exception as err:
        return [str(err.orig), str(err.statement)]


# names = ["michael", "jim", "dwight", "pam"]


# for name in names:
#     conn.execute(text(f"INSERT INTO {table_name} VALUES('{name}', '{len(name)*5}');"))

# try:
#     result = conn.execute(text(f"SELECT * FRO {table_name};"))

#     print(list(result))

#     for i in result:
#         print(i)
# except OperationalError as err:
#     print(f"Error: {str(err.orig)}\nat statement: {err.statement}")

# conn.close()
# connection = MySQLdb.connect(
#     host=os.getenv("HOST"),
#     user=os.getenv("USERNAME"),
#     passwd=os.getenv("PASSWORD"),
#     db=os.getenv("DATABASE"),
#     ssl_mode="VERIFY_IDENTITY",
#     ssl={"ca": "/etc/ssl/cert.pem"},
# )
