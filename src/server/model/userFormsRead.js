import {
  formNumber as formNumberConstants,
  formType,
  relationTypes as relation,
  tripTypes as trip,
} from '../constants';
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

export default (req, sanitizedInput, sqlConnPool) => cb => {

  const currentUser = req.user;
  const { FORM_READ } = sqlQueries;

  sqlConnPool.getConnection((err, connection) => {
    if (err) cb(err, null);
    connection.beginTransaction((err1) => {
      if (err1) cb(err1, null);
      connection.query(FORM_READ.USERFORMS_SELECT_BY_FORMID_USERID_INCOMPLETE, [sanitizedInput.formUID, currentUser.id], (err2, result) => {
        if (err2) cb(err2, null);
        if (result[0]) {
          connection.query(FORM_READ.USERFORMDATA_EXTRAINFO_SELECT_BY_FORMID, [result[0].formUID, result[0].formUID] , (err3, rows) => {
            if (err3) cb(err3, null);
            cb(null, rows[0]);
          });
        } else {
          cb(new Error("Form not found or already submitted. Redirecting to dashboard."), null);
        }
      });  
    });
  });
};
