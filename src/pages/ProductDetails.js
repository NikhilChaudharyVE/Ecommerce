import React ,{useEffect,useState}from "react";
import Layout from "../components/Layout/Layout";
import toast from "react-hot-toast";
import axios from "axios"
import { useNavigate, useParams } from "react-router-dom"; 
const ProductDetails=()=>{
    const params=useParams(); 
    const[product,setProduct]=useState({});
    const[cat,setCat]=useState({});
    useEffect(()=>{
        if(params?.slug) getProduct();
    },[params?.slug])
    const getProduct=async()=>{
        try {
            const{data}=await axios.get(`http://localhost:4000/product/product/${params.slug}`)
            setProduct(data?.data);
            setCat(data.data.category)
            toast.success("success data ")
        } catch (error) {
           toast.error("something WRONG in this Page ")
            console.log("error are ingetProduct function :",error)
        }
    }
    return(
        <Layout title={"Product PAge"}>
            <h2 style={{ backgroundColor: 'blue', color: 'yellow', textAlign:'center' }}>Prduct Details page </h2>
        {JSON.stringify(product,null,4)}
        <div className="row container mt-2">
            <div className="col-md-6">
                <img
                     src={`http://localhost:4000/product/productphoto/${product._id}`}
                      alt="product_photo"
                      className="img img-responsive"
                    /></div>
            <div className="col-md-6">
                <h1 className="center">NaMe: {product.name}</h1>
                <h5>Price : {product.price}</h5>

                <h5>  {product.shipping?"Shiping :Yes":""}</h5>
                <h5>desciption : {product.desciption}</h5>
                {/* <h5>category : {product.category.name}</h5> */}
                <h5>category : {cat.name}</h5>
                <button className="btn btn-secondary ms-1">add cart</button>
            </div>
        </div>
        {/* <div className="row container mt-2">
            <div className="col-md-12">
            <h3 style={{ backgroundColor: 'yellow', color: 'Blue', textAlign:'center' }}>Similar Products </h3>
            </div>
        </div> */}
        </Layout>)
}
export default ProductDetails