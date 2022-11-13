from flask import Flask, jsonify, request
from flask.helpers import send_from_directory
from flask_cors import CORS, cross_origin

from backend import year, month

app = Flask(__name__, static_folder='client/build', static_url_path='')
CORS(app)


@app.route('/api/year/<year_input>', methods=['GET'])
@cross_origin()
def year_index(year_input):
    return jsonify(year.get_by_year(int(year_input)))


@app.route('/api/month/<date_input>', methods=['GET'])
@cross_origin()
def month_index(date_input):
    return jsonify(month.get_by_month(date_input))


@app.route('/')
def serve():
    return send_from_directory(app.static_folder, 'index.html')


if __name__ == '__main__':
    app.run()
