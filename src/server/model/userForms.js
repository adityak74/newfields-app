import parallel from 'async/parallel';
import path from 'path';
import { renderFile as ejsRenderFile } from 'ejs';
import capitalizeFirst from '../util/capitalizeFirst';
import {
  formType,
  formProcessingStatus,
} from '../constants';
import getFormUID from '../util/getFormUID';
import getFormRefNumber from '../util/getFormRefNumber';
import sqlQueries from '../sqlQueries';
import getFormDataObject from './helpers/getFormData';
import getFormDataExtraInfoDataObject from './helpers/getFormDataExtraInfoData';
import formRelationsModel from './formRelations';
import formTripsModel from './formTrips';
import formDocumentsModel from './documents';

const formConfirmationHTMLFile = path.join(
  __dirname,
  '..',
  '..',
  'views',
  'pages',
  'form_confirmation.ejs',
);

const sendFormConfirmationEmail = (currentUser, formRefNumber) => {
  ejsRenderFile(
    formConfirmationHTMLFile,
    {
      userName: capitalizeFirst(currentUser.name),
      formReferenceNumber: formRefNumber
    },
    (err, htmlString) => {
      emailService({
        toAddress: currentUser.email,
        emailHtmlData: htmlString,
        emailTextData: htmlString,
        emailSubject: "Newfields - Form Confirmation",
      });
  });
};

export default (req, sanitizedInput, inputFiles, sqlConnPool, s3FileUploadService, emailService, action = formType.NEW, formNumber) => cb => {

  const currentUser = req.user;
  const { FORM_CREATE, FORM_READ, FORM_UPDATE } = sqlQueries;
  const { NEW, SUBMIT, UPDATE } = formType;

  switch(action) {
    case NEW:
      const newFormUID = getFormUID(formNumber, currentUser);
      const formRefNumber = getFormRefNumber(formNumber);
      const createNewFormEntryInput = {
        userId: currentUser.id,
        formUID: newFormUID,
        formNumber,
        formRefNumber,
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
                const { formUID } = rows[0];
                const formDataInput = getFormDataObject(formUID, sanitizedInput);
                const formDataExtraInfoInput =  getFormDataExtraInfoDataObject(formUID, sanitizedInput);

                connection.query(FORM_CREATE.CREATE_NEW_FORM_DATA_ENTRY, formDataInput, (err4, rows4) => {
                  if (err4) cb(err4, null);
                  connection.query(FORM_CREATE.CREATE_NEW_FORM_DATA_EXTRA_INFO_ENTRY, formDataExtraInfoInput, (err5, rows5) => {
                    if (err5) cb(err5, null);
                    const tripsModel = formTripsModel(formUID, formNumber, sanitizedInput, connection, formType.NEW, formDataExtraInfoInput);
                    const relationsModel = formRelationsModel(formUID, formNumber, sanitizedInput, connection, formType.NEW, formDataExtraInfoInput);
                    const documentsModel = formDocumentsModel(formUID, formNumber, sanitizedInput, inputFiles, connection, s3FileUploadService, formType.NEW);
                    
                    parallel([relationsModel, tripsModel, documentsModel], (asyncParallelError, results) => {
                      if (asyncParallelError) cb(asyncParallelError, null);
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
                    const currentFormRefNumber = rows[0].formRefNumber;
                    const formDataInput = getFormDataObject(formUID, sanitizedInput);
                    const formDataExtraInfoInput =  getFormDataExtraInfoDataObject(formUID, sanitizedInput);
                    // update rest of the data here
                    connection.query(FORM_UPDATE.UPDATE_NEW_FORM_DATA_ENTRY, [formDataInput, formUID], (err4, rows4) => {
                      if (err4) cb(err4, null);
                      connection.query(FORM_UPDATE.UPDATE_NEW_FORM_DATA_EXTRA_INFO_ENTRY, [formDataExtraInfoInput, formUID], (err5, rows5) => {
                        if (err5) cb(err5, null);
                        // commit the transaction here
                        connection.query(FORM_UPDATE.UPDATE_NEW_FORM_ENTRY, 
                          [{ 
                            status: SUBMIT,
                            processingStatus: formProcessingStatus.SUBMITTED,
                            updateDate: new Date().toISOString().slice(0, 19).replace('T', ' ')
                          }, 
                          formUID], (err6, rows6) => {
                            if (err6) cb(err6, null);
                            const tripsModel = formTripsModel(formUID, formNumber, sanitizedInput, connection, formType.UPDATE, formDataExtraInfoInput);
                            const relationsModel = formRelationsModel(formUID, formNumber, sanitizedInput, connection, formType.UPDATE, formDataExtraInfoInput);
                            const documentsModel = formDocumentsModel(formUID, formNumber, sanitizedInput, inputFiles, connection, s3FileUploadService, formType.UPDATE);
                            parallel([relationsModel, tripsModel, documentsModel], (asyncParallelError, results) => {
                              if (asyncParallelError) cb(asyncParallelError, null);
                              connection.commit((commitErr) => {
                                if (commitErr) {
                                  return connection.rollback(() => {
                                    throw commitErr;
                                  });
                                }
                                sendFormConfirmationEmail(currentUser, currentFormRefNumber);
                                cb(null, updateFormResponse);
                              });
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
        const formRefNumber = getFormRefNumber(formNumber);
        const createNewFormEntryInput = {
          userId: currentUser.id,
          formUID: newFormUID,
          formNumber,
          formRefNumber,
          status: SUBMIT,
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
                  const formDataExtraInfoInput =  getFormDataExtraInfoDataObject(formUID, sanitizedInput);
                  // insert rest of the data here
                  connection.query(FORM_CREATE.CREATE_NEW_FORM_DATA_ENTRY, formDataInput, (err4, rows4) => {
                    if (err4) cb(err4, null);
                    connection.query(FORM_CREATE.CREATE_NEW_FORM_DATA_EXTRA_INFO_ENTRY, formDataExtraInfoInput, (err5, rows5) => {
                      if (err5) cb(err5, null);
                      connection.query(FORM_UPDATE.UPDATE_FORM_SUBMIT_BY_FORMID_USERID, [{ processingStatus: formProcessingStatus.SUBMITTED, status: SUBMIT }, formUID, currentUser.id], (err6, rows6) => {
                        if (err6) cb(err6, null);
                        // commit the transaction here
                        const tripsModel = formTripsModel(formUID, formNumber, sanitizedInput, connection, formType.SUBMIT, formDataExtraInfoInput);
                        const relationsModel = formRelationsModel(formUID, formNumber, sanitizedInput, connection, formType.SUBMIT, formDataExtraInfoInput);
                        const documentsModel = formDocumentsModel(formUID, formNumber, sanitizedInput, inputFiles, connection, s3FileUploadService, formType.SUBMIT);
                        parallel([relationsModel, tripsModel, documentsModel], (asyncParallelError, results) => {
                          if (asyncParallelError) cb(asyncParallelError, null);
                          connection.commit((commitErr) => {
                            if (commitErr) {
                              return connection.rollback(() => {
                                throw commitErr;
                              });
                            }
                            sendFormConfirmationEmail(currentUser, formRefNumber);
                            cb(null, createNewFormEntryInput);
                          });
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
            if (!rows.length) return cb(new Error("Form not found"), null);
            const formUID = rows[0].formUID;
            const formDataInput = getFormDataObject(formUID, sanitizedInput);
            const formDataExtraInfoInput =  getFormDataExtraInfoDataObject(formUID, sanitizedInput);
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
                    const tripsModel = formTripsModel(formUID, formNumber, sanitizedInput, connection, formType.UPDATE, formDataExtraInfoInput);
                    const relationsModel = formRelationsModel(formUID, formNumber, sanitizedInput, connection, formType.UPDATE, formDataExtraInfoInput);
                    const documentsModel = formDocumentsModel(formUID, formNumber, sanitizedInput, inputFiles, connection, s3FileUploadService, formType.UPDATE);

                    parallel([relationsModel, tripsModel, documentsModel], (asyncParallelError, results) => {
                      if (asyncParallelError) cb(asyncParallelError, null);
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
      });
      break;
    default: 
      return -1;
  }
};