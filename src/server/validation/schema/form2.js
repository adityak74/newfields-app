import Joi from '../customJoi';
import JoiPhoneNumber from './phoneNumber';
import JoiNationalities from './nationalities';
import JoiYesNo from './yesNo';
import JoiGenericTripSchema from './genericTripSchema';

const JoiNationalitiesSchema = Joi.array().items(JoiNationalities);
const JoiGenericTripsSchema = Joi.array().items(JoiGenericTripSchema);

const schema = Joi.object().keys({
  formAction: Joi.string().valid('new', 'update', 'submit'),
  uniqueId: Joi.string().length(32),
  title: Joi.string(),
  fullName: Joi.string(),
  mobileNumber: JoiPhoneNumber,
  landlineNumber: JoiPhoneNumber,
  emailAddress: Joi.string().email(),
  homeAddress: Joi.string(),
  homeMoveInDate: Joi.date().max('now').format('DD/MM/YYYY'),
  homeOwnership: Joi.string(),
  addressWhileOnVisa: Joi.string(),
  ifUKaddress: JoiYesNo,
  UKAddress: Joi.string().allow(''),
  nationalities: Joi.alternatives().try(JoiNationalitiesSchema, Joi.string().allow('', null)),
  nationalIdentityNumber: Joi.string(),
  otherNames: Joi.string(),
  relationshipStatus: Joi.string(),
  anyConvictions: JoiYesNo,
  convictionText: Joi.string().allow(''),
  visaRefusals: JoiYesNo,
  visaRefusalText: Joi.string().allow(''),
  medical: JoiYesNo,
  medicalInfo: Joi.string().allow(''),
  UKNINumber: JoiYesNo,
  UKNINumberInfo: Joi.string().allow(''),
  ifArmedForces: JoiYesNo,
  armedForcesInfo: Joi.string().allow(''),
  ifImmediateFamily: JoiYesNo,
  immediateFamilyInfo: Joi.string().allow(''),
  dateUKEntry: Joi.date().min('now').format('DD/MM/YYYY'),
  familyMemberTravelAlong: JoiYesNo,
  familyMemberTravelAlongInfo: Joi.string().allow(''),
  anyOverseasTravel: Joi.string(),
  nextPlannedDeparture: Joi.date().min('now').format('DD/MM/YYYY'),
  nextDateArrival: Joi.date().min('now').format('DD/MM/YYYY'),
  fatherFullName: Joi.string(),
  fatherCountryOfBirth: Joi.string(),
  fatherNationality: Joi.alternatives().try(JoiNationalitiesSchema, Joi.string().allow('', null)),
  fatherAlternateNationality: Joi.alternatives().try(JoiNationalitiesSchema, Joi.string().allow('', null)),
  fatherDateOfBirth: Joi.date().max('now').format('DD/MM/YYYY'),
  motherFullName: Joi.string(),
  motherCountryOfBirth: Joi.string(),
  motherNationality: Joi.alternatives().try(JoiNationalitiesSchema, Joi.string().allow('', null)),
  motherAlternateNationality: Joi.alternatives().try(JoiNationalitiesSchema, Joi.string().allow('', null)),
  motherDateOfBirth: Joi.date().max('now').format('DD/MM/YYYY'),
  partnerFullName: Joi.string().allow(''),
  partnerCountryOfBirth: Joi.string().allow(''),
  partnerNationality: Joi.alternatives().try(JoiNationalitiesSchema, Joi.string().allow('', null)),
  partnerAlternateNationality: Joi.alternatives().try(JoiNationalitiesSchema, Joi.string().allow('', null)),
  partnerDateOfBirth: Joi.date().max('now').format('DD/MM/YYYY').allow(''),
  ifHasChildren: JoiYesNo,
  child1FullName: Joi.string().allow(''),
  child1CountryOfBirth: Joi.string().allow(''),
  child1Nationality: Joi.alternatives().try(JoiNationalitiesSchema, Joi.string().allow('', null)),
  child1AlternateNationality: Joi.alternatives().try(JoiNationalitiesSchema, Joi.string().allow('', null)),
  child1DateOfBirth: Joi.date().max('now').format('DD/MM/YYYY').allow(''),
  child2FullName: Joi.string().allow(''),
  child2CountryOfBirth: Joi.string().allow(''),
  child2Nationality: Joi.alternatives().try(JoiNationalitiesSchema, Joi.string().allow('', null)),
  child2AlternateNationality: Joi.alternatives().try(JoiNationalitiesSchema, Joi.string().allow('', null)),
  child2DateOfBirth: Joi.date().max('now').format('DD/MM/YYYY').allow(''),
  ifVisit: JoiYesNo,
  visits: JoiGenericTripsSchema,
  ifTrip: JoiYesNo,
  trips: JoiGenericTripsSchema,
  ifOtherTrips: JoiYesNo,
  otherTrips: JoiGenericTripsSchema,
  additionalInfoText: Joi.string().allow(''),
}).unknown(true);

export default schema;
