const User = require("../models/userModel");
var bcrypt = require("bcryptjs");
var salt = bcrypt.genSaltSync(10);
const JWT=require('jsonwebtoken')
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
        res.status(400).send({message:'Email is required'})
    }
    if(!answer){
    res.status(400).send({message:'answer is required'});
    }   
      if(!newPassword){
        res.status(400).send({message:"plz enter new password"});
      }
      const user=await User.findOne({email:email,answer:answer});
      if(!user){
        return res.status(400).send({
          success:false,message:'wrong email or answer '
        })
      }
      const hased=await bcrypt.hashSync(newPassword, salt);
      await User.findByIdAndUpdate(user._id,{password:hased});
      res.status(200).send({
        success:true,
        message:"password reset succesfuuly "
      })
    } catch (error) {
    console.log("error are in forgot pass api : ",error)
    res.status(500).send({
      success:false,message:'something wenrt wrong',error
    })
  }
}

/**@procted route function in user auth function */
async function userAuth(req,res){
  try {
    console.log("are in protected Route function")
    res.status(200).send({ok:true}); 
  } catch (error) {
    console.log("error are in userAuth function : ",error);
  }
}


/**@Registration Functionality */
async function usersave(req, res) {
  try {
    
    var { firstName, lastName, phone,address,answer, email, password } = req.body;
    console.log("data are : ",firstName,lastName,phone,answer,password,address)

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
      // res.status(200).json({ message: "user are registered", data:userObj });
      res.status(200).send({success:true, message: "user are registered", userObj });
    } else {
      res
        .status(200)
        .json({ success:false,data: checkUser, message: "Email are already exsit" });
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
      res.status(200).json({ message: "Empty req.body" });
    } else {
      var user = await User.findOne({ email: email });
      if (user) {
        var match = await bcrypt.compare(password, user.password);
        if (match) {
          const token=await JWT.sign({_id:user._id},process.env.SECRATE_KEY,{
            expiresIn:"7d",
          })
          res
            .status(200)
            .send({ success:true,message: "Succesfully login",  user ,token});
        } else {
          res.status(200).json({success:false, message: "passWord never match" });
        }
      } else {
        res.status(200).json({ message: "no user found with this email " });
      }
    }
  } catch (error) {
    res
      .status(301)
      .json({
        message: `error are in login function   : ${error}`,
      });
    console.log("error are in login function : ", error);
  }
}
