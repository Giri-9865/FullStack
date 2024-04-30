import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { CgProfile } from "react-icons/cg";
import { ImHome } from "react-icons/im";
import { RiDeleteBin6Fill } from "react-icons/ri";
import { MdOutlineModeEdit } from "react-icons/md";
import { toast } from "react-toastify";
import { v4 as uuidv4 } from "uuid";

import { addAddress, deleteAddress, myAddresses } from "../../services/address";
import { userProfileData, updateProfile } from "../../services/userService";

import Layout from "../Layout";
import { isValidMobile, checkPasswordCriteria } from "../../utils/validation";

import "./myProfile.css";

const MyProfile = () => {
  const navigate = useNavigate();
  const [userData, setUserData] = useState({});
  const [profileData, setProfileData] = useState({
    name: "",
    mobile: "",
  });
  const [passwordData, setPasswordData] = useState({
    password: "",
    confirmPassword: "",
  });
  const [criteria, setCriteria] = useState({
    length: false,
    uppercase: false,
    lowercase: false,
    digit: false,
    specialChar: false,
  });
  const [selectedItem, setSelectedItem] = useState("address");
  const [addresses, setAddresses] = useState([]);
  const [errors, setErrors] = useState({});
  const [profileErrors, setProfileErrors] = useState({});
  const [passwordErrors, setPasswordErrors] = useState({});
  const [isAddingNew, setIsAddingNew] = useState(false);
  const [isEditing, setIsEditing] = useState(false);
  const [isPassword, setIsPassword] = useState(false);
  const [updated, setUpdated] = useState(false);

  const [newAddress, setNewAddress] = useState({
    id: "",
    address: "",
    city: "",
    country: "",
    pincode: "",
  });

  const fetchUserAddresses = async () => {
    const userEmail = localStorage.getItem("userEmail");
    try {
      if (userEmail) {
        const response = await myAddresses(userEmail);
        const responseData = response.data;
        if (responseData.addressData) {
          setAddresses(responseData.addressData);
        }
      }
    } catch (error) {
      console.error("Error fetching data:", error);
    }
  };

  const fetchUserData = async () => {
    try {
      const response = await userProfileData();
      const responseData = response.data;
      setUserData(responseData);
      setProfileData(responseData);
    } catch (error) {
      console.error("Error fetching user data:", error);
    }
  };

  useEffect(() => {
    fetchUserAddresses();
    fetchUserData();
  }, []);

  const handleDelete = async (address) => {
    const confirmed = window.confirm(
      "Are you sure you want to delete this address?"
    );
    if (confirmed) {
      try {
        const response = await deleteAddress(address.id);
        if (response.status === 200) {
          fetchUserAddresses();
          toast.warn(`Address deleted`, {
            pauseOnHover: false,
          });
        }
      } catch (error) {
        console.error("Error:", error);
      }
    }
  };

  const handleChange = (e) => {
    const address = { ...newAddress, [e.target.name]: e.target.value };
    setNewAddress(address);
    validate(address);
  };

  const handleProfileChange = (e) => {
    const newFormData = { ...profileData, [e.target.name]: e.target.value };
    setProfileData(newFormData);
    if (updated) {
      profileValidate(newFormData);
    }
  };

  const handlePasswordChange = (e) => {
    const newFormData = { ...passwordData, [e.target.name]: e.target.value };
    setPasswordData(newFormData);
    if (e.target.name === "password") {
      const passwordCriteria = checkPasswordCriteria(newFormData.password);
      setCriteria(passwordCriteria.criteria);
    }
    passwordValidate(newFormData);
  };

  const handleAddNewAddress = async () => {
    if (newAddress && validate(newAddress)) {
      const id = uuidv4();
      setAddresses([...addresses, { ...newAddress, id: id }]);
      try {
        const response = await addAddress({ ...newAddress, id: id });
        if (response.status === 200) {
          toast.success(`Address added!`, {
            position: "top-center",
            pauseOnHover: false,
          });
          setNewAddress({ address: "", city: "", country: "", pincode: "" });
        }
      } catch (error) {
        console.error("Error:", error);
      }
    }
  };

  const profileValidate = (formData) => {
    let valid = true;
    const newErrors = {};
    if (
      (formData.name.trim() === "" || formData.name === userData.name) &&
      (formData.mobile.trim() === "" || formData.mobile === userData.mobile)
    ) {
      newErrors.empty = "Nothing to Update!";
    } else if (!isValidMobile(formData.mobile)) {
      newErrors.mobile = "Enter Valid Mobile number(10 digits)";
    }

    setProfileErrors(newErrors);
    if (Object.keys(newErrors).length === 0) {
      valid = false;
    }
    return valid;
  };
  const passwordValidate = (formData) => {
    let valid = true;
    const newErrors = {};
    const passwordCriteria = checkPasswordCriteria(formData.password);
    if (formData.password.trim() === "") {
      newErrors.empty = "Nothing to Update!";
    } else {
      if (!passwordCriteria.validate && formData.password.trim() !== "") {
        newErrors.password = "Enter Valid Password";
      }
      if (formData.password !== formData.confirmPassword) {
        newErrors.confirmPassword = "Passwords do not match";
      }
    }

    setPasswordErrors(newErrors);
    if (Object.keys(newErrors).length === 0) {
      valid = false;
    }
    return valid;
  };

  const validate = (address) => {
    let valid = true;
    const newError = {};
    if (
      address.address.trim() === "" &&
      address.city.trim() === "" &&
      address.country.trim() === "" &&
      address.pincode.trim() === ""
    ) {
      newError.empty = "Please fill the fields";
      valid = false;
    }
    setErrors(newError);
    return valid;
  };

  const handleUpdateProfile = async () => {
    setUpdated(true);
    if (!profileValidate(profileData)) {
      try {
        const response = await updateProfile(profileData);
        if (response.status === 200) {
          fetchUserData();
          toast.success(`Profile Updated!`, {
            pauseOnHover: false,
          });
          setIsEditing(false);
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
  const handleChangePassword = async () => {
    if (!passwordValidate(passwordData)) {
      try {
        const response = await updateProfile(passwordData);
        if (response.status === 200) {
          navigate(0);
          toast.success(`Passsword Updated! please login`, {
            pauseOnHover: false,
          });
          setIsPassword(false);
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

  return (
    <Layout>
      <div className="myProfile-container">
        <div className="sidebar">
          <h1>Hi {userData.name}!</h1>
          <ul>
            <li onClick={() => setSelectedItem("address")}>
              <span className="profile-icon">
                <ImHome />
              </span>
              <div className="list-element">Address</div>
            </li>
            <li onClick={() => setSelectedItem("profile")}>
              <span className="profile-icon">
                <CgProfile />
              </span>
              <div className="list-element">Profile Management</div>
            </li>
          </ul>
        </div>
        <div className="content">
          {selectedItem === "address" && (
            <div>
              <div className="address-field">
                <div className="label">
                  Addresses<div className="decor-line"></div>
                </div>
                <div className="address-data">
                  {addresses.length !== 0 ? (
                    addresses.map((address, index) => (
                      <label className="address-display" key={index}>
                        <div>
                          {`${address.address}, ${address.city}, ${address.country}, ${address.pincode}`}
                        </div>
                        <div className="btn-container">
                          <button
                            className="button edit"
                            onClick={() =>
                              navigate("/editAddress", {
                                state: { address: address },
                              })
                            }
                          >
                            <MdOutlineModeEdit />
                          </button>
                          <button
                            className="button delete"
                            onClick={() => handleDelete(address)}
                          >
                            <RiDeleteBin6Fill />
                          </button>
                        </div>
                      </label>
                    ))
                  ) : (
                    <div className="no-address">Please add an address...</div>
                  )}
                </div>
                <br />
                <button
                  className="addAddress-btn"
                  onClick={() => setIsAddingNew(true)}
                >
                  + Add New Address
                </button>
                {isAddingNew && (
                  <div className="address-form">
                    <input
                      type="text"
                      value={newAddress.address}
                      name="address"
                      onChange={handleChange}
                      placeholder="Enter address..."
                    />
                    <input
                      type="text"
                      value={newAddress.city}
                      name="city"
                      onChange={handleChange}
                      placeholder="Enter city..."
                    />
                    <input
                      type="text"
                      value={newAddress.country}
                      name="country"
                      onChange={handleChange}
                      placeholder="Enter country..."
                    />
                    <input
                      type="text"
                      value={newAddress.pincode}
                      name="pincode"
                      onChange={handleChange}
                      placeholder="Enter pincode..."
                    />
                    {errors && <div className="error">{errors.empty}</div>}
                    <button className="save-btn" onClick={handleAddNewAddress}>
                      Save Address
                    </button>
                  </div>
                )}
              </div>
            </div>
          )}
          {selectedItem === "profile" && (
            <div>
              <div className="profile-field">
                <div>
                  <div className="label">
                    Profile<div className="decor-line"></div>
                  </div>
                </div>
                <div className="profile-data">
                  <h2>{userData.name}</h2>
                  <div className="data">
                    EmailId:
                    <span className="data-value"> {userData.email}</span>
                  </div>
                  <div className="data">
                    Mobile Number:
                    <span className="data-value"> {userData.mobile}</span>
                  </div>
                  <button
                    className="edit-btn"
                    onClick={() => {
                      setIsEditing(true);
                      setIsPassword(false);
                    }}
                  >
                    Edit Profile
                  </button>
                </div>
                <hr />
                <div className="change-password">
                  Want to change your Password?
                  <button
                    className="change-password-btn"
                    onClick={() => {
                      setIsEditing(false);
                      setIsPassword(true);
                    }}
                  >
                    CHANGE PASSWORD
                  </button>
                </div>
                {isEditing && (
                  <div className="editProfile-form">
                    <h1>Edit Profile</h1>
                    <input
                      type="text"
                      value={profileData.name}
                      name="name"
                      onChange={handleProfileChange}
                    />
                    <input
                      type="text"
                      value={profileData.mobile}
                      name="mobile"
                      onChange={handleProfileChange}
                    />
                    {profileErrors && (
                      <div className="error">{profileErrors.mobile}</div>
                    )}
                    <button className="save-btn" onClick={handleUpdateProfile}>
                      Update
                    </button>
                    {profileErrors && (
                      <div className="error">{profileErrors.empty}</div>
                    )}
                  </div>
                )}
                {isPassword && (
                  <div className="editProfile-form">
                    <h1>Change Password</h1>
                    <input
                      type="password"
                      name="password"
                      onChange={handlePasswordChange}
                      placeholder="Enter password"
                    />
                    {passwordErrors && (
                      <div className="error">{passwordErrors.password}</div>
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
                            criteria.uppercase
                              ? "criteria-green"
                              : "criteria-red"
                          }
                        >
                          At least one uppercase letter
                        </li>
                        <li
                          className={
                            criteria.lowercase
                              ? "criteria-green"
                              : "criteria-red"
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
                            criteria.specialChar
                              ? "criteria-green"
                              : "criteria-red"
                          }
                        >
                          At least one special character
                        </li>
                      </ul>
                    </div>
                    <input
                      type="password"
                      name="confirmPassword"
                      onChange={handlePasswordChange}
                      placeholder="Confirm password"
                    />
                    {passwordErrors && (
                      <div className="error">
                        {passwordErrors.confirmPassword}
                      </div>
                    )}
                    <button className="save-btn" onClick={handleChangePassword}>
                      Update
                    </button>
                    {profileErrors && (
                      <div className="error">{profileErrors.empty}</div>
                    )}
                  </div>
                )}
              </div>
            </div>
          )}
        </div>
      </div>
    </Layout>
  );
};

export default MyProfile;
