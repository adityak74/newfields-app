import relation from '../constants/relationTypes';
import trip from '../constants/tripTypes';
import formType from '../constants/formType';
import formNumberConstants from '../constants/formNumber';
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

export default (req, sanitizedInput, sqlConn, action = formType.NEW, formNumber) => {

  const currentUser = req.user;
  const { FORM_CREATE, FORM_READ } = sqlQueries;
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
      console.log('get input obj', getFormDataObject('djkfghdf', sanitizedInput));
      console.log('get input sfkdkjhf', getFormDataExtraInfoDataObject('djkfghdf', sanitizedInput, formNumber));
      // sqlConn.query(FORM_CREATE.CREATE_NEW_FORM_ENTRY, createNewFormEntryInput, (err, result) => {
      //   if (err) return err;
      //   if (result) {
      //     sqlConn.query(FORM_READ.USERFORMS_SELECT_BY_ROWID, { id: result.insertId } , (err2, rows) => {
      //       const formUID = rows[0].formUID;
      //       // insert rest of the data here
            
      //     });
      //   }
      // });
    case SUBMIT:
      
    case UPDATE:

    default: 
      return -1;
  }
};