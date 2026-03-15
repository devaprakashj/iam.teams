"use client";

import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { 
  LayoutDashboard, 
  User, 
  Globe, 
  FileText, 
  Mic, 
  Search, 
  Zap, 
  BarChart3, 
  Settings, 
  CreditCard, 
  Copy, 
  ExternalLink, 
  Pencil, 
  Briefcase, 
  ArrowRight, 
  Lock, 
  X, 
  Clock, 
  MapPin,
  TrendingUp,
  TrendingDown,
  MoreVertical,
  CheckCircle2,
  AlertTriangle,
  ChevronRight,
  Plus,
  ArrowLeft,
  Camera,
  Check,
  Smartphone,
  Mail,
  Linkedin,
  Github as GithubIcon,
  Trash2,
  Award,
  BookOpen,
  Target,
  GripVertical,
  Sparkles,
  ChevronDown,
  GraduationCap
} from 'lucide-react';
import Link from 'next/link';

// --- Constants & Mock Data ---

const COLORS = {
  bg: '#0A0A0F',
  sidebar: '#0D0D14',
  card: '#111118',
  border: '#1E1E2E',
  purple: '#6C3CE1',
  green: '#6EE7B7',
  orange: '#FF6B35',
  blue: '#60A5FA',
  yellow: '#FBBF24',
  text: '#E2E8F0',
  muted: '#64748B'
};

const navItems = [
  { group: 'MAIN', items: [
    { icon: LayoutDashboard, label: 'Dashboard', href: '/dashboard' },
    { icon: User, label: 'My Profile', href: '/profile', active: true },
    { icon: Globe, label: 'Portfolio Preview', href: '/devaprakash', target: '_blank' }
  ]},
  { group: 'TOOLS', items: [
    { icon: FileText, label: 'Resume Builder', href: '/resume-builder' },
    { icon: Mic, label: 'Mock Interview', href: '/mock-interview' },
    { icon: Search, label: 'Job Matches', href: '/jobs' },
    { icon: Zap, label: 'Skill Analysis', href: '/skills' }
  ]},
  { group: 'ACCOUNT', items: [
    { icon: BarChart3, label: 'Analytics', href: '/analytics', badge: 'PRO' },
    { icon: Settings, label: 'Settings', href: '/settings' },
    { icon: CreditCard, label: 'Upgrade to Pro', href: '/upgrade', color: COLORS.orange }
  ]}
];

const completionData = [
  { label: 'Basic Info', value: 100, color: COLORS.green },
  { label: 'Work Experience', value: 100, color: COLORS.green },
  { label: 'Skills', value: 90, color: COLORS.green },
  { label: 'Projects', value: 50, color: COLORS.yellow },
  { label: 'Certifications', value: 60, color: COLORS.yellow }
];

// --- Sub-components ---

const SidebarItem = ({ icon: Icon, label, href, active, badge, color, target }: any) => (
  <Link href={href} target={target}>
    <div className={`group flex items-center justify-between px-4 py-3 rounded-lg cursor-pointer transition-all ${
      active ? 'bg-[#6C3CE1]/15 text-[#6C3CE1] border-l-2 border-[#6C3CE1]' : 'text-[#64748B] hover:text-[#E2E8F0]'
    }`}>
      <div className="flex items-center gap-3">
        <Icon size={18} style={{ color: color || (active ? COLORS.purple : 'inherit') }} />
        <span className={`text-xs font-bold uppercase tracking-widest`}>{label}</span>
      </div>
      {badge && (
        <span className="px-1.5 py-0.5 bg-[#6C3CE1]/20 text-[#6C3CE1] text-[8px] font-black rounded">{badge}</span>
      )}
    </div>
  </Link>
);

const ProgressBar = ({ value, color, label, onEdit }: any) => (
  <div className="flex flex-col sm:flex-row items-start sm:items-center gap-4 sm:gap-6">
    <div className="flex-1 w-full space-y-1.5">
      <div className="flex justify-between items-center text-[10px] font-bold uppercase tracking-widest">
        <span className="text-[#64748B]">{label}</span>
        <span style={{ color }}>{value}% {value === 100 ? '✓' : value >= 70 ? '⚠' : '✗'}</span>
      </div>
      <div className="h-1.5 w-full bg-[#1E1E2E] rounded-full overflow-hidden">
        <motion.div 
          initial={{ width: 0 }}
          animate={{ width: `${value}%` }}
          transition={{ duration: 1, ease: 'easeOut' }}
          className="h-full rounded-full"
          style={{ backgroundColor: color }}
        />
      </div>
    </div>
    <button 
      onClick={onEdit}
      className={`w-full sm:w-auto px-4 py-2 rounded border text-[8px] font-black uppercase tracking-widest transition-all ${
        value === 100 ? 'border-[#1E1E2E] text-[#64748B] hover:text-white hover:border-white/20' : 'border-[#6C3CE1] text-[#6C3CE1] hover:bg-[#6C3CE1] hover:text-white'
      }`}
    >
      {value === 100 ? 'Edit' : 'Add'}
    </button>
  </div>
);

const AccordionItem = ({ title, badge, onEdit, children, isExpanded, onToggle }: any) => (
  <div className="bg-[#111118] border border-[#1E1E2E] rounded-2xl overflow-hidden scroll-mt-24">
    <div 
      onClick={onToggle}
      className="p-4 sm:p-6 flex justify-between items-center cursor-pointer hover:bg-white/[0.01] transition-colors"
    >
      <div className="flex items-center gap-3 sm:gap-4 overflow-hidden">
        <h3 className="text-sm sm:text-lg font-black font-syne uppercase tracking-tight italic truncate">{title}</h3>
        {badge && (
          <span className={`px-2 py-0.5 text-[7px] sm:text-[9px] font-black rounded uppercase shrink-0 ${
            badge.includes('100%') ? 'bg-[#6EE7B7]/10 text-[#6EE7B7]' : 'bg-[#6C3CE1]/10 text-[#6C3CE1]'
          }`}>
            {badge}
          </span>
        )}
      </div>
      <div className="flex items-center gap-2 sm:gap-4 shrink-0">
        <button 
          onClick={(e) => { e.stopPropagation(); onEdit(); }}
          className="p-2 text-[#64748B] hover:text-[#6C3CE1] transition-colors"
        >
          <Pencil size={16} />
        </button>
        <motion.div
          animate={{ rotate: isExpanded ? 180 : 0 }}
          className="text-[#64748B]"
        >
          <ChevronDown size={20} />
        </motion.div>
      </div>
    </div>
    <AnimatePresence>
      {isExpanded && (
        <motion.div
          initial={{ height: 0, opacity: 0 }}
          animate={{ height: 'auto', opacity: 1 }}
          exit={{ height: 0, opacity: 0 }}
          transition={{ duration: 0.3, ease: 'easeInOut' }}
        >
          <div className="p-4 sm:p-8 pt-0 border-t border-[#1E1E2E] bg-white/[0.01]">
            {children}
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  </div>
);

// --- Main Page Component ---

export default function ProfileManager() {
  const [expandedSection, setExpandedSection] = useState<string | null>('basic');
  const [isEditing, setIsEditing] = useState<string | null>(null);
  const [atsScore, setAtsScore] = useState(68);
  const [userPlan, setUserPlan] = useState('free');
  const [isOpenToWork, setIsOpenToWork] = useState(true);
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);

  useEffect(() => {
    if (window.innerWidth >= 1024) {
      setIsSidebarOpen(true);
    }
  }, []);

  // Profile Versions State
  const [profileVersions, setProfileVersions] = useState([
    { id: 'v1', name: 'Primary Profile', type: 'GENERAL', active: true, url: 'iamfolio.in/devaprakash' },
  ]);

  // Main Data State (Pre-filled with Devaprakash J)
  const [data, setData] = useState({
    fullName: "Devaprakash J",
    role: "AI/ML & Full Stack Developer",
    email: "devaprakashofficial@gmail.com",
    phone: "+91 9150536442",
    location: "Chennai, Tamil Nadu",
    linkedin: "linkedin.com/in/devaprakashj",
    github: "github.com/devaprakashofficial",
    portfolio: "iamfolio.in/devaprakash",
    summary: "AI/ML & Full Stack Developer with 4+ years of freelance experience on Fiverr and Upwork. Skilled in Python, Machine Learning, React, Node.js, and Firebase. Currently pursuing B.Tech CSE (AI & ML) at Rajalakshmi Institute of Technology.",
    experience: [
      { id: 'e1', role: 'AI Software Developer', company: 'Upwork', location: 'Chennai', date: 'Jul 2024 – Present', points: ["Developed ML models for international clients", "Built AI pipelines using Python"] },
      { id: 'e2', role: 'Full Stack Developer', company: 'Fiverr', location: 'Remote', date: 'Apr 2021 – Present', points: ["Built 50+ web apps for startup clients"] }
    ],
    education: [
      { id: 'ed1', degree: 'B.Tech CSE (AI & ML)', school: 'Rajalakshmi Institute of Technology', date: '2024–2028' },
      { id: 'ed2', degree: 'Higher Secondary', school: 'Model School', date: '2024' }
    ],
    skills: {
      technical: ["Python", "React", "ML", "Firebase", "Pandas", "Node.js", "Matplotlib", "yfinance", "Deep Learning"],
      tools: ["Tableau", "Git", "Jupyter"],
      soft: ["Problem Solving", "Team Leadership"]
    },
    certifications: [
      { id: 'c1', name: 'Tableau Desktop Certified', issuer: 'Tableau', date: '2025' },
      { id: 'c2', name: 'Developer Simulation', issuer: 'Accenture UK', date: '2024' }
    ],
    projects: [],
    preferences: {
      targetRole: "AI/ML Engineer",
      workType: "Remote",
      minSalary: "8L",
      maxSalary: "15L",
      locationPref: ["Chennai", "Bangalore"],
      relocation: true
    }
  });

  const toggleSection = (section: string) => {
    setExpandedSection(expandedSection === section ? null : section);
  };

  const handleEdit = (section: string) => {
    setIsEditing(section);
    setExpandedSection(section);
  };

  const handleSave = (section: string) => {
    setIsEditing(null);
    if (section === 'projects' && data.projects.length > 0) {
      setAtsScore(prev => Math.min(prev + 12, 100));
    } else {
      setAtsScore(prev => Math.min(prev + 2, 100));
    }
  };

  return (
    <div className="min-h-screen bg-[#0A0A0F] text-[#E2E8F0] font-mono selection:bg-[#6C3CE1]/30 flex relative overflow-x-hidden">
      {/* Sidebar Overlay */}
      <AnimatePresence>
        {isSidebarOpen && (
          <>
            <motion.div 
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => setIsSidebarOpen(false)}
              className="fixed inset-0 bg-black/80 backdrop-blur-sm z-[90] lg:hidden"
            />
            <motion.aside 
              initial={{ x: -240 }}
              animate={{ x: 0 }}
              exit={{ x: -240 }}
              transition={{ type: 'spring', damping: 25, stiffness: 200 }}
              className="w-[240px] fixed top-0 bottom-0 bg-[#0D0D14] border-r border-[#1E1E2E] flex flex-col z-[100] lg:translate-x-0"
            >
              <div className="p-8 flex items-center justify-between">
                <div className="flex items-center gap-3">
                  <div className="w-8 h-8 bg-[#6C3CE1] rounded flex items-center justify-center font-black text-white italic">IF</div>
                  <span className="text-xl font-black font-syne text-[#6EE7B7] tracking-tight">iamfolio</span>
                </div>
                <button onClick={() => setIsSidebarOpen(false)} className="lg:hidden p-2 text-[#64748B] hover:text-white">
                  <X size={20} />
                </button>
              </div>

              <nav className="flex-1 px-4 space-y-8 mt-4 overflow-y-auto custom-scrollbar">
                {navItems.map((group, idx) => (
                  <div key={idx} className="space-y-2">
                    <h5 className="px-4 text-[10px] font-bold text-white/20 uppercase tracking-[0.3em] mb-4">{group.group}</h5>
                    <div className="space-y-1">
                      {group.items.map((item, id) => (
                        <SidebarItem key={id} {...item} />
                      ))}
                    </div>
                  </div>
                ))}
              </nav>

              <div className="p-6 bg-[#111118]/50 border-t border-[#1E1E2E]">
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 rounded-full bg-[#6C3CE1]/20 border border-[#6C3CE1]/30 flex items-center justify-center text-[#6C3CE1] font-black">
                    DJ
                  </div>
                  <div className="flex-1 min-w-0">
                    <div className="flex items-center gap-2">
                      <p className="text-xs font-bold truncate">Devaprakash</p>
                      <span className={`px-1 py-0.5 text-[7px] font-black rounded uppercase ${userPlan === 'pro' ? 'bg-[#FF6B35]/10 text-[#FF6B35]' : 'bg-[#6EE7B7]/10 text-[#6EE7B7]'}`}>PRO</span>
                    </div>
                    <p className="text-[9px] text-[#64748B] font-mono truncate">iamfolio.in/deva</p>
                  </div>
                </div>
              </div>
            </motion.aside>
          </>
        )}
      </AnimatePresence>

      {/* Main Content */}
      <main className={`flex-1 min-h-screen flex flex-col relative transition-all duration-300 ${isSidebarOpen ? 'lg:ml-[240px]' : 'ml-0'}`}>
        {/* Topbar/Header */}
        <header className="sticky top-0 z-40 bg-[#0A0A0F]/80 backdrop-blur-md border-b border-[#1E1E2E] px-4 md:px-8 lg:px-12 py-4 md:py-8 flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
          <div className="flex items-center gap-4 w-full md:w-auto">
             <button 
              onClick={() => setIsSidebarOpen(true)}
              className={`p-2 bg-[#111118] border border-[#1E1E2E] rounded-lg text-[#E2E8F0] hover:border-[#6C3CE1]/40 transition-all ${isSidebarOpen ? 'lg:hidden' : 'flex'}`}
            >
              <LayoutDashboard size={20} />
            </button>
            <div className="space-y-0.5">
              <h1 className="text-xl md:text-3xl font-black font-syne text-[#E2E8F0] tracking-tight italic">Profile Manager</h1>
              <p className="text-[8px] md:text-[10px] font-bold text-[#64748B] uppercase tracking-[0.4em] hidden sm:block">MANAGE YOUR PROFESSIONAL IDENTITY</p>
            </div>
          </div>
          <div className="flex items-center gap-3 sm:gap-6 w-full md:w-auto justify-between md:justify-end">
            <div className={`px-3 sm:px-4 py-1.5 sm:py-2 rounded-full border text-[8px] sm:text-[10px] font-black uppercase tracking-widest flex items-center gap-2 ${
              atsScore >= 90 ? 'border-[#6EE7B7]/30 bg-[#6EE7B7]/5 text-[#6EE7B7]' : 'border-[#FBBF24]/30 bg-[#FBBF24]/5 text-[#FBBF24]'
            }`}>
              {atsScore >= 90 ? <CheckCircle2 size={12} /> : <AlertTriangle size={12} />}
              <span className="hidden xs:inline">{atsScore >= 90 ? 'ATS OPTIMIZED ✓' : `Profile ${atsScore}% Complete`}</span>
              <span className="xs:hidden">{atsScore}%</span>
            </div>
            <button className="px-4 sm:px-6 py-2 sm:py-2.5 border border-[#6C3CE1] text-[#6C3CE1] text-[8px] sm:text-[10px] font-black uppercase tracking-widest rounded-lg hover:bg-[#6C3CE1] hover:text-white transition-all scale-95 sm:scale-100">
              Edit All
            </button>
          </div>
        </header>

        <div className="p-4 md:p-8 lg:p-12 space-y-8 md:space-y-12 max-w-6xl mx-auto w-full">
          
          {/* Section 1: Profile Versions */}
          <section className="grid grid-cols-1 md:grid-cols-2 gap-4 sm:gap-6">
            {profileVersions.map((v) => (
              <div 
                key={v.id}
                className={`p-6 sm:p-8 rounded-2xl relative cursor-pointer group transition-all ${
                   v.active ? 'bg-[#6C3CE1] text-white shadow-[0_10px_40px_rgba(108,60,225,0.3)]' : 'bg-[#111118] border border-[#1E1E2E]'
                }`}
              >
                {v.active && (
                  <div className="absolute top-4 sm:top-6 right-4 sm:right-6 w-5 h-5 sm:w-6 sm:h-6 bg-white rounded-full flex items-center justify-center text-[#6C3CE1]">
                    <Check size={12} />
                  </div>
                )}
                <div className="flex items-center gap-4">
                  <div className="w-10 h-10 sm:w-12 sm:h-12 bg-white rounded-2xl flex items-center justify-center text-[#6C3CE1] font-black text-base sm:text-lg">DJ</div>
                  <div className="space-y-1 overflow-hidden">
                    <h4 className="text-base sm:text-lg font-black font-syne uppercase tracking-tight italic truncate">{v.name}</h4>
                    <p className={`text-[8px] sm:text-[10px] font-black uppercase tracking-widest ${v.active ? 'text-white/60' : 'text-[#64748B]'}`}>{v.type}</p>
                  </div>
                </div>
                <div className="mt-6 sm:mt-8 flex justify-between items-center">
                  <p className={`text-[9px] sm:text-[11px] font-medium truncate max-w-[80%] ${v.active ? 'text-white/80' : 'text-[#64748B]'}`}>{v.url}</p>
                  <ArrowRight size={16} className={`${v.active ? 'text-white' : 'text-[#64748B]'}`} />
                </div>
              </div>
            ))}

            <div className="p-6 sm:p-8 border-2 border-dashed border-[#1E1E2E] rounded-2xl flex flex-col items-center justify-center gap-3 sm:gap-4 hover:border-[#6C3CE1]/40 transition-all cursor-pointer group min-h-[140px]">
              <div className="w-10 h-10 sm:w-12 sm:h-12 rounded-full bg-[#111118] border border-[#1E1E2E] flex items-center justify-center text-[#64748B] group-hover:text-[#6C3CE1] transition-colors">
                {userPlan === 'free' ? <Lock size={18} /> : <Plus size={20} />}
              </div>
              <div className="text-center">
                <p className="text-[10px] sm:text-xs font-black uppercase tracking-widest text-[#64748B] group-hover:text-[#E2E8F0]">Add Version</p>
                <p className="text-[7px] sm:text-[9px] text-[#64748B] uppercase mt-1 hidden xs:block">ML Focused / Full Stack / Fresher</p>
              </div>
              {userPlan === 'free' && (
                <span className="px-2 py-0.5 bg-[#FF6B35]/10 text-[#FF6B35] text-[7px] font-black rounded uppercase">PRO ONLY</span>
              )}
            </div>
          </section>

          {/* Section 2: Profile Overview Card */}
          <section className="bg-[#111118] border border-[#1E1E2E] rounded-3xl p-6 md:p-10 flex flex-col md:flex-row gap-8 md:gap-12">
            <div className="flex flex-col items-center md:items-start gap-6 md:border-r md:border-[#1E1E2E] md:pr-12">
              <div className="relative group">
                <div className="w-24 h-24 sm:w-32 sm:h-32 rounded-full bg-[#6C3CE1] flex items-center justify-center text-3xl sm:text-4xl font-black text-white italic border-4 border-[#1E1E2E]">DJ</div>
                <div className="absolute inset-0 bg-black/40 rounded-full opacity-0 group-hover:opacity-100 flex items-center justify-center cursor-pointer transition-opacity">
                   <Camera size={20} className="text-white" />
                </div>
              </div>
              <div className="text-center md:text-left space-y-2">
                <h2 className="text-2xl sm:text-3xl font-black font-syne uppercase tracking-tight italic">Devaprakash J</h2>
                <p className="text-xs sm:text-sm font-bold text-[#6C3CE1] uppercase tracking-widest">AI/ML & Full Stack Developer</p>
                <div className="flex items-center gap-2 text-[9px] text-[#64748B] font-bold uppercase justify-center md:justify-start">
                   <MapPin size={12} /> Chennai, Tamil Nadu
                </div>
              </div>
              <div className="flex gap-2 sm:gap-3 mt-2">
                 {[
                   { icon: ExternalLink, label: 'View Portfolio', bg: '#0A0A0F' },
                   { icon: Copy, label: 'Copy Link', bg: '#0A0A0F' },
                   { icon: Pencil, label: 'Edit All', bg: '#6C3CE1', text: 'white' }
                 ].map((act, i) => (
                   <button key={i} className="p-2 sm:p-3 rounded-lg border border-[#1E1E2E] hover:border-[#6C3CE1]/40 transition-all group" style={{ backgroundColor: act.bg }}>
                      <act.icon size={16} className={act.text === 'white' ? 'text-white' : 'text-[#64748B] group-hover:text-[#E2E8F0]'} />
                   </button>
                 ))}
              </div>
            </div>

            <div className="flex-1 space-y-6 md:space-y-8 flex flex-col justify-center">
               <div className="flex flex-wrap gap-3 sm:gap-4 justify-center md:justify-start">
                  <div className={`px-3 sm:px-4 py-1.5 sm:py-2 rounded-xl text-[8px] sm:text-xs font-black uppercase tracking-widest flex items-center gap-2 ${
                    atsScore >= 90 ? 'bg-[#6EE7B7]/10 text-[#6EE7B7]' : 'bg-[#FBBF24]/10 text-[#FBBF24]'
                  }`}>
                    {atsScore >= 90 ? <Zap size={14} fill="currentColor" /> : <AlertTriangle size={14} />}
                    {atsScore >= 90 ? 'ATS OPTIMIZED' : `${atsScore}% Complete`}
                  </div>
                  <div 
                    onClick={() => setIsOpenToWork(!isOpenToWork)}
                    className={`px-3 sm:px-4 py-1.5 sm:py-2 rounded-xl text-[8px] sm:text-xs font-black uppercase tracking-widest flex items-center gap-2 cursor-pointer transition-all ${
                      isOpenToWork ? 'bg-[#6EE7B7]/10 text-[#6EE7B7] border border-[#6EE7B7]/20 shadow-[0_0_20px_rgba(110,231,183,0.1)]' : 'bg-white/5 text-white/30 border border-white/10'
                    }`}
                  >
                    <div className={`w-2 h-2 rounded-full ${isOpenToWork ? 'bg-[#6EE7B7] animate-pulse' : 'bg-white/30'}`} />
                    {isOpenToWork ? 'Looking' : 'Not seeking'}
                  </div>
               </div>
               
               <div className="space-y-3">
                  <p className="text-[8px] sm:text-[10px] font-bold text-[#64748B] uppercase tracking-[0.2em]">Profile URL</p>
                  <div className="flex items-center gap-3 sm:gap-4 p-3 sm:p-4 bg-[#0A0A0F] border border-[#1E1E2E] rounded-xl group hover:border-[#6C3CE1]/40 transition-all overflow-hidden">
                     <span className="text-[10px] sm:text-xs font-bold text-[#E2E8F0] truncate">iamfolio.in/devaprakash</span>
                     <div className="ml-auto flex items-center gap-2 sm:gap-4 shrink-0">
                        <Copy size={12} className="text-[#64748B] hover:text-[#6C3CE1] cursor-pointer" />
                        <ExternalLink size={12} className="text-[#64748B] hover:text-[#6C3CE1] cursor-pointer" />
                     </div>
                  </div>
               </div>
            </div>
          </section>

          {/* Section 3: Profile Completion Bar */}
          <section className="bg-gradient-to-r from-[#111118] to-[#0D0D14] border border-[#1E1E2E] rounded-3xl p-6 md:p-10 space-y-8 md:space-y-12">
            <div className="flex flex-col lg:flex-row items-center gap-8 md:gap-12">
               <div className="relative w-32 h-32 sm:w-40 sm:h-40 flex items-center justify-center shrink-0">
                  <svg className="w-full h-full -rotate-90">
                     <circle cx="50%" cy="50%" r="42%" stroke="#1E1E2E" strokeWidth="10" fill="none" />
                     <motion.circle 
                       cx="50%" cy="50%" r="42%" stroke="#6C3CE1" strokeWidth="10" fill="none" 
                       strokeDasharray="264"
                       initial={{ strokeDashoffset: 264 }}
                       animate={{ strokeDashoffset: 264 - (264 * atsScore / 100) }}
                       transition={{ duration: 1.5, ease: "easeOut" }}
                       strokeLinecap="round"
                       className="drop-shadow-[0_0_10px_rgba(108,60,225,0.4)]"
                     />
                  </svg>
                  <div className="absolute inset-0 flex flex-col items-center justify-center">
                     <span className="text-2xl sm:text-4xl font-black font-syne italic">{atsScore}%</span>
                     <span className="text-[7px] sm:text-[8px] font-black text-[#64748B] uppercase tracking-widest mt-1">Strength</span>
                  </div>
               </div>
               
               <div className="flex-1 grid grid-cols-1 sm:grid-cols-2 gap-x-8 md:gap-x-12 gap-y-6 w-full">
                  {completionData.map((item, i) => (
                    <ProgressBar 
                      key={i} 
                      {...item} 
                      onEdit={() => handleEdit(item.label.toLowerCase().replace(' ', ''))} 
                    />
                  ))}
               </div>
            </div>

            {atsScore < 100 && (
              <div className="p-4 sm:p-6 bg-[#FBBF24]/5 border border-[#FBBF24]/20 rounded-2xl flex flex-col sm:flex-row items-center gap-4 sm:gap-6">
                <div className="p-3 bg-[#FBBF24]/10 rounded-xl text-[#FBBF24] shrink-0">
                   <Sparkles size={20} />
                </div>
                <div className="space-y-1 text-center sm:text-left">
                   <p className="text-[10px] font-black text-white uppercase tracking-tight">ATS Booster Recommendation</p>
                   <p className="text-[10px] sm:text-xs text-[#64748B]">Add <span className="text-[#6EE7B7] font-bold">2 projects</span> to reach 100% completion. AI indicates this will boost visibility by <span className="text-[#6EE7B7] font-bold">+12 points</span>.</p>
                </div>
                <button 
                  onClick={() => handleEdit('projects')}
                  className="w-full sm:w-auto sm:ml-auto px-6 py-2 bg-[#FBBF24] text-[#0A0A0F] text-[9px] sm:text-[10px] font-black uppercase tracking-widest rounded-lg hover:shadow-lg transition-all"
                >
                  Add Now →
                </button>
              </div>
            )}
          </section>

          {/* Section 4: Editable Accordion Sections */}
          <section className="space-y-4 sm:space-y-6">
             {/* 1. Basic Info */}
             <AccordionItem 
              title="Basic Info" 
              badge="100% ✓" 
              isExpanded={expandedSection === 'basic'} 
              onToggle={() => toggleSection('basic')}
              onEdit={() => handleEdit('basic')}
             >
                {isEditing === 'basic' ? (
                   <div className="space-y-6 sm:space-y-8">
                      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 sm:gap-6">
                         {[
                           { label: 'Full Name', key: 'fullName', val: data.fullName },
                           { label: 'Job Title', key: 'role', val: data.role },
                           { label: 'Email Address', key: 'email', val: data.email, disabled: true },
                           { label: 'Phone Number', key: 'phone', val: data.phone },
                           { label: 'Location', key: 'location', val: data.location },
                           { label: 'LinkedIn Profile', key: 'linkedin', val: data.linkedin }
                         ].map((f) => (
                           <div key={f.key} className="space-y-2">
                              <label className="text-[10px] font-black uppercase text-[#64748B] tracking-widest">{f.label}</label>
                              <input 
                                type="text" 
                                defaultValue={f.val} 
                                disabled={f.disabled}
                                className={`w-full bg-[#0A0A0F] border border-[#1E1E2E] rounded-xl p-3 sm:p-4 text-xs sm:text-sm font-bold focus:border-[#6C3CE1] outline-none transition-all ${f.disabled ? 'text-[#64748B]' : ''}`} 
                              />
                           </div>
                         ))}
                      </div>
                      <div className="flex flex-col sm:flex-row gap-3 sm:gap-4">
                         <button onClick={() => handleSave('basic')} className="w-full sm:w-auto px-8 py-3 bg-[#6C3CE1] text-white text-[10px] font-black uppercase tracking-widest rounded-xl">Save Changes</button>
                         <button onClick={() => setIsEditing(null)} className="w-full sm:w-auto px-8 py-3 border border-[#1E1E2E] text-[#64748B] text-[10px] font-black uppercase tracking-widest rounded-xl">Cancel</button>
                      </div>
                   </div>
                ) : (
                   <div className="grid grid-cols-1 xs:grid-cols-2 sm:grid-cols-2 md:grid-cols-4 gap-6 sm:gap-8">
                      {[
                        { label: 'Name', value: data.fullName, icon: User },
                        { label: 'Role', value: data.role, icon: Briefcase },
                        { label: 'Email', value: data.email, icon: Mail },
                        { label: 'Phone', value: data.phone, icon: Smartphone },
                        { label: 'Location', value: data.location, icon: MapPin },
                        { label: 'LinkedIn', value: 'Connected ✓', icon: Linkedin },
                        { label: 'GitHub', value: 'Connected ✓', icon: GithubIcon },
                        { label: 'Portfolio', value: 'iamfolio.in/deva', icon: Globe }
                      ].map((item, i) => (
                        <div key={i} className="space-y-1 sm:space-y-2 overflow-hidden">
                           <p className="text-[7px] sm:text-[8px] font-black uppercase text-[#64748B] tracking-[0.2em] flex items-center gap-2">
                              <item.icon size={10} /> {item.label}
                           </p>
                           <p className="text-[10px] sm:text-xs font-bold text-[#E2E8F0] uppercase tracking-tight truncate">{item.value}</p>
                        </div>
                      ))}
                   </div>
                )}
             </AccordionItem>

             {/* 2. Professional Summary */}
             <AccordionItem 
              title="Professional Summary" 
              isExpanded={expandedSection === 'summary'} 
              onToggle={() => toggleSection('summary')}
              onEdit={() => handleEdit('summary')}
             >
                <div className="space-y-6">
                   {isEditing === 'summary' ? (
                      <div className="space-y-4 sm:space-y-6">
                         <div className="flex flex-wrap gap-2 sm:gap-3">
                            <button className="px-3 py-1.5 bg-[#6C3CE1]/10 border border-[#6C3CE1]/20 text-[#6C3CE1] text-[8px] sm:text-[9px] font-black uppercase tracking-widest rounded-lg flex items-center gap-2">
                               <Sparkles size={12} /> AI Rewrite
                            </button>
                            <button className="px-3 py-1.5 border border-[#1E1E2E] text-[#64748B] text-[8px] sm:text-[9px] font-black uppercase tracking-widest rounded-lg">Shorter</button>
                            <button className="px-3 py-1.5 border border-[#1E1E2E] text-[#64748B] text-[8px] sm:text-[9px] font-black uppercase tracking-widest rounded-lg">Technical</button>
                         </div>
                         <textarea 
                           className="w-full bg-[#0A0A0F] border border-[#1E1E2E] rounded-2xl p-4 sm:p-6 text-xs sm:text-sm leading-relaxed min-h-[140px] sm:min-h-[160px] focus:border-[#6C3CE1] transition-all outline-none"
                           defaultValue={data.summary}
                         />
                         <div className="flex flex-col sm:flex-row justify-between items-center gap-4">
                            <span className="text-[8px] sm:text-[10px] font-black uppercase text-[#64748B] tracking-widest">58 Words (Ideal: 50-100)</span>
                            <div className="flex gap-3 w-full sm:w-auto">
                               <button onClick={() => setIsEditing(null)} className="flex-1 sm:flex-none px-6 py-2.5 border border-[#1E1E2E] text-[#64748B] text-[9px] sm:text-[10px] font-black uppercase rounded-lg">Cancel</button>
                               <button onClick={() => handleSave('summary')} className="flex-1 sm:flex-none px-8 py-2.5 bg-[#6C3CE1] text-white text-[9px] sm:text-[10px] font-black uppercase rounded-lg">Save</button>
                            </div>
                         </div>
                      </div>
                   ) : (
                      <p className="text-xs sm:text-sm text-[#64748B] leading-relaxed max-w-4xl">{data.summary}</p>
                   )}
                </div>
             </AccordionItem>

             {/* 3. Work Experience */}
             <AccordionItem 
              title="Work Experience" 
              badge="7 roles" 
              isExpanded={expandedSection === 'experience'} 
              onToggle={() => toggleSection('experience')}
              onEdit={() => handleEdit('experience')}
             >
                <div className="space-y-4">
                   {data.experience.map((exp) => (
                      <div key={exp.id} className="p-4 sm:p-6 bg-[#0D0D14] border border-[#1E1E2E] rounded-2xl flex flex-col sm:flex-row items-start gap-4 sm:gap-6 group hover:border-white/10 transition-all">
                         <div className="p-3 bg-[#111118] border border-[#1E1E2E] rounded-xl text-[#6EE7B7] shrink-0">
                            <Briefcase size={18} />
                         </div>
                         <div className="flex-1 space-y-2 w-full">
                            <div className="flex justify-between items-start">
                               <h4 className="text-base sm:text-lg font-black font-syne uppercase tracking-tight italic truncate pr-4">{exp.role}</h4>
                               <div className="flex gap-1 shrink-0">
                                  <button className="p-1.5 text-[#64748B] hover:text-[#6EE7B7] transition-colors"><Pencil size={14} /></button>
                                  <button className="p-1.5 text-[#64748B] hover:text-[#EF4444] transition-colors"><Trash2 size={14} /></button>
                               </div>
                            </div>
                            <p className="text-[8px] sm:text-[10px] font-black text-[#6C3CE1] uppercase tracking-widest truncate">{exp.company} // {exp.location} // {exp.date}</p>
                            <ul className="space-y-1.5 mt-3 sm:mt-4">
                               {exp.points.map((p, j) => (
                                 <li key={j} className="text-[10px] sm:text-xs text-[#64748B] flex items-start gap-2">
                                    <span className="text-[#6EE7B7] mt-1 shrink-0">•</span> {p}
                                 </li>
                               ))}
                            </ul>
                         </div>
                         <div className="hidden sm:block cursor-move p-2 text-[#1E1E2E] group-hover:text-[#2E2E3E] shrink-0">
                            <GripVertical size={20} />
                         </div>
                      </div>
                   ))}
                   <button className="w-full py-4 sm:py-6 border-2 border-dashed border-[#1E1E2E] rounded-2xl text-[#64748B] hover:border-[#6C3CE1]/40 hover:text-[#6C3CE1] transition-all flex items-center justify-center gap-2 text-[10px] sm:text-xs font-black uppercase tracking-widest font-syne italic">
                  <Plus size={18} /> New Experience
                   </button>
                </div>
             </AccordionItem>

              {/* 4. Education */}
             <AccordionItem
              title="Education"
              badge="2 entries"
              isExpanded={expandedSection === 'education'}
              onToggle={() => toggleSection('education')}
              onEdit={() => handleEdit('education')}
             >
                <div className="space-y-4">
                   {data.education.map((edu) => (
                      <div key={edu.id} className="p-4 sm:p-6 bg-[#0D0D14] border border-[#1E1E2E] rounded-2xl flex items-center gap-4 sm:gap-6 group hover:border-white/10 transition-all overflow-hidden">
                         <div className="w-10 h-10 sm:w-12 sm:h-12 bg-[#818CF8]/10 border border-[#818CF8]/20 rounded-xl flex items-center justify-center text-[#818CF8] shrink-0">
                            <GraduationCap size={20} />
                         </div>
                         <div className="flex-1 space-y-1 min-w-0">
                            <h4 className="text-[10px] sm:text-sm font-black uppercase tracking-widest truncate">{edu.degree}</h4>
                            <p className="text-[7px] sm:text-[10px] text-[#64748B] font-bold uppercase truncate">{edu.school} // {edu.date}</p>
                         </div>
                         <div className="flex gap-1 shrink-0">
                            <button className="p-1.5 text-[#64748B] hover:text-[#6C3CE1] transition-colors"><Pencil size={14} /></button>
                            <button className="p-1.5 text-[#64748B] hover:text-[#EF4444] transition-colors"><Trash2 size={14} /></button>
                         </div>
                      </div>
                   ))}
                   <button className="w-full py-3 sm:py-4 border border-dashed border-[#1E1E2E] rounded-xl text-[8px] sm:text-[10px] font-black uppercase tracking-widest text-[#64748B] hover:border-[#6C3CE1]/40 hover:text-[#6C3CE1] transition-all flex items-center justify-center gap-2">
                      <Plus size={16} /> Add Education
                   </button>
                </div>
             </AccordionItem>

             {/* 5. Skills Section */}
             <AccordionItem
              title="Skills"
              badge="12 skills"
              isExpanded={expandedSection === 'skills'}
              onToggle={() => toggleSection('skills')}
              onEdit={() => handleEdit('skills')}
             >
                <div className="space-y-8 sm:space-y-10">
                   {/* Technical */}
                   <div className="space-y-4">
                      <h5 className="text-[8px] sm:text-[10px] font-black uppercase text-[#64748B] tracking-[0.3em]">Technical Arsenal</h5>
                      <div className="flex flex-wrap gap-2 sm:gap-3">
                         {data.skills.technical.map(skill => (
                           <div key={skill} className="px-3 sm:px-4 py-1.5 sm:py-2 bg-[#111118] border border-[#1E1E2E] rounded-xl text-[10px] sm:text-xs font-bold text-[#6EE7B7] flex items-center gap-2 group hover:border-[#6EE7B7]/30 transition-all">
                              {skill}
                              <button className="text-[#64748B] hover:text-[#EF4444] transition-colors opacity-0 group-hover:opacity-100"><X size={10} /></button>
                           </div>
                         ))}
                         <div className="px-3 sm:px-4 py-1.5 sm:py-2 border border-dashed border-[#1E1E2E] rounded-xl text-[8px] sm:text-[10px] font-black text-[#64748B] uppercase tracking-widest cursor-pointer hover:border-[#6C3CE1]/30 transition-all flex items-center gap-1 sm:gap-2">
                            <Plus size={12} /> Add
                         </div>
                      </div>
                   </div>

                   {/* Tools */}
                   <div className="space-y-4">
                      <h5 className="text-[8px] sm:text-[10px] font-black uppercase text-[#64748B] tracking-[0.3em]">Developer Tools</h5>
                      <div className="flex flex-wrap gap-2 sm:gap-3">
                         {data.skills.tools.map(tool => (
                           <div key={tool} className="px-3 sm:px-4 py-1.5 sm:py-2 bg-[#111118] border border-[#1E1E2E] rounded-xl text-[10px] sm:text-xs font-bold text-[#60A5FA] flex items-center gap-2 group">
                              {tool} <X size={10} className="opacity-0 group-hover:opacity-100 cursor-pointer text-[#EF4444]" />
                           </div>
                         ))}
                      </div>
                   </div>

                   {/* AI Suggestions Nudge */}
                   <div className="p-4 sm:p-6 bg-[#6C3CE1]/5 border border-[#6C3CE1]/15 rounded-2xl space-y-4">
                      <p className="text-[8px] sm:text-[10px] font-black text-[#6C3CE1] uppercase tracking-widest flex items-center gap-2">
                         <Sparkles size={14} /> AI Suggested for you
                      </p>
                      <div className="flex flex-wrap gap-2">
                         {['TensorFlow', 'Docker', 'scikit-learn', 'PyTorch'].map(s => (
                           <button key={s} className="px-2.5 sm:px-3 py-1 sm:py-1.5 bg-[#6C3CE1]/10 text-[#6C3CE1] text-[8px] sm:text-[9px] font-black uppercase tracking-widest rounded-lg border border-transparent hover:border-[#6C3CE1]/30 transition-all">
                              + {s}
                           </button>
                         ))}
                      </div>
                   </div>
                </div>
             </AccordionItem>

             {/* 6. Certifications */}
             <AccordionItem 
              title="Certifications" 
              badge="2 certs" 
              isExpanded={expandedSection === 'certifications'} 
              onToggle={() => toggleSection('certifications')}
              onEdit={() => handleEdit('certifications')}
             >
                <div className="space-y-4">
                   {data.certifications.map((cert) => (
                      <div key={cert.id} className="p-4 sm:p-6 bg-[#0D0D14] border border-[#1E1E2E] rounded-2xl flex items-center gap-4 sm:gap-6 group hover:border-white/10 transition-all overflow-hidden">
                         <div className="w-10 h-10 sm:w-12 sm:h-12 bg-[#6EE7B7]/10 border border-[#6EE7B7]/20 rounded-xl flex items-center justify-center text-[#6EE7B7] shrink-0">
                            <Award size={20} />
                         </div>
                         <div className="flex-1 space-y-1 min-w-0">
                            <h4 className="text-[10px] sm:text-sm font-black uppercase tracking-widest truncate">{cert.name}</h4>
                            <p className="text-[7px] sm:text-[10px] text-[#64748B] font-bold uppercase truncate">{cert.issuer} // {cert.date}</p>
                         </div>
                         <div className="flex gap-1 shrink-0">
                            <button className="p-1.5 text-[#64748B] hover:text-[#6C3CE1] transition-colors"><Pencil size={14} /></button>
                            <button className="p-1.5 text-[#64748B] hover:text-[#EF4444] transition-colors"><Trash2 size={14} /></button>
                         </div>
                      </div>
                   ))}
                   <button className="w-full py-3 sm:py-4 border border-dashed border-[#1E1E2E] rounded-xl text-[8px] sm:text-[10px] font-black uppercase tracking-widest text-[#64748B] hover:border-[#6C3CE1]/40 hover:text-[#6C3CE1] transition-all flex items-center justify-center gap-2">
                      <Plus size={16} /> Add Certification
                   </button>
                </div>
             </AccordionItem>

             {/* 7. Projects */}
             <AccordionItem 
              title="Projects" 
              badge="0 projects ✗" 
              isExpanded={expandedSection === 'projects'} 
              onToggle={() => toggleSection('projects')}
              onEdit={() => handleEdit('projects')}
             >
                <div className="py-8 sm:py-12 flex flex-col items-center justify-center text-center space-y-4 sm:space-y-6">
                   <div className="w-16 h-16 sm:w-20 sm:h-20 rounded-full bg-white/[0.02] border border-white/5 flex items-center justify-center text-[#64748B]">
                      <Target size={28} />
                   </div>
                   <div className="space-y-2 px-4">
                      <h4 className="text-lg sm:text-xl font-black font-syne uppercase tracking-tight italic">No Projects Yet</h4>
                      <p className="text-[10px] sm:text-xs text-[#64748B] max-w-sm leading-relaxed uppercase tracking-widest mx-auto">Projects increase visibility by <span className="text-[#6EE7B7] font-black">+12 points</span>. Establish authority now.</p>
                   </div>
                   <button className="w-full sm:w-auto px-8 sm:px-10 py-3 sm:py-4 bg-[#6C3CE1] text-white text-[9px] sm:text-[10px] font-black uppercase tracking-[0.2em] sm:tracking-[0.3em] rounded-xl hover:shadow-[0_0_40px_rgba(108,60,225,0.3)] transition-all flex items-center justify-center gap-2">
                      <Plus size={16} /> Add First Project
                   </button>
                </div>
             </AccordionItem>

             {/* 8. Career Preferences */}
             <AccordionItem 
              title="Career Preferences" 
              isExpanded={expandedSection === 'preferences'} 
              onToggle={() => toggleSection('preferences')}
              onEdit={() => handleEdit('preferences')}
             >
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 sm:gap-8">
                   {[
                     { label: 'Target Role', value: data.preferences.targetRole, icon: Target },
                     { label: 'Work Type', value: data.preferences.workType, icon: Globe },
                     { label: 'Expected Salary', value: `${data.preferences.minSalary}—${data.preferences.maxSalary}/yr`, icon: CreditCard },
                     { label: 'Relocation', value: data.preferences.relocation ? 'YES' : 'NO', icon: MapPin }
                   ].map((pref, i) => (
                     <div key={i} className="p-4 bg-[#0D0D14] border border-[#1E1E2E] rounded-xl space-y-2 group hover:border-[#6C3CE1]/20 transition-all overflow-hidden">
                        <div className="flex items-center gap-2">
                           <pref.icon size={12} className="text-[#64748B] shrink-0" />
                           <span className="text-[8px] sm:text-[9px] font-black text-[#64748B] uppercase tracking-widest truncate">{pref.label}</span>
                        </div>
                        <p className="text-[10px] sm:text-xs font-bold uppercase tracking-tight truncate">{pref.value}</p>
                     </div>
                   ))}
                </div>
             </AccordionItem>
          </section>

          {/* Section 5: Danger Zone */}
          <section className="bg-[#EF4444]/5 border-2 border-[#EF4444]/20 rounded-3xl overflow-hidden shadow-[0_20px_60px_rgba(239,68,68,0.05)]">
             <div className="p-6 sm:p-8 border-b border-[#EF4444]/10 bg-[#EF4444]/5">
                <h3 className="text-lg sm:text-xl font-black font-syne uppercase italic tracking-tight text-[#EF4444] flex items-center gap-3">
                   <AlertTriangle size={20} /> Account Zone
                </h3>
             </div>
             <div className="p-4 sm:p-8 grid grid-cols-1 xs:grid-cols-2 md:grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-6">
                {[
                  { label: 'Password', sub: 'Reset keys' },
                  { label: 'Username', sub: 'Change URL' },
                  { label: 'My Data', sub: 'GDPR Export' },
                  { label: 'Delete', color: '#EF4444', border: '#EF4444', sub: 'Permanent' }
                ].map((act, i) => (
                  <button key={i} className="p-4 sm:p-6 rounded-2xl border bg-white/[0.01] hover:bg-white/[0.03] transition-all text-left space-y-1 sm:space-y-2 group" style={{ borderColor: act.border || '#1E1E2E' }}>
                     <p className="text-[9px] sm:text-[10px] font-black uppercase tracking-widest italic" style={{ color: act.color || 'white' }}>{act.label}</p>
                     {act.sub && <p className="text-[7px] sm:text-[8px] font-black text-[#64748B] uppercase tracking-widest">{act.sub}</p>}
                  </button>
                ))}
             </div>
          </section>
        </div>

        {/* Floating Actions for Editing */}
        <AnimatePresence>
          {isEditing && (
            <motion.div 
              initial={{ y: 100 }}
              animate={{ y: 0 }}
              exit={{ y: 100 }}
              className="fixed bottom-4 sm:bottom-10 left-4 right-4 sm:left-1/2 sm:-translate-x-1/2 z-[110] bg-[#111118]/90 backdrop-blur-xl border border-[#6C3CE1]/30 p-3 sm:p-4 rounded-2xl flex flex-col sm:flex-row items-center gap-4 sm:gap-6 shadow-2xl"
            >
               <div className="flex items-center gap-3 w-full sm:w-auto pr-0 sm:pr-6 border-b sm:border-b-0 sm:border-r border-white/5 pb-3 sm:pb-0">
                  <div className="w-8 h-8 sm:w-10 sm:h-10 rounded-xl bg-[#6C3CE1] flex items-center justify-center text-white shrink-0">
                     <Pencil size={18} />
                  </div>
                  <div className="space-y-0.5 overflow-hidden">
                     <p className="text-[8px] sm:text-[10px] font-black text-white uppercase tracking-tight">Editing</p>
                     <p className="text-[8px] sm:text-[10px] font-bold text-[#6C3CE1] uppercase tracking-widest truncate">{isEditing} Section</p>
                  </div>
               </div>
               <div className="flex gap-2 sm:gap-3 w-full sm:w-auto">
                  <button 
                    onClick={() => setIsEditing(null)}
                    className="flex-1 sm:flex-none px-4 sm:px-6 py-2.5 sm:py-3 border border-[#1E1E2E] text-[#64748B] text-[8px] sm:text-[10px] font-black uppercase tracking-widest rounded-xl hover:text-white transition-all"
                  >
                    Discard
                  </button>
                  <button 
                    onClick={() => handleSave(isEditing)}
                    className="flex-1 sm:flex-none px-6 sm:px-8 py-2.5 sm:py-3 bg-[#6C3CE1] text-white text-[8px] sm:text-[10px] font-black uppercase tracking-widest rounded-xl shadow-[0_0_30px_rgba(108,60,225,0.4)]"
                  >
                    Sync ✓
                  </button>
               </div>
            </motion.div>
          )}
        </AnimatePresence>
      </main>

      <style jsx global>{`
        .custom-scrollbar::-webkit-scrollbar {
          width: 4px;
        }
        .custom-scrollbar::-webkit-scrollbar-track {
          background: #0A0A0F;
        }
        .custom-scrollbar::-webkit-scrollbar-thumb {
          background: #1E1E2E;
          border-radius: 10px;
        }
        .custom-scrollbar::-webkit-scrollbar-thumb:hover {
          background: #6C3CE1;
        }
      `}</style>
    </div>
  );
}
