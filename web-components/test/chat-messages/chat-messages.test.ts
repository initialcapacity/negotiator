import {expect, html, oneEvent} from '@open-wc/testing';
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

    it('publishes an event on reset', async () => {
        const element = await renderComponent(html`
            <chat-messages .messages=${[
                {role: 'assistant', content: 'hi there', id: '11111111-7981-4e69-b44e-c21b3f88213b'},
                {role: 'user', content: 'hi yourself', id: '22222222-7981-4e69-b44e-c21b3f88213b'},
            ]}></chat-messages>
        `)
        const resetMessageListener = oneEvent(element, 'reset-to-message');

        const assistantMessage = element.querySelector('.message.assistant') as HTMLElement;
        assistantMessage.click()

        const {detail} = await resetMessageListener;
        expect(detail).to.eql({'id': '11111111-7981-4e69-b44e-c21b3f88213b'})
    })
})
