# Setup Guide:

Setup the AWS CLI for Cloudflare R2:

```toml
# ~/.aws/config
[profile cloudflare]
endpoint_url = https://<CLOUDFLARE_ACCOUNT_ID>.r2.cloudflarestorage.com
```

```toml
# ~/.aws/credentials
[cloudflare]
aws_access_key_id = <>
aws_secret_access_key = <>
```

To copy assets to Cloudflare R2, use the AWS CLI with the appropriate profile and endpoint URL. Run the following command:

```sh
aws --profile cloudflare s3 --endpoint-url https://${CLOUDFLARE_ACCOUNT_ID}.r2.cloudflarestorage.com cp --recursive src/assets s3://yomis-blog/assets
```

To sync from Cloudflare R2 to your local machine, use the following command:

```sh
aws --profile cloudflare s3 --endpoint-url https://${CLOUDFLARE_ACCOUNT_ID}.r2.cloudflarestorage.com sync s3://yomis-blog/assets ./src/assets
```
