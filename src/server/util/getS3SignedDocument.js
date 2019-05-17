import AWS from 'aws-sdk';

export default appConfig => (file, cb) => {
  const { accessId, secret } = appConfig.get('aws');

  AWS.config.update({
    accessKeyId: accessId,
    secretAccessKey: secret,
  });

  const s3 = new AWS.S3();
  const params = {
    Bucket: 'newfields-documents',
    Key: file.fileKey,
  };

  s3.getSignedUrl('getObject', params, (err, url) => {
    if (err) return cb(err, null);
    cb(null, { ...file, url });
  });
};
