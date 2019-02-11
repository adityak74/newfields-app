import Joi from '../customJoi';
import countries from '../constants/countries';

export default Joi
  .object()
  .keys({
    nationality: Joi.string()
      .valid(Object.keys(countries))
  });
