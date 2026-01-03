
import { GoogleGenAI } from "@google/genai";
import { dbService } from "./databaseService";

const ai = new GoogleGenAI({ apiKey: process.env.API_KEY || '' });

export const getAIInsights = async () => {
  try {
    const stats = await dbService.getDashboardStats();
    const orders = await dbService.getRecentOrders();
    
    const prompt = `
      بصفتك محلل نظم وقواعد بيانات، قمت بجلب هذه البيانات من قاعدة بيانات متجر الخيام:
      - الإحصائيات: ${JSON.stringify(stats)}
      - عدد الطلبات الأخيرة: ${orders.length}
      
      المطلوب تقديم تحليل تقني وتجاري سريع:
      1. تقييم أداء المبيعات بناءً على البيانات.
      2. اكتشاف أي نمط غير اعتيادي في الطلبات.
      3. نصيحة تقنية لتحسين الربط البرمجي.
      
      الرد بصيغة JSON حصراً:
      {
        "analysis": "...",
        "inventoryTip": "...",
        "prediction": "..."
      }
    `;

    const response = await ai.models.generateContent({
      model: 'gemini-3-flash-preview',
      contents: prompt,
      config: {
        responseMimeType: "application/json",
      }
    });

    return JSON.parse(response.text || '{}');
  } catch (error) {
    console.error("AI Insight Error:", error);
    return {
      analysis: "فشل الاتصال بمحرك التحليل الذكي.",
      inventoryTip: "تأكد من استقرار الـ API الخاص بقاعدة البيانات.",
      prediction: "لا توجد توقعات حالياً."
    };
  }
};
