import { createSlice } from "@reduxjs/toolkit";
import { updateCart } from "../utils/cart";

const initialState = localStorage.getItem("cart")
  ? JSON.parse(localStorage.getItem("cart"))
  : { cartItems: [], shippingAddress: {}, paymentMethod: "UNKNOWN" };

const cartSlice = createSlice({
  name: "cart",
  initialState,
  reducers: {
    addToCart: (state, action) => {
      // eslint-disable-next-line no-unused-vars
      const { shortDesc, longDesc, potSize, potType, ...item } = action.payload;

      const existItemIndex = state.cartItems.findIndex(
        (x) => x._id === item._id
      );

      if (existItemIndex !== -1) {
        state.cartItems[existItemIndex] = item;
      } else {
        state.cartItems.push(item);
      }

      return updateCart(state, item);
    },
    removeFromCart: (state, action) => {
      state.cartItems = state.cartItems.filter((x) => x._id !== action.payload);
      return updateCart(state);
    },
    saveShippingAddress: (state, action) => {
      state.shippingAddress = action.payload;
      localStorage.setItem("cart", JSON.stringify(state));
    },
    clearCartItems: (state) => {
      state.cartItems = [];
      localStorage.setItem("cart", JSON.stringify(state));
      return updateCart(state);
    },
    resetCart: () => {
      localStorage.removeItem("cart");
      return initialState;
    },
  },
});

export const {
  addToCart,
  removeFromCart,
  saveShippingAddress,
  clearCartItems,
  resetCart,
} = cartSlice.actions;

export default cartSlice.reducer;
