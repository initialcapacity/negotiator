export type Message = {
    role: string
    content: string
}

export type Negotiation = {
    id: string
    messages: Message[]
}
