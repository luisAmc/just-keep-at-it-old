import { S3 } from '@aws-sdk/client-s3';

const REGION = 'us-west-2';

export const s3 = new S3({
  region: REGION,
  credentials: {
    accessKeyId: process.env.AWS_ACCESS_KEY as string,
    secretAccessKey: process.env.AWS_SECRET_KEY as string
  }
});
