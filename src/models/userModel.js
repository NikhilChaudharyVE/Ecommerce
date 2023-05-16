const mongoose=require("mongoose");
const connection=require('../../config/connection');
var jwt=require('jsonwebtoken');
const bcrypt = require('bcryptjs');
const userSchema = new mongoose.Schema({
    firstName:{
  type:String
    },
    lastName:{
        type:String
    },
    phone:{
        type:Number
    },email:{
        type:String
    },registerAt:{
        type:Date,default:Date.now()
    },
    password:{
        type:String
    },
    userType:{
        type:Number
    },address:{
        type:String
    },answer:{
        type:String
    }
})
userSchema.methods.getJWTToken = function () {
    return jwt.sign({ id: this._id }, process.env.JWT_SECRET);
  };
const user = new mongoose.model('user',userSchema)
module.exports = user;