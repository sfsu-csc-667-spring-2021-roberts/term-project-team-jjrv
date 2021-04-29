var express = require("express");
var router = express.Router();
const passport = require('../auth/auth');
const Users = require('../db').Users;

/* GET users listing. */
router.get("/", function (request, response, next) {
  response.render("login.pug");
  Users.create('bob98', 'bob', 'bob', '123456789');

});


router.post(
  "/",
  passport.authenticate("local", {
    successRedirect: "/lobby",
    failureRedirect: "/login",
    failureFlash: true,
  })
);  



module.exports = router;
