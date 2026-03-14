"use client";
import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Globe, Smartphone, Monitor, CheckCircle2, MoreHorizontal, ArrowLeft, ArrowRight, RefreshCw, Mail, Phone, MapPin } from 'lucide-react';

export const ProfilePreview = () => {
  const [view, setView] = useState<'desktop' | 'mobile'>('desktop');

  return (
    <section id="preview" className="py-24 bg-white overflow-hidden">
      <div className="max-w-7xl mx-auto px-6 md:px-12 text-center mb-16">
        <h2 className="text-4xl md:text-5xl font-bold text-dark tracking-tight">One profile for recruiters to love</h2>
        <p className="mt-4 text-xl text-gray-text font-medium">Your iamfolio page is optimized for human reading and ATS systems.</p>
        
        {/* Toggle Controls */}
        <div className="mt-10 inline-flex p-1 bg-gray-bg rounded-lg">
          <button 
            onClick={() => setView('desktop')}
            className={`flex items-center gap-2 px-6 py-2 rounded-md font-bold text-sm transition-all ${view === 'desktop' ? 'bg-white text-primary shadow-sm' : 'text-gray-text hover:text-dark'}`}
          >
            <Monitor className="w-4 h-4" /> Desktop
          </button>
          <button 
            onClick={() => setView('mobile')}
            className={`flex items-center gap-2 px-6 py-2 rounded-md font-bold text-sm transition-all ${view === 'mobile' ? 'bg-white text-primary shadow-sm' : 'text-gray-text hover:text-dark'}`}
          >
            <Smartphone className="w-4 h-4" /> Mobile
          </button>
        </div>
      </div>

      <div className="max-w-5xl mx-auto px-6 relative h-[700px] md:h-[800px] flex justify-center">
        <AnimatePresence mode="wait">
          {view === 'desktop' ? (
            <motion.div 
              key="desktop"
              initial={{ opacity: 0, scale: 0.95, y: 20 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.95, y: 20 }}
              transition={{ duration: 0.4 }}
              className="w-full bg-white rounded-t-xl shadow-2xl border border-gray-border overflow-hidden flex flex-col"
            >
              {/* Browser Bar */}
              <div className="bg-gray-50 border-b border-gray-border px-4 py-3 flex items-center gap-4">
                <div className="flex gap-1.5">
                  <div className="w-3 h-3 rounded-full bg-red-400"></div>
                  <div className="w-3 h-3 rounded-full bg-yellow-400"></div>
                  <div className="w-3 h-3 rounded-full bg-green-400"></div>
                </div>
                <div className="flex-1 bg-white border border-gray-border rounded-md px-3 py-1 text-sm text-gray-text text-left flex items-center gap-2">
                  <Globe className="w-3.5 h-3.5 text-gray-400" />
                  <span className="text-gray-400 italic">https://</span>iamfolio.in/priyasharma
                </div>
                <MoreHorizontal className="w-5 h-5 text-gray-light" />
              </div>

              {/* Profile Content */}
              <div className="bg-gray-50 p-8 md:p-12 overflow-auto flex-1 text-left">
                <div className="max-w-4xl mx-auto bg-white shadow-lg rounded-sm border border-gray-200 p-8 md:p-12 flex flex-col md:flex-row gap-10">
                  <div className="w-full md:w-1/3">
                    <div className="w-24 h-24 bg-primary/10 rounded-full flex items-center justify-center text-primary text-3xl font-bold mb-6">PS</div>
                    <h3 className="text-2xl font-bold text-dark">Priya Sharma</h3>
                    <p className="text-primary font-bold italic">Senior Product Designer</p>
                    <div className="mt-8 space-y-4 pt-6 border-t border-gray-100">
                      <div>
                        <p className="text-[10px] font-bold text-gray-light uppercase tracking-widest mb-2">Contact</p>
                        <p className="text-sm text-gray-text font-medium flex items-center gap-2"><MapPin className="w-3 h-3" /> Chennai, India</p>
                        <p className="text-sm text-gray-text font-medium flex items-center gap-2"><Mail className="w-3 h-3" /> priya@gmail.com</p>
                      </div>
                      <div>
                        <p className="text-[10px] font-bold text-gray-light uppercase tracking-widest mb-2">Skills</p>
                        <div className="flex flex-wrap gap-2">
                           {['Figma', 'React', 'Design Systems', 'User Research'].map(s => <span key={s} className="px-2 py-0.5 bg-gray-50 border border-gray-200 rounded text-[10px] font-bold text-gray-600">{s}</span>)}
                        </div>
                      </div>
                    </div>
                  </div>
                  <div className="w-full md:w-2/3 space-y-8">
                    <div>
                      <h4 className="text-[10px] font-bold text-gray-light uppercase tracking-widest mb-3 border-b border-gray-100 pb-1">Professional Summary</h4>
                      <p className="text-sm text-gray-text leading-relaxed font-medium">
                        Award-winning Product Designer with 5+ years of experience specializing in high-growth SaaS applications. 
                        Proven track record of building scalable design systems and improving user retention by 30% through data-driven UI/UX strategies.
                      </p>
                    </div>
                    <div>
                      <h4 className="text-[10px] font-bold text-gray-light uppercase tracking-widest mb-3 border-b border-gray-100 pb-1">Relevant Experience</h4>
                      <div className="space-y-6">
                        <div className="relative pl-4 border-l-2 border-primary/20">
                           <div className="flex justify-between items-start">
                              <p className="text-sm font-bold text-dark">Zoho Corporation</p>
                              <p className="text-[10px] text-gray-light font-bold">2023 - Present</p>
                           </div>
                           <p className="text-[11px] text-primary font-extrabold uppercase mt-1">Jr. UI/UX Designer</p>
                           <ul className="mt-3 space-y-2">
                              <li className="flex gap-2">
                                <span className="w-1 h-1 bg-primary rounded-full mt-1.5 shrink-0"></span>
                                <p className="text-[13px] text-gray-text font-medium">Redesigned the core CRM mobile dashboard for 500k+ users, increasing daily engagement by 24%.</p>
                              </li>
                              <li className="flex gap-2">
                                <span className="w-1 h-1 bg-primary rounded-full mt-1.5 shrink-0"></span>
                                <p className="text-[13px] text-gray-text font-medium">Spearheaded the creation of a cross-platform design system, reducing dev-to-design friction by 40%.</p>
                              </li>
                           </ul>
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
              className="relative w-[300px] h-[600px] bg-black rounded-[45px] border-[8px] border-black shadow-2xl overflow-hidden"
            >
              {/* iPhone Notch */}
              <div className="absolute top-0 left-1/2 -translate-x-1/2 w-32 h-7 bg-black rounded-b-3xl z-30 flex items-end justify-center pb-1">
                 <div className="w-10 h-1 bg-gray-900 rounded-full"></div>
              </div>
              
              {/* Content Mobile */}
              <div className="h-full bg-white overflow-auto pt-12 px-6">
                 <div className="flex flex-col items-center gap-4 mt-8 text-center">
                    <div className="w-20 h-20 bg-primary/10 rounded-full flex items-center justify-center text-primary text-2xl font-bold">PS</div>
                    <div>
                       <h3 className="text-xl font-bold text-dark leading-tight">Priya Sharma</h3>
                       <p className="text-sm font-bold text-primary mt-1 italic">Senior Product Designer</p>
                    </div>
                 </div>
                 
                 <div className="flex gap-2 mt-8">
                    <button className="flex-1 py-2.5 bg-primary text-white text-[12px] font-bold rounded-lg shadow-lg shadow-primary/20">Email</button>
                    <button className="flex-1 py-2.5 border-2 border-primary text-primary text-[12px] font-bold rounded-lg">WhatsApp</button>
                 </div>

                 <div className="mt-8 space-y-6">
                    <div className="p-4 bg-gray-bg rounded-xl border border-gray-100">
                       <h4 className="text-[10px] font-bold text-gray-light uppercase tracking-widest mb-2 border-b border-gray-100 pb-1">Professional Summary</h4>
                       <p className="text-[13px] text-gray-text font-medium leading-relaxed">
                          Focused on building scalable SaaS interfaces and improving user retention by 30% through research.
                       </p>
                    </div>
                    
                    <div className="space-y-4">
                       <h4 className="text-[10px] font-bold text-dark uppercase tracking-widest flex items-center gap-2">
                          <CheckCircle2 className="w-3 h-3 text-primary" /> Core Expertise
                       </h4>
                       <div className="flex flex-wrap gap-2">
                           {['Figma', 'React', 'Design Systems'].map(s => <span key={s} className="px-3 py-1 bg-primary/5 text-primary text-[11px] font-bold rounded-full">{s}</span>)}
                       </div>
                    </div>
                 </div>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>

      <div className="max-w-7xl mx-auto px-6 mt-16 text-center">
         <p className="text-lg font-bold text-dark italic">"Recruiters are 3x more likely to view your full profile if shared via link."</p>
      </div>
    </section>
  );
};




