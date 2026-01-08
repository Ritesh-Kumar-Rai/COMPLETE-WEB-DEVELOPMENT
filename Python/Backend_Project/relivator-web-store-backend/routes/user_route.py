from flask import Blueprint, jsonify, request;
from models.UserModel import UserModel;
from utils.validator import validate_email, validate_password;
# importing middleware
from middlewares.user_auth_middleware import token_required;

user_route_bp = Blueprint("user_route", __name__);

@user_route_bp.route("/harekrsna-user", methods=['GET'])
def harekrsna():
    return jsonify({
        'status': 'ok', 
        'success':True, 
        'message': 'Hare Krsna User! -> from user route.'
    }),200;


# actual routes are started from below:
obj = UserModel()

@user_route_bp.route("/register", methods=['POST'])
def registerUserController():
    fullname = request.form.get("fullname")
    email = request.form.get("email")
    password = request.form.get("password")

    if not fullname or len(fullname) < 3:
        return jsonify({"success": False, "msg": "`fullname` field are required with atleast 3 character!"}),400
    
    if not email:
        return jsonify({"success": False, "msg": "`email` field are required!"}),400
    
    if not password:
        return jsonify({"success": False, "msg": "`password` field are required!"}),400
    
    if not validate_email(email):
        return jsonify({"error": "Invalid email format"}), 400
    
    is_valid_pwd,message = validate_password(password)

    if not is_valid_pwd:
        return jsonify({"error": message}), 400
    
    return obj.registerUser({
        "fullname": fullname,
        "email": email,
        "password": password
    })
    

@user_route_bp.route("/login", methods=['POST'])
def loginUserController():
    email = request.form.get("email")
    password = request.form.get("password")

    if not email:
        return jsonify({"success": False, "msg": "`email` field are required!"}),400
    
    if not password:
        return jsonify({"success": False, "msg": "`password` field are required!"}),400

    if not validate_email(email):
        return jsonify({"error": "Invalid email format"}), 400
    
    is_pwd_valid, message = validate_password(password)

    if not is_pwd_valid:
        return jsonify({"error": message}), 400
    
    # use JWT to generate a token which we will store it to db and send back to user via cookie and response [cookie for browser and response for mobile/desktop application]
    return obj.loginUser(email, password)

# secured routes

@user_route_bp.route("/logout", methods=['GET','POST'])
@token_required
def logoutUserController():
    # get cookie from user via cookie/headers(Bearer)
    # check is available in db or not via matching userid which will get after decoding from jwt
    # clear all cookies from client side and reset refreshToken from users db
    # response back to user after successfull operation
    userid = request.user_id
    obj.logoutUser(userid)

@user_route_bp.route('/access-resources', methods=['GET'])
@token_required
def access_rources():
    userid = request.user_id
    if not userid:
        return jsonify({"status": False,"message": "user not authorized to access resources!"}),401
    
    return jsonify({
        "status": True,
        "payload": {
            "game": "Watchdogs 2",
            "edition": "Gold Edition",
            "launched_year": 2015,
            "actor": "marcus holloway",
            "published_by": "ubisoft",
            "price": '₹5500',
            "discounted_price": "₹500"
        },
        "message": "Congrats 😍 you are authorized user."
    }),200


@user_route_bp.route("/rotate-access-token", methods=['GET'])
def rotate_access_token():
    try:
        incoming_refresh_token = request.cookies.get('refresh_token')
        if not incoming_refresh_token:
            print("incoming refresh token cookie was missing")
            if "Authorization" in request.headers:
                auth_header = request.headers['Authorization']
                if auth_header.startswith('Bearer '):
                    incoming_refresh_token = auth_header.split(' ')[1]

        if not incoming_refresh_token:
            return jsonify({"success": False, "error": "Refresh token is missing!"}),401
        
        return obj.regenerate_access_token(incoming_refresh_token)
        
    except Exception as error:
        print("Error occured in rotate-access-token:",str(error))
        return jsonify({"success": False, "error": str(error)}),400
    
