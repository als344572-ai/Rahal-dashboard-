
import React, { useState, useEffect } from 'react';
import { dbService } from '../services/databaseService';

export const ConnectionBadge: React.FC = () => {
  const [status, setStatus] = useState<'online' | 'syncing' | 'offline'>('syncing');

  useEffect(() => {
    const check = async () => {
      const isOk = await dbService.checkConnection();
      setStatus(isOk ? 'online' : 'offline');
    };
    check();
  }, []);

  return (
    <div className="flex items-center gap-2 px-3 py-1.5 bg-white border border-slate-200 rounded-full shadow-sm">
      <div className={`w-2 h-2 rounded-full ${
        status === 'online' ? 'bg-green-500 animate-pulse' : 
        status === 'syncing' ? 'bg-amber-500 animate-bounce' : 'bg-red-500'
      }`}></div>
      <span className="text-xs font-bold text-slate-600 uppercase tracking-wider">
        {status === 'online' ? 'قاعدة البيانات: متصلة' : 
         status === 'syncing' ? 'جاري المزامنة...' : 'فشل الاتصال'}
      </span>
    </div>
  );
};
