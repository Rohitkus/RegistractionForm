const mongo = require('mongoose')
const userdataScheme= new mongo.Schema(
  {
    Fname:String,
    Lname:String,
    Email:String,
    Password:String,
   
  }
);
module.exports= mongo.model('data',userdataScheme)