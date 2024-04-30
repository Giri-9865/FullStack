import { ADD_TO_CART, UPDATE_CART, REMOVE_FROM_CART, DROP } from "./types";

const initialState = {
  data: [],
};
const reducer = (state = initialState, action) => {
  switch (action.type) {
    case ADD_TO_CART:
      return {
        ...state,
        data: [...state.data, action.payload],
      };
    case REMOVE_FROM_CART:
      let newData = [...state.data];
      newData.splice(action.index, 1);
      console.log(newData);
      return {
        ...state,
        data: newData,
      };
    case UPDATE_CART:
      return {
        ...state,
        data: state.data.map((item) => {
          if (item.id === action.id) {
            return {
              ...item,
              price: action.price,
              quantity: action.quantity,
            };
          }
          return item;
        }),
      };
    case DROP:
      return { data: [] };

    default:
      return state;
  }
};

export default reducer;
