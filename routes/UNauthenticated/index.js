var express = require('express');
var router = express.Router();
const Chat = require('../../db').Chat;
/* GET home page. */
router.get('/', function(request, response, next) {
  response.render('index.pug');
});
router.get("/HowToPlay",function(request, response, next){
  response.render('HowToPlay.pug');
});
router.get("/about", function (request, response, next){
  response.render('about.pug');
});
module.exports = router;
