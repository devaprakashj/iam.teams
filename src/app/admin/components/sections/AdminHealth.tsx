"use client";
import React from 'react';
import { Activity, Zap, Server, Database, ShieldCheck, Mail, Cpu, HardDrive, BarChart3 } from 'lucide-react';

const services = [
  { name: 'API Server', status: 'Online', latency: '12ms', uptime: '99.9%', color: '#6EE7B7' },
  { name: 'Database (Firestore)', status: 'Online', latency: '8ms', uptime: '99.8%', color: '#6EE7B7' },
  { name: 'Redis Cache', status: 'Online', latency: '2ms', uptime: '100%', color: '#6EE7B7' },
  { name: 'Supabase Storage', status: 'Online', latency: '45ms', uptime: '99.7%', color: '#6EE7B7' },
  { name: 'Razorpay API', status: 'Online', latency: '234ms', uptime: '99.5%', color: '#6EE7B7' },
  { name: 'Resume Generator', status: 'Online', latency: '1.2s', uptime: '99.1%', color: '#6EE7B7' },
  { name: 'Email Service', status: 'Slow', latency: '892ms', uptime: '98.2%', color: '#FBBF24' },
  { name: 'AI/ML API', status: 'Online', latency: '340ms', uptime: '99.3%', color: '#6EE7B7' },
];

const errorLogs = [
  { time: 'Mar 15 14:32', service: 'Email Service', error: 'SMTP timeout', count: 3 },
  { time: 'Mar 15 12:11', service: 'Resume Gen', error: 'PDF render fail', count: 1 },
  { time: 'Mar 14 23:45', service: 'Razorpay', error: 'Payment webhook delay', count: 2 },
];

const ServiceCard = ({ name, status, latency, uptime, color }: any) => (
  <div className="p-6 bg-[#111118] border border-[#1E1E2E] rounded-[24px] hover:border-[#6C3CE1]/30 transition-all">
    <div className="flex justify-between items-center mb-4">
      <span className="text-[10px] font-black text-[#64748B] uppercase tracking-widest font-mono">{name}</span>
      <div className={`flex items-center gap-1.5 px-2 py-0.5 rounded-full bg-opacity-10 text-[8px] font-black uppercase tracking-widest`} style={{ backgroundColor: `${color}1A`, color: color }}>
        <div className={`w-1 h-1 rounded-full animate-pulse`} style={{ backgroundColor: color }} />
        {status}
      </div>
    </div>
    <div className="flex justify-between items-end">
       <div className="space-y-1">
          <p className="text-xl font-black italic font-syne text-white">{latency}</p>
          <p className="text-[9px] font-bold text-[#64748B] uppercase">Response Time</p>
       </div>
       <div className="text-right">
          <p className="text-sm font-black text-[#6EE7B7] font-mono">{uptime}</p>
          <p className="text-[9px] font-bold text-[#64748B] uppercase">Uptime</p>
       </div>
    </div>
  </div>
);

export const AdminHealth = () => {
  return (
    <div className="space-y-8 animate-in fade-in slide-in-from-bottom-4 duration-500">
      <div className="flex items-center justify-between">
        <div className="space-y-1">
          <h2 className="text-2xl font-black font-syne uppercase italic tracking-tighter">System Health</h2>
          <p className="text-[10px] font-black text-[#64748B] uppercase tracking-[0.2em] font-mono italic">All systems operational</p>
        </div>
        <div className="flex items-center gap-2 px-4 py-2 bg-[#6EE7B7]/10 border border-[#6EE7B7]/20 rounded-full">
          <div className="w-2 h-2 rounded-full bg-[#6EE7B7] animate-pulse" />
          <span className="text-[10px] font-black text-[#6EE7B7] uppercase tracking-[0.2em] font-mono italic">● LIVE</span>
        </div>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
        {services.map((s, i) => (
          <ServiceCard key={i} {...s} />
        ))}
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
        <div className="p-8 bg-[#111118] border border-[#1E1E2E] rounded-[32px]">
           <div className="flex items-center justify-between mb-8">
              <h3 className="text-sm font-black uppercase tracking-widest italic font-mono text-[#64748B]">// RECENT_ERRORS_LOG</h3>
              <Activity size={16} className="text-[#FF6B35]" />
           </div>
           <div className="overflow-x-auto">
             <table className="w-full text-left">
                <thead className="text-[10px] font-black text-[#64748B] uppercase tracking-widest border-b border-[#1E1E2E]">
                   <tr>
                      <th className="pb-4">Timestamp</th>
                      <th className="pb-4">Service</th>
                      <th className="pb-4">Error</th>
                      <th className="pb-4 text-right">Count</th>
                   </tr>
                </thead>
                <tbody className="divide-y divide-[#1E1E2E]">
                   {errorLogs.map((log, i) => (
                      <tr key={i} className="hover:bg-white/5 transition-colors">
                         <td className="py-4 text-[10px] font-bold font-mono text-[#64748B] uppercase">{log.time}</td>
                         <td className="py-4 text-[11px] font-black uppercase text-white tracking-widest">{log.service}</td>
                         <td className="py-4 text-xs font-bold text-[#FF6B35] font-mono italic">{log.error}</td>
                         <td className="py-4 text-right">
                            <span className="px-2 py-0.5 bg-[#FF6B35]/10 text-[#FF6B35] rounded font-mono text-xs font-black">{log.count}</span>
                         </td>
                      </tr>
                   ))}
                </tbody>
             </table>
           </div>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
           {[
             { label: 'CPU Usage', value: '14%', icon: Cpu, color: '#6C3CE1' },
             { label: 'RAM Load', value: '4.2GB', icon: HardDrive, color: '#6EE7B7' },
             { label: 'API Requests', value: '2.4k/m', icon: BarChart3, color: '#FF6B35' },
             { label: 'Active WebSockets', value: '124', icon: Activity, color: '#60A5FA' },
           ].map((stat) => (
             <div key={stat.label} className="p-6 bg-[#111118] border border-[#1E1E2E] rounded-[24px] flex flex-col justify-between">
                <div className="p-3 bg-[#1E1E2E] rounded-xl w-fit" style={{ color: stat.color }}>
                   <stat.icon size={20} />
                </div>
                <div>
                   <p className="text-[10px] font-black text-[#64748B] uppercase tracking-widest">{stat.label}</p>
                   <p className="text-3xl font-black italic font-syne text-white">{stat.value}</p>
                </div>
             </div>
           ))}
        </div>
      </div>
    </div>
  );
};
