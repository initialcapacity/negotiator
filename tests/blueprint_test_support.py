from flask import Blueprint, Flask
from flask.testing import FlaskClient


def test_client(blueprint: Blueprint) -> FlaskClient:
    app = Flask(__name__, template_folder='../negotiator/templates')
    app.config['TESTING'] = True
    app.register_blueprint(blueprint)
    app.secret_key = 'test-secret'
    return app.test_client()
