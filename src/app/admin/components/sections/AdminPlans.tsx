"use client";
import React, { useState } from 'react';
import { Zap, Crown, Shield, Save, Plus, Trash2, Edit3, CheckCircle2 } from 'lucide-react';

const initialPlans = [
  {
    id: 'pro',
    name: 'Pro Plan',
    icon: Zap,
    color: '#6C3CE1',
    monthlyPrice: 59,
    annualPrice: 499,
    features: [
      'iamfolio.in/username profile',
      'All 8 resume templates',
      'Unlimited resume downloads',
      'ATS score checker',
      'Mock interviews (10/month)',
      'Smart job matching',
      'Profile analytics',
      'Remove iamfolio badge',
    ],
    active: true
  },
  {
    id: 'premium',
    name: 'Premium Plan',
    icon: Crown,
    color: '#FF6B35',
    monthlyPrice: 149,
    annualPrice: 999,
    features: [
      'Everything in Pro',
      'Unlimited mock interviews',
      'Career DNA score report',
      'Priority recruiter search',
      'LinkedIn + GitHub import',
      'AI interview feedback',
      'Custom portfolio themes',
      'Video intro on profile',
      'Recruiter view notifications',
      'Custom domain support',
    ],
    active: true
  }
];

export const AdminPlans = () => {
  const [plans, setPlans] = useState(initialPlans);
  const [editingId, setEditingId] = useState<string | null>(null);

  return (
    <div className="space-y-8 animate-in fade-in slide-in-from-bottom-4 duration-500">
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-6">
        <div className="space-y-1">
          <h2 className="text-2xl font-black font-syne uppercase italic tracking-tighter text-white">Plan Management</h2>
          <p className="text-[10px] font-black text-[#64748B] uppercase tracking-[0.2em] font-mono italic">Configure pricing and subscription features</p>
        </div>
        <button className="flex items-center gap-2 px-6 py-3 bg-[#6C3CE1] text-white rounded-xl text-[10px] font-black uppercase tracking-widest hover:opacity-90 shadow-xl shadow-[#6C3CE1]/20 transition-all">
          <Plus size={16} /> Create New Plan
        </button>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
        {plans.map((plan) => (
          <div key={plan.id} className={`p-8 bg-[#111118] border border-[#1E1E2E] rounded-[32px] relative overflow-hidden transition-all ${editingId === plan.id ? 'ring-2 ring-[#6C3CE1]' : ''}`}>
            {/* BACKGROUND DECOR */}
            <div className="absolute -right-10 -top-10 w-40 h-40 bg-zinc-800/10 rounded-full blur-3xl" />
            
            <div className="flex justify-between items-start mb-8 relative z-10">
              <div className="flex items-center gap-4">
                <div className="p-4 rounded-2xl bg-[#0A0A0F] border border-[#1E1E2E]" style={{ color: plan.color }}>
                  <plan.icon size={32} />
                </div>
                <div>
                  <h3 className="text-2xl font-black font-syne uppercase italic text-white">{plan.name}</h3>
                  <div className="flex items-center gap-2 mt-1">
                    <span className={`w-2 h-2 rounded-full ${plan.active ? 'bg-[#6EE7B7]' : 'bg-[#64748B]'}`} />
                    <span className="text-[9px] font-black uppercase tracking-widest text-[#64748B]">{plan.active ? 'ACTIVE_ON_LIVE_SHELL' : 'DISABLED'}</span>
                  </div>
                </div>
              </div>
              <div className="flex gap-2">
                <button 
                  onClick={() => setEditingId(editingId === plan.id ? null : plan.id)}
                  className="p-3 bg-[#1E1E2E] text-[#64748B] hover:text-[#6C3CE1] rounded-xl transition-all"
                >
                  <Edit3 size={18} />
                </button>
                <button className="p-3 bg-[#1E1E2E] text-[#64748B] hover:text-[#FF6B35] rounded-xl transition-all">
                  <Trash2 size={18} />
                </button>
              </div>
            </div>

            <div className="grid grid-cols-2 gap-6 mb-8 relative z-10">
              <div className="space-y-2">
                <p className="text-[10px] font-black uppercase tracking-widest text-[#64748B] font-mono">Monthly_Price</p>
                <div className="flex items-center gap-2">
                  <span className="text-2xl font-black font-mono text-white">₹</span>
                  <input 
                    type="number" 
                    defaultValue={plan.monthlyPrice}
                    className="bg-[#0A0A0F] border border-[#1E1E2E] rounded-lg px-3 py-2 text-xl font-black font-mono text-white w-24 outline-none focus:border-[#6C3CE1]"
                    disabled={editingId !== plan.id}
                  />
                </div>
              </div>
              <div className="space-y-2">
                <p className="text-[10px] font-black uppercase tracking-widest text-[#64748B] font-mono">Annual_Price</p>
                <div className="flex items-center gap-2">
                  <span className="text-2xl font-black font-mono text-white">₹</span>
                  <input 
                    type="number" 
                    defaultValue={plan.annualPrice}
                    className="bg-[#0A0A0F] border border-[#1E1E2E] rounded-lg px-3 py-2 text-xl font-black font-mono text-white w-24 outline-none focus:border-[#6ee7b7]"
                    disabled={editingId !== plan.id}
                  />
                </div>
              </div>
            </div>

            <div className="space-y-4 relative z-10">
              <p className="text-[10px] font-black uppercase tracking-widest text-[#64748B] font-mono italic">// FEATURE_LOCK_MANIFEST</p>
              <div className="grid grid-cols-1 gap-3">
                {plan.features.map((feature, i) => (
                  <div key={i} className="flex items-center justify-between p-3 bg-[#0A0A0F] rounded-xl border border-[#1E1E2E] group hover:border-[#6C3CE1]/30 transition-all">
                    <div className="flex items-center gap-3">
                      <CheckCircle2 size={14} className="text-[#6EE7B7]" />
                      <span className="text-xs font-bold text-[#E2E8F0]">{feature}</span>
                    </div>
                    {editingId === plan.id && (
                      <button className="text-[#64748B] hover:text-[#FF6B35] transition-colors">
                        <Trash2 size={12} />
                      </button>
                    )}
                  </div>
                ))}
                {editingId === plan.id && (
                  <button className="flex items-center justify-center gap-2 p-3 border-2 border-dashed border-[#1E1E2E] rounded-xl text-[10px] font-black uppercase text-[#64748B] hover:border-[#6C3CE1] hover:text-[#6C3CE1] transition-all">
                    <Plus size={14} /> Add New Feature
                  </button>
                )}
              </div>
            </div>

            {editingId === plan.id && (
              <div className="mt-8 flex gap-3 relative z-10 animate-in fade-in zoom-in-95 duration-200">
                <button className="flex-1 py-4 bg-[#6C3CE1] text-white rounded-xl text-xs font-black uppercase tracking-widest shadow-xl shadow-[#6C3CE1]/20 hover:opacity-90">
                  <Save size={16} className="inline mr-2" /> Sync Local Changes
                </button>
                <button 
                  onClick={() => setEditingId(null)}
                  className="px-6 py-4 bg-[#1E1E2E] text-[#64748B] rounded-xl text-xs font-black uppercase tracking-widest hover:text-white"
                >
                  Cancel
                </button>
              </div>
            )}
          </div>
        ))}
      </div>

      <div className="p-8 bg-[#6C3CE1]/5 border border-[#6C3CE1]/20 rounded-[32px] flex items-center justify-between gap-6">
        <div className="flex items-center gap-4">
           <div className="p-4 bg-[#6C3CE1]/10 rounded-2xl text-[#6C3CE1]">
              <Shield size={24} />
           </div>
           <div>
              <h4 className="text-sm font-black uppercase tracking-widest text-white">System Access Control</h4>
              <p className="text-xs text-[#64748B] mt-1">Changes to plans will immediately update the live pricing page and dashboard logic.</p>
           </div>
        </div>
        <button className="px-6 py-3 bg-white/5 border border-white/10 text-white rounded-xl text-[10px] font-black uppercase tracking-widest hover:bg-white/10 transition-all">
           View Global Manifest
        </button>
      </div>
    </div>
  );
};
