from typing import Union
from urllib.parse import urlencode

import requests


class OAuthClient:
    def __init__(self, client_id: str, client_secret: str, host_url: str):
        self.__client_id = client_id
        self.__client_secret = client_secret
        self.__host_url = host_url

    def auth_url(self, state) -> str:
        query_string = urlencode({
            'client_id': self.__client_id,
            'redirect_uri': f'{self.__host_url}/oauth/callback',
            'response_type': 'code',
            'scope': 'email',
            'state': state,
        })
        return f"https://accounts.google.com/o/oauth2/auth?{query_string}"

    def fetch_access_token(self, code: str) -> Union[None, str]:
        response = requests.post('https://accounts.google.com/o/oauth2/token', data={
            'client_id': self.__client_id,
            'client_secret': self.__client_secret,
            'code': code,
            'grant_type': 'authorization_code',
            'redirect_uri': f'{self.__host_url}/oauth/callback',
        }, headers={'Accept': 'application/json'})

        if response.status_code != 200:
            return None

        return response.json().get('access_token')

    @staticmethod
    def read_email_from_token(token: str) -> Union[None, str]:
        response = requests.get('https://www.googleapis.com/oauth2/v3/userinfo', headers={
            'Authorization': f'Bearer {token}',
            'Accept': 'application/json',
        })

        if response.status_code != 200:
            return None

        return response.json().get("email", None)
