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
    Body : file.buffer,
    Key : `${Date.now()}_${file.originalname}`,
  };

  s3.upload(params, (err, data) => {
    //handle error
    if (err) return cb(err, null);
    cb(null, data);
  });
};
