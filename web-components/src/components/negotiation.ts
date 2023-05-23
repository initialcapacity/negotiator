export type Message = {
    role: 'user' | 'assistant'
    content: string
}

export type Negotiation = {
    id: string
    messages: Message[]
}
