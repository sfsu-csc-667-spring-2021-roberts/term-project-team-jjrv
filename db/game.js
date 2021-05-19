const db = require("./connection");

// basic query for creating a game 
const creategame = (order, current, users_in_game) => {
  return db.one(
    "INSERT INTO game_user (order, current, users_in_game) VALUES ($1, $2, $3) RETURNING order, current, users_in_game",
    [order, current, users_in_game]
  );
};
// find all games that are currently stored in the database 
const findallgames = (_) => {
  return db.any("SELECT * FROM game_users");
};

module.exports = { creategame, findallgames};
