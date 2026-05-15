from flask import Blueprint, request, jsonify
from app.services.ai_service import AIService
import logging

logger = logging.getLogger(__name__)
api_bp = Blueprint('api', __name__)
ai_service = AIService()

@api_bp.route('/recommendations', methods=['POST'])
def get_recommendations():
    try:
        data = request.json
        if not data:
            return jsonify({"success": False, "error": "No data provided"}), 400
        
        logger.info(f"Generating recommendations for: {data}")
        recommendations = ai_service.generate_recommendations(data)
        
        if not recommendations:
            return jsonify({"success": False, "error": "Failed to generate recommendations"}), 500
            
        return jsonify({
            "success": True,
            "recommendations": recommendations
        })

    except Exception as e:
        logger.error(f"Endpoint error: {str(e)}")
        return jsonify({"success": False, "error": "Internal server error"}), 500

@api_bp.route('/health', methods=['GET'])
def health_check():
    return jsonify({"success": True, "status": "healthy"})
