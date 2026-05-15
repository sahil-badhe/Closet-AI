import os
import requests
import logging

logger = logging.getLogger(__name__)

class ShoppingService:
    def __init__(self):
        self.api_key = os.getenv("SERP_API_KEY")
        self.base_url = "https://serpapi.com/search.json"

    def fetch_products(self, query):
        """
        Fetches live products from Google Shopping via SerpAPI.
        """
        if not self.api_key:
            logger.error("SERP_API_KEY missing")
            return []

        params = {
            "engine": "google_shopping",
            "q": query,
            "api_key": self.api_key,
            "google_domain": "google.co.in",
            "gl": "in",
            "hl": "en"
        }

        try:
            response = requests.get(self.base_url, params=params, timeout=15)
            response.raise_for_status()
            data = response.json()
            
            results = data.get("shopping_results", [])
            products = []

            for item in results[:20]:  # Support up to 20 products
                products.append({
                    "productId": item.get("product_id") or item.get("position"),
                    "name": item.get("title"),
                    "price": item.get("price"),
                    "image_url": item.get("thumbnail"),
                    "detail_url": item.get("link"),
                    "source": item.get("source"),
                    "rating": item.get("rating", 0),
                    "reviews": item.get("reviews", 0),
                    "category": "Fashion", # Default as SerpAPI doesn't always provide this
                    "style_reason": "Recommended for your selected style preferences."
                })
            
            return products

        except Exception as e:
            logger.error(f"SerpAPI Error: {str(e)}")
            return []
