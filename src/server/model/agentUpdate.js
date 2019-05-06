import _omit from 'lodash/fp/omit';
import sqlQueries from '../sqlQueries';

const { USERS } = sqlQueries;

export default (sqlConnPool, sanitizedInput) => cb => {
  sqlConnPool.getConnection((err, connection) => {
    if (err) cb(err, null);
    connection.beginTransaction((err1) => {
      if (err1) cb(err1, null);
      connection.query(
        USERS.UPDATE_AGENT, [{isVerified: 1}, sanitizedInput.userID], (err2, rows2) => {
        if (err2) cb(err2, null);
        connection.commit((commitErr) => {
          if (commitErr) {
            return connection.rollback(() => {
              throw commitErr;
            });
          }
          cb(null, { agentID: sanitizedInput.userID, isVerified: 1 });
        });
      });  
    });
  });
};
