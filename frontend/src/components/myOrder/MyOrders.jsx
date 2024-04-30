import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";

import { myOrder } from "../../services/ordersService";

import Layout from "../Layout";

import "./myOrders.css";

export default function MyOrders() {
  const [orderData, setOrderData] = useState({});

  const fetchMyOrder = async () => {
    const userEmail = localStorage.getItem("userEmail");
    if (userEmail) {
      myOrder(userEmail).then((response) => {
        if (response) {
          setOrderData(response.data);
        }
      });
    }
  };

  useEffect(() => {
    fetchMyOrder();
  }, []);

  return (
    <>
      <Layout>
        <div className="myorders-container">
          <div className="order-row">
            {orderData.orderData !== null ? (
              Array(orderData).map((data) => {
                return data.orderData
                  ? data.orderData.orderData
                      .slice(0)
                      .reverse()
                      .map((item) => {
                        return (
                          <>
                            <div className="order-details">
                              <div className="date">
                                {item.orderDate}
                                <hr />
                              </div>
                              <div className="order-items">
                                {item.orderItems.map((arrayData) => {
                                  return (
                                    <div className="order-layout">
                                      {
                                        <div className="card-container">
                                          <div className="order-card">
                                            <img
                                              src={arrayData.img}
                                              className="order-img"
                                              alt="..."
                                            />
                                            <div className="card-body">
                                              <h5 className="card-title">
                                                {arrayData.name}
                                              </h5>
                                              <div className="order-container">
                                                <span className="elements">
                                                  {arrayData.quantity}
                                                </span>
                                                <span className="elements">
                                                  {arrayData.size}
                                                </span>
                                                <div className="order-price">
                                                  ₹{arrayData.price}/-
                                                </div>
                                              </div>
                                            </div>
                                          </div>
                                        </div>
                                      }
                                    </div>
                                  );
                                })}
                              </div>
                              <div className="final-price">
                                Total Price: ₹{item.price}/-
                              </div>
                              <h4>Delivery Address:</h4>
                              <div>{`${item.address.address}, ${item.address.city}, ${item.address.country}, ${item.address.pincode}`}</div>
                            </div>
                          </>
                        );
                      })
                  : "";
              })
            ) : (
              <div className="order-notAvailable">
                <h2>No Orders Yet! Please order...</h2>
                <Link className="order-link" to={"/"}>
                  Order now
                </Link>
              </div>
            )}
          </div>
        </div>
      </Layout>
    </>
  );
}
