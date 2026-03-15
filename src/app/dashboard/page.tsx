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
  Eye,
  Download
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
    { icon: LayoutDashboard, label: 'Dashboard', href: '/dashboard', active: true },
    { icon: User, label: 'My Profile', href: '/profile' },
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

const stats = [
  { label: 'Profile Score', value: '91/100', color: COLORS.purple, change: '↑ +4 this week', progress: 91 },
  { label: 'Profile Views', value: '342', color: COLORS.blue, sub: 'this week', change: '↑ +28% vs last week' },
  { label: 'Resume Downloads', value: '12', color: COLORS.orange, sub: 'last 30 days', change: '↑ +3 this week' },
  { label: 'Job Matches', value: '24', color: COLORS.green, sub: '3 applied · 1 shortlisted', change: '↑ 8 new today' }
];

const completionData = [
  { label: 'Basic Info', value: 100, color: COLORS.green },
  { label: 'Skills', value: 90, color: COLORS.green },
  { label: 'Experience', value: 100, color: COLORS.green },
  { label: 'Projects', value: 50, color: COLORS.yellow },
  { label: 'Certifications', value: 60, color: COLORS.yellow }
];

const jobs = [
  { role: 'ML Engineer', company: 'Zoho Corp', match: 94, location: 'Chennai', salary: '₹8–12 LPA', type: 'Full-time' },
  { role: 'AI Developer', company: 'Freshworks', match: 89, location: 'Chennai', salary: '₹10–15 LPA', type: 'Full-time' },
  { role: 'Full Stack Developer', company: 'Swiggy', match: 78, location: 'Bangalore', salary: '₹12–18 LPA', type: 'Hybrid' }
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

const ProgressBar = ({ value, color, label, showPercent = true }: any) => (
  <div className="space-y-1.5">
    <div className="flex justify-between items-center text-[10px] font-bold uppercase tracking-widest">
      <span className="text-[#64748B]">{label}</span>
      {showPercent && <span style={{ color }}>{value}%</span>}
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
);

// --- Main Page ---

export default function Dashboard() {
  const [greeting, setGreeting] = useState('');
  const [copyStatus, setCopyStatus] = useState('Copy Link');
  const [isSidebarOpen, setIsSidebarOpen] = useState(false); // Mobile hidden by default
  const [userPlan, setUserPlan] = useState('free'); // 'free' or 'pro'

  useEffect(() => {
    const hour = new Date().getHours();
    if (hour < 12) setGreeting('Good morning');
    else if (hour < 17) setGreeting('Good afternoon');
    else setGreeting('Good evening');
    
    // Auto open sidebar on desktop
    if (window.innerWidth >= 1024) {
      setIsSidebarOpen(true);
    }
  }, []);

  const copyToClipboard = () => {
    navigator.clipboard.writeText('iamfolio.in/devaprakash');
    setCopyStatus('Copied! ✓');
    setTimeout(() => setCopyStatus('Copy Link'), 2000);
  };

  return (
    <div className="min-h-screen bg-[#0A0A0F] text-[#E2E8F0] font-mono selection:bg-[#6C3CE1]/30 flex relative overflow-x-hidden">
      <AnimatePresence>
        {isSidebarOpen && (
          <>
            {/* Mobile Backdrop */}
            <motion.div 
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => setIsSidebarOpen(false)}
              className="fixed inset-0 bg-black/80 backdrop-blur-sm z-[90] lg:hidden"
            />
            {/* Sidebar */}
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
                      <span className="px-1 py-0.5 bg-[#6EE7B7]/10 text-[#6EE7B7] text-[7px] font-black rounded uppercase">FREE</span>
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
        {/* Topbar */}
        <header className="sticky top-0 z-40 bg-[#0A0A0F]/80 backdrop-blur-md border-b border-[#1E1E2E] px-4 md:px-8 py-4 md:py-6 flex justify-between items-center gap-4">
          <div className="flex items-center gap-2 md:gap-4">
            <button 
              onClick={() => setIsSidebarOpen(true)}
              className={`p-2 bg-[#111118] border border-[#1E1E2E] rounded-lg text-[#E2E8F0] hover:border-[#6C3CE1]/40 transition-all ${isSidebarOpen ? 'lg:hidden' : 'flex'}`}
            >
              <LayoutDashboard size={20} />
            </button>
            <div className="space-y-0.5 md:space-y-1">
              <h1 className="text-base md:text-xl font-black font-syne text-[#E2E8F0] tracking-tight truncate max-w-[150px] md:max-w-none">
                {greeting}, Devaprakash 👋
              </h1>
              <p className="text-[9px] md:text-xs text-[#64748B]">
                <span className="hidden md:inline">Sunday, March 15 · </span>
                <span className="text-[#6EE7B7]">68% complete</span>
              </p>
            </div>
          </div>
          <div className="flex items-center gap-2 md:gap-4">
            <div 
              onClick={copyToClipboard}
              className="hidden sm:flex items-center gap-3 px-4 py-2 bg-[#111118] border border-[#1E1E2E] rounded-full cursor-pointer hover:border-[#6C3CE1]/40 transition-all group"
            >
              <span className="text-[10px] font-bold text-[#64748B] group-hover:text-[#E2E8F0] hidden md:inline">iamfolio.in/devaprakash</span>
              <div className={`hidden md:block h-4 w-px bg-[#1E1E2E] transition-colors ${copyStatus === 'Copied! ✓' ? 'bg-[#6EE7B7]' : ''}`} />
              <div className="flex items-center gap-2">
                <Copy size={12} className={copyStatus === 'Copied! ✓' ? 'text-[#6EE7B7]' : 'text-[#64748B]'} />
                <span className={`text-[10px] font-black uppercase tracking-widest ${copyStatus === 'Copied! ✓' ? 'text-[#6EE7B7]' : 'text-[#E2E8F0]'}`}>
                  {copyStatus === 'Copy Link' ? (
                    <span className="md:inline block">COPY</span>
                  ) : copyStatus}
                </span>
              </div>
            </div>
            <button className="px-4 md:px-6 py-2 bg-[#FF6B35] text-white text-[9px] md:text-[10px] font-black uppercase tracking-widest rounded-full hover:bg-[#FF6B35]/80 transition-all shadow-[0_4px_20px_rgba(255,107,53,0.3)] shrink-0">
              Share <span className="hidden sm:inline">Profile</span> ↗
            </button>
          </div>
        </header>

        <div className="p-4 md:p-8 space-y-6 md:space-y-10 max-w-7xl mx-auto w-full">
          {/* Pro Banner Nudge */}
          {userPlan === 'free' && (
            <motion.div 
              initial={{ opacity: 0, y: -10 }}
              animate={{ opacity: 1, y: 0 }}
              className="p-4 md:p-5 bg-[#6C3CE1]/15 border border-[#6C3CE1]/30 rounded-xl flex flex-col md:flex-row items-center justify-between gap-4"
            >
              <div className="flex items-center gap-3 w-full md:w-auto">
                <div className="p-2.5 bg-[#6C3CE1] rounded-lg text-white shrink-0">
                  <Zap size={20} />
                </div>
                <div className="space-y-0.5">
                  <p className="text-xs md:text-sm font-black text-white uppercase tracking-tight italic leading-tight">Go Pro for full analytics & unlimited resumes</p>
                  <p className="text-[9px] md:text-[10px] text-[#64748B] font-bold uppercase lining-tight">Unlock tracker activity & AI interview prep.</p>
                </div>
              </div>
              <div className="flex items-center gap-3 w-full md:w-auto">
                <button className="flex-1 md:flex-none text-[9px] md:text-[10px] font-black uppercase tracking-widest text-[#64748B] hover:text-[#E2E8F0] px-4 py-2 bg-[#111118] md:bg-transparent border border-[#1E1E2E] md:border-none rounded-lg">Dismiss</button>
                <button className="flex-[2] md:flex-none px-6 py-2.5 bg-[#FF6B35] text-white text-[9px] md:text-[10px] font-black uppercase tracking-widest rounded-lg hover:shadow-lg transition-all shadow-lg active:scale-95">Upgrade →</button>
              </div>
            </motion.div>
          )}

          {/* Section 1: Quick Actions */}
          <section className="grid grid-cols-2 lg:grid-cols-4 gap-3 md:gap-4">
            {[
              { label: 'Resume', sub: 'Templates', icon: FileText, href: '/resume-builder' },
              { label: 'Interview', sub: 'Practice', icon: Mic, href: '/mock-interview' },
              { label: 'Jobs', sub: 'Matches', icon: Search, href: '/jobs' },
              { label: 'Profile', sub: '68% done', icon: Pencil, href: '/profile' }
            ].map((action, i) => (
              <Link key={i} href={action.href}>
                <motion.div 
                  whileHover={{ y: -4 }}
                  className="p-4 md:p-6 bg-[#111118] border border-[#1E1E2E] rounded-xl flex flex-col md:flex-row items-center md:items-center gap-2 md:gap-4 hover:border-[#6C3CE1]/40 hover:bg-[#6C3CE1]/5 transition-all group cursor-pointer text-center md:text-left h-full"
                >
                  <div className="p-2 md:p-3 bg-[#0A0A0F] border border-[#1E1E2E] rounded-lg group-hover:text-[#6C3CE1] transition-colors shrink-0">
                    <action.icon size={20} className="md:w-6 md:h-6" />
                  </div>
                  <div className="space-y-0.5 min-w-0 overflow-hidden">
                    <h4 className="text-[10px] md:text-xs font-black uppercase tracking-widest text-[#E2E8F0] group-hover:text-[#6C3CE1] transition-colors truncate">
                      {action.label}
                    </h4>
                    <p className="text-[8px] md:text-[10px] font-bold text-[#64748B] uppercase tracking-widest truncate">{action.sub}</p>
                  </div>
                </motion.div>
              </Link>
            ))}
          </section>

          {/* Section 2: Metrics */}
          <section className="grid grid-cols-2 lg:grid-cols-4 gap-4 md:gap-6">
            {stats.map((stat, i) => (
              <motion.div 
                key={i}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: i * 0.1 }}
                whileHover={{ y: -2 }}
                className="p-5 md:p-8 bg-[#111118] border border-[#1E1E2E] rounded-2xl space-y-3 md:space-y-4 hover:border-white/10 transition-all hover:bg-white/[0.01]"
              >
                <div className="flex justify-between items-start">
                  <span className="text-[9px] md:text-[10px] font-bold text-[#64748B] uppercase tracking-[0.2em]">{stat.label}</span>
                  {i === 2 && <TrendingUp size={14} className="text-[#6EE7B7] hidden md:block" />}
                </div>
                <div className="space-y-1">
                  <h3 className="text-xl md:text-3xl font-black font-syne italic" style={{ color: stat.color }}>{stat.value}</h3>
                  {stat.progress && (
                    <div className="h-1 md:h-1.5 w-full bg-[#1E1E2E] rounded-full overflow-hidden mt-2">
                       <motion.div 
                         initial={{ width: 0 }}
                         animate={{ width: `${stat.progress}%` }}
                         transition={{ duration: 1, delay: 0.5 }}
                         className="h-full rounded-full"
                         style={{ backgroundColor: stat.color }}
                       />
                    </div>
                  )}
                  {stat.sub && <p className="text-[8px] md:text-[10px] text-[#64748B] font-bold uppercase truncate">{stat.sub}</p>}
                </div>
                <div className="flex items-center gap-1.5 pt-2.5 border-t border-[#1E1E2E]">
                  <span className="text-[8px] md:text-[10px] font-black text-[#6EE7B7] uppercase truncate">{stat.change}</span>
                </div>
              </motion.div>
            ))}
          </section>

          {/* Section 3: Completion & Gap Analysis */}
          <section className="grid grid-cols-1 lg:grid-cols-2 gap-6 md:gap-8">
            <div className="p-6 md:p-8 bg-[#111118] border border-[#1E1E2E] rounded-2xl space-y-6 md:space-y-8">
              <div className="flex justify-between items-center">
                <div className="flex items-center gap-3">
                  <h3 className="text-base md:text-lg font-black font-syne uppercase tracking-tight italic">Profile Completion</h3>
                  <div className="px-1.5 py-0.5 bg-[#6C3CE1]/10 text-[#6C3CE1] text-[8px] font-black rounded uppercase">CRITICAL</div>
                </div>
                <Link href="/profile" className="text-[9px] md:text-[10px] font-black uppercase text-[#6C3CE1] hover:underline">Edit →</Link>
              </div>

              <div className="space-y-5 md:space-y-6">
                {completionData.map((item, i) => (
                  <ProgressBar key={i} {...item} />
                ))}
              </div>

              <div className="p-5 md:p-6 bg-[#FBBF24]/5 border border-[#FBBF24]/20 rounded-xl space-y-4">
                <p className="text-[9px] md:text-[10px] font-black text-[#FBBF24] uppercase tracking-widest flex items-center gap-2">
                  <AlertTriangle size={12} className="md:w-3.5 md:h-3.5" /> Critical Warning
                </p>
                <div className="space-y-3">
                   <p className="text-xs text-[#E2E8F0] leading-relaxed">Add 2 projects to your profile to increase your visibility score by <span className="text-[#6EE7B7] font-bold">+16 pts</span>.</p>
                   <button className="w-full py-2.5 md:py-3 border border-[#6C3CE1] text-[#6C3CE1] text-[9px] md:text-[10px] font-black uppercase tracking-widest rounded-lg hover:bg-[#6C3CE1]/10 transition-all active:scale-95">
                     Complete Profile →
                   </button>
                </div>
              </div>
            </div>

            <div className="p-6 md:p-8 bg-[#111118] border border-[#1E1E2E] rounded-2xl space-y-6 md:space-y-8">
              <div className="flex justify-between items-center">
                <div className="space-y-0.5 text-left">
                  <h3 className="text-base md:text-lg font-black font-syne uppercase tracking-tight italic">Skill Gap Analysis</h3>
                  <p className="text-[9px] md:text-[10px] font-bold text-[#64748B] uppercase tracking-widest">Based on target roles</p>
                </div>
                <button className="text-[9px] md:text-[10px] font-black uppercase text-[#6C3CE1] hover:underline uppercase">View All →</button>
              </div>

              <div className="space-y-2.5 md:space-y-3">
                 {[
                   { label: 'Missing: TensorFlow', sub: 'Add to boost ATS +8pts', color: COLORS.yellow, icon: AlertTriangle },
                   { label: 'Missing: Docker', sub: 'In 60% of job listings', color: COLORS.yellow, icon: AlertTriangle },
                   { label: 'Python, React, Node.js', sub: 'Matches 85% of target roles', color: COLORS.green, icon: CheckCircle2 },
                   { label: 'Pandas, Matplotlib', sub: 'Strong foundation', color: COLORS.green, icon: CheckCircle2 }
                 ].map((gap, i) => (
                   <div 
                    key={i} 
                    className="p-3.5 md:p-4 rounded-xl flex items-center gap-3.5 md:gap-4 transition-all"
                    style={{ backgroundColor: `${gap.color}08`, border: `1px border ${gap.color}15` }}
                   >
                     <gap.icon size={14} className="md:w-4 md:h-4 shrink-0" style={{ color: gap.color }} />
                     <div className="space-y-0.5 text-left min-w-0 overflow-hidden">
                        <p className="text-[10px] md:text-[11px] font-black uppercase tracking-tight leading-none truncate" style={{ color: gap.color }}>{gap.label}</p>
                        <p className="text-[8px] md:text-[9px] text-[#64748B] font-bold uppercase tracking-widest leading-none truncate">{gap.sub}</p>
                     </div>
                   </div>
                 ))}
              </div>

              <button className="w-full py-4 bg-[#6C3CE1] text-white text-[9px] md:text-[10px] font-black uppercase tracking-[0.2em] rounded-lg hover:shadow-xl transition-all shadow-[0_4px_20_rgba(108,60,225,0.2)] active:scale-95 text-center">
                Recommendations →
              </button>
            </div>
          </section>

          {/* Section 4: 3-Column Row */}
          <section className="grid grid-cols-1 lg:grid-cols-3 gap-6 md:gap-8 pb-20">
            <div className="p-6 md:p-8 bg-[#111118] border border-[#1E1E2E] rounded-2xl space-y-6 md:space-y-8">
              <div className="flex justify-between items-center">
                 <div className="space-y-0.5 md:space-y-1">
                    <h3 className="text-base md:text-lg font-black font-syne uppercase tracking-tight italic">Experience</h3>
                    <p className="text-[9px] md:text-[10px] font-bold text-[#64748B] uppercase tracking-widest">7 roles auto-imported</p>
                 </div>
                 <Link href="/profile" className="text-[9px] md:text-[10px] font-black uppercase text-[#6C3CE1] hover:underline">Edit →</Link>
              </div>

              <div className="space-y-5 md:space-y-6">
                 {[
                   { role: 'AI Software Developer', company: 'Upwork', date: '2024–Now', color: COLORS.green },
                   { role: 'Full Stack Developer', company: 'Fiverr', date: '2021–Now', color: COLORS.purple },
                   { role: 'AI Consultant', company: 'Amazon', date: '2025–Now', color: COLORS.blue }
                 ].map((exp, i) => (
                   <div key={i} className="flex gap-3 md:gap-4 group">
                      <div className="pt-1.5 shrink-0">
                         <div className="w-1 md:w-1.5 h-1 md:h-1.5 rounded-full" style={{ backgroundColor: exp.color }} />
                      </div>
                      <div className="space-y-0.5 md:space-y-1 min-w-0 overflow-hidden">
                         <h5 className="text-[10px] md:text-[11px] font-black border-white text-white uppercase tracking-tight truncate">{exp.role}</h5>
                         <p className="text-[8px] md:text-[9px] font-bold text-[#64748B] uppercase tracking-widest truncate">{exp.company} // {exp.date}</p>
                      </div>
                   </div>
                 ))}
                 <button className="text-[8px] md:text-[9px] font-black uppercase tracking-widest text-[#6C3CE1] hover:underline pt-1 underline-offset-2">+3 more roles</button>
              </div>
            </div>

            <div className="p-6 md:p-8 bg-[#111118] border border-[#1E1E2E] rounded-2xl space-y-6 md:space-y-8">
              <div className="flex justify-between items-center">
                 <div className="space-y-0.5 md:space-y-1">
                    <h3 className="text-base md:text-lg font-black font-syne uppercase tracking-tight italic">Job Matches</h3>
                    <p className="text-[9px] md:text-[10px] font-bold text-[#64748B] uppercase tracking-widest">Core skills match</p>
                 </div>
                 <button className="text-[9px] md:text-[10px] font-black uppercase text-[#6C3CE1] hover:underline">View 24 →</button>
              </div>

              <div className="space-y-3 md:space-y-4">
                 {jobs.map((job, i) => (
                   <motion.div 
                    key={i} 
                    whileHover={{ scale: 1.02 }}
                    className="p-3.5 md:p-4 border border-[#1E1E2E] rounded-xl space-y-2 md:space-y-3 cursor-pointer hover:border-[#6EE7B7]/30 transition-all bg-[#0A0A0F]/50 group"
                   >
                     <div className="flex justify-between items-start gap-2">
                        <div className="space-y-0.5 min-w-0 overflow-hidden">
                           <h5 className="text-[10px] md:text-[11px] font-black text-white uppercase tracking-tight group-hover:text-[#6EE7B7] transition-colors truncate">{job.role}</h5>
                           <p className="text-[8px] md:text-[9px] font-black text-[#6EE7B7] uppercase tracking-widest truncate">{job.company}</p>
                        </div>
                        <div className={`px-1.5 py-0.5 text-[7px] md:text-[8px] font-black rounded-full uppercase shrink-0 ${
                          job.match > 85 ? 'bg-[#6EE7B7]/10 text-[#6EE7B7]' : 'bg-[#FBBF24]/10 text-[#FBBF24]'
                        }`}>
                          {job.match}% match
                        </div>
                     </div>
                     <div className="flex items-center flex-wrap gap-2 md:gap-3 text-[7px] md:text-[8px] font-bold text-[#64748B] uppercase tracking-widest">
                        <span className="flex items-center gap-1 shrink-0"><MapPin size={8} /> {job.location}</span>
                        <span className="flex items-center gap-1 shrink-0"><CreditCard size={8} /> {job.salary}</span>
                        <span className="hidden sm:flex items-center gap-1 shrink-0"><Clock size={8} /> {job.type}</span>
                     </div>
                   </motion.div>
                 ))}
              </div>
            </div>

            <div className="space-y-6 md:space-y-8">
              <div className="p-6 md:p-8 bg-[#111118] border border-[#1E1E2E] rounded-2xl space-y-6 md:space-y-8">
                 <div className="flex justify-between items-center">
                    <div className="space-y-0.5 md:space-y-1">
                       <h3 className="text-base md:text-lg font-black font-syne uppercase tracking-tight italic">Mocks</h3>
                       <p className="text-[9px] md:text-[10px] font-bold text-[#64748B] uppercase tracking-widest">Avg score: 78</p>
                    </div>
                    <button className="text-[9px] md:text-[10px] font-black uppercase text-[#6C3CE1] hover:underline">Practice →</button>
                 </div>

                 <div className="space-y-2.5 md:space-y-3">
                    {[
                      { type: 'HR Interview', date: '2d ago', score: 82, color: COLORS.green },
                      { type: 'Technical', date: '5d ago', score: 74, color: COLORS.yellow }
                    ].map((iv, i) => (
                      <div key={i} className="flex justify-between items-center p-2.5 md:p-3 border border-[#1E1E2E] rounded-xl gap-2">
                         <div className="space-y-0.5 min-w-0 overflow-hidden">
                            <h6 className="text-[9px] md:text-[10px] font-black text-white uppercase tracking-tight truncate">{iv.type}</h6>
                            <p className="text-[7px] md:text-[8px] font-bold text-[#64748B] uppercase">{iv.date}</p>
                         </div>
                         <div className={`px-1.5 md:px-2 py-0.5 md:py-1 text-[8px] md:text-[9px] font-black rounded uppercase shrink-0`} style={{ backgroundColor: `${iv.color}10`, color: iv.color }}>
                            {iv.score}/100
                         </div>
                      </div>
                    ))}
                 </div>
                 <button className="w-full py-2.5 md:py-3 border border-[#6C3CE1] text-[#6C3CE1] text-[9px] md:text-[10px] font-black uppercase tracking-widest rounded-lg hover:bg-[#6C3CE1]/10 transition-all flex items-center justify-center gap-2 active:scale-95 text-center">
                    New Interview <ArrowRight size={12} className="hidden md:block" />
                 </button>
              </div>

              <div className="p-6 md:p-8 bg-[#111118] border border-[#1E1E2E] rounded-2xl space-y-4 md:space-y-6 relative overflow-hidden group min-h-[140px] md:min-h-0">
                 {userPlan === 'free' && (
                   <div className="absolute inset-0 bg-[#0A0A0F]/60 backdrop-blur-[2px] z-10 flex flex-col items-center justify-center p-4 md:p-6 text-center space-y-3">
                      <Lock size={16} className="text-[#FF6B35] md:w-6 md:h-6" />
                      <div className="space-y-1">
                         <p className="text-[10px] md:text-xs font-black text-white uppercase tracking-tight italic">Activity Locked</p>
                         <p className="text-[8px] md:text-[9px] text-[#64748B] font-bold uppercase tracking-widest leading-tight">Upgrade to see companies.</p>
                      </div>
                      <button className="px-5 py-2.5 bg-[#FF6B35] text-white text-[8px] md:text-[9px] font-black uppercase tracking-widest rounded-lg shadow-lg active:scale-95">Upgrade Pro</button>
                   </div>
                 )}
                 <h3 className="text-base md:text-lg font-black font-syne uppercase tracking-tight italic">Analytics</h3>
                 <div className="space-y-3 md:space-y-4">
                    {[
                      { label: 'Views', value: '342', icon: Eye },
                      { label: 'Downloads', value: '12', icon: Download },
                      { label: 'Avg Time', value: '2m 34s', icon: Clock }
                    ].map((row, i) => (
                      <div key={i} className="flex justify-between items-center">
                         <span className="text-[9px] md:text-[10px] font-bold text-[#64748B] uppercase tracking-widest flex items-center gap-2">
                            <row.icon size={12} className="md:w-3.5 md:h-3.5" /> {row.label}
                         </span>
                         <span className="text-[11px] md:text-xs font-black text-white tabular-nums">{row.value}</span>
                      </div>
                    ))}
                 </div>
              </div>
            </div>
          </section>
        </div>
      </main>

      {/* Custom Styles for Scrollbar */}
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
