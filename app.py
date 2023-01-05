from flask import Flask, jsonify
from flask.helpers import send_from_directory
from flask_cors import CORS, cross_origin
from flask_httpauth import HTTPBasicAuth

from backend import year, month
from auth import check_password

auth = HTTPBasicAuth()

@auth.verify_password
def verify_password(username, password):
    return check_password(username, password);

app = Flask(__name__, static_folder='client/build', static_url_path='/')
CORS(app)

@app.route('/api/year/<year_input>', methods=['GET'])
@cross_origin()
def year_index(year_input):
    return jsonify(year.get_by_year(int(year_input)))


@app.route('/api/month/<date_input>', methods=['GET'])
@cross_origin()
def month_index(date_input):
    return jsonify(month.get_by_month(date_input))


@app.route('/', defaults={'path': ''})
@app.route("/<string:path>")
@app.route('/<path:path>')
@auth.login_required
@cross_origin()
def serve(path):
    return send_from_directory(app.static_folder, 'index.html')


if __name__ == '__main__':
    app.run()
