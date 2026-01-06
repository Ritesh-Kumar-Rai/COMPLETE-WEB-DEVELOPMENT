from flask import Blueprint, jsonify, request, Response
from models.user_model import UserModel

user_route_bp = Blueprint("user_route", __name__)

obj = UserModel()

@user_route_bp.route('/getusers', methods=['GET'])
def getAllUsersData():
    return obj.getAllUsers()

@user_route_bp.route('/adduser', methods=['POST'])
def addOneUser():
    username = request.form.get('name')
    email = request.form.get('email')
    password = request.form.get('password')
    ph_no = request.form.get('phone_no')

    if(not username or not email or not password):
        return Response("All fields are required in (username, email, password)", mimetype='text/plain', status=406)
    
    return obj.createUser({
        "username": username, 
        "email": email, 
        "password": password, 
        "ph_no": ph_no
    });

@user_route_bp.route('/updateuserprofile/<int:userid>', methods=['PUT'])
def updateUserProfile(userid):
    username = request.form.get('name')
    ph_no = request.form.get('phone_no')

    if not username or not userid:
        return jsonify({"success": False, "message": "No data provided"}), 400
    
    return obj.updateUser(userid, {
        "username": username, 
        "ph_no": ph_no
    });


@user_route_bp.route('/deleteuser/<int:userid>', methods=['DELETE'])
def deleteUserAccount(userid):
    if not userid:
        return jsonify({"success": False, "message": "No data provided"}), 400
    
    return obj.deleteUser(userid);

@user_route_bp.route('/patchuserprofile/<int:userid>', methods=['PATCH'])
def patchUserAccount(userid):
    if not userid:
        return jsonify({'success':False, 'message': "`user id` is missing!"}), 400
    
    if not request.form:
        return jsonify({'success':False, 'message': "data field is missing!"}),400
    
    return obj.patchUser(userid, request.form);

@user_route_bp.route('/getusers/limit/<int:limit>/page/<int:page>', methods=['GET'])
def getUsersPaginatedData(limit=0, page=1):
    if page < 1 : page = 1
    if limit < 1 : limit = 10
    limit = int(limit)
    page = int(page)

    return obj.fetchUserViaPagination(limit, page)