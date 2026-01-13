from flask import Blueprint, jsonify, request
from models.WishlistModel import WishlistModel

wishlist_route_bp = Blueprint("wishlist_routes", __name__)


obj = WishlistModel()

@wishlist_route_bp.route("/toggle-wishlist", methods=['POST'])
def toggleWishlistAddRemove():
    try:
        user_id = request.user_id
        product_id = request.get_json()['product_id']

        if not user_id:
            return jsonify({"success": False, "message": "you need to login first to add/remove product to/from wishlist!"}),401
        
        if not product_id:
            return jsonify({"success": False, "message": "product `id` was missing in order to add/remove from wishlist"}),400
        
        return obj.toggle_wishlist_add_remove(user_id, product_id)
    
    except Exception as error:
        print(f'Error while inserting/deleting product to/from wishlist: {error}')
        return jsonify({"status": "failed", "success": False, "error": f'Error while inserting/deleting product to/from wishlist: {error}'}),500


@wishlist_route_bp.route("/get-wishlist-datas", methods=['GET'])
def getAllWishlistItems():
    try:
        user_id = request.user_id

        if not user_id:
            return jsonify({"success": False, "message": "you need to login first to add/remove product to/from wishlist!"}),401
        
        return obj.fetch_wishlist_products(user_id)
    
    except Exception as error:
        print('Error while fetching products from wishlist')
        return jsonify({"status": "failed", "success": False, "error": f'Error while fetching products from wishlist: {error}'}),500
