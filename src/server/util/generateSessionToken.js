export default () => {
  const sessionToken = Math.random().toString(36).slice(-8).toUpperCase();
  return sessionToken;
};
