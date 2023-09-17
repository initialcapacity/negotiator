from unittest import TestCase

import responses

from negotiator.oauth.oauth_client import OAuthClient


class TestOAuthClient(TestCase):
    def test_auth_url(self):
        client = OAuthClient('some_client_id', 'some_client_secret', 'https://example.com')
        auth_url = client.auth_url('some_state')
        self.assertEqual(
            'https://accounts.google.com/o/oauth2/auth?client_id=some_client_id&redirect_uri=https%3A%2F%2Fexample.com%2Foauth%2Fcallback&response_type=code&scope=email&state=some_state',
            auth_url
        )

    @responses.activate
    def test_fetch_access_token(self):
        client = OAuthClient('some_client_id', 'some_client_secret', 'https://example.com')
        token_endpoint = responses.post(
            'https://accounts.google.com/o/oauth2/token',
            json={'access_token': 'some_access_token'}
        )

        access_token = client.fetch_access_token('some_code')

        self.assertEqual('some_access_token', access_token)
        self.assertEqual(1, token_endpoint.call_count)
        recorded_request = responses.calls[0].request
        self.assertEqual(
            "client_id=some_client_id&client_secret=some_client_secret&code=some_code&grant_type=authorization_code&redirect_uri=https%3A%2F%2Fexample.com%2Foauth%2Fcallback",
            recorded_request.body
        )

    @responses.activate
    def test_fetch_access_token_bad_request(self):
        client = OAuthClient('some_client_id', 'some_client_secret', 'https://example.com')
        responses.post(
            'https://accounts.google.com/o/oauth2/token',
            status=400
        )

        access_token = client.fetch_access_token('some_code')

        self.assertIsNone(access_token)

    @responses.activate
    def test_read_email_from_token(self):
        user_info_endpoint = responses.get(
            'https://www.googleapis.com/oauth2/v3/userinfo',
            json={'email': 'test@example.com'}
        )

        email = OAuthClient.read_email_from_token('some_token')

        self.assertEqual('test@example.com', email)
        self.assertEqual(1, user_info_endpoint.call_count)
        recorded_request = responses.calls[0].request
        self.assertEqual(
            'Bearer some_token',
            recorded_request.headers['Authorization']
        )

    @responses.activate
    def test_read_email_from_token_bad_request(self):
        responses.get(
            'https://www.googleapis.com/oauth2/v3/userinfo',
            status=400
        )

        email = OAuthClient.read_email_from_token('some_token')

        self.assertIsNone(email)
