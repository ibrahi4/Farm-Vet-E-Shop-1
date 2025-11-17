import { useDispatch } from "react-redux";
import {
    increaseQuantity,
    decreaseQuantity,
    removeFromCart,
} from "./cartSlice";
import { Trash2 } from "lucide-react";

export default function CartItem({ item }) {
    const dispatch = useDispatch();

    return (
        <div className="flex items-center gap-12 p-4 rounded-2xl shadow-md bg-white">


            {/* صورة المنتج */}
            <img
                src={item.thumbnailUrl || item.image || "https://via.placeholder.com/150"}
                alt={item.title}
                className="w-48 h-48 object-contain rounded-2xl bg-white p-2"

            />

            {/* تفاصيل */}
            <div className="flex-1">
                <h3 className="text-xl font-semibold">{item.title}</h3>

                {/* السعر الإجمالي */}
                <p className="text-green-700 font-bold text-xl">{item.price * item.quantity} EGP</p>


                {/* سعر الوحدة */}
                <p className="text-sm text-gray-500">Unit Price: {item.price} EGP</p>

                {/* أزرار الكمية */}
                <div className="flex items-center gap-3 mt-4">

                    <button
                        onClick={() => dispatch(decreaseQuantity(item.id))}
                        className="w-8 h-8 flex items-center justify-center bg-gray-200 text-xl rounded-md hover:bg-gray-300"
                    >
                        –
                    </button>

                    <span className="text-xl font-bold">{item.quantity}</span>

                    <button
                        onClick={() => dispatch(increaseQuantity(item.id))}
                        className="w-8 h-8 flex items-center justify-center bg-gray-200 text-xl rounded-md hover:bg-gray-300"
                    >
                        +
                    </button>
                </div>
            </div>

            {/* أيقونة الحذف */}
            <button
                onClick={() => dispatch(removeFromCart(item.id))}
                className="p-3 text-red-600 hover:bg-red-100 rounded-full transition"
            >
                <Trash2 size={22} />
            </button>

        </div>
    );
}
