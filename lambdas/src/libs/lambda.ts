import middy, { MiddyfiedHandler } from '@middy/core';
import middyJsonBodyParser from '@middy/http-json-body-parser';
import type {
  APIGatewayProxyEvent,
  APIGatewayProxyResult,
  Context,
  Handler,
} from 'aws-lambda';
import type { FromSchema } from 'json-schema-to-ts';

interface NormalizedValidatedEvent<S>
  extends Omit<APIGatewayProxyEvent, 'body'> {
  queryStringParameters: NonNullable<
    APIGatewayProxyEvent['queryStringParameters']
  >;
  multiValueQueryStringParameters: NonNullable<
    APIGatewayProxyEvent['multiValueQueryStringParameters']
  >;
  pathParameters: NonNullable<APIGatewayProxyEvent['pathParameters']>;
  body: FromSchema<S>;
}

export type CustomAPIGatewayProxyEventHandler<S> = Handler<
  NormalizedValidatedEvent<S>,
  APIGatewayProxyResult
>;

export const middyfy = (
  handler: CustomAPIGatewayProxyEventHandler<never>,
): MiddyfiedHandler<
  NormalizedValidatedEvent<never>,
  APIGatewayProxyResult,
  Error,
  Context
> => {
  return middy(handler).use(middyJsonBodyParser());
};
