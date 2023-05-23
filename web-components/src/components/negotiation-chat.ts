import {customElement, property} from "lit/decorators.js";
import {html, LitElement} from "lit";
import {Negotiation} from "./negotiation.ts";
import './negotiation-chat.css'

@customElement('negotiation-chat')
export class NegotiationChatComponent extends LitElement {

    @property({attribute: 'negotiation', type: Object})
    negotiation: Negotiation = {id: '', messages: []};

    createRenderRoot() {
        return this;
    }

    render() {
        return html`
            <chat-messages .messages=${this.negotiation.messages}></chat-messages>
            
            <form action="/negotiation/${this.negotiation.id}/message" method="post" class="new-message">
                <input type="text" name="message">
                <button type="submit">Send</button>
            </form>
        `
    }
}
