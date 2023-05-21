import openai

from negotiator.negotiation.negotiation_gateway import NegotiationRecord


class Assistant:
    def reply(self, negotiation: NegotiationRecord) -> str:
        chat_completion = openai.ChatCompletion.create(model="gpt-3.5-turbo", messages=messages_from(negotiation))

        return chat_completion.choices[0].message.content


def messages_from(negotiation: NegotiationRecord) -> list[dict[str, str]]:
    return [
        {'role': m.role, 'content': m.content}
        for m in negotiation.messages
        if m.role in ['user', 'assistant', 'system']
    ]
