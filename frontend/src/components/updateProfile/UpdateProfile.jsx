import React, { useState, useEffect } from "react";

import { userProfileData } from "../../services/userdata";
import { updateProfile } from "../../services/auth";

import Layout from "../Layout";

import "./updateProfile.css";
import { toast } from "react-toastify";

function UpdateProfile() {
  const [formData, setFormData] = useState({
    name: "",
    password: "",
    confirmPassword: "",
    mobile: "",
  });
  const [name, setName] = useState("");
  const [errors, setErrors] = useState({});
  const [criteria, setCriteria] = useState({
    length: false,
    uppercase: false,
    lowercase: false,
    digit: false,
    specialChar: false,
  });
  const [submitted, setSubmitted] = useState(false);

  const loadUserData = async () => {
    try {
      const response = await userProfileData();
      const responseData = response.data;
      setName(responseData.name);
      setFormData((prevFormData) => ({
        ...prevFormData,
        name: responseData.name || "",
        mobile: responseData.mobile || "",
      }));
    } catch (error) {
      console.error("Error fetching user data:", error);
    }
  };

  useEffect(() => {
    loadUserData();
  }, []);

  const checkPasswordCriteria = (password) => {
    const length = password.length >= 8;
    const uppercase = /[A-Z]/.test(password);
    const lowercase = /[a-z]/.test(password);
    const digit = /\d/.test(password);
    const specialChar = /[!@#$%^&*]/.test(password);

    setCriteria({ length, uppercase, lowercase, digit, specialChar });
    return length && uppercase && lowercase && digit && specialChar;
  };

  const isValidMobile = (mobile) => {
    const mobileRegex = /^\d{10}$/;
    return mobileRegex.test(mobile);
  };

  const handleChange = (e) => {
    const newFormData = { ...formData, [e.target.name]: e.target.value };
    setFormData(newFormData);
    if (e.target.name === "password") {
      checkPasswordCriteria(e.target.value);
    }
    if (submitted) {
      validateForm(newFormData);
    }
  };

  const validateForm = (formData) => {
    let valid = true;
    const newErrors = {};
    if (
      (formData.name.trim() === "" || formData.name === name) &&
      formData.password.trim() === "" &&
      formData.mobile.trim() === ""
    ) {
      newErrors.empty = "Nothing to Update!";
    } else {
      if (
        !checkPasswordCriteria(formData.password) &&
        formData.password.trim() !== ""
      ) {
        newErrors.password = "Enter Valid Password";
      }
      if (formData.password !== formData.confirmPassword) {
        newErrors.confirmPassword = "Passwords do not match";
      }
      if (!isValidMobile(formData.mobile)) {
        newErrors.mobile = "Enter Valid Mobile number(10 digits)";
      }
    }

    setErrors(newErrors);
    if (Object.keys(newErrors).length === 0) {
      valid = false;
    }
    return valid;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setSubmitted(true);
    if (!validateForm(formData)) {
      try {
        const response = await updateProfile(formData);
        if (response.status === 200) {
          loadUserData();
        } else if (response.status === 400) {
          toast.error(`No Changes detected!`, {
            position: "top-center",
            pauseOnHover: false,
          });
        }
      } catch (error) {
        console.error("Error:", error);
      }
    }
  };
  const getInitials = (name) => {
    return name
      .split(" ")
      .map((word) => word[0])
      .join("")
      .toUpperCase();
  };

  return (
    <>
      <Layout>
        <div className="profile-form-container">
          <div className="profile-img">
            {name && <div className="initials">{getInitials(name)}</div>}
          </div>
          <h2>Update Profile</h2>
          <form className="profile-form" onSubmit={handleSubmit}>
            <label>Name</label>
            <input
              type="text"
              name="name"
              value={formData.name}
              onChange={handleChange}
            />

            <label>Enter new Password</label>
            <input type="password" name="password" onChange={handleChange} />
            {errors.password && <div className="error">{errors.password}</div>}
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
                  className={criteria.digit ? "criteria-green" : "criteria-red"}
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

            <label>Confirm Password</label>
            <input
              type="password"
              name="confirmPassword"
              onChange={handleChange}
            />
            {errors.confirmPassword && (
              <div className="error">{errors.confirmPassword}</div>
            )}

            <label>Mobile Number</label>
            <input
              type="tel"
              name="mobile"
              value={formData.mobile}
              onChange={handleChange}
            />
            {errors.mobile && <div className="error">{errors.mobile}</div>}

            <button type="submit">Update</button>
            {errors.empty && <div className="error">{errors.empty}</div>}
          </form>
        </div>
      </Layout>
    </>
  );
}

export default UpdateProfile;
