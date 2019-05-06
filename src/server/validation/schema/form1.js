import Joi from '../customJoi';
import JoiPhoneNumber from './phoneNumber';
import JoiNationalities from './nationalities';
import JoiYesNo from './yesNo';

const JoiNationalitiesSchema = Joi.array().items(JoiNationalities);

const schema = Joi.object().keys({
  formAction: Joi.string().valid('new', 'update', 'submit'),
  uniqueId: Joi.string().length(32).when('formAction', { is: 'update', otherwise: Joi.string().allow('', null) }),
  title: Joi.string(),
  fulleName: Joi.string(),
  mobileNumber: JoiPhoneNumber,
  addressLine1: Joi.string(),
  addressLine2: Joi.string().allow(''),
  town: Joi.string(),
  county: Joi.string(),
  postcode: Joi.string().postalCode('GB'),
  emailAddress: Joi.string().email(),
  relationshipStatus: Joi.string(),
  nationalities: Joi.alternatives().try(JoiNationalitiesSchema, Joi.string().allow('', null)),
  dateUKEntry: Joi.date().max('now').format('DD/MM/YYYY'),
  anyConvictions: JoiYesNo,
  convictionText: Joi.string().allow(''),
  visaRefusals: JoiYesNo,
  visaRefusalText: Joi.string().allow(''),
  detailsPublicFund: Joi.string(),
  UKNINumber: JoiYesNo,
  UKNINumberInfo: Joi.string().allow(''),
  nextPlannedDeparture: Joi.date().min('now').format('DD/MM/YYYY'),
  nextDateArrival: Joi.date().min('now').format('DD/MM/YYYY'),
  ifHasChildren: JoiYesNo,
  partnerTitle: Joi.string().allow(''),
  partnerFullName: Joi.string().allow(''),
  partnerMobileNumber: JoiPhoneNumber.allow(''),
  partnerHomeAddress: Joi.string().allow(''),
  partnerNationalities: Joi.alternatives().try(JoiNationalitiesSchema, Joi.string().allow('', null)),
  partnerDateOfBirth: Joi.date().max('now').format('DD/MM/YYYY').allow(''),
  partnerPlaceOfBirth: Joi.string().allow(''),
  child1FullName: Joi.string().allow(''),
  child1Nationalitites: Joi.alternatives().try(JoiNationalitiesSchema, Joi.string().allow('', null)),
  child1DateOfBirth: Joi.date().max('now').format('DD/MM/YYYY').allow(''),
  child1PlaceOfBirth: Joi.string().allow(''),
  child2FullName: Joi.string().allow(''),
  child2Nationalitites: Joi.alternatives().try(JoiNationalitiesSchema, Joi.string().allow('', null)),
  child2DateOfBirth: Joi.date().max('now').format('DD/MM/YYYY').allow(''),
  child2PlaceOfBirth: Joi.string().allow(''),
  additionalInfoText: Joi.string().allow(''),
}).unknown(true);

export default schema;
