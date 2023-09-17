from flask import Blueprint, Flask
from flask.testing import FlaskClient


def test_client(blueprint: Blueprint, authenticated: bool = False) -> FlaskClient:
    app = Flask(__name__, template_folder='../negotiator/templates')
    app.config['TESTING'] = True
    app.register_blueprint(blueprint)
    app.secret_key = 'test-secret'
    client = app.test_client()

    if authenticated:
        with client.session_transaction() as session:
            session["username"] = "test@example.com"

    return client
