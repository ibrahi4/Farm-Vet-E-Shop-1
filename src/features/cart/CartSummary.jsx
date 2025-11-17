import { useSelector, useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import CartItem from "./CartItem";

export default function CartSummary() {
    const { items } = useSelector((state) => state.cart);
    const navigate = useNavigate();

    // حساب الإجمالي من الكميات + الأسعار
    const totalAmount = items.reduce(
        (sum, item) => sum + item.price * item.quantity,
        0
    );

    if (items.length === 0)
        return (
            <p className="p-6 text-center text-gray-600 text-lg">
                السلة فارغة.
            </p>
        );

    return (
        <div className="p-6 max-w-3xl mx-auto">
            <h2 className="text-3xl font-bold mb-6">🛒 سلة المشتريات</h2>

            {/* عرض المنتجات */}
            <div className="space-y-4">
                {items.map((item) => (
                    <CartItem key={item.id} item={item} />
                ))}
            </div>

            {/* الإجمالي */}
            <div className="mt-6 p-4 border-t flex justify-between items-center text-xl font-semibold">
                <span>الإجمالي:</span>
                <span className="text-green-700">{totalAmount} ج.م</span>
            </div>

            {/* زر الـ Checkout */}
            <button
                onClick={() => navigate("/checkout")}
                className="mt-6 bg-green-700 text-white py-3 w-full rounded-xl font-bold text-lg hover:bg-green-800 transition"
            >
                checkout
            </button>
        </div>
    );
}
