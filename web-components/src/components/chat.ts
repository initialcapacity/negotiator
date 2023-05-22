import {customElement} from "lit/decorators.js";
import {html, LitElement} from "lit";
import './chat.css'

@customElement('chat-view')
export class ChatComponent extends LitElement {

    createRenderRoot() {
        return this;
    }

    render() {
        return html`<h1>chat</h1>`;
    }
}
