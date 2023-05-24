from dataclasses import dataclass
from uuid import UUID

from flask import Blueprint, render_template, session, redirect, request, jsonify
from flask.typing import ResponseReturnValue

from negotiator.negotiation.assistant import Assistant
from negotiator.negotiation.negotiation_gateway import NegotiationGateway, NegotiationRecord
from negotiator.web_support import json_support


@dataclass
class MessageInfo:
    role: str
    content: str


@dataclass
class NegotiationInfo:
    id: UUID
    messages: list[MessageInfo]


def negotiation_page(negotiation_gateway: NegotiationGateway, assistant: Assistant) -> Blueprint:
    page = Blueprint('negotiation_page', __name__)

    @page.get('/')
    def create() -> ResponseReturnValue:
        negotiation_id = session.get('negotiation_id', None)
        if negotiation_id is None:
            negotiation_id = negotiation_gateway.create()
            session['negotiation_id'] = negotiation_id

        return redirect(f'/negotiation/{negotiation_id}')

    @page.get('/negotiation/<negotiation_id>')
    def show(negotiation_id: UUID) -> ResponseReturnValue:
        record = negotiation_gateway.find(negotiation_id)

        if record is None:
            session.clear()
            return redirect('/')

        info = to_info(record)
        return render_template(
            'negotiation.html',
            negotiation=info,
            negotiation_json=json_support.encode(info)
        )

    @page.post('/negotiation/<negotiation_id>/message')
    def new_message(negotiation_id: UUID) -> ResponseReturnValue:
        record = negotiation_gateway.find(negotiation_id)
        if record is None:
            session.clear()
            return redirect('/')

        request_body = request.get_json(silent=True)

        content = request_body['content']
        negotiation_gateway.add_message(negotiation_id, content, role='user')

        reply = assistant.reply(record)
        negotiation_gateway.add_message(negotiation_id, reply, role='assistant')

        return jsonify({
            'role': 'assistant',
            'content': reply,
        }), 201

    return page


def to_info(record: NegotiationRecord) -> NegotiationInfo:
    return NegotiationInfo(
        id=record.id,
        messages=[
            MessageInfo(role=m.role, content=m.content)
            for m in record.messages
            if m.role != 'system'
        ]
    )
