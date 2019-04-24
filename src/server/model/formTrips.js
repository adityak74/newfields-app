import asyncMapSeries from 'async/mapSeries';
import {
  formType,
  formNumber as formNumberContant,
  tripTypes,
} from '../constants';
import sqlQueries from '../sqlQueries';

const { TRIPS, FORM_TRIPS } = sqlQueries;
const { VISIT, NORMAL_TRIP, OTHER_TRIP } = tripTypes;

const getTripsDataObject = (sanitizedInput, formNumber) => {
  const tripsData = [];
  if (formNumber === formNumberContant.TWO) {
    if (sanitizedInput.visits.length) {
      sanitizedInput.visits.forEach(visit => {
        tripsData.push({
          country: visit.country,
          arrivalDate: visit.arrivalDate,
          departureDate: visit.departureDate,
          reason: visit.reasonInfo,
          type: VISIT,
        });
      });
    }
    if (sanitizedInput.trips.length) {
      sanitizedInput.trips.forEach(trip => {
        tripsData.push({
          country: trip.country,
          arrivalDate: trip.arrivalDate,
          departureDate: trip.departureDate,
          reason: trip.reasonInfo,
          type: NORMAL_TRIP,
        });
      });
    }
    if (sanitizedInput.otherTrips.length) {
      sanitizedInput.otherTrips.forEach(otherTrip => {
        tripsData.push({
          country: otherTrip.country,
          arrivalDate: otherTrip.arrivalDate,
          departureDate: otherTrip.departureDate,
          reason: otherTrip.reasonInfo,
          trip: OTHER_TRIP,
        });
      });
    }
  }
  return tripsData;
};

const insertTripData = (connection, tripObject, onCb) => {
  connection.query(TRIPS.CREATE_NEW_TRIPS_ENTRY, tripObject, (err, result) => {
    if (err) onCb(err, null);
    onCb(null, result.insertId);
  });
};

const updateTripData = (connection, tripObject, onCb) => {
  connection.query(TRIPS.UPDATE_TRIPS_ENTRY_BY_ID, [tripObject.data, tripObject.id], (err, result) => {
    if (err) onCb(err, null);
    onCb(null, result.changedRows || result.affectedRows);
  });
};

const insertFormTrips = (connection, formUID, tripId, onCb) => {
  connection.query(FORM_TRIPS.CREATE_NEW_FORM_TRIPS_ENTRY, { formId: formUID, tripId }, (err, result) => {
    if (err) onCb(err, null);
    onCb(null, result.insertId);
  });
};

export default (formUID, formNumber, sanitizedInput, connection, action = formType.NEW, formDataExtraInfoInput) => cb => {
  switch (action) {
    case NEW:
      connection.beginTransaction((err1) => {
        if (err1) cb(err1, null);
        const allTripsData = getTripsDataObject(sanitizedInput, formNumber);
        asyncMapSeries(
          allTripsData,
          (tripData, next) => insertTripData(connection, tripData, next), 
          (err, results) => {
            if (err) cb(err, null);
            asyncMapSeries(
              results, 
              (tripId, next) => insertFormTrips(connection, formUID, tripId, next),
              (err1, results1) => {
                if (err1) cb(err1, null);
                cb(null, results1);
              });
          },
        );
      });
      break;
    case SUBMIT:
      if (sanitizedInput.uniqueId) {
        const allTripsData = getTripsDataObject(sanitizedInput, formNumber);
        connection.beginTransaction((err1) => {
          if (err1) cb(err1, null);
          connection.query(FORM_TRIPS.FORM_TRIPS_SELECT_BY_FORM_ID, [formUID], (err2, results) => {
            if (err2) cb(err2, null);
            if (results.length) {
              const tripIdsData = results.map((trip, index) => ({ id : trip.tripId, data: allTripsData[index] }));
              asyncMapSeries(
                tripIdsData, 
                (trip, next) => updateTripData(connection, trip, next), 
                (err3, results3) => {
                  if (err3) cb(err3, null);
                  cb(null, results3);
                });
            } else cb(null, null);
          });
        });
      } else {
        connection.beginTransaction((err1) => {
          if (err1) cb(err1, null);
          const allTripsData = getTripsDataObject(sanitizedInput, formNumber);
          asyncMapSeries(
            allTripsData,
            (tripData, next) => insertTripData(connection, tripData, next), 
            (err, results) => {
              if (err) cb(err, null);
              asyncMapSeries(
                results, 
                (tripId, next) => insertFormTrips(connection, formUID, tripId, next),
                (err1, results1) => {
                  if (err1) cb(err1, null);
                  cb(null, results1);
                });
            },
          );
        });
      }
      break;
    case UPDATE:
      const allTripsData = getTripsDataObject(sanitizedInput, formNumber);
      connection.beginTransaction((err1) => {
        if (err1) cb(err1, null);
        connection.query(FORM_TRIPS.FORM_TRIPS_SELECT_BY_FORM_ID, [formUID], (err2, results) => {
          if (err2) cb(err2, null);
          if (results.length) {
            const tripIdsData = results.map((trip, index) => ({ id : trip.tripId, data: allTripsData[index] }));
            asyncMapSeries(
              tripIdsData, 
              (trip, next) => updateTripData(connection, trip, next), 
              (err3, results3) => {
                if (err3) cb(err3, null);
                cb(null, results3);
              });
          } else cb(null, null);
        });
      });
      break;
    default: 
      return -1;
  }
};