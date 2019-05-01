import AWS from 'aws-sdk';

export default appConfig => ({ 
  toAddress,
  emailHtmlData,
  emailTextData,
  emailSubject,
  fromAddress,
}) => {
  const { accessId, secret } = appConfig.get('aws');
  const supportEmail = appConfig.get('supportEmail');

  AWS.config.update({
    accessKeyId: accessId,
    secretAccessKey: secret,
    region: 'eu-west-1',
  });

  const ses = new AWS.SES({ apiVersion: "2010-12-01" });
  const params = {
    Destination: {
      ToAddresses: [toAddress] // Email address/addresses that you want to send your email
    },
    Message: {
      Body: {
        Html: {
          // HTML Format of the email
          Charset: "UTF-8",
          Data: emailHtmlData,
        },
        Text: {
          Charset: "UTF-8",
          Data: emailTextData,
        }
      },
      Subject: {
        Charset: "UTF-8",
        Data: emailSubject,
      }
    },
    Source: fromAddress ? fromAddress : supportEmail,
  };

  ses.sendEmail(params)
    .promise()
    .then(data => console.log(data))
    .catch(error => console.log('Error sending email', error));
};