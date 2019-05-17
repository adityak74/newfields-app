import Joi from '../customJoi';

export default Joi
  .string()
  .valid('Yes', 'No');
