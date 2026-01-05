from flask import Flask, Response;
from routes.user_route import user_route_bp;

app = Flask(__name__)

app.register_blueprint(user_route_bp, url_prefix='/user')

@app.route('/')
def index():
    return Response("Flask server is running... project 2 mysql_connections", mimetype='text/plain')

if __name__ == '__main__':
    app.run(debug=True)