"use client";
import React from 'react';
import { motion } from 'framer-motion';
import { UserPlus, Wand2, Share2, ArrowRight } from 'lucide-react';

const steps = [
  {
    icon: UserPlus,
    title: "Deploy Identity",
    desc: "Create your node in 60 seconds. Upload resume or let AI build your professional manifest from scratch.",
    badge: "STEP_01",
    color: "#6C3CE1"
  },
  {
    icon: Wand2,
    title: "Sync & Optimize",
    desc: "AI scans your identity, generates your ATS score, and suggests 8+ premium themes to showcase your vibe.",
    badge: "STEP_02",
    color: "#6EE7B7"
  },
  {
    icon: Share2,
    title: "Secure the Grid",
    desc: "Share your high-performance node link. Track views, downloads, and secure your professional legacy.",
    badge: "STEP_03",
    color: "#FF6B35"
  }
];

export const HowItWorks = () => {
  return (
    <section id="how-it-works" className="py-24 md:py-40 bg-[#0A0A0F] relative overflow-hidden">
      {/* Decorative lines */}
      <div className="absolute top-1/2 left-0 w-full h-px bg-gradient-to-r from-transparent via-[#1E1E2E] to-transparent pointer-events-none hidden md:block"></div>
      
      <div className="max-w-7xl mx-auto px-6 md:px-12 text-center relative z-10">
        <h2 className="text-[32px] sm:text-[42px] md:text-[64px] font-black text-white font-syne uppercase italic tracking-tighter leading-none italic">
           How to secure <br className="md:hidden" /> your identity
        </h2>
        <p className="mt-6 md:mt-8 text-[11px] md:text-[13px] text-[#64748B] font-black uppercase tracking-[0.4em] font-mono italic">// GRID_ONBOARDING_PROTOCOL</p>
        
        <div className="mt-20 md:mt-32 grid grid-cols-1 md:grid-cols-3 gap-12 md:gap-16 relative">
          {steps.map((s, i) => (
            <motion.div
              key={i}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.2 }}
              className="group flex flex-col items-center text-center space-y-8"
            >
              <div className="relative">
                {/* Connector Arrow (Desktop) */}
                {i < 2 && (
                  <div className="absolute top-1/2 left-[calc(100%+2rem)] -translate-y-1/2 hidden md:block opacity-20 group-hover:opacity-100 transition-opacity">
                    <ArrowRight size={32} className="text-[#1E1E2E]" />
                  </div>
                )}
                
                <div 
                  className="w-24 h-24 md:w-32 md:h-32 bg-[#111118] border-2 border-[#1E1E2E] rounded-[32px] flex items-center justify-center relative transition-all duration-500 group-hover:border-[#6C3CE1] group-hover:shadow-[0_0_50px_rgba(108,60,225,0.2)] md:group-hover:-rotate-6"
                  style={{ '--hover-color': s.color } as any}
                >
                   <s.icon size={48} className="text-[#64748B] group-hover:text-white transition-colors" />
                   <div className="absolute -top-3 -right-3 px-3 py-1 bg-[#111118] border border-[#1E1E2E] rounded-full text-[9px] font-black text-[#64748B] tracking-widest font-mono italic group-hover:text-white group-hover:border-white/20 transition-all">
                      {s.badge}
                   </div>
                </div>
              </div>
              
              <div className="space-y-4 max-w-xs">
                <h3 className="text-xl md:text-2xl font-black text-white uppercase font-syne italic tracking-tight group-hover:text-[#6C3CE1] transition-colors">{s.title}</h3>
                <p className="text-sm md:text-base text-[#64748B] leading-relaxed font-bold uppercase tracking-tight italic">
                  {s.desc}
                </p>
              </div>
            </motion.div>
          ))}
        </div>
        
        <div className="mt-20 md:mt-32">
           <button className="px-12 py-5 bg-white text-black font-black text-base md:text-xl rounded-sm uppercase tracking-widest font-mono italic hover:bg-[#6EE7B7] transition-all shadow-xl active:scale-95">
              Secure Your Node Now →
           </button>
        </div>
      </div>
    </section>
  );
};
