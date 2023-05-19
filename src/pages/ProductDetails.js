import React, { useEffect, useState } from "react";
import Layout from "../components/Layout/Layout";
import toast from "react-hot-toast";
import Api, {
  getProductData,
  getProductPhotoURL,
  getAllSimilarProduct,
} from "../config/Api";
import { useParams } from "react-router-dom";
const ProductDetails = () => {
  const params = useParams();
  const [product, setProduct] = useState({});
  const [cat, setCat] = useState({});
  const[category,setCategory]=useState([]);
  useEffect(() => {
    if (params?.slug) {
      getProduct();
    }
  }, [params?.slug]);

  const getProduct = async () => {
    try {
      const { data } = await getProductData(params.slug);
      console.log("data are : ", data);
      setProduct(data?.data);
      setCat(data.data.category);
      toast.success("success data");
    } catch (error) {
      toast.error("something WRONG in this Page ");
      console.log("error are ingetProduct function :", error);
    }
  };

 
  const similarProduct = async () => {
    try {
     
      const { data } = await getAllSimilarProduct(product._id, cat._id);
setCategory(data?.data)
    } catch (error) {
      toast.error("similarProductErr");
      console.log("error are in Similar Product : ", error);
    }
  };
  useEffect(() => {
    similarProduct();
  }, [cat]);

  return (
    <Layout title={"Product PAge"}>
      <h2
        style={{
          backgroundColor: "blue",
          color: "yellow",
          textAlign: "center",
        }}
      >
        Prduct Details page{" "}
      </h2>
      {JSON.stringify(product, null, 4)}
      <div className="row container mt-2">
        <div className="col-md-6">
          {product._id ? (
            <img
              src={getProductPhotoURL(product._id)}
              alt="product_photo"
              className="img img-responsive"
            />
          ) : (
            <p>Waiting</p>
          )}
        </div>
        <div className="col-md-6">
          <h1 className="center">Name: {product.name}</h1>
          <h5>Price : {product.price}</h5>

          <h5> {product.shipping ? "Shiping :Yes" : ""}</h5>
          <h5>desciption : {product.desciption}</h5>
          {/* <h5>category : {product.category.name}</h5> */}
          <h5>category : {cat.name}</h5>
          <button className="btn btn-secondary ms-1">add cart</button>
        </div>
      </div>
      <h3
        style={{
          backgroundColor: "yellow",
          color: "Blue",
          textAlign: "center",
        }}
      >
        Similar Products{" "}
      </h3>
      <div className="row container similar-products">
        <h4>Similar Products ➡️</h4>
        {category.length < 1 && (
          <p className="text-center">No Similar Products found</p>
        )}
        <div className="d-flex flex-wrap">
          {category?.map((p) => (
            <div className="card m-2" key={p._id}>
              <img
                src={getProductPhotoURL(p._id)}
                className="card-img-top"
                alt={p.name}
              />
              <div className="card-body">
                <div className="card-name-price">
                  <h5 className="card-title">{p.name}</h5>
                  <h5 className="card-title card-price">
                    {/* {p.price.toLocaleString("en-US", {
                      style: "currency",
                      currency: "USD",
                    })} */}
                    Amount :{p.price}
                  </h5>
                </div>
                <p className="card-text ">
                  {p.desciption.substring(0, 60)}...
                </p>
                <div className="card-name-price">
                  {/* <button
                    className="btn btn-info ms-1"
                    onClick={() => navigate(`/product/${p.slug}`)}
                  >
                    More Details
                  </button> */}
                  </div>
               </div>
                  </div>
                 ) )}
                  </div>
                  </div>
    </Layout>
  );
};
export default ProductDetails;
