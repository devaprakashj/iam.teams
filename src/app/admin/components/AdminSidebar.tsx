"use client";
import React from 'react';
import { 
  LayoutDashboard, 
  Users, 
  CreditCard, 
  Globe, 
  ShieldCheck, 
  Activity, 
  Settings,
  Zap
} from 'lucide-react';

interface SidebarProps {
  active: string;
  setActive: (val: string) => void;
}

const navItems = [
  { id: 'overview', name: 'Overview', icon: LayoutDashboard },
  { id: 'users', name: 'Users Management', icon: Users },
  { id: 'revenue', name: 'Revenue & Payments', icon: CreditCard },
  { id: 'plans', name: 'Subscription Plans', icon: Zap },
  { id: 'colleges', name: 'College Partners', icon: Globe },
  { id: 'moderation', name: 'Content Moderation', icon: ShieldCheck },
  { id: 'health', name: 'System Health', icon: Activity },
  { id: 'settings', name: 'Settings', icon: Settings },
];

export const AdminSidebar = ({ active, setActive }: SidebarProps) => {
  return (
    <aside className="w-64 border-r border-[#1E1E2E] p-6 hidden lg:flex flex-col gap-8 flex-shrink-0 bg-[#0A0A0F]">
      <div className="flex items-center gap-3 px-2">
        <div className="w-8 h-8 bg-[#6C3CE1] rounded flex items-center justify-center font-black italic text-white">IF</div>
        <div>
          <span className="font-black font-syne uppercase italic tracking-tighter text-xl leading-none">iamfolio</span>
          <div className="flex items-center gap-1.5">
            <span className="text-[9px] font-black text-[#FF6B35] uppercase tracking-widest font-mono">ADMIN</span>
            <div className="w-1.5 h-1.5 rounded-full bg-[#FF6B35] animate-pulse" />
          </div>
        </div>
      </div>

      <nav className="space-y-1">
        {navItems.map((item) => {
          const isActive = active === item.id;
          const isSettings = item.id === 'settings';
          
          return (
            <button
              key={item.id}
              onClick={() => setActive(item.id)}
              className={`w-full flex items-center gap-3 px-4 py-3 rounded-xl text-[10px] font-black uppercase tracking-widest transition-all group border-l-2 ${
                isActive 
                ? isSettings 
                  ? 'bg-[#6C3CE1] text-white border-white shadow-[0_0_20px_rgba(108,60,225,0.3)]' 
                  : 'bg-[#6C3CE1]/15 text-[#E2E8F0] border-[#6C3CE1]' 
                : 'text-[#64748B] hover:bg-[#111118] hover:text-[#E2E8F0] border-transparent'
              }`}
            >
              <item.icon size={18} className={isActive ? 'text-white' : 'text-[#64748B] group-hover:text-white transition-colors'} />
              <span>{item.name}</span>
            </button>
          );
        })}
      </nav>

      <div className="mt-auto p-4 bg-[#111118] rounded-2xl border border-[#1E1E2E]">
        <p className="text-[10px] font-black text-[#64748B] uppercase tracking-widest mb-2 font-mono italic">// MASTER_SHELL_V2</p>
        <div className="flex items-center gap-3">
          <div className="w-8 h-8 rounded-full bg-gradient-to-tr from-[#6C3CE1] to-[#FF6B35]" />
          <div>
            <p className="text-[11px] font-black uppercase">Deva J.</p>
            <p className="text-[9px] font-bold text-[#64748B] uppercase">Super Admin</p>
          </div>
        </div>
      </div>
    </aside>
  );
};
