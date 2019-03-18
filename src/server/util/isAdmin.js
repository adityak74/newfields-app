export default (req, res, next) => {
  if (req.isAuthenticated()) {
    if (parseInt(req.user.admin)) {
      return next();
    }
  }
  res.redirect('/user/sign-in');
};
