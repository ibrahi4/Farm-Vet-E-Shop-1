import React, { useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { db } from "../services/firebase.js";
import { collection, addDoc, serverTimestamp } from "firebase/firestore";
import { clearCart } from "../features/cart/cartSlice.js";
import { useNavigate } from "react-router-dom";
import toast from "react-hot-toast";
import { getAuth } from "firebase/auth";

const CheckoutPage = () => {
    const { items, totalAmount } = useSelector((state) => state.cart);
    const dispatch = useDispatch();
    const navigate = useNavigate();

    const auth = getAuth();
    const user = auth.currentUser;

    const [userInfo, setUserInfo] = useState({
        name: user?.displayName || "",
        address: "",
        phone: "",
        payment: "cash",
    });

    const handleChange = (e) => {
        setUserInfo({ ...userInfo, [e.target.name]: e.target.value });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();

        if (!user) {
            toast.error("⚠️ يجب تسجيل الدخول أولاً قبل إتمام الطلب");
            navigate("/login");
            return;
        }

        if (!userInfo.address || !userInfo.phone) {
            toast.error("⚠️ من فضلك أدخل كل البيانات المطلوبة");
            return;
        }

        if (items.length === 0) {
            toast.error("🛒 السلة فارغة!");
            return;
        }

        try {
            const docRef = await addDoc(collection(db, "orders"), {
                userId: user.uid,
                userEmail: user.email || null,
                customerName: userInfo.name,
                phone: userInfo.phone,
                address: userInfo.address,
                paymentMethod: userInfo.payment,
                items,
                totalAmount,
                status: "Pending",
                createdAt: serverTimestamp(),
            });

            dispatch(clearCart());
            toast.success("🎉 تم تسجيل الطلب بنجاح!");

            // 🔥 الانتقال لصفحة تفاصيل الطلب
            navigate(`/orders/${docRef.id}`);

        } catch (error) {
            console.error("Error adding order:", error);
            toast.error("❌ حدث خطأ أثناء حفظ الطلب!");
        }
    };

    return (
        <div className="max-w-4xl mx-auto p-6">
            <h1 className="text-3xl font-extrabold mb-6 text-center">
                🛒 إتمام الطلب
            </h1>

            <div className="grid md:grid-cols-2 gap-6">

                {/* ------- Form ------- */}
                <form
                    onSubmit={handleSubmit}
                    className="space-y-4 bg-white shadow-lg rounded-xl p-6 border"
                >
                    <h2 className="text-xl font-bold mb-4 text-gray-700 border-b pb-2">
                        بيانات العميل
                    </h2>

                    <div>
                        <label className="block mb-1 font-medium">الاسم الكامل</label>
                        <input
                            type="text"
                            name="name"
                            value={userInfo.name}
                            onChange={handleChange}
                            className="w-full border p-3 rounded-lg focus:ring-2 focus:ring-green-500"
                        />
                    </div>

                    <div>
                        <label className="block mb-1 font-medium">العنوان</label>
                        <input
                            type="text"
                            name="address"
                            value={userInfo.address}
                            onChange={handleChange}
                            className="w-full border p-3 rounded-lg focus:ring-2 focus:ring-green-500"
                        />
                    </div>

                    <div>
                        <label className="block mb-1 font-medium">رقم الهاتف</label>
                        <input
                            type="text"
                            name="phone"
                            value={userInfo.phone}
                            onChange={handleChange}
                            className="w-full border p-3 rounded-lg focus:ring-2 focus:ring-green-500"
                        />
                    </div>

                    <div>
                        <label className="block mb-1 font-medium">طريقة الدفع</label>
                        <select
                            name="payment"
                            value={userInfo.payment}
                            onChange={handleChange}
                            className="w-full border p-3 rounded-lg"
                        >
                            <option value="cash">عند الاستلام</option>
                            <option value="card">بطاقة ائتمان</option>
                        </select>
                    </div>

                    <button
                        type="submit"
                        className="w-full bg-green-600 text-white py-3 rounded-lg text-lg font-bold hover:bg-green-700 transition"
                    >
                        تأكيد الطلب ✔
                    </button>
                </form>

                {/* ------- Order Summary ------- */}
                <div className="bg-gray-50 shadow-inner rounded-xl p-6 border">
                    <h2 className="text-xl font-bold mb-4 text-gray-700 border-b pb-2">
                        ملخص الطلب
                    </h2>

                    <div className="space-y-3 max-h-80 overflow-y-auto">
                        {items.length === 0 ? (
                            <p className="text-gray-500 text-center">السلة فارغة</p>
                        ) : (
                            items.map((item) => (
                                <div
                                    key={item.id}
                                    className="flex justify-between border-b pb-2"
                                >
                                    <span className="font-medium">{item.title}</span>
                                    <span>
                                        {item.price} × {item.quantity || 1}
                                    </span>
                                </div>
                            ))
                        )}
                    </div>

                    <div className="mt-5 pt-4 border-t">
                        <h3 className="text-lg font-bold">
                            الإجمالي:{" "}
                            <span className="text-green-700 text-xl">
                                {totalAmount} ج.م
                            </span>
                        </h3>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default CheckoutPage;
