import sqlQueries from '../sqlQueries';

const { FORM_READ } = sqlQueries;

export default (sqlConnPool, userId) => cb => {
  sqlConnPool.getConnection((err, connection) => {
    if (err) cb(err, null);
    connection.beginTransaction((err1) => {
      if (err1) cb(err1, null);
      connection.query(
        FORM_READ.USERFORMS_SELECT_FORM_COUNTS_BY_USERID, [userId, userId], (err2, rows2) => {
        if (err2) cb(err2, null);
        if (rows2) {
          return cb(null, rows2[0]);
        }
        return cb(null, {});
      });  
    });
  });
};
