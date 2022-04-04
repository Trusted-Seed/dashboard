export default {
  type: 'object',
  properties: {
    ethereumAddress: { type: 'string' },
  },
  required: ['name'],
} as const;
