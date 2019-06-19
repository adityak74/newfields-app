/* eslint-disable consistent-return */
import sqlQueries from '../sqlQueries';

const { USERS } = sqlQueries;

export default (sqlConnPool, sanitizedInput) => (cb) => {
  const { email, token } = sanitizedInput;
  sqlConnPool.getConnection((err, connection) => {
    if (err) cb(err, null);
    connection.beginTransaction((errConn) => {
      if (errConn) cb(errConn, null);
      connection.query(USERS.SELECT_USER_BY_EMAIL_TOKEN,
        [email, token],
        (err1, rows) => {
          // found the user
          if (err1) cb(err1);
          if (rows.length) {
            const userId = rows[0].id;
            if (rows[0].isVerified) {
              return cb(null, rows[0]);
            }
            connection.query(
              USERS.UPDATE_USERS_BY_ID,
              [{ isVerified: 1 }, userId],
              (err2, rows2) => {
                if (err2) cb(err2);
                if (rows2.changedRows) {
                  // redirect to login
                  cb(null, rows[0]);
                } else {
                  cb("Couldn't verify email. Please try again or contact admin.", null);
                }
              }
            );
          } else {
            // user not found
            cb("Couldn't find email on database. Please sign up", null);
          }
        });
    });
  });
};
