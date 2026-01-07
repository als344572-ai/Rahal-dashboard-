
import { GoogleGenAI } from "@google/genai";
import { dbService } from "./databaseService";

const ai = new GoogleGenAI({ apiKey: process.env.API_KEY || '' });

export const getAIInsights = async () => {
  try {
    const stats = await dbService.getDashboardStats();
    const orders = await dbService.getRecentOrders();
    
    const prompt = `
      بصفتك خبير استراتيجي في تجارة الخيام والرحلات، قم بتحليل البيانات التالية المستخرجة من قاعدة البيانات:
      - إجمالي المبيعات: ${stats.totalSales} دينار
      - معدل النمو: ${stats.growthRate}%
      - الطلبات الأخيرة: ${JSON.stringify(orders.map(o => ({ product: o.product, amount: o.amount })))}
      
      المطلوب تقديم تحليل عميق يركز على:
      1. تحليل أداء المخزون الحالي.
      2. تقديم "خطة عمل فورية" (Action Plan) لتحسين المخزون وتجنب النقص أو التكدس.
      3. استخراج 5 كلمات مفتاحية (Keywords) تصف الحالة الحالية للسوق.
      
      يجب أن يكون الرد بصيغة JSON حصراً بهذا الهيكل:
      {
        "analysis": "ملخص التحليل العام",
        "actionPlan": ["نصيحة 1", "نصيحة 2", "نصيحة 3"],
        "keywords": ["كلمة 1", "كلمة 2", "..."],
        "inventoryStatus": "مرتفع/متوازن/منخفض"
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
      actionPlan: ["تأكد من استقرار الـ API الخاص بقاعدة البيانات", "راجع مستويات المخزون يدوياً"],
      keywords: ["خطأ في الاتصال", "فشل المزامنة"],
      inventoryStatus: "غير معروف"
    };
  }
};
