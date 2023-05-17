import React,{useState,useEffect} from "react";
import Layout from "../../components/Layout/Layout";
import AdminMenu from "../../components/Layout/AdminMenu";
import toast from "react-hot-toast";
import axios from "axios";
import { useNavigate,useParams } from "react-router-dom";
import { Select } from "antd";
const { Option } = Select;
const UpdateProduct=()=>{
 const params=useParams();
    const navigate = useNavigate();
    const [categories, setCategories] = useState([]);
    // const [categori, setCategori] = useState("");       
    const [desciption, setDesciption] = useState("");       
    const [name, setName] = useState("");
    const [category, setCategory] = useState("");
    const [price, setPrice] = useState("");
    const [quantity, setQuantity] = useState("");
    const [shipping, setShipping] = useState("");
    const [photo, setPhoto] = useState("");
    const[id,setId]=useState("");
    // get single product data

    const getAllCategory = async () => {
        try {
          const { data } = await axios.get(
            "http://localhost:4000/category/allcategory"
          );
          if (data?.success) {
            setCategories(data?.categories);
          }
        } catch (error) {
          console.log(error);
          toast.error("Something went wrong");
        }
      };
    const getSingleProduct = async ()=>{
        try {
            const {data}=await axios.get(`http://localhost:4000/product/product/${params.slug}`);
            setName(data.data.name);
            setId(data.data._id);
            setDesciption(data.data.desciption);
            setPrice(data.data.price);
            setQuantity(data.data.quantity);
            setShipping(data.data.shipping);
            setCategory(data.data.category._id);    
        } catch (error) {
            console.log("error are in UpdateProducts Page : ",error);
            toast.error("SOMETHIMG WRONG FOR FETCHING DATA IN BACKEND --");
        }
    }

      useEffect(() => {
          getAllCategory();
        getSingleProduct();
      }, []);
    const handleUpdate = async (e) => {
    e.preventDefault();
    try {
        const productData = new FormData();
        productData.append("name", name);
        productData.append("desciption", desciption);
        productData.append("price", price);
        productData.append("quantity", quantity);
        photo && productData.append("photo", photo);
        productData.append("category", category);
       productData.append("shipping", shipping);
  
        const { data } =await axios.put(
          `http://localhost:4000/product/updateProduct/${id}`,
          productData
        );
        if (data?.success) {
          toast.success(data?.message);
          navigate("/dashboard/admin/products");
        } else {
          toast.error("something wrong");
        }
    } catch (error) {
      console.log(error);
      toast.error("something went wrong");
    }
  };

// for delete product
const handleDelete = async () => {
  try {
    let answer = window.prompt("--->>> Are You Sure want to delete this product ? ");
    if (!answer) return;
    const { data } = await axios.delete(
      `http://localhost:4000/product/deleteProduct/${id}`
    );
    toast.success("Product DEleted Succfully");
    navigate("/dashboard/admin/products");
  } catch (error) {
    console.log(error);
    toast.error("Something went wrong");
  }
};

return(<Layout title={"Dashboard - Create Product"}>
<div className="container-fluid m-3 p-3 dashboard">
  <div className="row">
    <div className="col-md-3">
      <AdminMenu />
    </div>
    <div className="col-md-9">
      <h1>Update Product</h1>
      <div className="m-1 w-75">
        <Select
          bordered={false}
          placeholder="Select a category"
          size="large"
          showSearch
          className="form-select mb-3"
          onChange={(value) => {
            setCategory(value);
          }}
          value={category}
        >
          {categories?.map((c) => (
            <Option key={c._id} value={c._id}>
              {c.name}
            </Option>
          ))}
        </Select>
        <div className="mb-3">
          <label className="btn btn-outline-secondary col-md-12">
            {photo ? photo.name : "Upload Photo"}
            <input
              type="file"
              name="photo"
              accept="image/*"
              onChange={(e) => setPhoto(e.target.files[0])}
              hidden
            />
          </label>
        </div>
        <div className="mb-3">
          {/* {photo && (
            <div className="text-center">
              <img
                src={URL.createObjectURL(photo)}
                alt="product_photo"
                height={"200px"}
                className="img img-responsive"
              />
            </div>
          )}
           */}
          {photo ? (
                  <div className="text-center">
                    <img
                      src={URL.createObjectURL(photo)}
                      alt="product_photo"
                      height={"200px"}
                      className="img img-responsive"
                    />
                  </div>
                ) : (
                  <div className="text-center">
                    <img
                     src={`http://localhost:4000/product/productphoto/${id}`}
                      alt="product_photo"
                      height={"200px"}
                      className="img img-responsive"
                    />
                  </div>
                )}
        </div>
        <div className="mb-3">
          <input
            type="text"
            value={name}
            placeholder="write a name"
            className="form-control"
            onChange={(e) => setName(e.target.value)}
          />
        </div>
        <div className="mb-3">
          <textarea
            type="text"
            value={desciption}
            placeholder="write a description"
            className="form-control"
            onChange={(e) => setDesciption(e.target.value)}
          />
        </div>

        <div className="mb-3">
          <input
            type="number"
            value={price}
            placeholder="write a Price"
            className="form-control"
            onChange={(e) => setPrice(e.target.value)}
          />
        </div>
        <div className="mb-3">
          <input
            type="number"
            value={quantity}
            placeholder="write a quantity"
            className="form-control"
            onChange={(e) => setQuantity(e.target.value)}
          />
        </div>
        <div className="mb-3">
          <Select
            bordered={false}
            placeholder="Select Shipping "
            size="large"
            showSearch
            className="form-select mb-3"
            onChange={(value) => {
              setShipping(value);
            }}
            value={shipping?"yes":"no"}
          >
            <Option value="0">No</Option>
            <Option value="1">Yes</Option>
          </Select>
        </div>
        <div className="mb-3">
          {/* <button className="btn btn-primary" onClick={}> */}
          <button className="btn btn-primary" onClick={handleUpdate} >
            Update PRODUCT
          </button>
        </div>
        <div className="mb-3">
                <button className="btn btn-danger" onClick={handleDelete}>
                  DELETE PRODUCT
                </button>
              </div>
      </div>
    </div>
  </div>
</div>
</Layout>)
}
export default UpdateProduct;