import md5 from 'md5';

export default (formNumber, user) => {
  const formTimeStamp = new Date() * Math.random();
  const formUniqueId = md5(`${user.id}-form-${formNumber}-${formTimeStamp}`);
  return formUniqueId;
};
