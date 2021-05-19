var express = require("express");
var router = express.Router();
const db = require("../db/connection");
const Users = require("../db").Users;

// test route to make sure that queries to the database were being executed 

router.get("/", (request, response) => {
  db.any("SELECT * FROM users").then(results => response.json(results))
  .catch(error => {
      console.log(error)
      response.json({ error })
  })
});

module.exports = router;
  