import express from 'express';
import isAdmin from '../util/isAdmin';
import validateFormProgress from '../validation/validator/formProgress';
import validateSignUp from '../validation/validator/signUp';
import validateUserID from '../validation/validator/userID';
import userFormsReadAll from '../model/userAllForms';
import adminsReadAll from '../model/adminRead';
import agentsReadAll from '../model/agentRead';
import agentUpdate from '../model/agentUpdate';
import formProgress from '../model/formProgress';
import { SUBMIT } from '../constants/formType';

export default ({ appUrl, emailService, passport, sqlConn }) => {
  const router = express.Router();

  router.get('/homepage', isAdmin, (req, res) => res.render('pages/admin_dashboard', { appLocation: appUrl }));

  router.get('/manage-accounts', isAdmin, (req, res) => res.render('pages/admin_manage_accounts', { appLocation: appUrl }));

  router.get('/page', isAdmin, (req, res) => {
    res.header('Cache-Control', 'no-store, no-cache, must-revalidate, no-transform, max-age=0, post-check=0, pre-check=0');
    res.header('Pragma', 'no-cache');
    res.render('pages/admin_homepage', { appLocation: appUrl });
  });

  router.post('/updateProgress', isAdmin, (req, res) => {
    const input = req.body;

    validateFormProgress(input, {}, (err, sanitizedInput) => {
      if (err) return res.status(400).send(err);
      const formProgressUpdate = formProgress(sqlConn, sanitizedInput);
      formProgressUpdate((err, response) => {
        if (err) return res.status(400).send(err);
        res.status(200).send(response);
      });
    });
  });

  router.get('/getForms', isAdmin, (req, res) => {
    const getAllForms = userFormsReadAll(req, sqlConn, SUBMIT, false);
    getAllForms((err, result) => {
      if (err) return res.status(400).send(err);
      else res.send(result);
    });
  });

  router.post('/all', isAdmin, (req, res) => {
    const getAllAdmins = adminsReadAll(sqlConn);
    getAllAdmins((err, result) => {
      if (err) return res.status(400).send(err);
      else res.send(result);
    });
  });

  router.post('/allAgents', isAdmin, (req, res) => {
    const getAllAgents = agentsReadAll(sqlConn);
    getAllAgents((err, result) => {
      if (err) return res.status(400).send(err);
      else res.send(result);
    });
  });

  router.post('/agent/authorize', isAdmin, (req, res) => {
    const { agent_user_id } = req.body;
    const input = { userID: agent_user_id };
    validateUserID(input, {}, (validationErr, sanitizedInput) => {
      if (validationErr) res.status(400).send(validationErr);
      const updateAgent = agentUpdate(sqlConn, sanitizedInput, emailService);
      updateAgent((err, result) => {
        if (err) return res.status(400).send(err);
        else res.send(result);
      });
    });
  });

  router.post('/add-admin', (req, res) => {
    const { first_name, last_name, user_name, password } = req.body;

    const input = {
      name: `${first_name} ${last_name}`,
      email: user_name,
      password,
    };
  
    validateSignUp(input, {}, (validationErr, sanitizedInput) => {
      if (validationErr) res.status(400).send(validationErr);
      else {
        req.body = { ...sanitizedInput, isAdmin: true };
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

  return router;
};