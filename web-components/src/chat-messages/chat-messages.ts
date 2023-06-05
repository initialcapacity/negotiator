import {customElement, property} from "lit/decorators.js";
import {html, LitElement, PropertyValues} from "lit";
import {Message} from "../negotiation/negotiation.ts";
import './chat-messages.css'

@customElement('chat-messages')
export class ChatMessagesComponent extends LitElement {

    @property({attribute: 'messages', type: Array})
    messages: Message[] = [];

    createRenderRoot() {
        return this;
    }

    protected update(changedProperties: PropertyValues) {
        super.update(changedProperties);

        this.scroll({ top: this.scrollHeight, behavior: 'smooth' });
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
