/* eslint-disable consistent-return */
import sqlQueries from '../sqlQueries';

const { FORM_UPDATE } = sqlQueries;

export default (sqlConnPool, sanitizedInput) => (cb) => {
  const updateProgressInput = {
    formUID: sanitizedInput.formID,
    processingStatus: sanitizedInput.progressStatusCode,
  };
  sqlConnPool.getConnection((err, connection) => {
    if (err) cb(err, null);
    connection.beginTransaction((err1) => {
      if (err1) cb(err1, null);
      connection.query(
        FORM_UPDATE.UPDATE_NEW_FORM_ENTRY,
        [
          { processingStatus: updateProgressInput.processingStatus },
          updateProgressInput.formUID
        ], (err2) => {
          if (err2) cb(err2, null);
          connection.commit((commitErr) => {
            if (commitErr) {
              return connection.rollback(() => {
                throw commitErr;
              });
            }
            cb(null, updateProgressInput);
          });
        }
      );
    });
  });
};
