from typing import Optional, Any, Callable, TypeVar, Generic

import sqlalchemy
from sqlalchemy import Engine, Connection, CursorResult

T = TypeVar('T')


class DatabaseTemplate:
    def __init__(self, engine: Engine) -> None:
        self.__engine = engine

    def transaction(self, action: Callable[[Connection], T]) -> T:
        with self.__engine.begin() as connection:
            return action(connection)

    def query(self, statement: str, connection: Optional[Connection] = None, **kwargs: Any) -> CursorResult:
        if connection is None:
            return self.transaction(lambda c: c.execute(sqlalchemy.text(statement), kwargs))
        else:
            return connection.execute(sqlalchemy.text(statement), kwargs)
