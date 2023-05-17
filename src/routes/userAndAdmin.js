const express=require('express');
const router=express.Router();
var usercontroller=require("../controller/userController");
const adminController=require("../controller/adminController")
const  {authMidle,adminacess}= require('../middleware/auth')
// const {ensureAuthenticated, checkUserNotLogin} = require('../middleware/auth')
// router.get('/',JWTmiddleWare.authMidle,usercontroller.allUser);
// router.post('/login',checkUserNotLogin,usercontroller.login);
router.post('/login',usercontroller.login);
router.post('/signup',usercontroller.usersave);
// router.post('/signup',checkUserNotLogin,usercontroller.usersave);
router.get('/user-auth',authMidle,usercontroller.userAuth)

router.post("/forget-password",usercontroller.forgetPass)
router.get('/test',authMidle,adminacess,function(req,res){
    res.send("test route is running")
})

/**@Admin_Routes  */
router.get('/admin-auth',authMidle,adminacess,adminController.adminAuth)
module.exports=router; 