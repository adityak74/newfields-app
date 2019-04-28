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
const {  } = sqlQueries;
const {
  BIOMETRIC_RESIDENCE_PERMIT_FRONT,
  BIOMETRIC_RESIDENCE_PERMIT_BACK,
  CURRENT_COUNTRY_RESIDENCE_PERMIT,
  PREVIOUS_UK_VISA,
  PASSPORT_FRONT,
  PASSPORT_FRONT_TWO,
} = documentType;

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
      
      break;
  }
  return filesData;
};

const insertRelationData = (connection, relationObject, onCb) => {
  connection.query(RELATIONSHIP_INFO.CREATE_NEW_RELATION_ENTRY, relationObject, (err, result) => {
    if (err) onCb(err, null);
    onCb(null, result.insertId);
  });
};

const updateRelationData = (connection, relationObject, onCb) => {
  connection.query(RELATIONSHIP_INFO.UPDATE_RELATION_ENTRY_BY_ID, [relationObject.data, relationObject.id], (err, result) => {
    if (err) onCb(err, null);
    onCb(null, result.changedRows || result.affectedRows);
  });
};

const insertFormRelations = (connection, formUID, relationId, onCb) => {
  connection.query(FORM_RELATIONS.CREATE_NEW_FORM_RELATIONS_ENTRY, { formId: formUID, relationshipId: relationId }, (err, result) => {
    if (err) onCb(err, null);
    onCb(null, result.insertId);
  });
};

const uploadFiles = (fileData, s3FileUploadService, onCb) => {
  if (fileData.file) {
    s3FileUploadService(fileData, (err, responseFileData) => {
      if (err) return onCb(err, null);
      onCb(null, getDocumentsData(fileData.formUID, responseFileData.Key, fileData.documentType ));
    });
  } else onCb(null, getDocumentsData(fileData.formUID, null, fileData.documentType ));
};

export default (formUID, formNumber, filesInput, connection, s3FileUploadService, action = formType.NEW) => cb => {
  const allFilesData = getRawFilesArray(filesInput, formNumber, formUID);
  console.log('allFilesData', allFilesData);
  asyncMapSeries(
    allFilesData,
    (fileData, next) => uploadFiles(fileData, s3FileUploadService, next),
    (err, results) => {
      console.log('rerjdhbfdf->>>>>', results);
      cb();
    }
  );
  // switch (action) {
  //   case NEW:
  //     connection.beginTransaction((err1) => {
  //       if (err1) cb(err1, null);
  //       const allRelationsData = getRelationsDataObject(sanitizedInput, formNumber);
  //       asyncMapSeries(
  //         allRelationsData,
  //         (relationData, next) => insertRelationData(connection, relationData, next), 
  //         (err, results) => {
  //           if (err) cb(err, null);
  //           asyncMapSeries(
  //             results, 
  //             (relationId, next) => insertFormRelations(connection, formUID, relationId, next),
  //             (err1, results1) => {
  //               if (err1) cb(err1, null);
  //               cb(null, results1);
  //             });
  //         },
  //       );
  //     });
  //     break;
  //   case SUBMIT:
  //     if (sanitizedInput.uniqueId) {
  //       const allRelationsData = getRelationsDataObject(sanitizedInput, formNumber);
  //       connection.beginTransaction((err1) => {
  //         if (err1) cb(err1, null);
  //         connection.query(FORM_RELATIONS.FORM_RELATIONS_SELECT_BY_FORM_ID, [formUID], (err2, results) => {
  //           if (results.length) {
  //             const relationIdsData = results.map((relation, index) => ({ id : relation.relationshipId, data: allRelationsData[index] }));
  //             asyncMapSeries(
  //               relationIdsData, 
  //               (relation, next) => updateRelationData(connection, relation, next), 
  //               (err3, results3) => {
  //                 if (err3) cb(err3, null);
  //                 cb(null, results3);
  //               });
  //           } else cb(null, null);
  //         });
  //       });
  //     } else {
  //       connection.beginTransaction((err1) => {
  //         if (err1) cb(err1, null);
  //         const allRelationsData = getRelationsDataObject(sanitizedInput, formNumber);
  //         asyncMapSeries(
  //           allRelationsData,
  //           (relationData, next) => insertRelationData(connection, relationData, next), 
  //           (err, results) => {
  //             if (err) cb(err, null);
  //             asyncMapSeries(
  //               results, 
  //               (relationId, next) => insertFormRelations(connection, formUID, relationId, next),
  //               (err1, results1) => {
  //                 if (err1) cb(err1, null);
  //                 cb(null, results1);
  //               });
  //           },
  //         );
  //       });
  //     }
  //     break;
  //   case UPDATE:
  //     const allRelationsData = getRelationsDataObject(sanitizedInput, formNumber);
  //     connection.beginTransaction((err1) => {
  //       if (err1) cb(err1, null);
  //       connection.query(FORM_RELATIONS.FORM_RELATIONS_SELECT_BY_FORM_ID, [formUID], (err2, results) => {
  //         if (results.length) {
  //           const relationIdsData = results.map((relation, index) => ({ id : relation.relationshipId, data: allRelationsData[index] }));
  //           asyncMapSeries(
  //             relationIdsData, 
  //             (relation, next) => updateRelationData(connection, relation, next), 
  //             (err3, results3) => {
  //               if (err3) cb(err3, null);
  //               cb(null, results3);
  //             });
  //         } else cb(null, null);
  //       });
  //     });
  //     break;
  //   default: 
  //     return -1;
  // }
};