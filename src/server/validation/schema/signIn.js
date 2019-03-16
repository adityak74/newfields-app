import Joi from '../customJoi';

const schema = Joi.object().keys({
  email: Joi.string().email(),
  password: Joi.string(),
});

export default schema;
