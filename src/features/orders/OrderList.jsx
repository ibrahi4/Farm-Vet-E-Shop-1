import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { fetchUserOrders } from "../../features/orders/OrdersSlice";
import OrderCard from "./component/OrderCard";
import { useNavigate } from "react-router-dom";

const OrderList = () => {
    const dispatch = useDispatch();
    const navigate = useNavigate();

    const { user } = useSelector((state) => state.auth);
    const { orders, loading } = useSelector((state) => state.orders);

    useEffect(() => {
        if (!user) {
            navigate("/login"); // Redirect if not logged in
            return;
        }
        dispatch(fetchUserOrders(user.uid));
    }, [user, dispatch, navigate]);

    if (loading) return <p className="text-center text-lg">⏳ جاري تحميل الطلبات...</p>;

    return (
        <div className="max-w-4xl mx-auto p-6">
            <h1 className="text-3xl font-bold text-center mb-6">🧾 طلباتي</h1>

            {orders.length === 0 ? (
                <p className="text-center text-gray-600 text-lg">📭 لا توجد طلبات بعد</p>
            ) : (
                <div className="space-y-4">
                    {orders.map((order) => (
                        <OrderCard key={order.id} order={order} />
                    ))}
                </div>
            )}
        </div>
    );
};

export default OrderList;
