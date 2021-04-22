var express = require("express");
var router = express.Router();
const passport = require('../auth/auth');

/* GET users listing. */
router.get("/", function (request, response, next) {
  response.render("login.pug");
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
