export default (req, res, next) => {
  if (req.isAuthenticated()) {
    return next();
  }
  res.status(400).send("Unauthenticated request");
};
