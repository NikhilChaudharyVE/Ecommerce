var userModel=require('../models/userModel.js');
var JWT=require('jsonwebtoken');
exports.authMidle=authMidle;
exports.adminacess=adminacess;
async function authMidle(req,res,next){
  
    try {
        console.log("in middleware ");
    const decode = JWT.verify(req.headers.authorization,process.env.SECRATE_KEY);
    req.user=decode;
    next();
    } catch (error) {
        console.log("error are in authentication middleware ",error);
    }
}

async function adminacess(req,res,next){
    try {
        console.log("user id are : ",req.user._id)
        const user=await userModel.findById(req.user._id);
        console.log("user.user type ",user.userType);
        if(user.userType !== 1){
            return res.status(401).send({
                success:false,
                message:"Unauthorized User"
            });
        }else{
            console.log("sussces fully login : admin")
            next();
        }
    } catch (error) {
        console.log("error are in edmin page : ",error);
        res.status(401).send({
            success:false,
            error,
            message:"error are in admin middleware "
        })
    }
}

/**@passport method are used for maintain the auth function  */

// const auth = (req,res,next)=>{
//     console.log("inside middleare authentication ")
//     if(req.isAuthenticated()){
      
//             if(req.user.userType == 2){
//                 return next()
         
//         }
//     }
//     res.status(200).json({ message: "not login"});
// }

// const checkUserNotLogin = (req, res, next)=>{
//     console.log("inside middleware authentication");
//     if(req.isAuthenticated()){
        
//             if(req.user.userType == 2){
//                 res.status(200).json({ message: "Invalid User"});
        
//         }
//     }
//     return next()
// }
// module.exports = {
//     ensureAuthenticated:auth,
//     checkUserNotLogin:checkUserNotLogin
// }