
import { db } from "../../firebase";
import {
    doc,
    getDoc,
    setDoc,
    updateDoc,
    deleteField,
} from "firebase/firestore";

const getCartRef = (userId) => doc(db, "carts", userId);

// 🟢 حفظ السلة في Firestore
export const saveCart = async (userId, items) => {
    await setDoc(getCartRef(userId), { items }, { merge: true });
};

// 🟡 جلب السلة من Firestore
export const getCart = async (userId) => {
    const snapshot = await getDoc(getCartRef(userId));
    return snapshot.exists() ? snapshot.data().items : [];
};

// 🔴 حذف السلة (بعد إنشاء الطلب)
export const clearCart = async (userId) => {
    await updateDoc(getCartRef(userId), { items: deleteField() });
};
