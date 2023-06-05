import {renderComponent} from "../render-helper";
import {expect, html, oneEvent} from "@open-wc/testing";

describe('chat-input', () => {
    it('renders the default message', async () => {
        const element = await renderComponent(html`
            <chat-input message='user message'></chat-input>
        `)

        expect(element.querySelector('input').value).to.equal('user message')
    })

    it('publishes an event on submit', async () => {
        const element = await renderComponent(html`
            <chat-input message='user message'></chat-input>
        `)
        element.querySelector('input').value = 'another user message'
        const addMessageListener = oneEvent(element, 'add-message');

        element.querySelector('button').click()

        const { detail } = await addMessageListener;
        expect(detail).to.eql({'content': 'another user message'})
    })
})
