import { S3Client } from '@aws-sdk/client-s3';
import { defaultProvider } from '@aws-sdk/credential-provider-node';

const credentials = defaultProvider();

export const s3Client = new S3Client({
  region: process.env.AWS_REGION,
  credentials,
});
