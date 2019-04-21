import asyncMapSeries from 'async/mapSeries';
import {
  formNumber as formNumberConstants,
  formType,
  relationTypes as relation,
  tripTypes as trip,
} from '../constants';
import userFormRead from './userFormsRead';
import sqlQueries from '../sqlQueries';

const { FORM_READ, FORM_RELATIONS, RELATIONSHIP_INFO } = sqlQueries;

const getRelationData = (connection, relationId, onCb) => {
  connection.query(RELATIONSHIP_INFO.RELATIONSHIP_INFO_SELECT_BY_ID, [relationId], (err, relation) => {
    if (err) onCb(err, null);
    if (relation.length) {
      onCb(null, relation[0]);
    } else onCb(null, []);
  });
};

let childIndex = 1;

const relationDataTranform = relationshipData => {
  const { CHILD, MOTHER, FATHER } = relation;
  switch (relationshipData.relationType) {
    case CHILD:
      const childData = {
        [`child${childIndex}FullName`]: relationshipData.firstName,
        [`child${childIndex}Nationalitites`]: relationshipData.nationality,
        [`child${childIndex}AlternateNationality`]: relationshipData.alternateNationality,
        [`child${childIndex}DateOfBirth`]: relationshipData.dateOfBirth,
        [`child${childIndex}CountryOfBirth`]: relationshipData.countryOfBirth,
      };
      childIndex += 1;
      if (childIndex === 3) childIndex = 1;
      return childData;
    case FATHER:
      return ({
        fatherFullName: relationshipData.firstName,
        fatherCountryOfBirth: relationshipData.countryOfBirth,
        fatherNationality: relationshipData.nationality,
        fatherAlternateNationality: relationshipData.alternateNationality,
        fatherDateOfBirth: relationshipData.dateOfBirth,
      });
    case MOTHER:
      return ({
        motherFullName: relationshipData.firstName,
        motherCountryOfBirth: relationshipData.countryOfBirth,
        motherNationality: relationshipData.nationality,
        motherAlternateNationality: relationshipData.alternateNationality,
        motherDateOfBirth: relationshipData.dateOfBirth,
      });
  }
};

export default (req, sqlConnPool) => cb => {
  const currentUser = req.user;
  
  sqlConnPool.getConnection((err, connection) => {
    if (err) cb(err, null);
    connection.beginTransaction((err1) => {
      if (err1) cb(err1, null);
      connection.query(FORM_READ.USERFORMS_SELECT_BY_USERID_INCOMPLETE, [currentUser.id], (err2, results) => {
        if (err2) cb(err2, null);
        if (results.length) {
          cb(null, results);
        } else cb(null, []);
      });  
    });
  });
};
