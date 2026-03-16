"use client";
import React, { useState } from 'react';
import { ShieldCheck, UserX, AlertTriangle, Eye, Trash2, CheckCircle } from 'lucide-react';

const flaggedProfiles = [
  { user: 'John X', reason: 'Fake credentials', flaggedBy: 'AI system', date: 'Mar 15', initials: 'JX' },
  { user: 'Jane Y', reason: 'Inappropriate photo', flaggedBy: 'User report', date: 'Mar 14', initials: 'JY' },
];

export const AdminModeration = () => {
  const [activeTab, setActiveTab] = useState('Flagged Profiles');

  return (
    <div className="space-y-8 animate-in fade-in slide-in-from-bottom-4 duration-500">
      <div className="space-y-1">
        <h2 className="text-2xl font-black font-syne uppercase italic tracking-tighter">Content Moderation</h2>
        <p className="text-[10px] font-black text-[#64748B] uppercase tracking-[0.2em] font-mono italic">Review flagged profiles and reported content</p>
      </div>

      <div className="flex gap-4 border-b border-[#1E1E2E]">
        {['Flagged Profiles', 'Reported Content', 'Spam Accounts'].map(tab => (
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

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        <div className="lg:col-span-2 bg-[#111118] border border-[#1E1E2E] rounded-[32px] overflow-hidden">
          <div className="overflow-x-auto">
            <table className="w-full text-left">
              <thead>
                <tr className="bg-[#16161D] text-[10px] font-black text-[#64748B] uppercase tracking-[0.2em] font-mono">
                  <th className="px-8 py-5">User</th>
                  <th className="px-8 py-5">Reason</th>
                  <th className="px-8 py-5">Flagged By</th>
                  <th className="px-8 py-5">Date</th>
                  <th className="px-8 py-5 text-right">Action</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-[#1E1E2E]">
                {flaggedProfiles.map((p, i) => (
                  <tr key={i} className="hover:bg-white/5 transition-colors group">
                    <td className="px-8 py-5">
                      <div className="flex items-center gap-3">
                        <div className="w-8 h-8 rounded-lg bg-[#1E1E2E] border border-[#1E1E2E] flex items-center justify-center font-black italic text-[#FF6B35]">
                          {p.initials}
                        </div>
                        <span className="text-sm font-bold text-white uppercase tracking-tight">{p.user}</span>
                      </div>
                    </td>
                    <td className="px-8 py-5 text-xs font-bold text-[#FF6B35] font-mono italic uppercase">{p.reason}</td>
                    <td className="px-8 py-5 text-[10px] font-black uppercase text-[#64748B]">{p.flaggedBy}</td>
                    <td className="px-8 py-5 text-[10px] font-bold text-[#64748B] font-mono uppercase">{p.date}</td>
                    <td className="px-8 py-5 text-right">
                      <div className="flex items-center justify-end gap-2">
                        <button className="p-2 bg-[#1E1E2E] hover:bg-[#6C3CE1] text-white rounded-lg transition-all" title="Review"><Eye size={12} /></button>
                        <button className="p-2 bg-[#1E1E2E] hover:bg-[#FF6B35] text-white rounded-lg transition-all" title="Remove"><Trash2 size={12} /></button>
                        <button className="p-2 bg-[#1E1E2E] hover:bg-[#6EE7B7] text-white rounded-lg transition-all" title="Clear"><CheckCircle size={12} /></button>
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>

        <div className="p-8 bg-[#6C3CE1]/5 border border-[#6C3CE1]/20 rounded-[32px] flex flex-col justify-between">
           <div className="space-y-6">
              <div className="p-4 bg-[#6C3CE1]/10 rounded-2xl w-fit text-[#6C3CE1]">
                <ShieldCheck size={24} />
              </div>
              <div>
                <h3 className="text-2xl font-black font-syne uppercase italic tracking-tighter">AI Guard System</h3>
                <p className="text-xs font-bold text-[#64748B] leading-relaxed mt-2 italic">
                  "AI flagged <span className="text-[#6C3CE1]">12 profiles</span> this week for duplicate content and fake credentials."
                </p>
              </div>
              <div className="space-y-4">
                 {[
                   { label: 'Duplicate Content', count: 8 },
                   { label: 'Fake Company Names', count: 3 },
                   { label: 'Inappropriate Photo', count: 1 },
                 ].map(item => (
                   <div key={item.label} className="flex justify-between items-center bg-[#0A0A0F] p-3 rounded-xl border border-[#1E1E2E]">
                      <span className="text-[10px] font-black uppercase text-[#64748B] tracking-widest">{item.label}</span>
                      <span className="text-xs font-black text-white font-mono">{item.count}</span>
                   </div>
                 ))}
              </div>
           </div>
           <button className="w-full mt-8 py-4 bg-[#6C3CE1] text-white rounded-2xl font-black text-[10px] uppercase tracking-widest hover:opacity-90 transition-all">Enable Auto-Purge</button>
        </div>
      </div>
    </div>
  );
};
