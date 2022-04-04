import { handlerPath } from '@libs/handler-resolver';

import schema from './schema';

export default {
  handler: `${handlerPath(__dirname)}/handler.main`,
  events: [
    {
      http: {
        method: 'post',
        path: 'storeForm',
        request: {
          schemas: {
            'application/json': schema,
          },
        },
      },
    },
  ],
};
