"use client";
import React, { useEffect, useState } from 'react';
import { useParams, useRouter } from 'next/navigation';
import Link from 'next/link';
import { motion, AnimatePresence } from 'framer-motion';
import { 
  Github, 
  Linkedin, 
  Globe, 
  Mail, 
  MapPin, 
  Briefcase, 
  GraduationCap, 
  Code, 
  Award,
  ChevronRight,
  ExternalLink,
  Download,
  Terminal as TerminalIcon,
  Cpu,
  Layers,
  Zap,
  ArrowUpRight,
  FileText,
  ShieldCheck,
  Star,
  Activity,
  Smartphone,
  Menu,
  X
} from 'lucide-react';

interface Experience {
  role: string;
  company: string;
  location?: string;
  period: string;
  points?: string[];
}

interface Education {
  degree: string;
  institution: string;
  location?: string;
  period: string;
}

interface PortfolioProfile {
  username: string;
  name: string;
  title: string;
  location: string;
  email: string;
  linkedin?: string;
  github?: string;
  website?: string;
  summary: string;
  skills: string[];
  experience: Experience[];
  education: Education[];
  certifications: string[];
}

export function PortfolioPage({ profile }: { profile: PortfolioProfile }) {
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: { 
      opacity: 1,
      transition: { staggerChildren: 0.1, delayChildren: 0.2 }
    }
  };

  const itemVariants: any = {
    hidden: { y: 20, opacity: 0 },
    visible: { y: 0, opacity: 1, transition: { duration: 0.5, ease: "easeOut" } }
  };

  return (
    <div className="min-h-screen bg-[#0A0A0F] text-white font-mono selection:bg-[#6EE7B7]/30 overflow-x-hidden relative">
      {/* Background System */}
      <div className="fixed inset-0 pointer-events-none -z-10">
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_2px_2px,_rgba(255,255,255,0.05)_1px,_transparent_0)] bg-[size:32px_32px]" />
        <div className="absolute inset-0 bg-gradient-to-b from-[#0A0A0F] via-transparent to-[#0A0A0F]" />
        <div className="absolute inset-0 bg-[url('https://grainy-gradients.vercel.app/noise.svg')] opacity-[0.05] contrast-150 brightness-150" />
      </div>

      {/* 1. Sticky Navbar */}
      <nav className="fixed top-0 left-0 right-0 z-50 px-6 py-5 bg-[#0A0A0F]/50 backdrop-blur-xl border-b border-white/5">
        <div className="max-w-7xl mx-auto flex justify-between items-center">
          <Link href="/" className="group flex items-center gap-2">
            <div className="w-8 h-8 bg-gradient-to-br from-[#6C3CE1] to-[#6EE7B7] rounded flex items-center justify-center text-white font-black text-sm italic">
              IF
            </div>
            <span className="text-[10px] md:text-xs font-black tracking-widest text-[#6EE7B7] uppercase group-hover:text-white transition-colors">
              iamfolio / {profile.username}
            </span>
          </Link>
          
          {/* Desktop Nav */}
          <div className="hidden md:flex items-center gap-10">
            {['Experience', 'Skills', 'Certifications', 'Contact'].map((link) => (
              <a 
                key={link} 
                href={`#${link.toLowerCase()}`} 
                className="text-[10px] font-black uppercase tracking-[0.2em] text-white/40 hover:text-[#6EE7B7] transition-all relative group"
              >
                {link}
                <span className="absolute -bottom-1 left-0 w-0 h-px bg-[#6EE7B7] group-hover:w-full transition-all duration-300" />
              </a>
            ))}
            <motion.a 
               href={`mailto:${profile.email}`}
               whileHover={{ scale: 1.05 }}
               whileTap={{ scale: 0.95 }}
               className="px-6 py-2.5 bg-[#6EE7B7] text-black text-[10px] font-black uppercase tracking-widest rounded-sm hover:shadow-[0_0_20px_#6EE7B740] transition-all italic"
            >
               Hire Me
            </motion.a>
          </div>

          {/* Mobile Menu Toggle */}
          <button onClick={() => setIsMenuOpen(!isMenuOpen)} className="md:hidden p-2 text-[#64748B] hover:text-white transition-colors">
            {isMenuOpen ? <X size={20} /> : <Menu size={20} />}
          </button>
        </div>

        {/* Mobile Nav */}
        <AnimatePresence>
          {isMenuOpen && (
            <motion.div 
              initial={{ height: 0, opacity: 0 }}
              animate={{ height: 'auto', opacity: 1 }}
              exit={{ height: 0, opacity: 0 }}
              className="md:hidden mt-5 pt-5 border-t border-white/5 space-y-4 overflow-hidden"
            >
              {['Experience', 'Skills', 'Certifications', 'Contact'].map((link) => (
                <a 
                  key={link} 
                  href={`#${link.toLowerCase()}`} 
                  onClick={() => setIsMenuOpen(false)}
                  className="block text-[11px] font-black uppercase tracking-widest text-white/60"
                >
                  {link}
                </a>
              ))}
              <a 
                href={`mailto:${profile.email}`}
                className="block w-full py-4 bg-[#6EE7B7] text-black text-center text-[10px] font-black uppercase tracking-widest rounded-sm italic"
              >
                Hire Me
              </a>
            </motion.div>
          )}
        </AnimatePresence>
      </nav>

      <motion.main 
        variants={containerVariants}
        initial="hidden"
        animate="visible"
        className="max-w-7xl mx-auto px-6 pt-32 sm:pt-40 md:pt-48 pb-20 space-y-32 sm:space-y-40 md:space-y-60"
      >
        {/* 2. Hero Section */}
        <section className="flex flex-col-reverse lg:flex-row gap-12 sm:gap-16 lg:gap-20 items-center lg:min-h-[70vh]">
          <motion.div variants={itemVariants} className="space-y-8 sm:space-y-12 text-center lg:text-left flex-1">
            <div className="space-y-6">
              <div className="flex items-center justify-center lg:justify-start gap-3 text-[#6EE7B7]">
                <Activity size={12} className="animate-pulse" />
                <span className="text-[10px] font-black uppercase tracking-[0.4em] italic leading-none">Available_for_Opportunities // 2026</span>
              </div>
              <h1 className="text-[38px] sm:text-[54px] md:text-[72px] lg:text-[88px] font-black font-syne tracking-tight leading-[0.95] text-white uppercase italic">
                {profile.name}
              </h1>
              <p className="text-lg sm:text-2xl md:text-3xl font-bold text-[#6EE7B7] uppercase tracking-tighter bg-[#6EE7B7]/10 inline-block px-4 py-1 rounded-full border border-[#6EE7B7]/20">
                {profile.title}
              </p>
            </div>
            <p className="text-base sm:text-xl text-[#64748B] max-w-xl mx-auto lg:mx-0 leading-relaxed font-medium uppercase tracking-tight italic">
              {profile.summary}
            </p>
            <div className="flex gap-4 sm:gap-6 justify-center lg:justify-start">
               {profile.github && <SocialIcon icon={Github} url={profile.github} color="#6EE7B7" />}
               {profile.linkedin && <SocialIcon icon={Linkedin} url={profile.linkedin} color="#6C3CE1" />}
               <SocialIcon icon={Mail} url={`mailto:${profile.email}`} color="#FF6B35" />
            </div>
          </motion.div>

          {/* Code Mockup Card */}
          <motion.div 
            variants={itemVariants}
            className="relative p-1 bg-gradient-to-br from-white/10 to-transparent rounded-[32px] overflow-hidden group w-full max-w-xl lg:flex-1"
          >
            <div className="absolute inset-0 bg-[#0A0A0F] rounded-[31px]" />
            <div className="relative bg-[#111118] p-6 sm:p-10 rounded-[31px] border border-white/5 space-y-6 sm:space-y-8 shadow-2xl transition-all group-hover:bg-[#111118]/80">
              <div className="flex justify-between items-center border-b border-white/5 pb-5 sm:pb-6">
                <div className="flex gap-2">
                  <div className="w-3 h-3 rounded-full bg-[#FF6B35]/50" />
                  <div className="w-3 h-3 rounded-full bg-[#FBBF24]/50" />
                  <div className="w-3 h-3 rounded-full bg-[#6EE7B7]/50" />
                </div>
                <span className="text-[10px] text-[#64748B] uppercase tracking-[0.3em] font-black italic">profile_manifest.json</span>
              </div>
              <div className="text-[11px] sm:text-[13px] leading-relaxed text-[#6EE7B7] overflow-x-auto whitespace-pre no-scrollbar">
                <code className="block font-mono italic">
                  <span className="text-[#64748B]">01</span> <span className="text-[#6C3CE1]">{"{"}</span><br />
                  <span className="text-[#64748B]">02</span>   <span className="text-[#6C3CE1]">"identity"</span>: <span className="text-white">"{profile.name}"</span>,<br />
                  <span className="text-[#64748B]">03</span>   <span className="text-[#6C3CE1]">"status"</span>: <span className="text-white">"OPEN_TO_HIRE"</span>,<br />
                  <span className="text-[#64748B]">04</span>   <span className="text-[#6C3CE1]">"stack"</span>: [<br />
                  {profile.skills.slice(0, 4).map((s: string, i: number) => (
                    <span key={i}><span className="text-[#64748B]">{(5 + i).toString().padStart(2, '0')}</span>     <span className="text-white">"{s}"</span>{i < 3 ? ',' : ''}<br /></span>
                  ))}
                  <span className="text-[#64748B]">09</span>   ],<br />
                  <span className="text-[#64748B]">10</span>   <span className="text-[#6C3CE1]">"location"</span>: <span className="text-white">"{profile.location.split(',')[0]}"</span>,<br />
                  <span className="text-[#64748B]">11</span>   <span className="text-[#6C3CE1]">"contact"</span>: <span className="text-[#6EE7B7]">true</span>,<br />
                  <span className="text-[#64748B]">12</span>   <span className="text-[#6C3CE1]">"active"</span>: <span className="text-[#6EE7B7]">true</span><br />
                  <span className="text-[#64748B]">13</span> <span className="text-[#6C3CE1]">{"}"}</span>
                  <span className="inline-block w-2.5 h-4.5 bg-[#6EE7B7] align-middle ml-2 animate-blink shadow-[0_0_10px_#6EE7B7]" />
                </code>
              </div>
            </div>
            {/* Animated Scanning Line */}
            <div className="absolute top-0 left-0 w-full h-px bg-gradient-to-r from-transparent via-[#6EE7B7] to-transparent opacity-40 group-hover:translate-y-[400px] transition-all duration-2000 ease-linear pointer-events-none" />
          </motion.div>
        </section>

        {/* 3. Stats Bar */}
        <motion.section variants={itemVariants} className="grid grid-cols-2 md:grid-cols-4 gap-y-12 gap-x-8 py-16 sm:py-24 border-y border-white/5 bg-white/[0.01]">
           <StatItem number="10" suffix="+" label="Identity_Projects" />
           <StatItem number={profile.skills.length} label="Grid_Competencies" />
           <StatItem number="4" suffix="+" label="Years_In_Field" />
           <StatItem number="99" suffix="%" label="Sync_Status" />
        </motion.section>

        {/* 4. Skills Section */}
        <section id="skills" className="space-y-12 sm:space-y-20">
          <div className="space-y-4 text-center lg:text-left">
            <h2 className="text-[10px] sm:text-[12px] font-black text-[#6EE7B7] uppercase tracking-[0.5em] font-mono italic leading-none">// GRID_COMPETENCIES</h2>
            <h3 className="text-[32px] sm:text-[42px] md:text-[54px] lg:text-[72px] font-black font-syne uppercase italic tracking-tighter leading-none italic">Hard Stack</h3>
          </div>
          <div className="flex flex-wrap justify-center lg:justify-start gap-4 sm:gap-6">
            {profile.skills.map((skill: string, i: number) => (
              <motion.div 
                key={i}
                whileHover={{ y: -6, scale: 1.05 }}
                className="px-6 sm:px-10 py-5 sm:py-6 bg-[#111118] border border-[#1E1E2E] rounded-2xl flex items-center gap-4 transition-all hover:bg-[#6EE7B7]/5 hover:border-[#6EE7B7]/40 group shadow-lg"
              >
                <div className="w-2 h-2 rounded-full bg-[#6EE7B7] group-hover:shadow-[0_0_10px_#6EE7B7] transition-all" />
                <span className="text-xs sm:text-base font-black uppercase tracking-widest text-[#64748B] group-hover:text-white font-mono italic transition-colors">{skill}</span>
              </motion.div>
            ))}
          </div>
        </section>

        {/* 5. Experience Section */}
        <section id="experience" className="space-y-16 sm:space-y-24">
          <div className="space-y-4 text-center lg:text-left">
            <h2 className="text-[10px] sm:text-[12px] font-black text-[#6C3CE1] uppercase tracking-[0.5em] font-mono italic leading-none">// CAREER_IDENTITY_LOGS</h2>
            <h3 className="text-[32px] sm:text-[42px] md:text-[54px] lg:text-[72px] font-black font-syne uppercase italic tracking-tighter leading-none italic">Professional World</h3>
          </div>
          <div className="space-y-8 sm:space-y-12">
            {profile.experience.map((exp, i) => (
              <motion.div 
                key={i}
                initial={{ opacity: 0, x: -20 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                whileHover={{ x: 12 }}
                className="group relative p-8 sm:p-12 border border-[#1E1E2E] bg-[#111118]/40 rounded-3xl transition-all hover:bg-[#111118] hover:border-[#6C3CE1]/30 hover:shadow-2xl"
              >
                <div className="absolute left-0 top-1/2 -translate-y-1/2 w-1 h-0 bg-[#6C3CE1] group-hover:h-1/2 transition-all duration-500 rounded-full" />
                <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-8 sm:gap-12">
                  <div className="space-y-3 sm:space-y-4 flex-1">
                    <span className="inline-block px-3 py-1 bg-[#6C3CE1]/10 text-[#6C3CE1] text-[9px] sm:text-[10px] font-black uppercase tracking-[0.3em] font-mono italic rounded-full border border-[#6C3CE1]/20">
                      {exp.period}
                    </span>
                    <h4 className="text-[24px] sm:text-[32px] md:text-[42px] font-black font-syne uppercase tracking-tight text-white group-hover:text-[#6C3CE1] transition-colors leading-[0.9]">
                      {exp.role}
                    </h4>
                    <p className="text-sm sm:text-lg font-black text-[#6EE7B7] tracking-widest uppercase font-mono italic">
                      {exp.company} <span className="opacity-30 mx-2">//</span> {exp.location || 'REMOTE'}
                    </p>
                  </div>
                  <div className="lg:max-w-md w-full border-t lg:border-t-0 lg:border-l border-white/5 pt-8 lg:pt-0 lg:pl-12">
                     {exp.points && (
                       <ul className="space-y-4">
                         {exp.points.slice(0, 3).map((pt, j) => (
                           <li key={j} className="text-sm sm:text-base text-[#64748B] leading-relaxed font-mono font-medium flex gap-4">
                             <span className="text-[#6C3CE1] font-black italic">›</span>
                             {pt}
                           </li>
                         ))}
                       </ul>
                     )}
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        </section>

        {/* 6. Education Section */}
        <section id="certifications" className="space-y-16">
           <div className="space-y-4 text-center lg:text-left">
             <h2 className="text-[10px] sm:text-[12px] font-black text-white/20 uppercase tracking-[0.5em] font-mono italic leading-none">// INSTITUTION_VALIDATION</h2>
             <h3 className="text-[32px] sm:text-[42px] font-black font-syne uppercase italic tracking-tighter leading-none italic">Knowledge</h3>
           </div>
           <div className="grid grid-cols-1 md:grid-cols-2 gap-6 sm:gap-8">
              {profile.education.map((edu, i) => (
                <div key={i} className="p-8 sm:p-12 bg-[#111118]/60 border border-[#1E1E2E] rounded-3xl group hover:border-[#6EE7B7]/40 transition-all flex items-center gap-6 sm:gap-10 shadow-lg">
                   <div className="w-14 h-14 sm:w-20 sm:h-20 rounded-2xl bg-[#6EE7B7]/5 border border-[#6EE7B7]/10 flex items-center justify-center text-[#6EE7B7] group-hover:scale-110 transition-transform">
                      <GraduationCap size={28} className="sm:w-10 sm:h-10" />
                   </div>
                    <div className="space-y-2 flex-1 min-w-0">
                       <h5 className="text-sm sm:text-xl font-black uppercase tracking-widest text-white leading-tight truncate">{edu.degree}</h5>
                       <p className="text-[10px] sm:text-xs text-[#64748B] font-black uppercase tracking-widest truncate">{edu.institution} <span className="opacity-30 mx-1 sm:mx-2">//</span> {edu.location}</p>
                       <p className="text-[9px] sm:text-[10px] font-black text-[#6EE7B7] uppercase tracking-widest font-mono italic opacity-60">Session_{edu.period.replace('–', '_')}</p>
                    </div>
                </div>
              ))}
           </div>
        </section>

        {/* 7. Certifications Section */}
        <section className="space-y-16">
           <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
              {profile.certifications.map((cert, i) => (
                <div key={i} className="p-8 bg-[#111118]/80 border border-[#1E1E2E] rounded-2xl group hover:border-[#FF6B35]/40 transition-all flex items-center gap-6 group hover:translate-y-[-4px]">
                   <div className="w-12 h-12 bg-[#FF6B35]/5 border border-[#FF6B35]/10 flex items-center justify-center text-[#FF6B35] rounded-xl group-hover:rotate-12 transition-transform">
                      <Award size={24} />
                   </div>
                   <div className="flex-1 min-w-0">
                      <p className="text-xs sm:text-[13px] font-black uppercase tracking-widest text-white leading-tight group-hover:text-[#FF6B35] transition-colors truncate">{cert}</p>
                   </div>
                </div>
              ))}
           </div>
        </section>

        {/* 8. Contact Section */}
        <section id="contact" className="grid grid-cols-1 lg:grid-cols-2 gap-16 md:gap-24 py-20 sm:py-32 border-t border-white/5">
           <div className="space-y-12 sm:space-y-20 text-center lg:text-left">
              <div className="space-y-6">
                 <h2 className="text-[48px] sm:text-[64px] md:text-[88px] font-black font-syne uppercase tracking-tighter italic leading-[0.85] text-white">Let's<br />Connect</h2>
                 <p className="text-lg sm:text-2xl font-black text-[#64748B] max-w-sm mx-auto lg:mx-0 font-mono italic uppercase tracking-tight">Available for high-stakes roles & projects.</p>
              </div>
              <div className="flex flex-col gap-6 sm:gap-10 max-w-md mx-auto lg:mx-0">
                 <ContactLink icon={Mail} label="Grid_Point_Mail" value={profile.email} url={`mailto:${profile.email}`} color="#6EE7B7" />
                 {profile.linkedin && <ContactLink icon={Linkedin} label="Identity_Network" value="devaprakashj" url={profile.linkedin} color="#6C3CE1" />}
              </div>
           </div>
           
           <div className="relative group perspective-[1000px]">
              <div className="h-full w-full bg-[#111118] rounded-[40px] border border-[#1E1E2E] p-12 sm:p-20 flex flex-col justify-center items-center gap-8 sm:gap-12 relative overflow-hidden group hover:border-[#6EE7B7]/40 transition-colors shadow-2xl">
                 <div className="absolute -top-10 -right-10 w-40 h-40 bg-[#6EE7B7]/10 rounded-full blur-[60px]" />
                 <div className="absolute top-10 right-10">
                    <Star size={40} className="text-[#6EE7B7] opacity-20 group-hover:rotate-180 transition-transform duration-1000" />
                 </div>
                 
                 <div className="text-center space-y-4">
                    <h4 className="text-[10px] sm:text-[12px] font-black text-[#6EE7B7] uppercase tracking-[0.6em] font-mono italic leading-none animate-pulse">IDENTITY_ACTIVE</h4>
                    <h3 className="text-[32px] sm:text-[42px] font-black font-syne text-center uppercase leading-[0.9] italic text-white">Initiate <br /> Contact</h3>
                 </div>

                 <motion.a 
                    href={`mailto:${profile.email}`}
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                    className="w-full py-6 sm:py-8 bg-[#6EE7B7] text-black text-center text-xs sm:text-base font-black uppercase tracking-[0.4em] rounded-sm transition-all shadow-[0_0_50px_rgba(110,231,183,0.3)] italic relative z-10"
                 >
                    SEND_MESSAGE_NOW →
                 </motion.a>
                 
                 <div className="flex gap-10 opacity-30 group-hover:opacity-60 transition-opacity">
                    <Smartphone size={16} />
                    <TerminalIcon size={16} />
                    <Cpu size={16} />
                 </div>
              </div>
           </div>
        </section>

      </motion.main>

      {/* 9. Footer */}
      <footer className="py-20 border-t border-white/5 bg-[#050508]">
        <div className="max-w-7xl mx-auto px-6 flex flex-col md:flex-row justify-between items-center gap-12">
          <div className="flex flex-col items-center md:items-start gap-4">
             <div className="flex items-center gap-3">
               <div className="w-8 h-8 bg-[#6C3CE1] rounded flex items-center justify-center font-black text-white italic">IF</div>
               <span className="text-xl font-black font-syne text-white tracking-widest">iamfolio</span>
             </div>
             <p className="text-[10px] font-black uppercase tracking-[0.2em] text-[#64748B] text-center md:text-left">© 2026 {profile.name.toUpperCase()} // ALL_IDENTITY_RESERVED</p>
          </div>
          
          <div className="flex flex-col md:flex-row items-center gap-8 sm:gap-12">
             <Link href="/" className="text-[11px] font-black text-[#64748B] uppercase tracking-[0.3em] hover:text-white transition-colors">THE_MAIN_GRID</Link>
             <div className="py-2.5 px-6 bg-[#111118] rounded-full border border-[#1E1E2E] text-[10px] font-black text-[#6EE7B7] uppercase tracking-[0.4em] italic">
                GRID_SYSTEM_V2.0.4
             </div>
          </div>
        </div>
      </footer>

      <style jsx global>{`
        @keyframes blink {
          0%, 100% { opacity: 1; }
          50% { opacity: 0; }
        }
        .animate-blink {
          animation: blink 1s infinite step-end;
        }
        html {
          background-color: #0A0A0F;
          scroll-behavior: smooth;
        }
        .no-scrollbar::-webkit-scrollbar {
          display: none;
        }
        .no-scrollbar {
          -ms-overflow-style: none;
          scrollbar-width: none;
        }
      `}</style>
    </div>
  );
}

// --- Helper Components ---

function SocialIcon({ icon: Icon, url, color }: any) {
  return (
    <motion.a
      href={url}
      target="_blank"
      rel="noopener noreferrer"
      whileHover={{ scale: 1.15, rotate: 5, backgroundColor: `${color}15` }}
      whileTap={{ scale: 0.9 }}
      className="w-14 h-14 rounded-2xl bg-[#111118] border border-[#1E1E2E] flex items-center justify-center transition-all hover:border-white/20 shadow-xl"
      style={{ color: color }}
    >
      <Icon size={22} />
    </motion.a>
  );
}

function StatItem({ number, label, suffix = '' }: any) {
  return (
    <div className="text-center space-y-3">
      <div className="text-[38px] sm:text-[48px] md:text-[54px] font-black font-syne tracking-tighter text-white italic leading-none tabular-nums">
        {number}{suffix}
      </div>
      <div className="text-[10px] sm:text-[11px] font-black text-[#64748B] uppercase tracking-[0.4em] font-mono leading-none italic">
        {label}
      </div>
    </div>
  );
}

function ContactLink({ icon: Icon, label, value, url, color }: any) {
  return (
    <a href={url} target="_blank" className="group flex items-center gap-6 p-3 transition-all">
       <div className={`w-14 h-14 bg-[#111118] border border-[#1E1E2E] rounded-2xl flex items-center justify-center text-[#64748B] group-hover:scale-110 transition-all shadow-xl`} style={{ '--hover-color': color } as any}>
          <Icon size={24} className="group-hover:text-[var(--hover-color)] transition-colors" />
       </div>
       <div className="space-y-1 text-left">
          <p className="text-[10px] font-black text-[#64748B] uppercase tracking-[0.5em] font-mono italic leading-none">{label}</p>
          <p className="text-base sm:text-lg font-black text-white group-hover:text-white transition-all font-mono italic truncate max-w-[200px] sm:max-w-none">{value}</p>
       </div>
    </a>
  );
}
