import logging

import sqlalchemy
from flask import Flask

from negotiator.authentication.allowed_emails import AllowedEmails
from negotiator.database_support.database_template import DatabaseTemplate
from negotiator.environment import Environment
from negotiator.health_api import health_api
from negotiator.index_page import index_page
from negotiator.negotiation.assistant import Assistant
from negotiator.negotiation.message_gateway import MessageGateway
from negotiator.negotiation.negotiation_gateway import NegotiationGateway
from negotiator.negotiation.negotiation_page import negotiation_page
from negotiator.negotiation.negotiation_service import NegotiationService
from negotiator.oauth.oauth_api import oauth_api
from negotiator.oauth.oauth_client import OAuthClient

logger = logging.getLogger(__name__)


def create_app(env: Environment = Environment.from_env()) -> Flask:
    app = Flask(__name__)
    app.secret_key = env.secret_key
    app.config["SQLALCHEMY_DATABASE_URI"] = env.database_url

    db = sqlalchemy.create_engine(env.database_url, pool_size=4)
    db_template = DatabaseTemplate(db)

    negotiation_gateway = NegotiationGateway(db_template)
    message_gateway = MessageGateway(db_template)
    negotiation_service = NegotiationService(db_template, negotiation_gateway, message_gateway)

    oauth_client = OAuthClient(client_id=env.client_id, client_secret=env.client_secret, host_url=env.host_url,
                               oauth_url=env.oauth_url, user_info_url=env.user_info_url)
    allowed_emails = AllowedEmails(domains=env.allowed_domains, addresses=env.allowed_addresses)

    app.register_blueprint(index_page())
    app.register_blueprint(negotiation_page(negotiation_service, Assistant(
        api_key=env.openai_api_key,
        base_url="https://api.openai.com/v1/"
    )))
    app.register_blueprint(oauth_api(oauth_client, allowed_emails))
    app.register_blueprint(health_api())

    return app
