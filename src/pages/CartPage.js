import Layout from "../components/Layout/Layout";
import React, { useState ,useEffect} from "react";
import DropIn from "braintree-web-drop-in-react";
import { useCart } from "../context/cart";
import { useAuth } from "../context/auth";
import { useNavigate } from "react-router-dom";
import { toast } from "react-hot-toast";
import { getProductPhotoURL,getPaymentToken,handlePaymentRequest} from "../config/Api";
import "../styles/CartStyle.css";

const CartPage = () => {
  const[clientToken,setClientToken]=useState("");
  const [auth, setAuth] = useAuth();
  const [cart, setCart] = useCart();
  const [instance, setInstance] = useState("");
  const [loading, setLoading] = useState(false);

  const navigate = useNavigate();

  //remove item From cart

  const removeCartItem = (pid) => {
    try {
      let myCart = [...cart];
      let index = myCart.findIndex((item) => item._id === pid);
      myCart.splice(index, 1);
      setCart(myCart);
      localStorage.setItem("cart", JSON.stringify(myCart));
    } catch (error) {
      console.log(error);
    }
  };
  // total price function
  const totalPrice = () => {
    try {
      let total = 0;
      cart?.map((item) => {
        total = total + item.price;
      });
      return total.toLocaleString("en-IN", {
  style: "currency",
  currency: "INR",
});
    } catch (error) {
      console.log(error);
    }
  };
// payment gate Way token 
const getToken= async ()=>{
  try {
    const {data}=await getPaymentToken();
// const data = await getPaymentToken();
    console.log("data are here   ",data.responce)
    setClientToken(data.clientToken);
    // console.log("==>>",data)
  } catch (error) {
    console.log("errora rer serhdshgjdhgjhgjdfg  ::::::::   ",error);
    toast.error(" * Something went Wrong * ")
  }
}
useEffect(()=>{
  getToken();
},[auth?.token]);
  //handle payments
  const handlePayment = async () => {
    try {
      setLoading(true);
      const { nonce } = await instance.requestPaymentMethod();
      const { data } = await handlePaymentRequest(
        nonce,
        cart,
      );
      setLoading(false);
      localStorage.removeItem("cart");
      setCart([]);
      navigate("/dashboard/user/orders");
      toast.success("Payment Completed Successfully ");
    } catch (error) {
      console.log(error);
      setLoading(false);
    }
  };
  return (
    <Layout>
      <div className="cart-page">
        <div className="row">
          <div className="col-md-12">
            <h1 className="text-center bg-light p-2 mb-1">
              {!auth?.user
                ? "Hello Guest"
                : `Hello  ${auth?.token && auth?.user?.firstName}`}
              <p className="text-center">
                {cart?.length
                  ? `You Have ${cart.length} items in your cart ${
                      auth?.token ? "" : "please login to checkout !"
                    }`
                  : " Your Cart Is Empty"}
              </p>
            </h1>
          </div>
        </div>
<div className="container">
  <div className="row">
   <div className="col-md-7 p-0 m-0">
   <h2 style={{ color: "skyblue", border: "3px solid black" ,background:"blue",textAlign:"center"}}> Product</h2>
     {cart?.map((p) => (
       <div className="row">
         <div className="col-md-4">
           <img
             src={getProductPhotoURL(p._id)}
             className="card-img-top"
             alt={p.name}
           />
         </div>
         <div
           className="col-md-4 "
           style={{ textAlign: "center", padding: 55 }}
         >
           <h3 style={{ color: "green" }}> Price : {p.price.toLocaleString("en-IN", {
                 style: "currency",
                 currency: "INR",
               })}</h3>
           <h4 style={{ color: "green" }}>{p.name}</h4>
           <p>{p.desciption}</p>
         </div>
         <div className="col-md-4 cart-remove-btn">
           <button
             className="btn btn-danger"
             onClick={() => removeCartItem(p._id)}
           >
             Remove
           </button>
         </div>
       </div>
     ))}
   </div>
   <div className="col-5 cart-summary">
   <h2 style={{ color: "skyblue", border: "3px solid black" ,background:"blue"}}>Cart Summary</h2>
     <p>Total | Checkout | Payment</p>
     <hr />
     <h4>Total : {totalPrice()} </h4>
     {auth?.user?.address?(<>
     <div className="mb-3">
       <h4>Current Address</h4>
       <h5>{auth?.user?.address}</h5>
       <button 
             className="btn btn-outline-warning"
             onClick={() => navigate("/dashboard/user/profile")}
           >
             Update Address
           </button>
     </div>
     </>):(
       <div className="mb-3">
     {auth?.token?(
         <button
         className="btn btn-outline-warning"
         onClick={() => navigate("/dashboard/user/profile")}
       >
             Update Address
       </button>
     ):(<button
       className="btn btn-outline-warning"
       onClick={() =>
         navigate("/login", {
           state: "/cart",
         })
       }
     >
       Need Login For CheckOut
     </button>)}
     </div>)}
     <div className="mt-2">
     
                {!clientToken || !auth?.token || !cart?.length ? (
              

                  "for payment"
                ) : (
                  <>
                    <DropIn
                      options={{
                        authorization: clientToken,
                        paypal: {
                          flow: "vault",
                        },
                      }}
                      onInstance={(instance) => setInstance(instance)}
                    />
             {console.log("code are not inside this ")}
                    <button
                      className="btn btn-primary"
                      onClick={handlePayment}
                      disabled={loading || !instance || !auth?.user?.address}
                    >
                      {loading ? "Processing ...." : "Make Payment"}
                    </button>
                  </>
                 )} 
              </div>
            </div>
          </div>
        </div>
      </div>
    </Layout>
 );
};
export default CartPage;
