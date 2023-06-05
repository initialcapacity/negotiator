from typing import Any, List

import sqlalchemy
from negotiator.database_support.database_template import DatabaseTemplate
from sqlalchemy import Engine, RowMapping


class TestDatabaseTemplate(DatabaseTemplate):

    def __init__(self, engine: Engine) -> None:
        super().__init__(engine)

    def clear(self):
        self.query('delete from messages')
        self.query('delete from negotiations')

    def query_to_dict(self, statement: str, **kwargs: Any) -> List[RowMapping]:
        return [
            row._mapping
            for row in (self.query(statement, **kwargs))
        ]


def test_db_template() -> TestDatabaseTemplate:
    db = sqlalchemy.create_engine(
        url='postgresql://localhost:5432/negotiator_test?user=negotiator&password=negotiator',
        pool_size=4
    )

    return TestDatabaseTemplate(db)
