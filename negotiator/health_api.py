from flask import Blueprint, jsonify
from flask.typing import ResponseReturnValue


def health_api() -> Blueprint:
    api = Blueprint('health_api', __name__)

    @api.get('/health')
    def health() -> ResponseReturnValue:
        return jsonify({'status': 'UP'})

    return api
