import 'source-map-support/register';

import type { ValidatedEventAPIGatewayProxyEvent } from '@libs/apiGateway';
import { formatJSONResponse } from '@libs/apiGateway';
import { middyfy } from '@libs/lambda';

import schema from './schema';

import * as AWS from 'aws-sdk';
const dynamo_db = new AWS.DynamoDB.DocumentClient({
  //****************** For Offline *******************************/
  // region: "localhost",
  // endpoint: "http://localhost:8000"
});

const handler: ValidatedEventAPIGatewayProxyEvent<typeof schema> = async (event) => {
  
  const body = event.body;
  const blog_params = {
    TableName: "blog-table-irfan",
    Item: {
      ...body
    }
  }
  
  await dynamo_db.put(blog_params).promise();

  return formatJSONResponse({
    message: "Item successfully added."
  });
}

export const main = middyfy(handler);
