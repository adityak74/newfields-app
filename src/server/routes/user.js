import express from 'express';
import validateSignIn from '../validation/validator/signIn';
import validateSignUp from '../validation/validator/signUp';
import validateVerifyEmail from '../validation/validator/verifyEmail';
import isLoggedIn from '../util/getIfAuthenticated';
import capitalizeFirst from '../util/capitalizeFirst';

import getFormUIDHandler from '../util/getFormUID';

export default ({ appUrl, passport, sqlConn }) => {
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
                admin: user.admin,
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

  router.get('/sign-in', (req, res) => {
    if (req.user && parseInt(req.user.admin)) return res.redirect('/admin/page');
    if (req.user) return res.redirect('/user/dashboard');
    else return res.render('pages/login', { appLocation: appUrl });
  });

  router.get('/dashboard', isLoggedIn, (req, res) => {
    res.header('Cache-Control', 'no-store, no-cache, must-revalidate, no-transform, max-age=0, post-check=0, pre-check=0');
    res.header('Pragma', 'no-cache');
    res.render('pages/user_dashboard', { appLocation: appUrl, username: capitalizeFirst(req.user.name) })
  });

  router.get('/homepage', isLoggedIn, (req, res) => res.render('pages/user_homepage', { appLocation: appUrl }));

  router.get('/contact', isLoggedIn, (req, res) => res.render('pages/user_contact', { appLocation: appUrl }));

  router.get('/settings', isLoggedIn, (req, res) => { 
    const newUser = {
      name: capitalizeFirst(req.user.name),
      location: req.user.location ? req.user.location : 'N.A.',
      dateOfBirth: req.user.dateOfBirth ? req.user.dateOfBirth : 'N.A.',
      email: req.user.email,
    }
    res.render('pages/user_settings', { appLocation: appUrl, userData: newUser });
  });

  router.all('/sign-out', isLoggedIn, (req, res) => {
    req.logOut();
    res.redirect('/user/sign-in');
  });

  router.get('/getFormUID', isLoggedIn, (req, res) => {
    res.send(getFormUIDHandler(1, req.user));
  });

  router.get('/email/verify', (req, res) => {
    const email = req.query.email;
    const token = req.query.token;

    const input = {
      email,
      token,
    };

    const redirectToSignIn = () => {
      res.header('Cache-Control', 'no-store, no-cache, must-revalidate, no-transform, max-age=0, post-check=0, pre-check=0');
      res.header('Pragma', 'no-cache');
      res.redirect('user/sign-in');
    };

    // add validate here then SQL query
    validateVerifyEmail(input, {}, (err, sanitizedInput) => {
      if (err) res.status(400).send(err);
      sqlConn.query("SELECT * FROM users WHERE email = ? and token = ?", 
        [sanitizedInput.email, sanitizedInput.token], 
        (err, rows) => {
          // found the user
          if (rows.length) {
            const userId = rows[0].id;
            if (rows[0].isVerified) {
              return redirectToSignIn();
            }
            sqlConn.query("UPDATE users SET isVerified = 1 where id = ?", [userId], (err, rows2) => {
              if (rows2.changedRows) {
                // redirect to login
                redirectToSignIn();
              } else {
                res.status(400).send("Couldn't verify email. Please try again or contact admin.");
              }
            });
          } else {
            // user not found
            res.status(400).send("Couldn't find email on database. Please sign up");
          }
      });
    });

  });
  
  return router;
};

