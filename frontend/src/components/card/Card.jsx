import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { toast } from "react-toastify";
import { useNavigate } from "react-router-dom";

import { authenticated } from "../../services/userService";

import { updateCart, addToCart } from "../../redux/action";

import "./card.css";

export default function Card(props) {
  let dispatch = useDispatch();
  const navigate = useNavigate();
  const [quantity, setQuantity] = useState(1);

  let finalPrice = props.foodItem.price;
  let data = useSelector((state) => state.data);

  const handleAddToCart = () => {
    const exist = data.find((item) => item.id === props.foodItem._id);
    if (!authenticated()) {
      navigate("/login");
    }
    if (!exist) {
      const addQuantity = 1;
      setQuantity(1);
      dispatch(
        addToCart(
          props.foodItem._id,
          props.foodItem.name,
          finalPrice,
          addQuantity,
          props.foodItem.size,
          props.foodItem.img
        )
      );
      console.log(authenticated());
      toast.info(
        `${props.foodItem.name}(${props.foodItem.size}) added to Cart`,
        { position: "top-center", pauseOnHover: false }
      );
    } else {
      const newQuantity = quantity + 1;
      const newPrice = props.foodItem.price * newQuantity;
      setQuantity(newQuantity);
      dispatch(updateCart(props.foodItem._id, newPrice, newQuantity));

      toast.info(
        `${props.foodItem.name}(${props.foodItem.size})'s quantity increased`,
        { position: "top-center", pauseOnHover: false }
      );
    }
    // await console.log(data);
  };

  return (
    <>
      <div className="card">
        <img src={props.foodItem.img} className="card-img" alt="...." />
        <div className="card-body">
          <h5 className="card-title">{props.foodItem.name}</h5>
          <p className="card-text">{props.foodItem.description}</p>
          <div className="container">
            <div className="size">{props.foodItem.size}</div>
            <div className="price">₹{finalPrice}/-</div>
          </div>
          <hr />
          <button className="add-cart-btn" onClick={handleAddToCart}>
            Add to Cart
          </button>
        </div>
      </div>
    </>
  );
}
