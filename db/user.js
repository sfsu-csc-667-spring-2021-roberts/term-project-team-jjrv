const db = require('./connection');
      
const findById = (user_id) => {
  return db.any('SELECT user_id, username, first_name, last_name FROM users WHERE user_id=$1', [user_id]);
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