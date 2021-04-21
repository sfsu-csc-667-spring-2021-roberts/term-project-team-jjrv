var express = require("express");
var router = express.Router();
const db = require("../db/connection");

router.get("/", (request, response) => {
  db.any(`SELECT * FROM users`)
  .then(results => response.json(results));
});

module.exports = router;
