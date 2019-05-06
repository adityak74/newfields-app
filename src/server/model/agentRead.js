import _omit from 'lodash/fp/omit';
import sqlQueries from '../sqlQueries';

const { USERS } = sqlQueries;

const shimAgentData = agent => _omit(['password', 'token'], agent);

export default (sqlConnPool) => cb => {
  sqlConnPool.getConnection((err, connection) => {
    if (err) cb(err, null);
    connection.beginTransaction((err1) => {
      if (err1) cb(err1, null);
      connection.query(
        USERS.SELECT_ALL_AGENTS, (err2, rows2) => {
        if (err2) cb(err2, null);
        if (rows2.length) {
          const shimmedAgents = rows2.map(shimAgentData);
          return cb(null, shimmedAgents);
        }
        cb(null, []);
      });  
    });
  });
};
