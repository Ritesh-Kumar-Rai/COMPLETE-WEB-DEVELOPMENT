from functools import wraps
from flask import request, jsonify
import jwt
# import datetime
import os

SECRET_KEY = os.getenv("ACCESS_TOKEN_SECRET_KEY")  # load from env in production

def token_required(f):
    @wraps(f)
    def decorated(*args, **kwargs):
        token = None

        token = request.cookies.get('access_token')

        if not token:   
            # Get token from Authorization header
            if 'Authorization' in request.headers:
                auth_header = request.headers['Authorization']
                if auth_header.startswith("Bearer "):
                    token = auth_header.split(" ")[1]

        if not token:
            return jsonify({"error": "Token is missing!"}), 401

        try:
            data = jwt.decode(token, SECRET_KEY, algorithms=["HS256"])
            # Attach user info to request context
            request.user_id = data['id']
        except jwt.ExpiredSignatureError:
            return jsonify({"error": "Access token expired"}), 401
        except jwt.InvalidTokenError:
            return jsonify({"error": "Invalid token"}), 401

        return f(*args, **kwargs)
    return decorated
