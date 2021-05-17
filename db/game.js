const db = require("./connection");

const creategame = (order, current, users_in_game) => {
  return db.one(
    "INSERT INTO game_user (order, current, users_in_game) VALUES ($1, $2, $3) RETURNING order, current, users_in_game",
    [order, current, users_in_game]
  );
};

const findallgames = (_) => {
  return db.any("SELECT * FROM game_users");
};

module.exports = { creategame, findallgames};
