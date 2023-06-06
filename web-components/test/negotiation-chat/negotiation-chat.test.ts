import {renderComponent} from "../render-helper";
import {expect, html, nextFrame} from "@open-wc/testing";
import {rest, setupWorker} from "msw";

describe('negotiation-chat', () => {
    const worker = setupWorker(rest.post('/negotiation/negotiation-1234/message', (req, res, ctx) => {
        return res(
            ctx.status(201),
            ctx.json({
                'role': 'assistant',
                'content': 'assistant reply',
            }),
        )
    }))

    beforeEach(async () => {
        await worker.start({quiet: true})
    })

    afterEach(() => {
        worker.resetHandlers()
        worker.stop()
    })

    it('renders replies', async () => {
        const element = await renderComponent(html`
            <negotiation-chat .negotiation=${
                    {
                        id: 'negotiation-1234', messages: [
                            {role: 'assistant', content: 'hi there'},
                            {role: 'user', content: 'hi yourself'},
                        ]
                    }
            }></negotiation-chat>
        `)


        element.querySelector('input').value = 'user message'
        element.querySelector('button').click()

        await waitForPromiseToResolve();

        expect(element.querySelector('input').value).to.equal('')
        expect(element.textContent).to.contain('user message')
        expect(element.textContent).to.contain('assistant reply')
    })
})

async function waitForPromiseToResolve() {
    await nextFrame();
    await nextFrame();
    await nextFrame();
}
