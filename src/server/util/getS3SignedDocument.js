import AWS from 'aws-sdk';

export default appConfig => (file, cb) => {
  const { accessId, secret } = appConfig.get('aws');

  AWS.config.update({
    accessKeyId: accessId,
    secretAccessKey: secret,
  });

  var s3 = new AWS.S3();
  //configuring parameters
  var params = {
    Bucket: 'newfields-documents',
    Key: file.fileKey,
  };

  s3.getSignedUrl('putObject', params, (err, url) => {
    if (err) return cb(err, null);
    cb(null, { ...file, url });
  });

};
