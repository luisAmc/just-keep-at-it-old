import { PutObjectCommand } from '@aws-sdk/client-s3';
import { getSignedUrl } from '@aws-sdk/s3-request-presigner';
import { randomUUID } from 'crypto';
import { s3 } from 'src/lib/s3';
import { builder } from '../builder';

const BUCKET = 'momori-test';

const UploadURL = builder.simpleObject('UploadURL', {
  fields: (t) => ({
    url: t.string(),
    key: t.string()
  })
});

builder.mutationField('createUploadURL', (t) =>
  t.field({
    type: UploadURL,
    args: {
      ext: t.arg.string()
    },
    resolve: async (parent, { ext }) => {
      const key = `images/${randomUUID()}.${ext}`;
      const command = new PutObjectCommand({ Bucket: BUCKET, Key: key });

      const signedUrl = await getSignedUrl(s3, command, { expiresIn: 3600 });
      console.log({ signedUrl });

      return {
        url: signedUrl,
        key
      };
    }
  })
);
