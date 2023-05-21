import os
from dataclasses import dataclass


@dataclass
class Environment:
    port: int
    secret_key: str
    openai_api_key: str
    use_flask_debug_mode: bool

    def __init__(self,
                 port: int,
                 secret_key: str,
                 openai_api_key: str,
                 use_flask_debug_mode: bool,
                 ) -> None:
        self.port = port
        self.secret_key = secret_key
        self.openai_api_key = openai_api_key
        self.use_flask_debug_mode = use_flask_debug_mode

    @classmethod
    def from_env(cls) -> 'Environment':
        return cls(
            port=int(os.environ.get('PORT', 8081)),
            secret_key=cls.__require_env('SECRET_KEY'),
            openai_api_key=cls.__require_env('OPENAI_API_KEY'),
            use_flask_debug_mode=os.environ.get('FREEPLAY_USE_FLASK_DEBUG_MODE', 'false') == 'true',
        )

    @classmethod
    def __require_env(cls, name: str) -> str:
        value = os.environ.get(name)
        if value is None:
            raise Exception(f'Unable to read {name} from the environment')
        return value
