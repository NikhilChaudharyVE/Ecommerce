const express=require('express');
const router=express.Router();
const  {authMidle,adminacess}= require('../middleware/auth')
const controller=require("../controller/categoryController")
router.post('/create-category',authMidle,adminacess,controller.createCategory);
router.put('/categoryUpdate/:id',authMidle,adminacess,controller.updateCategory);
router.delete('/deleteCategory/:id',authMidle,adminacess,controller.deleteCategory);
router.get('/allcategory',controller.getallCategory)
router.get('/category/:id',controller.getCategory)
module.exports=router; 