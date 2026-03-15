"use client";
import React, { useRef, useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { ChevronLeft, ChevronRight, Zap, Star } from 'lucide-react';

const profileData = {
  name: "Devaprakash J",
  initials: "DJ",
  role: "AI/ML & Full Stack Developer",
  location: "Chennai, Tamil Nadu, India",
  email: "devaprakashofficial@gmail.com",
  linkedin: "linkedin.com/in/devaprakashj",
  portfolio: "iamfolio.in/devaprakash",
  experience: [
    { role: "AI Software Developer", company: "Upwork", period: "2024–Present", bullet: "Built ML models for 15+ international clients" },
    { role: "Full Stack Developer", company: "Fiverr", period: "2021–Present", bullet: "50+ web apps · 4.9★ rating over 4 years" },
    { role: "AI Consultant", company: "Amazon MTurk", period: "2025–Present", bullet: "AI consulting & model evaluation" },
    { role: "ML Intern", company: "Codec Technologies", period: "2025", bullet: "Built ML pipelines using Python & Pandas" }
  ],
  skills_tech: ["Python", "Machine Learning", "React", "Node.js", "Firebase", "Pandas"],
  skills_tools: ["Tableau", "Git", "Jupyter", "yfinance API"],
  education: { degree: "B.Tech CSE (AI & ML)", institution: "RIT", period: "2024–2028" },
  certifications: ["Tableau Desktop Certified", "Accenture UK Simulation", "Web Apps Hacking"],
  projects: [
    { name: "Stock Market Predictor", tech: "Python · yfinance · ML", desc: "ML model predicting stock movements" },
    { name: "TechSpark Website", tech: "Next.js · Firebase", desc: "Event management for college club" }
  ]
};

const templates = [
  { id: 'classic-pro', name: "Classic Pro", badge: "BEST SELLER", badgeColor: "bg-[#6EE7B7] text-black", score: 98 },
  { id: 'creative-bold', name: "Creative Bold", badge: "CREATIVE", badgeColor: "bg-[#FF6B35] text-white", score: 94 },
  { id: 'executive-dark', name: "Executive Dark", badge: "EXECUTIVE", badgeColor: "bg-[#60A5FA] text-black", score: 96 },
  { id: 'developer-dark', name: "Developer Dark", badge: "DEVELOPER", badgeColor: "bg-[#6C3CE1] text-white", score: 91 },
  { id: 'minimal-clean', name: "Minimal Clean", badge: "MINIMAL", badgeColor: "bg-[#64748B] text-white", score: 99 },
  { id: 'indian-corporate', name: "Indian Corporate", badge: "CORPORATE", badgeColor: "bg-[#F87171] text-white", score: 97 },
  { id: 'purple-sidebar', name: "Purple Sidebar", badge: "MODERN", badgeColor: "bg-[#6C3CE1] text-white", score: 93 },
  { id: 'teal-creative', name: "Teal Creative", badge: "CREATIVE", badgeColor: "bg-[#2DD4BF] text-white", score: 92 },
];

export const TemplateGallery = () => {
  const scrollRef = useRef<HTMLDivElement>(null);
  const [activeIndex, setActiveIndex] = useState(0);

  const scroll = (direction: 'left' | 'right') => {
    if (scrollRef.current) {
      const { scrollLeft, clientWidth } = scrollRef.current;
      const scrollTo = direction === 'left' ? scrollLeft - clientWidth : scrollLeft + clientWidth;
      scrollRef.current.scrollTo({ left: scrollTo, behavior: 'smooth' });
    }
  };

  const handleScroll = () => {
    if (scrollRef.current) {
      const { scrollLeft, clientWidth } = scrollRef.current;
      setActiveIndex(Math.round(scrollLeft / clientWidth));
    }
  };

  const renderLayout = (id: string) => {
    const { name, initials, role, location, email, experience, education, skills_tech, certifications, projects } = profileData;

    switch (id) {
      case 'classic-pro':
        return (
          <div className="h-full flex bg-white text-[7px]">
            <aside className="w-[35%] bg-[#1F4E79] p-4 text-white flex flex-col items-center">
              <div className="w-10 h-10 rounded-full bg-white text-[#1F4E79] flex items-center justify-center font-bold text-lg mb-2">{initials}</div>
              <p className="font-black text-[9px] text-center">{name.toUpperCase()}</p>
              <p className="text-[6px] text-[#93C5FD] mb-4 text-center">AI/ML Developer</p>
              <div className="w-full h-[0.5px] bg-white/20 mb-4" />
              <p className="font-bold text-[6px] w-full mb-1 uppercase">Contact</p>
              <div className="w-full space-y-1 opacity-80 mb-4">
                <p>📍 {location}</p>
                <p className="text-[5px]">✉ {email}</p>
              </div>
              <p className="font-bold text-[6px] w-full mb-1 uppercase">Skills</p>
              <div className="flex flex-wrap gap-1">
                {['Python', 'React', 'ML', 'Node.js'].map(s => (
                  <span key={s} className="px-1.5 py-0.5 bg-white/10 rounded">{s}</span>
                ))}
              </div>
            </aside>
            <main className="w-[65%] p-4 text-black text-left">
              <p className="font-black text-[#1F4E79] border-b border-[#1F4E79] mb-2 uppercase">Experience</p>
              {experience.slice(0, 2).map((exp, i) => (
                <div key={i} className="mb-2">
                  <p className="font-bold">{exp.role} — {exp.company}</p>
                  <p className="italic text-[6px]">{exp.period}</p>
                  <p className="text-gray-500 leading-tight">"{exp.bullet}"</p>
                </div>
              ))}
              <p className="font-black text-[#1F4E79] border-b border-[#1F4E79] mb-2 mt-4 uppercase">Education</p>
              <p className="font-bold">{education.degree}</p>
              <p className="opacity-70">{education.institution}</p>
            </main>
          </div>
        );
      case 'creative-bold':
        return (
          <div className="h-full bg-white text-[7px]">
            <header className="bg-[#10B981] p-4 text-white flex items-center justify-between">
              <div className="flex items-center gap-2">
                <div className="w-8 h-8 rounded-full bg-white text-[#10B981] flex items-center justify-center font-bold text-base">{initials}</div>
                <div className="text-left">
                  <p className="font-black text-[10px]">{name}</p>
                  <p className="text-[6px] opacity-80 uppercase tracking-tighter">AI/ML & FULL STACK DEVELOPER</p>
                </div>
              </div>
            </header>
            <div className="p-4 grid grid-cols-2 gap-4 text-left">
              <div className="space-y-4">
                <p className="font-black text-[#10B981] uppercase">Arsenal</p>
                <div className="flex flex-wrap gap-1">
                  {skills_tech.slice(0, 4).map(s => <span key={s} className="px-2 py-0.5 bg-[#10B981] text-white rounded-full text-[5px] font-bold">{s}</span>)}
                </div>
              </div>
              <div className="space-y-4">
                <p className="font-black text-[#10B981] uppercase">Projects</p>
                {projects.slice(0, 2).map((p, i) => (
                  <div key={i} className="p-1.5 border border-[#10B981] rounded-lg">
                    <p className="font-black leading-tight">{p.name}</p>
                    <p className="text-[5px] text-[#10B981] truncate">{p.tech}</p>
                  </div>
                ))}
              </div>
            </div>
            <div className="px-4 mt-auto pb-4 text-left">
              <p className="font-black text-[#10B981] mb-1 uppercase">Experience</p>
              <div className="space-y-1 text-gray-500 font-bold">
                {experience.slice(0, 2).map((exp, i) => <p key={i}>{exp.company} · {exp.role}</p>)}
              </div>
            </div>
          </div>
        );
      case 'executive-dark':
        return (
          <div className="h-full bg-white text-[7px]">
            <header className="bg-[#0F172A] p-4 text-white text-left">
              <div className="flex items-center gap-3">
                <div className="w-8 h-8 rounded-full bg-[#6C3CE1] flex items-center justify-center font-bold text-base shadow-lg">{initials}</div>
                <div>
                  <p className="font-black text-[10px] tracking-widest leading-none">{name.toUpperCase()}</p>
                  <p className="text-[6px] text-[#60A5FA] mt-1 font-mono">ENGR // AI_ML</p>
                </div>
              </div>
            </header>
            <div className="p-4 grid grid-cols-2 gap-6 text-left">
              <div className="space-y-4">
                <p className="font-black text-[#0F172A] border-l-2 border-[#60A5FA] pl-2 uppercase tracking-widest">Experience</p>
                {experience.slice(0, 2).map((exp, i) => (
                  <div key={i} className="relative">
                    <p className="font-black">{exp.role}</p>
                    <p className="text-[#60A5FA] font-bold mb-1">{exp.company}</p>
                    <p className="text-gray-400 leading-tight">"{exp.bullet}"</p>
                  </div>
                ))}
              </div>
              <div className="space-y-4">
                <p className="font-black text-[#0F172A] border-l-2 border-[#60A5FA] pl-2 uppercase tracking-widest">Stats</p>
                <ul className="space-y-2 font-bold text-[#0F172A] opacity-70">
                  <li>• 50+ Web Apps</li>
                  <li>• 15+ AI Clients</li>
                  <li>• 4.9★ Rating</li>
                </ul>
              </div>
            </div>
          </div>
        );
      case 'developer-dark':
        return (
          <div className="h-full bg-black text-[7px] text-left">
            <header className="p-4 border-b border-[#6EE7B7]/20 flex items-center justify-between">
              <div className="flex items-center gap-3">
                <div className="w-8 h-8 border border-[#6EE7B7] rounded-full flex items-center justify-center font-black text-[#6EE7B7]">{initials}</div>
                <div>
                  <p className="text-white font-black text-[10px]">{name}</p>
                  <p className="text-[#6EE7B7] font-mono leading-none">DEV_GRID // AI_ML</p>
                </div>
              </div>
            </header>
            <div className="p-4 space-y-4 font-mono">
              <div>
                <p className="text-[#6EE7B7] mb-2 uppercase tracking-widest text-[6px] opacity-60 font-black">// SKILLS</p>
                <div className="flex flex-wrap gap-1.5">
                  {skills_tech.slice(0, 5).map(s => <span key={s} className="px-2 py-0.5 border border-[#6EE7B7]/40 text-[#6EE7B7] rounded text-[5px] uppercase">{s}</span>)}
                </div>
              </div>
              <div className="space-y-3">
                <p className="text-[#6EE7B7] uppercase tracking-widest text-[6px] opacity-60 font-black">// EXP</p>
                {experience.slice(0, 2).map((exp, i) => (
                  <div key={i} className="bg-[#1A1A2E] p-3 border border-[#6EE7B7]/10 rounded-lg">
                    <p className="text-[#6EE7B7] font-black">{exp.role}</p>
                    <p className="text-[#64748B] text-[6px] mb-1">{exp.company}</p>
                    <p className="text-white opacity-60 leading-relaxed font-sans line-clamp-2">{exp.bullet}</p>
                  </div>
                ))}
              </div>
            </div>
          </div>
        );
      case 'minimal-clean':
        return (
          <div className="h-full bg-white text-[7px] p-6 text-black border-[3px] border-black m-2 text-left">
            <header className="border-b-[3px] border-black pb-3 mb-4">
              <p className="font-black text-lg tracking-[0.2em]">{name.toUpperCase()}</p>
              <p className="text-gray-400 font-bold uppercase tracking-widest leading-none mt-1">AI/ML & FULL STACK DEVELOPER</p>
            </header>
            <main className="space-y-4">
              <div>
                <p className="font-black text-[8px] border-b-[2px] border-black mb-2 uppercase">Experience</p>
                <div className="space-y-2">
                   {experience.slice(0, 3).map((exp, i) => (
                     <p key={i} className="flex justify-between font-bold"><span>{exp.company}</span> <span>{exp.period}</span></p>
                   ))}
                </div>
              </div>
              <div>
                <p className="font-black text-[8px] border-b-[2px] border-black mb-2 uppercase">Capabilities</p>
                <p className="leading-relaxed opacity-70 font-bold">{skills_tech.join(', ')}</p>
              </div>
            </main>
          </div>
        );
      case 'indian-corporate':
        return (
          <div className="h-full bg-white text-[7px] text-left">
            <header className="bg-[#003366] p-4 text-white text-center">
              <p className="font-black text-[10px] tracking-widest">{name.toUpperCase()}</p>
              <p className="text-[#93C5FD] leading-tight font-bold">AI/ML & FULL STACK DEVELOPER</p>
              <p className="text-[5px] opacity-60 mt-1 uppercase tracking-widest">Chennai | {email}</p>
            </header>
            <div className="h-[3px] bg-[#FF6600] w-full" />
            <div className="p-4 space-y-4">
              <div>
                <p className="font-black text-[#003366] border-b border-[#003366] mb-1 uppercase tracking-tighter italic">Professional Summary</p>
                <p className="text-gray-600 leading-relaxed italic font-bold">Passionate developer with 4+ years experience building scalable solutions.</p>
              </div>
              <div className="space-y-3">
                <p className="font-black text-[#003366] border-b border-[#003366] mb-2 uppercase tracking-tighter italic">Experience</p>
                {experience.slice(0, 3).map((exp, i) => (
                  <p key={i} className="mb-1 font-bold text-gray-800">· {exp.role} at {exp.company}</p>
                ))}
              </div>
            </div>
          </div>
        );
      case 'purple-sidebar':
        return (
          <div className="h-full flex bg-white text-[6px] text-left">
            <aside className="w-[38%] bg-[#6C3CE1] p-4 text-white">
              <div className="w-10 h-10 rounded-full bg-white text-[#6C3CE1] flex items-center justify-center font-bold text-lg mb-4">{initials}</div>
              <p className="font-black text-[9px] leading-tight">{name}</p>
              <p className="opacity-70 mt-1 uppercase font-black text-[5px] tracking-widest">AI/ML DEVELOPER</p>
              <div className="w-full h-px bg-white/20 my-4" />
              <p className="font-black uppercase mb-3 tracking-[0.2em] text-[5px] opacity-60">Competencies</p>
              <div className="space-y-2">
                 {['Python', 'React', 'ML'].map(s => (
                   <div key={s} className="space-y-1">
                      <p className="flex justify-between font-black uppercase"><span>{s}</span> <span>85%</span></p>
                      <div className="w-full h-1 bg-white/20 rounded-full"><div className="w-[85%] h-full bg-white" /></div>
                   </div>
                 ))}
              </div>
            </aside>
            <main className="flex-1 p-5 space-y-5">
               <div>
                  <p className="text-[8px] font-black text-[#6C3CE1] uppercase mb-2 tracking-widest border-b border-[#6C3CE1]/20 pb-1 italic italic">Career Node</p>
                  {experience.slice(0, 3).map((exp, i) => (
                    <div key={i} className="mb-2">
                      <p className="font-black text-black uppercase">{exp.role}</p>
                      <p className="text-[#6C3CE1] font-bold opacity-60">{exp.company}</p>
                    </div>
                  ))}
               </div>
            </main>
          </div>
        );
      case 'teal-creative':
        return (
          <div className="h-full bg-white text-[7px] text-left">
            <header className="bg-gradient-to-r from-[#0F766E] to-[#0D9488] p-5 text-white flex items-center justify-between">
              <div className="flex items-center gap-3">
                <div className="w-9 h-9 rounded-full bg-white text-[#0D9488] flex items-center justify-center font-bold text-lg">{initials}</div>
                <div>
                   <p className="font-black text-[10px] uppercase">{name}</p>
                   <p className="text-teal-100 opacity-80 uppercase font-bold text-[5px] tracking-widest mt-0.5">AI/ML & FULL STACK DEVELOPER</p>
                </div>
              </div>
            </header>
            <div className="p-5 space-y-6">
               <div className="border-l-[3px] border-[#0D9488] pl-3">
                  <p className="font-black text-[#0D9488] uppercase tracking-widest mb-3 text-[8px] leading-none">Experience</p>
                  <div className="space-y-3">
                    {experience.slice(0, 2).map((exp, i) => <p key={i} className="font-bold text-gray-800 tracking-tight leading-relaxed">· {exp.role} @ {exp.company}</p>)}
                  </div>
               </div>
               <div className="border-l-[3px] border-[#0D9488] pl-3">
                  <p className="font-black text-[#0D9488] uppercase tracking-widest mb-3 text-[8px] leading-none">Hard Skills</p>
                  <div className="flex flex-wrap gap-1.5">
                    {skills_tech.slice(0, 5).map(s => <span key={s} className="px-2 py-0.5 bg-teal-50 text-[#0D9488] font-black rounded border border-[#0D9488]/10">{s}</span>)}
                  </div>
               </div>
            </div>
          </div>
        );
      default:
        return null;
    }
  };

  return (
    <section id="templates" className="relative overflow-hidden pt-20 md:pt-32 pb-24 md:pb-40 bg-white">
      <div className="flex flex-col md:flex-row justify-between items-start md:items-end mb-12 md:mb-20 px-6 md:px-12 gap-8">
        <div className="max-w-3xl">
          <h3 className="text-[32px] sm:text-[42px] md:text-[64px] font-black text-gray-900 font-syne uppercase italic tracking-tighter leading-[0.9] sm:leading-none">
            ⭐ PREMIUM TEMPLATES
          </h3>
          <p className="text-gray-400 font-black mt-4 md:mt-6 uppercase tracking-[0.3em] font-mono text-[10px] md:text-[12px] leading-relaxed max-w-xl italic">
            PICK YOUR VIBE. TRANSFORM YOUR PROFESSIONAL WORLD. ALL TEMPLATES ATS CO-PROCESSOR READY.
          </p>
        </div>
        <div className="flex gap-4 self-end md:self-auto">
          <button onClick={() => scroll('left')} className="p-5 md:p-6 rounded-full border border-gray-100 bg-gray-50 text-gray-400 hover:bg-[#6C3CE1] hover:text-white transition-all shadow-xl active:scale-95 group"><ChevronLeft size={24} className="group-hover:scale-110" /></button>
          <button onClick={() => scroll('right')} className="p-5 md:p-6 rounded-full border border-gray-100 bg-gray-50 text-gray-400 hover:bg-[#6C3CE1] hover:text-white transition-all shadow-xl active:scale-95 group"><ChevronRight size={24} className="group-hover:scale-110" /></button>
        </div>
      </div>

      <div 
        ref={scrollRef}
        onScroll={handleScroll}
        className="flex gap-6 md:gap-10 overflow-x-auto pb-12 md:pb-16 px-6 md:px-12 no-scrollbar scroll-smooth snap-x touch-pan-x"
        style={{ scrollbarWidth: 'none', msOverflowStyle: 'none' }}
      >
        {templates.map((template, index) => (
          <motion.div
            key={index}
            className="flex-shrink-0 w-[85vw] sm:w-[320px] lg:w-[300px] xl:w-[280px] group snap-center"
          >
            <div className="relative h-[480px] md:h-[500px] rounded-[24px] overflow-hidden shadow-[0_20px_50px_rgba(0,0,0,0.1)] border border-gray-100 bg-white transition-all duration-500 group-hover:scale-[1.03] group-hover:translate-y-[-8px] group-hover:shadow-[0_40px_80px_rgba(108,60,225,0.1)]">
              {renderLayout(template.id)}
              
              <div className={`absolute top-6 left-6 px-4 py-1.5 font-black text-[9px] uppercase rounded-full shadow-2xl ${template.badgeColor} z-20 tracking-widest italic`}>
                {template.badge}
              </div>

              {/* Hover Overlay */}
              <div className="absolute inset-0 bg-[#0A0A0F]/60 opacity-0 group-hover:opacity-100 transition-all duration-500 flex items-center justify-center p-8 backdrop-blur-[2px]">
                 <button className="w-full py-5 bg-[#6C3CE1] text-white font-black text-[12px] uppercase tracking-[0.3em] rounded-sm shadow-2xl hover:bg-[#FF6B35] transition-all transform translate-y-8 group-hover:translate-y-0 duration-500 font-mono italic border border-white/20">
                   USE TEMPLATE →
                 </button>
              </div>
            </div>

            <div className="mt-8 text-center space-y-2">
              <h4 className="text-[14px] font-black text-gray-900 uppercase tracking-[0.3em] font-mono italic opacity-60 group-hover:opacity-100 transition-opacity">{template.name.toUpperCase()}</h4>
              <p className="text-[10px] font-black text-[#6C3CE1] uppercase tracking-[0.3em] font-mono italic bg-[#6C3CE1]/10 inline-block px-3 py-1 rounded-full border border-[#6C3CE1]/20">ATS_NODE: {template.score}/100</p>
            </div>
          </motion.div>
        ))}
      </div>

      {/* Progress indicators */}
      <div className="flex justify-center gap-4 mt-8 md:mt-12">
        {Array.from({ length: Math.ceil(templates.length / 1) }).map((_, i) => (
          <div key={i} className={`h-1.5 rounded-full transition-all duration-500 ${activeIndex === i ? 'w-12 bg-[#6C3CE1]' : 'w-2 bg-gray-200'}`} />
        ))}
      </div>
    </section>
  );
};
