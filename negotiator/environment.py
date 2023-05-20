import os
from dataclasses import dataclass


@dataclass
class Environment:
    port: int
    use_flask_debug_mode: bool

    def __init__(self,
                 port: int,
                 use_flask_debug_mode: bool,
                 ) -> None:
        self.port = port
        self.use_flask_debug_mode = use_flask_debug_mode

    @classmethod
    def from_env(cls) -> 'Environment':
        return cls(
            port=int(os.environ.get('PORT', 8081)),
            use_flask_debug_mode=os.environ.get('FREEPLAY_USE_FLASK_DEBUG_MODE', 'false') == 'true',
        )
