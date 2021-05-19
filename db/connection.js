const pgp = require('pg-promise')();
const connection = pgp(process.env.DATABASE_URL)
// heroku ssl bypass
process.env.NODE_TLS_REJECT_UNAUTHORIZED = "0"
module.exports = connection;
// basic connections to the db 
