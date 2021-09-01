const mongoose = require('mongoose');

const schema= new mongoose.Schema(
    {name:String}
    );

const CustommerModel=mongoose.model("custommer",schema);

module.exports = CustommerModel;