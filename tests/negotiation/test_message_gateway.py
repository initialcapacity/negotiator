from unittest import TestCase

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

        user_message_id = self.gateway.create(negotiation_id=negotiation_id, role='user', content='user content')
        system_message_id = self.gateway.create(negotiation_id=negotiation_id, role='system', content='system content')
        self.gateway.create(negotiation_id=other_negotiation_id, role='user', content='other user content')

        result = self.gateway.list_for_negotiation(negotiation_id)

        self.assertEqual([MessageRecord(
            id=user_message_id,
            negotiation_id=negotiation_id,
            role='user',
            content='user content'
        ), MessageRecord(
            id=system_message_id,
            negotiation_id=negotiation_id,
            role='system',
            content='system content'
        )], result)
