import React, { useState } from "react";
import { NavLink, useNavigate } from "react-router-dom";
import { useSelector } from "react-redux";
import { FaCartShopping } from "react-icons/fa6";
import { RiAccountCircleFill } from "react-icons/ri";

import { authenticated } from "../../services/userService";

import Cart from "../cart/Cart";
import Modal from "../../modal/Modal";

import "./navbar.css";

export default function Navbar() {
  const navigate = useNavigate();
  const [cartView, setCartView] = useState(false);
  let data = useSelector((state) => state.data);

  const handleLogout = () => {
    localStorage.removeItem("authToken");
    localStorage.removeItem("userEmail");
    navigate("/");
  };

  return (
    <div className="navbar">
      <NavLink to="/" className="logo">
        goEat
      </NavLink>
      {!authenticated() ? (
        <div className="register">
          <NavLink to="/login" className="nav-link">
            Login
          </NavLink>
          <NavLink to="/signin" className="nav-link">
            SignUp
          </NavLink>
        </div>
      ) : (
        <div className="register">
          <NavLink to="/myOrders" className="nav-link">
            My Orders
          </NavLink>
          <div className="cart" onClick={() => setCartView(true)}>
            <span className="cart-icon">
              <FaCartShopping />
            </span>{" "}
            <span className="mycart-badge">{Number(data.length)}</span>
          </div>
          <div className="dropdown">
            <div className="profile">
              <RiAccountCircleFill />
            </div>
            <div className="profile-dropdown">
              <NavLink to={"/myProfile"} className="update-link">
                Account
              </NavLink>
              <button onClick={handleLogout}>Logout</button>
            </div>
          </div>
          {cartView ? (
            <Modal onClose={() => setCartView(false)}>
              <Cart view={setCartView} />
            </Modal>
          ) : null}
        </div>
      )}
    </div>
  );
}
