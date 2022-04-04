import { DynamoDBClient, PutItemCommand } from '@aws-sdk/client-dynamodb';
import type { ValidatedEventAPIGatewayProxyEvent } from '@libs/api-gateway';
import { formatJSONResponse } from '@libs/api-gateway';
import { middyfy } from '@libs/lambda';

import schema from './schema';

const storeForm: ValidatedEventAPIGatewayProxyEvent<
  typeof schema
> = async event => {
  const client = new DynamoDBClient({ region: 'us-east-1' });
  const answer = event.body.form_response.answers.find(
    el => el.field?.id === 'DlXFaesGBpoF',
  );
  const params = new PutItemCommand({
    TableName: 'ts_applications',
    Item: {
      ethereumAddress: { S: answer.field.id as string },
      applied: { BOOL: true },
    },
  });
  await client.send(params);
  return formatJSONResponse({
    message: `Saved`,
    event,
  });
};

export const main = middyfy(storeForm);
