export type Message = {
    role: 'user' | 'assistant'
} & (
    | { content: string }
    | { pending: true }
    )

export type Negotiation = {
    id: string
    messages: Message[]
}
