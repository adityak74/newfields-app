/* eslint-disable max-len */
import userRead from '../model/userRead';
import adminsReadAll from '../model/adminRead';
import agentsReadAll from '../model/agentRead';
import agentUpdate from '../model/agentUpdate';
import changePassword from '../model/changePassword';
import formProgress from '../model/formProgress';
import userFormsReadAll from '../model/userAllForms';

import { SUBMIT } from '../constants/formType';

export default {
  User: {
    createdDate: (parent) => {
      const date = new Date(parent.createdDate);
      return date.toUTCString();
    },
  },
  Query: {
    forms: (parent, args, { sql, req }) => new Promise((resolve, reject) => {
      const getAllForms = userFormsReadAll(req, sql, SUBMIT, false);
      getAllForms((err, result) => {
        if (err) reject(err);
        resolve(result);
      });
    }),
    users: (parent, args, { sql }) => new Promise((resolve, reject) => {
      const userReadModel = userRead(sql);
      userReadModel((err, response) => {
        if (err) reject(err);
        resolve(response);
      });
    }),
    admins: (parent, args, { sql }) => new Promise((resolve, reject) => {
      const getAllAdmins = adminsReadAll(sql);
      getAllAdmins((err, response) => {
        if (err) reject(err);
        resolve(response);
      });
    }),
    agents: (parent, args, { sql }) => new Promise((resolve, reject) => {
      const getAllAgents = agentsReadAll(sql);
      getAllAgents((err, response) => {
        if (err) reject(err);
        resolve(response);
      });
    }),
  },
  Mutation: {
    addAdmin: (parent, { name, email, password }, { passport, req, res }) => new Promise((resolve, reject) => {
      req.body = {
        name,
        email,
        password,
        isAdmin: true,
      };
      passport.authenticate('local-signup',
        (err, user) => {
          if (user) {
            const newUser = {
              id: user.id,
              name: user.name,
              email: user.email,
            };
            resolve(newUser);
          } else {
            reject(err.message);
          }
        })(req, res);
    }),
    authorizeAgent: (parent, { agentId }, { emailService, sql }) => new Promise((resolve, reject) => {
      const updateAgent = agentUpdate(sql, agentId, emailService);
      updateAgent((err, response) => {
        if (err) reject(err);
        resolve(response);
      });
    }),
    changePassword: (parent, { password }, { sql, req }) => new Promise((resolve, reject) => {
      const userId = req.user.id;
      const userChangePassword = changePassword(sql, userId, password);
      userChangePassword((err, response) => {
        if (err) reject(err);
        resolve(response);
      });
    }),
    signIn: (parent, { email, password, isAdmin }, {
      passport,
      req,
      res,
    }) => new Promise((resolve, reject) => {
      req.body = { email, password, isAdmin };
      passport.authenticate('local-login',
        (err, user) => {
          if (err) return reject(err.message);
          resolve({ user });
        })(req, res);
    }),
    signInWithToken: (parent, {
      email,
      password,
      isAdmin,
      sessionToken,
    }, {
      passport,
      req,
      res,
    }) => new Promise((resolve, reject) => {
      req.body = {
        email,
        password,
        isAdmin,
        session_token: sessionToken,
      };
      passport.authenticate('local-login',
        (err, user) => {
          if (err) return reject(err.message);
          resolve({ user });
        })(req, res);
    }),
    signUp: (parent, {
      name,
      email,
      password,
      isAgent,
    }, { passport, req, res }) => new Promise((resolve, reject) => {
      req.body = {
        name,
        email,
        password,
        isAgent,
      };
      passport.authenticate('local-signup',
        (err, user) => {
          if (err) return reject(err.message);
          resolve({ user });
        })(req, res);
    }),
    updateProgress: (parent, input, { sql }) => new Promise((resolve, reject) => {
      const formProgressUpdate = formProgress(sql, input);
      formProgressUpdate((err, response) => {
        if (err) reject(err);
        resolve(response);
      });
    }),
  },
};
