import Joi from '../customJoi';

const schema = Joi.object().keys({
  password: Joi.string().required(),
  confirm_password: Joi
    .any()
    .valid(Joi.ref('password'))
    .required()
    .options({
      language:
        {
          any: {
            allowOnly: 'must match password',
          }
        }
    }),
});

export default schema;
