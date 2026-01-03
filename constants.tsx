
import { SaleRecord, CategoryData, Order, DashboardStats } from './types';

export const MOCK_SALES_DATA: SaleRecord[] = [
  { month: 'يناير', sales: 45000, orders: 120, expenses: 32000 },
  { month: 'فبراير', sales: 52000, orders: 150, expenses: 35000 },
  { month: 'مارس', sales: 48000, orders: 135, expenses: 33000 },
  { month: 'أبريل', sales: 61000, orders: 180, expenses: 40000 },
  { month: 'مايو', sales: 55000, orders: 160, expenses: 38000 },
  { month: 'يونيو', sales: 67000, orders: 200, expenses: 42000 },
];

export const CATEGORY_DATA: CategoryData[] = [
  { name: 'خيام ملكية', value: 45 },
  { name: 'خيام رحلات', value: 25 },
  { name: 'خيام شفافة', value: 20 },
  { name: 'ملحقات', value: 10 },
];

export const RECENT_ORDERS: Order[] = [
  { id: '#1001', customer: 'أحمد محمد', product: 'خيمة ملكية 4*6', amount: 4500, status: 'تم التوصيل', date: '2023-10-25' },
  { id: '#1002', customer: 'سارة خالد', product: 'خيمة رحلات سهلة الفك', amount: 850, status: 'قيد المعالجة', date: '2023-10-26' },
  { id: '#1003', customer: 'فيصل العتيبي', product: 'خيمة شفافة للمناسبات', amount: 12000, status: 'تم التوصيل', date: '2023-10-24' },
  { id: '#1004', customer: 'نورة عبدالله', product: 'طقم جلسة تراثي', amount: 2200, status: 'ملغي', date: '2023-10-23' },
  { id: '#1005', customer: 'محمد القحطاني', product: 'خيمة بيت شعر', amount: 8000, status: 'قيد المعالجة', date: '2023-10-27' },
];

export const DASHBOARD_STATS: DashboardStats = {
  totalSales: 328000,
  totalOrders: 945,
  totalCustomers: 720,
  avgOrderValue: 347,
  growthRate: 12.5,
};

export const COLORS = ['#0f172a', '#1e293b', '#334155', '#475569', '#64748b'];
