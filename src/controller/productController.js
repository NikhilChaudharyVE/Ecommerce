const express=require('express')
const product = require("../models/productModel");
const Order = require("../models/orderModel")
const slugify = require("slugify");
const mongoose = require('mongoose');
var braintree = require("braintree");
const dotenv=require('dotenv')
const fs = require("fs");
const response = require('../helper/responceHelper');
let{NOT_FOUND_ERROR_KEY,VALIDATION_ERROR}=require('../helper/responceHelper');
/**@PAYMENT_GATEWAY  funciton are here  */
dotenv.config({ path: './config/config.env' })
var gateway = new braintree.BraintreeGateway({
  environment: braintree.Environment.Sandbox,
  merchantId: process.env.BRAINTREE_MERCHANT_ID,
  publicKey: process.env.BRAINTREE_PUBLIC_KEY,
  privateKey: process.env.BRAINTREE_PRIVATE_KEY,
});

/**@export functions */
exports.deleteProduct = deleteProduct;
exports.createProduct = createProduct;
exports.getAllProduct = getAllProduct;
exports.findProductBySlugName = findProductBySlugName;
exports.productPhoto = productPhoto;
exports.updateProduct = updateProduct;
exports.productFiltersController=productFiltersController;
exports.productCountController=productCountController;
exports.productListController=productListController;
exports.searchProduct=searchProduct;
exports.similarProduct=similarProduct;
exports.getAllProductBySlug=getAllProductBySlug;
exports.braintreeTokenController=braintreeTokenController;
exports.paymentController=paymentController;
/**@paymentController function for handle the payments  */
async function paymentController(eq,res) {
  try {
    const{cart,nonce}=req.body;
    const total=0;
    cart.map((i)=>{
      total+=i.price;
    });
    let newTransection=gateway.transaction.sale({
amount:total,
paymentMethodNonce:nonce,
options:{
  submitForSettlement:true,
}
    } ,
    function(err,result){
    if(result){
      const order =new Order({
        products:cart,
        payment:result,buyer:req.user._id
      }).save();
      response.successResponse(res,{ok:true})
    }else{
      response.errorResponse(res,"error are in payment ethod of backend",error);
    }
    }
    )
  } catch (error) {
    console.log("error are in payment function : ",error);
    response.errorResponse(res,NOT_FOUND_ERROR_KEY,error);
  }
}

/**@braintreeTokenController this function is hel for managed token for braintree function  */
async  function braintreeTokenController(req,res){
  try {
    gateway.clientToken.generate({},function (err,responce){
      if(err){
      console.log("error inside the create token function :- ",err);
      response.errorResponse(res,NOT_FOUND_ERROR_KEY,err);
    }else{
      console.log("Token are created : ")
      // response.successResponse(res,{ok:true,token:responce.clientToken});
    response.successResponse(res,responce.clientToken);
    }
    })
  } catch (error) {
    console.log("error are in braintree function : ",error );
    response.errorResponse(res,NOT_FOUND_ERROR_KEY,error);
    }
}

/**@getAllProduct this fun is help to get all category  .*/
async function getAllProductBySlug(req, res) {
  try {
    const categorySlug = req.params.slug;
    const products = await product.aggregate([
      {
        $lookup: {
          from: "categories",
          localField: "category",
          foreignField: "_id",
          as: "category",
        },
      },
      {
        $unwind: "$category",
      },
      {
        $match: {
          "category.slug": categorySlug,
        },
      },  {
        $project: {
          _id: 1,
          name: 1,
          price:1,
          category:1,
          shipping:1,
          desciption:1,slug:1
        },
      },
    ]);
    response.successResponse(res, products);
  } catch (error) {
    console.log("Error in getAllProductByCategorySlug", error);
    response.errorResponse(res, NOT_FOUND_ERROR_KEY, error);
  }
}
/**@similarProduct  this function is used for find similar producs of same ctegory .*/
async function similarProduct(req,res,next){
  try {
    var productId=req.params.pid;
    var categoryId=req.params.cid;
    if(productId &&categoryId){
    const validProductId =new mongoose.Types.ObjectId(productId);
    const similarProduct=await product.find({ category: categoryId , _id: { $ne: validProductId } })
    .populate('category')
    .select('-photo')
    .limit(3);
    response.successResponse(res, similarProduct);
    }
    else{
      response.responceFalse(res,"email are already store",categoryId);
    }
  } catch (error) {
    console.log("------------Similar Product ------------- ");
  }
}
/**@searchProduct this function is help for search product by search name and description also .*/
async function searchProduct(req,res){
  try {
    const{keyword}=req.params;
    const result = await product.aggregate([
      {
        $lookup: {
          from: 'categories',
          localField: 'category',
          foreignField: '_id',
          as: 'categoryData'
        }
      },
      {
        $match: {
          $or: [
            { name: { $regex: keyword, $options: 'i' } },
            {desciption:{$regex:keyword,$options:"i"}},
            { 'categoryData.name': { $regex: keyword, $options: 'i' } }
          ]
        }
      },
      {
        $project: {
          photo: 0 // Exclude photo
        }
      }
    ]);
res.json(result);
  } catch (error) {
    console.log("error are in ",error);
    response.errorResponse(res,NOT_FOUND_ERROR_KEY,error)
  }
}
/**@productListController this function help for show the product of a page . */
async function productListController(req,res){
  try {
    const perPage = 4;
    const page = req.params.page ? req.params.page : 1;
    const products = await product
      .find({})
      .select("-photo")
      .skip((page - 1) * perPage)
      .limit(perPage)
      .sort({ createdAt: -1 });
    response.successResponse(res, products);
  } catch (error) {
    console.log(error);
    response.errorResponse(res,DUPLICATE_ERROR_KEY,error)
  }
}
/**@productCountController this function help for count the products in data base */
async function productCountController(req,res){
  try {
    const total = await product.find({}).estimatedDocumentCount();
    response.successResponse(res, total);
  } catch (error) {
    console.log(error);
    response.errorResponse(res,NOT_FOUND_ERROR_KEY,error)
  }
}
/**@productFiltersController this filer help to filter controller with the help of filter functions */
async function productFiltersController  (req, res) {
  try {   
    const { checked, radio } = req.body;
    let args = {};
    if (checked.length > 0) args.category = checked;
    if (radio.length) args.price = { $gte: radio[0], $lte: radio[1] };
    const products = await product.find(args);
    response.successResponse(res,products)
  } catch (error) {
    console.log(error);
    response.errorResponse(res,VALIDATION_ERROR,error)
  }
};
/**@updateProduct this fun is help to update the products the product in db where poductid pass  as a params*/
async function updateProduct(req, res) {
  try {
    const { name, desciption, price, category, quantity,shipping } = req.fields;
    const { photo } = req.files;
    var slug = slugify(name);
    switch (true) {
      case !name:
        return  response.errorResponse(res,NOT_FOUND_ERROR_KEY,error)
      case !slug:
        return  response.errorResponse(res,NOT_FOUND_ERROR_KEY,error)
      case !desciption:
        return  response.errorResponse(res,NOT_FOUND_ERROR_KEY,error)
      case !price:
        return  response.errorResponse(res,NOT_FOUND_ERROR_KEY,error)
      case !category:
        return  response.errorResponse(res,NOT_FOUND_ERROR_KEY,error)
      case !quantity:
        return  response.errorResponse(res,NOT_FOUND_ERROR_KEY,error)
      case photo && photo.size > 1000000:
        return  response.errorResponse(res,NOT_FOUND_ERROR_KEY,error)
    }
    var obj = { ...req.fields, slug: slug };
    const products = await product.findByIdAndUpdate(req.params.id, obj, {
      new: true,
    });
    if (photo) {
      products.photo.data = fs.readFileSync(photo.path);
      products.photo.contentType = photo.type;
    }
      response.successResponse(res,products)
  } catch (error) {
    console.log(" error are in update  function : ", error);
    response.errorResponse(res,NOT_FOUND_ERROR_KEY,error)
  }
}
/**@productPhoto this fun is help delete the product in db where poductid pass  as a params*/
async function deleteProduct(req, res) {
  try {
    var { id } = req.params;
    var deletePrdct = await product.findByIdAndDelete(id).select("-photo");
    response.successResponse(res,deletePrdct)
  } catch (error) {
    console.log("error are in delete deletePrdct function : ", error);
    response.errorResponse(res,NOT_FOUND_ERROR_KEY,error)
  }
}
/**@productPhoto this fun is help for find the product photo where poductid pass  as a params*/
// this function is created sepraely bcz image upload seprately for no pressure in the routes
async function productPhoto(req, res) {
  try {
    var { id } = req.params;
    const productImg = await product.findById(id).select("photo");
    if (productImg.photo.data) {
      res.set("Content-type", productImg.photo.contentType);
      return res.status(200).send(productImg.photo.data);
    }
  } catch (error) {
    console.log("error are in image upload function : ", error);
    response.errorResponse(res,NOT_FOUND_ERROR_KEY,error)
  }
}
/**@findProductBySlugName this fun is help for find the product with slug nam as a params*/
async function findProductBySlugName(req, res, next) {
  try {
    var { slug } = req.params;
    var products = await product
      .findOne({ slug: slug })
      .populate("category")
      .select("-photo");
    response.successResponse(res,products)
  } catch (error) {
    console.log("error are in findProductBySlugName function : ", error);
    response.errorResponse(res,NOT_FOUND_ERROR_KEY,error)
  }
  
}
/**@getAllProduct function get all product from db */
async function getAllProduct(req, res) {
  try {
    const allProducts = await product
      .find({})
      .populate("category")
      .select("-photo")
      .sort({ createdAt: -1 });
    
    response.successResponse(res,allProducts)
  } catch (error) {
    console.log("error are in controller get all product function ", error);
    response.errorResponse(res,NOT_FOUND_ERROR_KEY,error)
  }
}
/**@createProduct function for create product */
async function createProduct(req, res) {
  try {
    const { name, desciption, price, category, quantity, shipping } =
      req.fields;
    const { photo } = req.files;
    var slug = slugify(name);
    switch (true) {
      case !name:
        return response.errorResponse(res,NOT_FOUND_ERROR_KEY,error)
      case !slug:
        return response.errorResponse(res,NOT_FOUND_ERROR_KEY,error)
      case !desciption:
        return response.errorResponse(res,NOT_FOUND_ERROR_KEY,error)
      case !price:
        returnresponse.errorResponse(res,NOT_FOUND_ERROR_KEY,error)
      case !category:
        return response.errorResponse(res,NOT_FOUND_ERROR_KEY,error)
      case !quantity:
        return response.errorResponse(res,NOT_FOUND_ERROR_KEY,error);
      case photo && photo.size > 1000000:
        return response.errorResponse(res,NOT_FOUND_ERROR_KEY,error)
    }
    var obj = { ...req.fields, slug: slug };
    const products = new product(obj);
    if (photo) {
      products.photo.data = fs.readFileSync(photo.path);
      products.photo.contentType = photo.type;
    }
    await products.save();
    response.successResponse(res,products)

  } catch (error) {
    console.log("error are in poductController function : ", error);
    return response.errorResponse(res,NOT_FOUND_ERROR_KEY,error)
  }
}
