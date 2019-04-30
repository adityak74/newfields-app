import asyncMapSeries from 'async/mapSeries';
import {
  formType,
  formNumber,
  relationTypes as relation,
  documentType,
} from '../constants';
import sqlQueries from '../sqlQueries';
import getDocumentsData from './helpers/getDocumentsData';

const { ONE, TWO } = formNumber;
const { DOCUMENTS } = sqlQueries;
const {
  BIOMETRIC_RESIDENCE_PERMIT_FRONT,
  BIOMETRIC_RESIDENCE_PERMIT_BACK,
  CURRENT_COUNTRY_RESIDENCE_PERMIT,
  PREVIOUS_UK_VISA,
  PASSPORT_FRONT,
  PASSPORT_FRONT_TWO,
} = documentType;
const { NEW, SUBMIT, UPDATE } = formType;

const getRawFilesArray = (filesInput, formNumber, formUID) => {
  const filesData = [];
  filesData.push(filesInput.previous_uk_visa ? {
    ...filesInput.previous_uk_visa,
    file: true,
    formUID,
    documentType: PREVIOUS_UK_VISA,
  } : { 
    file: null, 
    formUID,
    documentType: PREVIOUS_UK_VISA
  });
  filesData.push(filesInput.passport_front ? {
    ...filesInput.passport_front,
    formUID,
    file: true,
    documentType: PASSPORT_FRONT,
  } : {
    file: null,
    formUID,
    documentType: PASSPORT_FRONT,
  });
  switch (formNumber) {
    case ONE:
      filesData.push(filesInput.biometric_residence_permit_front ? {
        ...filesInput.biometric_residence_permit_front,
        formUID,
        file: true,
        documentType: BIOMETRIC_RESIDENCE_PERMIT_FRONT,
      } : {
        file: null,
        formUID,
        documentType: BIOMETRIC_RESIDENCE_PERMIT_FRONT,
      });
      filesData.push(filesInput.biometric_residence_permit_back ? {
        ...filesInput.biometric_residence_permit_back,
        formUID,
        file: true,
        documentType: BIOMETRIC_RESIDENCE_PERMIT_BACK,
      } : {
        file: null,
        formUID,
        documentType: BIOMETRIC_RESIDENCE_PERMIT_BACK,
      });
      break;
    case TWO:
      filesData.push(filesInput.passport_front_two ? {
        ...filesInput.passport_front_two,
        formUID,
        file: true,
        documentType: PASSPORT_FRONT_TWO,
      } : {
        file: null,
        formUID,
        documentType: PASSPORT_FRONT_TWO,
      });
      filesData.push(filesInput.current_visa ? {
        ...filesInput.current_visa,
        formUID,
        file: true,
        documentType: CURRENT_COUNTRY_RESIDENCE_PERMIT,
      } : {
        file: null,
        formUID,
        documentType: CURRENT_COUNTRY_RESIDENCE_PERMIT,
      });
      break;
  }
  return filesData;
};

const insertDocumentsData = (connection, documentsObject, onCb) => {
  connection.query(DOCUMENTS.CREATE_NEW_DOCUMENTS_ENTRY, documentsObject, (err, result) => {
    if (err) onCb(err, null);
    onCb(null, result.insertId);
  });
};

const updateDocumentsDataByFormAndType = (connection, documentsObject, onCb) => {
  connection.query(DOCUMENTS.UPDATE_DOCUMENTS_ENTRY_BY_FORMUID_TYPE, [documentsObject, documentsObject.formUID, documentsObject.type], (err, result) => {
    if (err) onCb(err, null);
    onCb(null, result.changedRows || result.affectedRows);
  });
};

const uploadFiles = (fileData, s3FileUploadService, action, onCb) => {
  if (fileData.file) {
    s3FileUploadService(fileData, (err, responseFileData) => {
      if (err) return onCb(err, null);
      onCb(null, getDocumentsData(fileData.formUID, responseFileData.Key, fileData.documentType ));
    });
  } else onCb(null, 
    action === formType.NEW 
    ? getDocumentsData(fileData.formUID, null, fileData.documentType )
    : null);
};

export default (formUID, formNumber, sanitizedInput, filesInput, connection, s3FileUploadService, action = formType.NEW) => cb => {
  switch (action) {
    case NEW:
      connection.beginTransaction((err1) => {
        if (err1) cb(err1, null);
        const allFilesData = getRawFilesArray(filesInput, formNumber, formUID);
        asyncMapSeries(
          allFilesData,
          (fileData, next) => uploadFiles(fileData, s3FileUploadService, action, next),
          (err, results) => {
            if (err) return cb(err, null);
            asyncMapSeries(
              results, 
              (document, next) => insertDocumentsData(connection, document, next),
              (err1, results1) => {
                if (err1) cb(err1, null);
                cb(null, results1);
              });
          }
        );
      });
      break;
    case SUBMIT:
      if (sanitizedInput.uniqueId) {
        connection.beginTransaction((err1) => {
          if (err1) cb(err1, null);
          const allFilesData = getRawFilesArray(filesInput, formNumber, formUID);
          asyncMapSeries(
            allFilesData,
            (fileData, next) => uploadFiles(fileData, s3FileUploadService, action, next),
            (err, results) => {
              if (err) return cb(err, null);
              const filesDataToUpdate = results.filter(result => result !== null);
              asyncMapSeries(
                filesDataToUpdate,
                (document, next) => updateDocumentsDataByFormAndType(connection, document, next),
                (err1, results1) => {
                  if (err1) cb(err1, null);
                  cb(null, results1);
                });
            }
          );
        });
      } else {
        connection.beginTransaction((err1) => {
          if (err1) cb(err1, null);
          const allFilesData = getRawFilesArray(filesInput, formNumber, formUID);
          asyncMapSeries(
            allFilesData,
            (fileData, next) => uploadFiles(fileData, s3FileUploadService, action, next),
            (err, results) => {
              if (err) return cb(err, null);
              asyncMapSeries(
                results, 
                (document, next) => insertDocumentsData(connection, document, next),
                (err1, results1) => {
                  if (err1) cb(err1, null);
                  cb(null, results1);
                });
            }
          );
        });
      }
      break;
    case UPDATE:
      connection.beginTransaction((err1) => {
        if (err1) cb(err1, null);
        const allFilesData = getRawFilesArray(filesInput, formNumber, formUID);
        asyncMapSeries(
          allFilesData,
          (fileData, next) => uploadFiles(fileData, s3FileUploadService, action, next),
          (err, results) => {
            if (err) return cb(err, null);
            const filesDataToUpdate = results.filter(result => result !== null);
            asyncMapSeries(
              filesDataToUpdate,
              (document, next) => updateDocumentsDataByFormAndType(connection, document, next),
              (err1, results1) => {
                if (err1) cb(err1, null);
                cb(null, results1);
              });
          }
        );
      });
    default: 
      return -1;
  }
};