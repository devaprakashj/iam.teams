"use client";
import React from 'react';
import { CreditCard, TrendingUp, UserMinus, DollarSign, AlertCircle, CheckCircle2, CloudLightning } from 'lucide-react';
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from 'recharts';

const revenueTrendData = [
  { month: 'Jan', pro: 1.2, proAnnual: 1.0, premium: 0.5 },
  { month: 'Feb', pro: 1.4, proAnnual: 1.1, premium: 0.6 },
  { month: 'Mar', pro: 1.3, proAnnual: 1.2, premium: 0.7 },
  { month: 'Apr', pro: 1.6, proAnnual: 1.3, premium: 0.6 },
  { month: 'May', pro: 1.8, proAnnual: 1.4, premium: 0.8 },
  { month: 'Jun', pro: 1.7, proAnnual: 1.5, premium: 0.9 },
  { month: 'Jul', pro: 2.0, proAnnual: 1.6, premium: 1.0 },
];

const transactions = [
  { date: 'Mar 15', user: 'Devaprakash J', plan: 'Pro Monthly', amount: '₹59', status: 'Success', id: 'pay_xyz123' },
  { date: 'Mar 15', user: 'Priya R', plan: 'Premium Annual', amount: '₹999', status: 'Success', id: 'pay_abc456' },
  { date: 'Mar 14', user: 'Arun K', plan: 'Pro Annual', amount: '₹499', status: 'Failed', id: 'pay_def789' },
  { date: 'Mar 14', user: 'RIT Chennai', plan: 'College Plan', amount: '₹2,00,000', status: 'Success', id: 'pay_ghi012' },
];

const MetricCard = ({ title, value, color, icon: Icon }: any) => (
  <div className="p-6 bg-[#111118] border border-[#1E1E2E] rounded-2xl">
    <div className="flex justify-between items-start mb-4">
      <div className="p-3 bg-[#1E1E2E] rounded-xl" style={{ color: color }}>
        <Icon size={20} />
      </div>
      <CheckCircle2 size={16} className="text-[#64748B] opacity-20" />
    </div>
    <p className="text-[10px] font-black text-[#64748B] uppercase tracking-widest mb-1 font-mono">{title}</p>
    <h3 className="text-2xl font-black text-white italic font-syne">{value}</h3>
  </div>
);

export const AdminRevenue = () => {
  return (
    <div className="space-y-8 animate-in fade-in slide-in-from-bottom-4 duration-500">
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
        <MetricCard title="MRR" value="₹5.2L" color="#6C3CE1" icon={DollarSign} />
        <MetricCard title="ARR" value="₹62.4L" color="#6EE7B7" icon={TrendingUp} />
        <MetricCard title="New Revenue" value="₹42K" color="#FF6B35" icon={CloudLightning} />
        <MetricCard title="Churn Rate" value="2.3%" color="#60A5FA" icon={UserMinus} />
      </div>

      <div className="p-8 bg-[#111118] border border-[#1E1E2E] rounded-[32px]">
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-6 mb-10">
          <h3 className="text-xl font-black font-syne uppercase italic tracking-tighter">12-Month MRR Trend</h3>
          <div className="flex gap-6">
            <div className="flex items-center gap-2"><div className="w-2 h-2 rounded-full bg-[#6C3CE1]" /><span className="text-[10px] font-black uppercase text-[#64748B]">Pro Monthly</span></div>
            <div className="flex items-center gap-2"><div className="w-2 h-2 rounded-full bg-[#6EE7B7]" /><span className="text-[10px] font-black uppercase text-[#64748B]">Pro Annual</span></div>
            <div className="flex items-center gap-2"><div className="w-2 h-2 rounded-full bg-[#FF6B35]" /><span className="text-[10px] font-black uppercase text-[#64748B]">Premium</span></div>
          </div>
        </div>
        <div className="h-80 w-full">
          <ResponsiveContainer width="100%" height="100%">
            <LineChart data={revenueTrendData}>
              <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#1E1E2E" />
              <XAxis dataKey="month" axisLine={false} tickLine={false} tick={{ fill: '#64748B', fontSize: 10, fontWeight: 'bold' }} />
              <YAxis axisLine={false} tickLine={false} tick={{ fill: '#64748B', fontSize: 10, fontWeight: 'bold' }} tickFormatter={(val) => `₹${val}L`} />
              <Tooltip contentStyle={{ backgroundColor: '#111118', border: '1px solid #1E1E2E', borderRadius: '12px' }} />
              <Line type="monotone" dataKey="pro" stroke="#6C3CE1" strokeWidth={4} dot={false} />
              <Line type="monotone" dataKey="proAnnual" stroke="#6EE7B7" strokeWidth={4} dot={false} />
              <Line type="monotone" dataKey="premium" stroke="#FF6B35" strokeWidth={4} dot={false} />
            </LineChart>
          </ResponsiveContainer>
        </div>
      </div>

      <div className="bg-[#111118] border border-[#1E1E2E] rounded-[32px] overflow-hidden">
        <div className="p-8 border-b border-[#1E1E2E]">
          <h3 className="text-xl font-black uppercase italic font-syne tracking-tighter">Recent Transactions</h3>
        </div>
        <div className="overflow-x-auto">
          <table className="w-full text-left">
            <thead>
              <tr className="bg-[#16161D] text-[10px] font-black text-[#64748B] uppercase tracking-[0.2em] font-mono">
                <th className="px-8 py-5">Date</th>
                <th className="px-8 py-5">User</th>
                <th className="px-8 py-5">Plan</th>
                <th className="px-8 py-5">Amount</th>
                <th className="px-8 py-5">Status</th>
                <th className="px-8 py-5">Payment ID</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-[#1E1E2E]">
              {transactions.map((tx, i) => (
                <tr key={i} className="hover:bg-white/5 transition-colors">
                  <td className="px-8 py-5 text-xs font-bold font-mono text-[#64748B] uppercase italic">{tx.date}</td>
                  <td className="px-8 py-5 font-black text-sm uppercase tracking-tight">{tx.user}</td>
                  <td className="px-8 py-5 text-[10px] font-black uppercase text-[#64748B]">{tx.plan}</td>
                  <td className="px-8 py-5 text-sm font-black font-mono">₹{tx.amount}</td>
                  <td className="px-8 py-5">
                    <span className={`px-2.5 py-1 rounded-md text-[9px] font-black uppercase tracking-widest ${tx.status === 'Success' ? 'bg-[#6EE7B7]/10 text-[#6EE7B7]' : tx.status === 'Failed' ? 'bg-[#FF6B35]/10 text-[#FF6B35]' : 'bg-[#FBBF24]/10 text-[#FBBF24]'}`}>
                      {tx.status} {tx.status === 'Success' ? '✓' : '✗'}
                    </span>
                  </td>
                  <td className="px-8 py-5 text-[10px] font-bold text-[#64748B] font-mono">{tx.id}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      <div className="p-8 bg-[#111118] border border-[#FF6B35]/20 rounded-[32px] border-l-4 border-l-[#FF6B35]">
        <div className="flex items-center justify-between mb-6">
          <div className="flex items-center gap-3">
             <AlertCircle className="text-[#FF6B35]" size={20} />
             <h3 className="text-sm font-black uppercase tracking-widest italic font-mono text-[#FF6B35]">FAILED_PAYMENTS_DETECTION</h3>
          </div>
          <span className="text-[10px] font-black bg-[#FF6B35] text-white px-2 py-0.5 rounded uppercase">3 Attention Required</span>
        </div>
        <div className="space-y-4">
           {['Arun K', 'Sanjiv M', 'Deepa R'].map((name) => (
             <div key={name} className="flex items-center justify-between p-4 bg-[#0A0A0F] rounded-2xl border border-[#1E1E2E]">
                <div className="flex items-center gap-4">
                  <div className="w-8 h-8 rounded-full bg-[#1E1E2E] flex items-center justify-center font-black text-[10px] italic">TX</div>
                  <div>
                    <p className="text-xs font-black uppercase">{name}</p>
                    <p className="text-[9px] text-[#64748B] font-bold">Failed for Pro Annual (₹499)</p>
                  </div>
                </div>
                <button className="px-4 py-2 bg-[#FF6B35] text-white rounded-lg text-[9px] font-black uppercase tracking-widest hover:opacity-90">Retry Hook</button>
             </div>
           ))}
        </div>
      </div>
    </div>
  );
};
