import logging

from flask import Flask

from negotiator.environment import Environment
from negotiator.health_api import health_api
from negotiator.negotiation.negotiation_gateway import NegotiationGateway
from negotiator.negotiation.negotiation_page import negotiation_page

logger = logging.getLogger(__name__)


def create_app(env: Environment) -> Flask:
    app = Flask(__name__)
    app.secret_key = env.secret_key

    app.register_blueprint(negotiation_page(NegotiationGateway()))
    app.register_blueprint(health_api())

    return app
