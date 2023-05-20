import logging
import os

from negotiator.app import create_app
from negotiator.environment import Environment

logging.basicConfig(level=os.environ.get('ROOT_LOG_LEVEL', 'INFO'))
logging.getLogger('negotiator').setLevel(level=os.environ.get('NEGOTIATOR_LOG_LEVEL', 'INFO'))

env = Environment.from_env()

if __name__ == '__main__':
    create_app(env).run(debug=env.use_flask_debug_mode, host="0.0.0.0", port=env.port)
