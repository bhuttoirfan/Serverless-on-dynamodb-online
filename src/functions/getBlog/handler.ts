import 'source-map-support/register';

import type { ValidatedEventAPIGatewayProxyEvent } from '@libs/apiGateway';
import { formatJSONResponse } from '@libs/apiGateway';
import { middyfy } from '@libs/lambda';

import schema from './schema';

import * as AWS from 'aws-sdk';
const dynamo_db = new AWS.DynamoDB.DocumentClient({
  region: "localhost"
});

const handler: ValidatedEventAPIGatewayProxyEvent<typeof schema> = async (event) => {
  
  // const {author} = event.queryStringParameters;
  const author = event.body.author;
  const result = await dynamo_db.get({TableName: 'blog-table-irfan', Key: {author} }).promise();

  return formatJSONResponse({
    result,
    author
  });
}

export const main = middyfy(handler);
