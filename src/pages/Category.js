import React,{useEffect,useState} from "react";
import Layout from "../components/Layout/Layout";
import { Link } from "react-router-dom";
import {getAllCategoryURL} from"../config/Api";
const Category=()=>{
    //all category function  
    const [categories,setCategories]=useState([]);
    const getAllCategory = async () =>{
        try {
            const{data}=await getAllCategoryURL();
            setCategories(data?.data);
        } catch (error) {
            console.log("error are ",error);
        }
    }
    useEffect(()=>{
        getAllCategory()
    },[])
    useEffect(()=>{
       console.log("categoruy ",categories)
        // getAllCategory()
    },[categories])
 
    return(<Layout title={"All Categeries "}>
  <div className="container" style={{ marginTop: "100px" }}>
        <div className="row container">
          {categories.map((c) => (
            <div className="col-md-4 mt-5 mb-3 gx-3 gy-3" key={c._id}>
              <div className="card">
                    <Link to={`/Category/${c.slug}`} className="btn cat-btn">
                    {c.name}
                    </Link>
              </div>
            </div>
          ))}
        </div>
      </div>
    </Layout>)
}
export default Category;