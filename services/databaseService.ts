
import { Order, DashboardStats, SaleRecord } from '../types';
import { MOCK_SALES_DATA, RECENT_ORDERS, DASHBOARD_STATS } from '../constants';

/**
 * هذا الكلاس يمثل الجسر بين واجهة المستخدم وقاعدة بياناتك الحقيقية.
 * يمكنك استبدال الموك داتا بطلبات fetch حقيقية لـ API متجرك.
 */
class DatabaseService {
  private static instance: DatabaseService;
  private isConnected: boolean = true;

  private constructor() {}

  public static getInstance(): DatabaseService {
    if (!DatabaseService.instance) {
      DatabaseService.instance = new DatabaseService();
    }
    return DatabaseService.instance;
  }

  // محاكاة جلب الإحصائيات من الـ Backend
  async getDashboardStats(): Promise<DashboardStats> {
    await new Promise(resolve => setTimeout(resolve, 800)); // محاكاة تأخير الشبكة
    return DASHBOARD_STATS;
  }

  // محاكاة جلب الطلبات الأخيرة من قاعدة البيانات
  async getRecentOrders(): Promise<Order[]> {
    await new Promise(resolve => setTimeout(resolve, 1000));
    return RECENT_ORDERS;
  }

  // محاكاة تحديث حالة طلب في قاعدة البيانات
  async updateOrderStatus(orderId: string, status: string): Promise<boolean> {
    console.log(`Updating order ${orderId} to ${status} in database...`);
    return true;
  }

  // التحقق من حالة الاتصال بخادم قاعدة البيانات
  async checkConnection(): Promise<boolean> {
    return this.isConnected;
  }
}

export const dbService = DatabaseService.getInstance();
