import React from "react";
import Layout from "../components/Layout/Layout";
import { BiMailSend, BiPhoneCall, BiSupport } from "react-icons/bi";
const Contact =()=>{
    return (
        <Layout title={"Contact us"}>
        <div className="row contactus ">
          <div className="col-md-6 ">
            <img
              src="/images/contactus.jpeg"
              alt="contactus"
              style={{ width: "100%" }}
            />
          </div>
          <div className="col-md-4">
            <h1 className="bg-dark p-2 text-white text-center">CONTACT US</h1>
            <p className="text-justify mt-2">
              any query and info about prodduct & free to call anytime 
          we re vaialible 24X7.            
            </p>
            <p className="mt-3">
              <BiMailSend /> : www.ecommerce@help.com
            </p>
            <p className="mt-3">
              <BiPhoneCall /> : 012-9999999999
            </p>
            <p className="mt-3">
              <BiSupport /> : 180098563214
            </p>
          </div>
        </div>
      </Layout>
    )
}
export default Contact