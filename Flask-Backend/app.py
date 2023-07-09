from flask import Flask, request, jsonify
import tensorflow as tf
from flask_cors import CORS


app = Flask(__name__)
app.config["DEBUG"] = True
CORS(app)


@app.route('/', methods=['GET'])
def welcome():
    return "<h1>Welcome to the Flask API, don't hack </h1>"

if __name__ == '__main__':
    app.run(port=8000)