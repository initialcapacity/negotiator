from typing import Union

from flask import session, redirect, g
from flask.typing import ResponseReturnValue


def authenticate_user() -> Union[None, ResponseReturnValue]:
    username = session.get("username", None)
    if username is None:
        return redirect('/')

    g.username = username
    return None


def extract_user_from_session() -> None:
    username = session.get("username", None)
    if username is not None:
        g.username = username
