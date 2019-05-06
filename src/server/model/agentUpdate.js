import _omit from 'lodash/fp/omit';
import path from 'path';
import { renderFile as ejsRenderFile } from 'ejs';
import capitalizeFirst from '../util/capitalizeFirst';
import sqlQueries from '../sqlQueries';

const { USERS } = sqlQueries;

const agentConfirmationHTMLFile = path.join(
  __dirname,
  '..',
  '..',
  'views',
  'pages',
  'agent_confirmation.ejs',
);

const sendAgentConfirmationEmail = (agentUser, emailService) => {
  ejsRenderFile(
    agentConfirmationHTMLFile,
    {
      userName: capitalizeFirst(agentUser.name),
    },
    (err, htmlString) => {
      emailService({
        toAddress: agentUser.email,
        emailHtmlData: htmlString,
        emailTextData: htmlString,
        emailSubject: "Newfields - Agent Authorization",
      });
  });
};

export default (sqlConnPool, sanitizedInput, emailService) => cb => {
  sqlConnPool.getConnection((err, connection) => {
    if (err) cb(err, null);
    connection.beginTransaction((err1) => {
      if (err1) cb(err1, null);
      connection.query(USERS.SELECT_USER_BY_ID, [sanitizedInput.userID], (err2, rows2) => {
        if (err2) cb(err2, null);
        const user = rows2[0];
        if (user) {
          if (user.isVerified) {
            sendAgentConfirmationEmail(user, emailService);
            return cb(null, { agentID: user.id, isVerified: 1 });
          }
          connection.query(
            USERS.UPDATE_AGENT, [{isVerified: 1}, sanitizedInput.userID], (err3, rows3) => {
            if (err2) cb(err2, null);
            connection.commit((commitErr) => {
              if (commitErr) {
                return connection.rollback(() => {
                  throw commitErr;
                });
              }
              sendAgentConfirmationEmail(user, emailService);
              cb(null, { agentID: sanitizedInput.userID, isVerified: 1 });
            });
          });
        } else cb(null, null);
      }); 
    });
  });
};
