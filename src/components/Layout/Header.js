import React,{useState,useEffect} from "react";
import{NavLink,Link} from'react-router-dom'
import{GiShop} from 'react-icons/gi'
import {useAuth} from'../../context/auth'
import toast from 'react-hot-toast'
import SearchInput from "../Form/SearchInput";
import { getAllCategoryURL } from "../../config/Api";
// import useCategory from "../../hooks/useCategory";
import{Badge} from "antd";
import { useCart } from "../../context/cart";

const Header = () =>{
  const[auth,setAuth]=useAuth()
 const[cart]=useCart();
  const [category,setCategory]= useState([]);
  const getAllCategory = async()=>{
    try {
      const {data} =await getAllCategoryURL();
      setCategory(data?.data);
    } catch (error) {
      console.log("error are in hader.js",error);
      toast.error("Something Went Wrong ");
    }
  }
  useEffect(()=>{
    getAllCategory();
  },[])
  const  handleLogout =()=>{
    setAuth({
      ...auth,
      user:null,
      token:""
    });
    localStorage.removeItem("auth")
    function toastNotify(){
      toast.success("Logout Succesfully ");
    }
    setTimeout(toastNotify, 150);
  }
  return(
        <>
<nav className="navbar navbar-expand-lg bg-body-tertiary">
  <div className="container-fluid">
    <Link to="/" className="navbar-brand" >
     <GiShop/> E-commerce
    </Link>
    <button
      className="navbar-toggler"
      type="button"
      data-bs-toggle="collapse"
      data-bs-target="#navbarSupportedContent"
      aria-controls="navbarSupportedContent"
      aria-expanded="false"
      aria-label="Toggle navigation"
    >
      <span className="navbar-toggler-icon" />
    </button>
    <div className="collapse navbar-collapse" id="navbarSupportedContent">
      <ul className="navbar-nav ms-auto mb-2 mb-lg-0">
        <SearchInput/>
        <li className="nav-item">
          <NavLink to="/" className="nav-link " aria-current="page">
            Home
          </NavLink>
        </li>
        <li className="nav-item dropdown">
                  <NavLink
                    className="nav-link dropdown-toggle"
                    to={"/Category"}
                    data-bs-toggle="dropdown"
                  >
                    Categories
                  </NavLink>
                  <ul className="dropdown-menu">
                    <li>
                      <NavLink className="dropdown-item" to={"/Category"}>
                        All Categories
                      </NavLink>
                    </li>
                    {category?.map((c) => (
                     <li> 
                         <NavLink 
                           className="dropdown-item" 
                           to={`/Category/${c.slug}`} 
                        > 
                         {c.name} 
                        </NavLink> 
                     </li>
                    ))} 
                  </ul>
              </li>
        {!auth.user ? (<>
          <li className="nav-item">
          <NavLink to="/register" className="nav-link">
            register
          </NavLink>
        </li>
       
        <li className="nav-item">
          <NavLink to="/login" className="nav-link">
            Login
          </NavLink>
        </li></>
        ):(
        <>
          <li className="nav-item dropdown">
                    <NavLink
                      className="nav-link dropdown-toggle"
                      href="#"
                      role="button"
                      data-bs-toggle="dropdown"
                      style={{ border: "none" ,backgroundColor:"white"}}
                    >
                      {auth?.user?.firstName}
                    </NavLink>
                    <ul className="dropdown-menu">
                      <li>
                        <NavLink 
                        // to='/dashboard'
                          to={`/dashboard/${
                            auth?.user?.userType == 1 ? "admin" : "user"
                          }`}
                          className="dropdown-item"
                        >
                          Dashboard
                        </NavLink>
                      </li>
                      <li>
                        <NavLink
                          onClick={handleLogout}
                          to="/login"
                          className="dropdown-item"
                        >
                          Logout
                        </NavLink>
                      </li>
                    </ul>
                  </li>
          
          
          </>)}
       
          <li className="nav-item">
                <NavLink to="/cart" className="nav-link">
                  <Badge count={cart?.length} showZero offset={[10, -5]}>
                    Cart
                  </Badge>
                </NavLink>
              </li>
      </ul>
    
    </div>
  </div>
</nav>

        </>
    )
}
export default Header;