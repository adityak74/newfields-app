import Joi from 'joi';
import xss from 'xss';
import joiPhoneNumber from 'joi-phone-number';
import joiPostalCode from 'joi-postalcode';
import joiDateExtension from 'joi-date-extensions';

// Joi.unescapedString() is a potential XSS vulnerability. Avoid this not only when an input
// is not currently rendered in the app or used in EmailRoot, but any time you could imagine
// the input being rendered in the future. The benefit of using it will almost never exceed
// the risk of using it.

const customJoi = Joi
  .extend((joi) => ({
    base: joi.string(),
    name: 'unescapedString',
  }))
  .extend((joi) => ({
    base: joi.string(),
    name: 'string',
    pre(value, state, options) {
      const xssValue = xss(value);
      if (value !== xssValue) {
        return this.createError('string.corrupt', { v: value }, state, options);
      }
      return xssValue;
    },
  }))
  .extend(joiPhoneNumber)
  .extend(joiPostalCode)
  .extend(joiDateExtension);

export default customJoi;