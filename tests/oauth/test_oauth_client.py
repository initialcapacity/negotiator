from unittest import TestCase

import responses

from negotiator.oauth.oauth_client import OAuthClient


class TestOAuthClient(TestCase):
    def setUp(self):
        self.client = OAuthClient(client_id='some_client_id', client_secret='some_client_secret',
                                  host_url='https://host.example.com', oauth_url='https://oauth.example.com',
                                  user_info_url='https://userinfo.example.com')

    def test_auth_url(self):
        auth_url = self.client.auth_url('some_state')
        self.assertEqual(
            'https://oauth.example.com/auth?client_id=some_client_id'
            '&redirect_uri=https%3A%2F%2Fhost.example.com%2Foauth%2Fcallback&response_type=code&scope=email'
            '&state=some_state',
            auth_url
        )

    @responses.activate
    def test_fetch_access_token(self):
        token_endpoint = responses.post('https://oauth.example.com/token', json={'access_token': 'some_access_token'})

        access_token = self.client.fetch_access_token('some_code')

        self.assertEqual('some_access_token', access_token)
        self.assertEqual(1, token_endpoint.call_count)
        recorded_request = responses.calls[0].request
        self.assertEqual(
            "client_id=some_client_id&client_secret=some_client_secret&code=some_code&grant_type=authorization_code"
            "&redirect_uri=https%3A%2F%2Fhost.example.com%2Foauth%2Fcallback",
            recorded_request.body
        )

    @responses.activate
    def test_fetch_access_token_bad_request(self):
        responses.post('https://oauth.example.com/token', status=400)

        access_token = self.client.fetch_access_token('some_code')

        self.assertIsNone(access_token)

    @responses.activate
    def test_read_email_from_token(self):
        user_info_endpoint = responses.get('https://userinfo.example.com', json={'email': 'test@example.com'})

        email = self.client.read_email_from_token('some_token')

        self.assertEqual('test@example.com', email)
        self.assertEqual(1, user_info_endpoint.call_count)
        recorded_request = responses.calls[0].request
        self.assertEqual(
            'Bearer some_token',
            recorded_request.headers['Authorization']
        )

    @responses.activate
    def test_read_email_from_token_bad_request(self):
        responses.get('https://userinfo.example.com', status=400)

        email = self.client.read_email_from_token('some_token')

        self.assertIsNone(email)
