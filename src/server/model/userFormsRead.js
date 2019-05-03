import asyncMapSeries from 'async/mapSeries';
import parallel from 'async/parallel';
import groupBy from 'lodash/fp/groupBy';
import {
  formNumber as formNumberConstants,
  formType,
  relationTypes as relation,
  tripTypes as trip,
  documentType,
} from '../constants';
import sqlQueries from '../sqlQueries';

const { FORM_READ, FORM_RELATIONS, RELATIONSHIP_INFO, TRIPS, FORM_TRIPS, DOCUMENTS } = sqlQueries;
const {
  BIOMETRIC_RESIDENCE_PERMIT_FRONT,
  BIOMETRIC_RESIDENCE_PERMIT_BACK,
  CURRENT_COUNTRY_RESIDENCE_PERMIT,
  PREVIOUS_UK_VISA,
  PASSPORT_FRONT,
  PASSPORT_FRONT_TWO,
} = documentType;

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

const documentsDataTransform = documentsData => {
  const documentsLinkData = {};
  switch (documentsData.type) {
    case BIOMETRIC_RESIDENCE_PERMIT_FRONT:
      documentsLinkData.biometric_residence_permit_front_link = documentsData.url;
      documentsLinkData.biometric_residence_permit_front = documentsData.fileKey;
      break;
    case BIOMETRIC_RESIDENCE_PERMIT_BACK:
      documentsLinkData.biometric_residence_permit_back_link = documentsData.url;
      documentsLinkData.biometric_residence_permit_back = documentsData.fileKey;
      break;
    case PASSPORT_FRONT_TWO:
      documentsLinkData.passport_front_two_link = documentsData.url;
      documentsLinkData.passport_front_two = documentsData.fileKey;
      break;
    case PASSPORT_FRONT:
      documentsLinkData.passport_front_link = documentsData.url;
      documentsLinkData.passport_front = documentsData.fileKey;
      break;
    case PREVIOUS_UK_VISA:
      documentsLinkData.previous_uk_visa_link = documentsData.url;
      documentsLinkData.previous_uk_visa = documentsData.fileKey;
      break;
    case CURRENT_COUNTRY_RESIDENCE_PERMIT:
      documentsLinkData.current_visa_link = documentsData.url;
      documentsLinkData.current_visa = documentsData.fileKey;
      break;
  }
  return documentsLinkData;
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
  connection.query(FORM_RELATIONS.FORM_RELATIONS_SELECT_BY_FORM_ID, [sanitizedInput.formUID], (err, result1) => {
    if (err) return callback(err, null);
    if (result1.length) {
      const relationIds = result1.map(res => res.relationshipId);
      asyncMapSeries(relationIds, (relationId, next) => getRelationData(connection, relationId, next), (asyncMapSeriesErr, relationsArray) => {
        if (asyncMapSeriesErr) return callback(asyncMapSeriesErr, null);
        const relationDataShimmed = relationsArray.map(relationDataTranform);
        return callback(null, relationDataShimmed);
      });
    } else return callback(null, []);
  });
};

const getFormTripData = (connection, sanitizedInput) => callback => {
  connection.query(FORM_TRIPS.FORM_TRIPS_SELECT_BY_FORM_ID, [sanitizedInput.formUID], (err, result1) => {
    if (err) return callback(err, null);
    if (result1.length) {
      const tripIds = result1.map(res => res.tripId);
      asyncMapSeries(tripIds, (tripId, next) => getTripData(connection, tripId, next), (asyncMapSeriesErr, tripsArray) => {
        if (asyncMapSeriesErr) return callback(asyncMapSeriesErr, null);
        const tripsDataShimmed = tripsArray.map(tripDataTransform);
        const tripsDataGrouped = groupBy(groupByTripType, tripsDataShimmed);
        return callback(null, tripsDataGrouped);
      });
    } else return callback(null, []);
  });
};

const getFormDocumentsData = (connection, sanitizedInput, s3FileDownloadService, currentFormNumber) => callback => {
  connection.query(DOCUMENTS.DOCUMENTS_SELECT_BY_FORMUID, [sanitizedInput.formUID], (err, result1) => {
    if (err) return callback(err, null);
    if (result1.length) {
      const documents = result1.filter(doc => doc.fileKey !== null).map(doc => ({ fileKey: doc.fileKey, type: doc.type }));
      asyncMapSeries(documents, (document, next) => s3FileDownloadService(document, next), (asyncMapSeriesErr, documentsArray) => {
        if (asyncMapSeriesErr) return callback(asyncMapSeriesErr, null);
        const documentsData = documentsArray.map(documentsDataTransform);
        return callback(null, documentsData);
      });
    } else return callback(null, []);
  });
};

export default (req, sanitizedInput, sqlConnPool, s3FileDownloadService) => cb => {
  const incompleteForms = {};
  incompleteForms.query = FORM_READ.USERFORMS_SELECT_BY_FORMID_ALL;
  incompleteForms.params = [sanitizedInput.formUID];
  sqlConnPool.getConnection((err, connection) => {
    if (err) cb(err, null);
    connection.beginTransaction((err1) => {
      if (err1) cb(err1, null);
      connection.query(incompleteForms.query, incompleteForms.params, (err2, result) => {
        if (err2) cb(err2, null);
        if (result[0]) {
          const currentFormNumber = result[0].formNumber;
          const currentFormRefNumber = result[0].formRefNumber;
          const currentFormStatus = result[0].status;
          connection.query(FORM_READ.USERFORMDATA_EXTRAINFO_SELECT_BY_FORMID, [result[0].formUID, result[0].formUID] , (err3, rows) => {
            if (err3) return cb(err3, null);
            const userFormDataWithInfo = rows[0];
            const formTripsData = getFormTripData(connection, sanitizedInput);
            const formRelationData = getFormRelationsData(connection, sanitizedInput);
            const formDocumentsData = getFormDocumentsData(connection, sanitizedInput, s3FileDownloadService, currentFormNumber);
            let resultObj = { ...userFormDataWithInfo, formReferenceNumber: currentFormRefNumber, formStatus: currentFormStatus };
            parallel([formRelationData, formTripsData, formDocumentsData], (asyncParallelErr, formDataResults) => {
              if (asyncParallelErr) return cb(asyncParallelErr, null);
              if (formDataResults.length) {
                const relationDataShimmed = formDataResults[0];
                relationDataShimmed.forEach(relation => 
                  resultObj = { ...resultObj, ...relation }
                );
                const documentDataShimmed = formDataResults[2];
                documentDataShimmed.forEach(doc => 
                  resultObj = { ...resultObj, ...doc }
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
