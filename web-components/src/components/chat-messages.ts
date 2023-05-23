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
        return html`<div class="message ${message.role}">${message.content}</div>`
    }

    render() {
        return this.messages.map(this.renderMessage)
    }
}
