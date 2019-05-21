import userRead from '../model/userRead';
import adminsReadAll from '../model/adminRead';
import agentsReadAll from '../model/agentRead';

export default {
  User: {
    createdDate: (parent) => {
      const date = new Date(parent.createdDate);
      return date.toUTCString();
    },
  },
  Query: {
    users: (parent, args, { sql }, info) => new Promise((resolve, reject) => {
      const userReadModel = userRead(sql);
      userReadModel((err, response) => {
        if (err) reject(err);
        resolve(response);
      });
    }),
    admins: (parent, args, { sql }, info) => new Promise((resolve, reject) => {
      const getAllAdmins = adminsReadAll(sql);
      getAllAdmins((err, response) => {
        if (err) reject(err);
        resolve(response);
      });
    }),
    agents: (parent, args, { sql }, info) => new Promise((resolve, reject) => {
      const getAllAgents = agentsReadAll(sql);
      getAllAgents((err, response) => {
        if (err) reject(err);
        resolve(response);
      });
    }),
  },
};
