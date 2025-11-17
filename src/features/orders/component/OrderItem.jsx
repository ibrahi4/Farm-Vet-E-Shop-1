
import React from "react";

const OrderItem = ({ item }) => {
    return (
        <div className="flex items-center gap-4 p-4 rounded-xl backdrop-blur-md bg-white/30 border border-white/50 shadow-md">
            <img
                src={item.thumbnailUrl || item.image || "https://via.placeholder.com/80"}
                alt={item.title}
                className="w-20 h-20 object-contain rounded-xl bg-white p-2"
            />

            <div className="flex-1">
                <h4 className="font-semibold text-gray-900 text-lg">
                    {item.title}
                </h4>
                <p className="text-gray-600 text-sm">
                    {item.price} EGP × {item.quantity || 1}
                </p>
            </div>

            <p className="font-bold text-gray-800">
                {item.price * item.quantity} EGP
            </p>
        </div>
    );
};

export default OrderItem;
