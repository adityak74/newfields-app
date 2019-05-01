import getValueIfNotNull from './getValueIfNotNull';

export default (formUID, sanitizedInput) => ({
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
  nationalities: getValueIfNotNull(sanitizedInput.nationalities) ? sanitizedInput.nationalities : '',
  relationship: sanitizedInput.relationshipStatus,
  otherNames: getValueIfNotNull(sanitizedInput.otherNames),
});
