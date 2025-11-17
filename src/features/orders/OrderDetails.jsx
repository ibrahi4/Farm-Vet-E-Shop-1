import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { getOrderById } from "./OrdersService";

export default function OrderDetails() {
    const { orderId } = useParams();
    const [order, setOrder] = useState(null);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        async function fetchOrder() {
            try {
                const data = await getOrderById(orderId);
                setOrder(data);
            } catch (error) {
                console.log(error);
            } finally {
                setLoading(false);
            }
        }

        fetchOrder();
    }, [orderId]);

    if (loading) return <h2 className="text-center py-10">Loading...</h2>;
    if (!order) return <h2 className="text-center py-10 text-red-500">Order not found</h2>;

    return (
        <div className="container mx-auto py-10">
            <h1 className="text-2xl font-bold mb-4">Order Details</h1>
            <p><strong>Order ID:</strong> {order.id}</p>
            <p><strong>Total:</strong> {order.totalAmount} EGP</p>

            <h2 className="text-xl font-bold mt-6">Items:</h2>
            <ul className="mt-2 space-y-3">
                {order.items?.map((item) => (
                    <li key={item.id} className="border p-3 rounded">
                        {item.title} — {item.quantity} x {item.price} EGP
                    </li>
                ))}
            </ul>
        </div>
    );
}
