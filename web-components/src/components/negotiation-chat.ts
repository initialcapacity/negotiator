import {customElement, property} from "lit/decorators.js";
import {html, LitElement} from "lit";
import {Message, Negotiation} from "./negotiation.ts";
import './negotiation-chat.css'
import {AddMessage} from "./chat-input.ts";

@customElement('negotiation-chat')
export class NegotiationChatComponent extends LitElement {

    @property({attribute: 'negotiation', type: Object})
    negotiation: Negotiation = {id: '', messages: []};

    createRenderRoot() {
        return this;
    }

    private addMessage = (message: Message) => {
        this.negotiation = {
            ...this.negotiation,
            messages: [...this.negotiation.messages, message]
        }
    }

    private handleAddMessage = async (e: CustomEvent<AddMessage>) => {
        const message: Message = {role: "user", content: e.detail.content};
        this.addMessage(message)
        const response = await fetch(`/negotiation/${this.negotiation.id}/message`, {
            method: "POST",
            headers: {"Content-Type": "application/json"},
            body: JSON.stringify(message),
        });

        const reply = await response.json()
        this.addMessage(reply)
    }

    render() {
        return html`
            <chat-messages .messages=${this.negotiation.messages}></chat-messages>
            <chat-input @add-message=${this.handleAddMessage}></chat-input>
        `
    }
}
