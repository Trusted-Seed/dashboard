export default {
  type: 'object',
  properties: {
    ethereumAddress: { type: 'string' },
  },
  required: ['ethereumAddress'],
} as const;
