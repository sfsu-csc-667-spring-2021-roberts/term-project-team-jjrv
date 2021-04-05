import db from '../db/connection'

class ActiveRecord{


}

 class user extends ActiveRecord{
     static all(){
         return db.any("SELECT * FROM user");
     }
    static find(id){
         return db.oneOrNone('SELECT * FROM user where id=$1', [id]);
     }
     static create(fields){
         return db.none('INSERT INTO user')
     }
}
