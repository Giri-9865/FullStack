import React from "react";
import { useSelector, useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import { ImBin } from "react-icons/im";

import { removeFromCart, updateCart } from "../../redux/action";

import "./cart.css";

function Cart({ view }) {
  let dispatch = useDispatch();
  let data = useSelector((state) => state.data);
  const navigate = useNavigate();
  if (data.length === 0) {
    return (
      <div>
        <h1 className="cart-empty-text">The Cart is Empty!</h1>
        <div className="order-notAvailable">
          <button
            className="order-link"
            onClick={() => {
              navigate("/");
              view(false);
            }}
          >
            Add Items
          </button>
        </div>
      </div>
    );
  }
  let totalPrice = data.reduce((total, food) => total + Number(food.price), 0);

  const handleQuantityChange = (id, currentPrice, quantity, newQuantity) => {
    const newPrice = (currentPrice / quantity) * newQuantity;
    dispatch(updateCart(id, newPrice, newQuantity));
  };

  const handleOnClick = () => {
    view(false);
    navigate("/checkout");
  };

  return (
    <div>
      <div className="table-container">
        <table className="table">
          <thead className="heading">
            <tr key={data.id}>
              <th scope="col">#</th>
              <th scope="col">Name</th>
              <th scope="col">Quantity</th>
              <th scope="col">Option</th>
              <th scope="col">Amount</th>
              <th scope="col"></th>
            </tr>
          </thead>
          <tbody>
            {data.map((food, index) => (
              <tr>
                <th scope="row">{index + 1}</th>
                <td>{food.name}</td>
                <td>
                  <button
                    style={{
                      fontSize: "15px",
                      fontWeight: "bold",
                      cursor: "pointer",
                    }}
                    onClick={() =>
                      handleQuantityChange(
                        food.id,
                        food.price,
                        food.quantity,
                        Number(food.quantity) - 1
                      )
                    }
                    disabled={Number(food.quantity) === 1}
                  >
                    -
                  </button>
                  {` ${food.quantity} `}
                  <button
                    style={{
                      fontSize: "15px",
                      fontWeight: "bold",
                      cursor: "pointer",
                    }}
                    onClick={() =>
                      handleQuantityChange(
                        food.id,
                        food.price,
                        food.quantity,
                        Number(food.quantity) + 1
                      )
                    }
                  >
                    +
                  </button>
                </td>
                <td>{food.size}</td>
                <td>{food.price}</td>
                <td>
                  <button
                    className="delete-bin"
                    onClick={() => {
                      dispatch(removeFromCart(index));
                    }}
                  >
                    <ImBin />
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
        <div>
          <h1>Total Price: {totalPrice}/-</h1>
        </div>
        <div>
          <button className="checkout-btn" onClick={handleOnClick}>
            Check Out
          </button>
        </div>
      </div>
    </div>
  );
}

export default Cart;
