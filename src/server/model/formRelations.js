import asyncMapSeries from 'async/mapSeries';
import {
  formType,
  relationTypes as relation
} from '../constants';
import sqlQueries from '../sqlQueries';
import getRelationData from './helpers/getRelationData';

const { RELATIONSHIP_INFO, FORM_RELATIONS } = sqlQueries;
const { NEW, SUBMIT, UPDATE } = formType;

const getRelationsDataObject = (sanitizedInput, formDataExtraInfoInput) => {
  const relationsData = [];
  if (formDataExtraInfoInput.anyChildren.toLowerCase() == 'yes') {
    for (var index = 1; index < 3; index++) {
      if(sanitizedInput[`child${index}FullName`] && sanitizedInput[`child${index}FullName`] != '') {
        relationsData.push(getRelationData({
          firstName: sanitizedInput[`child${index}FullName`],
          nationality: sanitizedInput[`child${index}Nationalitites`] || sanitizedInput[`child${index}Nationality`],
          alternateNationality: sanitizedInput[`child${index}AlternateNationality`],
          dateOfBirth: sanitizedInput[`child${index}DateOfBirth`],
          countryOfBirth: sanitizedInput[`child${index}PlaceOfBirth`] || sanitizedInput[`child${index}CountryOfBirth`],
        }, relation.CHILD));
      }
    }
  }
  if (sanitizedInput.fatherFullName && sanitizedInput.fatherFullName != '') {
    relationsData.push(getRelationData({
      firstName: sanitizedInput.fatherFullName,
      countryOfBirth: sanitizedInput.fatherCountryOfBirth,
      nationality: sanitizedInput.fatherNationality,
      alternateNationality: sanitizedInput.fatherAlternateNationality,
      dateOfBirth: sanitizedInput.fatherDateOfBirth,
    }, relation.FATHER));
  }
  if (sanitizedInput.motherFullName && sanitizedInput.motherFullName != '') {
    relationsData.push(getRelationData({
      firstName: sanitizedInput.motherFullName,
      countryOfBirth: sanitizedInput.motherCountryOfBirth,
      nationality: sanitizedInput.motherNationality,
      alternateNationality: sanitizedInput.motherAlternateNationality,
      dateOfBirth: sanitizedInput.motherDateOfBirth,
    }, relation.MOTHER));
  }
  return relationsData;
};

const insertRelationData = (connection, relationObject, onCb) => {
  connection.query(RELATIONSHIP_INFO.CREATE_NEW_RELATION_ENTRY, relationObject, (err, result) => {
    if (err) onCb(err, null);
    onCb(null, result.insertId);
  });
};

const insertFormRelations = (connection, formUID, relationId, onCb) => {
  connection.query(FORM_RELATIONS.CREATE_NEW_FORM_RELATIONS_ENTRY, { formId: formUID, relationshipId: relationId }, (err, result) => {
    if (err) onCb(err, null);
    onCb(null, result.insertId);
  });
};

export default (formUID, sanitizedInput, connection, action = formType.NEW, formDataExtraInfoInput) => cb => {
  switch (action) {
    case NEW:
      connection.beginTransaction((err1) => {
        if (err1) cb(err1, null);
        const allRelationsData = getRelationsDataObject(sanitizedInput, formDataExtraInfoInput);
        asyncMapSeries(
          allRelationsData,
          (relationData, next) => insertRelationData(connection, relationData, next), 
          (err, results) => {
            if (err) cb(err, null);
            asyncMapSeries(
              results, 
              (relationId, next) => insertFormRelations(connection, formUID, relationId, next),
              (err1, results1) => {
                if (err1) cb(err1, null);
                cb(null, results1);
              });
          },
        );
      });
      break;
    case SUBMIT:
      // form itself will be submitted and locked
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