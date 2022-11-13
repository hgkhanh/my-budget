import os
from deta import Deta
import pandas as pd

# Load env
if not os.environ.get('production'):
    from dotenv import load_dotenv
    load_dotenv(".env")

DETA_KEY = os.getenv("DETA_KEY")
DETA_BASE = os.getenv("DETA_BASE")

# Init
deta = Deta(DETA_KEY)

# Connect db
db = deta.Base(DETA_BASE)


def insert_row(amount, real_amount, category, account, date, transfer_type, comment):
    """Returns the report on a successful creation, otherwise raises an error"""
    return db.put({
        "category": category, "transfer_type": transfer_type,
        "amount": amount, "real_amount": real_amount, "account": account,
        "date": date, "comment": comment
    })

def pre_process_data(df):
    # Add year column
    df["year"] = pd.to_datetime(df["date"]).dt.year
    return df

def fetch_all():
    """Returns a dataframe of whole db"""
    res = db.fetch()
    df = pd.DataFrame(res.items)
    return pre_process_data(df)


def get_by_key(key):
    """If not found, the function will return None"""
    return db.get(key)
