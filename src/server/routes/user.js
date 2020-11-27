/* eslint-disable consistent-return */
import express from 'express';
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
import adminSessionToken from '../model/adminSessionToken';
import adminSessionTokenReset from '../model/adminSessionTokenReset';

import {
  changePasswordMutation,
  forgotPasswordMutation,
  signInMutation,
  signInWithTokenMutation,
  signUpMutation,
  verifyEmailMutation,
} from '../graphql/mutation';
import { allFormsQuery } from '../graphql/query';

const userContactHTMLFile = path.join(
  __dirname,
  '..',
  '..',
  'views',
  'pages',
  'user_contact_email.ejs',
);

export default ({
  appUrl,
  appConfig,
  emailService,
  sqlConn,
}) => {
  const router = express.Router();

  router.post('/sign-up', (req, res) => {
    const input = req.body;

    validateSignUp(input, {}, (validationErr, sanitizedInput) => {
      if (validationErr) res.status(400).send(validationErr);
      const {
        name,
        email,
        password,
        isAgent
      } = sanitizedInput;
      req.apolloClient.mutate({
        mutation: signUpMutation,
        variables: {
          name,
          email,
          password,
          isAgent,
        },
      }).then((results) => {
        const signUpUser = results.data.signUp.user;
        res.status(200).send(signUpUser);
      }).catch(error => res.status(400).send(error));
    });
  });

  router.post('/sign-in', (req, res) => {
    const input = req.body;

    validateSignIn(input, {}, (validationErr, sanitizedInput) => {
      if (validationErr) return res.status(400).send(validationErr);
      const { email, password, isAdmin } = sanitizedInput;
      req.apolloClient.mutate({
        mutation: signInMutation,
        variables: { email, password, isAdmin }
      }).then((results) => {
        const currentUser = results.data.signIn.user;
        if (currentUser.admin) {
          const adminTokenModel = adminSessionToken(sqlConn, currentUser, emailService);
          adminTokenModel((err1, tokenData) => {
            if (err1) return res.status(400).send(err1.message);
            res.status(200).send(tokenData);
          });
        } else {
          return req.logIn(currentUser, (err2) => {
            if (err2) return res.status(400).send(err2.message);
            return res.status(200).send({ userId: currentUser.id });
          });
        }
      }).catch(error => res.status(400).send(error));
    });
  });

  router.post('/sign-in/verify/token', (req, res) => {
    const input = req.body;

    validateTokenSignIn(input, {}, (validationErr, sanitizedInput) => {
      if (validationErr) res.status(400).send(validationErr);
      else {
        const {
          email,
          password,
          isAdmin,
          // eslint-disable-next-line camelcase
          session_token,
        } = sanitizedInput;
        req.apolloClient.mutate({
          mutation: signInWithTokenMutation,
          variables: {
            email,
            password,
            isAdmin,
            sessionToken: session_token,
          }
        }).then((results) => {
          const currentUser = results.data.signInWithToken.user;
          req.logIn(currentUser, (err1) => {
            if (err1) return res.status(500).send(err1.message);
            // reset token to null and sign in
            const resetSessionTokenModel = adminSessionTokenReset(sqlConn, currentUser);
            resetSessionTokenModel((err2) => {
              if (err2) return res.status(500).send(err2.message);
              return res.status(200).send(currentUser);
            });
          });
        }).catch(error => res.status(400).send(error));
      }
    });
  });

  router.get('/sign-in', (req, res) => {
    if (req.user && parseInt(req.user.admin, 10)) return res.redirect('/admin/page');
    if (req.user) return res.redirect('/user/dashboard');
    return res.render('pages/login', { appLocation: appUrl });
  });

  router.get('/dashboard', isLoggedIn, (req, res) => {
    res.header('Cache-Control', 'no-store, no-cache, must-revalidate, no-transform, max-age=0, post-check=0, pre-check=0');
    res.header('Pragma', 'no-cache');
    res.render('pages/user_homepage', { appLocation: appUrl, username: capitalizeFirst(req.user.name) });
  });

  router.get('/homepage', isLoggedIn, (req, res) => res.render('pages/user_dashboard', { appLocation: appUrl }));

  router.get('/contact', isLoggedIn, (req, res) => res.render('pages/user_contact', { appLocation: appUrl }));

  router.post('/contact', isLoggedIn, (req, res) => {
    // eslint-disable-next-line camelcase
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
          toAddress: appConfig.get('supportEmail'),
          emailHtmlData: htmlString,
          emailTextData: htmlString,
          emailSubject: 'Newfields - Contact',
        });
      }
    );
    res.status(200).send();
  });

  router.get('/settings', isLoggedIn, (req, res) => {
    const newUser = {
      name: capitalizeFirst(req.user.name),
      location: req.user.location ? req.user.location : 'N.A.',
      dateOfBirth: req.user.dateOfBirth ? req.user.dateOfBirth : 'N.A.',
      email: req.user.email,
    };
    res.render('pages/user_settings', { appLocation: appUrl, userData: newUser });
  });

  router.all('/sign-out', isLoggedIn, (req, res) => {
    req.logOut();
    res.redirect('/user/sign-in');
  });

  router.get('/getForms', isLoggedIn, (req, res) => {
    req.apolloClient.query({ context: { req, res }, query: allFormsQuery, fetchPolicy: 'network-only' })
      .then((results) => {
        res.send(results.data.forms);
      }).catch((error) => {
        if (error) return res.status(400).send(error);
      });
  });

  router.post('/change-password', isLoggedIn, (req, res) => {
    const input = req.body;

    validateChangePassword(input, {}, (err, sanitizedInput) => {
      if (err) return res.status(400).send(err);
      const { password } = sanitizedInput;
      req.apolloClient.mutate({
        mutation: changePasswordMutation,
        variables: {
          password,
        },
      }).then(() => {
        res.status(200).send();
      }).catch(error => res.status(400).send(error));
    });
  });

  router.post('/forgot-password', (req, res) => {
    const input = req.body;

    validateResetPassword(input, {}, (err, sanitizedInput) => {
      if (err) return res.status(400).send(err);
      const { email } = sanitizedInput;
      req.apolloClient.mutate({
        mutation: forgotPasswordMutation,
        variables: {
          email,
        },
      }).then((results) => {
        const currentUser = results.data.forgotPassword.user;
        res.status(200).send(currentUser);
      }).catch(error => res.status(400).send(error));
    });
  });

  router.get('/email/verify', (req, res) => {
    const { email, token } = req.query;

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
      // eslint-disable-next-line no-shadow
      const { email, token } = sanitizedInput;
      req.apolloClient.mutate({
        mutation: verifyEmailMutation,
        variables: {
          email,
          token,
        },
      }).then((results) => {
        const currentUser = results.data.verifyEmail.user;
        if (currentUser.isVerified) {
          return redirectToSignIn();
        }
      }).catch(error => res.status(400).send(error));
    });
  });

  return router;
};
