/* eslint-disable consistent-return */
/* eslint-disable max-len */
import asyncMapSeries from 'async/mapSeries';
import {
  formType,
  formNumber as formNumberContant,
  relationTypes,
} from '../constants';
import sqlQueries from '../sqlQueries';
import getRelationData from './helpers/getRelationData';

const { RELATIONSHIP_INFO, FORM_RELATIONS } = sqlQueries;
const { NEW, SUBMIT, UPDATE } = formType;

const getRelationsDataObject = (sanitizedInput, formNumber) => {
  const relationsData = [];
  for (let index = 1; index < 3; index += 1) {
    relationsData.push(getRelationData({
      firstName: sanitizedInput[`child${index}FullName`] || null,
      nationality: sanitizedInput[`child${index}Nationalitites`] || sanitizedInput[`child${index}Nationality`] || null,
      alternateNationality: sanitizedInput[`child${index}AlternateNationality`] || null,
      dateOfBirth: sanitizedInput[`child${index}DateOfBirth`] || null,
      countryOfBirth: sanitizedInput[`child${index}PlaceOfBirth`] || sanitizedInput[`child${index}CountryOfBirth`] || null,
    }, relationTypes.CHILD));
  }
  if (formNumber === formNumberContant.TWO) {
    relationsData.push(getRelationData({
      firstName: sanitizedInput.fatherFullName || null,
      countryOfBirth: sanitizedInput.fatherCountryOfBirth || null,
      nationality: sanitizedInput.fatherNationality || null,
      alternateNationality: sanitizedInput.fatherAlternateNationality || null,
      dateOfBirth: sanitizedInput.fatherDateOfBirth || null,
    }, relationTypes.FATHER));
    relationsData.push(getRelationData({
      firstName: sanitizedInput.motherFullName,
      countryOfBirth: sanitizedInput.motherCountryOfBirth,
      nationality: sanitizedInput.motherNationality,
      alternateNationality: sanitizedInput.motherAlternateNationality,
      dateOfBirth: sanitizedInput.motherDateOfBirth,
    }, relationTypes.MOTHER));
  }

  return relationsData;
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

export default (formUID, formNumber, sanitizedInput, connection, action = formType.NEW, formDataExtraInfoInput) => (cb) => {
  switch (action) {
    case NEW:
      connection.beginTransaction((err1) => {
        if (err1) cb(err1, null);
        const allRelationsData = getRelationsDataObject(sanitizedInput, formNumber);
        asyncMapSeries(
          allRelationsData,
          (relationData, next) => insertRelationData(connection, relationData, next), 
          (err, results) => {
            if (err) cb(err, null);
            asyncMapSeries(
              results,
              (relationId, next) => insertFormRelations(connection, formUID, relationId, next),
              (err2, results1) => {
                if (err2) cb(err2, null);
                cb(null, results1);
              }
            );
          },
        );
      });
      break;
    case SUBMIT:
      if (sanitizedInput.uniqueId) {
        const allRelationsData = getRelationsDataObject(sanitizedInput, formNumber);
        connection.beginTransaction((err1) => {
          if (err1) cb(err1, null);
          connection.query(FORM_RELATIONS.FORM_RELATIONS_SELECT_BY_FORM_ID, [formUID], (err2, results) => {
            if (results.length) {
              const relationIdsData = results.map((relation, index) => ({ id: relation.relationshipId, data: allRelationsData[index] }));
              asyncMapSeries(
                relationIdsData,
                (relation, next) => updateRelationData(connection, relation, next),
                (err3, results3) => {
                  if (err3) cb(err3, null);
                  cb(null, results3);
                }
              );
            } else cb(null, null);
          });
        });
      } else {
        connection.beginTransaction((err1) => {
          if (err1) cb(err1, null);
          const allRelationsData = getRelationsDataObject(sanitizedInput, formNumber);
          asyncMapSeries(
            allRelationsData,
            (relationData, next) => insertRelationData(connection, relationData, next), 
            (err, results) => {
              if (err) cb(err, null);
              asyncMapSeries(
                results,
                (relationId, next) => insertFormRelations(connection, formUID, relationId, next),
                (err2, results1) => {
                  if (err2) cb(err2, null);
                  cb(null, results1);
                }
              );
            },
          );
        });
      }
      break;
    case UPDATE:
      // eslint-disable-next-line no-case-declarations
      const allRelationsData = getRelationsDataObject(sanitizedInput, formNumber);
      connection.beginTransaction((err1) => {
        if (err1) cb(err1, null);
        connection.query(FORM_RELATIONS.FORM_RELATIONS_SELECT_BY_FORM_ID, [formUID], (err2, results) => {
          if (results.length) {
            const relationIdsData = results.map((relation, index) => ({ id: relation.relationshipId, data: allRelationsData[index] }));
            asyncMapSeries(
              relationIdsData,
              (relation, next) => updateRelationData(connection, relation, next),
              (err3, results3) => {
                if (err3) cb(err3, null);
                cb(null, results3);
              }
            );
          } else cb(null, null);
        });
      });
      break;
    default:
      return -1;
  }
};
