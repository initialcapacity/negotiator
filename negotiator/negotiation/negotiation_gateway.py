from dataclasses import dataclass
from typing import Optional
from uuid import UUID, uuid4


@dataclass
class MessageRecord:
    role: str
    content: str


@dataclass
class NegotiationRecord:
    id: UUID
    messages: list[MessageRecord]


class NegotiationGateway:
    def __init__(self) -> None:
        self.negotiations: dict[str, NegotiationRecord] = {}

    def create(self):
        negotiation_id = uuid4()
        self.negotiations[str(negotiation_id)] = NegotiationRecord(
            id=negotiation_id,
            messages=[
                MessageRecord(role="system", content="You are a used car salesman"),
                MessageRecord(role="assistant", content="Hi there. I see you're looking at this new car"),
            ]
        )
        return negotiation_id

    def find(self, negotiation_id: UUID) -> Optional[NegotiationRecord]:
        return self.negotiations.get(str(negotiation_id), None)

    def add_message(self, negotiation_id: UUID, message: str, role: str) -> None:
        record = self.find(negotiation_id)
        if record is None:
            return

        record.messages.append(MessageRecord(role=role, content=message))
