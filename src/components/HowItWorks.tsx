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
    <section id="how-it-works" className="py-24 md:py-40 bg-white relative overflow-hidden">
      {/* Decorative lines */}
      <div className="absolute top-1/2 left-0 w-full h-px bg-gradient-to-r from-transparent via-gray-100 to-transparent pointer-events-none hidden md:block"></div>
      
      <div className="max-w-7xl mx-auto px-6 md:px-12 text-center relative z-10">
        <h2 className="text-[32px] sm:text-[42px] md:text-[64px] font-black text-gray-900 font-syne uppercase italic tracking-tighter leading-none italic">
           How to secure <br className="md:hidden" /> your identity
        </h2>
        <p className="mt-6 md:mt-8 text-[11px] md:text-[13px] text-gray-400 font-black uppercase tracking-[0.4em] font-mono italic">// GRID_ONBOARDING_PROTOCOL</p>
        
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
                    <ArrowRight size={32} className="text-gray-200" />
                  </div>
                )}
                
                <div 
                  className="w-24 h-24 md:w-32 md:h-32 bg-gray-50 border-2 border-gray-100 rounded-[32px] flex items-center justify-center relative transition-all duration-500 group-hover:border-[#6C3CE1] group-hover:shadow-[0_20px_50px_rgba(108,60,225,0.1)] md:group-hover:-rotate-6"
                  style={{ '--hover-color': s.color } as any}
                >
                   <s.icon size={48} className="text-gray-400 group-hover:text-white transition-colors" />
                   <div className="absolute -top-3 -right-3 px-3 py-1 bg-white border border-gray-100 rounded-full text-[9px] font-black text-gray-400 tracking-widest font-mono italic group-hover:text-[#6C3CE1] group-hover:border-[#6C3CE1]/20 transition-all">
                      {s.badge}
                   </div>
                </div>
              </div>
              
              <div className="space-y-4 max-w-xs">
                <h3 className="text-xl md:text-2xl font-black text-gray-900 uppercase font-syne italic tracking-tight group-hover:text-[#6C3CE1] transition-colors">{s.title}</h3>
                <p className="text-sm md:text-base text-gray-500 leading-relaxed font-bold uppercase tracking-tight italic">
                  {s.desc}
                </p>
              </div>
            </motion.div>
          ))}
        </div>
        
        <div className="mt-20 md:mt-32">
           <button className="px-12 py-5 bg-gray-900 text-white font-black text-base md:text-xl rounded-sm uppercase tracking-widest font-mono italic hover:bg-[#6C3CE1] transition-all shadow-xl active:scale-95">
              Secure Your Node Now →
           </button>
        </div>
      </div>
    </section>
  );
};
