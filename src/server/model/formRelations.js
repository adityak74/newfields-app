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
      const allRelationsData = getRelationsDataObject(sanitizedInput, formDataExtraInfoInput);
      console.log('to update data', allRelationsData);
      connection.beginTransaction((err1) => {
        if (err1) cb(err1, null);
        connection.query(FORM_RELATIONS.FORM_RELATIONS_SELECT_BY_FORM_ID, [formUID], (err2, results) => {

        });
        const allRelationsData = getRelationsDataObject(sanitizedInput, formDataExtraInfoInput);
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