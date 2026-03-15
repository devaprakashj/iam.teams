"use client";
import React from 'react';
import { motion } from 'framer-motion';
import { Check } from 'lucide-react';

export const ResumeScore = () => {
  return (
    <section className="py-16 md:py-24 bg-[#0A0A0F]">
      <div className="max-w-7xl mx-auto px-6 md:px-12 flex flex-col lg:flex-row items-center gap-12 md:gap-20">
        
        {/* LEFT — Score Report Card */}
        <div className="flex-1 w-full flex justify-center lg:justify-start">
          <motion.div 
            initial={{ opacity: 0, x: -40 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            className="w-full max-w-lg bg-[#111118] p-6 md:p-10 rounded-2xl border border-[#1E1E2E] shadow-2xl"
          >
            <h3 className="text-[9px] md:text-[11px] font-black text-[#64748B] uppercase tracking-[0.3em] font-mono mb-6 md:mb-8 italic">// PROFILE_SCORE_ANALYSIS</h3>
            
            <div className="flex flex-col items-center mb-8 md:mb-10">
              <div className="relative w-[120px] h-[120px] md:w-48 md:h-48 flex items-center justify-center">
                <svg className="w-full h-full transform -rotate-90">
                  <circle cx="50%" cy="50%" r="42%" fill="none" stroke="#0D0D14" strokeWidth="10" />
                  <circle 
                    cx="50%" cy="50%" r="42%" fill="none" stroke="#6C3CE1" strokeWidth="10" 
                    strokeDasharray="264" strokeDashoffset="31" strokeLinecap="round" 
                    className="md:hidden"
                  />
                  <circle 
                    cx="50%" cy="50%" r="42%" fill="none" stroke="#6C3CE1" strokeWidth="12" 
                    strokeDasharray="502" strokeDashoffset="60" strokeLinecap="round" 
                    className="hidden md:block"
                  />
                </svg>
                <div className="absolute inset-0 flex flex-col items-center justify-center translate-y-1 md:translate-y-2">
                  <span className="text-4xl md:text-6xl font-black text-[#6C3CE1] italic font-syne">88</span>
                  <span className="text-[8px] md:text-[10px] font-black text-[#64748B] uppercase tracking-widest font-mono">/100</span>
                </div>
              </div>
            </div>

            <div className="space-y-4 md:space-y-6">
              {[
                { label: 'ATS Match', val: '91%', color: 'bg-[#6EE7B7]' },
                { label: 'Keywords', val: '78%', color: 'bg-yellow-500' },
                { label: 'Format', val: '95%', color: 'bg-[#6EE7B7]' }
              ].map(item => (
                <div key={item.label}>
                  <div className="flex justify-between text-[9px] md:text-[10px] font-black text-[#E2E8F0] mb-1.5 md:mb-2 uppercase tracking-widest font-mono">
                    <span>{item.label}</span>
                    <span className="text-[#64748B]">{item.val}</span>
                  </div>
                  <div className="h-1 md:h-1.5 w-full bg-[#0D0D14] rounded-full overflow-hidden border border-[#1E1E2E]">
                    <div className={`h-full ${item.color} rounded-full`} style={{ width: item.val }}></div>
                  </div>
                </div>
              ))}
            </div>
          </motion.div>
        </div>

        {/* RIGHT — Text */}
        <div className="flex-1 text-center lg:text-left">
          <motion.div 
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
          >
            <h2 className="text-3xl md:text-6xl font-black text-white leading-[0.95] md:leading-[0.85] font-syne uppercase italic italic tracking-tighter">
              Know exactly how strong your manifest is
            </h2>
            
            <ul className="mt-8 md:mt-12 space-y-4 md:space-y-6 text-left">
              {[
                'Most resumes are rejected before a human ever sees them.',
                'iamfolio scores your profile and detects fix points.',
                'Optimized for the grid: TCS, Zoho, and 1000+ more.'
              ].map((point, i) => (
                <li key={i} className="flex items-start gap-3 md:gap-4">
                  <div className="mt-0.5 w-5 h-5 md:w-6 md:h-6 rounded-full bg-[#6C3CE1]/15 flex items-center justify-center flex-shrink-0 text-[#6C3CE1] border border-[#6C3CE1]/20">
                    <Check className="w-3 h-3 md:w-4 md:h-4 stroke-[4]" />
                  </div>
                  <p className="text-xs md:text-[14px] text-[#64748B] font-bold uppercase tracking-tight">{point}</p>
                </li>
              ))}
            </ul>

            <button className="mt-10 md:mt-12 w-full sm:w-auto px-8 md:px-10 py-4 md:py-5 bg-[#FF6B35] text-white font-black rounded-sm text-sm md:text-lg hover:translate-x-1 transition-all shadow-[0_0_30px_rgba(255,107,53,0.3)] uppercase tracking-widest font-mono italic">
              Score My Profile →
            </button>
          </motion.div>
        </div>
      </div>
    </section>
  );
};

