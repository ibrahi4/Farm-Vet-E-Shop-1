import { createSlice } from "@reduxjs/toolkit";

const savedCart = JSON.parse(localStorage.getItem("cartItems") || "[]");

const calcTotal = (items) => {
  return items.reduce(
    (sum, item) => sum + item.price * (item.quantity || 1),
    0
  );
};

const cartSlice = createSlice({
  name: "cart",
  initialState: {
    items: savedCart,
    totalAmount: calcTotal(savedCart),
  },

  reducers: {
    // ------------ ADD ITEM ------------
    addToCart: (state, action) => {
      const exists = state.items.find((i) => i.id === action.payload.id);

      if (exists) {
        exists.quantity += 1;
      } else {
        state.items.push({ ...action.payload, quantity: 1 });
      }

      state.totalAmount = calcTotal(state.items);
      localStorage.setItem("cartItems", JSON.stringify(state.items));
    },

    // ------------ INCREASE ------------
    increaseQuantity: (state, action) => {
      const item = state.items.find((i) => i.id === action.payload);
      if (item) {
        item.quantity += 1;
        state.totalAmount = calcTotal(state.items);
        localStorage.setItem("cartItems", JSON.stringify(state.items));
      }
    },

    // ------------ DECREASE ------------
    decreaseQuantity: (state, action) => {
      const item = state.items.find((i) => i.id === action.payload);

      if (item && item.quantity > 1) {
        item.quantity -= 1;
      } else {
        state.items = state.items.filter((i) => i.id !== action.payload);
      }

      state.totalAmount = calcTotal(state.items);
      localStorage.setItem("cartItems", JSON.stringify(state.items));
    },

    // ------------ CLEAR CART ------------
    clearCart: (state) => {
      state.items = [];
      state.totalAmount = 0;
      localStorage.setItem("cartItems", JSON.stringify([]));
    },


    // ------------ REMOVE ITEM COMPLETELY ------------
    removeFromCart: (state, action) => {
      state.items = state.items.filter((i) => i.id !== action.payload);
      state.totalAmount = calcTotal(state.items);
      localStorage.setItem("cartItems", JSON.stringify(state.items));
    },

  },
});

export const {
  addToCart,
  increaseQuantity,
  decreaseQuantity,
  removeFromCart,
  clearCart,
} = cartSlice.actions;

export default cartSlice.reducer;
