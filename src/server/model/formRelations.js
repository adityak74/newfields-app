import asyncMapSeries from 'async/mapSeries';
import {
  formType,
  formNumber as formNumberContant,
  relationTypes as relation,
} from '../constants';
import sqlQueries from '../sqlQueries';
import getRelationData from './helpers/getRelationData';

const { RELATIONSHIP_INFO, FORM_RELATIONS } = sqlQueries;
const { NEW, SUBMIT, UPDATE } = formType;

const getRelationsDataObject = (sanitizedInput, formNumber) => {
  const relationsData = [];
  for (var index = 1; index < 3; index++) {
    relationsData.push(getRelationData({
      firstName: sanitizedInput[`child${index}FullName`] || null,
      nationality: sanitizedInput[`child${index}Nationalitites`] || sanitizedInput[`child${index}Nationality`] || null,
      alternateNationality: sanitizedInput[`child${index}AlternateNationality`] || null,
      dateOfBirth: sanitizedInput[`child${index}DateOfBirth`] || null,
      countryOfBirth: sanitizedInput[`child${index}PlaceOfBirth`] || sanitizedInput[`child${index}CountryOfBirth`] || null,
    }, relation.CHILD));
  }
  if (formNumber === formNumberContant.TWO) {
    relationsData.push(getRelationData({
      firstName: sanitizedInput.fatherFullName || null,
      countryOfBirth: sanitizedInput.fatherCountryOfBirth || null,
      nationality: sanitizedInput.fatherNationality || null,
      alternateNationality: sanitizedInput.fatherAlternateNationality || null,
      dateOfBirth: sanitizedInput.fatherDateOfBirth || null,
    }, relation.FATHER));
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

export default (formUID, formNumber, sanitizedInput, connection, action = formType.NEW, formDataExtraInfoInput) => cb => {
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
      const allRelationsData = getRelationsDataObject(sanitizedInput, formNumber);
      console.log('to update data', allRelationsData);
      connection.beginTransaction((err1) => {
        if (err1) cb(err1, null);
        connection.query(FORM_RELATIONS.FORM_RELATIONS_SELECT_BY_FORM_ID, [formUID], (err2, results) => {

        });
        const allRelationsData = getRelationsDataObject(sanitizedInput, formNumber);
        // asyncMapSeries(
        //   allRelationsData,
        //   (relationData, next) => insertRelationData(connection, relationData, next), 
        //   (err, results) => {
        //     if (err) cb(err, null);
        //     asyncMapSeries(
        //       results, 
        //       (relationId, next) => insertFormRelations(connection, formUID, relationId, next),
        //       (err1, results1) => {
        //         if (err1) cb(err1, null);
        //         cb(null, results1);
        //       });
        //   },
        // );
      });
      break;
    default: 
      return -1;
  }
};