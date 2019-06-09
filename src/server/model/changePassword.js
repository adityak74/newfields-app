/* eslint-disable consistent-return */
import bcrypt from 'bcrypt-nodejs';
import sqlQueries from '../sqlQueries';

const { USERS } = sqlQueries;

export default (sqlConnPool, userId, password) => (cb) => {
  const hashedPassword = bcrypt.hashSync(password, null, null);
  sqlConnPool.getConnection((err, connection) => {
    if (err) cb(err, null);
    connection.beginTransaction((err1) => {
      if (err1) cb(err1, null);
      connection.query(
        USERS.UPDATE_USERS_BY_ID, [{ password: hashedPassword }, userId], (err2, rows2) => {
          if (err2) cb(err2, null);
          if (rows2.changedRows) {
            return cb(null, { user: { id: userId } });
          }
        }
      );
    });
  });
};
