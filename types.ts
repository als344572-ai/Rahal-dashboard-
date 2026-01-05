
export interface SaleRecord {
  month: string;
  sales: number;
  orders: number;
  expenses: number;
}

export interface CategoryData {
  name: string;
  value: number;
  icon: string; // SVG path or identifier
}

export interface Order {
  id: string;
  customer: string;
  product: string;
  amount: number;
  status: 'تم التوصيل' | 'قيد المعالجة' | 'ملغي';
  date: string;
}

export interface DashboardStats {
  totalSales: number;
  totalOrders: number;
  totalCustomers: number;
  avgOrderValue: number;
  growthRate: number;
}