import userRead from '../model/userRead';

export default {
  Query: {
    users: (parent, args, { sql }, info) => new Promise((resolve, reject) => {
      const userReadModel = userRead(sql);
      userReadModel((err, response) => {
        if (err) reject(err);
        resolve(response);
      });
    }),
  },
};
