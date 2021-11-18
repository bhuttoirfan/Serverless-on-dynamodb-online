import 'source-map-support/register';

import type { ValidatedEventAPIGatewayProxyEvent } from '@libs/apiGateway';
import { formatJSONResponse } from '@libs/apiGateway';
import { middyfy } from '@libs/lambda';

// import schema from './schema';

import * as AWS from 'aws-sdk';
const dynamo_db = new AWS.DynamoDB.DocumentClient({
  // region: "localhost"
});

const handler = async (event) => {
  
  const key = event.body.author;
  const description = event.body.title;

  const params = {
    TableName: 'blog-table-irfan',
    Key: {author: key},
    UpdateExpression: "set title = :anything",
    ExpressionAttributeValues: {
      ":anything": description
    }
  };

  await dynamo_db.update(params).promise();

  return formatJSONResponse({
    message: "Item successfully updated."
  });
}

export const main = middyfy(handler);
