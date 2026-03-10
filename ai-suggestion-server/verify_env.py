import os
from dotenv import load_dotenv

# Path to the .env file
dotenv_path = os.path.join(os.path.dirname(__file__), '.env')
load_dotenv(dotenv_path)

key = os.getenv("GEMINI_API_KEY")
if key:
    print(f"SUCCESS: GEMINI_API_KEY found: {key[:5]}...")
else:
    print("FAILURE: GEMINI_API_KEY not found in environment.")
