from flask import Flask, request, jsonify
from flask_cors import CORS
import requests
import json
import traceback
import csv
from datetime import datetime
import os
from dotenv import load_dotenv

load_dotenv()

app = Flask(__name__)

# =========================
# CORS
# =========================
CORS(app)

# =========================
# ENV VARIABLES
# =========================
GEMINI_API_KEY = os.getenv("GEMINI_API_KEY")
SERP_API_KEY = os.getenv("SERP_API_KEY")

# =========================
# UTILITIES
# =========================
def log_to_file(message):
    with open("server_log.txt", "a", encoding="utf-8") as f:
        timestamp = datetime.now().strftime("%Y-%m-%d %H:%M:%S")
        f.write(f"[{timestamp}] {message}\n")


def save_to_csv(data):

    filename = "clothing_data.csv"

    fieldnames = [
        "timestamp",
        "name",
        "price",
        "image_url",
        "source",
        "link"
    ]

    try:

        with open(filename, "a", newline="", encoding="utf-8") as csvfile:

            writer = csv.DictWriter(csvfile, fieldnames=fieldnames)

            if csvfile.tell() == 0:
                writer.writeheader()

            timestamp = datetime.now().strftime("%Y-%m-%d %H:%M:%S")

            for product in data:

                writer.writerow({
                    "timestamp": timestamp,
                    "name": product.get("name", ""),
                    "price": product.get("price", ""),
                    "image_url": product.get("image_url", ""),
                    "source": product.get("source", ""),
                    "link": product.get("detail_url", "")
                })

    except Exception as e:
        log_to_file(f"CSV Save Error: {str(e)}")


# =========================
# AGE GROUP
# =========================
def get_age_group(age, gender):

    gender = gender.lower()

    if age <= 12:
        return f"child {gender}"

    elif age <= 19:
        return f"teenage {gender}"

    elif age <= 35:
        return f"young adult {gender}"

    elif age <= 55:
        return f"middle-aged {gender}"

    else:
        return f"elderly {gender}"


# =========================
# GEMINI QUERY GENERATOR
# =========================
def generate_search_query(gender, age, skin_tone, style, season):

    age_group = get_age_group(age, gender)

    prompt = f"""
Generate ONLY one fashion shopping search query.

User Details:
- Gender: {gender}
- Age Group: {age_group}
- Skin Tone: {skin_tone}
- Season: {season}
- Fashion Style: {style}

Rules:
- Make query optimized for shopping websites
- Include trending fashion keywords
- Include outfit related keywords
- Keep it short
- Return only the query text
"""

    url = f"https://generativelanguage.googleapis.com/v1beta/models/gemini-2.0-flash:generateContent?key={GEMINI_API_KEY}"

    headers = {
        "Content-Type": "application/json"
    }

    payload = {
        "contents": [
            {
                "parts": [
                    {
                        "text": prompt
                    }
                ]
            }
        ]
    }

    response = requests.post(
        url,
        headers=headers,
        data=json.dumps(payload)
    )

    response_json = response.json()

    try:

        query = response_json['candidates'][0]['content']['parts'][0]['text']

        return query.strip().replace('"', '')

    except:

        return f"{gender} {season} {style} outfit fashion"


# =========================
# SERPAPI SHOPPING
# =========================
def fetch_products_from_serpapi(query):

    url = "https://serpapi.com/search.json"

    params = {
        "engine": "google_shopping",
        "q": query,
        "api_key": SERP_API_KEY,
        "google_domain": "google.com",
        "gl": "in",
        "hl": "en",
        "num": 20
    }

    response = requests.get(url, params=params)

    print("SERP STATUS:", response.status_code)
    print("SERP RESPONSE:", response.text)

    data = response.json()

    shopping_results = data.get("shopping_results", [])

    products = []

    for item in shopping_results:

        product = {

            "productId": item.get("product_id", ""),

            "name": item.get("title", "Fashion Product"),

            "price": item.get("price", "₹1999"),

            "image_url": item.get("thumbnail", ""),

            "detail_url": item.get("link", "https://www.myntra.com/"),

            "source": item.get("source", "Google Shopping"),

            "rating": item.get("rating", 4.5),

            "reviews": item.get("reviews", 100),

            "delivery": item.get("delivery", "Free Delivery"),

            "recommendation_reason":
                f"Recommended because it matches your fashion style."
        }

        products.append(product)

    # =========================
    # FALLBACK PRODUCTS
    # =========================
    if len(products) == 0:

        products = [

            {
                "productId": "1",
                "name": "Classic Casual Outfit",
                "price": "₹1999",
                "image_url": "https://images.unsplash.com/photo-1500648767791-00dcc994a43b",
                "detail_url": "https://www.myntra.com/",
                "source": "Myntra",
                "rating": 4.5,
                "reviews": 120,
                "delivery": "Free Delivery",
                "recommendation_reason": "Perfect for casual everyday styling."
            },

            {
                "productId": "2",
                "name": "Modern Streetwear Style",
                "price": "₹2499",
                "image_url": "https://images.unsplash.com/photo-1496747611176-843222e1e57c",
                "detail_url": "https://www.amazon.in/",
                "source": "Amazon",
                "rating": 4.7,
                "reviews": 220,
                "delivery": "Free Delivery",
                "recommendation_reason": "Trending Gen-Z streetwear fashion."
            },

            {
                "productId": "3",
                "name": "Minimal Fashion Collection",
                "price": "₹1799",
                "image_url": "https://images.unsplash.com/photo-1529139574466-a303027c1d8b",
                "detail_url": "https://www.flipkart.com/",
                "source": "Flipkart",
                "rating": 4.4,
                "reviews": 180,
                "delivery": "Free Delivery",
                "recommendation_reason": "Minimal modern fashion collection."
            },

            {
                "productId": "4",
                "name": "Vintage Outfit Combo",
                "price": "₹2999",
                "image_url": "https://images.unsplash.com/photo-1483985988355-763728e1935b",
                "detail_url": "https://www.ajio.com/",
                "source": "Ajio",
                "rating": 4.8,
                "reviews": 310,
                "delivery": "Free Delivery",
                "recommendation_reason": "Vintage aesthetic inspired styling."
            }
        ]

    return products


# =========================
# ROOT ROUTE
# =========================
@app.route('/')
def home():

    return jsonify({
        "status": "success",
        "message": "Closet AI Backend Running"
    })


# =========================
# MAIN API
# =========================
@app.route('/api/recommendations', methods=['POST'])
def get_recommendations():

    try:

        data = request.json

        gender = data.get("gender", "men")

        age_group = data.get("age", "25")

        skin_tone = data.get("skinTone", "fair")

        season = data.get("season", "summer")

        styles = data.get("styles", ["casual"])

        import re

        numbers = re.findall(r'\d+', str(age_group))

        age = int(numbers[0]) if numbers else 25

        style = styles[0] if styles else "casual"

        # =========================
        # GENERATE GEMINI QUERY
        # =========================
        search_query = generate_search_query(
            gender,
            age,
            skin_tone,
            style,
            season
        )

        print("SEARCH QUERY:", search_query)

        log_to_file(f"Generated Query: {search_query}")

        # =========================
        # FETCH PRODUCTS
        # =========================
        products = fetch_products_from_serpapi(search_query)

        save_to_csv(products)

        return jsonify({

            "success": True,

            "query": search_query,

            "total_products": len(products),

            "products": products
        })

    except Exception as e:

        traceback.print_exc()

        log_to_file(str(e))

        return jsonify({

            "success": False,

            "error": str(e)

        }), 500


# =========================
# START SERVER
# =========================
if __name__ == "__main__":

    port = int(os.environ.get("PORT", 5001))

    app.run(
        host="0.0.0.0",
        port=port,
        debug=False
    )