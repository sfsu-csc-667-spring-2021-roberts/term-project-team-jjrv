const db = require('./connection');

const findById = (id) => {
  return db.one('SELECT id, username, firstname, lastname FROM users WHERE id=$1', [id]);
};

const findByusername = (username) => {
  return db.one('SELECT * FROM users WHERE username=$1', [username]);
};

const create = (username, first_name, last_name, password) => {
    return db.one('INSERT INTO users (username, first_name, last_name, password) VALUES ($1, $2, $3, $4) RETURNING user_id, username, first_name, last_name', [
      username,
      first_name,
      last_name,
      password
    ]);
  };


module.exports = { findById, findByusername, create } ;