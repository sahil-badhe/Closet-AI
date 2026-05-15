from flask import Blueprint, request, jsonify
from app.services.ai_service import AIService
from app.services.shopping_service import ShoppingService
import logging

logger = logging.getLogger(__name__)
api_bp = Blueprint('api', __name__)

ai_service = AIService()
shopping_service = ShoppingService()

@api_bp.route('/recommendations', methods=['POST'])
def get_recommendations():
    try:
        data = request.json
        if not data:
            return jsonify({"success": False, "error": "No data provided"}), 400
        
        # Phase 1: Gemini generates the optimized search query
        search_query = ai_service.generate_search_query(data)
        
        # Phase 2: SerpAPI fetches real products based on the query
        products = shopping_service.fetch_products(search_query)
        
        if not products:
            return jsonify({
                "success": True, 
                "recommendations": [],
                "message": "No products found for this style."
            })
            
        return jsonify({
            "success": True,
            "query": search_query,
            "recommendations": products
        })

    except Exception as e:
        logger.error(f"Endpoint error: {str(e)}")
        return jsonify({"success": False, "error": str(e)}), 500

@api_bp.route('/health', methods=['GET'])
def health_check():
    return jsonify({"success": True, "status": "healthy"})
