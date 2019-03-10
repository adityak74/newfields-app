import Joi from '../customJoi';
import countries from '../constants/countries';

export default Joi.string()
  .valid(Object.keys(countries));
