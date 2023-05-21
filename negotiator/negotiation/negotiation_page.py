from dataclasses import dataclass
from uuid import UUID

from flask import Blueprint, render_template, session, redirect, request
from flask.typing import ResponseReturnValue

from negotiator.negotiation.assistant import Assistant
from negotiator.negotiation.negotiation_gateway import NegotiationGateway, NegotiationRecord


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

        return render_template(
            'negotiation.html',
            negotiation=to_info(record)
        )

    @page.post('/negotiation/<negotiation_id>/message')
    def new_message(negotiation_id: UUID) -> ResponseReturnValue:
        content = request.form['message']
        record = negotiation_gateway.find(negotiation_id)

        if record is None:
            session.clear()
            return redirect('/')

        negotiation_gateway.add_message(negotiation_id, content, role='user')
        negotiation_gateway.add_message(negotiation_id, assistant.reply(record), role='assistant')

        return redirect(f'/negotiation/{ negotiation_id }')

    return page


def to_info(record: NegotiationRecord) -> NegotiationInfo:
    return NegotiationInfo(
        id=record.id,
        messages=[
            MessageInfo(role=m.role, content=m.content)
            for m in record.messages
            if m.role is not 'system'
        ]
    )
