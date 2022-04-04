import fetchApp from '@functions/fetch-application';
import hello from '@functions/hello';
import storeForm from '@functions/store-form';
import type { AWS } from '@serverless/typescript';

const serverlessConfiguration: AWS = {
  service: 'lambdas',
  frameworkVersion: '3',
  plugins: ['serverless-esbuild'],
  useDotenv: true,
  provider: {
    name: 'aws',
    runtime: 'nodejs14.x',
    apiGateway: {
      minimumCompressionSize: 1024,
      shouldStartNameWithService: true,
    },
    environment: {
      AWS_NODEJS_CONNECTION_REUSE_ENABLED: '1',
      NODE_OPTIONS: '--enable-source-maps --stack-trace-limit=1000',
      AWS_SECRET_ACCESS_KEY: '${env:AWS_SECRET}',
      AWS_ACCESS_KEY_ID: '${env:AWS_ACCESS_KEY}',
    },
  },
  // import the function via paths
  functions: { hello, storeForm, fetchApp },
  package: { individually: true },
  custom: {
    esbuild: {
      bundle: true,
      minify: false,
      sourcemap: true,
      exclude: ['aws-sdk'],
      target: 'node14',
      define: { 'require.resolve': undefined },
      platform: 'node',
      concurrency: 10,
    },
  },
};

module.exports = serverlessConfiguration;
