import requests

from negotiator.negotiation.negotiation_service import Negotiation


class Assistant:
    def __init__(self, api_key: str, base_url: str):
        self.api_key = api_key
        self.base_url = base_url

    def reply(self, negotiation: Negotiation) -> str:
        response = requests.post(
            f"{self.base_url}/chat/completions",
            headers={
                "Authorization": f"Bearer {self.api_key}",
                "Content-Type": "application/json",
            },
            json={
                "model": "gpt-4o",
                "messages": [
                    {'role': m.role, 'content': m.content}
                    for m in negotiation.messages
                    if m.role in ['user', 'assistant', 'system']
                ]
            },
        )

        return response.json()["choices"][0]["message"]["content"]
