var express = require("express");
var router = express.Router();
const bcrypt = require("bcrypt");
const Users = require("../../db").Users;
const passport = require("../../auth/auth");
// messages route 
router.get("/messages", (request, response) => {
  response.render("message.pug");
});
// standard logout route 
router.get("/logout", (request, response) => {
  request.logout();
  response.redirect("/");
});
// making sure that users are logged in before they are required to log back in
// is user already has a session open, then is redirected to a lobby 
router.get("/login", function (request, response, next) {
  if (request.user) {
    response.redirect("/auth/lobby");
  } else {
    response.render("login.pug");
  }
});
// authenticated users get a success redirect to auth/lobby
// those who fail auth, get stuck on login
router.post(
  "/login",
  passport.authenticate("local", {
    successRedirect: "/auth/lobby",
    failureRedirect: "/login",
    failureFlash: true,
  })
);
// standard register page 
router.get("/register", function (request, response, next) {
  response.render("register.pug");
});
// post request for submiting fields to create new usrs 
router.post("/register", (request, response, next) => {
  const { username, first_name, last_name, password, password2 } = request.body;
  const errors = [];
  // we make sure that all fields are filled 
  if (!username || !first_name || !last_name || !password || !password2) {
    errors.push(["Please enter all fields"]);
    // make sure that passwords are atleast 8 digits long 
  } else if (password.length < 8) {
    errors.push(["Password must be at least 8 characters"]);
    // we verify that the password that was typed twice is matching 
  } else if (password !== password2) {
    errors.push(["Passwords do not match"]);
  }
  // if there is errors we send them to the fornt end 
  if (errors.length > 0) {
    response.render("/register", { errors });
  } else {
    // encryption of the password 
    bcrypt.hash(password, 10).then((hashedPassword) =>
    // we use our db query to send a insert to the database creating  a new user 
      Users.create(username, first_name, last_name, hashedPassword)
        .then((_) => {
          response.redirect("/login");
        })
        .catch((_) =>
          response.render("register", {
            errors: ["Invalid check fields again."],
          })
        )
    );
  }
});

module.exports = router;
