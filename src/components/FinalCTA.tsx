"use client";
import React from 'react';
import { motion } from 'framer-motion';

export const FinalCTA = () => {
  return (
    <section className="bg-[#6C3CE1] py-20 md:py-32 relative overflow-hidden">
      {/* Decorative Light Effect */}
      <div className="absolute top-0 right-0 w-96 h-96 bg-white/20 rounded-full blur-[100px] -translate-y-1/2 translate-x-1/2"></div>
      
      <div className="max-w-7xl mx-auto px-6 md:px-12 relative z-10 text-center text-white">
        <motion.div
          initial={{ opacity: 0, scale: 0.9 }}
          whileInView={{ opacity: 1, scale: 1 }}
          viewport={{ once: true }}
          className="max-w-4xl mx-auto"
        >
          <h2 className="text-[32px] sm:text-[48px] md:text-[64px] lg:text-[72px] font-black font-syne uppercase italic italic tracking-tighter leading-[0.9] sm:leading-none">
             Your career deserves <br className="hidden md:block" /> more than just a PDF
          </h2>
          <p className="mt-8 text-sm md:text-xl font-bold uppercase tracking-[0.2em] md:tracking-[0.3em] text-white/80 font-mono italic">
             // JOIN_50000+_IDENTITY_CELLS_ON_THE_GRID
          </p>
          
          <div className="mt-12 md:mt-16">
             <button className="w-full sm:w-auto bg-[#FF6B35] text-white px-10 md:px-14 py-5 md:py-6 rounded-sm text-base md:text-2xl font-black uppercase tracking-widest font-mono italic shadow-[0_0_50px_rgba(255,107,53,0.4)] hover:scale-105 active:scale-95 transition-all">
                Start Your 7-Day Free Trial →
             </button>
             
             <div className="mt-12 flex flex-col md:flex-row items-center justify-center gap-4 md:gap-10 text-[10px] md:text-[11px] font-black text-white/60 uppercase tracking-[0.3em] font-mono">
                <div className="flex items-center gap-2">
                   <div className="w-1.5 h-1.5 rounded-full bg-[#6EE7B7]" />
                   <span>NO CREDIT CARD</span>
                </div>
                <div className="hidden md:block w-1.5 h-1.5 rounded-full bg-white/20"></div>
                <div className="flex items-center gap-2">
                   <div className="w-1.5 h-1.5 rounded-full bg-[#6EE7B7]" />
                   <span>7-DAY FREE TRIAL</span>
                </div>
                <div className="hidden md:block w-1.5 h-1.5 rounded-full bg-white/20"></div>
                <div className="flex items-center gap-2">
                   <div className="w-1.5 h-1.5 rounded-full bg-[#6EE7B7]" />
                   <span>TAKES 60 SECONDS</span>
                </div>
             </div>
          </div>
        </motion.div>
      </div>
    </section>
  );
};
