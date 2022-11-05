from flask import Flask, jsonify, request
from flask.helpers import send_from_directory
from flask_cors import CORS, cross_origin

from backend import year, month

app = Flask(__name__, static_folder='client/build', static_url_path='')
CORS(app)


@app.route('/api/year', methods=['GET'])
@cross_origin()
def year_index():
    return jsonify(year.total())


@app.route('/api/month', methods=['GET'])
@cross_origin()
def month_index():
    date = request.args.get('date', type=str)
    return jsonify(month.get_by_month(date))


@app.route('/')
def serve():
    return send_from_directory(app.static_folder, 'index.html')


if __name__ == '__main__':
    app.run()
