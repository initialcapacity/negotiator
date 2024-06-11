import json
from unittest import TestCase
from uuid import UUID

import responses

from negotiator.negotiation.assistant import Assistant
from negotiator.negotiation.negotiation_service import Negotiation, Message


class TestAssistant(TestCase):

    @responses.activate
    def test_reply(self):
        assistant = Assistant(
            api_key="some_api_key",
            base_url="https://openai.example.com",
        )

        completions_endpoint = responses.post(
            'https://openai.example.com/chat/completions',
            json={'choices': [{'message': {'content': 'some response'}}]}
        )

        result = assistant.reply(Negotiation(
            id=UUID('141b986c-5e08-4157-b391-11c85000f5cb'),
            messages=[
                Message(
                    id=UUID('eab8f7f6-1a11-4634-9ffc-2cbe3b5647ff'),
                    role='user',
                    content='user content',
                )
            ]
        ))

        self.assertEqual('some response', result)
        self.assertEqual(1, completions_endpoint.call_count)
        recorded_request = responses.calls[0].request
        self.assertEqual(
            {
                'messages': [{'content': 'user content', 'role': 'user'}],
                'model': 'gpt-4o'
            },
            json.loads(recorded_request.body)
        )
