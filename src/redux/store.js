import { configureStore } from "@reduxjs/toolkit";
import auth from "../features/auth/authSlice";
import cart from "../features/cart/cartSlice";
import favorites from "../features/favorites/favoritesSlice"; // ✅ أضفنا السلايس
import { listenerMiddleware, startAuthListener } from "./listenerMiddleware";
export const store = configureStore({
  reducer: {
    auth,
    cart,
    favorites,
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware().concat(listenerMiddleware.middleware),
});

startAuthListener(store);
