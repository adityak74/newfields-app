export default (req, res, next) => {
  if (req.isAuthenticated()) {
    if (parseInt(req.user.admin, 10)) {
      return next();
    }
  }
  res.redirect('/user/sign-in');
};
