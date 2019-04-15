import {
  formType,
  relationTypes as relation
} from '../constants';
import getFormUID from '../util/getFormUID';
import sqlQueries from '../sqlQueries';
import getRelationData from './helpers/getRelationData';

const getValueIfNotNull = input => input ? input : null;

const getRelationsDataObject = (sanitizedInput, formDataExtraInfoInput) => {
  const realtionsData = [];
  if (formDataExtraInfoInput.anyChildren.toLowerCase() == 'yes') {
    for (var index = 0; index < 2; index++) {
      realtionsData.push(getRelationData({
        firstName: sanitizedInput[`child${index}FullName`],
        nationality: sanitizedInput[`child${index}Nationalitites`],
        dateOfBirth: sanitizedInput[`child${index}DateOfBirth`],
        countryOfBirth: sanitizedInput[`child${index}PlaceOfBirth`],
      }, relation.CHILD));
    }
  }
  if (sanitizedInput.fatherFullName !== '') {
    
  }
  if (sanitizedInput.motherFullName !== '') {

  }
  return realtionsData;
};

export default (formUID, sanitizedInput, sqlConnection, action = formType.NEW, formDataInput, formDataExtraInfoInput) => cb => {

  const { FORM_CREATE, FORM_READ, FORM_UPDATE } = sqlQueries;
  const { NEW, SUBMIT, UPDATE } = formType;

  switch(action) {
    case NEW:
      connection.beginTransaction((err1) => {
        if (err1) cb(err1, null);
        connection.query(FORM_CREATE.CREATE_NEW_FORM_ENTRY, createNewFormEntryInput, (err2, result) => {
          if (err2) cb(err2, null);
          if (result) {
            connection.query(FORM_READ.USERFORMS_SELECT_BY_ROWID, { id: result.insertId } , (err3, rows) => {
              if (err3) cb(err3, null);
              const formUID = rows[0].formUID;
              const formDataInput = getFormDataObject(formUID, sanitizedInput);
              const formDataExtraInfoInput =  getFormDataExtraInfoDataObject(formUID, sanitizedInput, formNumber);
              // insert rest of the data here
              connection.query(FORM_CREATE.CREATE_NEW_FORM_DATA_ENTRY, formDataInput, (err4, rows4) => {
                if (err4) cb(err4, null);
                connection.query(FORM_CREATE.CREATE_NEW_FORM_DATA_EXTRA_INFO_ENTRY, formDataExtraInfoInput, (err5, rows5) => {
                  if (err5) cb(err5, null);
                  // commit the transaction here
                  connection.commit((commitErr) => {
                    if (commitErr) {
                      return connection.rollback(() => {
                        throw commitErr;
                      });
                    }
                    cb(null, createNewFormEntryInput);
                  });
                });
              });
            });
          }
        });  
      });
      break;
    case SUBMIT:
      // apply limits to user, form, times (8) max forms here later
      if (sanitizedInput.uniqueId) {
        sqlConnPool.query(
          FORM_READ.USERFORMS_SELECT_BY_FORMID_USERID_INCOMPLETE, 
          [sanitizedInput.uniqueId, currentUser.id], 
          (errRead, rowsRead) => {
            if (errRead) cb(errRead, null);
            if (rowsRead.length) {
              // save and submit
              const updateFormResponse = {
                userId: currentUser.id,
                formUID: sanitizedInput.uniqueId,
                formNumber,
                status: UPDATE,
              };
              sqlConnPool.getConnection((err, connection) => {
                if (err) cb(err, null);
                connection.beginTransaction((err1) => {
                  if (err1) cb(err1, null);
                  connection.query(FORM_READ.USERFORMS_SELECT_BY_FORMID_USERID, [sanitizedInput.uniqueId, currentUser.id], (err3, rows) => {
                    if (err3) cb(err3, null); 
                    if (!rows.length) cb(new Error("Form not found"), null);
                    const formUID = rows[0].formUID;
                    const formDataInput = getFormDataObject(formUID, sanitizedInput);
                    const formDataExtraInfoInput =  getFormDataExtraInfoDataObject(formUID, sanitizedInput, formNumber);
                    // update rest of the data here
                    connection.query(FORM_UPDATE.UPDATE_NEW_FORM_DATA_ENTRY, [formDataInput, formUID], (err4, rows4) => {
                      if (err4) cb(err4, null);
                      connection.query(FORM_UPDATE.UPDATE_NEW_FORM_DATA_EXTRA_INFO_ENTRY, [formDataExtraInfoInput, formUID], (err5, rows5) => {
                        if (err5) cb(err5, null);
                        // commit the transaction here
                        connection.query(FORM_UPDATE.UPDATE_NEW_FORM_ENTRY, 
                          [{ 
                            status: SUBMIT,
                            updateDate: new Date().toISOString().slice(0, 19).replace('T', ' ')
                          }, 
                          formUID], (err6, rows6) => {
                            if (err6) cb(err6, null);
                            connection.commit((commitErr) => {
                              if (commitErr) {
                                return connection.rollback(() => {
                                  throw commitErr;
                                });
                              }
                              cb(null, updateFormResponse);
                            });
                        });
                      });
                    });
                  });
                });
              });
            } else {
              cb(new Error("Form not found or already submitted"), null);
            }
        });
      }  else {
        // submit as new form
        const newFormUID = getFormUID(formNumber, currentUser);
        const createNewFormEntryInput = {
          userId: currentUser.id,
          formUID: newFormUID,
          formNumber,
          status: NEW,
        };
        sqlConnPool.getConnection((err, connection) => {
          if (err) cb(err, null);
          connection.beginTransaction((err1) => {
            if (err1) cb(err1, null);
            connection.query(FORM_CREATE.CREATE_NEW_FORM_ENTRY, createNewFormEntryInput, (err2, result) => {
              if (err2) cb(err2, null);
              if (result) {
                connection.query(FORM_READ.USERFORMS_SELECT_BY_ROWID, { id: result.insertId } , (err3, rows) => {
                  if (err3) cb(err3, null);
                  const formUID = rows[0].formUID;
                  const formDataInput = getFormDataObject(formUID, sanitizedInput);
                  const formDataExtraInfoInput =  getFormDataExtraInfoDataObject(formUID, sanitizedInput, formNumber);
                  // insert rest of the data here
                  connection.query(FORM_CREATE.CREATE_NEW_FORM_DATA_ENTRY, formDataInput, (err4, rows4) => {
                    if (err4) cb(err4, null);
                    connection.query(FORM_CREATE.CREATE_NEW_FORM_DATA_EXTRA_INFO_ENTRY, formDataExtraInfoInput, (err5, rows5) => {
                      if (err5) cb(err5, null);
                      connection.query(FORM_UPDATE.UPDATE_FORM_SUBMIT_BY_FORMID_USERID, [{ status: SUBMIT }, formUID, currentUser.id], (err6, rows6) => {
                        if (err6) cb(err6, null);
                        // commit the transaction here
                        connection.commit((commitErr) => {
                          if (commitErr) {
                            return connection.rollback(() => {
                              throw commitErr;
                            });
                          }
                          cb(null, createNewFormEntryInput);
                        });
                      });
                    });
                  });
                });
              }
            });  
          });
        });
      }
      break;
    case UPDATE:
      const updateFormResponse = {
        userId: currentUser.id,
        formUID: sanitizedInput.uniqueId,
        formNumber,
        status: UPDATE,
      };
      sqlConnPool.getConnection((err, connection) => {
        if (err) cb(err, null);
        connection.beginTransaction((err1) => {
          if (err1) cb(err1, null);
          connection.query(FORM_READ.USERFORMS_SELECT_BY_FORMID_USERID, [sanitizedInput.uniqueId, currentUser.id], (err3, rows) => {
            if (err3) cb(err3, null); 
            if (!rows.length) cb(new Error("Form not found"), null);
            const formUID = rows[0].formUID;
            const formDataInput = getFormDataObject(formUID, sanitizedInput);
            const formDataExtraInfoInput =  getFormDataExtraInfoDataObject(formUID, sanitizedInput, formNumber);
            // update rest of the data here
            connection.query(FORM_UPDATE.UPDATE_NEW_FORM_DATA_ENTRY, [formDataInput, formUID], (err4, rows4) => {
              if (err4) cb(err4, null);
              connection.query(FORM_UPDATE.UPDATE_NEW_FORM_DATA_EXTRA_INFO_ENTRY, [formDataExtraInfoInput, formUID], (err5, rows5) => {
                if (err5) cb(err5, null);
                // commit the transaction here
                connection.query(FORM_UPDATE.UPDATE_NEW_FORM_ENTRY, 
                  [{ 
                    status: formType.UPDATE, 
                    updateDate: new Date().toISOString().slice(0, 19).replace('T', ' ') 
                  }, 
                  formUID], (err6, rows6) => {
                    if (err6) cb(err6, null);
                    connection.commit((commitErr) => {
                      if (commitErr) {
                        return connection.rollback(() => {
                          throw commitErr;
                        });
                      }
                      cb(null, updateFormResponse);
                    });
                });
              });
            });
          });
        });
      });
      break;
    default: 
      return -1;
  }
};