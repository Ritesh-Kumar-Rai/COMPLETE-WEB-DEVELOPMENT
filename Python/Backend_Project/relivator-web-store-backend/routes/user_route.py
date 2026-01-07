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

    if not validate_email(email):
        return jsonify({"error": "Invalid email format"}), 400
    
    is_pwd_valid, message = validate_password(password)

    if not is_pwd_valid:
        return jsonify({"error": message}), 400
    
    # use JWT to generate a token which we will store it to db and send back to user via cookie and response [cookie for browser and response for mobile/desktop application]
    return obj.loginUser(email, password)


@user_route_bp.route("/logout", methods=['GET','POST'])
@token_required
def logoutUserController():
    # get cookie from user via cookie/headers(Bearer)
    # check is available in db or not via matching userid which will get after decoding from jwt
    # clear all cookies from client side and reset refreshToken from users db
    # response back to user after successfull operation
    userid = request.user_id
    obj.logoutUser(userid)
