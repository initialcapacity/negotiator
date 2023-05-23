import {customElement, state} from "lit/decorators.js";
import {Ref, ref, createRef} from 'lit/directives/ref.js';
import {html, LitElement} from "lit";
import "./chat-input.css"

export type AddMessage = {
    content: string
}

@customElement('chat-input')
export class ChatInputComponent extends LitElement {

    @state()
    message: string = '';

    private messageInputRef: Ref<HTMLInputElement> = createRef();

    private handleSubmit = (e: Event) => {
        e.preventDefault()
        const event = new CustomEvent<AddMessage>('add-message', {
            detail: {
                content: this.messageInputRef.value!.value
            }
        });
        this.dispatchEvent(event);

        this.messageInputRef.value!.value = ''
    }

    createRenderRoot() {
        return this;
    }

    render() {
        return html`
            <form @submit=${this.handleSubmit}>
                <input ${ref(this.messageInputRef)} type="text">
                <button type="submit">Send</button>
            </form>
        `
    }
}
