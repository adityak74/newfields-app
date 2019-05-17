import { ONE, TWO } from '../constants/formNumber';

export default (formNumber) => {
  const formRefNumber = Math.random().toString(36).slice(-8).toUpperCase();
  const formRefNumberString = 'NF-';
  if (formNumber === ONE) {
    formRefNumberString.concat('E');
  } else if (formNumber === TWO) {
    formRefNumberString.concat('N');
  }
  formRefNumberString.concat(formRefNumber);
  return formRefNumber;
};
