const express=require('express');
const router=express.Router();
const  {authMidle,adminacess}= require('../middleware/auth')
const controller=require("../controller/productController")
const formidable=require('express-formidable');

router.post("/createProduct",authMidle,adminacess,formidable(),controller.createProduct)
// get all product functuion
router.get("/allproduct",controller.getAllProduct);
// products find on the basis of slug-name
router.get("/product/:slug",controller.findProductBySlugName);
// product photo get by productid
router.get("/productphoto/:id",controller.productPhoto);
router.delete('/deleteProduct/:id',authMidle,adminacess,controller.deleteProduct);
router.put('/updateProduct/:id',authMidle,adminacess,formidable(),controller.updateProduct);
// productFiltersController helps the filter of product with category and pricess 
router.post("/product-filters", controller.productFiltersController);
//product count
router.get("/product-count", controller.productCountController);
//product per page
router.get("/product-list/:page", controller.productListController);
// search functionality for search products
router.get("/search/:keyword",controller.searchProduct);
// similar products Route 
router.get(`/similar_product/:pid/:cid`,controller.similarProduct);
// router for get all product on ythe basis of ctaegory
router.get(`/allProuctOfCategory/:slug`,controller.getAllProductBySlug);
// payment's Route
// Token 
router.get('/braintree/token',controller.braintreeTokenController)
// Payment 
router.post('/braintree/payment',authMidle,controller.paymentController)
module.exports=router; 