from flask import Flask, request, jsonify
import requests
import json
from selenium import webdriver
from selenium.webdriver.common.by import By
from selenium.webdriver.chrome.service import Service
from selenium.webdriver.chrome.options import Options
from selenium.webdriver.support.ui import WebDriverWait
from selenium.webdriver.support import expected_conditions as EC
from webdriver_manager.chrome import ChromeDriverManager
from urllib.parse import quote_plus, urlparse, parse_qs, urlunparse, urlencode
import time
from flask_cors import CORS
import csv
from datetime import datetime
import random

app = Flask(__name__)
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
    with open('server_log.txt', 'a') as f:
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
    chrome_options = Options()
    chrome_options.add_argument("--headless")
    chrome_options.add_argument("--disable-blink-features=AutomationControlled")
    chrome_options.add_argument("user-agent=Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/91.0.4472.124 Safari/537.36")
    service = Service(ChromeDriverManager().install())
    driver = webdriver.Chrome(service=service, options=chrome_options)
    product_urls = []
    seen_urls = set()
    
    try:
        encoded_query = quote_plus(query)
        bing_url = f"https://www.bing.com/shop?q={encoded_query}&FORM=SHOPTB"
        driver.get(bing_url)
        time.sleep(3)

        try:
            WebDriverWait(driver, 3).until(
                EC.element_to_be_clickable((By.XPATH, "//button[@id='bnp_btn_accept']"))
            ).click()
            time.sleep(1)
        except:
            pass

        product_links = driver.find_elements(By.XPATH, "//a[@aria-label='oboSnOptLink']")
        
        if not product_links:
            product_links = driver.find_elements(By.XPATH, "//a[@aria-label='Product details']")

        for link in product_links[:16]:  
            try:
                url = link.get_attribute("href")
                if url and url not in seen_urls:
                    seen_urls.add(url)
                    product_urls.append(url)
            except:
                continue

    except Exception as e:
        log_to_file(f"Error in scrape_bing_shopping: {str(e)}")
    finally:
        driver.quit()

    return product_urls
    
def scrape_product_details(product_urls):
    chrome_options = Options()
    chrome_options.add_argument("--headless")
    chrome_options.add_argument("user-agent=Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/91.0.4472.124 Safari/537.36")
    service = Service(ChromeDriverManager().install())
    driver = webdriver.Chrome(service=service, options=chrome_options)

    products = []

    for url in product_urls:
        product = {}
        try:
            driver.get(url)
            time.sleep(2) 

            try:
                name_element = WebDriverWait(driver, 5).until(
                    EC.presence_of_element_located((By.XPATH, "//h1[contains(@class, 'br-pdTtl')]"))
                )
                product['name'] = name_element.text
            except:
                product['name'] = "Not found"

            try:
                img_element = WebDriverWait(driver, 5).until(
                    EC.presence_of_element_located((By.XPATH, "//img[contains(@alt, 'Product Image') or contains(@alt, 'product image')]"))
                )
                original_img_url = img_element.get_attribute('src') or img_element.get_attribute('data-src')
                product['image_url'] = modify_image_url(original_img_url)
            except:
                product['image_url'] = "Not found"

            try:
                try:
                    price_meta = driver.find_element(By.XPATH, "//meta[@property='product:price:amount']")
                    product['price'] = price_meta.get_attribute('content')
                except:
                    try:
                        price_currency = driver.find_element(By.XPATH, "//span[contains(@class, 'br-oboSnDp')]//span[contains(@class, 'price-currency')]").text
                        price_integer = driver.find_element(By.XPATH, "//span[contains(@class, 'br-oboSnDp')]//span[contains(@class, 'price-integer')]").text
                        product['price'] = f"{price_currency}{price_integer}"
                    except:
                        price_selectors = [
                            "//div[contains(@class, 'price')]",
                            "//span[contains(@class, 'price')]",
                            "//div[contains(@class, 'product-price')]",
                            "//span[contains(@class, 'product-price')]",
                            "//div[contains(@class, 'p-price')]",
                            "//span[contains(@class, 'p-price')]"
                        ]
                        for selector in price_selectors:
                            try:
                                price_element = driver.find_element(By.XPATH, selector)
                                product['price'] = price_element.text.strip()
                                if product['price']:
                                    break
                            except:
                                continue
                        if 'price' not in product or not product['price']:
                            try:
                                price_text = driver.find_element(By.XPATH, "//*[contains(translate(text(), '0123456789', ''), '$₹€£')]")
                                product['price'] = price_text.text.strip()
                            except:
                                product['price'] = "Not available"
            except:
                product['price'] = "Not available"

            try:
                opt_link_element = driver.find_element(By.XPATH, "//a[contains(@class, 'br-oboSnOptLink')]")
                opt_link_href = opt_link_element.get_attribute("href")
                product['detail_url'] = opt_link_href
            except:
                print("Optional link not found")

            product['productId'] = f"prod-{random.randint(100000, 999999)}"
            products.append(product)

        except Exception as e:
            log_to_file(f"Error scraping product: {str(e)}")
            continue

    driver.quit()
    return products

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
        
        age = int(age_group.split('-')[0]) if age_group else 25
        style = styles[0] if styles else 'casual'
        api_key = "AIzaSyAhLFFeJUxSR9aZD_ilBDTkS-mhTYOt9Ds"
        
        search_query = generate_search_query(gender, age, skin_tone, style, season, api_key)
        log_to_file(f"Generated search query: {search_query}")
        
        products = scrape_bing_shopping(search_query)
        if not products:
            log_to_file("No products found")
            return jsonify({"error": "No products found"}), 404
        
        products = scrape_product_details(products)
        save_to_csv(products)
        log_to_file(f"Successfully returned {len(products)} products")
        
        return jsonify(products)
        
    except Exception as e:
        log_to_file(f"Error in endpoint: {str(e)}")
        return jsonify({"error": str(e)}), 500

if __name__ == '__main__':
    app.run(debug=True, port=5001)