from typing import Union
from urllib.parse import urlencode

import requests


class OAuthClient:
    def __init__(self, client_id: str, client_secret: str, host_url: str, oauth_url: str, user_info_url: str):
        self.__client_id = client_id
        self.__client_secret = client_secret
        self.__host_url = host_url
        self.__oauth_url = oauth_url
        self.__user_info_url = user_info_url

    def auth_url(self, state) -> str:
        query_string = urlencode({
            'client_id': self.__client_id,
            'redirect_uri': f'{self.__host_url}/oauth/callback',
            'response_type': 'code',
            'scope': 'email',
            'state': state,
        })
        return f"{self.__oauth_url}/auth?{query_string}"

    def fetch_access_token(self, code: str) -> Union[None, str]:
        response = requests.post(f'{self.__oauth_url}/token', data={
            'client_id': self.__client_id,
            'client_secret': self.__client_secret,
            'code': code,
            'grant_type': 'authorization_code',
            'redirect_uri': f'{self.__host_url}/oauth/callback',
        }, headers={'Accept': 'application/json'})

        if response.status_code != 200:
            return None

        return response.json().get('access_token')

    def read_email_from_token(self, token: str) -> Union[None, str]:
        response = requests.get(self.__user_info_url, headers={
            'Authorization': f'Bearer {token}',
            'Accept': 'application/json',
        })

        if response.status_code != 200:
            return None

        return response.json().get("email", None)
