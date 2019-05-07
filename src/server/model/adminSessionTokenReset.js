import sqlQueries from '../sqlQueries';

const { USERS } = sqlQueries;

export default (sqlConnPool, sanitizedUser) => cb => {
  sqlConnPool.getConnection((err, connection) => {
    if (err) cb(err, null);
    connection.beginTransaction((err1) => {
      if (err1) cb(err1, null);
      connection.query(USERS.UPDATE_USERS_BY_ID, [{ sessionToken: null }, sanitizedUser.id], (err2, rows2) => {
        if (err2) cb(err2, null);
        if (rows2) {
          connection.commit((commitErr) => {
            if (commitErr) {
              return connection.rollback(() => {
                throw commitErr;
              });
            }
            cb(null, { userId: sanitizedUser.id, tokenReset: true });
          });
        } else cb(null, null);
      }); 
    });
  });
};
