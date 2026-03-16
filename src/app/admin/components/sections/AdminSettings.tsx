"use client";
import React, { useState } from 'react';
import { Settings, Mail, Shield, Key, Eye, RefreshCw, Zap, Bell, CheckCircle2 } from 'lucide-react';

export const AdminSettings = () => {
  const [activeTab, setActiveTab] = useState('General');

  return (
    <div className="space-y-8 animate-in fade-in slide-in-from-bottom-4 duration-500">
      <div className="space-y-1">
        <h2 className="text-2xl font-black font-syne uppercase italic tracking-tighter">Admin Settings</h2>
        <p className="text-[10px] font-black text-[#64748B] uppercase tracking-[0.2em] font-mono italic">Platform configuration and API control</p>
      </div>

      <div className="flex gap-4 border-b border-[#1E1E2E]">
        {['General', 'Email Templates', 'Feature Flags', 'API Keys'].map(tab => (
          <button 
            key={tab} 
            onClick={() => setActiveTab(tab)}
            className={`pb-4 text-[10px] font-black uppercase tracking-widest transition-all relative ${activeTab === tab ? 'text-[#6C3CE1]' : 'text-[#64748B] hover:text-[#E2E8F0]'}`}
          >
            {tab}
            {activeTab === tab && <div className="absolute bottom-0 left-0 right-0 h-0.5 bg-[#6C3CE1]" />}
          </button>
        ))}
      </div>

      {activeTab === 'General' && (
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
           <div className="p-8 bg-[#111118] border border-[#1E1E2E] rounded-[32px] space-y-8">
              <div className="space-y-6">
                 {[
                   { label: 'Platform Name', value: 'iamfolio' },
                   { label: 'Support Email', value: 'support@iamfolio.in' },
                   { label: 'Trial Duration', value: '7 days' },
                   { label: 'Max Resume Versions', value: '3' },
                 ].map((item) => (
                   <div key={item.label} className="space-y-2">
                      <label className="text-[10px] font-black text-[#64748B] uppercase tracking-widest">{item.label}</label>
                      <input 
                        type="text" 
                        defaultValue={item.value} 
                        className="w-full bg-[#0A0A0F] border border-[#1E1E2E] rounded-xl px-4 py-3 text-xs font-bold text-white outline-none focus:border-[#6C3CE1]/50 transition-all font-mono italic"
                      />
                   </div>
                 ))}
              </div>
              <button className="w-full py-4 bg-[#6C3CE1] text-white rounded-2xl font-black text-[10px] uppercase tracking-widest hover:opacity-90">Save Changes</button>
           </div>
           
           <div className="p-8 bg-[#111118] border border-[#1E1E2E] rounded-[32px] space-y-6">
              <h3 className="text-sm font-black uppercase tracking-widest italic font-mono text-[#64748B] underline decoration-[#6C3CE1]/30 underline-offset-8">Global Notifications</h3>
              <div className="space-y-4">
                 {[
                   { label: 'New Signup Alert', active: true },
                   { label: 'Payment Failed Alert', active: true },
                   { label: 'High Traffic Warning', active: false },
                   { label: 'System Backup Complete', active: true },
                 ].map((item) => (
                   <div key={item.label} className="flex items-center justify-between p-4 bg-[#0A0A0F] rounded-2xl border border-[#1E1E2E]">
                      <div className="flex items-center gap-3">
                         <Bell size={14} className={item.active ? 'text-[#6EE7B7]' : 'text-[#64748B]'} />
                         <span className="text-[11px] font-bold text-white uppercase tracking-tight">{item.label}</span>
                      </div>
                      <div className={`w-8 h-4 rounded-full relative transition-all ${item.active ? 'bg-[#6C3CE1]' : 'bg-[#1E1E2E]'}`}>
                         <div className={`absolute top-1 w-2 h-2 rounded-full bg-white transition-all ${item.active ? 'right-1' : 'left-1'}`} />
                      </div>
                   </div>
                 ))}
              </div>
           </div>
        </div>
      )}

      {activeTab === 'Feature Flags' && (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
           {[
             { name: 'GitHub Import', status: true },
             { name: 'LinkedIn Import', status: true },
             { name: 'AI Mock Interview', status: true },
             { name: 'Career DNA Score', status: true },
             { name: 'College Dashboard', status: true },
             { name: 'Maintenance Mode', status: false },
           ].map((flag) => (
              <div key={flag.name} className="p-6 bg-[#111118] border border-[#1E1E2E] rounded-[24px] flex items-center justify-between group hover:border-[#6C3CE1]/40 transition-all">
                <div className="space-y-1">
                   <p className="text-xs font-black uppercase tracking-tight text-white">{flag.name}</p>
                   <p className={`text-[9px] font-bold uppercase ${flag.status ? 'text-[#6EE7B7]' : 'text-[#64748B]'}`}>{flag.status ? 'Active' : 'Disabled'}</p>
                </div>
                <div className={`w-10 h-6 rounded-full p-1 cursor-pointer transition-all ${flag.status ? 'bg-[#6C3CE1]' : 'bg-[#1E1E2E]'}`}>
                  <div className={`w-4 h-4 rounded-full bg-white transition-all ${flag.status ? 'translate-x-4' : 'translate-x-0'}`} />
                </div>
              </div>
           ))}
        </div>
      )}

      {activeTab === 'API Keys' && (
        <div className="space-y-6">
           {[
             { name: 'Razorpay Key', value: 'rzp_live_xxx***', type: 'Live' },
             { name: 'OpenAI Key', value: 'sk-xxx***', type: 'AI' },
             { name: 'Supabase URL', value: 'https://xxx.supabase.co', type: 'Storage' },
           ].map((key) => (
             <div key={key.name} className="p-6 bg-[#111118] border border-[#1E1E2E] rounded-[24px] flex flex-col md:flex-row md:items-center justify-between gap-6">
                <div className="space-y-1">
                   <div className="flex items-center gap-2">
                      <p className="text-xs font-black uppercase tracking-tight text-white">{key.name}</p>
                      <span className="px-2 py-0.5 bg-white/5 text-[8px] font-black uppercase tracking-widest text-[#64748B] rounded">{key.type}</span>
                   </div>
                   <p className="text-[11px] font-bold font-mono text-[#64748B] italic">{key.value}</p>
                </div>
                <div className="flex gap-2">
                   <button className="flex items-center gap-2 px-4 py-2 bg-[#1E1E2E] text-[#64748B] hover:text-white rounded-xl text-[10px] font-black uppercase tracking-widest transition-all">
                      <Eye size={12} /> Show
                   </button>
                   <button className="flex items-center gap-2 px-4 py-2 bg-[#1E1E2E] text-[#64748B] hover:text-[#6EE7B7] rounded-xl text-[10px] font-black uppercase tracking-widest transition-all">
                      <RefreshCw size={12} /> Rotate
                   </button>
                </div>
             </div>
           ))}
        </div>
      )}
    </div>
  );
};
