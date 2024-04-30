import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { toast } from "react-toastify";
import { v4 as uuidv4 } from "uuid";

import { addAddress, myAddresses } from "../../services/address";
import { orderData } from "../../services/ordersService";

import Layout from "../Layout";
import { drop } from "../../redux/action";

import "./checkout.css";

function Checkout() {
  let dispatch = useDispatch();
  const navigate = useNavigate();

  let data = useSelector((state) => state.data);

  let totalPrice = data.reduce((total, food) => total + Number(food.price), 0);

  const [addresses, setAddresses] = useState([]);
  const [selectedAddress, setSelectedAddress] = useState("");
  const [errors, setError] = useState({});
  const [isAddingNew, setIsAddingNew] = useState(false);
  const [newAddress, setNewAddress] = useState({
    id: "",
    address: "",
    city: "",
    country: "",
    pincode: "",
  });

  const fetchMyAddresses = async () => {
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

  useEffect(() => {
    fetchMyAddresses();
  }, []);

  const handleSelectAddress = (address) => {
    setSelectedAddress(address);
    setIsAddingNew(false);
  };

  const handleChange = (e) => {
    const address = { ...newAddress, [e.target.name]: e.target.value };
    setNewAddress(address);
    validate(address);
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
      setSelectedAddress(newAddress);
      setIsAddingNew(false);
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
    try {
      if (selectedAddress !== "") {
        const response = await orderData(data, totalPrice, selectedAddress);
        if (response.status === 201) {
          dispatch(drop());
          toast.info(`Order Placed!!`, {
            position: "top-center",
            pauseOnHover: false,
          });
          navigate("/myOrders");
        }
      } else {
        toast.error(`Please Select an address`, {
          position: "top-center",
          pauseOnHover: false,
        });
      }
    } catch (error) {
      console.error("Error:", error);
    }
  };

  return (
    <>
      <Layout>
        <div className="checkout-container">
          <div className="checkout">
            <div className="address">
              <div className="label">
                Select Address<div className="decor-line"></div>
              </div>
              <div className="select-address">
                {addresses.length !== 0 ? (
                  addresses.map((address, index) => (
                    <label className="address-list" key={index}>
                      <input
                        type="radio"
                        name="address"
                        value={`${address.address},${address.city},${address.country},${address.pincode}`}
                        checked={selectedAddress === address}
                        onChange={() => handleSelectAddress(address)}
                      />
                      {`${address.address},${address.city},${address.country},${address.pincode}`}
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
                  {errors && <div>{errors.empty}</div>}
                  <button className="save-btn" onClick={handleAddNewAddress}>
                    Save Address
                  </button>
                </div>
              )}
            </div>
            <div className="checkout-summary">
              <h2>Order Summary</h2>
              {data.map((food, index) => (
                <div className="order-container">
                  <div className="order-data" key={index}>
                    <img
                      className="checkout-img"
                      src={food.img}
                      alt="orderItems"
                    />
                    <div className="details">
                      <div className="name">{food.name}</div>
                      <div>
                        Quantity:
                        {food.quantity}
                      </div>
                      <div>₹{food.price}</div>
                    </div>
                  </div>
                </div>
              ))}
              <div className="total-price">Total: ₹{totalPrice}</div>
              <div className="placeOrder-btn-container">
                <button className="placeOrder-btn" onClick={handleSubmit}>
                  Place Order
                </button>
              </div>
            </div>
          </div>
        </div>
      </Layout>
    </>
  );
}

export default Checkout;
