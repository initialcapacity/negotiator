from typing import cast
from unittest import TestCase
from uuid import UUID

from negotiator.negotiation.message_gateway import MessageGateway
from negotiator.negotiation.negotiation_gateway import NegotiationGateway
from negotiator.negotiation.negotiation_service import NegotiationService, Negotiation, Message
from tests.db_test_support import test_db_template


class TestNegotiationService(TestCase):
    def setUp(self) -> None:
        super().setUp()
        self.db = test_db_template()
        self.db.clear()

        negotiation_gateway = NegotiationGateway(self.db)
        message_gateway = MessageGateway(self.db)

        self.service = NegotiationService(self.db, negotiation_gateway, message_gateway)

    def test_create(self):
        negotiation_id = self.service.create()

        negotiations = self.db.query_to_dict("select id from negotiations")
        messages = self.db.query_to_dict("select negotiation_id, role from messages")

        self.assertIsNotNone(negotiation_id)
        self.assertEqual([{'id': negotiation_id}], negotiations)
        self.assertEqual([
            {'negotiation_id': negotiation_id, 'role': 'system'},
            {'negotiation_id': negotiation_id, 'role': 'assistant'},
        ], messages)

    def test_find(self):
        negotiation_id = self.service.create()

        result = self.service.find(negotiation_id)

        self.assertIsNotNone(result)
        negotiation = cast(Negotiation, result)

        self.assertEqual(negotiation_id, negotiation.id)
        self.assertEqual(2, len(negotiation.messages))
        self.assertEqual('system', negotiation.messages[0].role)
        self.assertEqual('assistant', negotiation.messages[1].role)

    def test_find__not_found(self):
        result = self.service.find(UUID('9ed47ce6-6410-40ce-875a-aaad977259c2'))

        self.assertIsNone(result)

    def test_add_messages(self):
        negotiation_id = self.service.create()

        self.service.add_messages(negotiation_id, [
            Message(UUID('11111111-0b3f-430e-8b86-884a2c5d9bc9'), 'user', 'user content'),
            Message(UUID('22222222-0b3f-430e-8b86-884a2c5d9bc9'), 'assistant', 'assistant content'),
        ])

        result = self.service.find(negotiation_id)
        negotiation = cast(Negotiation, result)

        self.assertEqual(negotiation_id, negotiation.id)
        self.assertEqual(4, len(negotiation.messages))
        self.assertEqual('user', negotiation.messages[2].role)
        self.assertEqual('user content', negotiation.messages[2].content)
        self.assertEqual('assistant', negotiation.messages[3].role)
        self.assertEqual('assistant content', negotiation.messages[3].content)
