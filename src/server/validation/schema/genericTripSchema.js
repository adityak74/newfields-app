import Joi from '../customJoi';

export default Joi.Object({
  country: Joi.string(),
  arrivalDate: Joi.date().max('now').format('DD/MM/YYYY'),
  departureDate: Joi.date().max('now').format('DD/MM/YYYY'),
  reasonInfo: Joi.string(),
});
