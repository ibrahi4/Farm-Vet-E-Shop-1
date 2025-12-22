// src/utils/gemini.js
import { GoogleGenerativeAI } from "@google/generative-ai";

const apiKey = import.meta.env.VITE_GEMINI_API_KEY;

if (!apiKey) {
  throw new Error("❌ Gemini API key is missing. Check .env file");
}

const genAI = new GoogleGenerativeAI(apiKey);

const model = genAI.getGenerativeModel({
  model: "gemini-2.5-flash", // مضمون ومتاح
  generationConfig: {
    temperature: 0.7,
    topP: 0.95,
    topK: 40,
    maxOutputTokens: 4096,
  },
});

export const analyzeWithGemini = async (firebaseData, customPrompt = null) => {
  const defaultPrompt = `
أنت خبير تحليل بيانات محترف وبتتكلم عربي ممتاز.

البيانات دي جاية من Firebase:
${JSON.stringify(firebaseData, null, 2)}

اعمل:
1. ملخص سريع
2. أرقام وإحصائيات
3. مشاكل أو أنماط
4. 3 توصيات عملية
قدم التحليل بشكل منسق وسهل القراءة.
لخص المجمل في نقاط محددة 
 افكار في حلول مبتكرة للمشاكل اللي ممكن تظهر من البيانات.
خليك مختصر وواضح.
استخدم اللغة العربية الفصحى.
ترجع الاجابه بدون مقدمة ادخل في الموضع علطول
`;

  try {
    const result = await model.generateContent(customPrompt || defaultPrompt);
    return result.response.text();
  } catch (error) {
    console.error("❌ Gemini Error:", error);
    return "⚠️ فشل تحميل التحليل الذكي حالياً.";
  }
};
