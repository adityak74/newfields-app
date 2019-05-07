import path from 'path';
import { renderFile as ejsRenderFile } from 'ejs';
import capitalizeFirst from '../util/capitalizeFirst';
import sqlQueries from '../sqlQueries';
import generateSessionToken from '../util/generateSessionToken';

const { USERS } = sqlQueries;

const adminTokenConfirmationHTMLFile = path.join(
  __dirname,
  '..',
  '..',
  'views',
  'pages',
  'admin_token_confirmation.ejs',
);

const sendAdminTokenConfirmationEmail = (adminUser, token, emailService) => {
  ejsRenderFile(
    adminTokenConfirmationHTMLFile,
    {
      userName: capitalizeFirst(adminUser.name),
      token,
    },
    (err, htmlString) => {
      emailService({
        toAddress: adminUser.email,
        emailHtmlData: htmlString,
        emailTextData: htmlString,
        emailSubject: "Newfields - Admin Session Token",
      });
  });
};

export default (sqlConnPool, sanitizedUser, emailService) => cb => {
  sqlConnPool.getConnection((err, connection) => {
    if (err) cb(err, null);
    connection.beginTransaction((err1) => {
      if (err1) cb(err1, null);
      const token = generateSessionToken();
      connection.query(USERS.UPDATE_USERS_BY_ID, [{ sessionToken: token }, sanitizedUser.id], (err2, rows2) => {
        if (err2) cb(err2, null);
        if (rows2) {
          connection.commit((commitErr) => {
            if (commitErr) {
              return connection.rollback(() => {
                throw commitErr;
              });
            }
            sendAdminTokenConfirmationEmail(sanitizedUser, token, emailService);
            cb(null, { userId: sanitizedUser.id, tokenGenerated: 1, admin: sanitizedUser.admin });
          });
        } else cb(null, null);
      }); 
    });
  });
};
