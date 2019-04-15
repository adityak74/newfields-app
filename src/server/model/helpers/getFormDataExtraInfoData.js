import { formNumber as formNumberConstants } from '../../constants';
import getValueIfNotNull from './getValueIfNotNull';

export default (formUID, sanitizedInput, formNumber) => ({
  formUniqueId: formUID,
  ukEntryDate: sanitizedInput.dateUKEntry,
  conviction: sanitizedInput.anyConvictions,
  convictionText: sanitizedInput.convictionText,
  visaRefusal: sanitizedInput.visaRefusals,
  visaRefusalText: sanitizedInput.visaRefusalText,
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
  // only applicable for form1
  // form2 is serialzed in relationships table
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
  anyChildren: sanitizedInput.ifHasChildren,
});
