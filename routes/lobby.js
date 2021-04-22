const express = require("express");
var router = express.Router();
const db = require('../db/connection');

router.get("/", (request, response) => {
    response.render('lobby.pug');
  
});

module.exports = router;