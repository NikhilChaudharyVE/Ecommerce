import './App.css';
// import Homepage from './components/homepage/homepage';
// import Login from './components/login/login';
// import Register from './components/register/register';
// import Navbar from './components/navbar'
import Layout from './components/Layout/Layout';
import {
  BrowserRouter as Router,Routes,Switch,Route} from "react-router-dom";
import { useState } from 'react';
import HomePage from './pages/HomePage';
import About from './pages/About';
import PageNotFound from './pages/PageNotFound';
import Contact from './pages/Contact';
import Policy from './pages/Policy';
import Register from './pages/Auth/Register';
import Login from './pages/Auth/Login';
import PrivateRoute from './components/Routes/Private';
import Dashboard from './pages/user/Dashboard';
import ForgotPassword from './pages/Auth/ForgotPassword';
import AdminRoute from './components/Routes/AdminRoutes';
import AdminDashboard from './pages/Admin/AdminDashboard';
import CreateCategory from './pages/Admin/CreateCategory';
import CreateProduct from './pages/Admin/CreateProduct';
import User from './pages/Admin/Users';
import Profile from './pages/user/Profile';
import Orders from './pages/user/Orders';
import Products from './pages/Admin/Products';
import UpdateProduct from './pages/Admin/UpdateProduct';
import Search from './pages/Search';
import ProductDetails from './pages/ProductDetails';

// import { Spinner } from 'react-bootstrap';
// import Spinner from './components/Spinner';
function App() {
  
  return (
   
    <>
<Routes>
  <Route path="/" element={<HomePage/>}/>
  <Route path="/search" element={<Search/>}/>
  <Route path="/product/:slug" element={<ProductDetails/>}/>
  <Route path="/about" element={<About/>}/>
  <Route path="/register" element={<Register/>}/>
  <Route path="/login" element={<Login/>}/>
{/*  protected route  function in dashbaord page */}
  <Route path="/dashboard" element={<PrivateRoute/>}>
  <Route path="user" element={<Dashboard/>}/>
  <Route path="user/orders" element={<Orders/>}/>
  <Route path="user/profile" element={<Profile/>}/>
  </Route>
  <Route path="/dashboard" element={<AdminRoute/>}>
    <Route path="admin" element={<AdminDashboard/>}/>
    <Route path="admin/create-category" element={<CreateCategory/>}/>
    <Route path="admin/create-product" element={<CreateProduct/>}/>
    <Route path="admin/products" element={<Products/>}/>
    <Route path="admin/product/:slug" element={<UpdateProduct/>}/>
    <Route path="admin/users" element={<User/>}/>
  </Route>

{/* forgot password page route  */}
<Route path="/forgot-password" element={<ForgotPassword/>}/>
  <Route path="/policy" element={<Policy/>}/>
  <Route path="/contact" element={<Contact/>}/>
  <Route path="/*" element={<PageNotFound/>}/>
  {/* <Route path="/" element={</>}/> */}
</Routes>
    </>
  );
}
//  <Homepage />
// <Register/> 
export default App;
