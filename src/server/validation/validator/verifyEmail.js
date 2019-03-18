import Joi from '../customJoi';
import { clone } from 'lodash';
import schema from '../schema/verifyEmail';

export default (input, context = {}, callback) => {
  const data = clone(input);
  const ctx = clone(context || {});
  const opts = { abortEarly: false, context: ctx };

  return Joi.validate(data, schema, opts, callback);
};