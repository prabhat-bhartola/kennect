import os

from dotenv import load_dotenv

load_dotenv(os.path.join(os.path.dirname(__file__), ".env"))


class KennectConfig:
    MONGO_URL: str = os.getenv("MONGO_URL", "")
