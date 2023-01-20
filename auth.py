import os
from dotenv import load_dotenv
from werkzeug.security import check_password_hash

# Load env
load_dotenv(".env")
USER = os.getenv("BASIC_AUTH_APP_USER")
PASSWORD_HASH = os.getenv("PASSWORD_HASH")

def check_password(username, password):
    if username == USER:
        return check_password_hash(PASSWORD_HASH, password)
    return False