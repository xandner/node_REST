const mongoose = require('mongoose');

const schema= new mongoose.Schema(
    {
        name:String,
        phone:{type:String,unique:true},
        password:{type:String},
        role:{type:String,required:true,default:'user'},
        active:{type:Boolean,default:false}
    }
    );

const UserModel=mongoose.model("User",schema);

module.exports = UserModel;