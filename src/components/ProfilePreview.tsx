"use client";
import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Globe, Smartphone, Monitor, CheckCircle2, MoreHorizontal, ArrowLeft, ArrowRight, RefreshCw, Mail, Phone, MapPin } from 'lucide-react';

export const ProfilePreview = () => {
  const [view, setView] = useState<'desktop' | 'mobile'>('desktop');

  return (
    <section id="preview" className="py-16 md:py-24 bg-white overflow-hidden">
      <div className="max-w-7xl mx-auto px-6 md:px-12 text-center mb-10 md:mb-16">
        <h2 className="text-2xl md:text-5xl font-black text-gray-900 font-syne uppercase italic tracking-tighter italic leading-tight">One profile for recruiters to love</h2>
        <p className="mt-4 md:mt-6 text-[10px] md:text-[11px] text-gray-400 font-black uppercase tracking-[0.2em] md:tracking-[0.3em] font-mono">Your iamfolio page is optimized for human reading and ATS systems.</p>
        
        {/* Toggle Controls */}
        <div className="mt-10 md:mt-12 inline-flex p-1 bg-gray-50 border border-gray-100 rounded-xl shadow-lg">
          <button 
            onClick={() => setView('desktop')}
            className={`flex items-center gap-2 px-6 md:px-8 py-2 md:py-3 rounded-lg font-black text-[9px] md:text-[10px] uppercase tracking-widest transition-all font-mono ${view === 'desktop' ? 'bg-[#6C3CE1] text-white shadow-[0_10px_20px_rgba(108,60,225,0.2)]' : 'text-gray-400 hover:text-gray-900'}`}
          >
            <Monitor className="w-4 h-4" /> <span className="hidden sm:inline">Desktop</span>
          </button>
          <button 
            onClick={() => setView('mobile')}
            className={`flex items-center gap-2 px-6 md:px-8 py-2 md:py-3 rounded-lg font-black text-[9px] md:text-[10px] uppercase tracking-widest transition-all font-mono ${view === 'mobile' ? 'bg-[#6C3CE1] text-white shadow-[0_10px_20px_rgba(108,60,225,0.2)]' : 'text-gray-400 hover:text-gray-900'}`}
          >
            <Smartphone className="w-4 h-4" /> <span className="hidden sm:inline">Mobile</span>
          </button>
        </div>
      </div>

      <div className="max-w-6xl mx-auto px-4 md:px-6 relative h-[500px] md:h-[800px] flex justify-center">
        <AnimatePresence mode="wait">
          {view === 'desktop' ? (
            <motion.div 
              key="desktop"
              initial={{ opacity: 0, scale: 0.95, y: 20 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.95, y: 20 }}
              transition={{ duration: 0.4 }}
              className="w-full origin-top scale-[0.6] sm:scale-[0.8] md:scale-100 bg-white rounded-t-3xl shadow-[0_40px_100px_rgba(0,0,0,0.1)] border border-gray-100 overflow-hidden flex flex-col"
            >
              {/* Browser Bar */}
              <div className="bg-gray-50 border-b border-gray-100 px-4 md:px-6 py-2 md:py-4 flex items-center gap-4 md:gap-6">
                <div className="flex gap-1 md:gap-2">
                  <div className="w-2.5 h-2.5 md:w-3.5 md:h-3.5 rounded-full bg-red-400"></div>
                  <div className="w-2.5 h-2.5 md:w-3.5 md:h-3.5 rounded-full bg-yellow-400"></div>
                  <div className="w-2.5 h-2.5 md:w-3.5 md:h-3.5 rounded-full bg-green-400"></div>
                </div>
                <div className="flex-1 bg-gray-100 border border-black/5 rounded-lg px-2 md:px-4 py-1 md:py-2 text-[9px] md:text-[11px] text-gray-500 text-left flex items-center gap-2 md:gap-3 font-mono">
                  <Globe className="w-3 h-3 md:w-4 md:h-4 text-[#6C3CE1]" />
                  <span className="text-gray-300 italic hidden sm:inline">https://</span>
                  <span className="text-gray-900">iamfolio.in/{'{'}username{'}'}</span>
                </div>
                <MoreHorizontal className="w-5 h-5 md:w-6 md:h-6 text-gray-200" />
              </div>

              {/* Profile Content */}
              <div className="bg-[#F8FAFC] p-4 md:p-12 overflow-auto flex-1 text-left">
                <div className="max-w-4xl mx-auto bg-white shadow-2xl rounded-sm border border-gray-200 p-6 md:p-12 flex flex-col md:flex-row gap-6 md:gap-10">
                  <div className="w-full md:w-1/3">
                    <div className="w-16 h-16 md:w-24 md:h-24 bg-primary/10 rounded-full overflow-hidden mb-4 md:mb-6 border-2 border-primary/20">
                      <img 
                        src="https://i.pravatar.cc/150?u=priyasharma_female" 
                        alt="Priya Sharma" 
                        className="w-full h-full object-cover"
                      />
                    </div>
                    <h3 className="text-xl md:text-2xl font-bold text-[#0F172A] font-syne uppercase">Priya Sharma</h3>
                    <p className="text-primary font-black italic text-xs md:text-sm font-mono tracking-tight leading-none mt-1 uppercase">Senior Product Designer</p>
                    <div className="mt-6 md:mt-8 space-y-4 pt-4 md:pt-6 border-t border-gray-100">
                      <div>
                        <p className="text-[9px] md:text-[10px] font-black text-[#94A3B8] uppercase tracking-widest mb-2 font-mono italic">Contact</p>
                        <p className="text-[12px] md:text-sm text-[#475569] font-medium flex items-center gap-2"><MapPin className="w-3 h-3" /> Chennai, India</p>
                        <p className="text-[12px] md:text-sm text-[#475569] font-medium flex items-center gap-2"><Mail className="w-3 h-3" /> priya@gmail.com</p>
                      </div>
                      <div className="hidden md:block">
                        <p className="text-[10px] font-black text-[#94A3B8] uppercase tracking-widest mb-2 font-mono italic">Skills</p>
                        <div className="flex flex-wrap gap-2">
                           {['Figma', 'React'].map(s => <span key={s} className="px-2 py-0.5 bg-gray-50 border border-gray-200 rounded text-[10px] font-black text-gray-600 uppercase font-mono">{s}</span>)}
                        </div>
                      </div>
                    </div>
                  </div>
                  <div className="w-full md:w-2/3 space-y-6 md:space-y-8">
                    <div>
                      <h4 className="text-[9px] md:text-[10px] font-black text-[#94A3B8] uppercase tracking-widest mb-3 border-b border-gray-100 pb-1 font-mono italic">Professional Summary</h4>
                      <p className="text-[12px] md:text-sm text-[#475569] leading-relaxed font-medium">
                        Award-winning Product Designer with 5+ years of experience specializing in high-growth SaaS applications. 
                      </p>
                    </div>
                    <div>
                      <h4 className="text-[9px] md:text-[10px] font-black text-[#94A3B8] uppercase tracking-widest mb-3 border-b border-gray-100 pb-1 font-mono italic">Experience</h4>
                      <div className="space-y-4 md:space-y-6">
                        <div className="relative pl-4 border-l-2 border-primary/20">
                           <div className="flex justify-between items-start">
                              <p className="text-[12px] md:text-sm font-bold text-[#0F172A]">Zoho Corporation</p>
                           </div>
                           <p className="text-[10px] md:text-[11px] text-primary font-black uppercase mt-1 font-mono tracking-tight leading-none italic">Jr. Designer</p>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </motion.div>
          ) : (
            <motion.div 
              key="mobile"
              initial={{ opacity: 0, scale: 0.9, y: 40 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.9, y: 40 }}
              transition={{ duration: 0.4 }}
              className="relative w-[280px] sm:w-[320px] h-[560px] sm:h-[640px] bg-white rounded-[48px] border-[12px] border-gray-900 shadow-[0_50px_100px_rgba(0,0,0,0.2)] overflow-hidden scale-[0.8] sm:scale-100 origin-top"
            >
              {/* iPhone Notch */}
              <div className="absolute top-0 left-1/2 -translate-x-1/2 w-36 h-8 bg-gray-900 rounded-b-3xl z-30 flex items-end justify-center pb-2">
                 <div className="w-12 h-1 bg-white/10 rounded-full"></div>
              </div>
              
              {/* Content Mobile (Light) */}
              <div className="h-full bg-white overflow-auto pt-16 px-6">
                 <div className="flex flex-col items-center gap-4 mt-8 text-center">
                    <div className="w-16 h-16 sm:w-20 sm:h-20 bg-primary/10 rounded-full overflow-hidden border-2 border-primary/20 shadow-xl">
                      <img 
                        src="https://i.pravatar.cc/150?u=priyasharma_female" 
                        alt="Priya Sharma" 
                        className="w-full h-full object-cover"
                      />
                    </div>
                    <div>
                       <h3 className="text-lg sm:text-xl font-bold text-[#0F172A] font-syne uppercase italic italic leading-none">Priya Sharma</h3>
                       <p className="text-[10px] sm:text-[11px] font-black text-primary mt-2 uppercase font-mono italic tracking-tight leading-none">Senior Product Designer</p>
                    </div>
                 </div>
                 
                 <div className="flex gap-2 mt-8">
                    <button className="flex-1 py-3 bg-primary text-white text-[9px] sm:text-[10px] font-black uppercase tracking-widest rounded-lg font-mono">Email</button>
                    <button className="flex-1 py-3 border-2 border-primary text-primary text-[9px] sm:text-[10px] font-black uppercase tracking-widest rounded-lg font-mono">WhatsApp</button>
                 </div>

                 <div className="mt-8 space-y-6 pb-20">
                    <div className="p-4 sm:p-5 bg-gray-50 rounded-2xl border border-gray-100 text-left">
                       <h4 className="text-[8px] sm:text-[9px] font-black text-[#94A3B8] uppercase tracking-widest mb-3 border-b border-gray-100 pb-2 font-mono italic">Summary</h4>
                       <p className="text-[12px] sm:text-[13px] text-[#475569] font-medium leading-relaxed">
                          Focused on building scalable SaaS interfaces and improving user experience.
                       </p>
                    </div>
                 </div>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>

      <div className="max-w-7xl mx-auto px-6 mt-16 text-center">
         <p className="text-[12px] font-black text-[#6C3CE1] uppercase tracking-[0.4em] font-mono italic">"Recruiters are 3x more likely to view your manifest if shared via link."</p>
      </div>
    </section>
  );
};




