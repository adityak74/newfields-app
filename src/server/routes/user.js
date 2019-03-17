import express from 'express';
import validateSignIn from '../validation/validator/signIn';
import validateSignUp from '../validation/validator/signUp';


export default ({ appUrl, passport }) => {
  const router = express.Router();
  
  router.post('/sign-up', (req, res) => {
    const input = req.body;
  
    validateSignUp(input, {}, (validationErr, sanitizedInput) => {
      if (validationErr) res.status(400).send(validationErr);
      else {
        req.body = sanitizedInput;
        passport.authenticate('local-signup',
          function(err, user) {
            if (user) {
              const newUser = {
                userId: user.id,
                name: user.name,
                email: user.email,
              };
              res.status(200).send(newUser);
            } else {
              res.status(400).send(err.message);
            }
        })(req, res);
      }
    });
  });
  
  router.post('/sign-in', (req, res) => {
    const input = req.body;

    validateSignIn(input, {}, (validationErr, sanitizedInput) => {
      if (validationErr) res.status(400).send(validationErr);
      else {
        req.body = sanitizedInput;
        passport.authenticate('local-login',
          function(err, user) {
            if (user) {
              const newUser = {
                userId: user.id,
              }
              req.logIn(user, (err) => {
                if (err) return res.status(500).send(err.message);
                else res.status(200).send(newUser);
              });
            } else {
              return res.status(400).send(err.message);
            }  
        })(req, res);
      }
    });
  });

  router.get('/sign-in', (req, res) => res.render('pages/Login', { appLocation: appUrl }));

  router.all('/sign-out', (req, res) => {
    req.logOut();
    res.status(200).send();
  });
  
  return router;
};

