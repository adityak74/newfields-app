/* eslint-disable consistent-return */
import _omit from 'lodash/fp/omit';
import sqlQueries from '../sqlQueries';

const { USERS } = sqlQueries;

const shimUserData = user => _omit(['password', 'token'], user);

export default sqlConnPool => (cb) => {
  sqlConnPool.getConnection((err, connection) => {
    if (err) cb(err, null);
    connection.beginTransaction((err1) => {
      if (err1) cb(err1, null);
      connection.query(
        USERS.SELECT_ALL_USERS, (err2, rows2) => {
          if (err2) cb(err2, null);
          if (rows2.length) {
            const shimmedAdmins = rows2.map(shimUserData);
            return cb(null, shimmedAdmins);
          }
          cb(null, []);
        }
      );
    });
  });
};
