var express = require("express");
var router = express.Router();

/* GET users listing. */
router.get("/", function (request, response, next) {
  response.render("login.pug");
});

/*
router.post(
  "/login",
  passport.authenticate("local", {
    successRedirect: "/lobby",
    failureRedirect: "/login",
    failureFlash: true,
  })
);
*/

module.exports = router;
