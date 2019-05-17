import Joi from '../customJoi';
import JoiEmail from './email';

const schema = Joi.object().keys({
  email: JoiEmail,
  token: Joi.string().length(32),
});

export default schema;
