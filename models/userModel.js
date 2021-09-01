const mongoose = require('mongoose');

const schema= new mongoose.Schema(
    {
        name:String,
        phone:{type:String,unique:true},
        password:{type:String},
    }
    );

const UserModel=mongoose.model("User",schema);

module.exports = UserModel;