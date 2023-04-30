const passport = require('passport');
const LocalStrategy = require('passport-local').Strategy;
const bcrypt = require('./bcrypt');

// KNEX : I removed redundant logic
const knex = require('./../../database');

/** V-SUGGESTION FOR AFTER PRESENTATION & BEFORE SUBMITTING FINAL REPO TO GITHUB FOR INSTRUCTOR GRADING:
 * Update this portion as follows before submitting final repo version for review; would be developer-friendly
 */

module.exports = (app) => {
  passport.use(
    'local-login',
    new LocalStrategy(
      {
        usernameField: 'email',
        passwordField: 'password',
        passReqToCallback: false,
      },
      async (email, password, done) => {
        try {
          let users = await knex('users').where({ email: email });
          // console.log(users);
          if (users.length == 0) {
            return done(null, false, { message: 'Incorrect Credentials.' });
          }
          let user = users[0];
          let result = await bcrypt.checkPassword(password, user.password);
          if (result) {
            return done(null, user);
          } else {
            return done(null, false, { message: 'Incorrect Credentials.' });
          }
        } catch (err) {
          return done(err);
        }
      }
    )
  );

  passport.use(
    'local-signup',
    new LocalStrategy(
      {
        usernameField: 'email',
        passwordField: 'password',
        passReqToCallback: true,
      },
      async (req, email, password, done) => {
        try {
          const { firstname, lastname } = req.body;

          let users = await knex('users').where({ email: email });
          if (users.length > 0) {
            return done(null, false, { message: 'Email Already Taken' });
          }
          let hash = await bcrypt.hashPassword(password);
          const newUser = {
            password: hash,
            firstname: firstname,
            lastname: lastname,
            email: email,
          };
          let userId = await knex('users').insert(newUser).returning('id');
          newUser.id = userId[0];
          done(null, newUser);
        } catch (err) {
          done(err);
        }
      }
    )
  );

  passport.serializeUser((user, done) => {
    done(null, user.id);
  });

  passport.deserializeUser(async (id, done) => {
    let users = await knex('users').where({ id: id });
    if (users.length == 0) {
      return done(new Error(`Wrong User id ${id}`));
    }
    let user = users[0];
    return done(null, user);
  });
};
