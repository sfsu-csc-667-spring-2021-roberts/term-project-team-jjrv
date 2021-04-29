const db = require('./connection');


const creategame = (game) => {
return db.any("INSERT INTO (game) values $1", [game]);

};

module.exports = { creategame };