"use client";
import React, { useState, useEffect } from 'react';
import { motion, useMotionValue, useSpring, useTransform } from 'framer-motion';
import { CheckCircle2 } from 'lucide-react';

export const Hero = () => {
  const [mouseX, setMouseX] = useState(0);
  const [mouseY, setMouseY] = useState(0);

  const handleMouseMove = (e: React.MouseEvent) => {
    const { clientX, clientY } = e;
    const { innerWidth, innerHeight } = window;
    setMouseX((clientX - innerWidth / 2) / 25);
    setMouseY((clientY - innerHeight / 2) / 25);
  };

  return (
    <section 
      onMouseMove={handleMouseMove}
      className="relative pt-32 pb-20 overflow-hidden bg-white"
    >
      {/* Background Blobs */}
      <div className="absolute top-[20%] left-[10%] w-[30%] h-[40%] bg-primary/5 blur-[100px] rounded-full -z-10"></div>
      <div className="absolute top-[40%] left-[5%] w-[25%] h-[35%] bg-teal-400/5 blur-[100px] rounded-full -z-10"></div>

      <div className="max-w-7xl mx-auto px-6 md:px-12 flex flex-col lg:flex-row items-center gap-16">
        
        {/* --- LEFT SIDE — Floating Layered Mockup --- */}
        <div className="flex-1 relative w-full h-[500px] md:h-[600px] flex items-center justify-center">
          
          {/* Main Card — Professional Resume Layout */}
          <motion.div 
            style={{ x: mouseX * 0.2, y: mouseY * 0.2 }}
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.8 }}
            className="relative z-20 w-full max-w-[420px] bg-white rounded-card shadow-2xl overflow-hidden border border-gray-border flex"
          >
            {/* Resume Sidebar */}
            <div className="w-1/3 bg-[#F8FAFC] p-6 border-r border-gray-100 flex flex-col items-center">
              <div className="w-16 h-16 bg-primary/10 rounded-full flex items-center justify-center text-primary text-xl font-bold mb-4">
                PS
              </div>
              <h4 className="text-sm font-bold text-dark text-center leading-tight">Priya Sharma</h4>
              <p className="text-[10px] text-primary font-bold mt-1 uppercase tracking-wider">UI/UX Designer</p>
              
              <div className="mt-8 w-full space-y-4">
                <div>
                  <p className="text-[9px] font-bold text-gray-light uppercase tracking-widest mb-1">Contact</p>
                  <p className="text-[10px] text-gray-text font-medium">Chennai, India</p>
                  <p className="text-[10px] text-gray-text font-medium">priya@gmail.com</p>
                </div>
                <div>
                  <p className="text-[9px] font-bold text-gray-light uppercase tracking-widest mb-1">Skills</p>
                  <div className="flex flex-wrap gap-1">
                    {['Figma', 'Prototyping', 'React'].map(s => (
                      <span key={s} className="px-1.5 py-0.5 bg-white border border-gray-100 rounded-[2px] text-[8px] font-bold text-dark">{s}</span>
                    ))}
                  </div>
                </div>
              </div>
            </div>

            {/* Resume Main Content */}
            <div className="flex-1 p-6 space-y-6">
              <div>
                <h5 className="text-[10px] font-bold text-dark uppercase tracking-widest mb-2 border-b border-gray-100 pb-1">Summary</h5>
                <p className="text-[10px] text-gray-text leading-relaxed font-medium">
                  Design lead with 4+ years of experience in enterprise SaaS products. Focused on user-centric design.
                </p>
              </div>

              <div>
                <h5 className="text-[10px] font-bold text-dark uppercase tracking-widest mb-3 border-b border-gray-100 pb-1">Experience</h5>
                <div className="space-y-4">
                  <div className="relative pl-3 border-l-[1px] border-primary/20">
                    <p className="text-[10px] font-bold text-dark">Zoho Corp</p>
                    <p className="text-[9px] text-primary font-bold">Jr. UI/UX Designer</p>
                    <p className="text-[8px] text-gray-light mt-1">2023–Present</p>
                  </div>
                  <div className="relative pl-3 border-l-[1px] border-primary/20">
                    <p className="text-[10px] font-bold text-dark">Freshworks</p>
                    <p className="text-[9px] text-primary font-bold">Product Intern</p>
                    <p className="text-[8px] text-gray-light mt-1">2022</p>
                  </div>
                </div>
              </div>

              <div>
                <h5 className="text-[10px] font-bold text-dark uppercase tracking-widest mb-2 border-b border-gray-100 pb-1">Projects</h5>
                <div className="grid grid-cols-2 gap-2">
                  <div className="p-2 bg-gray-bg rounded-sm font-bold text-[8px] text-dark">SwiftPay App</div>
                  <div className="p-2 bg-gray-bg rounded-sm font-bold text-[8px] text-dark">EduPortal</div>
                </div>
              </div>
            </div>
          </motion.div>

          {/* Floating Panel Top Right — Templates */}
          <motion.div 
            style={{ x: mouseX * -0.5, y: mouseY * -0.5 }}
            initial={{ opacity: 0, x: 50, y: -50 }}
            animate={{ opacity: 1, x: 0, y: 0 }}
            transition={{ duration: 0.8, delay: 0.2 }}
            className="absolute top-10 right-0 z-30 bg-white p-5 rounded-card shadow-2xl border border-gray-border w-64 hidden md:block"
          >
            <p className="text-[10px] font-bold text-gray-light uppercase mb-3">Templates & themes</p>
            <div className="flex gap-2 mb-4">
              {['#6C3CE1', '#3B82F6', '#2DD4BF', '#F97316', '#EC4899', '#22C55E'].map((color, i) => (
                <div key={i} className="w-5 h-5 rounded-full border border-gray-200" style={{ backgroundColor: color }}></div>
              ))}
            </div>
            <div className="flex gap-2">
              {[1, 2, 3].map(i => (
                <div key={i} className="flex-1 aspect-[3/4] bg-gray-50 rounded-sm border border-gray-100 p-1 flex flex-col gap-1">
                  <div className="h-1 w-full bg-gray-200"></div>
                  <div className="h-6 w-full bg-gray-100 flex items-center px-0.5"><div className="w-2 h-2 rounded-full bg-gray-200"></div></div>
                  <div className="h-1 w-full bg-gray-200"></div>
                  <div className="h-1 w-2/3 bg-gray-200"></div>
                </div>
              ))}
            </div>
          </motion.div>

          {/* Floating Panel Bottom Left — AI Score */}
          <motion.div 
            style={{ x: mouseX * 0.4, y: mouseY * 0.4 }}
            initial={{ opacity: 0, x: -50, y: 50 }}
            animate={{ opacity: 1, x: 0, y: 0 }}
            transition={{ duration: 0.8, delay: 0.4 }}
            className="absolute bottom-10 left-0 z-30 bg-white p-5 rounded-card shadow-2xl border border-gray-border w-60 hidden md:block"
          >
            <p className="text-[10px] font-bold text-gray-light uppercase mb-3">AI Profile Score</p>
            <div className="flex items-end gap-2 mb-4">
              <span className="text-4xl font-bold text-primary italic">91</span>
              <span className="text-gray-light text-sm font-semibold mb-1">/100</span>
            </div>
            <div className="space-y-3">
              {[
                { label: 'ATS Match', val: '94%' },
                { label: 'Keywords', val: '87%' },
                { label: 'Format', val: '96%' }
              ].map(item => (
                <div key={item.label}>
                  <div className="flex justify-between text-[10px] font-bold text-dark mb-1.5">
                    <span>{item.label}</span>
                    <span>{item.val}</span>
                  </div>
                  <div className="h-1.5 w-full bg-gray-100 rounded-full overflow-hidden">
                    <motion.div 
                      initial={{ width: 0 }}
                      whileInView={{ width: item.val }}
                      viewport={{ once: true }}
                      transition={{ duration: 1, delay: 0.6 }}
                      className="h-full bg-primary rounded-full"
                    ></motion.div>
                  </div>
                </div>
              ))}
            </div>
          </motion.div>
        </div>

        {/* --- RIGHT SIDE — Text + CTA --- */}
        <div className="flex-1 text-center lg:text-left">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
          >
            <span className="inline-block px-4 py-1.5 bg-primary/5 text-primary text-xs font-bold uppercase tracking-widest rounded-full mb-6 italic">
               The future of career profiles is here
            </span>
            <h1 className="text-[48px] md:text-[64px] font-bold text-dark leading-[1.1] tracking-tight">
              Build Your Career <span className="text-primary italic">Identity</span> in 60s
            </h1>
          </motion.div>

          <motion.p 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.1 }}
            className="mt-6 text-[18px] text-gray-text leading-relaxed max-w-xl mx-auto lg:mx-0 font-medium"
          >
            iamfolio instantly builds your smart profile. Stop sending PDFs — share <span className="font-semibold text-primary">iamfolio.in/yourname</span> and get hired faster.
          </motion.p>

          <motion.div 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="mt-10 flex flex-col sm:flex-row items-center gap-4 justify-center lg:justify-start"
          >
            <button className="w-full sm:w-auto px-8 py-5 bg-cta text-white font-bold rounded-button text-lg hover:scale-105 active:scale-95 transition-all shadow-xl shadow-cta/20">
              Create My Profile Free
            </button>
            <button className="w-full sm:w-auto px-8 py-5 bg-white border-2 border-primary text-primary font-bold rounded-button text-lg hover:bg-primary/5 transition-all">
              See How It Works
            </button>
          </motion.div>

          {/* Stats Row */}
          <motion.div 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.3 }}
            className="mt-10 flex items-center justify-center lg:justify-start gap-8"
          >
            <div className="text-left group">
              <p className="text-3xl font-bold text-primary group-hover:scale-110 transition-transform cursor-default">↑ 38%</p>
              <p className="text-sm text-gray-text font-medium">more interview calls</p>
            </div>
            <div className="w-[1px] h-12 bg-gray-border"></div>
            <div className="text-left group">
              <p className="text-3xl font-bold text-primary group-hover:scale-110 transition-transform cursor-default">↑ 23%</p>
              <p className="text-sm text-gray-text font-medium">higher salary offers</p>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
};


