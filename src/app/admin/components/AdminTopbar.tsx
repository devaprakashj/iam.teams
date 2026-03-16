"use client";
import React from 'react';
import { Download, Bell } from 'lucide-react';

interface TopbarProps {
  section: string;
}

const titles: Record<string, { main: string, sub: string }> = {
  overview: { main: "Admin Dashboard", sub: "Live performance metrics" },
  users: { main: "Users Management", sub: "52,341 total members" },
  revenue: { main: "Revenue & Payments", sub: "₹5.2L monthly recurring" },
  colleges: { main: "College Partners", sub: "23 active institutions" },
  moderation: { main: "Content Moderation", sub: "12 flagged candidate profiles" },
  plans: { main: "Subscription Plans", sub: "Global pricing manifest" },
  health: { main: "System Health", sub: "All core services operational" },
  settings: { main: "Admin Settings", sub: "Global platform configuration" }
};

export const AdminTopbar = ({ section }: TopbarProps) => {
  const current = titles[section] || { main: "Administration", sub: "iamfolio command" };

  return (
    <header className="h-24 border-b border-[#1E1E2E] px-8 flex items-center justify-between sticky top-0 bg-[#0A0A0F]/80 backdrop-blur-xl z-50">
      <div className="space-y-0.5">
        <div className="flex items-center gap-2">
           <h1 className="text-xl font-black font-syne uppercase italic tracking-tighter text-white">{current.main}</h1>
           {section === 'health' && (
             <div className="flex items-center gap-1.5 px-2 py-0.5 bg-[#6EE7B7]/10 rounded-full border border-[#6EE7B7]/20">
               <div className="w-1 h-1 rounded-full bg-[#6EE7B7] animate-pulse" />
               <span className="text-[8px] font-black text-[#6EE7B7] uppercase tracking-widest font-mono">LIVE</span>
             </div>
           )}
        </div>
        <p className="text-[10px] font-bold text-[#64748B] uppercase tracking-[0.2em] font-mono italic">{current.sub}</p>
      </div>

      <div className="flex items-center gap-4">
        <button className="hidden sm:flex items-center gap-2 px-6 py-2.5 bg-[#111118] border border-[#1E1E2E] rounded-full text-[9px] font-black uppercase tracking-widest hover:border-[#6C3CE1]/40 transition-all text-[#64748B] hover:text-white">
          <Download size={14} /> Export Node
        </button>
        <button className="p-3 bg-[#111118] border border-[#1E1E2E] rounded-full text-[#64748B] hover:text-[#6EE7B7] transition-all relative">
          <Bell size={18} />
          <div className="absolute top-2 right-2 w-2 h-2 bg-[#FF6B35] rounded-full border-2 border-[#111118] animate-bounce" />
        </button>
        <div className="w-10 h-10 rounded-full bg-[#111118] border border-[#1E1E2E] flex items-center justify-center font-black italic text-[10px] text-[#6C3CE1] shadow-xl">AD</div>
      </div>
    </header>
  );
};
