import sqlQueries from '../sqlQueries';
import { SUBMIT } from '../constants/formType';

const { FORM_READ } = sqlQueries;

export default (req, sqlConnPool, formType = NEW, byUser) => cb => {
  const currentUser = req.user;
  let formsQuery = null;
  if(byUser) {
    formsQuery = formType === SUBMIT ? FORM_READ.USERFORMS_SELECT_BY_USERID_ALL : FORM_READ.USERFORMS_SELECT_BY_USERID_INCOMPLETE;
  } else {
    formsQuery = formType === SUBMIT ? FORM_READ.USERFORMS_SELECT_ALL : FORM_READ.USERFORMS_SELECT_ALL_INCOMPLETE;
  }
  sqlConnPool.getConnection((err, connection) => {
    if (err) cb(err, null);
    connection.beginTransaction((err1) => {
      if (err1) cb(err1, null);
      connection.query(
        formsQuery,
        [currentUser.id], (err2, results) => {
        if (err2) cb(err2, null);
        if (results.length) {
          cb(null, results);
        } else cb(null, []);
      });  
    });
  });
};
