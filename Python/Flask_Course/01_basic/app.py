from flask import Flask, Response
from routes.user_route import user_route_bp;

app = Flask(__name__)

app.register_blueprint(user_route_bp, url_prefix='/user')

@app.route('/')
def home():
    return Response("flask is running.. project 1 basics", mimetype='text/plain')

if __name__ == '__main__':
    app.run(debug=True)