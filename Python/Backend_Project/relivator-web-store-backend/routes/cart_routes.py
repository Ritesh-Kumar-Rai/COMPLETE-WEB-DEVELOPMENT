from flask import Blueprint, jsonify, request
from middlewares.user_auth_middleware import token_required
from models.CartModel import CartModel

cart_route_bp = Blueprint("cart_routes", __name__)

# all cart related routes
obj = CartModel()

@cart_route_bp.route("/add-to-cart", methods=['POST'])
@token_required
def addToCart():
    try:
        body = request.get_json()

        product_id = body.get("product_id")
        quantity = int(body.get("quantity", 1))

        if not product_id:
            return jsonify({"success": False, "message": "product `id` is missing!"}),404
        
        user_id = request.user_id

        if not user_id:
            return jsonify({"success": False, "message": "you need to login first in order to add product to cart!"}),401
        
        return obj.add_item_to_cart(user_id, product_id, quantity)
    except ValueError:
        print("Value must be passed at int")
        return jsonify({"status": "failed", "success": False, "error": "passed value must be an `integer` type!"}),400
    except Exception as error:
        print('Error while adding product to cart')
        return jsonify({"status": "failed", "success": False, "error": f'Error while adding product to cart: {error}'}),500

@cart_route_bp.route("/update-to-cart", methods=['PATCH'])
@token_required
def updateToCart():
    try:
        user_id = request.user_id

        if not user_id:
            return jsonify({"success": False, "message": "You need to login first to update your cart product!"}),401
        
        body = request.get_json()

        product_id = body.get("product_id")
        quantity = int(body.get("quantity", 1))

        if not product_id:
             return jsonify({"success": False, "message": "product `id` is missing!"}),404
        
        return obj.update_item_from_cart(user_id, product_id, quantity)
    
    except ValueError:
        print("Value must be passed at int")
        return jsonify({"status": "failed", "success": False, "error": "passed value must be an `integer` type!"}),400
    except Exception as error:
        print('Error while getting single product')
        return jsonify({"status": "failed", "success": False, "error": f'Error while getting single product: {error}'}),500

@cart_route_bp.route("/remove-from-cart/<int:product_id>", methods=['DELETE'])
@token_required
def removeFromCart(product_id):
    try:

        user_id = request.user_id

        if not user_id:
            return jsonify({"success": False, "message": "You need to login first to delete your product from cart!"}),401
        
        if not product_id:
            return jsonify({"success": False, "message": "product `id` is missing!"}),404
        
        return obj.delete_form_cart(user_id, product_id)
    except Exception as error:
        print('Error while deleting product from cart')
        return jsonify({"status": "failed", "success": False, "error": f'Error while deleting your product from cart: {error}'}),500


@cart_route_bp.route("/fetch-from-cart", methods=['GET'])
@token_required
def getFromCart():
    try:
        user_id = request.user_id

        if not user_id:
            return jsonify({"success": False, "message": "you need to login first to access all the products of cart!"}),401
        
        return obj.fetch_products_from_cart(user_id)
    except Exception as error:
        print('Error while getting single product')
        return jsonify({"status": "failed", "success": False, "error": f'Error while getting single product: {error}'}),500