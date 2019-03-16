import Joi from '../customJoi';

const schema = Joi.object().keys({
  name: Joi.string(),
  email: Joi.string().email(),
  password: Joi.string(),
});

export default schema;
