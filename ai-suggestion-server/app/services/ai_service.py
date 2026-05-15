import google.generativeai as genai
import json
import logging
from app.config import Config

# Configure logging
logging.basicConfig(level=logging.INFO)
logger = logging.getLogger(__name__)

class AIService:
    def __init__(self):
        if not Config.GEMINI_API_KEY:
            logger.error("GEMINI_API_KEY is not set in Config")
            raise ValueError("GEMINI_API_KEY is required")
        
        genai.configure(api_key=Config.GEMINI_API_KEY)
        self.model = genai.GenerativeModel('gemini-1.5-flash')

    def generate_recommendations(self, preferences):
        """
        Generates 8 fashion recommendations based on user preferences.
        """
        prompt = f"""
        You are a world-class professional fashion stylist. 
        Generate 8 high-end fashion recommendations for a user with the following preferences:
        - Gender: {preferences.get('gender')}
        - Season: {preferences.get('season')}
        - Style: {preferences.get('style')}
        - Occasion: {preferences.get('occasion')}
        - Preferred Colors: {preferences.get('colors', 'any colors')}

        For each item, return a JSON object with:
        - productId: unique string (e.g., 'prod-101')
        - name: Realistic, catchy fashion item name
        - description: Elegant and stylish description
        - price: Estimated price in INR (e.g., '₹3,499')
        - category: (e.g., 'Outerwear', 'Footwear', 'Accessories', etc.)
        - style_reason: A brief, persuasive explanation of why this matches the user's selected style and attributes.
        - keywords: 3-4 keywords for image searching (e.g., 'vintage wool coat navy')

        Return the result ONLY as a valid JSON array of objects. No markdown, no extra text.
        """

        try:
            response = self.model.generate_content(prompt)
            # Remove markdown code block markers if present
            content = response.text.strip()
            if content.startswith("```json"):
                content = content[7:-3]
            elif content.startswith("```"):
                content = content[3:-3]
            
            recommendations = json.loads(content)
            
            # Add dynamic image URLs (will be enhanced by image_service)
            for rec in recommendations:
                keywords = "+".join(rec.get('keywords', ['fashion']))
                rec['image_url'] = f"https://source.unsplash.com/featured/800x1200/?fashion,{keywords}"
                rec['detail_url'] = f"https://www.google.com/search?q={rec['name'].replace(' ', '+')}+buy"
                
            return recommendations

        except Exception as e:
            logger.error(f"Error generating recommendations: {str(e)}")
            return []
