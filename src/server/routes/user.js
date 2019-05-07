import express from 'express';
import bcrypt from 'bcrypt-nodejs';
import passwordGenerator from 'generate-password';
import { renderFile as ejsRenderFile } from 'ejs';
import path from 'path';
import validateSignIn from '../validation/validator/signIn';
import validateTokenSignIn from '../validation/validator/tokenSignIn';
import validateSignUp from '../validation/validator/signUp';
import validateVerifyEmail from '../validation/validator/verifyEmail';
import validateChangePassword from '../validation/validator/changePassword';
import validateResetPassword from '../validation/validator/resetPassword';
import isLoggedIn from '../util/getIfAuthenticated';
import capitalizeFirst from '../util/capitalizeFirst';
import userFormsReadAll from '../model/userAllForms';
import adminSessionToken from '../model/adminSessionToken';
import adminSessionTokenReset from '../model/adminSessionTokenReset';
import { SUBMIT } from '../constants/formType';

const resetPasswordHTMLFile = path.join(
  __dirname,
  '..',
  '..',
  'views',
  'pages',
  'reset_email.ejs',
);

const userContactHTMLFile = path.join(
  __dirname,
  '..',
  '..',
  'views',
  'pages',
  'user_contact_email.ejs',
);

export default ({ appUrl, emailService, passport, sqlConn }) => {
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
            if(err) return res.status(400).send(err.message);
            if (user) {
              const newUser = {
                userId: user.id,
                admin: user.admin,
              }
              // if admin generate session token and enter in db 
              // do not login yet until he verifies token
              if (newUser.admin) { 
                const adminTokenModel = adminSessionToken(sqlConn, user, emailService);
                adminTokenModel((err, tokenData) => {
                  if (err) return res.status(500).send(err.message);
                  return res.status(200).send(tokenData);
                });
              } else {
                req.logIn(user, (err) => {
                  if (err) return res.status(500).send(err.message);
                  return res.status(200).send(newUser);
                });
              }
            } 
        })(req, res);
      }
    });
  });

  router.post('/sign-in/verify/token', (req, res) => {
    const input = req.body;

    validateTokenSignIn(input, {}, (validationErr, sanitizedInput) => {
      if (validationErr) res.status(400).send(validationErr);
      else {
        req.body = sanitizedInput;
        passport.authenticate('local-login',
          function(err, user) {
            if(err) return res.status(400).send(err.message);
            if (user) {
              const newUser = {
                userId: user.id,
                admin: user.admin,
              }
              req.logIn(user, (err) => {
                if (err) return res.status(500).send(err.message);
                // reset token to null and sign in
                const resetSessionTokenModel = adminSessionTokenReset(sqlConn, user);
                resetSessionTokenModel((err, response) => {
                  if (err) return res.status(500).send(err.message);
                  return res.status(200).send(newUser);
                });
              });
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
    res.render('pages/user_homepage', { appLocation: appUrl, username: capitalizeFirst(req.user.name) })
  });

  router.get('/homepage', isLoggedIn, (req, res) => res.render('pages/user_dashboard', { appLocation: appUrl }));

  router.get('/contact', isLoggedIn, (req, res) => res.render('pages/user_contact', { appLocation: appUrl }));
  
  router.post('/contact', isLoggedIn, (req, res) => {
    const { client_name, client_email, message_text } = req.body;
    ejsRenderFile(
      userContactHTMLFile,
      {
        userName: client_name,
        email: client_email,
        message: message_text,
      },
      (err, htmlString) => {
        emailService({
          toAddress: 'gagansingh2822@gmail.com',
          emailHtmlData: htmlString,
          emailTextData: htmlString,
          emailSubject: "Newfields - Contact",
        });
    });
    res.status(200).send();
  });

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

  router.get('/getForms', isLoggedIn, (req, res) => {
    const getAllForms = userFormsReadAll(req, sqlConn, SUBMIT, true);
    getAllForms((err, result) => {
      if (err) res.status(400).send(err);
      else res.send(result);
    });
  });

  router.post('/change-password', isLoggedIn, (req, res) => {
    const input = req.body;

    validateChangePassword(input, {}, (err, sanitizedInput) => {
      if (err) res.status(400).send(err);
      else {
        const userId = req.user.id;
        const hashedPassword = bcrypt.hashSync(sanitizedInput.password, null, null);
        sqlConn.query('UPDATE users SET password = ? where id = ?', [hashedPassword, userId], (err2, rows) => {
          if (err2) res.status(500).send(err2);
          if (rows.changedRows) {
            res.status(200).send();
          }
        });
      }
    });
  });

  router.post('/forgot-password', (req, res) => {
    const input = req.body;

    validateResetPassword(input, {}, (err, sanitizedInput) => {
      if (err) res.status(400).send(err);
      else {
        sqlConn.query('SELECT * from users where email = ?', [sanitizedInput.email], (err, rows) => {
          if (err) res.status(500).send();
          else {
            if (rows.length) {
              // generate random password for user. and send the email
              const randomGeneratedPassword = passwordGenerator.generate({
                length: 8,
                uppercase: false,
                strict: true,
              });
              const hashedRandomGeneratedPassword = bcrypt.hashSync(randomGeneratedPassword, null, null);
              sqlConn.query('UPDATE users SET password = ? where id = ?', [hashedRandomGeneratedPassword, rows[0].id], (err2, rows2) => {
                if (err2) res.status(500).send(err2);
                if (rows2.changedRows) {
                  const responseData = { userId: rows[0].id };
                  ejsRenderFile(
                    resetPasswordHTMLFile,
                    {
                      userName: rows[0].name,
                      updatedPassword: randomGeneratedPassword,
                    },
                    (err, htmlString) => {
                      emailService({
                        toAddress: rows[0].email,
                        emailHtmlData: htmlString,
                        emailTextData: htmlString,
                        emailSubject: "Newfields - Reset Password",
                      });
                  });
                  res.status(200).send(responseData);
                }
              });
            } else {
              res.status(400).send('userNotFound');
            }
          }
        });
      }
    });

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

    validateVerifyEmail(input, {}, (err, sanitizedInput) => {
      if (err) res.status(400).send(err);
      sqlConn.query("SELECT * FROM users WHERE email = ? and token = ?", 
        [sanitizedInput.email, sanitizedInput.token], 
        (err, rows) => {
          // found the user
          if (err) res.status(500).send(err);
          if (rows.length) {
            const userId = rows[0].id;
            if (rows[0].isVerified) {
              return redirectToSignIn();
            }
            sqlConn.query("UPDATE users SET isVerified = 1 where id = ?", [userId], (err2, rows2) => {
              if (err2) res.status(500).send(err2);
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

