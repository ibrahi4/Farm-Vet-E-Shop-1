
import { db } from "../../services/firebase.js";
import {
    addDoc,
    getDocs,
    doc,
    getDoc,
    collection,
    query,
    where,
    serverTimestamp,
} from "firebase/firestore";

const ordersRef = collection(db, "orders");

// 🟢 إنشاء طلب جديد
export const addOrder = async (data) => {
    return await addDoc(ordersRef, {
        ...data,
        status: "Pending",
        createdAt: serverTimestamp(),
    });
};
// 🔵 جلب طلب معين بواسطة المعرف
export const getOrderById = async (orderId) => {
    const docRef = doc(db, "orders", orderId);
    const snapshot = await getDoc(docRef);
    if (!snapshot.exists()) throw new Error("Order not found");
    return { id: snapshot.id, ...snapshot.data() };
};





// 🟡 جلب الطلبات الخاصة بمستخدم معين
export const getUserOrders = async (userId) => {
    const q = query(ordersRef, where("userId", "==", userId));
    const snapshot = await getDocs(q);
    return snapshot.docs.map((doc) => ({ id: doc.id, ...doc.data() }));
};

// 🟠 جلب كل الطلبات (للأدمن)
export const getAllOrders = async () => {
    const snapshot = await getDocs(ordersRef);
    return snapshot.docs.map((doc) => ({ id: doc.id, ...doc.data() }));
};
