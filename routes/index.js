var express = require('express');
var router = express.Router();

/* GET home page. */
router.get('/', function(req, res, next) {
  res.render('index.pug');
});
router.get("/HowToPlay",function(req, res, next){
  res.render('HowToPlay.pug');
});
router.get("/about", function (req, res, next){
  res.render('about.pug');
});
module.exports = router;
