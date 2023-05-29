import axios from "axios";

const apiBaseUrl = process.env.REACT_APP_API_BASE_URL;
const productUrl = process.env.REACT_APP_API_PRODUCT;
// const apiBaseUrl = process.env.REACT_APP_API_BASE_URL || 'http://localhost:4000';

const Api = axios.create({
  baseURL: apiBaseUrl,
});
// this is product image url.
 const getProductPhotoURL = (productId) => {
  return `${productUrl}/productphoto/${productId}`;
};
// this function is help for get all category
const getAllCategoryURL = async () => {
  const allCategory = await axios.get(`${apiBaseUrl}/category/allcategory`);
  return allCategory;
};
// this functio is hep to get all poduct count
export const allProductCount = async () => {
  const allProduct = await axios.get(`${productUrl}/product-count`);
  return allProduct;
};
// get all products functon
 const allProduct = async (page) => {
  const allProduct = await axios.get(
    `${productUrl}/product-list/${page}`
  );
  return allProduct;
};
// rpoduct filer api
export const productFilter = async (checked, radio) => {
  const products = await axios.post(`${productUrl}/product-filters`,{
    checked,
    radio,
  });
  return products;
};
// get data at  particular function
 const getProductData = async (name) => {
  const product = await axios.get(`${productUrl}/product/${name}`);
  return product;
};
// create-category function
const createCategory = async (name) => {
  const category = await axios.post(`${apiBaseUrl}/category/create-category`, {
    name,
  });
  return category;
};
// updated category
const updateCategory = async (id, updatedName) => {
  const updated = await axios.put(
    `${apiBaseUrl}/category/categoryUpdate/${id}`,
    {
      name: updatedName,
    }
  );
  return updated;
};
// deleted category
const deleteCategory = async (id) => {
  const deleted = await axios.delete(
    `${apiBaseUrl}/category/deleteCategory/${id}`
  );
  return deleted;
};
// create product api
const createdProductApi = async (data)=>{
  const product = await axios.post(`${productUrl}/createProduct`,data);
  return product;
}
// const update Product
const updateProduct = async (id,productData)=>{
  const product = await axios.put(`${productUrl}/updateProduct/${id}`,
    productData
  );
return product;
}
// delete product routes
const deleteProduct = async (id) => {
  const product=await axios.delete(`${productUrl}/deleteProduct/${id}`);
  return product
}
// product search api 
const searchProduct = async (value) => {
  const product=await axios.get(`${productUrl}/search/${value}`)
return product;
}
//get all products 
const getallproducts = async () => {
  const product=await axios.get(`${productUrl}/allproduct`)
return product;
}
// get similar Product funcion
const getAllSimilarProduct=async(pid,cid)=>{
  const product=await axios.get(`${productUrl}/similar_product/${pid}/${cid}`)
  return product;
}

// get all product from Category 
const getAllProductByCategory=async(slug)=>{
const product=await axios.get(`${productUrl}/allProuctOfCategory/${slug}`)   
return product;
}
// payment gate way token function
const getPaymentToken=async()=>{
  const { Token} = await axios.get(`${productUrl}/braintree/token`);
  // console.log("payment token are : ", Token )
  return Token;
}
// handle Payment Function
const handlePaymentRequest=async(nonce,cart)=>{
const paymnet= await axios.post(`${productUrl}/braintree/payment`,{nonce,cart})
return paymnet;
}
export { Api,
  handlePaymentRequest,
  getPaymentToken,
  getAllProductByCategory,
  deleteProduct,
  getAllSimilarProduct,
  getallproducts,
  searchProduct,
  getProductPhotoURL,
  updateProduct,
  getProductData,
  createdProductApi,
  allProduct, 
  createCategory,
  getAllCategoryURL, 
  deleteCategory, 
  updateCategory
 };
