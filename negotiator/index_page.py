from flask import Blueprint, render_template
from flask.typing import ResponseReturnValue

from negotiator.authentication.authenticate_user import extract_user_from_session


def index_page() -> Blueprint:
    page = Blueprint('index_page', __name__)

    @page.before_request
    def authenticate_user_filter() -> None:
        extract_user_from_session()

    @page.get('/')
    def index() -> ResponseReturnValue:
        return render_template('index.html')

    return page
