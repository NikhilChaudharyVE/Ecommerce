const User = require("../models/userModel");
var bcrypt = require("bcryptjs");
var salt = bcrypt.genSaltSync(10);
const JWT=require('jsonwebtoken');
const response=require('../helper/responceHelper');
let{NOT_FOUND_ERROR_KEY,VALIDATION_ERROR}=require('../helper/responceHelper');
/**@export Routes */
exports.usersave = usersave;
exports.login = login;
exports.userAuth=userAuth;
exports.forgetPass=forgetPass;


/**@forget pass fynction */
async function forgetPass(req,res){
  try {
    console.log("inside the forget pass api ")
    const{email,answer,newPassword}=req.body;
    if(!email){
      response.errorResponse(res,NOT_FOUND_ERROR_KEY,error)
    }
    if(!answer){
      response.errorResponse(res,NOT_FOUND_ERROR_KEY,error)
    }   
      if(!newPassword){
        response.errorResponse(res,NOT_FOUND_ERROR_KEY,error)
      }
      const user=await User.findOne({email:email,answer:answer});
      if(!user){
        return    response.errorResponse(res,NOT_FOUND_ERROR_KEY,error)
      }
      const hased=await bcrypt.hashSync(newPassword, salt);
      await User.findByIdAndUpdate(user._id,{password:hased});
      response.userResponce(res,"password reset succesfully",User);
    } catch (error) {
    console.log("error are in forgot pass api : ",error)
    response.errorResponse(res,REQUEST_VALIDATION_ERROR_KEY,error)
  }
}

/**@procted route function in user auth function */
async function userAuth(req,res){
  try {
    console.log("are in protected Route function")
    response.userResponce(res,"userLogin",{ok:true})
  } catch (error) {
    console.log("error are in userAuth function : ",error);
  }
}


/**@Registration Functionality */
async function usersave(req, res) {
  try {
    
    var { firstName, lastName, phone,address,answer, email, password } = req.body;
    console.log("data are : ",firstName,lastName,phone,answer,password,address,email)

    var checkUser = await User.findOne({ email: email });
    if (!checkUser) {
      var userType = 2;
      var userObj = await new User({ userType: userType });
      userObj.phone = phone;
      userObj.firstName = firstName;
      userObj.lastName = lastName;
      userObj.email = email;
      userObj.answer = answer;
      userObj.address = address;
      userObj.password = bcrypt.hashSync(password, salt);
      await userObj.save();
      response.userResponce(res,"user are registered",userObj)
    } else {
    response.responceFalse(res,"email are already store",checkUser)
    }
  } catch (error) {
    console.log("usercontroller/usersave: error  = ", error);
  }
}

// login Function
async function login(req, res) {
  try {
    var email = req.body.email;
    var password = req.body.password;
    if (!email) {
      response.userResponce(res,"Email not found",email);
    } else {
      var user = await User.findOne({ email: email });
      if (user) {
        var match = await bcrypt.compare(password, user.password);
        if (match) {
          const token=await JWT.sign({_id:user._id},process.env.SECRATE_KEY,{
            expiresIn:"7d",
          })
          var users={user:user,token:token}
          response.userResponce(res,"Successfully login",users)
        } else {
          response.userResponce(res,"Pass not match",user)
        }
      } else {
        response.userResponce(res,"no user found with this mail ",email)
      }
    }
  } catch (error) {
    // response.errorResponse(res,VALIDATION_ERROR_KEY,error)
    console.log("error are in login function : ", error);
  }
}
