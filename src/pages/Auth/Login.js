import React, { useState } from "react";
import Layout from "./../../components/Layout/Layout";
import { useNavigate, useLocation } from "react-router-dom";
import toast from "react-hot-toast";
import { loginApi } from "../../config/UserApi";
import "../../styles/AuthStyles.css";
import { useAuth } from "../../context/auth";
const Login = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [auth, setAuth] = useAuth();

  const navigate = useNavigate();
  const location = useLocation();

  // form function
  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const {data} = await loginApi(
        email,
        password,
      );
      console.log("here ",data)
      if (data && data.success) {
        console.log("re",data.data.user,"resp",data.message)
        toast.success(data.message);
        setAuth({
          ...auth,
          user: data.data.user,
          token: data.data.token,
        });
        localStorage.setItem("auth", data.data.user);
        navigate(location.state || "/");
      } else {
        toast.error("Something Wrong");
      }
    } catch (error) {
      toast.error("Something Wrong");
      console.log("error are",error)
    }
  };
  return (
    <Layout title="Register - Ecommer App">
      <div className="form-container " style={{ minHeight: "90vh" }}>
        <form onSubmit={handleSubmit}>
          <h4 className="title">LOGIN FORM</h4>

          <div className="mb-3">
            <input
              type="email"
              autoFocus
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="form-control"
              id="exampleInputEmail1"
              placeholder="Enter Your Email "
              required
            />
          </div>
          <div className="mb-3">
            <input
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="form-control"
              id="exampleInputPassword1"
              placeholder="Enter Your Password"
              required
            />
          </div>
          <div className="mb-3">
            <button
              type="button"
              className="btn forgot-btn"
              onClick={() => {
                navigate("/forgot-password");
              }}
            >
              Forgot Password
            </button>
          </div>

          <button type="submit" className="btn btn-primary">
            LOGIN
          </button>
        </form>
      </div>
    </Layout>
  );
};

export default Login;