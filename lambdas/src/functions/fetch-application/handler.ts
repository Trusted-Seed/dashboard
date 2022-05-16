import { DynamoDBClient } from '@aws-sdk/client-dynamodb';
import { GetCommand } from '@aws-sdk/lib-dynamodb';
import type { ValidatedEventAPIGatewayProxyEvent } from '@libs/api-gateway';
import { formatJSONResponse } from '@libs/api-gateway';
import { middyfy } from '@libs/lambda';

import schema from './schema';

const fetchApp: ValidatedEventAPIGatewayProxyEvent<
  typeof schema
> = async event => {
  const client = new DynamoDBClient({ region: 'us-east-1' });
  const params = new GetCommand({
    TableName: 'ts_applications',
    Key: {
      ethereumAddress: event.body.ethereumAddress as string,
    },
  });
  const exist = await client.send(params);
  return formatJSONResponse({
    exists: !!exist?.Item,
    applicationDate: exist?.Item?.applyDate,
    event,
  });
};

export const main = middyfy(fetchApp);
