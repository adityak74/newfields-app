/* eslint-disable consistent-return */
import { Strategy as LocalStrategy } from 'passport-local';
import bcrypt from 'bcrypt-nodejs';
import md5 from 'md5';
import { renderFile as ejsRenderFile } from 'ejs';
import path from 'path';
import capitalizeFirst from './capitalizeFirst';

const emaiLVerificationHTMLFile = path.join(
  __dirname,
  '..',
  '..',
  'views',
  'pages',
  'email_verify.ejs',
);

export default (appConfig, emailService, passport, sqlConn) => {
  const appPort = appConfig.get('port');
  const appLocation = appConfig.get('location');
  const appUrl = `${appLocation}:${appPort}`;

  passport.serializeUser((user, done) => {
    done(null, user.id);
  });

  passport.deserializeUser((id, done) => {
    sqlConn.query('SELECT * FROM users WHERE id = ? ', [id], (err, rows) => {
      if (err) return done(err, null);
      done(null, rows[0]);
    });
  });

  passport.use(
    'local-signup',
    new LocalStrategy({
      // by default, local strategy uses username and password, we will override with email
      usernameField: 'email',
      passwordField: 'password',
      passReqToCallback: true // allows us to pass back the entire request to the callback
    },
    (req, email, password, done) => {
      const { name } = req.body;
      const isAdmin = req.body.isAdmin ? 1 : 0;
      const isAgent = req.body.isAgent ? 1 : 0;
      // find a user whose email is the same as the forms email
      // we are checking to see if the user trying to login already exists
      sqlConn.query('SELECT * FROM users WHERE email = ? and admin = ?', [email, isAdmin], (err, rows) => {
        if (err) {
          return done(err);
        }
        if (rows.length) {
          return done(new Error('duplicateUser'), false);
        }
        // if there is no user with that username
        // create the user
        const newUserMysql = {
          name,
          email,
          password: bcrypt.hashSync(password, null, null),
          token: md5(bcrypt.hashSync(`${appConfig.get('secret')}-${email}-${isAdmin}`, null, null)),
          admin: isAdmin,
          agent: isAgent,
        };

        const insertQuery = 'INSERT INTO users ( name, email, password, token, admin, agent ) values (?, ?, ?, ?, ?, ?)';

        sqlConn.query(insertQuery,
          [
            newUserMysql.name,
            newUserMysql.email,
            newUserMysql.password,
            newUserMysql.token,
            newUserMysql.admin,
            newUserMysql.agent,
          ], (err1, rows1) => {
            if (err1) return done(err1, null);
            newUserMysql.id = rows1.insertId;
            // if agent then admin will set isVerified true
            if (!newUserMysql.agent) {
              ejsRenderFile(
                emaiLVerificationHTMLFile,
                {
                  userName: capitalizeFirst(newUserMysql.name),
                  verifyEmailLink: `${appUrl}/user/email/verify?email=${email}&token=${newUserMysql.token}`
                },
                (err2, htmlString) => {
                  emailService({
                    toAddress: newUserMysql.email,
                    emailHtmlData: htmlString,
                    emailTextData: htmlString,
                    emailSubject: 'Newfields - Email Verification',
                  });
                }
              );
            }
            return done(null, newUserMysql);
          });
      });
    })
  );

  passport.use(
    'local-login',
    new LocalStrategy({
      // by default, local strategy uses username and password, we will override with email
      usernameField: 'email',
      passwordField: 'password',
      passReqToCallback: true // allows us to pass back the entire request to the callback
    },
    (req, email, password, done) => { // callback with email and password from our form
      const isAdmin = req.body.isAdmin ? 1 : 0;
      const adminSessionToken = req.body.session_token ? req.body.session_token : null;
      sqlConn.query('SELECT * FROM users WHERE email = ? and admin = ?', [email, isAdmin], (err, rows) => {
        if (err) {
          return done(err);
        }

        if (!rows.length) {
          return done(new Error('userNotFound'), false);
        }

        // if the user is found but the password is wrong
        if (!bcrypt.compareSync(password, rows[0].password)) {
          return done(new Error('wrongPassword'), false);
        }

        if (!rows[0].isVerified && rows[0].agent) {
          return done(new Error('unverifiedAgentAccount'), false);
        }

        if (!rows[0].isVerified) {
          return done(new Error('unverifiedAccount'), false);
        }

        if (rows[0].admin && (adminSessionToken !== null)) {
          if ((rows[0].sessionToken !== adminSessionToken)) {
            return done(new Error('badSessionToken'), false);
          }
        }

        return done(null, rows[0]);
      });
    })
  );
};
