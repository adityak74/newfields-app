import Joi from '../customJoi';

const schema = Joi.object().keys({
  email: Joi.string().email(),
  token: Joi.string().length(32),
});

export default schema;
