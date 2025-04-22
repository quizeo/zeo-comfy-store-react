import { createSlice } from "@reduxjs/toolkit";
import { toast } from "react-toastify";

const defaultState = {
  cartItems: [],
  numItemsInCart: 0,
  cartTotal: 0,
  shipping: 500,
  tax: 0,
  orderTotal: 0,
};

const getCartFromLocalStorage = () => {
  return JSON.parse(localStorage.getItem("cart")) || defaultState;
};

const cartSlice = createSlice({
  name: "cart",
  initialState: getCartFromLocalStorage(),
  reducers: {
    addItem: (state, action) => {
      const { product } = action.payload;
      const item = state.cartItems.find(
        (cartItem) => cartItem.cartID === product.cartID
      );
      if (item) {
        item.amount += parseInt(product.amount);
      } else {
        state.cartItems.push(product);
      }
      state.numItemsInCart += parseInt(product.amount);
      state.cartTotal += product.price * parseInt(product.amount);

      cartSlice.caseReducers.calculateTotals(state);
      toast.success(`${product.title} added to cart. `);
      // console.log("success added to cart");
    },
    clearCart: (state) => {
      localStorage.setItem("cart", JSON.stringify(defaultState));
      return defaultState;
    },
    removeItem: (state, action) => {
      const { cartID } = action.payload;

      const product = state.cartItems.find((item) => item.cartID === cartID);
      state.cartItems = state.cartItems.filter(
        (item) => item.cartID !== cartID
      );

      console.log(product);

      state.numItemsInCart -= parseInt(product.amount);
      state.cartTotal -= product.price * parseInt(product.amount);

      cartSlice.caseReducers.calculateTotals(state);
      toast.success(`${product.title} removed to cart. `);
    },
    editItem: (state, action) => {
      const { cartID, amount } = action.payload;
      const item = state.cartItems.find(
        (cartItem) => cartItem.cartID === cartID
      );
      state.numItemsInCart += parseInt(amount) - parseInt(item.amount);
      state.cartTotal +=
        item.price * (parseInt(amount) - parseInt(item.amount));
      item.amount = parseInt(amount);
      cartSlice.caseReducers.calculateTotals(state);
      toast.success(`${item.title} amount changed to ${amount}. `);
    },
    calculateTotals: (state) => {
      state.tax = 0.1 * state.cartTotal;
      state.orderTotal = state.cartTotal + state.shipping + state.tax;
      localStorage.setItem("cart", JSON.stringify(state));
    },
  },
});

export const { addItem, clearCart, removeItem, editItem } = cartSlice.actions;

export default cartSlice.reducer;
