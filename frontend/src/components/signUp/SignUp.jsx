import React, { useState } from "react";
import { toast } from "react-toastify";
import { Link, useNavigate } from "react-router-dom";

import { signIn } from "../../services/userService";

import Layout from "../Layout";

import "react-toastify/dist/ReactToastify.css";
import "./signUp.css";

export default function SignUp() {
  const [credentials, setCredentials] = useState({
    name: "",
    email: "",
    password: "",
    confirmPassword: "",
    mobile: "",
  });
  const [errors, setErrors] = useState({});
  const [submitted, setSubmitted] = useState(false);
  let navigate = useNavigate();
  const [criteria, setCriteria] = useState({
    length: false,
    uppercase: false,
    lowercase: false,
    digit: false,
    specialChar: false,
  });

  const isValidEmail = (email) => {
    const emailRegex = /^\S+@\S+\.\S+$/;
    return emailRegex.test(email);
  };

  const isValidMobile = (mobile) => {
    const mobileRegex = /^\d{10}$/;
    return mobileRegex.test(mobile);
  };

  const checkPasswordCriteria = (password) => {
    const length = password.length >= 8;
    const uppercase = /[A-Z]/.test(password);
    const lowercase = /[a-z]/.test(password);
    const digit = /\d/.test(password);
    const specialChar = /[!@#$%^&*]/.test(password);

    setCriteria({ length, uppercase, lowercase, digit, specialChar });
    return length && uppercase && lowercase && digit && specialChar;
  };
  const handleSubmit = async (e) => {
    e.preventDefault();
    setSubmitted(true);
    if (validateForm(credentials)) {
      try {
        const response = await signIn(credentials);
        // console.log(response.data);
        if (response.data.success) {
          toast.success("Account created successfully! Please Login", {
            position: "top-right",
            pauseOnHover: false,
          });
          navigate("/login");
        }
      } catch (error) {
        console.error("Error:", error);
      }
    }
  };

  const onChange = (e) => {
    const newCredentials = { ...credentials, [e.target.name]: e.target.value };
    setCredentials(newCredentials);
    if (e.target.name === "password") {
      checkPasswordCriteria(e.target.value);
    }
    if (submitted) {
      validateForm(newCredentials);
    }
  };

  const validateForm = (credentials) => {
    let valid = false;
    const newErrors = {};

    if (credentials.name.trim() === "") {
      newErrors.name = "Name is required";
    }
    if (credentials.email.trim() === "") {
      newErrors.email = "Email is required";
    } else if (!isValidEmail(credentials.email)) {
      newErrors.email = "Invalid Email";
    }
    if (credentials.password.trim() === "") {
      newErrors.password = "Password is required";
    } else if (!checkPasswordCriteria(credentials.password)) {
      newErrors.password = "Enter Valid Password";
    }
    if (credentials.password !== credentials.confirmPassword) {
      newErrors.confirmPassword = "Passwords do not match";
    }
    if (credentials.mobile.trim() === "") {
      newErrors.mobile = "Mobile number is required";
    } else if (!isValidMobile(credentials.mobile)) {
      newErrors.mobile = "Enter Valid Mobile number(10 digits)";
    }
    setErrors(newErrors);
    if (Object.keys(newErrors).length === 0) {
      valid = true;
    }
    return valid;
  };

  return (
    <>
      <Layout>
        <div className="container-signup">
          <form className="signUp-form" onSubmit={handleSubmit}>
            <div className="tag-name">Signup</div>
            <div className="line"></div>
            <div className="name">
              <label className="form-label">Name:</label>
              <input
                type="text"
                className="inputField"
                placeholder="Enter your name"
                name="name"
                value={credentials.name}
                onChange={onChange}
              />
              {errors.name && <div className="error">{errors.name}</div>}
            </div>
            <div className="email">
              <label className="form-label">Email address:</label>
              <span className="required">*</span>
              <input
                type="text"
                className="inputField"
                placeholder="Enter your mail ID"
                name="email"
                value={credentials.email}
                onChange={onChange}
              />
              {errors.email ? <div className="error">{errors.email}</div> : ""}
              <div className="form-text">
                <span>*We'll never share your email with anyone else</span>
              </div>
            </div>
            <div className="password">
              <label className="form-label">Password:</label>
              <span className="required">*</span>
              <input
                type="password"
                className="inputField"
                placeholder="Enter your Password"
                name="password"
                value={credentials.password}
                onChange={onChange}
              />
              {errors.password ? (
                <div className="error">{errors.password}</div>
              ) : (
                ""
              )}
              <div className="password-criteria">
                <ul>
                  <li
                    className={
                      criteria.length ? "criteria-green" : "criteria-red"
                    }
                  >
                    At least 8 characters
                  </li>
                  <li
                    className={
                      criteria.uppercase ? "criteria-green" : "criteria-red"
                    }
                  >
                    At least one uppercase letter
                  </li>
                  <li
                    className={
                      criteria.lowercase ? "criteria-green" : "criteria-red"
                    }
                  >
                    At least one lowercase letter
                  </li>
                  <li
                    className={
                      criteria.digit ? "criteria-green" : "criteria-red"
                    }
                  >
                    At least one digit
                  </li>
                  <li
                    className={
                      criteria.specialChar ? "criteria-green" : "criteria-red"
                    }
                  >
                    At least one special character
                  </li>
                </ul>
              </div>
            </div>
            <div className="confirm-password">
              <label className="form-label">Confirm Password:</label>
              <span className="required">*</span>
              <input
                type="password"
                className="inputField"
                placeholder="Confirm your Password"
                name="confirmPassword"
                value={credentials.confirmPassword}
                onChange={onChange}
              />
              {errors.confirmPassword && (
                <div className="error">{errors.confirmPassword}</div>
              )}
            </div>
            <div className="mobile">
              <label className="form-label">Mobile:</label>
              <span className="required">*</span>
              <input
                type="tel"
                className="inputField"
                placeholder="Enter your Mobile number"
                name="mobile"
                value={credentials.mobile}
                onChange={onChange}
              />
              {errors.mobile && <div className="error">{errors.mobile}</div>}
              <div className="form-text">
                <span>
                  *We'll never share your mobile number with anyone else
                </span>
              </div>
            </div>
            <div className="submit">
              <div>
                <button type="submit" className="submitButton">
                  Create Account
                </button>
              </div>
              <div className="redirect">
                <p>Already an user?</p>
                <Link to="/login" className="already-user">
                  Login
                </Link>
              </div>
            </div>
          </form>
        </div>
      </Layout>
    </>
  );
}
