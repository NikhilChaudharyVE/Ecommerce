const User=require("../models/userModel");
var bcrypt = require("bcryptjs");
var salt = bcrypt.genSaltSync(10);
const JWT=require('jsonwebtoken')
/**@exports Routes */
exports.adminAuth=adminAuth 



/**@admin auth */
async function adminAuth(req,res){
    try {
        console.log("are in protected Route function of admin Controller ")
    res.status(200).send({ok:true}); 
    } catch (error) {
        console.log("error are in admin Auth function : ",error );
        res.status(400).send({ok:false,message:error})
    }
  }