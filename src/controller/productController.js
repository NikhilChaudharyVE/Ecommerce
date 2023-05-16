const product = require("../models/productModel");
const slugify = require("slugify");
const fs = require("fs");
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

/**@searchProduct this function is help for search product by search name and description also .*/
async function searchProduct(req,res){
  try {
    const{keyword}=req.params;
    // const result=await product.find({
    //   $or:[
    //     {name:{$regex:keyword,$options:"i"}},
    //     {desciption:{$regex:keyword,$options:"i"}},
    //     {"category.name":{$regex:keyword,$options:"i"}}
    //   ]
    // }).select("-photo").populate('category', 'name');
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
          photo: 0 // Exclude the 'photo' field from the result
        }
      }
    ]);
res.json(result);
  } catch (error) {
    console.log("error are in ",error);
    res.status(400).send({
      success: false,
      message: "error in per page ctrl",
      error,
    });
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
    res.status(200).send({
      success: true,
      products,
    });
  } catch (error) {
    console.log(error);
    res.status(400).send({
      success: false,
      message: "error in per page ctrl",
      error,
    });
  }
}
/**@productCountController this function help for count the products in data base */
async function productCountController(req,res){
  try {
    const total = await product.find({}).estimatedDocumentCount();
    res.status(200).send({
      success: true,
      total,
    });
  } catch (error) {
    console.log(error);
    res.status(400).send({
      message: "Error in product count",
      error,
      success: false,
    });
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
    res.status(200).send({
      success: true,
      products,
    });
  } catch (error) {
    console.log(error);
    res.status(400).send({
      success: false,
      message: "Error WHile Filtering Products",
      error,
    });
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
        return res
          .status(400)
          .send({ success: false, message: "name is required" });
      case !slug:
        return res
          .status(400)
          .send({ success: false, message: "slug name is require " });
      case !desciption:
        return res
          .status(400)
          .send({ success: false, message: "description name is require " });
      case !price:
        return res
          .status(400)
          .send({ success: false, message: "price name is require " });
      case !category:
        return res
          .status(400)
          .send({ success: false, message: "category name is require " });
      case !quantity:
        return res
          .status(400)
          .send({ success: false, message: "quantity name is require " });
      case photo && photo.size > 1000000:
        return res
          .status(400)
          .send({ success: false, message: "photo required with credential" });
    }
    var obj = { ...req.fields, slug: slug };
    const products = await product.findByIdAndUpdate(req.params.id, obj, {
      new: true,
    });
    if (photo) {
      products.photo.data = fs.readFileSync(photo.path);
      products.photo.contentType = photo.type;
    }
    res
      .status(200)
      .send({ success: true, message: "Succesfuuly Updated", products });
  } catch (error) {
    console.log("error are in update  function : ", error);
    res.status(400).send({
      success: false,
      error,
      message: "Error are in update function ",
    });
  }
}
/**@productPhoto this fun is help delete the product in db where poductid pass  as a params*/
async function deleteProduct(req, res) {
  try {
    var { id } = req.params;
    var deletePrdct = await product.findByIdAndDelete(id).select("-photo");
    res.status(200).send({
      success: true,
      deletePrdct,
      success: "sucessfully product deleted",
    });
  } catch (error) {
    console.log("error are in delete deletePrdct function : ", error);
    res.status(400).send({
      success: false,
      error,
      message: "Error are in deletePrdct function ",
    });
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
    res.status(400).send({
      success: false,
      message: "error are in poductphoto function ",
    });
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
    res.status(200).send({
      success: true,
      counTotal: products.length,
      message: "all related product are ",
      products,
    });
  } catch (error) {
    console.log("error are in findProductBySlugName function : ", error);
    res
      .status(500)
      .send({ success: false, message: "error are occur in bckend", error });
  }
}
/**@getAllProduct function get all product from db */
async function getAllProduct(req, res) {
  try {
    const allProducts = await product
      .find({})
      .populate("category")
      .select("-photo")
      .limit(7)
      .sort({ createdAt: -1 });
    res.status(200).send({
      success: true,
      counTotal: allProducts.length,
      message: "all products are ",
      allProducts,
    });
  } catch (error) {
    console.log("error are in controller get all product function ", error);
    res.status(400).send({
      success: false,
      message: "error are in getAllProduct this api  ",
    });
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
        return res
          .status(400)
          .send({ success: false, message: "name is required" });
      case !slug:
        return res
          .status(400)
          .send({ success: false, message: "slug name is require " });
      case !desciption:
        return res
          .status(400)
          .send({ success: false, message: "description name is require " });
      case !price:
        return res
          .status(400)
          .send({ success: false, message: "price name is require " });
      case !category:
        return res
          .status(400)
          .send({ success: false, message: "category name is require " });
      case !quantity:
        return res
          .status(400)
          .send({ success: false, message: "quantity name is require " });
      case photo && photo.size > 1000000:
        return res
          .status(400)
          .send({ success: false, message: "photo required with credential" });
    }
    var obj = { ...req.fields, slug: slug };
    const products = new product(obj);
    if (photo) {
      products.photo.data = fs.readFileSync(photo.path);
      products.photo.contentType = photo.type;
    }
    await products.save();
    res
      .status(200)
      .send({ success: true, message: "Succesfuuly created", products });
  } catch (error) {
    console.log("error are in poductController function : ", error);
    res.status(400).send({
      success: false,
      error,
      message: "Error are in product function ",
    });
  }
}
