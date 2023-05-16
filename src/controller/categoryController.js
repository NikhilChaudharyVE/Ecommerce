const category=require("../models/categoryModel");
// const {slugify} from 'slugify';
const slugify = require('slugify');

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
        res.status(200).send({
            success:true,
            categories,
            message:"find category by id "
        })
    } catch (error) {
        console.log("error are in get all  category function : ",error)
        res.status(400).send({
            success:false,error,
            message:"Error are in category function "
        })
    }
}
/**@getallCategory function*/
async  function getallCategory(req,res){
    try {
        var categories=await category.find({});
        res.status(200).send({
            success:true,
            categories,
            message:"all categires are find"
        })
    } catch (error) {
        console.log("error are in get all  category function : ",error)
        res.status(400).send({
            success:false,error,
            message:"Error are in category function "
        })
    }
}
/**@delete_category function*/
async function  deleteCategory(req,res){
    try {
        var {id}=req.params
        var deletecategory=await category.findByIdAndDelete(id);
        res.status(200).send({
            success:true,
            deletecategory,success:"sucessfully deleted"
        })
    } catch (error) {
        console.log("error are in delete category function : ",error)
        res.status(400).send({
            success:false,error,
            message:"Error are in category function "
        })
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
        res.status(200).send({
            success:true,updatedCategory,
            message:"updated category  "
        })
    } catch (error) {
        console.log("error are in update category function : ",error)
        res.status(400).send({
            success:false,error,
            message:"Error are in category function "
        })
    }
}
/**@create category function*/
async function createCategory(req,res){
    try {
        var {name}=req.body
        console.log("req send name are : ",name)
        var slugname=slugify(name)
        if(!name){
           return res.status(400).send({
                success:false,
                message:"plz provide name"
            })
        }
        else{
            const checkname=await category.findOne({slug:slugname});
            if(checkname){
                return res.status(400).send({
                    success:false,
                    message:"this category name is already exsists"
                })
            }else{
                var obj={
                    name,slug:slugname
                }
                const createdCategory=await new category(obj).save();
                return res.status(200).send({
                    success:true,
                    message:"category are created",
                    createdCategory
                })
            }
        }

    } catch (error) {
        console.log("error are in categoryController function : ",error);
        res.status(400).send({
            success:false,error,
            message:"Error are in category function "
        })
    }
}