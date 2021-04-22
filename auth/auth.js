const passport = require('passport');
const LocalStrategy = require('passport-local').Strategy;
const bcrypt = require('bcrypt');
const Users = require('../db').Users;

const authenticateUser = (username, password, done) => {
  console.log('authenticateUser', { username, password, done });

  Users.findByusername(username)
    .then((user) => Promise.all([user, bcrypt.compare(password, user.password)]))
    .then(([user, passwordValid]) => {
      if (passwordValid) {
        return done(null, user);
      } else {
        return done(null, false, { errors: ['The supplied credentials are invalid.'] });
      }
    })
    .catch((error) => {
      console.log('user not found', error);
      return done(null, false, { errors: ['The supplied credentials are invalid.'] });
    });
};

passport.use(new LocalStrategy({ usernameField: 'username' }, authenticateUser));

passport.serializeUser(function(user, done) {
  done(null, user);
});


passport.deserializeUser((id, done) => {
  Users.findById(id)
    .then((user) => {
      console.log(user);
      return user;
    })
    .then((user) => done(null, user));
});

module.exports = passport;