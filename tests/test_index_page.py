from unittest import TestCase

from negotiator.index_page import index_page
from tests.blueprint_test_support import test_client


class TestIndexPage(TestCase):
    def test_index(self):
        client = test_client(index_page())

        response = client.get('/')

        self.assertEqual(200, response.status_code)
        self.assertIn('Log in', response.text)

    def test_index_authenticated(self):
        client = test_client(index_page(), authenticated=True)

        response = client.get('/')

        self.assertEqual(200, response.status_code)
        self.assertIn('Get started', response.text)
