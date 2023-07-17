from dataclasses import dataclass
from typing import Optional, cast, List
from uuid import UUID, uuid4

from negotiator.database_support.database_template import DatabaseTemplate
from negotiator.database_support.result_mapping import map_one_result, map_results
from sqlalchemy import Connection


@dataclass
class MessageRecord:
    id: UUID
    negotiation_id: UUID
    role: str
    content: str


class MessageGateway:
    def __init__(self, db: DatabaseTemplate) -> None:
        self.__db = db

    def create(
        self,
        negotiation_id: UUID,
        id: UUID,
        role: str,
        content: str,
        connection: Optional[Connection] = None
    ) -> Optional[UUID]:
        result = self.__db.query(
            statement="""
                    insert into messages (id, negotiation_id, role, content)
                        values (:id, :negotiation_id, :role, :content)
                        returning id
                    """,
            connection=connection,
            id=id,
            negotiation_id=negotiation_id,
            role=role,
            content=content,
        )

        return map_one_result(result, lambda row: cast(UUID, row['id']))

    def list_for_negotiation(
        self,
        negotiation_id: UUID,
        connection: Optional[Connection] = None
    ) -> List[MessageRecord]:
        result = self.__db.query(
            statement="""
                      select id, negotiation_id, role, content from messages
                        where negotiation_id = :negotiation_id
                        order by created_at
                      """,
            connection=connection,
            negotiation_id=negotiation_id,
        )

        return map_results(result, lambda row: MessageRecord(
            id=cast(UUID, row['id']),
            negotiation_id=cast(UUID, row['negotiation_id']),
            role=cast(str, row['role']),
            content=cast(str, row['content']),
        ))

    def truncate_for_negotiation(
        self,
        negotiation_id: UUID,
        at_message_id: UUID,
        connection: Optional[Connection] = None
    ) -> None:
        self.__db.query(
            statement="""
                      delete from messages
                        where negotiation_id = :negotiation_id
                        and id <> :message_id
                        and message_order > (
                            select message_order from messages
                                where negotiation_id = :negotiation_id
                                and id = :message_id
                        )
                      """,
            connection=connection,
            negotiation_id=negotiation_id,
            message_id=at_message_id,
        )
