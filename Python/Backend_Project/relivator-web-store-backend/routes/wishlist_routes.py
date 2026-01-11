from flask import Blueprint, jsonify, request

wishlist_route_bp = Blueprint("wishlist_routes", __name__)

@wishlist_route_bp.route("/toggle-wishlist", methods=['POST'])
def toggleWishlistAddRemove():
    try:
        user_id = request.user_id

        if not user_id:
            return jsonify({"success": False, "message": "you need to login first to add/remove product to/from wishlist!"}),401
        
        return obj.fetch_products_from_cart(user_id)
    
    except Exception as error:
        print('Error while getting single product')
        return jsonify({"status": "failed", "success": False, "error": f'Error while getting single product: {error}'}),500
