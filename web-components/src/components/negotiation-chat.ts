import {customElement, property, state} from "lit/decorators.js";
import {html, LitElement} from "lit";
import {Message, Negotiation} from "./negotiation.ts";
import './negotiation-chat.css'
import {AddMessage} from "./chat-input.ts";

@customElement('negotiation-chat')
export class NegotiationChatComponent extends LitElement {

    @property({attribute: 'negotiation', type: Object})
    negotiation: Negotiation = {id: '', messages: []};

    @state()
    message = ''

    createRenderRoot() {
        return this;
    }

    private addMessage = (message: Message) => {
        this.negotiation = {
            ...this.negotiation,
            messages: [...this.negotiation.messages, message]
        }
    }

    private removeLastMessage = () => {
        this.negotiation = {
            ...this.negotiation,
            messages: this.negotiation.messages.slice(0, -1)
        }
    }

    private removeLastPendingMessage = () => {
        const lastMessage = this.negotiation.messages[this.negotiation.messages.length - 1]

        if ('pending' in lastMessage) {
            this.removeLastMessage()
        }
    }

    private handleAddMessage = async (e: CustomEvent<AddMessage>) => {
        this.message = ''
        const message: Message = {role: "user", content: e.detail.content};
        this.addMessage(message)
        this.addMessage({role: "assistant", pending: true})

        const response = await fetch(`/negotiation/${this.negotiation.id}/message`, {
            method: "POST",
            headers: {"Content-Type": "application/json"},
            body: JSON.stringify(message),
        });

        if (response.status === 201) {
            const reply = await response.json()
            this.removeLastPendingMessage()
            this.addMessage(reply)
        } else {
            this.removeLastPendingMessage()
            this.removeLastMessage()
            this.message = e.detail.content
        }
    }

    render() {
        return html`
            <chat-messages .messages=${this.negotiation.messages}></chat-messages>
            <chat-input @add-message=${this.handleAddMessage} .message=${this.message}></chat-input>
        `
    }
}
