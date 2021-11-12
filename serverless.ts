import type { AWS } from '@serverless/typescript';

import postBlog from '@functions/postBlog';
import getBlog from '@functions/getBlog';
import updateBlog from '@functions/updateBlog';

const serverlessConfiguration: AWS = {
  service: 'dynamo-crud-in-ts',
  frameworkVersion: '2',
  custom: {

    dynamodb: {
      stages: ['dev'], 
      start: {
        port: 8000,
        migrate: true,
        seed: true
      }  
    },
    
    esbuild: {
      bundle: true,
      minify: false,
      sourcemap: true,
      exclude: ['aws-sdk'],
      target: 'node14',
      define: { 'require.resolve': undefined },
      platform: 'node',
    },
  },
  plugins: ['serverless-esbuild', 'serverless-offline', 'serverless-dynamodb-local'],
  provider: {
    name: 'aws',
    runtime: 'nodejs14.x',
    // region: 'eu-west-2',
    iamRoleStatements: [
      {
        Effect: 'Allow',
        Action: ['dynamodb:*'],
        // Resource: 'arn:aws:dynamodb:${self:provider.region}:${self:provider.environment.AWS_ACCOUNT_ID}:table/${self:provider.environment.BLOG_TABLE}'
        Resource: ['arn:aws:dynamodb:eu-west-2:218767131295:table/blog-table-irfan']
      }
    ],
    apiGateway: {
      minimumCompressionSize: 1024,
      shouldStartNameWithService: true,
    },
    environment: {
      AWS_NODEJS_CONNECTION_REUSE_ENABLED: '1',
      NODE_OPTIONS: '--enable-source-maps --stack-trace-limit=1000',
      // AWS_ACCOUNT_ID: '218767131295',
      // BLOG_TABLE:'blog-table-irfan'
    },
    lambdaHashingVersion: '20201221',
  },
  resources:{
    Resources:{
      blogTable:{
        Type:"AWS::DynamoDB::Table",
        Properties:{
          TableName:"blog-table-irfan",
          AttributeDefinitions:[
            {AttributeName:"author", AttributeType:"S"}
          ],
          KeySchema:[
            {AttributeName:"author", KeyType:"HASH"}
          ],
          BillingMode:'PAY_PER_REQUEST',
        },
      }
    }
  },
  // import the function via paths
  functions: { postBlog, getBlog, updateBlog },
};

module.exports = serverlessConfiguration;
