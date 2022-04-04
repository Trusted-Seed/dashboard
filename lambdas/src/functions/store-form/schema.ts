export default {
  type: 'object',
  properties: {
    event_id: { type: 'string' },
    form_response: {
      type: 'object',
      properties: {
        answers: {
          type: 'array',
          items: {
            type: 'object',
            properites: {
              type: { type: 'string' },
              text: { type: 'string' },
              field: {
                type: 'object',
                properites: {
                  id: { type: 'string' },
                  type: { type: 'string' },
                },
              },
            },
          },
        },
      },
    },
  },
} as const;
