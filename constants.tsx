
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
  { 
    name: 'خيام ملكية', 
    value: 45, 
    icon: 'M2 4l3 12h14l3-12-6 7-4-7-4 7-6-7z' // Crown icon
  },
  { 
    name: 'خيام رحلات', 
    value: 25, 
    icon: 'M12 2L2 19h20L12 2zm0 4l6.5 11h-13L12 6z' // Tent icon
  },
  { 
    name: 'خيام شفافة', 
    value: 20, 
    icon: 'M21 16V8a2 2 0 0 0-1-1.73l-7-4a2 2 0 0 0-2 0l-7 4A2 2 0 0 0 3 8v8a2 2 0 0 0 1 1.73l7 4a2 2 0 0 0 2 0l7-4A2 2 0 0 0 21 16z' // Glass/Box icon
  },
  { 
    name: 'ملحقات', 
    value: 10, 
    icon: 'M19 11H5m14 0a2 2 0 0 1 2 2v6a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-6a2 2 0 0 1 2-2m14 0V9a2 2 0 0 0-2-2M5 11V9a2 2 0 0 1 2-2m0 0V5a2 2 0 0 1 2-2h6a2 2 0 0 1 2 2v2M7 7h10' // Bag icon
  },
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

export const COLORS = ['#0f172a', '#334155', '#475569', '#94a3b8', '#cbd5e1'];
