import os
from dotenv import load_dotenv

load_dotenv()

class Config:
    GEMINI_API_KEY = os.getenv("GEMINI_API_KEY")
    PORT = int(os.getenv("PORT", 5001))
    HOST = os.getenv("HOST", "127.0.0.1")
    DEBUG = os.getenv("FLASK_DEBUG", "False").lower() == "true"
