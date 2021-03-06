/* eslint-disable consistent-return */
import _omit from 'lodash/fp/omit';
import sqlQueries from '../sqlQueries';

const { USERS } = sqlQueries;

const shimAdminData = admin => _omit(['password', 'token'], admin);

export default sqlConnPool => (cb) => {
  sqlConnPool.getConnection((err, connection) => {
    if (err) cb(err, null);
    connection.beginTransaction((err1) => {
      if (err1) cb(err1, null);
      connection.query(
        USERS.SELECT_ALL_ADMINS, (err2, rows2) => {
          if (err2) cb(err2, null);
          if (rows2.length) {
            const shimmedAdmins = rows2.map(shimAdminData);
            return cb(null, shimmedAdmins);
          }
          cb(null, []);
        }
      );
    });
  });
};
