import {customElement, property} from "lit/decorators.js";
import {html, LitElement, PropertyValues} from "lit";
import {Message} from "../negotiation/negotiation.ts";
import './chat-messages.css'

export type ResetToMessage = {
    id: string
}

@customElement('chat-messages')
export class ChatMessagesComponent extends LitElement {

    @property({attribute: 'messages', type: Array})
    messages: Message[] = [];

    createRenderRoot = () => this;

    protected update(changedProperties: PropertyValues) {
        super.update(changedProperties);

        this.scroll({top: this.scrollHeight, behavior: 'smooth'});
    }

    private handleReset = (id: string) => {
        return (e: Event) => {
            e.preventDefault()
            const event = new CustomEvent<ResetToMessage>('reset-to-message', {detail: {id}});
            this.dispatchEvent(event);
        }
    }

    private renderMessage = (message: Message) =>
        'pending' in message
            ? html`
                    <div class="message ${message.role} pending">
                        <flashing-dots></flashing-dots>
                    </div>`
            : html`
                    <div class="message ${message.role}" @click=${this.handleReset(message.id)}>
                        ${message.content}
                    </div>`

    render = () => this.messages.map(this.renderMessage);
}
