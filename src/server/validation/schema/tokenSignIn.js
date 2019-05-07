import Joi from '../customJoi';
import JoiEmail from './email';

const schema = Joi.object().keys({
  email: JoiEmail,
  password: Joi.string(),
  isAdmin: Joi.boolean(),
  session_token: Joi.string(),
});

export default schema;
