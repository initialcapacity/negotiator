import json
import re
from unittest import TestCase

import responses

from negotiator.negotiation.assistant import Assistant
from negotiator.negotiation.message_gateway import MessageGateway
from negotiator.negotiation.negotiation_gateway import NegotiationGateway
from negotiator.negotiation.negotiation_page import negotiation_page
from negotiator.negotiation.negotiation_service import NegotiationService
from tests.blueprint_test_support import test_client
from tests.db_test_support import test_db_template


class TestNegotiationPage(TestCase):
    def setUp(self) -> None:
        super().setUp()

        self.db = test_db_template()
        self.db.clear()

        negotiation_gateway = NegotiationGateway(self.db)
        message_gateway = MessageGateway(self.db)

        service = NegotiationService(self.db, negotiation_gateway, message_gateway)
        blueprint = negotiation_page(service, Assistant())

        self.test_client = test_client(blueprint)
        self.negotiation_id = service.create()

    def test_create(self):
        response = self.test_client.get('/')

        self.assertEqual(302, response.status_code)

        uuid_regex = r'[0-9a-f]{8}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{12}'
        self.assertRegex(
            response.headers['Location'],
            re.compile(r'^/negotiation/' + uuid_regex)
        )

    def test_show(self):
        response = self.test_client.get(f'/negotiation/{self.negotiation_id}')

        self.assertEqual(200, response.status_code)
        self.assertIn('Hi there', response.text)

    def test_show__not_found(self):
        response = self.test_client.get(f'/negotiation/decf0189-9220-42ca-b825-9df389baee48')

        self.assertEqual(302, response.status_code)
        self.assertEqual('/', response.headers['Location'])

    @responses.activate
    def test_new_message(self):
        responses.post(
            'https://openai.example.com/chat/completions',
            json={'choices': [{'message': {'content': 'I sure will'}}]}
        )

        response = self.test_client.post(
            f'/negotiation/{self.negotiation_id}/message',
            headers={'Content-Type': 'application/json'},
            data=json.dumps({'content': 'Tell me more'}),
        )

        self.assertEqual(201, response.status_code)
        self.assertEqual({'role': 'assistant', 'content': 'I sure will'}, response.json)

    @responses.activate
    def test_new_message__not_found(self):
        response = self.test_client.post(
            f'/negotiation/f94a796d-d8a0-4bab-a986-98fce4348e06/message',
            headers={'Content-Type': 'application/json'},
            data=json.dumps({'content': 'Tell me more'}),
        )

        self.assertEqual(302, response.status_code)
        self.assertEqual('/', response.headers['Location'])
