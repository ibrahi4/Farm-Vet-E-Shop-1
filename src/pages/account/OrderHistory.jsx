// src/pages/UserOrders.jsx
import React, { useState } from "react";
import { FiClock } from "react-icons/fi";
import { auth } from "../../services/firebase";
import useOrders from "../../hooks/useOrders";
import { UseTheme } from "../../theme/ThemeProvider";

export default function UserOrders() {
  const { theme } = UseTheme();
  const isDark = theme === "dark";

  const user = auth.currentUser;
  const { orders, loading } = useOrders(user?.uid);

  const [expandedId, setExpandedId] = useState(null);

  if (loading)
    return (
      <div
        className={`p-10 text-center text-lg ${
          isDark ? "text-green-200" : "text-green-800"
        }`}
      >
        Loading orders...
      </div>
    );

  if (!orders.length)
    return (
      <div
        className={`p-10 text-center text-xl font-semibold ${
          isDark ? "text-green-200" : "text-green-900"
        }`}
      >
        No orders yet.
      </div>
    );

  const containerBg = isDark ? "bg-[#0b1714] text-[#d7f7d0]" : "bg-white";

  return (
    <div className={`space-y-6 p-5 min-h-screen ${containerBg}`}>
      <header>
        <p className="text-sm font-semibold uppercase tracking-wide text-emerald-500">
          Overview
        </p>
        <h1
          className={`text-3xl font-semibold ${
            isDark ? "text-white" : "text-slate-900"
          }`}
        >
          Order History
        </h1>
        <p className={`text-sm ${isDark ? "text-slate-300" : "text-slate-500"}`}>
          Track invoices, statuses, and totals for every transaction.
        </p>
      </header>

      {/* Desktop Table */}
      <div
        className={`hidden lg:block overflow-hidden rounded-3xl border shadow-sm ${
          isDark
            ? "border-[#2d5a4f] bg-[#112c25]/70"
            : "border-slate-100 bg-white"
        }`}
      >
        <table className="min-w-full divide-y divide-slate-200 text-sm">
          <thead className={isDark ? "bg-[#173a30]/60" : "bg-slate-50"}>
            <tr
              className={`text-left text-xs font-semibold uppercase tracking-wide ${
                isDark ? "text-slate-200" : "text-slate-500"
              }`}
            >
              <th className="px-6 py-3">Order</th>
              <th className="px-6 py-3">Date</th>
              <th className="px-6 py-3">Items</th>
              <th className="px-6 py-3">Total</th>
              <th className="px-6 py-3">Status</th>
              <th className="px-6 py-3 text-right">Actions</th>
            </tr>
          </thead>

          <tbody className="divide-y divide-slate-200">
            {orders.map((order) => (
              <tr
                key={order.id}
                className={isDark ? "text-slate-200" : "text-slate-700"}
              >
                <td
                  className={`px-6 py-4 font-semibold ${
                    isDark ? "text-white" : "text-slate-900"
                  }`}
                >
                  {order.orderNumber || order.id}
                </td>
                <td className="px-6 py-4">
                  {new Date(order.createdAt).toLocaleString()}
                </td>
                <td className="px-6 py-4">{order.items?.length || 0}</td>
                <td className="px-6 py-4">{order.total} EGP</td>

                <td className="px-6 py-4">
                  <span
                    className={`rounded-full px-3 py-1 text-xs font-semibold ${
                      isDark
                        ? "bg-green-800 text-green-200"
                        : "bg-emerald-100 text-emerald-700"
                    }`}
                  >
                    {order.status}
                  </span>
                </td>

                <td className="px-6 py-4 text-right">
                  <button
                    className={`text-sm font-semibold ${
                      isDark ? "text-green-300" : "text-emerald-600"
                    } hover:underline`}
                    onClick={() =>
                      setExpandedId(expandedId === order.id ? null : order.id)
                    }
                  >
                    View details
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {/* Mobile Cards */}
      <div className="space-y-4 lg:hidden">
        {orders.map((order) => (
          <div
            key={order.id}
            className={`rounded-3xl border p-4 shadow-sm ${
              isDark
                ? "border-[#2d5a4f] bg-[#112c25]/70"
                : "border-slate-100 bg-white"
            }`}
          >
            <div className="flex items-center justify-between">
              <div>
                <p
                  className={`text-sm font-semibold ${
                    isDark ? "text-white" : "text-slate-900"
                  }`}
                >
                  {order.orderNumber || order.id}
                </p>
                <p
                  className={`text-xs ${
                    isDark ? "text-slate-300" : "text-slate-500"
                  }`}
                >
                  {new Date(order.createdAt).toLocaleString()}
                </p>
              </div>

              <span
                className={`rounded-full px-3 py-1 text-xs font-semibold ${
                  isDark
                    ? "bg-green-900 text-green-200"
                    : "bg-emerald-100 text-emerald-700"
                }`}
              >
                {order.status}
              </span>
            </div>

            <button
              className={`text-sm mt-2 ${
                isDark ? "text-green-300" : "text-emerald-600"
              } hover:underline`}
              onClick={() =>
                setExpandedId(expandedId === order.id ? null : order.id)
              }
            >
              View details
            </button>

            {expandedId === order.id && (
              <div className="mt-3 space-y-3">
                {order.items?.map((item, idx) => (
                  <div
                    key={idx}
                    className={`flex items-center gap-4 p-3 rounded-xl ${
                      isDark
                        ? "bg-[#173a30] border-[#2d5a4f]"
                        : "bg-green-50 border-green-200"
                    } border`}
                  >
                    <img
                      src={item.imageUrl}
                      alt={item.name}
                      className="w-16 h-16 rounded-lg object-cover border"
                    />

                    <div>
                      <p
                        className={`font-medium ${
                          isDark ? "text-green-200" : "text-green-900"
                        }`}
                      >
                        {item.name}
                      </p>
                      <p
                        className={`text-sm ${
                          isDark ? "text-green-300" : "text-green-700"
                        }`}
                      >
                        {item.price} EGP × {item.quantity}
                      </p>
                    </div>
                  </div>
                ))}

                <div
                  className={`p-3 rounded-lg ${
                    isDark ? "bg-[#173a30]" : "bg-green-50"
                  }`}
                >
                  <p
                    className={`text-sm ${
                      isDark ? "text-green-200" : "text-green-800"
                    }`}
                  >
                    Shipping Address:
                  </p>
                  <p
                    className={`font-semibold ${
                      isDark ? "text-green-100" : "text-green-900"
                    }`}
                  >
                    {order.address}
                  </p>
                </div>

                <div>
                  <p
                    className={`font-medium mb-2 ${
                      isDark ? "text-green-200" : "text-green-900"
                    }`}
                  >
                    Status Updates:
                  </p>

                  <ul className="space-y-2">
                    {order.statusHistory?.map((h, i) => (
                      <li
                        key={i}
                        className={`flex items-center gap-2 p-2 rounded-lg border ${
                          isDark
                            ? "bg-[#112c25] border-[#2d5a4f]"
                            : "bg-white border-green-200"
                        }`}
                      >
                        <FiClock
                          className={isDark ? "text-green-200" : "text-green-700"}
                        />
                        <span
                          className={`font-semibold ${
                            isDark ? "text-green-100" : "text-green-900"
                          }`}
                        >
                          {h.status}
                        </span>
                        <span
                          className={`text-sm ${
                            isDark ? "text-green-300" : "text-green-700"
                          }`}
                        >
                          {new Date(h.changedAt).toLocaleString()}
                        </span>
                      </li>
                    ))}
                  </ul>
                </div>
              </div>
            )}
          </div>
        ))}
      </div>
    </div>
  );
}
