import asyncMapSeries from 'async/mapSeries';
import parallel from 'async/parallel';
import groupBy from 'lodash/fp/groupBy';
import {
  formNumber as formNumberConstants,
  formType,
  relationTypes as relation,
  tripTypes as trip,
} from '../constants';
import sqlQueries from '../sqlQueries';

const { FORM_READ, FORM_RELATIONS, RELATIONSHIP_INFO, TRIPS, FORM_TRIPS } = sqlQueries;

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

const tripDataTransform = tripData => ({
  country: tripData.country,
  arrivalDate: tripData.arrivalDate,
  departureDate: tripData.departureDate,
  reasonInfo: tripData.reason,
  type: tripData.type,
});

const groupByTripType = tripData => {
  const { VISIT, NORMAL_TRIP, OTHER_TRIP } = trip;
  switch (tripData.type) {
    case VISIT:
      return 'visitInfo';
    case NORMAL_TRIP:
      return 'tripInfo'
    case OTHER_TRIP:
      return 'otherTripInfo';
  }
};

const getTripData = (connection, tripId, onCb) => {
  connection.query(TRIPS.TRIPS_SELECT_BY_ID, [tripId], (err, relation) => {
    if (err) onCb(err, null);
    if (relation.length) {
      onCb(null, relation[0]);
    } else onCb(null, []);
  });
};

const getFormRelationsData = (connection, sanitizedInput) => callback => {
  connection.query(FORM_RELATIONS.FORM_RELATIONS_SELECT_BY_FORM_ID, [sanitizedInput.formUID], (err4, result1) => {
    if (err4) return callback(err4, null);
    if (result1.length) {
      const relationIds = result1.map(res => res.relationshipId);
      asyncMapSeries(relationIds, (relationId, next) => getRelationData(connection, relationId, next), (err, relationsArray) => {
        const relationDataShimmed = relationsArray.map(relationDataTranform);
        return callback(null, relationDataShimmed);
      });
    } else return callback(null, []);
  });
};

const getFormTripData = (connection, sanitizedInput) => callback => {
  connection.query(FORM_TRIPS.FORM_TRIPS_SELECT_BY_FORM_ID, [sanitizedInput.formUID], (err4, result1) => {
    if (err4) return callback(err4, null);
    if (result1.length) {
      const tripIds = result1.map(res => res.tripId);
      asyncMapSeries(tripIds, (tripId, next) => getTripData(connection, tripId, next), (err, tripsArray) => {
        const tripsDataShimmed = tripsArray.map(tripDataTransform);
        const tripsDataGrouped = groupBy(groupByTripType, tripsDataShimmed);
        return callback(null, tripsDataGrouped);
      });
    } else return callback(null, []);
  });
};

export default (req, sanitizedInput, sqlConnPool) => cb => {
  const currentUser = req.user;
  const incompleteForms = {};
  if (currentUser.admin) {
    incompleteForms.query = FORM_READ.USERFORMS_SELECT_BY_FORMID_ALL;
    incompleteForms.params = [sanitizedInput.formUID];
  } else {
    incompleteForms.query = FORM_READ.USERFORMS_SELECT_BY_FORMID_USERID_INCOMPLETE;
    incompleteForms.params = [sanitizedInput.formUID, currentUser.id];
  }
  sqlConnPool.getConnection((err, connection) => {
    if (err) cb(err, null);
    connection.beginTransaction((err1) => {
      if (err1) cb(err1, null);
      connection.query(incompleteForms.query, incompleteForms.params, (err2, result) => {
        if (err2) cb(err2, null);
        if (result[0]) {
          connection.query(FORM_READ.USERFORMDATA_EXTRAINFO_SELECT_BY_FORMID, [result[0].formUID, result[0].formUID] , (err3, rows) => {
            if (err3) return cb(err3, null);
            const userFormDataWithInfo = rows[0];
            const formTripsData = getFormTripData(connection, sanitizedInput);
            const formRelationData = getFormRelationsData(connection, sanitizedInput);
            let resultObj = { ...userFormDataWithInfo };
            parallel([formRelationData, formTripsData], (asyncParallelErr, formDataResults) => {
              if (asyncParallelErr) return cb(asyncParallelErr, null);
              if (formDataResults.length) {
                const relationDataShimmed = formDataResults[0];
                relationDataShimmed.forEach(relation => 
                  resultObj = { ...resultObj, ...relation }
                );
                resultObj = { ...resultObj, ...formDataResults[1] };
              }
              return cb(null, resultObj);
            });
          });
        } else {
          cb(new Error("Form not found or already submitted. Redirecting to dashboard."), null);
        }
      });  
    });
  });
};
