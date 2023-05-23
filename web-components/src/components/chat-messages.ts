import {customElement, property} from "lit/decorators.js";
import {html, LitElement} from "lit";
import {Message} from "./negotiation.ts";
import './chat-messages.css'

@customElement('chat-messages')
export class ChatMessagesComponent extends LitElement {

    @property({attribute: 'messages', type: Array})
    messages: Message[] = [];

    createRenderRoot() {
        return this;
    }

    private renderMessage(message: Message) {
        if ('pending' in message) {
            return html`<div class="message ${message.role} pending">
                <flashing-dots></flashing-dots>
            </div>`
        } else {
            return html`<div class="message ${message.role}">${message.content}</div>`
        }
    }

    render() {
        return this.messages.map(this.renderMessage)
    }
}
