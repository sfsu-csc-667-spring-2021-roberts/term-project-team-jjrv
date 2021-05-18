var express = require("express");
var router = express.Router();
const db = require("../db/connection");
const Users = require("../db").Users;

router.get("/", (request, response) => {
  db.any("SELECT * FROM users").then(results => response.json(results))
  .catch(error => {
      console.log(error)
      response.json({ error })
  })
});

module.exports = router;
  