from flask import Flask, jsonify, request
from flask.helpers import send_from_directory
from flask_cors import CORS, cross_origin
from flask_httpauth import HTTPBasicAuth

from backend import overview, utils
from auth import check_password

auth = HTTPBasicAuth()


@auth.verify_password
def verify_password(username, password):
    return check_password(username, password);

app = Flask(__name__, static_folder='client/build', static_url_path='/')
CORS(app)


@app.route('/api/analytics/<date>', methods=['GET'])
@cross_origin()
def analytics(date):
    resolution = request.args.get('resolution', 'month')
    return overview.get_by_date(date, resolution)


@app.route('/', defaults={'path': ''})
@app.route("/<string:path>")
@app.route('/<path:path>')
@auth.login_required
@cross_origin()
def serve(path):
    return send_from_directory(app.static_folder, 'index.html')


if __name__ == '__main__':
    app.run()
