const express=require("express");
const app=express();
const dotenv = require('dotenv')
const passport = require('passport');
const session = require('express-session')
const cors = require('cors');
// const LocalStrategy = require('passport-local').Strategy;
const connectDB=require("../config/connection");
const userRoutes=require('./routes/routes');
// const adminRoutes=require('./routes/adminRoutes');
// const category=require("./routes/categoryRoutes");
// const product=require("./routes/productRoutes");
const fileupload=require('express-fileupload');

require('../config/passport')(passport)
//load env variables
dotenv.config({ path: './config/config.env' })
connectDB();
app.use(express.json());
app.use(express.urlencoded({ extended: true }))
app.use(cors());

//Express Session
app.use(session({
    secret:'secret',
    resave:false,
    saveUninitialized:false
}))

//Passport Middleware
app.use(passport.initialize())
app.use(passport.session())
// routes 
app.use("/",userRoutes);
// app.use("/category",category)
// app.use("/product",product)
// app.use("/admin",adminRoutes)
app.use(fileupload());
const port=process.env.PORT
app.listen(port,()=>{
    console.log(`app is listen at http://localhost:${port}`)
})