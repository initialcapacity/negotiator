import {
    addMessage,
    Negotiation,
    removeLastMessage,
    removeLastPendingMessage,
    truncateAt
} from "../../src/negotiation/negotiation";
import {expect} from "@open-wc/testing";

describe('negotiation', () => {
    const negotiation: Negotiation = {
        id: '838711ba-d574-40b8-8988-433bdd320ad2',
        messages: [
            {role: 'assistant', content: 'how can I help you?', id: '11111111-7981-4e69-b44e-c21b3f88213b'},
            {role: 'user', content: 'not sure', id: '22222222-7981-4e69-b44e-c21b3f88213b'},
        ]
    }

    it('addMessage', () => {
        const result = addMessage(negotiation, {
            role: 'assistant',
            content: 'ok',
            id: '33333333-7981-4e69-b44e-c21b3f88213b'
        })

        expect(result).to.deep.equal({
            id: '838711ba-d574-40b8-8988-433bdd320ad2',
            messages: [
                {role: 'assistant', content: 'how can I help you?', id: '11111111-7981-4e69-b44e-c21b3f88213b'},
                {role: 'user', content: 'not sure', id: '22222222-7981-4e69-b44e-c21b3f88213b'},
                {role: 'assistant', content: 'ok', id: '33333333-7981-4e69-b44e-c21b3f88213b'},
            ]
        })
    })

    it('removeLastMessage', () => {
        const result = removeLastMessage(negotiation)

        expect(result).to.deep.equal({
            id: '838711ba-d574-40b8-8988-433bdd320ad2',
            messages: [
                {role: 'assistant', content: 'how can I help you?', id: '11111111-7981-4e69-b44e-c21b3f88213b'},
            ]
        })
    })

    it('removeLastPendingMessage', () => {
        const result = removeLastPendingMessage(addMessage(negotiation, {role: 'assistant', pending: true}))

        expect(result).to.deep.equal({
            id: '838711ba-d574-40b8-8988-433bdd320ad2',
            messages: [
                {role: 'assistant', content: 'how can I help you?', id: '11111111-7981-4e69-b44e-c21b3f88213b'},
                {role: 'user', content: 'not sure', id: '22222222-7981-4e69-b44e-c21b3f88213b'},
            ]
        })
    })

    it('removeLastPendingMessage with none pending', () => {
        const result = removeLastPendingMessage(negotiation)

        expect(result).to.deep.equal({
            id: '838711ba-d574-40b8-8988-433bdd320ad2',
            messages: [
                {role: 'assistant', content: 'how can I help you?', id: '11111111-7981-4e69-b44e-c21b3f88213b'},
                {role: 'user', content: 'not sure', id: '22222222-7981-4e69-b44e-c21b3f88213b'},
            ]
        })
    })

    it('truncateAt', () => {
        expect(truncateAt(negotiation, '11111111-7981-4e69-b44e-c21b3f88213b')).to.deep.equal({
            id: '838711ba-d574-40b8-8988-433bdd320ad2',
            messages: [
                {role: 'assistant', content: 'how can I help you?', id: '11111111-7981-4e69-b44e-c21b3f88213b'},
            ]
        })

        expect(truncateAt(negotiation, '22222222-7981-4e69-b44e-c21b3f88213b')).to.deep.equal({
            id: '838711ba-d574-40b8-8988-433bdd320ad2',
            messages: [
                {role: 'assistant', content: 'how can I help you?', id: '11111111-7981-4e69-b44e-c21b3f88213b'},
                {role: 'user', content: 'not sure', id: '22222222-7981-4e69-b44e-c21b3f88213b'},
            ]
        })

        expect(truncateAt(negotiation, 'not there')).to.deep.equal({
            id: '838711ba-d574-40b8-8988-433bdd320ad2',
            messages: [
                {role: 'assistant', content: 'how can I help you?', id: '11111111-7981-4e69-b44e-c21b3f88213b'},
                {role: 'user', content: 'not sure', id: '22222222-7981-4e69-b44e-c21b3f88213b'},
            ]
        })
    }) ;
})
