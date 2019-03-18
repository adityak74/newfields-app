import { Strategy as LocalStrategy } from 'passport-local';
import bcrypt from 'bcrypt-nodejs';
import md5 from 'md5';
import { renderFile as ejsRenderFile } from 'ejs';
import path from 'path';
import capitalizeFirst from '../util/capitalizeFirst';

const emaiLVerificationHTMLFile = path.join(
  __dirname,
  '..',
  '..',
  'views',
  'pages',
  'emailVerify.ejs',
);

export default (appConfig, emailService, passport, sqlConn) => {

  const appPort = appConfig.get('port');
  const appLocation = appConfig.get('location');
  const appUrl = `${appLocation}:${appPort}`;

  passport.serializeUser((user, done) => {
    done(null, user.id);
  });

  passport.deserializeUser((id, done) => {
    sqlConn.query("SELECT * FROM users WHERE id = ? ", [id], (err, rows) => {
      done(err, rows[0]);
    });
  });

  passport.use(
    'local-signup',
    new LocalStrategy({
        // by default, local strategy uses username and password, we will override with email
        usernameField : 'email',
        passwordField : 'password',
        passReqToCallback : true // allows us to pass back the entire request to the callback
    },
    function(req, email, password, done) {
      const name = req.body.name;
        // find a user whose email is the same as the forms email
        // we are checking to see if the user trying to login already exists
        sqlConn.query("SELECT * FROM users WHERE email = ?", [email], (err, rows) => {
            if (err)
                return done(err);
            if (rows.length) {
                return done(new Error("duplicateUser"), false);
            } else {
                // if there is no user with that username
                // create the user
                var newUserMysql = {
                  name: name,
                  email: email,
                  password: bcrypt.hashSync(password, null, null),
                  token: md5(`${appConfig.get('secret')}-${email}`),
                };

                var insertQuery = "INSERT INTO users ( name, email, password, token ) values (?, ?, ?, ?)";

                sqlConn.query(insertQuery, 
                  [ newUserMysql.name, 
                    newUserMysql.email, 
                    newUserMysql.password,
                    newUserMysql.token
                  ], function(err, rows) {
                    newUserMysql.id = rows.insertId;
                    ejsRenderFile(
                      emaiLVerificationHTMLFile,
                      {
                        userName: capitalizeFirst(newUserMysql.name),
                        verifyEmailLink: `${appUrl}/user/email/verify?email=${email}&token=${newUserMysql.token}`
                      },
                      (err, htmlString) => {
                        emailService({
                          toAddress: newUserMysql.email,
                          emailHtmlData: htmlString,
                          emailTextData: htmlString,
                          emailSubject: "Newfields - Email Verification",
                        });
                    });
                    return done(null, newUserMysql);
                });
            }
        });
    })
  );

  passport.use(
    'local-login',
    new LocalStrategy({
        // by default, local strategy uses username and password, we will override with email
        usernameField : 'email',
        passwordField : 'password',
        passReqToCallback : true // allows us to pass back the entire request to the callback
    },
    function(req, email, password, done) { // callback with email and password from our form
      sqlConn.query("SELECT * FROM users WHERE email = ?", [email], (err, rows) => {
            if (err)
              return done(err);
            if (!rows.length) {
              return done(new Error("userNotFound"), false); // req.flash is the way to set flashdata using connect-flash
            }

            // if the user is found but the password is wrong
            if (!bcrypt.compareSync(password, rows[0].password))
              return done(new Error("wrongPassword"), false); // create the loginMessage and save it to session as flashdata
            
            if (!rows[0].isVerified)
              return done(new Error("unverifiedAccount"), false); // create the loginMessage and save it to session as flashdata
            // all is well, return successful user
            return done(null, rows[0]);
        });
    })
  );

};
