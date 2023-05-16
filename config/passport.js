const LocalStrategy = require('passport-local').Strategy
const mongoose = require('mongoose')
const bcrypt = require('bcryptjs')

//Load User Model
const User = require('../src/models/userModel')

module.exports = function(passport){
    passport.use(new LocalStrategy({usernameField:'email'},(email,password,done)=>{
        User.findOne({email:email})
        .then(user=>{
            if(!user){
                return done(null,false,{message:'Email non esistente'})
            }
            if(user.userType != 1){
                // if(user.is_verified === false){
                    return done(null,false,{message:'Please verify your email'})
                // }
                // if(user.is_active === false){
                //     return done(null,false,{message:"Il tuo account è stato bloccato dall'amministratore"})
                // }
            }
            bcrypt.compare(password,user.password,(err,isMatch)=>{
                if(err) throw err;
                if(isMatch){
                    return done(null,user)
                }else{
                    return done(null,false,{message:'Password not match'})
                }
            })
        })
        .catch(err=>console.log(err))
    })
    );
    passport.serializeUser((user,done)=>{
        done(null,user._id)
    })
    passport.deserializeUser((id,done)=>{
        User.findById(_id,(err,user)=>{
            done(err,user)
        })
    })
}