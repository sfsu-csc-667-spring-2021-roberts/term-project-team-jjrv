const db = require("./connection");
// assigning specific chats between a game 
const ChatbyGameID = (game_id) => {
  return db.any("SELECT * FROM messages WHERE game_id =$1", [game_id]);
};

//message query for the chat system 
const message = (game_id, user_id, content) => {
  return db.one(
    "INSERT INTO messages (game_id, user_id, content) VALUES ($1, $2, $3) RETURNING game_id, user_id, content",
    [game_id, user_id, content]
  );
};

module.exports = { ChatbyGameID, message };
