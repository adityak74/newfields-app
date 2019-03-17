import md5 from 'md5';

export default (formNumber, user) => {
  console.log('GOT USER', user, formNumber);
  const formUniqueId = md5(`${user.id}form${formNumber}`);
  return formUniqueId;
};