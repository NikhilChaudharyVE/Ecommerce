const express=require('express');
const router=express.Router();
const categoryRoutes =require('../routes/categoryRoutes');
const productRoutes =require('../routes/productRoutes');
const userRoute=require("../routes/userAndAdmin");

router.use("/",userRoute)
router.use("/category",categoryRoutes)
router.use("/product",productRoutes)


module.exports=router; 