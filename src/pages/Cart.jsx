// src/pages/Cart.jsx
import React from "react";
import { useSelector } from "react-redux";
import CartSummary from "../features/cart/CartSummary";

export default function Cart() {
  const { items } = useSelector((state) => state.cart);

  return (
    <div className="min-h-screen bg-[#f5fff5] text-[#203232]">
      <div className="mx-auto w-full max-w-6xl px-4 py-10">
        <div className="bg-white border border-gray-200 rounded-2xl shadow-md p-8">

          <h1 className="text-3xl font-bold mb-6 flex items-center gap-2">
            🛒 Cart
          </h1>

          {items.length === 0 ? (
            <p className="text-gray-500 text-center text-lg">
              Your cart is empty.
            </p>
          ) : (
            <CartSummary />
          )}
        </div>
      </div>
    </div>
  );
}
