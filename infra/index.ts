import * as pulumi from '@pulumi/pulumi';
import * as cloudflare from '@pulumi/cloudflare';

const BUCKET_NAME = 'yomis-blog';

const config = new pulumi.Config();
const apiToken = process.env.CLOUDFLARE_API_TOKEN!;

const provider = new cloudflare.Provider('cloudflare', {
  apiToken: apiToken
});

const yomisBlogBucket = new cloudflare.R2Bucket(BUCKET_NAME, {
  accountId: process.env.CLOUDFLARE_ACCOUNT_ID!,
  name: BUCKET_NAME,
  location: 'weur',
  storageClass: 'Standard'
});
