const passport = require('passport');
const LocalStrategy = require('passport-local').Strategy;
const bcrypt = require('bcrypt');
const Users = require('../db').Users;

// authenticaiton files 
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
// serializing user sessions 
passport.serializeUser(( user, done) => {
  return done(null, user.user_id);
});


//deserializing user
passport.deserializeUser((user_id, done) => {
  Users.findById(user_id)
    .then((user) => {
      console.log("deserialized user", user_id);
      return done(null, user[0]);
    })
    .catch((error) => {
      return done(error, null);
    });
});

module.exports = passport;