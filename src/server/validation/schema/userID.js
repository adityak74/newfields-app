import Joi from '../customJoi';

const schema = Joi.object().keys({
  userID: Joi
    .number()
    .min(1)
    .required(),
});

export default schema;
