var express = require("express");
var router = express.Router();
//user gets logged out 
router.get('/logout', (request, response) => {
    request.logout();
    response.redirect('/');
  });

// user's get in lobbys 
router.get("/lobby", (request, response, next) => {  
    if (request.user){
      response.render('about.pug', { username: request.user.username });  
    }
     {
      redirect('/login');
    }   
  
  });
  module.exports = router;