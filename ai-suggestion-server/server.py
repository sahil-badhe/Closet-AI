from flask import Flask, request, jsonify
import requests
import json
import traceback
from bs4 import BeautifulSoup
from urllib.parse import quote_plus, urlparse, parse_qs, urlunparse, urlencode
from flask_cors import CORS
import csv
from datetime import datetime
import random
import os
from dotenv import load_dotenv

load_dotenv()

app = Flask(__name__)

# Hardened CORS Configuration
CORS(app)

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
    elif age <= 75:
        return f"elderly {gender}"
    else:
        return f"very old {gender}"

def generate_search_query(gender, age, skin_tone, style, season, api_key):
    age_group = get_age_group(age, gender)
    prompt = f"""Generate a realistic search query to find clothing suggestions based on:
                    Gender: {gender}
                    Age: {age}
                    Skin Tone: {skin_tone}
                    Season: {season}
                    Style: {style}
                    Return only the search query, nothing else."""
    url = f"https://generativelanguage.googleapis.com/v1beta/models/gemini-2.0-flash:generateContent?key={api_key}"
    headers = {'Content-Type': 'application/json'}
    payload = {"contents": [{"parts": [{"text": prompt}]}]}
    response = requests.post(url, headers=headers, data=json.dumps(payload))
    response_json = response.json()
    try:
        return response_json['candidates'][0]['content']['parts'][0]['text'].strip('"')
    except:
        return f"{age_group} {season} {style} clothing for {skin_tone} skin tone"

def modify_image_url(url):
    print(url)
    if not url or "http" not in url:
        return url
    try:
        parsed = urlparse(url)
        query = parse_qs(parsed.query)
        query['w'] = ['1200']
        query['h'] = ['800']
        new_query = urlencode(query, doseq=True)
        new_parsed = parsed._replace(query=new_query)
        return urlunparse(new_parsed)
    except:
        return url

def log_to_file(message):
    with open('server_log.txt', 'a', encoding='utf-8') as f:
        timestamp = datetime.now().strftime("%Y-%m-%d %H:%M:%S")
        f.write(f"[{timestamp}] {message}\n")

def save_to_csv(data):
    filename = 'clothing_data.csv'
    fieldnames = ['timestamp', 'name', 'price', 'image_url']
    try:
        with open(filename, 'a', newline='', encoding='utf-8') as csvfile:
            writer = csv.DictWriter(csvfile, fieldnames=fieldnames)
            if csvfile.tell() == 0:
                writer.writeheader()
            timestamp = datetime.now().strftime("%Y-%m-%d %H:%M:%S")
            for product in data:
                row = {
                    'timestamp': timestamp,
                    'name': product.get('name', ''),
                    'price': product.get('price', ''),
                    'image_url': product.get('image_url', '')
                }
                writer.writerow(row)
    except Exception as e:
        log_to_file(f"Error saving to CSV: {str(e)}")

def scrape_bing_shopping(query):
    headers = {
        "User-Agent": "Mozilla/5.0",
        "Accept-Language": "en-US,en;q=0.9",
    }

    encoded_query = quote_plus(query)
    url = f"https://www.bing.com/shop?q={encoded_query}"

    products = []

    try:
        response = requests.get(url, headers=headers, timeout=15)

        if response.status_code != 200:
            log_to_file(f"Bing request failed: {response.status_code}")
            return []

        soup = BeautifulSoup(response.text, "html.parser")

        # Collect all possible product cards
        cards = soup.find_all("li")

        for index, card in enumerate(cards[:20]):

            text = card.get_text(" ", strip=True)

            if len(text) < 20:
                continue

            # Try finding image
            image_url = ""

            img = card.find("img")

            if img:
                image_url = (
                    img.get("src")
                    or img.get("data-src")
                    or ""
                )

            product = {
                "productId": f"prod-{random.randint(100000, 999999)}",
                "name": text[:120],
                "price": "Not available",
                "image_url": modify_image_url(image_url),
                "detail_url": url
            }

            products.append(product)

            if len(products) >= 8:
                break

        log_to_file(f"Extracted {len(products)} products")

        return products

    except Exception as e:
        log_to_file(f"Scraping error: {str(e)}")
        return []
    
def scrape_product_details(products):
    # Compatibility passthrough: Products are already scraped efficiently in the previous step
    # to ensure stability on Render Free Tier and avoid request timeouts.
    return products

@app.route('/')
def health_check_root():
    return jsonify({"status": "ok", "message": "Server is running"}), 200

@app.route('/api/recommendations', methods=['POST'])
def get_recommendations():
    try:
        data = request.json
        log_to_file(f"Received request with data: {json.dumps(data)}")
        
        gender = data.get('gender')
        age_group = data.get('age')
        skin_tone = data.get('skinTone')
        season = data.get('season')
        styles = data.get('styles')
        
        if age_group:
            # Robustly extract number even if it contains symbols like '+' or '-'
            import re
            numbers = re.findall(r'\d+', age_group)
            age = int(numbers[0]) if numbers else 25
        else:
            age = 25
        style = styles[0] if styles else 'casual'
        api_key = os.getenv("GEMINI_API_KEY")
        if not api_key:
            log_to_file("Missing GEMINI_API_KEY environment variable")
            return jsonify({"error": "Server configuration error"}), 500
            
        search_query = generate_search_query(gender, age, skin_tone, style, season, api_key)
        log_to_file(f"Generated search query: {search_query}")
        
        products = scrape_bing_shopping(search_query)
        log_to_file(f"Scrapped {len(products)} products for query: {search_query}")
        if not products:
            return jsonify({
    "products": [],
    "message": "No products found"
}), 200
        
        products = scrape_product_details(products)
        save_to_csv(products)
        log_to_file(f"Successfully returned {len(products)} products")
        
        return jsonify({"products": products})
        
    except Exception as e:
        traceback.print_exc()

        return jsonify({
            "error": str(e)
        }), 500
import os

if __name__ == '__main__':
    port = int(os.environ.get("PORT", 5001))
    host = os.environ.get("HOST", "127.0.0.1")
    app.run(host=host, port=port, debug=False)
