
import React from "react";
import { useNavigate } from "react-router-dom";
import { motion } from "framer-motion";

const OrderCard = ({ order }) => {
    const navigate = useNavigate();

    const handleClick = () => {
        navigate(`/orders/${order.id}`);
    };

    return (
        <motion.div
            onClick={handleClick}
            whileHover={{ scale: 1.02 }}
            className="cursor-pointer p-5 rounded-2xl backdrop-blur-md bg-white/30 shadow-lg border border-white/60 transition"
        >
            <div className="flex justify-between items-center mb-3">
                <h2 className="font-bold text-xl text-gray-800">
                    Order #{order.id.slice(-6).toUpperCase()}
                </h2>
                <span
                    className={`px-3 py-1 rounded-lg text-sm font-semibold ${order.status === "Pending"
                        ? "bg-yellow-500/70 text-white"
                        : order.status === "Processing"
                            ? "bg-blue-500/70 text-white"
                            : "bg-green-600/70 text-white"
                        }`}
                >
                    {order.status}
                </span>
            </div>

            <p className="text-gray-700">
                🗓 {order.createdAt ? new Date(order.createdAt.seconds * 1000).toLocaleDateString() : "—"}
            </p>

            <p className="text-gray-900 font-semibold mt-2 text-lg">
                💰 Total: {order.totalAmount} EGP
            </p>
        </motion.div>
    );
};

export default OrderCard;
