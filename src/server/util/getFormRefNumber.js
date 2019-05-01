import { ONE, TWO } from '../constants/formNumber';

export default (formNumber) => {
  const formRefNumber = Math.random().toString(36).slice(-8).toUpperCase();
  if (formNumber === ONE) {
    return `NF-E${formRefNumber}`;
  } else if (formNumber === TWO) {
    return `NF-N${formRefNumber}`;
  }
  return formRefNumber;
};
