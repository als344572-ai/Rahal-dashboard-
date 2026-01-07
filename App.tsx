
import React, { useState, useEffect } from 'react';
import { AreaChart, Area, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, PieChart, Pie, Cell } from 'recharts';
import { Sidebar } from './components/Sidebar';
import { StatCard } from './components/StatCard';
import { ConnectionBadge } from './components/ConnectionBadge';
import { MOCK_SALES_DATA, CATEGORY_DATA, COLORS } from './constants';
import { getAIInsights } from './services/geminiService';
import { dbService } from './services/databaseService';
import { Order, DashboardStats } from './types';

const App: React.FC = () => {
  const [aiAnalysis, setAiAnalysis] = useState<any>(null);
  const [loadingAI, setLoadingAI] = useState(true);
  const [stats, setStats] = useState<DashboardStats | null>(null);
  const [orders, setOrders] = useState<Order[]>([]);
  const [loadingData, setLoadingData] = useState(true);

  const fetchData = async () => {
    setLoadingData(true);
    try {
      const [fetchedStats, fetchedOrders] = await Promise.all([
        dbService.getDashboardStats(),
        dbService.getRecentOrders()
      ]);
      setStats(fetchedStats);
      setOrders(fetchedOrders);
    } catch (err) {
      console.error("Data fetch error", err);
    } finally {
      setLoadingData(false);
    }
  };

  useEffect(() => {
    fetchData();
    const fetchInsights = async () => {
      setLoadingAI(true);
      const insights = await getAIInsights();
      setAiAnalysis(insights);
      setLoadingAI(false);
    };
    fetchInsights();
  }, []);

  return (
    <div className="min-h-screen bg-slate-50">
      <Sidebar />
      
      <main className="mr-64 p-8">
        {/* Header */}
        <header className="flex justify-between items-center mb-8">
          <div>
            <div className="flex items-center gap-4 mb-1">
              <h1 className="text-3xl font-bold text-slate-900">لوحة التحكم الإدارية</h1>
              <ConnectionBadge />
            </div>
            <p className="text-slate-500">مزامنة البيانات مباشرة من حساب قاعدة بياناتك</p>
          </div>
          <div className="flex gap-4">
            <button 
              onClick={() => { fetchData(); setLoadingAI(true); getAIInsights().then(setAiAnalysis).finally(() => setLoadingAI(false)); }}
              className="bg-white p-2 border border-slate-200 rounded-xl text-slate-600 hover:bg-slate-100 transition-colors"
              title="تحديث البيانات والتحليلات"
            >
              <svg className={`w-5 h-5 ${loadingData || loadingAI ? 'animate-spin' : ''}`} fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 4v5h.582m15.356 2A8.001 8.001 0 004.582 9m0 0H9m11 11v-5h-.581m0 0a8.003 8.003 0 01-15.357-2m15.357 2H15" /></svg>
            </button>
            <button className="bg-slate-900 text-white px-6 py-2 rounded-xl font-medium hover:bg-slate-800 transition-all flex items-center gap-2 shadow-lg shadow-slate-200">
              <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 6v6m0 0v6m0-6h6m-6 0H6" /></svg>
              إضافة طلب يدوياً
            </button>
          </div>
        </header>

        {/* Top Stats Section */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
          {loadingData ? (
            [...Array(4)].map((_, i) => (
              <div key={i} className="h-32 bg-white rounded-2xl animate-pulse border border-slate-100"></div>
            ))
          ) : (
            <>
              <StatCard 
                title="إجمالي مبيعات المتجر" 
                value={`${stats?.totalSales.toLocaleString()} دينار`}
                change="12%" 
                isPositive={true}
                icon={<svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 8c-1.657 0-3 .895-3 2s1.343 2 3 2 3 .895 3 2-1.343 2-3 2m0-8c1.11 0 2.08.402 2.599 1M12 8V7m0 1v8m0 0v1m0-1c-1.11 0-2.08-.402-2.599-1M21 12a9 9 0 11-18 0 9 9 0 0118 0z" /></svg>}
              />
              <StatCard 
                title="طلبات قيد التنفيذ" 
                value={stats?.totalOrders || 0}
                change="8%" 
                isPositive={true}
                icon={<svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M16 11V7a4 4 0 00-8 0v4M5 9h14l1 12H4L5 9z" /></svg>}
              />
              <StatCard 
                title="قاعدة العملاء" 
                value={stats?.totalCustomers || 0}
                change="5.4%" 
                isPositive={true}
                icon={<svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z" /></svg>}
              />
              <StatCard 
                title="معدل نمو النظام" 
                value={`${stats?.growthRate}%`}
                change="2%" 
                isPositive={false}
                icon={<svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M13 7h8m0 0v8m0-8l-8 8-4-4-6 6" /></svg>}
              />
            </>
          )}
        </div>

        {/* Charts & AI Analysis */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 mb-8">
          <div className="lg:col-span-2 bg-white p-6 rounded-2xl shadow-sm border border-slate-100">
            <div className="flex justify-between items-center mb-6">
              <h2 className="text-xl font-bold text-slate-900">تدفق المبيعات المباشر</h2>
              <div className="flex gap-2 text-xs font-bold text-slate-500">
                <span className="flex items-center gap-1 bg-blue-50 text-blue-600 px-2 py-1 rounded-md">6 شهور الأخيرة</span>
              </div>
            </div>
            <div className="h-80 w-full">
              <ResponsiveContainer width="100%" height="100%">
                <AreaChart data={MOCK_SALES_DATA}>
                  <defs>
                    <linearGradient id="colorSales" x1="0" y1="0" x2="0" y2="1">
                      <stop offset="5%" stopColor="#0f172a" stopOpacity={0.1}/>
                      <stop offset="95%" stopColor="#0f172a" stopOpacity={0}/>
                    </linearGradient>
                  </defs>
                  <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#f1f5f9" />
                  <XAxis dataKey="month" axisLine={false} tickLine={false} tick={{fill: '#64748b', fontSize: 12}} />
                  <YAxis axisLine={false} tickLine={false} tick={{fill: '#64748b', fontSize: 12}} />
                  <Tooltip 
                    contentStyle={{borderRadius: '12px', border: 'none', boxShadow: '0 4px 6px -1px rgb(0 0 0 / 0.1)'}}
                    formatter={(value: number) => [`${value.toLocaleString()} دينار`, 'المبيعات']}
                  />
                  <Area type="monotone" dataKey="sales" stroke="#0f172a" strokeWidth={3} fillOpacity={1} fill="url(#colorSales)" />
                </AreaChart>
              </ResponsiveContainer>
            </div>
          </div>

          <div className="space-y-8">
            {/* AI Insights & Action Plan */}
            <div className="bg-slate-900 text-white p-6 rounded-3xl shadow-2xl relative overflow-hidden flex flex-col min-h-[480px]">
              <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-indigo-500 via-purple-500 to-pink-500"></div>
              
              <div className="relative z-10 flex flex-col h-full">
                <div className="flex items-center justify-between mb-6">
                  <div className="flex items-center gap-3">
                    <div className="w-10 h-10 bg-white/10 backdrop-blur-md rounded-xl flex items-center justify-center border border-white/20">
                      <svg className="w-6 h-6 text-indigo-400" fill="currentColor" viewBox="0 0 20 20"><path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zM7 9H5v2h2V9zm8 0h-2v2h2V9zM9 9h2v2H9V9z" clipRule="evenodd" /></svg>
                    </div>
                    <div>
                      <h3 className="font-bold text-lg">تحليل Gemini الذكي</h3>
                      <span className="text-[10px] text-indigo-300 uppercase font-black tracking-widest">Actionable Intelligence</span>
                    </div>
                  </div>
                  {aiAnalysis?.inventoryStatus && (
                    <span className="text-[10px] bg-emerald-500/20 text-emerald-400 border border-emerald-500/30 px-2 py-1 rounded-lg font-bold">
                      مخزون: {aiAnalysis.inventoryStatus}
                    </span>
                  )}
                </div>

                {loadingAI ? (
                  <div className="space-y-4 animate-pulse">
                    <div className="h-4 bg-white/5 rounded w-full"></div>
                    <div className="h-4 bg-white/5 rounded w-5/6"></div>
                    <div className="h-32 bg-white/5 rounded-2xl w-full mt-6"></div>
                  </div>
                ) : (
                  <div className="flex flex-col flex-grow">
                    <p className="text-slate-300 text-sm leading-relaxed mb-6 border-r-2 border-indigo-500 pr-4">
                      {aiAnalysis?.analysis}
                    </p>

                    <div className="mb-6">
                      <h4 className="text-xs font-black text-indigo-400 uppercase tracking-tighter mb-3">كلمات مفتاحية للأداء:</h4>
                      <div className="flex flex-wrap gap-2">
                        {aiAnalysis?.keywords?.map((word: string, i: number) => (
                          <span key={i} className="text-[10px] bg-white/5 border border-white/10 px-2 py-1 rounded-md text-slate-300">
                            #{word}
                          </span>
                        ))}
                      </div>
                    </div>

                    <div className="bg-white/5 rounded-2xl p-4 border border-white/10 mt-auto">
                      <h4 className="text-sm font-bold text-white mb-3 flex items-center gap-2">
                        <svg className="w-4 h-4 text-amber-400" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M13 10V3L4 14h7v7l9-11h-7z" /></svg>
                        خطة العمل الفورية:
                      </h4>
                      <ul className="space-y-2">
                        {aiAnalysis?.actionPlan?.map((item: string, i: number) => (
                          <li key={i} className="flex gap-2 items-start text-xs text-slate-300">
                            <span className="w-4 h-4 bg-indigo-500/20 rounded flex-shrink-0 flex items-center justify-center text-[10px] text-indigo-400 font-bold">{i+1}</span>
                            {item}
                          </li>
                        ))}
                      </ul>
                    </div>
                  </div>
                )}
              </div>
            </div>

            {/* DB Health & Stats */}
            <div className="bg-white p-6 rounded-2xl border border-slate-100 shadow-sm">
              <h3 className="font-bold text-slate-900 mb-4 flex items-center gap-2">
                <svg className="w-5 h-5 text-blue-500" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 7v10c0 2.21 3.582 4 8 4s8-1.79 8-4V7M4 7c0 2.21 3.582 4 8 4s8-1.79 8-4M4 7c0-2.21 3.582-4 8-4s8 1.79 8 4m0 5c0 2.21-3.582 4-8 4s-8-1.79-8-4" /></svg>
                أداء السيرفر
              </h3>
              <div className="space-y-4">
                <div className="flex justify-between items-center text-sm">
                  <span className="text-slate-500">زمن الاستجابة</span>
                  <span className="text-green-600 font-bold">45ms</span>
                </div>
                <div className="w-full bg-slate-100 h-1.5 rounded-full overflow-hidden">
                  <div className="bg-green-500 h-full w-[85%]"></div>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Categories and Recent Orders */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 mb-8">
          {/* Category Distribution */}
          <div className="bg-white p-6 rounded-2xl shadow-sm border border-slate-100">
            <h2 className="text-xl font-bold text-slate-900 mb-6">توزيع الفئات</h2>
            <div className="h-64 relative mb-4">
              <ResponsiveContainer width="100%" height="100%">
                <PieChart>
                  <Pie
                    data={CATEGORY_DATA}
                    innerRadius={60}
                    outerRadius={80}
                    paddingAngle={5}
                    dataKey="value"
                  >
                    {CATEGORY_DATA.map((entry, index) => (
                      <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                    ))}
                  </Pie>
                  <Tooltip 
                    contentStyle={{borderRadius: '12px', border: 'none', boxShadow: '0 4px 6px -1px rgb(0 0 0 / 0.1)'}}
                  />
                </PieChart>
              </ResponsiveContainer>
              <div className="absolute inset-0 flex items-center justify-center pointer-events-none">
                <span className="text-xl font-bold text-slate-900">100%</span>
              </div>
            </div>
            
            <div className="space-y-3">
              {CATEGORY_DATA.map((cat, idx) => (
                <div key={cat.name} className="flex items-center justify-between p-2 rounded-xl hover:bg-slate-50 transition-colors">
                  <div className="flex items-center gap-3">
                    <div className="w-8 h-8 rounded-lg flex items-center justify-center" style={{ backgroundColor: `${COLORS[idx % COLORS.length]}15`, color: COLORS[idx % COLORS.length] }}>
                      <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d={cat.icon} />
                      </svg>
                    </div>
                    <span className="text-sm font-medium text-slate-700">{cat.name}</span>
                  </div>
                  <span className="text-sm font-bold text-slate-900">{cat.value}%</span>
                </div>
              ))}
            </div>
          </div>

          {/* Database Sync Table */}
          <div className="lg:col-span-2 bg-white rounded-2xl shadow-sm border border-slate-100 overflow-hidden">
            <div className="p-6 border-b border-slate-50 flex justify-between items-center">
              <h2 className="text-xl font-bold text-slate-900">سجل المعاملات المباشر</h2>
              <div className="flex gap-2">
                <input type="text" placeholder="ابحث في قاعدة البيانات..." className="text-xs border border-slate-200 rounded-lg px-3 py-1.5 focus:outline-none focus:ring-2 focus:ring-slate-900 w-64 text-right" dir="rtl" />
              </div>
            </div>
            <div className="overflow-x-auto">
              <table className="w-full text-right">
                <thead>
                  <tr className="bg-slate-50 text-slate-500 text-sm">
                    <th className="px-6 py-4 font-medium">رقم العملية</th>
                    <th className="px-6 py-4 font-medium">العميل</th>
                    <th className="px-6 py-4 font-medium">المنتج المحجوز</th>
                    <th className="px-6 py-4 font-medium">المبلغ</th>
                    <th className="px-6 py-4 font-medium">حالة المزامنة</th>
                    <th className="px-6 py-4 font-medium">التوقيت</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-slate-50 text-sm">
                  {loadingData ? (
                    [...Array(3)].map((_, i) => (
                      <tr key={i} className="animate-pulse">
                        <td colSpan={6} className="px-6 py-6 bg-slate-50/30"></td>
                      </tr>
                    ))
                  ) : (
                    orders.map((order) => (
                      <tr key={order.id} className="hover:bg-slate-50 transition-colors">
                        <td className="px-6 py-4 font-mono font-bold text-slate-900">{order.id}</td>
                        <td className="px-6 py-4">{order.customer}</td>
                        <td className="px-6 py-4">{order.product}</td>
                        <td className="px-6 py-4 font-bold text-slate-900">{order.amount.toLocaleString()} دينار</td>
                        <td className="px-6 py-4">
                          <span className={`flex items-center gap-1.5 px-2.5 py-1 rounded-full text-[10px] font-bold uppercase
                            ${order.status === 'تم التوصيل' ? 'bg-emerald-50 text-emerald-600 border border-emerald-100' : 
                              order.status === 'قيد المعالجة' ? 'bg-amber-50 text-amber-600 border border-amber-100' : 
                              'bg-rose-50 text-rose-600 border border-rose-100'}`}>
                            <span className={`w-1 h-1 rounded-full ${order.status === 'تم التوصيل' ? 'bg-emerald-600' : 'bg-rose-600'}`}></span>
                            {order.status}
                          </span>
                        </td>
                        <td className="px-6 py-4 text-slate-400">{order.date}</td>
                      </tr>
                    ))
                  )}
                </tbody>
              </table>
            </div>
          </div>
        </div>
      </main>
    </div>
  );
};

export default App;
