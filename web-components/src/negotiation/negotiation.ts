export type Message = {
    role: 'user' | 'assistant'
} & (
    | { id: string, content: string }
    | { pending: true }
    )

export type Negotiation = {
    id: string
    messages: Message[]
}

export const addMessage = (negotiation: Negotiation, ...messages: Message[]): Negotiation => ({
    ...negotiation,
    messages: [...negotiation.messages, ...messages]
})

export const removeLastMessage = (negotiation: Negotiation): Negotiation => ({
    ...negotiation,
    messages: negotiation.messages.slice(0, -1)
})

export const removeLastPendingMessage = (negotiation: Negotiation): Negotiation => {
    const lastMessage = negotiation.messages[negotiation.messages.length - 1]

    if ('pending' in lastMessage) {
        return removeLastMessage(negotiation)
    } else {
        return negotiation
    }
}

export const truncateAt = (negotiation: Negotiation, messageId: string): Negotiation => {
    const keepIndex = negotiation.messages.findIndex(message => 'id' in message && message.id === messageId)

    if (keepIndex === -1) {
        return negotiation
    }

    return ({
        ...negotiation,
        messages: negotiation.messages.slice(0, keepIndex + 1)
    });
}
