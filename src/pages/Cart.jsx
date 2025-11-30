// src/pages/Cart.jsx
import React, { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  addToCart,
  decreaseQuantity,
  removeFromCart,
  updateCartStock,
} from "../features/cart/cartSlice";
import { FiTrash2, FiShoppingCart, FiPlus, FiMinus } from "react-icons/fi";
import { db } from "../services/firebase";
import { getDocs, collection } from "firebase/firestore";
import CartFooter from "../components/CartFooter";
import { useNavigate } from "react-router-dom";
import { UseTheme } from "../theme/ThemeProvider"; // ✅ نفس اللي في Products

export default function Cart() {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { items = [] } = useSelector((state) => state.cart || {});
  const [toast, setToast] = useState("");

  const { theme } = UseTheme();          // ✅ ناخد الثيم
  const isDark = theme === "dark";       // ✅ نحدد dark ولا light

  const showToast = (msg) => {
    setToast(msg);
    setTimeout(() => setToast(""), 3000);
  };

  // Fetch latest stock from Firestore
  const fetchLatestStock = async () => {
    try {
      const snapshot = await getDocs(collection(db, "products"));
      const products = snapshot.docs.map((d) => {
        const data = d.data() || {};
        const createdAt =
          data.createdAt && typeof data.createdAt.toMillis === "function"
            ? data.createdAt.toMillis()
            : data.createdAt ?? null;

        return {
          id: d.id,
          ...data,
          createdAt,
          stock: Number(data.stock ?? data.quantity ?? 0),
        };
      });

      dispatch(updateCartStock(products));
    } catch (err) {
      console.error("fetchLatestStock failed:", err);
    }
  };

  useEffect(() => {
    fetchLatestStock();
  }, []);

  const handleAdd = (item) => {
    const qty = Number(item.quantity || 0);
    const stock = Number(item.stock || 0);

    if (qty >= stock) {
      showToast(`Max stock reached for "${item.title || item.name}"`);
      return;
    }
    dispatch(addToCart(item));
  };

  const handleDecrease = (item) => {
    const qty = Number(item.quantity || 0);
    if (qty > 1) dispatch(decreaseQuantity(item.id));
  };

  const subtotal = items.reduce(
    (sum, i) => sum + Number(i.price || 0) * Number(i.quantity || 0),
    0
  );
  const shipping = items.length ? 50 : 0;
  const total = subtotal + shipping;

  const handleGoToCheckout = () => {
    if (!items.length) {
      showToast("Cart is empty");
      return;
    }

    const invalid = items.some(
      (i) => Number(i.quantity || 0) > Number(i.stock || 0)
    );
    if (invalid) {
      showToast("Some items exceed available stock. Please update quantities.");
      return;
    }

    navigate("/checkout");
  };

  return (
    <div
      className={`min-h-screen font-inter ${
        isDark ? "bg-[#0b1714] text-[#d7f7d0]" : "bg-gray-100 text-gray-900"
      }`}
    >
      <div className="mx-auto max-w-6xl p-6">
        {toast && (
          <div className="fixed top-4 right-4 bg-yellow-100 p-3 rounded shadow z-50">
            {toast}
          </div>
        )}

        <div
          className={`p-6 md:p-8 rounded-2xl shadow-lg ${
            isDark
              ? "bg-[#112c25]/70 border border-[#2d5a4f]"
              : "bg-white"
          }`}
        >
          <h1
            className={`text-3xl font-bold flex items-center gap-2 mb-6 ${
              isDark ? "text-[#d7f7d0]" : "text-[#2a4435]"
            }`}
          >
            <FiShoppingCart
              className={isDark ? "text-green-300" : "text-[#52b788]"}
            />
            Cart
          </h1>

          {!items.length ? (
            <p
              className={`text-center text-lg ${
                isDark ? "text-[#a3ccb9]" : "text-gray-500"
              }`}
            >
              Your cart is empty.
            </p>
          ) : (
            <>
              <ul className="divide-y divide-gray-200">
                {items.map((item) => {
                  const price = Number(item.price || 0);
                  const qty = Number(item.quantity || 0);
                  const stock = Number(item.stock || 0);
                  const stockRem = Math.max(0, stock - qty);

                  return (
                    <li
                      key={item.id}
                      className="py-4 flex flex-col sm:flex-row gap-4 items-start sm:items-center"
                    >
                      <div
                        className={`w-full sm:w-32 h-32 flex-shrink-0 overflow-hidden rounded-lg border ${
                          isDark ? "border-[#2d5a4f]" : "border-gray-200"
                        }`}
                      >
                        {item.thumbnailUrl || item.img ? (
                          <img
                            src={item.thumbnailUrl || item.img}
                            alt={item.title || item.name}
                            className="w-full h-full object-cover"
                          />
                        ) : (
                          <div
                            className={`w-full h-full flex items-center justify-center ${
                              isDark
                                ? "bg-[#173a30] text-[#a3ccb9]"
                                : "bg-gray-100 text-gray-400"
                            }`}
                          >
                            No Image
                          </div>
                        )}
                      </div>

                      <div className="flex-1 flex flex-col justify-between">
                        <div>
                          <h3
                            className={`text-lg font-semibold ${
                              isDark ? "text-[#d7f7d0]" : "text-[#2a4435]"
                            }`}
                          >
                            {item.name || item.title}
                          </h3>
                          <p
                            className={`font-medium mt-1 ${
                              isDark ? "text-green-300" : "text-green-700"
                            }`}
                          >
                            {price.toLocaleString()} EGP
                          </p>
                        </div>

                        <div className="mt-3 flex items-center gap-3">
                          <button
                            onClick={() => handleDecrease(item)}
                            className={`w-8 h-8 rounded-full border flex items-center justify-center hover:bg-gray-100 ${
                              isDark
                                ? "text-[#d7f7d0] border-[#2d5a4f] hover:bg-[#173a30]"
                                : "text-gray-700 border-gray-300 hover:bg-gray-100"
                            }`}
                          >
                            <FiMinus />
                          </button>
                          <span className="min-w-[40px] text-center">
                            {qty}
                          </span>
                          <button
                            onClick={() => handleAdd(item)}
                            className={`w-8 h-8 rounded-full border flex items-center justify-center hover:bg-gray-100 ${
                              isDark
                                ? "text-[#d7f7d0] border-[#2d5a4f] hover:bg-[#173a30]"
                                : "text-gray-700 border-gray-300 hover:bg-gray-100"
                            }`}
                          >
                            <FiPlus />
                          </button>
                        </div>

                        <p
                          className={`text-sm mt-2 ${
                            isDark ? "text-[#a3ccb9]" : "text-gray-500"
                          }`}
                        >
                          Stock remaining: {stockRem}
                        </p>
                      </div>

                      <button
                        onClick={() => dispatch(removeFromCart(item.id))}
                        className={`mt-3 sm:mt-0 text-white px-4 py-2 rounded flex items-center justify-center ${
                          isDark
                            ? "bg-red-600 hover:bg-red-700"
                            : "bg-red-500 hover:bg-red-600"
                        }`}
                      >
                        <FiTrash2 size={20} />
                      </button>
                    </li>
                  );
                })}
              </ul>

              <CartFooter
                title="Checkout"
                total={total}
                totaltext="Total"
                onCheckout={handleGoToCheckout}
                itemCount={items.length}
                textitem="items"
              />
            </>
          )}
        </div>
      </div>
    </div>
  );
}
