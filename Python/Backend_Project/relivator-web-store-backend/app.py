# Main Flask backend for Relivator WebStore
from dotenv import load_dotenv
from flask import Flask, jsonify;
from routes.user_route import user_route_bp;

load_dotenv()

app = Flask(__name__)

app.secret_key = "SECRET@HAREKRSNA"

BASE_URI = "/relivator-store" # of api

# configuring the other routes with app.
app.register_blueprint(user_route_bp, url_prefix=f"{BASE_URI}/api/v1/user") 

# starting route
@app.route(f'{BASE_URI}/api/v1', methods=['GET'])
def index():
    return jsonify({'status': 'ok', 'success':True, 'message': 'api is in running state.... hare krsna🙏'}),200;




# start a server
if __name__ == '__main__':
    app.run(debug=True);
