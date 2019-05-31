/* eslint-disable max-len */
import userRead from '../model/userRead';
import adminsReadAll from '../model/adminRead';
import agentsReadAll from '../model/agentRead';
import agentUpdate from '../model/agentUpdate';

export default {
  User: {
    createdDate: (parent) => {
      const date = new Date(parent.createdDate);
      return date.toUTCString();
    },
  },
  Query: {
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
    authorizeAgent: (parent, { agentId }, { emailService, sql }) => new Promise((resolve, reject) => {
      const updateAgent = agentUpdate(sql, agentId, emailService);
      updateAgent((err, response) => {
        if (err) reject(err);
        resolve(response);
      });
    }),
  },
};
