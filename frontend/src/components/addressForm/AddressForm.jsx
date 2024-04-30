import React, { useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { toast } from "react-toastify";

import { updateAddress } from "../../services/address";

function AddressForm() {
  const location = useLocation();
  const navigate = useNavigate();

  const address = location.state ? location.state.address : {};
  const [addressData, setAddressData] = useState(address);
  const [error, setError] = useState({});
  const [submitted, setSubmitted] = useState(false);

  const handleChange = (e) => {
    const newAddress = { ...addressData, [e.target.name]: e.target.value };
    setAddressData(newAddress);
    if (submitted) {
      validate(newAddress);
    }
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
    setError(newError);
    return valid;
  };

  const handleSubmit = async () => {
    setSubmitted(true);
    if (validate(addressData)) {
      try {
        const response = await updateAddress(addressData);
        if (response.status === 200) {
          navigate("/myProfile");
          toast.success(`Address Updated`, {
            position: "top-center",
            pauseOnHover: false,
          });
        }
        // else if (response.status === 400) {
        //   toast.error(`No Changes detected!`, {
        //     position: "top-center",
        //     pauseOnHover: false,
        //   });
        // }
      } catch (error) {
        console.error("Error:", error);
      }
    }
  };

  return (
    <>
      <div className="addressForm-container">
        <h1>Update Address</h1>
        <div className="address-form">
          <input
            type="text"
            value={addressData.address}
            name="address"
            placeholder="Enter address..."
            onChange={handleChange}
          />
          <input
            type="text"
            value={addressData.city}
            name="city"
            placeholder="Enter city..."
            onChange={handleChange}
          />
          <input
            type="text"
            value={addressData.country}
            name="country"
            placeholder="Enter country..."
            onChange={handleChange}
          />
          <input
            type="text"
            value={addressData.pincode}
            name="pincode"
            placeholder="Enter pincode..."
            onChange={handleChange}
          />
          {error && <div className="error">{error.empty}</div>}
          <button className="save-btn" onClick={handleSubmit}>
            Update Address
          </button>
        </div>
      </div>
    </>
  );
}

export default AddressForm;
