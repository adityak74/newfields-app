/* eslint-disable max-len */
/* eslint-disable camelcase */
/* eslint-disable consistent-return */
import express from 'express';
import isAdmin from '../util/isAdmin';
import validateFormProgress from '../validation/validator/formProgress';
import validateSignUp from '../validation/validator/signUp';
import validateUserID from '../validation/validator/userID';

import {
  addAdminMutation,
  authorizeAgentMutation,
  updateProgressMutation,
} from '../graphql/mutation';
import {
  allFormsQuery,
  allAdminsQuery,
  allAgentsQuery,
} from '../graphql/query';

export default ({ appUrl }) => {
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
      req.apolloClient.mutate({
        mutation: updateProgressMutation,
        variables: { formID: sanitizedInput.formId, progressStatusCode: sanitizedInput.progressStatusCode }
      }).then((results) => {
        res.send(results.data.updateProgress);
      }).catch(error => res.status(400).send(error));
    });
  });

  router.get('/getForms', isAdmin, (req, res) => {
    req.apolloClient.query({ query: allFormsQuery, fetchPolicy: 'network-only' })
      .then((results) => {
        res.send(results.data.forms);
      }).catch((error) => {
        if (error) return res.status(400).send(error);
      });
  });

  router.post('/all', isAdmin, (req, res) => {
    req.apolloClient.query({ query: allAdminsQuery, fetchPolicy: 'network-only', })
      .then((results) => {
        res.send(results.data.admins);
      }).catch((error) => {
        if (error) return res.status(400).send(error);
      });
  });

  router.post('/allAgents', isAdmin, (req, res) => {
    req.apolloClient.query({ query: allAgentsQuery, fetchPolicy: 'network-only' })
      .then((results) => {
        res.send(results.data.agents);
      }).catch(error => res.status(400).send(error));
  });

  router.post('/agent/authorize', isAdmin, (req, res) => {
    const { agent_user_id } = req.body;
    const input = { userID: agent_user_id };
    validateUserID(input, {}, (validationErr, sanitizedInput) => {
      if (validationErr) res.status(400).send(validationErr);
      req.apolloClient.mutate({
        mutation: authorizeAgentMutation,
        variables: { agentId: sanitizedInput.userID }
      }).then((results) => {
        res.send(results.data.authorizeAgent);
      }).catch(error => res.status(400).send(error));
    });
  });

  router.post('/add-admin', (req, res) => {
    const {
      first_name,
      last_name,
      user_name,
      password,
    } = req.body;

    const input = {
      name: `${first_name} ${last_name}`,
      email: user_name,
      password,
    };

    validateSignUp(input, {}, (validationErr, sanitizedInput) => {
      if (validationErr) res.status(400).send(validationErr);
      else {
        // eslint-disable-next-line no-shadow
        const { name, email, password } = sanitizedInput;
        req.apolloClient.mutate({
          mutation: addAdminMutation,
          variables: { name, email, password }
        }).then((results) => {
          res.send(results.data.authorizeAgent);
        }).catch(error => res.status(400).send(error));
      }
    });
  });

  return router;
};
