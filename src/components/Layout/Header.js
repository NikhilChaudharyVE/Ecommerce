import React from "react";
import{NavLink,Link} from'react-router-dom'
import{GiShop} from 'react-icons/gi'
import {useAuth} from'../../context/auth'
import toast from 'react-hot-toast'
import SearchInput from "../Form/SearchInput";
const Header = () =>{
  const[auth,setAuth]=useAuth()
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
        <li className="nav-item">
          <NavLink to="/catagory" className="nav-link" >
            Category
          </NavLink>
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
                            auth?.user?.userType === 1 ? "admin" : "user"
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
          <NavLink to="/cart" className="nav-link" href="#">
            CArt (0)
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