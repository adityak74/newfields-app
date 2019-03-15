import Joi from '../customJoi';
import JoiPhoneNumber from './phoneNumber';
import JoiNationalities from './nationalities';
import JoiYesNo from './yesNo';

const JoiNationalitiesSchema = Joi.array().items(JoiNationalities);

const schema = Joi.object().keys({
  uniqueId: Joi.string().length(32),
  title: Joi.string(),
  fulleName: Joi.string(),
  mobileNumber: JoiPhoneNumber,
  landlineNumber: JoiPhoneNumber,
  homeAddress: Joi.string(),
  homeMoveInDate: Joi.date().max('now').format('DD/MM/YYYY'),
  homeOwnership: Joi.string(),
  addressWhileOnVisa: Joi.string(),
  ifUKaddress: JoiYesNo,
  UKAddress: Joi.string(),
  nationalities: JoiNationalitiesSchema,
  nationalIdentityNumber: Joi.string(),
  otherNames: Joi.string(),
  relationshipStatus: Joi.string(),
  anyConvictions: JoiYesNo,
  convictionText: Joi.string().allow(''),
  visaRefusals: JoiYesNo,
  visaRefusalText: Joi.string().allow(''),
  medical: JoiYesNo,
  medicalInfo: Joi.string(),
  UKNINumber: Joi.string(),
  UKNINumberInfo: Joi.string(),
  ifArmedForces: JoiYesNo,
  armedForcesInfo: Joi.string(),
  ifImmediateFamily: JoiYesNo,
  immediateFamilyInfo: Joi.string(),
  dateUKEntry: Joi.date().min('now').format('DD/MM/YYYY'),
  familyMemberTravelAlong: JoiYesNo,
  familyMemberTravelAlongInfo: Joi.string(),
  nextUKPlannedDeparture: Joi.date().min('now').format('DD/MM/YYYY'),
  nextUKDateArrival: Joi.date().min('now').format('DD/MM/YYYY'),

  fatherFullName: Joi.string(),
  fatherCountryOfBirth: Joi.string(),
  fatherNationality: JoiNationalities,
  fatherAlternateNationality: JoiNationalities,
  fatherDateOfBirth: Joi.date().max('now').format('DD/MM/YYYY'),

  notherFullName: Joi.string(),
  notherCountryOfBirth: Joi.string(),
  notherNationality: JoiNationalities,
  notherAlternateNationality: JoiNationalities,
  notherDateOfBirth: Joi.date().max('now').format('DD/MM/YYYY'),

  partnerFullName: Joi.string(),
  partnerCountryOfBirth: Joi.string(),
  partnerNationality: JoiNationalities,
  partnerAlternateNationality: JoiNationalities,
  partnerDateOfBirth: Joi.date().max('now').format('DD/MM/YYYY'),

  ifChildren: JoiYesNo,

  child1FullName: Joi.string(),
  child1CountryOfBirth: Joi.string(),
  child1Nationality: JoiNationalities,
  child1AlternateNationality: JoiNationalities,
  child1DateOfBirth: Joi.date().max('now').format('DD/MM/YYYY'),

  child2FullName: Joi.string(),
  child2CountryOfBirth: Joi.string(),
  child2Nationality: JoiNationalities,
  child2AlternateNationality: JoiNationalities,
  child2DateOfBirth: Joi.date().max('now').format('DD/MM/YYYY'),

  ifVisit: JoiYesNo,

  UKArrivalDate1: Joi.date().max('now').format('DD/MM/YYYY'),
  UKArrivalDate1: Joi.date().max('now').format('DD/MM/YYYY'),
  reasonVisit1: Joi.string(),

  UKArrivalDate2: Joi.date().max('now').format('DD/MM/YYYY'),
  UKArrivalDate2: Joi.date().max('now').format('DD/MM/YYYY'),
  reasonVisit2: Joi.string(),

  UKArrivalDate3: Joi.date().max('now').format('DD/MM/YYYY'),
  UKArrivalDate3: Joi.date().max('now').format('DD/MM/YYYY'),
  reasonVisit3: Joi.string(),

  UKArrivalDate4: Joi.date().max('now').format('DD/MM/YYYY'),
  UKArrivalDate4: Joi.date().max('now').format('DD/MM/YYYY'),
  reasonVisit4: Joi.string(),

  UKArrivalDate5: Joi.date().max('now').format('DD/MM/YYYY'),
  UKArrivalDate5: Joi.date().max('now').format('DD/MM/YYYY'),
  reasonVisit5: Joi.string(),

  ifTrip: JoiYesNo,

  country1: Joi.string(),
  country1ArrivalDate: Joi.date().max('now').format('DD/MM/YYYY'),
  country1ArrivalDate: Joi.date().max('now').format('DD/MM/YYYY'),
  reasonVisit1: Joi.string(),

  country2: Joi.string(),
  country2ArrivalDate: Joi.date().max('now').format('DD/MM/YYYY'),
  country2ArrivalDate: Joi.date().max('now').format('DD/MM/YYYY'),
  reasonVisit2: Joi.string(),

  addressLine2: Joi.string(),
  town: Joi.string(),
  county: Joi.string(),
  postcode: Joi.string().postalCode('GB'),
  emailAddress: Joi.string().email(),
  
  
  
  
  detailsPublicFund: Joi.string(),
  
  nextPlannedDeparture: Joi.date().min('now').format('DD/MM/YYYY'),
  nextDateArrival: Joi.date().min('now').format('DD/MM/YYYY'),
  ifHasChildren: JoiYesNo,
  partnerTitle: Joi.string().allow(''),
  partnerFullName: Joi.string().allow(''),
  partnerMobileNumber: JoiPhoneNumber.allow(''),
  partnerHomeAddress: Joi.string().allow(''),
  partnerNationalities: JoiNationalitiesSchema.allow(''),
  partnerDateOfBirth: Joi.date().max('now').format('DD/MM/YYYY').allow(''),
  partnerPlaceOfBirth: Joi.string().allow(''),
  child1FullName: Joi.string().allow(''),
  child1Nationalitites: JoiNationalitiesSchema.allow(''),
  child1DateOfBirth: Joi.date().max('now').format('DD/MM/YYYY').allow(''),
  child1PlaceOfBirth: Joi.string().allow(''),
  child2FullName: Joi.string().allow(''),
  child2Nationalitites: JoiNationalitiesSchema.allow(''),
  child2DateOfBirth: Joi.date().max('now').format('DD/MM/YYYY').allow(''),
  child2PlaceOfBirth: Joi.string().allow(''),
}).unknown(true);

export default schema;
