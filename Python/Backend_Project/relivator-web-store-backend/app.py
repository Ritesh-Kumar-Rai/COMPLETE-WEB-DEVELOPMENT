# Main Flask backend for Relivator WebStore
from dotenv import load_dotenv;
from flask import Flask, jsonify, request;
from routes.user_routes import user_route_bp;
from routes.product_routes import product_route_bp;
from routes.cart_routes import cart_route_bp;
import os; 

load_dotenv()

app = Flask(__name__)

app.secret_key = os.getenv("APP_SECRET_KEY")

@app.before_request
def check_api_key():
    # Either check for X-API-Key header or check for any Authorization header passed by client with API-Key
    api_key = request.headers.get("X-API-Key")
    if not api_key:
        unfilteredKey = request.headers.get("Authorization")
        if not unfilteredKey or not unfilteredKey.startswith("API-Key "):
            return jsonify({"status": 'fails', "success": False, "message": "API key is missing!"}),401
        api_key = unfilteredKey.split(" ")[1]

    if not api_key or api_key != os.getenv("API_SECRET_KEY"):
        return jsonify({"status": 'fails', "success": False, "message": "Invalid API Key!"}),401
    
    # Optionally attach user info to request context
    request.isClientValid = True

BASE_URI = "/relivator-store" # of api

# configuring the other routes with app.
app.register_blueprint(user_route_bp, url_prefix=f"{BASE_URI}/api/v1/users") 
app.register_blueprint(product_route_bp, url_prefix=f"{BASE_URI}/api/v1/products")
app.register_blueprint(cart_route_bp, url_prefix=f"{BASE_URI}/api/v1/cart")


# starting route
@app.route(f'{BASE_URI}/api/v1', methods=['GET'])
def index():
    return jsonify({'status': 'ok', 'success':True, 'message': 'api is in running state.... hare krsna🙏'}),200;




# start a server
if __name__ == '__main__':
    app.run(debug=True);
