"use client";
import React from 'react';
import { motion } from 'framer-motion';
import { Users, ShieldCheck, CreditCard, Globe, ArrowUpRight, PieChart } from 'lucide-react';
import { BarChart, Bar, XAxis, YAxis, Tooltip, ResponsiveContainer, Cell, LineChart, Line, CartesianGrid } from 'recharts';

const userGrowthData = [
  { day: 'Mon', count: 420 },
  { day: 'Tue', count: 380 },
  { day: 'Wed', count: 512 },
  { day: 'Thu', count: 480 },
  { day: 'Fri', count: 620 },
  { day: 'Sat', count: 310 },
  { day: 'Sun', count: 650 },
];

const revenueTrendData = [
  { month: 'Jan', proMonthly: 1.2, proAnnual: 1.0, premium: 0.5 },
  { month: 'Feb', proMonthly: 1.4, proAnnual: 1.1, premium: 0.6 },
  { month: 'Mar', proMonthly: 1.3, proAnnual: 1.2, premium: 0.7 },
  { month: 'Apr', proMonthly: 1.6, proAnnual: 1.3, premium: 0.6 },
  { month: 'May', proMonthly: 1.8, proAnnual: 1.4, premium: 0.8 },
  { month: 'Jun', proMonthly: 1.7, proAnnual: 1.5, premium: 0.9 },
  { month: 'Jul', proMonthly: 2.0, proAnnual: 1.6, premium: 1.0 },
  { month: 'Aug', proMonthly: 1.9, proAnnual: 1.7, premium: 1.1 },
  { month: 'Sep', proMonthly: 2.1, proAnnual: 1.8, premium: 1.2 },
  { month: 'Oct', proMonthly: 2.3, proAnnual: 1.9, premium: 1.3 },
  { month: 'Nov', proMonthly: 2.4, proAnnual: 2.0, premium: 1.4 },
  { month: 'Dec', proMonthly: 2.6, proAnnual: 2.1, premium: 1.5 },
];

const MetricCard = ({ title, value, detail, color, icon: Icon }: any) => (
  <div className="p-6 bg-[#111118] border border-[#1E1E2E] rounded-2xl hover:border-[#6C3CE1]/30 transition-all group">
    <div className="flex justify-between items-start mb-4">
      <div className={`p-3 rounded-xl bg-opacity-10`} style={{ backgroundColor: `${color}1A`, color: color }}>
        <Icon size={20} />
      </div>
      <span className="text-[10px] font-black text-[#6EE7B7] bg-[#6EE7B7]/10 px-2 py-1 rounded-full uppercase tracking-widest italic">{detail.split(' ')[0]}</span>
    </div>
    <p className="text-[10px] font-black text-[#64748B] uppercase tracking-[0.2em] mb-1 font-mono">{title}</p>
    <h3 className="text-3xl font-black text-[#E2E8F0] font-syne italic">{value}</h3>
    <p className="text-[10px] font-bold text-[#64748B] mt-2 font-mono italic opacity-60">{detail}</p>
  </div>
);

export const AdminOverview = () => {
  return (
    <div className="space-y-8 animate-in fade-in duration-500">
      <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-4 gap-6">
        <MetricCard title="Total Users" value="52,341" detail="↑ +1,243 this week" color="#6C3CE1" icon={Users} />
        <MetricCard title="Pro/Premium Users" value="8,921" detail="↑ +234 this week" color="#6EE7B7" icon={ShieldCheck} />
        <MetricCard title="Monthly Revenue (MRR)" value="₹5.2L" detail="↑ +₹42K this month" color="#FF6B35" icon={CreditCard} />
        <MetricCard title="College Partners" value="23" detail="↑ +3 this month" color="#60A5FA" icon={Globe} />
      </div>

      <div className="grid grid-cols-1 xl:grid-cols-2 gap-8">
        <div className="p-8 bg-[#111118] border border-[#1E1E2E] rounded-[32px] flex flex-col">
          <div className="flex items-center justify-between mb-8">
            <h3 className="text-sm font-black uppercase tracking-widest italic font-mono text-[#64748B]">// REVENUE_BREAKDOWN</h3>
            <ArrowUpRight className="text-[#6C3CE1] w-5 h-5" />
          </div>
          <div className="space-y-6 flex-1">
            {[
              { label: 'Pro Monthly (₹59)', val: '₹2.1L' },
              { label: 'Pro Annual (₹499)', val: '₹1.8L' },
              { label: 'Premium Annual (₹999)', val: '₹89K' },
              { label: 'College Plans', val: '₹1.2L' },
            ].map((item, i) => (
              <div key={i} className="flex items-center justify-between">
                <span className="text-xs font-bold text-[#64748B] tracking-wide">{item.label}</span>
                <div className="flex-1 mx-4 border-b border-[#1E1E2E] border-dotted opacity-30" />
                <span className="text-sm font-black text-[#E2E8F0] font-mono">{item.val}</span>
              </div>
            ))}
            <div className="pt-6 border-t border-[#1E1E2E] flex items-center justify-between">
              <span className="text-sm font-black uppercase tracking-[0.2em] italic">Total MRR</span>
              <span className="text-2xl font-black text-[#6C3CE1] font-syne italic">₹5.2L</span>
            </div>
          </div>
        </div>

        <div className="p-8 bg-[#111118] border border-[#1E1E2E] rounded-[32px]">
          <div className="flex items-center justify-between mb-8">
            <h3 className="text-sm font-black uppercase tracking-widest italic font-mono text-[#64748B]">// USER_GROWTH_7D</h3>
            <PieChart size={16} className="text-[#64748B]" />
          </div>
          <div className="h-64 w-full">
            <ResponsiveContainer width="100%" height="100%">
              <BarChart data={userGrowthData}>
                <XAxis dataKey="day" axisLine={false} tickLine={false} tick={{ fill: '#64748B', fontSize: 10, fontWeight: 'bold' }} />
                <YAxis hide />
                <Tooltip 
                  cursor={{ fill: '#1E1E2E', radius: 8 }}
                  contentStyle={{ backgroundColor: '#111118', border: '1px solid #1E1E2E', borderRadius: '12px' }}
                  itemStyle={{ color: '#E2E8F0', fontSize: '12px', fontWeight: 'bold' }}
                />
                <Bar dataKey="count" radius={[6, 6, 0, 0]}>
                  {userGrowthData.map((entry, index) => (
                    <Cell key={`cell-${index}`} fill={index === userGrowthData.length - 1 ? '#6EE7B7' : '#6C3CE1'} />
                  ))}
                </Bar>
              </BarChart>
            </ResponsiveContainer>
          </div>
        </div>
      </div>
    </div>
  );
};
