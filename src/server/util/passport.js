import { Strategy as LocalStrategy } from 'passport-local';
import bcrypt from 'bcrypt-nodejs';

export default (passport, sqlConn) => {
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
        sqlConn.query("SELECT * FROM users WHERE email = ?", [email], function(err, rows) {
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
                  password: bcrypt.hashSync(password, null, null),  // use the generateHash function in our user model
                };

                var insertQuery = "INSERT INTO users ( name, email, password ) values (?, ?, ?)";

                sqlConn.query(insertQuery,[newUserMysql.name, newUserMysql.email, newUserMysql.password],function(err, rows) {
                    newUserMysql.id = rows.insertId;
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
      sqlConn.query("SELECT * FROM users WHERE email = ?", [email], function(err, rows){
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
