from dataclasses import dataclass
from typing import cast
from uuid import UUID

from flask import Blueprint, render_template, redirect, request, jsonify
from flask.typing import ResponseReturnValue
from negotiator.negotiation.assistant import Assistant
from negotiator.negotiation.negotiation_service import NegotiationService, NewMessage, Negotiation
from negotiator.web_support import json_support


@dataclass
class MessageInfo:
    role: str
    content: str


@dataclass
class NegotiationInfo:
    id: UUID
    messages: list[MessageInfo]


def negotiation_page(negotiation_service: NegotiationService, assistant: Assistant) -> Blueprint:
    page = Blueprint('negotiation_page', __name__)

    @page.get('/')
    def create() -> ResponseReturnValue:
        negotiation_id = negotiation_service.create()
        return redirect(f'/negotiation/{negotiation_id}')

    @page.get('/negotiation/<negotiation_id>')
    def show(negotiation_id: UUID) -> ResponseReturnValue:
        negotiation = negotiation_service.find(negotiation_id)

        if negotiation is None:
            return redirect('/')

        return render_template(
            'negotiation.html',
            negotiation_json=json_support.encode(to_info(negotiation))
        )

    @page.post('/negotiation/<negotiation_id>/message')
    def new_message(negotiation_id: UUID) -> ResponseReturnValue:
        negotiation = negotiation_service.find(negotiation_id)
        if negotiation is None:
            return redirect('/')

        request_body = cast(
            dict[str, str],
            request.get_json(silent=True)
        )

        content = request_body['content']
        reply = assistant.reply(negotiation.with_message(role='user', content=content))

        negotiation_service.add_messages(negotiation_id, [
            NewMessage(role='user', content=content),
            NewMessage(role='assistant', content=reply),
        ])

        return jsonify({
            'role': 'assistant',
            'content': reply,
        }), 201

    return page


def to_info(record: Negotiation) -> NegotiationInfo:
    return NegotiationInfo(
        id=record.id,
        messages=[
            MessageInfo(role=m.role, content=m.content)
            for m in record.messages
            if m.role != 'system'
        ]
    )
