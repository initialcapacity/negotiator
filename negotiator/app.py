import logging

from flask import Flask

from negotiator.environment import Environment
from negotiator.health_api import health_api

logger = logging.getLogger(__name__)


def create_app(env: Environment) -> Flask:
    app = Flask(__name__)

    app.register_blueprint(health_api())

    return app
