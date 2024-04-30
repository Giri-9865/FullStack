import { ADD_TO_CART, UPDATE_CART, REMOVE_FROM_CART, DROP } from "./types";

export const addToCart = (id, name, price, quantity, size, img) => ({
  type: ADD_TO_CART,
  payload: { id, name, price, quantity, size, img },
});

export const removeFromCart = (id) => ({
  type: REMOVE_FROM_CART,
  id,
});

export const updateCart = (id, price, quantity) => ({
  type: UPDATE_CART,
  id,
  price,
  quantity,
});

export const drop = () => ({
  type: DROP,
});
