import React from "react";
import {Helmet} from "react-helmet";
import Footer from "./Footer";
import Header from "./Header";
// import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { Toaster } from "react-hot-toast";

const Layout = ({children,title,description,keywords,author}) =>{
// const Layout = (props) =>{
    //when used this type we can add in props.children other wise same as
    return(
        <>
         <Helmet>
                <meta charSet="utf-8" />
                <meta name="description" content={description}/>
                <meta name="keywords" content={keywords}/>
                <meta name="author" content={author}/>
              <title>{title}</title>
            </Helmet>
<Header />

<main style={{minHeight:"70vh"}}>
    
<Toaster/>
{children}</main>
{/* <Sidebar/> */}
        <Footer/>
        </>
    )
};
Layout.defaultProps={
    title:"Ecommerce App",
    description:"mern stack proj",
    keywords:"mern,react,node,mongodb",
    author:"Nikhil"
}
export default Layout;