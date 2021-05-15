var express = require("express");
var router = express.Router();
const bcrypt = require("bcrypt");
const Users = require("../../db").Users;
const passport = require("../../auth/auth");
const app = require("../../app");

router.get("/messages", (request, response) => {
  response.render("message.pug");
});

router.get("/logout", (request, response) => {
  request.logout();
  response.redirect("/");
});
router.get("/login", function (request, response, next) {
  response.render("login.pug");
});

router.post(
  "/login",
  passport.authenticate("local", {
    successRedirect: "/auth/lobby",
    failureRedirect: "/login",
    failureFlash: true,
  })
);

router.get("/register", function (request, response, next) {
  response.render("register.pug");
});

router.post("/register", (request, response, next) => {
  const { username, first_name, last_name, password, password2 } = request.body;
  const errors = [];
  if (!username || !first_name || !last_name || !password || !password2) {
    errors.push(["Please enter all fields"]);
  } else if (password.length < 8) {
    errors.push(["Password must be at least 8 characters"]);
  } else if (password !== password2) {
    errors.push(["Passwords do not match"]);
  }
  if (errors.length > 0) {
    response.render("/register", { errors });
  } else {
    bcrypt.hash(password, 10).then((hashedPassword) =>
      Users.create(username, first_name, last_name, hashedPassword)
        .then((_) => {
          response.redirect("/login");
        })
        .catch((_) =>
          response.render("register", {
            errors: ["Failed to create a new user."],
          })
        )
    );
  }
});



module.exports = router;
