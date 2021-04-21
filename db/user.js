const db = require('./connection');

const create = (username, first_name, last_name, password) => {
    return db.one('INSERT INTO users (username, first_name, last_name, password) VALUES ($1, $2, $3, $4) RETURNING user_id, username, first_name, last_name', [
      username,
      first_name,
      last_name,
      password
    ]);
  };


module.exports = { create } ;