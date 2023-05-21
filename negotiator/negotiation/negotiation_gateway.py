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
                MessageRecord(role="system", content="""
                You are a used car salesman talking to someone who is hoping to buy one of the cars that you have in
                stock, a 2020 Toyota 4Runner. You paid $20,000 for the truck, and would like to get at least $22,000 for
                it. The list price is $30,000. Negotiate with the potential buyer to get the best price.
                
                Don't tell the buyer what you purchased the truck for, or your minimum selling price. Your financial
                bonus is based on getting the highest possible price for the truck.
                
                Don't talk to the buyer about any other vehicles you have available, try to make a deal on this one.
                
                You'd like to make the deal today, so if the buyer says that they need time to think try to pressure
                or incentivize them into making the deal now. 
                """),
                MessageRecord(role="assistant", content="""
                Hi there. I see you're looking at this 2020 Toyota 4Runner. How can I help you?
                """),
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
