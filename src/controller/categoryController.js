const category=require("../models/categoryModel");
// const {slugify} from 'slugify';
const slugify = require('slugify');
var response=require("../helper/responceHelper")

/**@export functions */
exports.createCategory=createCategory
exports.updateCategory=updateCategory
exports.deleteCategory=deleteCategory
exports.getallCategory=getallCategory
exports.getCategory=getCategory

/**@getCategory function*/
async  function getCategory(req,res){
    try {
        var {id}=req.params
        var categories=await category.findById(id);
       
        response.successResponse(res, categories);
    } catch (error) {
        console.log("error are in get all  category function : ",error)
        response.errorResponse(res,NOT_FOUND_ERROR_KEY,error)
    }
}
/**@getallCategory function*/
async  function getallCategory(req,res){
    try {
        var categories=await category.find({});
        response.successResponse(res, categories);
    } catch (error) {
        console.log("error are in get all  category function : ",error)
        response.errorResponse(res,NOT_FOUND_ERROR_KEY,error)
    }
}
/**@delete_category function*/
async function  deleteCategory(req,res){
    try {
        var {id}=req.params
        var deletecategory=await category.findByIdAndDelete(id);
        response.successResponse(res, deletecategory);
    } catch (error) {
        console.log("error are in delete category function : ",error)
        response.errorResponse(res,NOT_FOUND_ERROR_KEY,error)
    }
}
/**@update category function*/
async function updateCategory(req,res){
    try {
        console.log("inside the updateCategory function ")
        var {name}=req.body
        var {id}=req.params
        console.log('object are : ',name,id)
        var slugname=slugify(name);
        var obj={
            name,slug:slugname,updatedAt:Date.now()
        }
       
        var updatedCategory = await category.findByIdAndUpdate(id,obj,{new:true}); // this new true key word is used to updated in frontend
        response.successResponse(res, updatedCategory);
    } catch (error) {
        console.log("error are in update category function : ",error)
        response.errorResponse(res,NOT_FOUND_ERROR_KEY,error)
    }
}
/**@create category function*/
async function createCategory(req,res){
    try {
        var {name}=req.body
        console.log("req send name are : ",name)
        var slugname=slugify(name)
        if(!name){
           return response.errorResponse(res,NOT_FOUND_ERROR_KEY,error)
        }
        else{
            const checkname=await category.findOne({slug:slugname});
            if(checkname){
                return  response.errorResponse(res,NOT_FOUND_ERROR_KEY,error)
            }else{
                var obj={
                    name,slug:slugname
                }
                const createdCategory=await new category(obj).save();
                response.successResponse(res, createdCategory);
            }
        }

    } catch (error) {
        console.log("error are in categoryController function : ",error);
        response.errorResponse(res,NOT_FOUND_ERROR_KEY,error)
    }
}