from flask import Blueprint, jsonify;

user_route_bp = Blueprint('user_route', __name__);

@user_route_bp.route('/getuser')
def getUser():
    return jsonify({'success': True, 'msg': 'User Details fetched.', 'data': { 'name': 'Anonymous' }})