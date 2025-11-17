// src/pages/OrdersPage.jsx
import React, { useEffect, useState } from "react";
import { collection, getDocs, query, where, orderBy } from "firebase/firestore";
import { db } from "../services/firebase.js";
import { useSelector } from "react-redux";

const OrdersPage = () => {
  const [orders, setOrders] = useState([]);
  const [loading, setLoading] = useState(true);
  const user = useSelector((state) => state.auth.user); // المستخدم الحالي

  useEffect(() => {
    const fetchOrders = async () => {
      try {
        let q;
        if (user?.email === "admin@example.com") {
          // 👑 لو الأدمن داخل، يشوف كل الطلبات
          q = query(collection(db, "orders"), orderBy("createdAt", "desc"));
        } else {
          // 👤 المستخدم يشوف طلباته فقط
          q = query(
            collection(db, "orders"),
            where("userEmail", "==", user?.email || ""),
            orderBy("createdAt", "desc")
          );
        }

        const querySnapshot = await getDocs(q);
        const fetchedOrders = querySnapshot.docs.map((doc) => ({
          id: doc.id,
          ...doc.data(),
        }));
        setOrders(fetchedOrders);
      } catch (error) {
        console.error("Error fetching orders:", error);
      } finally {
        setLoading(false);
      }
    };

    if (user) fetchOrders();
  }, [user]);

  if (loading) return <h2 className="text-center mt-10 text-lg">⏳ جاري تحميل الطلبات...</h2>;

  if (orders.length === 0)
    return <h2 className="text-center mt-10 text-lg">📭 لا توجد طلبات حالياً</h2>;

  return (
    <div className="max-w-5xl mx-auto p-6">
      <h1 className="text-3xl font-bold text-center mb-6">🧾 طلباتك</h1>

      <div className="space-y-6">
        {orders.map((order) => (
          <div
            key={order.id}
            className="border rounded-lg shadow p-4 bg-white hover:shadow-lg transition"
          >
            <h2 className="text-lg font-bold mb-2">رقم الطلب: {order.id}</h2>
            <p className="text-gray-600 mb-2">
              📅 التاريخ: {new Date(order.createdAt?.toDate()).toLocaleString()}
            </p>
            <p className="text-gray-600 mb-2">📧 الإيميل: {order.userEmail}</p>
            <p className="text-gray-800 font-semibold mb-2">
              💰 الإجمالي: {order.total.toFixed(2)} ج.م
            </p>

            <h3 className="font-bold mt-4 mb-2">🛒 المنتجات:</h3>
            <ul className="list-disc ml-6">
              {order.items.map((item, i) => (
                <li key={i}>
                  {item.name_ar} - {item.price} ج.م × {item.quantity}
                </li>
              ))}
            </ul>
          </div>
        ))}
      </div>
    </div>
  );
};

export default OrdersPage;

