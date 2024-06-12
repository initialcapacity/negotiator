import os
from dataclasses import dataclass


@dataclass
class Environment:
    port: int
    secret_key: str
    database_url: str
    openai_api_key: str
    client_id: str
    client_secret: str
    oauth_url: str
    user_info_url: str
    host_url: str
    allowed_domains: str
    allowed_addresses: str
    use_flask_debug_mode: bool

    @classmethod
    def from_env(cls) -> 'Environment':
        return cls(
            port=int(os.environ.get('PORT', 8081)),
            secret_key=cls.__require_env('SECRET_KEY'),
            database_url=cls.__require_env('DATABASE_URL'),
            openai_api_key=cls.__require_env('OPENAI_API_KEY'),
            client_id=cls.__require_env('CLIENT_ID'),
            client_secret=cls.__require_env('CLIENT_SECRET'),
            oauth_url=os.environ.get('OAUTH_URL', 'https://accounts.google.com/o/oauth2'),
            user_info_url=os.environ.get('USER_INFO_URL', 'https://www.googleapis.com/oauth2/v3/userinfo'),
            host_url=cls.__require_env('HOST_URL'),
            allowed_domains=os.environ.get('ALLOWED_DOMAINS', ""),
            allowed_addresses=os.environ.get('ALLOWED_ADDRESSES', ""),
            use_flask_debug_mode=os.environ.get('USE_FLASK_DEBUG_MODE', 'false') == 'true',
        )

    @classmethod
    def __require_env(cls, name: str) -> str:
        value = os.environ.get(name)
        if value is None:
            raise Exception(f'Unable to read {name} from the environment')
        return value
