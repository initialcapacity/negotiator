import logging
import secrets

from flask import Blueprint, session, redirect, request
from flask.typing import ResponseReturnValue

from negotiator.authentication.allowed_emails import AllowedEmails
from negotiator.oauth.oauth_client import OAuthClient

logger = logging.getLogger(__name__)


def oauth_api(
    oauth_client: OAuthClient,
    allowed_email_addresses: AllowedEmails,
) -> Blueprint:
    api = Blueprint('oauth_api', __name__)

    @api.get('/authenticate')
    def authenticate() -> ResponseReturnValue:
        state = secrets.token_urlsafe(16)
        session["state"] = state

        return redirect(oauth_client.auth_url(state))

    @api.get('/logout')
    def logout() -> ResponseReturnValue:
        session.clear()
        return redirect('/')

    @api.get('/oauth/callback')
    def callback() -> ResponseReturnValue:
        if request.args['state'] != session.pop("state", ""):
            session.clear()
            logger.error('state does not match')
            return redirect('/')
        access_token = oauth_client.fetch_access_token(request.args['code'])
        if access_token is None:
            logger.error('no access token found')
            return redirect('/')

        email = oauth_client.read_email_from_token(access_token)
        if email is None:
            logger.error('no email found on access token')
            return redirect('/')
        if not allowed_email_addresses.include(email):
            logger.error('email address %s not allowed', email)
            return redirect('/')

        session["username"] = email
        return redirect("/")

    return api
