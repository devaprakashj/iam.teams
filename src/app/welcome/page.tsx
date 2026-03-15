'use client';

import React from 'react';
import { motion } from 'framer-motion';
import { useRouter } from 'next/navigation';
import { UserPlus, ArrowRight, Zap, Target, ShieldCheck, Sparkles } from 'lucide-react';

export default function WelcomePage() {
  const router = useRouter();

  return (
    <div className="min-h-screen bg-[#F8FAFC] text-slate-900 font-inter selection:bg-purple-100 selection:text-[#6C3CE1] flex flex-col">
      {/* Dynamic Header */}
      <header className="h-[80px] bg-white/80 backdrop-blur-xl border-b border-slate-100 px-6 md:px-12 flex items-center justify-between sticky top-0 z-50">
        <div className="flex items-center gap-2">
           <div className="w-9 h-9 bg-[#6C3CE1] rounded-xl flex items-center justify-center font-black text-white text-lg shadow-lg shadow-purple-200">i</div>
           <span className="text-[22px] font-black italic tracking-tighter text-[#6C3CE1]">iamfolio</span>
        </div>
        <div className="hidden md:flex items-center gap-6">
           <div className="flex items-center gap-2 px-3 py-1 bg-emerald-50 rounded-full">
              <div className="w-1.5 h-1.5 bg-emerald-500 rounded-full animate-pulse" />
              <span className="text-[10px] font-black text-emerald-600 uppercase tracking-widest">Identity Pipeline Active</span>
           </div>
        </div>
      </header>

      <main className="flex-grow flex items-center justify-center px-6 py-24">
        <div className="max-w-4xl w-full text-center space-y-12">
           {/* Visual Element */}
           <motion.div
             initial={{ opacity: 0, scale: 0.8 }}
             animate={{ opacity: 1, scale: 1 }}
             className="w-24 h-24 bg-[#6C3CE1]/5 rounded-[32px] border border-[#6C3CE1]/10 flex items-center justify-center mx-auto mb-8"
           >
              <Sparkles size={40} className="text-[#6C3CE1]" />
           </motion.div>

           <div className="space-y-6">
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                className="inline-flex items-center gap-2 px-4 py-2 bg-white border border-slate-200 rounded-full shadow-sm"
              >
                 <Zap size={14} className="text-[#6C3CE1]" fill="#6C3CE1" />
                 <span className="text-[11px] font-black text-slate-500 uppercase tracking-widest">Mandatory Professional Setup</span>
              </motion.div>
              
              <motion.h1 
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.1 }}
                className="text-5xl md:text-7xl font-black text-slate-900 tracking-tighter leading-[0.9]"
              >
                 Build your <span className="text-[#6C3CE1] italic">elite identity.</span>
              </motion.h1>
              
              <motion.p 
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.2 }}
                className="text-xl text-slate-500 font-medium leading-relaxed max-w-2xl mx-auto"
              >
                 To unlock your mission control dashboard, you must first establish your 
                 professional substrate. Filling your details takes less than 3 minutes.
              </motion.p>
           </div>

           {/* Single Action Area */}
           <motion.div
             initial={{ opacity: 0, y: 30 }}
             animate={{ opacity: 1, y: 0 }}
             transition={{ delay: 0.3 }}
             className="pt-8"
           >
              <button 
                onClick={() => router.push('/onboarding')}
                className="group relative px-12 py-6 bg-[#6C3CE1] text-white rounded-[32px] font-black text-xl shadow-2xl shadow-purple-200 hover:scale-105 active:scale-95 transition-all flex items-center gap-4 mx-auto overflow-hidden"
              >
                 <div className="absolute inset-0 bg-white/10 translate-x-[-100%] group-hover:translate-x-[100%] transition-transform duration-700" />
                 <UserPlus size={24} />
                 Start Building Profile
                 <ArrowRight size={24} className="group-hover:translate-x-2 transition-transform" />
              </button>
              <p className="mt-8 text-[10px] font-bold text-slate-400 uppercase tracking-widest flex items-center justify-center gap-4">
                 <span className="flex items-center gap-1.5"><ShieldCheck size={12} /> Secure</span>
                 <span className="w-1 h-1 bg-slate-200 rounded-full" />
                 <span className="flex items-center gap-1.5"><Target size={12} /> ATS Ready</span>
                 <span className="w-1 h-1 bg-slate-200 rounded-full" />
                 <span className="flex items-center gap-1.5"><Zap size={12} /> Instant Deployment</span>
              </p>
           </motion.div>
        </div>
      </main>

      {/* Simplified Footer */}
      <footer className="py-12 border-t border-slate-100">
         <div className="text-center">
            <p className="text-[10px] font-black text-slate-300 uppercase tracking-[0.4em]">&copy; 2026 iamfolio Technologies Pvt. Ltd.</p>
         </div>
      </footer>
    </div>
  );
}
