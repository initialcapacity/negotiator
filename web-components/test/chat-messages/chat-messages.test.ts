import {expect, html} from '@open-wc/testing';
import {renderComponent} from "../render-helper";

describe('chat-messages', () => {
    it('renders messages', async () => {
        const element = await renderComponent(html`
            <chat-messages .messages=${[
                {role: 'assistant', content: 'assistant message'},
                {role: 'user', content: 'user message'},
                {role: 'assistant', pending: true},
            ]}></chat-messages>
        `)

        expect(element).lightDom.to.equal(`
        <div class="assistant message">
                assistant message
            </div>
            <div class="message user">
                user message
            </div>
            <div class="assistant message pending">
                <flashing-dots></flashing-dots>
        </div>`)
    })
})
