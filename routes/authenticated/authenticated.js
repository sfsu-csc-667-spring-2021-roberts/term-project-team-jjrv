var express = require("express");
var router = express.Router();
const Pusher = require("pusher");
const moment = require('moment');
const Games = require('../../db').Games;
// creating a new pusher instance with our info in the .env file
/*const pusher = new Pusher({
  appId: process.env.PUSHER_APP_ID,
  key: process.env.PUSHER_APP_KEY,
  secret: process.env.PUSHER_APP_SECRET,
  cluster: process.env.PUSHER_APP_CLUSTER,
  useTLS: true,
});
*/
// hard coded pusher instance
const pusher = new Pusher({
  appid:"1198321", 
  key: "9b6ab1d354f0296f318e",
  secret: "a6b1eaa315d2ca5c3cad",
  cluster: "us3",
  useTLS: true,
});

//user gets logged out
router.get("/logout", (request, response) => {
  request.logout();
  response.redirect("/");
});

// user's get in lobbys && users are required to be signed in to access this route 
router.get("/lobby", (request, response, next) => {
  if (request.user) {
    response.render("lobby.pug", { username: request.user.username });
  } else {
    response.redirect("/");
  }

  router.post("/chatMessage", (request, response) => {
    if (request.user){

    
    let username = request.user.username;
    let { msg } = request.body;

    pusher.trigger("lobby", "chat-msg", {
      message: msg,
      username: username,
      timestamp: moment().format("h:mm a"),
    });

    response.status(200).json({ msg: "test  pusher" });
  }
  else 
  {
    response.redirect("/");
  }
  });
  
});
module.exports = router;