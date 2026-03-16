"use client";
import React from 'react';
import { Plus, Globe, Users, Target, DollarSign, ExternalLink, Pencil, FileText } from 'lucide-react';

const colleges = [
  { name: 'RIT Chennai', location: 'Chennai TN', students: 1240, placed: '70.6%', score: 82, revenue: '₹3L', since: 'Jan 2025' },
  { name: 'VIT Vellore', location: 'Vellore TN', students: 3400, placed: '68.2%', score: 78, revenue: '₹5L', since: 'Dec 2024' },
  { name: 'SRM Chennai', location: 'Chennai TN', students: 2800, placed: '65.1%', score: 74, revenue: '₹4L', since: 'Feb 2025' },
];

const MetricCard = ({ title, value, color, icon: Icon }: any) => (
  <div className="p-6 bg-[#111118] border border-[#1E1E2E] rounded-2xl">
    <div className="p-3 bg-[#1E1E2E] rounded-xl w-fit mb-4" style={{ color: color }}>
      <Icon size={20} />
    </div>
    <p className="text-[10px] font-black text-[#64748B] uppercase tracking-widest mb-1 font-mono">{title}</p>
    <h3 className="text-2xl font-black text-white italic font-syne">{value}</h3>
  </div>
);

export const AdminColleges = () => {
  return (
    <div className="space-y-8 animate-in fade-in slide-in-from-bottom-4 duration-500">
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-6">
        <div className="space-y-1">
          <h2 className="text-2xl font-black font-syne uppercase italic tracking-tighter">College Partners</h2>
          <p className="text-[10px] font-black text-[#64748B] uppercase tracking-[0.2em] font-mono italic">Manage institutional partnerships</p>
        </div>
        <button className="flex items-center gap-2 px-6 py-3 bg-[#6C3CE1] text-white rounded-2xl font-black text-xs uppercase tracking-widest hover:opacity-90 shadow-xl shadow-[#6C3CE1]/20 transition-all active:scale-95">
          <Plus size={16} /> Add College Partner
        </button>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
        <MetricCard title="Active Colleges" value="23" color="#6C3CE1" icon={Globe} />
        <MetricCard title="Total Students" value="45,230" color="#6EE7B7" icon={Users} />
        <MetricCard title="Total Revenue" value="₹46L" color="#FF6B35" icon={DollarSign} />
        <MetricCard title="Avg Placement" value="74%" color="#60A5FA" icon={Target} />
      </div>

      <div className="bg-[#111118] border border-[#1E1E2E] rounded-[32px] overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full text-left">
            <thead>
              <tr className="bg-[#16161D] text-[10px] font-black text-[#64748B] uppercase tracking-[0.2em] font-mono">
                <th className="px-8 py-5">College</th>
                <th className="px-8 py-5">Location</th>
                <th className="px-8 py-5">Students</th>
                <th className="px-8 py-5">Placed %</th>
                <th className="px-8 py-5">Avg ATS</th>
                <th className="px-8 py-5">Revenue</th>
                <th className="px-8 py-5">Since</th>
                <th className="px-8 py-5">Status</th>
                <th className="px-8 py-5 text-right">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-[#1E1E2E]">
              {colleges.map((c, i) => (
                <tr key={i} className="hover:bg-white/5 transition-colors group">
                  <td className="px-8 py-5 font-black text-sm uppercase tracking-tight text-white">{c.name}</td>
                  <td className="px-8 py-5 text-xs font-bold text-[#64748B] font-mono">{c.location}</td>
                  <td className="px-8 py-5 text-sm font-black font-mono">{c.students}</td>
                  <td className="px-8 py-5 text-sm font-black font-mono text-[#6EE7B7]">{c.placed}</td>
                  <td className="px-8 py-5 text-sm font-black font-mono text-[#60A5FA]">{c.score}</td>
                  <td className="px-8 py-5 text-sm font-black font-mono text-[#FF6B35]">{c.revenue}</td>
                  <td className="px-8 py-5 text-[10px] font-bold text-[#64748B] font-mono uppercase">{c.since}</td>
                  <td className="px-8 py-5">
                    <span className="px-2.5 py-1 bg-[#6EE7B7]/10 text-[#6EE7B7] rounded-md text-[9px] font-black uppercase tracking-widest italic">Active ✓</span>
                  </td>
                  <td className="px-8 py-5 text-right">
                    <div className="flex items-center justify-end gap-2">
                       <button className="p-2 bg-[#1E1E2E] hover:bg-[#6C3CE1] text-[#64748B] hover:text-white rounded-lg transition-all" title="View"><ExternalLink size={14} /></button>
                       <button className="p-2 bg-[#1E1E2E] hover:bg-[#FBBF24] text-[#64748B] hover:text-white rounded-lg transition-all" title="Edit"><Pencil size={14} /></button>
                       <button className="p-2 bg-[#1E1E2E] hover:bg-[#FF6B35] text-[#64748B] hover:text-white rounded-lg transition-all" title="Invoice"><FileText size={14} /></button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
      
      <button className="w-full py-5 bg-[#111118] border border-[#1E1E2E] border-dashed rounded-[24px] text-[10px] font-black text-[#64748B] uppercase tracking-[0.2em] hover:border-[#6C3CE1]/40 hover:text-[#E2E8F0] transition-all">
        + Add New College Partner
      </button>
    </div>
  );
};
