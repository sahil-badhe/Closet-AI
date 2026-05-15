import google.generativeai as genai
import logging
from app.config import Config

logger = logging.getLogger(__name__)

class AIService:
    def __init__(self):
        if not Config.GEMINI_API_KEY:
            raise ValueError("GEMINI_API_KEY is required")
        genai.configure(api_key=Config.GEMINI_API_KEY)
        self.model = genai.GenerativeModel('gemini-1.5-flash')

    def generate_search_query(self, prefs):
        """
        Translates user preferences into a clean, optimized shopping query.
        """
        gender = prefs.get('gender', 'unisex')
        age = prefs.get('age', 'adult')
        style = prefs.get('styles', ['casual'])[0]
        season = prefs.get('season', 'summer')
        colors = prefs.get('colors', 'fashionable colors')

        prompt = f"""
        Act as a professional fashion buyer. Create a highly optimized 5-8 word search query for Google Shopping.
        User Profile:
        - Gender: {gender}
        - Style: {style}
        - Season: {season}
        - Colors: {colors}
        - Target Age: {age}

        The query should be specific enough to find actual clothing items. 
        Example Output: "vintage oversized wool winter coat for men navy"
        Return ONLY the query string. No quotes, no explanation.
        """

        try:
            response = self.model.generate_content(prompt)
            query = response.text.strip().replace('"', '')
            logger.info(f"Generated Shopping Query: {query}")
            return query
        except Exception as e:
            logger.error(f"Gemini Query Error: {str(e)}")
            return f"{style} {season} fashion for {gender}"
