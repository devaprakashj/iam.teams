"use client";
import React, { useState, useEffect } from 'react';
import { motion, useMotionValue, useSpring, useTransform } from 'framer-motion';
import { CheckCircle2 } from 'lucide-react';
import Link from 'next/link';

export const Hero = () => {
  const [mouseX, setMouseX] = useState(0);
  const [mouseY, setMouseY] = useState(0);

  const handleMouseMove = (e: React.MouseEvent) => {
    const { clientX, clientY } = e;
    const { innerWidth, innerHeight } = window;
    setMouseX((clientX - innerWidth / 2) / 25);
    setMouseY((clientY - innerHeight / 2) / 25);
  };

  const companies = [
    { name: 'Zoho', logo: 'https://upload.wikimedia.org/wikipedia/commons/e/ea/Zoho_Corporation_Logo.svg' },
    { name: 'Freshworks', logo: 'https://upload.wikimedia.org/wikipedia/commons/e/e5/Freshworks_Logo.svg' },
    { name: 'TCS', logo: 'https://upload.wikimedia.org/wikipedia/commons/b/b1/Tata_Consultancy_Services_Logo.svg' },
    { name: 'Infosys', logo: 'https://upload.wikimedia.org/wikipedia/commons/9/95/Infosys_logo.svg' },
    { name: 'HCL', logo: 'https://upload.wikimedia.org/wikipedia/commons/0/03/HCL_Technologies_logo.svg' },
    { name: 'Amazon', logo: 'https://upload.wikimedia.org/wikipedia/commons/a/a9/Amazon_logo.svg' }
  ];

  return (
    <section 
      onMouseMove={handleMouseMove}
      className="relative pt-24 md:pt-40 pb-20 overflow-hidden bg-[#0A0A0F]"
    >
      {/* Background Blobs */}
      <div className="absolute top-[20%] left-[10%] w-[30%] h-[40%] bg-[#6C3CE1]/5 blur-[100px] rounded-full -z-10"></div>
      <div className="absolute top-[40%] left-[5%] w-[25%] h-[35%] bg-[#6EE7B7]/5 blur-[100px] rounded-full -z-10"></div>

      <div className="max-w-7xl mx-auto px-6 md:px-12 flex flex-col-reverse lg:flex-row items-center gap-12 md:gap-20">
        
        {/* --- LEFT SIDE — Floating Layered Mockup --- */}
        <div className="flex-1 relative w-full h-[400px] md:h-[600px] flex items-center justify-center">
          
          {/* Main Card — Professional Resume Layout (Dark Mockup for Hero) */}
          <motion.div 
            style={{ x: mouseX * 0.2, y: mouseY * 0.2 }}
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.8 }}
            className="relative z-20 w-full max-w-[320px] md:max-w-[420px] bg-[#111118] rounded-2xl shadow-2xl overflow-hidden border border-[#1E1E2E] flex scale-[0.8] sm:scale-90 md:scale-100"
          >
            {/* Resume Sidebar */}
            <div className="w-1/3 bg-[#0D0D14] p-4 md:p-6 border-r border-[#1E1E2E] flex flex-col items-center">
              <div className="w-12 h-12 md:w-16 md:h-16 bg-[#6C3CE1]/15 rounded-full overflow-hidden mb-4 border border-[#6C3CE1]/20">
                <img 
                  src="https://i.pravatar.cc/150?u=priyasharma_female" 
                  alt="Priya Sharma" 
                  className="w-full h-full object-cover opacity-90"
                />
              </div>
              <h4 className="text-[10px] md:text-sm font-bold text-white text-center leading-tight font-syne uppercase">Priya Sharma</h4>
              <p className="text-[8px] md:text-[10px] text-[#6EE7B7] font-black mt-1 uppercase tracking-wider font-mono text-center">UI/UX Designer</p>
              
              <div className="mt-8 w-full space-y-4">
                <div className="hidden md:block">
                  <p className="text-[9px] font-black text-[#64748B] uppercase tracking-widest mb-1 font-mono italic">Contact</p>
                  <p className="text-[10px] text-[#E2E8F0] font-medium uppercase font-syne">Chennai, India</p>
                  <p className="text-[10px] text-[#E2E8F0] font-medium truncate font-mono">priya@gmail.com</p>
                </div>
              </div>
            </div>

            {/* Resume Main Content */}
            <div className="flex-1 p-4 md:p-6 space-y-4 md:space-y-6">
              <div>
                <h5 className="text-[9px] md:text-[10px] font-black text-white uppercase tracking-widest mb-2 border-b border-[#1E1E2E] pb-1 font-mono italic">Summary</h5>
                <p className="text-[9px] md:text-[10px] text-[#64748B] leading-relaxed font-medium line-clamp-3">
                  Design lead with 4+ years of experience in enterprise SaaS products. Focused on user-centric design architectures.
                </p>
              </div>

              <div>
                <h5 className="text-[9px] md:text-[10px] font-black text-white uppercase tracking-widest mb-3 border-b border-[#1E1E2E] pb-1 font-mono italic">Experience</h5>
                <div className="space-y-4">
                  <div className="relative pl-3 border-l-[1px] border-[#6C3CE1]/40">
                    <p className="text-[9px] md:text-[10px] font-black text-white uppercase font-syne truncate">Zoho Corp</p>
                    <p className="text-[8px] md:text-[9px] text-[#6C3CE1] font-black font-mono uppercase">Jr. UI/UX Designer</p>
                    <p className="text-[7px] md:text-[8px] text-[#64748B] mt-0.5 font-mono">2023–Present</p>
                  </div>
                </div>
              </div>

              <div className="pt-2 md:pt-4">
                 <div className="h-1.5 md:h-2 w-full bg-[#0D0D14] rounded-full overflow-hidden border border-[#1E1E2E]">
                    <div className="h-full w-[85%] bg-[#6EE7B7]" />
                 </div>
                 <p className="text-[7px] md:text-[8px] font-black text-[#6EE7B7] mt-2 uppercase tracking-widest font-mono italic">ATS Compatibility: 85%</p>
              </div>
            </div>
          </motion.div>

          {/* Floating Panel Top Right — Templates */}
          <motion.div 
            style={{ x: mouseX * -0.5, y: mouseY * -0.5 }}
            initial={{ opacity: 0, x: 50, y: -50 }}
            animate={{ opacity: 1, x: 0, y: 0 }}
            transition={{ duration: 0.8, delay: 0.2 }}
            className="absolute top-10 right-0 z-30 bg-[#111118] p-5 rounded-2xl shadow-2xl border border-[#1E1E2E] w-64 hidden xl:block"
          >
            <p className="text-[10px] font-black text-[#64748B] uppercase mb-4 font-mono italic tracking-widest leading-none">Templates & themes</p>
            <div className="flex gap-2 mb-4">
              {['#6C3CE1', '#6EE7B7', '#FF6B35', '#60A5FA', '#E2E8F0'].map((color, i) => (
                <div key={i} className="w-6 h-6 rounded-full border border-white/5 shadow-inner" style={{ backgroundColor: color }}></div>
              ))}
            </div>
          </motion.div>

          {/* Floating Panel Bottom Left — AI Score */}
          <motion.div 
            style={{ x: mouseX * 0.4, y: mouseY * 0.4 }}
            initial={{ opacity: 0, x: -50, y: 50 }}
            animate={{ opacity: 1, x: 0, y: 0 }}
            transition={{ duration: 0.8, delay: 0.4 }}
            className="absolute bottom-10 left-0 z-30 bg-[#111118] p-6 rounded-2xl shadow-2xl border border-[#1E1E2E] w-56 hidden xl:block"
          >
            <p className="text-[10px] font-black text-[#64748B] uppercase mb-4 font-mono italic tracking-widest leading-none">AI Profile Score</p>
            <div className="flex items-end gap-2">
              <span className="text-4xl font-black text-[#6EE7B7] italic font-syne tracking-tighter leading-none">91</span>
              <span className="text-[#64748B] text-[10px] font-black mb-1 font-mono">/100</span>
            </div>
          </motion.div>
        </div>

        {/* --- RIGHT SIDE — Text + CTA --- */}
        <div className="flex-1 text-center lg:text-left z-10">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
          >
            <span className="inline-block px-4 py-2 bg-[#6C3CE1]/15 text-[#6C3CE1] text-[9px] md:text-[10px] font-black uppercase tracking-[0.4em] rounded-full mb-8 italic font-mono border border-[#6C3CE1]/20">
               System_Identity_Active // 2026
            </span>
            <h1 className="text-[32px] sm:text-[42px] md:text-[54px] lg:text-[72px] font-black text-white leading-[0.95] md:leading-[0.85] tracking-tight font-syne uppercase italic">
              Build Your Career <br className="hidden sm:block" /><span className="text-[#6EE7B7]">Identity</span> in 60s
            </h1>
          </motion.div>

          <motion.p 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.1 }}
            className="mt-8 md:mt-10 text-[14px] md:text-[20px] text-[#64748B] leading-relaxed max-w-xl mx-auto lg:mx-0 font-bold uppercase tracking-tight italic"
          >
            iamfolio instantly builds your professional manifest. Stop sending PDFs — share <span className="text-white font-black font-mono italic bg-[#1E1E2E] px-2 py-0.5 rounded">iamfolio.in/{'{'}user{'}'}</span> and secure the grid.
          </motion.p>

          <motion.div 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="mt-12 md:mt-16 flex flex-col sm:flex-row items-center gap-4 md:gap-6 justify-center lg:justify-start"
          >
            <Link href="/signup" className="w-full sm:w-auto">
              <button className="group relative w-full px-10 md:px-12 py-5 md:py-6 bg-[#FF6B35] text-white font-black rounded-sm text-sm md:text-xl hover:translate-x-1 transition-all shadow-[0_0_30px_rgba(255,107,53,0.3)] uppercase tracking-[0.2em] font-mono italic">
                Start 7-Day Trial →
              </button>
            </Link>
            <Link href="#how-it-works" className="w-full sm:w-auto">
              <button className="w-full px-10 md:px-12 py-5 md:py-6 bg-transparent border-2 border-white text-white font-black rounded-sm text-sm md:text-xl hover:bg-white hover:text-black transition-all uppercase tracking-[0.2em] font-mono">
                How It Works
              </button>
            </Link>
          </motion.div>

          {/* Stats Row */}
          <motion.div 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.3 }}
            className="mt-16 md:mt-20 flex items-center justify-center lg:justify-start gap-10 md:gap-16"
          >
            <div className="text-left group">
              <p className="text-4xl md:text-5xl font-black text-[#6C3CE1] font-syne group-hover:scale-110 transition-transform cursor-default italic tracking-tighter leading-none">↑ 38%</p>
              <p className="text-[10px] md:text-[11px] text-[#64748B] font-black uppercase tracking-[0.2em] font-mono mt-2 italic">Interviews</p>
            </div>
            <div className="w-[1px] h-12 md:h-16 bg-[#1E1E2E]"></div>
            <div className="text-left group">
              <p className="text-4xl md:text-5xl font-black text-[#6C3CE1] font-syne group-hover:scale-110 transition-transform cursor-default italic tracking-tighter leading-none">↑ 23%</p>
              <p className="text-[10px] md:text-[11px] text-[#64748B] font-black uppercase tracking-[0.2em] font-mono mt-2 italic">Salary</p>
            </div>
          </motion.div>
        </div>
      </div>

      {/* --- COMPANY LOGOS (Marquee style) --- */}
      <div className="mt-24 md:mt-32 border-y border-[#1E1E2E] py-8 md:py-12 bg-[#0D0D14]/50">
        <div className="max-w-7xl mx-auto px-6 overflow-hidden">
          <p className="text-center text-[10px] font-black text-[#64748B] uppercase tracking-[0.4em] mb-8 font-mono italic">TRUSTED BY CANDIDATES AT</p>
          <div className="flex items-center gap-12 md:gap-24 animate-marquee whitespace-nowrap overflow-x-auto no-scrollbar pb-2">
            {[...companies, ...companies].map((c, i) => (
              <div key={i} className="flex-shrink-0 grayscale opacity-40 hover:grayscale-0 hover:opacity-100 transition-all cursor-default flex items-center gap-3">
                 <img src={c.logo} alt={c.name} className="h-6 md:h-8 w-auto filter invert opacity-80" />
                 <span className="text-lg md:text-xl font-black text-white font-syne uppercase italic tracking-tighter hidden md:block">{c.name}</span>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};
