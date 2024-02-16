export const endpoints = {
    '/negotiation/negotiation-1234/messages': {
        statusCode: 201,
        body: JSON.stringify({
                'role': 'assistant',
                'content': 'assistant reply',
            })
    },
    '/negotiation/negotiation-1234/messages/11111111-7981-4e69-b44e-c21b3f88213b/reset': {
        statusCode: 204
    },
}
