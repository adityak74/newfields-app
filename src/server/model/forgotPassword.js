/* eslint-disable consistent-return */
import path from 'path';
import bcrypt from 'bcrypt-nodejs';
import { renderFile as ejsRenderFile } from 'ejs';
import passwordGenerator from 'generate-password';
import sqlQueries from '../sqlQueries';

const { USERS } = sqlQueries;

const resetPasswordHTMLFile = path.join(
  __dirname,
  '..',
  '..',
  'views',
  'pages',
  'reset_email.ejs',
);

export default (sqlConnPool, emailService, email) => (cb) => {
  sqlConnPool.getConnection((err, connection) => {
    if (err) cb(err, null);
    connection.beginTransaction((err1) => {
      if (err1) cb(err1, null);
      connection.query(USERS.SELECT_USER_BY_EMAIL, [email], (err2, rows) => {
        if (err2) cb(err2, null);
        if (rows.length) {
          // generate random password for user. and send the email
          const randomGeneratedPassword = passwordGenerator.generate({
            length: 8,
            uppercase: false,
            strict: true,
          });
          // eslint-disable-next-line max-len
          const hashedRandomGeneratedPassword = bcrypt.hashSync(randomGeneratedPassword, null, null);
          connection.query(
            USERS.UPDATE_USERS_BY_ID,
            [{ password: hashedRandomGeneratedPassword }, rows[0].id],
            (err3, rows2) => {
              if (err3) cb(err3, null);
              if (rows2.changedRows) {
                connection.commit((commitErr) => {
                  if (commitErr) {
                    return connection.rollback(() => {
                      throw commitErr;
                    });
                  }
                  ejsRenderFile(
                    resetPasswordHTMLFile,
                    {
                      userName: rows[0].name,
                      updatedPassword: randomGeneratedPassword,
                    },
                    (err4, htmlString) => {
                      emailService({
                        toAddress: rows[0].email,
                        emailHtmlData: htmlString,
                        emailTextData: htmlString,
                        emailSubject: 'Newfields - Reset Password',
                      });
                    }
                  );
                  cb(null, rows[0]);
                });
              }
            }
          );
        } else {
          cb('userNotFound', null);
        }
      });
    });
  });
};
