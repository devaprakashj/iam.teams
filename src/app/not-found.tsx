"use client";
import React from 'react';
import Link from 'next/link';
import { motion } from 'framer-motion';
import { ShieldCheck } from 'lucide-react';

export default function NotFound() {
  return (
    <div className="h-screen bg-[#0A0A0F] flex flex-col items-center justify-center gap-6 font-mono p-6 text-center">
      <div className="fixed inset-0 pointer-events-none -z-10">
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_2px_2px,_rgba(255,255,255,0.05)_1px,_transparent_0)] bg-[size:32px_32px]" />
        <div className="absolute inset-0 bg-gradient-to-b from-[#0A0A0F] via-transparent to-[#0A0A0F]" />
      </div>
      
      <motion.div 
        initial={{ scale: 0.8, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        className="w-24 h-24 bg-red-500/10 rounded-full flex items-center justify-center text-red-500 mb-4 border border-red-500/20 shadow-[0_0_30px_rgba(239,68,68,0.2)]"
      >
         <ShieldCheck size={48} className="animate-pulse" />
      </motion.div>

      <div className="space-y-4">
        <motion.h1 
          initial={{ y: 20, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ delay: 0.2 }}
          className="text-5xl md:text-6xl font-black font-syne text-white uppercase tracking-tighter italic"
        >
          Error_404_Offline
        </motion.h1>
        <motion.p 
          initial={{ y: 20, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ delay: 0.3 }}
          className="text-[11px] text-white/30 font-bold uppercase tracking-widest max-w-xs leading-relaxed mx-auto"
        >
          The requested digital identity node is currently decoupled from the main grid or does not exist.
        </motion.p>
      </div>

      <motion.div
        initial={{ y: 20, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ delay: 0.4 }}
      >
        <Link 
          href="/dashboard" 
          className="mt-8 px-12 py-5 bg-white text-black font-black text-xs uppercase tracking-[0.4em] rounded-sm hover:bg-[#6EE7B7] hover:-translate-y-1 transition-all shadow-xl"
        >
          RETURN_TO_CENTRAL_CORE
        </Link>
      </motion.div>

      <div className="absolute bottom-10 text-[8px] font-black text-white/10 uppercase tracking-[0.5em]">
        System_Identity_Verification_Error_394-X
      </div>
    </div>
  );
}
