import React, { useState } from "react";
import { Link, useNavigate, useLocation } from "react-router-dom";
import { toast } from "react-toastify";

import { logIn } from "../../services/userService";

import Layout from "../Layout";

import "react-toastify/dist/ReactToastify.css";

export default function Login() {
  const [credentials, setCredentials] = useState({ email: "", password: "" });

  let navigate = useNavigate();
  const location = useLocation();
  const redirectpath = location.state?.path || "/";

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await logIn(credentials);
      // console.log(response.data);
      if (response.data.success) {
        localStorage.setItem("userEmail", credentials.email);
        localStorage.setItem("authToken", response.authToken);
        navigate(redirectpath, { replace: true });
        toast.success("Logged in successfully", {
          position: "top-right",
          pauseOnHover: false,
        });
      } else {
        alert("Enter Valid Credentials");
      }
    } catch (error) {
      alert("Enter Valid Credentials");
      console.error("Error:", error);
    }
  };

  const onChange = (e) => {
    setCredentials({ ...credentials, [e.target.name]: e.target.value });
  };
  return (
    <>
      <Layout>
        <div className="container-login">
          <form className="login-form" onSubmit={handleSubmit}>
            <div className="tag-name">Login</div>
            <div className="line"></div>
            <div className="email">
              <label className="form-label">Email address:</label>
              <input
                type="email"
                className="inputField"
                name="email"
                placeholder="Enter your mail ID"
                value={credentials.email}
                onChange={onChange}
                required
              />
            </div>

            <div className="password">
              <label className="form-label">Password:</label>
              <input
                type="password"
                className="inputField"
                name="password"
                placeholder="Enter your Password"
                value={credentials.password}
                onChange={onChange}
                required
              />
            </div>
            <div className="submit">
              <div>
                <button type="submit" className="submitButton">
                  Login
                </button>
              </div>
              <div className="redirect">
                <p>New to goEat?</p>
                <Link to="/signin" className="already-user">
                  Create Account
                </Link>
              </div>
            </div>
          </form>
        </div>
      </Layout>
    </>
  );
}
