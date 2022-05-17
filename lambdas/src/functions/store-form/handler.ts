import { DynamoDBClient, PutItemCommand } from '@aws-sdk/client-dynamodb';
import type { ValidatedEventAPIGatewayProxyEvent } from '@libs/api-gateway';
import { formatJSONResponse } from '@libs/api-gateway';
import { middyfy } from '@libs/lambda';

import schema from './schema';

const storeForm: ValidatedEventAPIGatewayProxyEvent<
  typeof schema
> = async event => {
  const client = new DynamoDBClient({ region: 'us-east-1' });
  const answerAddress = event.body.form_response.answers.find(
    el => el.field?.id === 'AHWHiljlbokk',
  );
  const answerDate = event.body.form_response.submitted_at;
  const params = new PutItemCommand({
    TableName: 'ts_applications',
    Item: {
      ethereumAddress: { S: answerAddress.text.toLowerCase() as string },
      applied: { BOOL: true },
      applyDate: { S: answerDate as string },
    },
  });
  await client.send(params);
  return formatJSONResponse({
    message: `Saved`,
    event,
  });
};

export const main = middyfy(storeForm);
