import { clone } from 'lodash';
import Joi from '../customJoi';
import schema from '../schema/form2';

export default (input, context = {}, callback) => {
  const data = clone(input);
  const ctx = clone(context || {});
  const opts = { abortEarly: false, context: ctx };

  return Joi.validate(data, schema, opts, callback);
};