import React,{useState,useEffect} from "react";
import Layout from "../../components/Layout/Layout";
import AdminMenu from "../../components/Layout/AdminMenu";
import toast from "react-hot-toast";
import axios from "axios";
import { useNavigate } from "react-router-dom"; 
import { Select } from "antd";
const { Option } = Select;
const CreateProduct=()=>{
    const navigate = useNavigate();
    const [categories, setCategories] = useState([]);
    const [categori, setCategori] = useState("");       
    const [desciption, setDesciption] = useState("");       
    const [name, setName] = useState("");
    const [category, setCategory] = useState("");
    const [price, setPrice] = useState("");
    const [quantity, setQuantity] = useState("");
    const [shipping, setShipping] = useState("");
    const [photo, setPhoto] = useState("");

    const getAllCategory = async () => {
        try {
          const { data } = await axios.get(
            "http://localhost:4000/category/allcategory"
          );
          if (data?.success) {
            setCategories(data?.data);
          }
        } catch (error) {
          console.log(error);
          toast.error("Something went wrong");
        }
      };
      useEffect(() => {
        getAllCategory();
      }, []);
    
// function for create products

const handleCreate = async (e) => {
    e.preventDefault();
    try {
      const productData = new FormData();
      productData.append("name", name);
      productData.append("desciption", desciption);
      productData.append("price", price);
      productData.append("quantity", quantity);
      productData.append("photo", photo);
      productData.append("category", category);
     productData.append("shipping", shipping);

      const { data } =await axios.post(
        "http://localhost:4000/product/createProduct",
        productData
      );
      if (data?.success) {
        toast.success("new peoduct created ");
        navigate("/dashboard/admin/products");
      } else {
        toast.error("something wrong");
      }
    } catch (error) {
      console.log(error);
      toast.error("something went wrong");
    }
  };

return(
    <Layout title={"Dashboard - Create Product"}>
    <div className="container-fluid m-3 p-3 dashboard">
      <div className="row">
        <div className="col-md-3">
          <AdminMenu />
        </div>
        <div className="col-md-9">
          <h1>Create Product</h1>
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
              {photo && (
                <div className="text-center">
                  <img
                    src={URL.createObjectURL(photo)}
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
              >
                <Option value="0">No</Option>
                <Option value="1">Yes</Option>
              </Select>
            </div>
            <div className="mb-3">
              <button className="btn btn-primary" onClick={handleCreate}>
                CREATE PRODUCT
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  </Layout>
)
}
export default CreateProduct