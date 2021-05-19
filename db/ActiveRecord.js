let db = require('./connection');




// basic activation records for choosing tables and finding fields within tables 
class ActiveRecord {
  table_name = '';
  fields = {};

  static selectAll() {
    return db.any(`SELECT * FROM ${table_name}`);
  }

  static find(id) {
    return db.oneOrNone(`SELECT * FROM ${table_name} WHERE id=$[id]`, {id:0});
  }

}

module.exports = ActiveRecord;