"use client";
import React from 'react';
import { motion } from 'framer-motion';

export const FinalCTA = () => {
  return (
    <section className="bg-primary py-24 relative overflow-hidden">
      {/* Decorative Light Effect */}
      <div className="absolute top-0 right-0 w-96 h-96 bg-white/10 rounded-full blur-3xl -translate-y-1/2 translate-x-1/2"></div>
      
      <div className="max-w-7xl mx-auto px-6 md:px-12 relative z-10 text-center text-white">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="max-w-3xl mx-auto"
        >
          <h2 className="text-4xl md:text-5xl font-bold leading-tight">
             Your career deserves more than just a PDF
          </h2>
          <p className="mt-6 text-xl text-white/80 font-medium">
             Join 50,000+ professionals building their identity with iamfolio.
          </p>
          
          <div className="mt-12">
             <button className="bg-cta text-white px-10 py-5 rounded-button text-xl font-bold shadow-2xl hover:bg-cta-hover transition-all">
                Create My Profile Now →
             </button>
             <div className="mt-8 flex items-center justify-center gap-8 text-sm font-medium text-white/60 uppercase tracking-widest">
               <span>No credit card</span>
               <span className="w-1 h-1 rounded-full bg-white/60"></span>
               <span>Free forever</span>
               <span className="w-1 h-1 rounded-full bg-white/60"></span>
               <span>Takes 60 seconds</span>
             </div>
          </div>
        </motion.div>
      </div>
    </section>
  );
};

