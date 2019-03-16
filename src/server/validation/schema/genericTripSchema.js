import Joi from '../customJoi';

export default Joi.object().keys({
  country: Joi.string().allow(''),
  arrivalDate: Joi.date().max('now').format('DD/MM/YYYY').allow(''),
  departureDate: Joi.date().max('now').format('DD/MM/YYYY').allow(''),
  reasonInfo: Joi.string().allow(''),
});
