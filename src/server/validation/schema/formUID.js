import Joi from '../customJoi';

const schema = Joi.object().keys({
  formUID: Joi
    .string()
    .length(32),
});

export default schema;
