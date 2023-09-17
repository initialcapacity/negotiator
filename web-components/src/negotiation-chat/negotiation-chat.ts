import {customElement, property, state} from "lit/decorators.js";
import {html, LitElement} from "lit";
import {
    addMessage,
    Message,
    Negotiation,
    removeLastMessage,
    removeLastPendingMessage, truncateAt
} from "../negotiation/negotiation.ts";
import './negotiation-chat.css'
import {AddMessage} from "../chat-input/chat-input.ts";
import {ResetToMessage} from "../chat-messages/chat-messages.ts";

@customElement('negotiation-chat')
export class NegotiationChatComponent extends LitElement {

    @property({attribute: 'negotiation', type: Object})
    negotiation: Negotiation = {id: '', messages: []};

    @state()
    message = ''

    createRenderRoot = () => this;

    private handleAddMessage = async (e: CustomEvent<AddMessage>) => {
        this.message = ''
        const message: Message = {id: crypto.randomUUID(), role: "user", content: e.detail.content};
        this.negotiation = addMessage(this.negotiation, message, {role: "assistant", pending: true})

        const response = await fetch(`/negotiation/${this.negotiation.id}/messages`, {
            method: "POST",
            headers: {"Content-Type": "application/json"},
            body: JSON.stringify(message),
        });

        if (response.status === 201) {
            const reply = await response.json()
            this.negotiation = removeLastPendingMessage(this.negotiation)
            this.negotiation = addMessage(this.negotiation, reply)
        } else {
            this.negotiation = removeLastPendingMessage(this.negotiation)
            this.negotiation = removeLastMessage(this.negotiation)
            this.message = e.detail.content
        }
    }

    private handleReset = async (e: CustomEvent<ResetToMessage>) => {
        let messageId = e.detail.id;
        const response = await fetch(
            `/negotiation/${this.negotiation.id}/messages/${messageId}/reset`,
            {method: "POST"}
        );

        if (response.status === 204) {
            this.negotiation = truncateAt(this.negotiation, messageId)
        } else {
            console.error(`problem resetting to message ${messageId}`)
        }
    }

    render = () => html`
        <chat-messages
                .messages=${this.negotiation.messages}
                @reset-to-message=${this.handleReset}
        ></chat-messages>
        <chat-input
                @add-message=${this.handleAddMessage}
                .message=${this.message}
        ></chat-input>
    `;
}
