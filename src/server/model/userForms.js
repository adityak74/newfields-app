import {
  formNumber as formNumberConstants,
  formType,
  relationTypes as relation,
  tripTypes as trip,
} from '../constants';
import getFormUID from '../util/getFormUID';
import sqlQueries from '../sqlQueries';

const getValueIfNotNull = input => input ? input : null;

// build input object for both form1 and form2 data with optional fields
const getFormDataObject = (formUID, sanitizedInput) => ({
  uniqueId: formUID,
  title: sanitizedInput.title,
  fullName: sanitizedInput.fullName,
  mobile: getValueIfNotNull(sanitizedInput.mobileNumber),
  landline: getValueIfNotNull(sanitizedInput.landlineNumber),
  email: sanitizedInput.emailAddress,
  addressLine1: getValueIfNotNull(sanitizedInput.addressLine1),
  addressLine2: getValueIfNotNull(sanitizedInput.addressLine2),
  town: getValueIfNotNull(sanitizedInput.town),
  county: getValueIfNotNull(sanitizedInput.county),
  postcode: getValueIfNotNull(sanitizedInput.postcode),
  nationalities: sanitizedInput.nationalities.join(','),
  relationship: sanitizedInput.relationshipStatus,
  otherNames: getValueIfNotNull(sanitizedInput.otherNames),
});

const getFormDataExtraInfoDataObject = (formUID, sanitizedInput, formNumber) => ({
  formUniqueId: formUID,
  ukEntryDate: sanitizedInput.dateUKEntry,
  conviction: sanitizedInput.convictionText,
  visaRefusal: sanitizedInput.visaRefusalText,
  publicFunds: getValueIfNotNull(sanitizedInput.detailsPublicFund),
  nationalInsuranceNumber: getValueIfNotNull(sanitizedInput.UKNINumberInfo)
    ? sanitizedInput.UKNINumberInfo
    : getValueIfNotNull(sanitizedInput.UKNINumber),
  ukNextDepartureDate: sanitizedInput.nextPlannedDeparture,
  ukNextArrivalDate: sanitizedInput.nextDateArrival,
  // only applicable for form1, form2 is serialzed in relationships table  
  partnerTitle: formNumber === formNumberConstants.ONE 
    ? getValueIfNotNull(sanitizedInput.partnerTitle) 
    : null,
  partnerFullName: formNumber === formNumberConstants.ONE ? sanitizedInput.partnerFullName : null,
  partnerMobile: formNumber === formNumberConstants.ONE 
    ? getValueIfNotNull(sanitizedInput.partnerMobileNumber)
    : null,
  partnerUKHomeAddress: formNumber === formNumberConstants.ONE 
    ? getValueIfNotNull(sanitizedInput.partnerHomeAddress)
    : null,
  partnerNationalities: formNumber === formNumberConstants.ONE 
    ? (getValueIfNotNull(sanitizedInput.partnerNationalities) ? sanitizedInput.partnerNationalities.join(',') : null)
    : null,
  partnerDateOfBirth: formNumber === formNumberConstants.ONE 
    ? sanitizedInput.partnerDateOfBirth
    : null,
  partnerPlaceOfBirth: formNumber === formNumberConstants.ONE 
    ? getValueIfNotNull(sanitizedInput.partnerPlaceOfBirth)
    : null,
  // only applicable for form1, form2 is serialzed in relationships table
  homeAddress: getValueIfNotNull(sanitizedInput.homeAddress),
  moveInDate: getValueIfNotNull(sanitizedInput.homeMoveInDate),
  homeOwnership: getValueIfNotNull(sanitizedInput.homeOwnership),
  addressOnVisa: getValueIfNotNull(sanitizedInput.addressWhileOnVisa),
  ukAddressInfo: getValueIfNotNull(sanitizedInput.UKAddress),
  medical: getValueIfNotNull(sanitizedInput.medicalInfo),
  nationalIdentityNumber: getValueIfNotNull(sanitizedInput.nationalIdentityNumber),
  armedForces: getValueIfNotNull(sanitizedInput.armedForcesInfo),
  immediateFamily: getValueIfNotNull(sanitizedInput.immediateFamilyInfo),
  familyMemberTravelAlong: getValueIfNotNull(sanitizedInput.familyMemberTravelAlongInfo),
  overseasTravel: getValueIfNotNull(sanitizedInput.anyOverseasTravel),
});

export default (req, sanitizedInput, sqlConnPool, action = formType.NEW, formNumber) => cb => {

  const currentUser = req.user;
  const { FORM_CREATE, FORM_READ, FORM_UPDATE } = sqlQueries;
  const { NEW, SUBMIT, UPDATE } = formType;

  switch(action) {
    case NEW:
      const newFormUID = getFormUID(formNumber, currentUser);
      const createNewFormEntryInput = {
        userId: currentUser.id,
        formUID: newFormUID,
        formNumber,
        status: NEW,
      };
      sqlConnPool.getConnection((err, connection) => {
        if (err) cb(err, null);
        connection.beginTransaction((err1) => {
          if (err1) cb(err1, null);
          connection.query(FORM_CREATE.CREATE_NEW_FORM_ENTRY, createNewFormEntryInput, (err2, result) => {
            if (err2) cb(err2, null);
            if (result) {
              connection.query(FORM_READ.USERFORMS_SELECT_BY_ROWID, { id: result.insertId } , (err3, rows) => {
                if (err3) cb(err3, null);
                const formUID = rows[0].formUID;
                const formDataInput = getFormDataObject(formUID, sanitizedInput);
                const formDataExtraInfoInput =  getFormDataExtraInfoDataObject(formUID, sanitizedInput, formNumber);
                // insert rest of the data here
                connection.query(FORM_CREATE.CREATE_NEW_FORM_DATA_ENTRY, formDataInput, (err4, rows4) => {
                  if (err4) cb(err4, null);
                  connection.query(FORM_CREATE.CREATE_NEW_FORM_DATA_EXTRA_INFO_ENTRY, formDataExtraInfoInput, (err5, rows5) => {
                    if (err5) cb(err5, null);
                    // commit the transaction here
                    connection.commit((commitErr) => {
                      if (commitErr) {
                        return connection.rollback(() => {
                          throw commitErr;
                        });
                      }
                      cb(null, createNewFormEntryInput);
                    });
                  });
                });
              });
            }
          });  
        });
      });
      break;
    case SUBMIT:
      // apply limits to user, form, times (8) max forms here later
      if (sanitizedInput.uniqueId) {
        sqlConnPool.query(
          FORM_READ.USERFORMS_SELECT_BY_FORMID_USERID_INCOMPLETE, 
          [sanitizedInput.uniqueId, currentUser.id], 
          (errRead, rowsRead) => {
            if (errRead) cb(errRead, null);
            if (rowsRead.length) {
              // save and submit
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
                            status: SUBMIT,
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
            } else {
              cb(new Error("Form not found or already submitted"), null);
            }
        });
      }  else {
        // submit as new form
        const newFormUID = getFormUID(formNumber, currentUser);
        const createNewFormEntryInput = {
          userId: currentUser.id,
          formUID: newFormUID,
          formNumber,
          status: NEW,
        };
        sqlConnPool.getConnection((err, connection) => {
          if (err) cb(err, null);
          connection.beginTransaction((err1) => {
            if (err1) cb(err1, null);
            connection.query(FORM_CREATE.CREATE_NEW_FORM_ENTRY, createNewFormEntryInput, (err2, result) => {
              if (err2) cb(err2, null);
              if (result) {
                connection.query(FORM_READ.USERFORMS_SELECT_BY_ROWID, { id: result.insertId } , (err3, rows) => {
                  if (err3) cb(err3, null);
                  const formUID = rows[0].formUID;
                  const formDataInput = getFormDataObject(formUID, sanitizedInput);
                  const formDataExtraInfoInput =  getFormDataExtraInfoDataObject(formUID, sanitizedInput, formNumber);
                  // insert rest of the data here
                  connection.query(FORM_CREATE.CREATE_NEW_FORM_DATA_ENTRY, formDataInput, (err4, rows4) => {
                    if (err4) cb(err4, null);
                    connection.query(FORM_CREATE.CREATE_NEW_FORM_DATA_EXTRA_INFO_ENTRY, formDataExtraInfoInput, (err5, rows5) => {
                      if (err5) cb(err5, null);
                      connection.query(FORM_UPDATE.UPDATE_FORM_SUBMIT_BY_FORMID_USERID, [{ status: SUBMIT }, formUID, currentUser.id], (err6, rows6) => {
                        if (err6) cb(err6, null);
                        // commit the transaction here
                        connection.commit((commitErr) => {
                          if (commitErr) {
                            return connection.rollback(() => {
                              throw commitErr;
                            });
                          }
                          cb(null, createNewFormEntryInput);
                        });
                      });
                    });
                  });
                });
              }
            });  
          });
        });
      }
      break;
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