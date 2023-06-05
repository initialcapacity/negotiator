from dataclasses import dataclass
from typing import Optional, cast
from uuid import UUID, uuid4

from negotiator.database_support.database_template import DatabaseTemplate
from negotiator.database_support.result_mapping import map_one_result
from sqlalchemy import Connection


@dataclass
class NegotiationRecord:
    id: UUID


class NegotiationGateway:
    def __init__(self, db: DatabaseTemplate) -> None:
        self.__db = db

    def create(self, connection: Optional[Connection] = None) -> Optional[UUID]:
        id = uuid4()
        result = self.__db.query(
            statement="""
                      insert into negotiations (id) values (:id) returning id
                      """,
            connection=connection,
            id=id)

        return map_one_result(result, lambda row: cast(UUID, row['id']))

    def find(self, id: UUID, connection: Optional[Connection] = None) -> Optional[NegotiationRecord]:
        result = self.__db.query(
            statement="""
                      select id from negotiations where id = :id
                      """,
            connection=connection,
            id=id)

        return map_one_result(result, lambda row: NegotiationRecord(cast(UUID, row['id'])))
