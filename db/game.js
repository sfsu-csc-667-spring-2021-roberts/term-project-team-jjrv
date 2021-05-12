const db = require("./connection");

const creategame = (order, current, users_in_game) => {
  return db.one(
    "INSERT INTO game_user (order, current, users_in_game) VALUES ($1, $2, $3) RETURNING order, current, users_in_game",
    [order, current, users_in_game]
  );
};

const findallgames = (_) => {
  return db.one("SELECT game_id, users_in_game FROM game_users");
};

module.exports = { creategame, findallgamess`};
