var express = require("express");
var router = express.Router();
const Pusher = require("pusher");
const moment = require('moment');

const pusher = new Pusher({
  appId: process.env.PUSHER_APP_ID,
  key: process.env.PUSHER_APP_KEY,
  secret: process.env.PUSHER_APP_SECRET,
  cluster: process.env.PUSHER_APP_CLUSTER,
  useTLS: true,
});

//user gets logged out
router.get("/logout", (request, response) => {
  request.logout();
  response.redirect("/");
});

// user's get in lobbys
router.get("/lobby", (request, response, next) => {
  if (request.user) {
    response.render("lobby.pug", { username: request.user.username });
  } else {
    response.redirect("/");
  }

  router.post("/chatMessage", (request, response) => {
    let username = request.user.username;
    let { msg } = request.body;

    pusher.trigger("lobby", "chat-msg", {
      message: msg,
      username: username,
      timestamp: moment().format("h:mm a"),
    });

    response.status(200).json({ msg: "test  pusher" });
  });
});
module.exports = router;
