import Joi from '../customJoi';
import JoiPhoneNumber from './phoneNumber';
import JoiNationalities from './nationalities';

const schema = Joi.object().keys({
  fullName: Joi.string(),
  mobileNumber: JoiPhoneNumber,
  nationalities: Joi.array().object(JoiNationalities),
  relationShipStatus: Joi.string(),
  title: Joi.string(),
});

export default schema;
