from flask import Flask, Response, jsonify
from flask.helpers import send_from_directory
from flask_cors import CORS, cross_origin

from api import year

app = Flask(__name__, static_folder='client/build', static_url_path='')
CORS(app)


@app.route('/api/year', methods=['GET'])
@cross_origin()
def index():
    print(year.total())
    return jsonify(year.total())


@app.route('/')
def serve():
    return send_from_directory(app.static_folder, 'index.html')


if __name__ == '__main__':
    app.run()
