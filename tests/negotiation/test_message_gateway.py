import uuid
from unittest import TestCase
from uuid import UUID

from negotiator.negotiation.message_gateway import MessageGateway, MessageRecord
from negotiator.negotiation.negotiation_gateway import NegotiationGateway
from tests.db_test_support import test_db_template


class TestMessageGateway(TestCase):
    def setUp(self) -> None:
        super().setUp()
        self.db = test_db_template()
        self.db.clear()

        self.negotiation_gateway = NegotiationGateway(self.db)
        self.gateway = MessageGateway(self.db)

    def test_create(self):
        negotiation_id = self.negotiation_gateway.create()

        message_id = self.gateway.create(
            id=UUID('11111111-7981-4e69-b44e-c21b3f88213b'),
            negotiation_id=negotiation_id,
            role='user',
            content='some content'
        )

        result = self.db.query_to_dict("select id, negotiation_id, role, content from messages")

        self.assertEqual([{
            'id': message_id,
            'negotiation_id': negotiation_id,
            'role': 'user',
            'content': 'some content'
        }], result)

    def test_list_for_negotiation(self):
        negotiation_id = self.negotiation_gateway.create()
        other_negotiation_id = self.negotiation_gateway.create()

        self.gateway.create(
            id=UUID('00000000-7981-4e69-b44e-c21b3f88213b'),
            negotiation_id=negotiation_id,
            role='user',
            content='user content',
        )
        self.gateway.create(
            id=UUID('11111111-7981-4e69-b44e-c21b3f88213b'),
            negotiation_id=negotiation_id,
            role='system',
            content='system content'
        )
        self.gateway.create(
            id=uuid.uuid4(),
            negotiation_id=other_negotiation_id,
            role='user',
            content='other user content'
        )

        result = self.gateway.list_for_negotiation(negotiation_id)

        self.assertEqual([MessageRecord(
            id=UUID('00000000-7981-4e69-b44e-c21b3f88213b'),
            negotiation_id=negotiation_id,
            role='user',
            content='user content'
        ), MessageRecord(
            id=UUID('11111111-7981-4e69-b44e-c21b3f88213b'),
            negotiation_id=negotiation_id,
            role='system',
            content='system content'
        )], result)

    def test_truncate_for_negotiation(self):
        negotiation_id = self.negotiation_gateway.create()

        self.gateway.create(
            id=UUID('00000000-7981-4e69-b44e-c21b3f88213b'),
            negotiation_id=negotiation_id,
            role='user',
            content='user content',
        )
        self.gateway.create(
            id=UUID('11111111-7981-4e69-b44e-c21b3f88213b'),
            negotiation_id=negotiation_id,
            role='assistant',
            content='assistant content'
        )

        self.gateway.truncate_for_negotiation(
            negotiation_id=negotiation_id,
            at_message_id=UUID('00000000-7981-4e69-b44e-c21b3f88213b')
        )

        result = self.gateway.list_for_negotiation(negotiation_id)

        self.assertEqual([MessageRecord(
            id=UUID('00000000-7981-4e69-b44e-c21b3f88213b'),
            negotiation_id=negotiation_id,
            role='user',
            content='user content'
        )], result)
