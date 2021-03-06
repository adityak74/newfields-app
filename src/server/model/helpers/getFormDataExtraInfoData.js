import getValueIfNotNull from './getValueIfNotNull';

const getPartnerNationalitites = (sanitizedInput) => {
  if (sanitizedInput.partnerNationalities) {
    return sanitizedInput.partnerNationalities;
  }
  if (sanitizedInput.partnerNationality) {
    return sanitizedInput.partnerNationality;
  }
  return '';
};

const getPlaceOfBirth = (sanitizedInput) => {
  if (sanitizedInput.partnerPlaceOfBirth) {
    return sanitizedInput.partnerPlaceOfBirth;
  }
  if (sanitizedInput.partnerCountryOfBirth) {
    return sanitizedInput.partnerCountryOfBirth;
  }
  return '';
};

export default (formUID, sanitizedInput) => ({
  formUniqueId: formUID,
  ukEntryDate: sanitizedInput.dateUKEntry,
  conviction: sanitizedInput.anyConvictions,
  convictionText: sanitizedInput.convictionText,
  visaRefusal: sanitizedInput.visaRefusals,
  visaRefusalText: sanitizedInput.visaRefusalText,
  publicFunds: getValueIfNotNull(sanitizedInput.detailsPublicFund),
  ukNino: getValueIfNotNull(sanitizedInput.UKNINumber),
  nationalInsuranceNumber: getValueIfNotNull(sanitizedInput.UKNINumberInfo)
    ? sanitizedInput.UKNINumberInfo
    : getValueIfNotNull(sanitizedInput.UKNINumber),
  ukNextDepartureDate: sanitizedInput.nextPlannedDeparture,
  ukNextArrivalDate: sanitizedInput.nextDateArrival,
  partnerTitle: getValueIfNotNull(sanitizedInput.partnerTitle),
  partnerFullName: getValueIfNotNull(sanitizedInput.partnerFullName),
  partnerMobile: getValueIfNotNull(sanitizedInput.partnerMobileNumber),
  partnerUKHomeAddress: getValueIfNotNull(sanitizedInput.partnerHomeAddress),
  partnerNationalities: getPartnerNationalitites(sanitizedInput),
  partnerAlternateNationality: getValueIfNotNull(sanitizedInput.partnerAlternateNationality),
  partnerDateOfBirth: getValueIfNotNull(sanitizedInput.partnerDateOfBirth),
  partnerPlaceOfBirth: getPlaceOfBirth(sanitizedInput),
  homeAddress: getValueIfNotNull(sanitizedInput.homeAddress),
  moveInDate: getValueIfNotNull(sanitizedInput.homeMoveInDate),
  homeOwnership: getValueIfNotNull(sanitizedInput.homeOwnership),
  addressOnVisa: getValueIfNotNull(sanitizedInput.addressWhileOnVisa),
  ifUKaddress: getValueIfNotNull(sanitizedInput.ifUKaddress),
  ukAddressInfo: getValueIfNotNull(sanitizedInput.UKAddress),
  medical: getValueIfNotNull(sanitizedInput.medical),
  medicalText: getValueIfNotNull(sanitizedInput.medicalInfo),
  nationalIdentityNumber: getValueIfNotNull(sanitizedInput.nationalIdentityNumber),
  armedForces: getValueIfNotNull(sanitizedInput.ifArmedForces),
  armedForcesText: getValueIfNotNull(sanitizedInput.armedForcesInfo),
  immediateFamily: getValueIfNotNull(sanitizedInput.ifImmediateFamily),
  immediateFamilyText: getValueIfNotNull(sanitizedInput.immediateFamilyInfo),
  familyMemberTravelAlong: getValueIfNotNull(sanitizedInput.familyMemberTravelAlong),
  familyMemberTravelAlongText: getValueIfNotNull(sanitizedInput.familyMemberTravelAlongInfo),
  overseasTravel: getValueIfNotNull(sanitizedInput.anyOverseasTravel),
  anyChildren: sanitizedInput.ifHasChildren,
  anyVisits: getValueIfNotNull(sanitizedInput.ifVisit),
  anyTrips: getValueIfNotNull(sanitizedInput.ifTrip),
  anyOtherTrips: getValueIfNotNull(sanitizedInput.ifOtherTrips),
  additionalInfoText: getValueIfNotNull(sanitizedInput.additionalInfoText),
});
