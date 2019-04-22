import Joi from '../customJoi';

const schema = Joi.object().keys({
  formId: Joi
    .string()
    .length(32)
    .required(),
  progressStatusCode: Joi
    .number()
    .min(1)
    .max(3)
    .required()
}).unknown(false);

export default schema;
