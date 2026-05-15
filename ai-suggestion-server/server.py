from flask import Flask, request, jsonify
from flask_cors import CORS
from serpapi import GoogleSearch
import google.generativeai as genai
import os

app = Flask(__name__)

# ---------------- CORS ----------------
CORS(app)

# ---------------- API KEYS ----------------
SERP_API_KEY = os.getenv("SERPAPI_KEY")
GEMINI_API_KEY = os.getenv("GEMINI_API_KEY")

# ---------------- GEMINI CONFIG ----------------
genai.configure(api_key=GEMINI_API_KEY)

# ---------------- HOME ROUTE ----------------
@app.route("/")
def home():
    return jsonify({
        "message": "Closet AI Backend Running Successfully"
    })

# ---------------- RECOMMENDATION ROUTE ----------------
@app.route("/api/recommendations", methods=["POST"])
def get_recommendations():

    try:
        data = request.json

        # ---------------- FRONTEND DATA ----------------
        gender = data.get("gender", "")
        style = data.get("style", "")
        season = data.get("season", "")
        occasion = data.get("occasion", "")
        color = data.get("color", "")

        # ---------------- GEMINI QUERY ----------------
        prompt = f"""
        Generate a trendy shopping search query for fashion products.

        User Details:
        Gender: {gender}
        Style: {style}
        Season: {season}
        Occasion: {occasion}
        Color Preference: {color}

        Rules:
        - Generate only one shopping query
        - Make it modern and fashion focused
        - Do not explain anything
        """

        model = genai.GenerativeModel("gemini-1.5-flash")

        response = model.generate_content(prompt)

        search_query = response.text.strip()

        print("Generated Query:", search_query)

        # ---------------- MULTIPLE SERP SEARCHES ----------------
        queries = [
            search_query,
            f"{search_query} outfits",
            f"{search_query} fashion",
            f"{search_query} streetwear",
            f"{search_query} clothing",
            f"{search_query} aesthetic",
            f"{search_query} trendy"
        ]

        all_products = []

        for q in queries:

            print("Searching:", q)

            params = {
                "engine": "google_shopping",
                "q": q,
                "api_key": SERP_API_KEY,
                "num": 25
            }

            search = GoogleSearch(params)

            results = search.get_dict()

            shopping_results = results.get("shopping_results", [])

            print("Products Found:", len(shopping_results))

            for item in shopping_results:

                product = {
                    "title": item.get("title", "Fashion Product"),
                    "price": item.get("price", "₹1999"),
                    "image": item.get("thumbnail", ""),
                    "link": item.get("link", "#"),
                    "source": item.get("source", "Online Store")
                }

                # ---------------- REMOVE EMPTY IMAGES ----------------
                if product["image"] != "":
                    all_products.append(product)

        # ---------------- REMOVE DUPLICATES ----------------
        unique_products = []

        seen_titles = set()

        for product in all_products:

            if product["title"] not in seen_titles:

                seen_titles.add(product["title"])

                unique_products.append(product)

        print("FINAL PRODUCTS:", len(unique_products))

        # ---------------- RETURN PRODUCTS ----------------
        return jsonify(unique_products)

    except Exception as e:

        print("SERVER ERROR:")
        print(str(e))

        return jsonify({
            "error": str(e)
        }), 500


# ---------------- RUN SERVER ----------------
if __name__ == "__main__":
    app.run(host="0.0.0.0", port=5000)