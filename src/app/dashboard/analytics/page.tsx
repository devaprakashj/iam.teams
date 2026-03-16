"use client";
import React, { useState, useEffect, Suspense } from 'react';
import { useSearchParams } from 'next/navigation';
import { motion } from 'framer-motion';
import { 
  Users, 
  BarChart3, 
  PieChart, 
  MousePointer2, 
  Eye, 
  Download, 
  Clock, 
  Globe, 
  Share2, 
  Calendar,
  ChevronDown,
  Lock,
  Zap,
  CheckCircle2,
  TrendingUp,
  MessageSquare,
  ArrowRight,
  UserCheck,
  Building2,
  MapPin
} from 'lucide-react';
import { 
  LineChart, 
  Line, 
  XAxis, 
  YAxis, 
  CartesianGrid, 
  Tooltip, 
  ResponsiveContainer, 
  BarChart, 
  Bar, 
  Pie, 
  Cell,
  Legend
} from 'recharts';

// --- MOCK DATA ---
const viewData = [
  { date: 'Mar 09', views: 85, downloads: 4 },
  { date: 'Mar 10', views: 98, downloads: 6 },
  { date: 'Mar 11', views: 112, downloads: 8 },
  { date: 'Mar 12', views: 156, downloads: 12 }, // Peak day
  { date: 'Mar 13', views: 142, downloads: 7 },
  { date: 'Mar 14', views: 92, downloads: 5 },
  { date: 'Mar 15', views: 128, downloads: 10 },
];

const recruiterViews = [
  { company: 'TCS Recruiter', city: 'Chennai', time: '4m 20s', ago: '2h ago', initials: 'T' },
  { company: 'Zoho Corp HR', city: 'Chennai', time: '2m 10s', ago: '5h ago', initials: 'Z' },
  { company: 'Freshworks Team', city: 'Chennai', time: '1m 45s', ago: '1d ago', initials: 'F' },
  { company: 'Anonymous', city: 'Mumbai', time: '3m 02s', ago: '2d ago', initials: 'A' },
];

const cityData = [
  { city: 'Chennai', count: 487 },
  { city: 'Bangalore', count: 234 },
  { city: 'Mumbai', count: 156 },
  { city: 'Hyderabad', count: 98 },
  { city: 'Delhi', count: 67 },
];

const sourceData = [
  { name: 'Direct Link', value: 42, color: '#6C3CE1' },
  { name: 'LinkedIn', value: 28, color: '#60A5FA' },
  { name: 'WhatsApp', value: 18, color: '#6EE7B7' },
  { name: 'Google', value: 12, color: '#FBBF24' },
];

const actionList = [
  { date: 'Mar 15', action: 'Resume Downloaded', source: 'Direct', location: 'Chennai' },
  { date: 'Mar 15', action: 'Email Clicked', source: 'LinkedIn', location: 'Bangalore' },
  { date: 'Mar 14', action: 'Profile Copied', source: 'WhatsApp', location: 'Chennai' },
  { date: 'Mar 14', action: 'LinkedIn Clicked', source: 'Direct', location: 'Mumbai' },
];

const MetricCard = ({ title, value, detail, color, icon: Icon, blur }: any) => (
  <div className={`p-6 bg-[#111118] border border-[#1E1E2E] rounded-2xl relative overflow-hidden group transition-all ${blur ? 'cursor-default' : 'hover:border-[#6C3CE1]/30'}`}>
    <div className="flex justify-between items-start mb-4">
      <div className={`p-3 rounded-xl bg-opacity-10`} style={{ backgroundColor: `${color}1A`, color: color }}>
        <Icon size={20} />
      </div>
      {!blur && <span className="text-[10px] font-black text-[#6EE7B7] bg-[#6EE7B7]/10 px-2 py-1 rounded-full uppercase tracking-widest italic">{detail}</span>}
    </div>
    <p className="text-[10px] font-black text-[#64748B] uppercase tracking-[0.2em] mb-1 font-mono">{title}</p>
    <h3 className={`text-3xl font-black text-[#E2E8F0] font-syne italic ${blur ? 'blur-md select-none' : ''}`}>{value}</h3>
    
    {blur && (
      <div className="absolute inset-0 bg-[#0A0A0F]/40 backdrop-blur-[2px] flex items-center justify-center p-6 text-center">
        <div className="flex flex-col items-center gap-2">
          <Lock size={14} className="text-[#FBBF24]" />
          <p className="text-[9px] font-black uppercase text-[#FBBF24] tracking-widest leading-none">Upgrade to View</p>
        </div>
      </div>
    )}
  </div>
);

function AnalyticsContent() {
  const searchParams = useSearchParams();
  const [plan, setPlan] = useState<'Trial' | 'Pro' | 'Premium'>('Trial');

  useEffect(() => {
    // Load persisted plan
    const savedPlan = localStorage.getItem('userPlan');
    if (savedPlan === 'pro') setPlan('Pro');
    if (savedPlan === 'premium') setPlan('Premium');

    // Check for upgraded status from URL
    if (searchParams.get('upgraded') === 'true') {
      setPlan('Pro');
    }
    if (searchParams.get('tier') === 'premium') {
      setPlan('Premium');
    }
  }, [searchParams]);

  const handleUpgrade = () => {
    window.location.href = '/upgrade?feature=analytics';
  };

  return (
    <div className="min-h-screen bg-[#0A0A0F] text-[#E2E8F0] font-inter">
      {/* HEADER */}
      <nav className="h-20 border-b border-[#1E1E2E] bg-[#111118]/50 backdrop-blur-xl px-6 md:px-12 flex items-center justify-between sticky top-0 z-50">
        <div className="flex flex-col">
          <h1 className="text-xl font-black font-syne uppercase italic tracking-tighter">Profile Analytics</h1>
          <p className="text-[10px] font-bold text-[#64748B] uppercase tracking-widest italic font-mono italic">iamfolio.in/devaprakash · Last 30 days</p>
        </div>

        <div className="flex items-center gap-4">
          <div className="hidden sm:flex items-center gap-2 px-4 py-2 bg-[#1E1E2E] rounded-lg border border-[#1E1E2E] text-xs font-bold text-[#64748B] hover:border-[#6C3CE1]/40 transition-all cursor-pointer">
            <Calendar size={14} /> <span>30 Days</span> <ChevronDown size={14} />
          </div>
          <button className="hidden sm:flex items-center gap-2 px-6 py-2 bg-[#6C3CE1] text-white rounded-lg text-xs font-black uppercase tracking-widest hover:opacity-90 shadow-xl shadow-[#6C3CE1]/20 transition-all">
            <Share2 size={16} /> Share
          </button>
          <div className="w-10 h-10 rounded-full bg-gradient-to-tr from-[#6C3CE1] to-[#FF6B35] p-[2px]">
            <div className="w-full h-full rounded-full bg-[#111118] border-2 border-transparent flex items-center justify-center font-black italic text-[10px]">DP</div>
          </div>
        </div>
      </nav>

      <main className={`max-w-7xl mx-auto px-6 md:px-12 py-10 relative ${plan === 'Trial' ? 'overflow-hidden max-h-[calc(100vh-80px)]' : ''}`}>
        
        {/* FREE/TRIAL USER FULL BLUR OVERLAY */}
        {plan === 'Trial' && (
          <div className="absolute inset-0 z-[100] bg-[#0A0A0F]/60 backdrop-blur-md flex items-center justify-center p-6 mt-10">
            <motion.div 
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              className="max-w-md w-full p-10 bg-[#111118] border border-[#1E1E2E] rounded-[32px] text-center space-y-8 shadow-[0_0_100px_rgba(108,60,225,0.2)]"
            >
              <div className="w-20 h-20 bg-[#6C3CE1]/10 rounded-3xl flex items-center justify-center mx-auto text-[#6C3CE1]">
                <Lock size={40} />
              </div>
              <div className="space-y-4">
                <h2 className="text-3xl font-black font-syne uppercase italic tracking-tighter">Profile Analytics</h2>
                <p className="text-sm font-bold text-[#64748B] uppercase tracking-wide leading-relaxed">
                  See exactly who viewed your profile, which companies are interested, and get AI tips to boost visibility.
                </p>
              </div>
              <div className="flex flex-col gap-3">
                <button onClick={handleUpgrade} className="w-full py-5 bg-[#6EE7B7] text-[#0A0A0F] rounded-2xl font-black text-xs uppercase tracking-widest hover:scale-105 active:scale-95 transition-all shadow-xl shadow-[#6EE7B7]/20">
                  Start 7-Day Trial →
                </button>
                <button onClick={handleUpgrade} className="w-full py-5 bg-[#FF6B35] text-white rounded-2xl font-black text-xs uppercase tracking-widest hover:scale-105 active:scale-95 transition-all shadow-xl shadow-[#FF6B35]/20">
                  Upgrade to Premium ₹999/yr →
                </button>
              </div>
              <p className="text-[10px] font-bold text-[#64748B] uppercase tracking-widest italic font-mono opacity-60">Unlock your career identity potential</p>
            </motion.div>
          </div>
        )}

        {/* SECTION 1: METRIC CARDS */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 mb-10">
          <MetricCard title="Profile Views" value="1,284" detail="↑ +28% vs last month" color="#60A5FA" icon={Eye} />
          <MetricCard title="Resume Downloads" value="47" detail="↑ +12 this week" color="#FF6B35" icon={Download} />
          <MetricCard title="Avg Time on Profile" value="2m 34s" detail="Good indicator" color="#6EE7B7" icon={Clock} blur={plan === 'Trial'} />
          <MetricCard title="Unique Visitors" value="892" detail="↑ +156 this week" color="#6C3CE1" icon={Users} blur={plan !== 'Premium'} />
          
          {plan === 'Pro' && (
            <div className="lg:col-span-4 p-4 bg-[#FF6B35]/10 border border-[#FF6B35]/20 rounded-2xl flex flex-col md:flex-row items-center justify-between gap-4 mt-2 mb-6">
              <div className="flex items-center gap-3">
                <Lock size={16} className="text-[#FF6B35]" />
                <p className="text-sm font-black uppercase italic tracking-tighter">Upgrade to Premium to see who viewed your profile and detailed traffic analytics</p>
              </div>
              <button onClick={handleUpgrade} className="px-6 py-2.5 bg-[#FF6B35] text-white rounded-xl text-[10px] font-black uppercase tracking-widest hover:opacity-90 active:scale-95 transition-all">Upgrade to Premium →</button>
            </div>
          )}
        </div>

        {/* SECTION 2: VIEWS CHART */}
        <div className="p-8 bg-[#111118] border border-[#1E1E2E] rounded-[32px] mb-10">
          <div className="flex items-center justify-between mb-10">
             <div className="space-y-1">
                <h3 className="text-sm font-black uppercase tracking-widest italic font-mono text-[#64748B]">// VIEWS_VS_DOWNLOADS_30D</h3>
                <p className="text-xl font-black italic tracking-tighter font-syne">Peak usage detected: Thursday Mar 12</p>
             </div>
             <div className="flex gap-6">
                <div className="flex items-center gap-2"><div className="w-2 h-2 rounded-full bg-[#60A5FA]" /><span className="text-[10px] font-black uppercase text-[#64748B]">Views</span></div>
                <div className="flex items-center gap-2"><div className="w-2 h-2 rounded-full bg-[#FF6B35]" /><span className="text-[10px] font-black uppercase text-[#64748B]">Downloads</span></div>
             </div>
          </div>
          <div className="h-80 w-full relative">
            <ResponsiveContainer width="100%" height="100%">
              <LineChart data={viewData}>
                 <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#1E1E2E" />
                 <XAxis 
                   dataKey="date" 
                   axisLine={false} 
                   tickLine={false} 
                   tick={{ fill: '#64748B', fontSize: 10, fontWeight: 'bold' }} 
                 />
                 <YAxis 
                   axisLine={false} 
                   tickLine={false} 
                   tick={{ fill: '#64748B', fontSize: 10, fontWeight: 'bold' }}
                 />
                 <Tooltip 
                   contentStyle={{ backgroundColor: '#111118', border: '1px solid #1E1E2E', borderRadius: '12px' }}
                   itemStyle={{ fontSize: '12px', fontWeight: 'bold' }}
                 />
                 <Line type="monotone" dataKey="views" stroke="#60A5FA" strokeWidth={4} dot={{ r: 6, fill: '#60A5FA', strokeWidth: 4, stroke: '#111118' }} activeDot={{ r: 8 }} />
                 <Line type="monotone" dataKey="downloads" stroke="#FF6B35" strokeWidth={4} dot={{ r: 6, fill: '#FF6B35', strokeWidth: 4, stroke: '#111118' }} activeDot={{ r: 8 }} />
              </LineChart>
            </ResponsiveContainer>
            
            {/* ANNOTATION */}
            <div className="absolute top-0 right-1/2 translate-x-12 pointer-events-none">
               <div className="px-3 py-1 bg-[#6EE7B7] text-[#0A0A0F] text-[9px] font-black rounded-lg shadow-xl shadow-[#6EE7B7]/20 uppercase tracking-widest italic transform -rotate-12 translate-y-[-10px]">
                 Peak Day: 156 views
               </div>
            </div>
          </div>
        </div>

        {/* SECTION 3: THREE COLUMN ANALYTICS */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 mb-10">
          
          {/* WHO VIEWED YOUR PROFILE */}
          <div className="p-8 bg-[#111118] border border-[#1E1E2E] rounded-[32px] flex flex-col">
            <h3 className="text-xs font-black uppercase tracking-widest italic font-mono text-[#64748B] mb-8 underline decoration-[#60A5FA]/30 underline-offset-8">Recruiter Activity Feed</h3>
            <div className={`space-y-6 flex-1 ${plan !== 'Premium' ? 'blur-sm select-none pointer-events-none opacity-40' : ''}`}>
              {recruiterViews.map((rec, i) => (
                <div key={i} className="flex items-center justify-between group">
                  <div className="flex items-center gap-4">
                    <div className={`w-10 h-10 rounded-xl flex items-center justify-center font-black italic text-[#E2E8F0] border border-[#1E1E2E] transition-all ${rec.company === 'Anonymous' ? 'bg-[#1E1E2E]' : 'bg-[#6C3CE1] group-hover:shadow-[0_0_15px_rgba(108,60,225,0.4)]'}`}>
                      {rec.initials}
                    </div>
                    <div>
                      <p className="text-xs font-black uppercase tracking-tight text-[#E2E8F0]">{rec.company}</p>
                      <p className="text-[9px] font-bold text-[#64748B] uppercase tracking-tighter italic">{rec.city} · {rec.time} spent</p>
                    </div>
                  </div>
                  <span className="text-[10px] font-black font-mono text-[#64748B]">{rec.ago}</span>
                </div>
              ))}
            </div>
            {plan !== 'Premium' && (
              <div className="absolute inset-0 m-6 bg-[#0A0A0F]/20 backdrop-blur-[2px] flex items-center justify-center text-center p-8 z-10">
                 <div className="space-y-4">
                    <Lock className="w-8 h-8 text-[#FBBF24] mx-auto" />
                    <p className="text-xs font-black uppercase tracking-widest text-[#FBBF24]">Upgrade to Premium <br/> to see exact company names</p>
                    <button className="px-6 py-2 bg-[#6C3CE1] text-white rounded-lg text-[10px] font-black uppercase">Unlock Feed</button>
                 </div>
              </div>
            )}
          </div>

          {/* TOP VIEWER CITIES */}
          <div className="p-8 bg-[#111118] border border-[#1E1E2E] rounded-[32px]">
            <h3 className="text-xs font-black uppercase tracking-widest italic font-mono text-[#64748B] mb-8 underline decoration-[#6EE7B7]/30 underline-offset-8">Top Viewer Cities</h3>
            <div className="space-y-6">
              {cityData.map((item) => (
                <div key={item.city} className="space-y-2">
                  <div className="flex justify-between text-[10px] font-black uppercase tracking-widest">
                    <span className="text-[#64748B]">{item.city}</span>
                    <span className="text-[#E2E8F0]">{item.count}</span>
                  </div>
                  <div className="h-2 w-full bg-[#0A0A0F] rounded-full overflow-hidden border border-[#1E1E2E]">
                    <motion.div 
                      initial={{ width: 0 }}
                      whileInView={{ width: `${(item.count/487)*100}%` }}
                      viewport={{ once: true }}
                      transition={{ duration: 1, delay: 0.2 }}
                      className="h-full bg-[#6EE7B7] rounded-full"
                    />
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* TRAFFIC SOURCES */}
          <div className="p-8 bg-[#111118] border border-[#1E1E2E] rounded-[32px] flex flex-col">
            <h3 className="text-xs font-black uppercase tracking-widest italic font-mono text-[#64748B] mb-8 underline decoration-[#FF6B35]/30 underline-offset-8">Traffic Sources</h3>
            <div className="flex-1 flex flex-col justify-center">
               <div className="h-48 w-full mb-6">
                  <ResponsiveContainer width="100%" height="100%">
                    <PieChart>
                       <Pie 
                         data={sourceData} 
                         innerRadius={50} 
                         outerRadius={80} 
                         paddingAngle={8} 
                         dataKey="value"
                       >
                         {sourceData.map((entry, index) => (
                           <Cell key={`cell-${index}`} fill={entry.color} />
                         ))}
                       </Pie>
                       <Tooltip 
                         contentStyle={{ backgroundColor: '#111118', border: '1px solid #1E1E2E', borderRadius: '12px' }}
                         itemStyle={{ fontSize: '11px', fontWeight: 'black', textTransform: 'uppercase' }}
                       />
                    </PieChart>
                  </ResponsiveContainer>
               </div>
               <div className="grid grid-cols-2 gap-y-4 gap-x-6">
                  {sourceData.map((item) => (
                    <div key={item.name} className="flex items-center gap-2">
                      <div className="w-2 h-2 rounded-full" style={{ backgroundColor: item.color }} />
                      <span className="text-[10px] font-black uppercase tracking-widest text-[#64748B] truncate">{item.name}</span>
                      <span className="text-[10px] font-black ml-auto">{item.value}%</span>
                    </div>
                  ))}
               </div>
            </div>
          </div>
        </div>

        {/* SECTION 4: PROFILE ACTIONS */}
        <div className="bg-[#111118] border border-[#1E1E2E] rounded-[32px] overflow-hidden mb-10">
          <div className="p-8 border-b border-[#1E1E2E]">
            <h3 className="text-xl font-black font-syne uppercase italic tracking-tighter">Engagement Breakdown</h3>
            <p className="text-[10px] font-bold text-[#64748B] uppercase tracking-widest mt-1">What visitors did on your profile</p>
          </div>
          <div className="grid grid-cols-2 md:grid-cols-4 p-8 gap-10">
             {[
               { l: 'Resume Downloaded', v: 47, c: '#FF6B35' },
               { l: 'Profile Link Copied', v: 124, c: '#6C3CE1' },
               { l: 'Email Clicked', v: 23, c: '#FBBF24' },
               { l: 'LinkedIn Clicked', v: 89, c: '#60A5FA' },
             ].map((stat) => (
               <div key={stat.l} className="text-center md:text-left space-y-2">
                  <p className="text-[10px] font-black uppercase text-[#64748B] tracking-widest font-mono italic">{stat.l}</p>
                  <p className="text-4xl font-black italic font-syne" style={{ color: stat.c }}>{stat.v}</p>
               </div>
             ))}
          </div>
          <div className="overflow-x-auto border-t border-[#1E1E2E]">
             <table className="w-full text-left">
                <thead>
                   <tr className="bg-[#16161D] text-[10px] font-black text-[#64748B] uppercase tracking-widest font-mono italic">
                      <th className="px-8 py-5">Date</th>
                      <th className="px-8 py-5">Action Type</th>
                      <th className="px-8 py-5">Source</th>
                      <th className="px-8 py-5">Originating City</th>
                      <th className="px-8 py-5 text-right">Meta</th>
                   </tr>
                </thead>
                <tbody className="divide-y divide-[#1E1E2E]">
                   {actionList.map((a, i) => (
                      <tr key={i} className="hover:bg-white/5 transition-colors">
                         <td className="px-8 py-5 text-xs font-bold font-mono tracking-widest italic">{a.date}</td>
                         <td className="px-8 py-5">
                            <div className="flex items-center gap-3">
                               <div className="w-2 h-2 rounded-full bg-[#6EE7B7]" />
                               <span className="text-xs font-black uppercase tracking-tight">{a.action}</span>
                            </div>
                         </td>
                         <td className="px-8 py-5 text-xs font-bold text-[#64748B] uppercase italic">{a.source}</td>
                         <td className="px-8 py-5 text-xs font-bold text-[#64748B] uppercase italic">{a.location}</td>
                         <td className="px-8 py-5 text-right">
                            <span className="text-[9px] font-black text-[#6EE7B7]/60 uppercase tracking-widest italic">Verified</span>
                         </td>
                      </tr>
                   ))}
                </tbody>
             </table>
          </div>
        </div>

        {/* SECTION 5: IMPROVEMENT SUGGESTIONS */}
        <div className="space-y-8 mb-10">
           <div className="flex items-center gap-4">
              <h2 className="text-2xl font-black font-syne uppercase italic tracking-tighter">AI Profile Intelligence</h2>
              <div className="h-[1px] flex-1 bg-gradient-to-r from-[#6C3CE1] to-transparent opacity-20" />
           </div>
           
           <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              {/* TIP 1 */}
              <div className="p-8 bg-[#111118] border border-[#1E1E2E] rounded-[32px] flex flex-col justify-between hover:border-[#6C3CE1]/30 transition-all border-l-4 border-l-[#6C3CE1]">
                 <div className="space-y-4">
                    <div className="w-10 h-10 bg-[#6C3CE1]/10 rounded-xl flex items-center justify-center text-[#6C3CE1]">
                       <TrendingUp size={24} />
                    </div>
                    <p className="text-sm font-bold leading-relaxed text-[#E2E8F0] uppercase tracking-tight">
                       "Add <span className="text-[#6C3CE1]">2 projects</span> → profile views increase by est. <span className="text-[#6EE7B7]">34%</span> next month."
                    </p>
                 </div>
                 <button className="mt-8 flex items-center gap-2 text-[10px] font-black uppercase tracking-widest text-[#6C3CE1] hover:translate-x-1 transition-all">
                    Add Projects <ArrowRight size={14} />
                 </button>
              </div>

              {/* TIP 2 */}
              <div className="p-8 bg-[#111118] border border-[#1E1E2E] rounded-[32px] flex flex-col justify-between hover:border-[#FBBF24]/30 transition-all border-l-4 border-l-[#FBBF24]">
                 <div className="space-y-4">
                    <div className="w-10 h-10 bg-[#FBBF24]/10 rounded-xl flex items-center justify-center text-[#FBBF24]">
                       <Clock size={24} />
                    </div>
                    <p className="text-sm font-bold leading-relaxed text-[#E2E8F0] uppercase tracking-tight">
                       "Your profile is viewed most on <span className="text-[#FBBF24]">Thursdays</span>. Post your link on LinkedIn Thursday morning for <span className="text-[#6EE7B7]">2x more views</span>."
                    </p>
                 </div>
                 <button className="mt-8 flex items-center gap-2 text-[10px] font-black uppercase tracking-widest text-[#FBBF24] hover:translate-x-1 transition-all">
                    Schedule Link <ArrowRight size={14} />
                 </button>
              </div>

              {/* TIP 3 */}
              <div className="p-8 bg-[#111118] border border-[#1E1E2E] rounded-[32px] flex flex-col justify-between hover:border-[#FF6B35]/30 transition-all border-l-4 border-l-[#FF6B35]">
                 <div className="space-y-4">
                    <div className="w-10 h-10 bg-[#FF6B35]/10 rounded-xl flex items-center justify-center text-[#FF6B35]">
                       <Building2 size={24} />
                    </div>
                    <p className="text-sm font-bold leading-relaxed text-[#E2E8F0] uppercase tracking-tight">
                       "<span className="text-[#FF6B35]">3 TCS recruiters</span> viewed your profile. Your Python + ML skills match TCS openings. Apply now."
                    </p>
                 </div>
                 <button className="mt-8 flex items-center gap-2 text-[10px] font-black uppercase tracking-widest text-[#FF6B35] hover:translate-x-1 transition-all">
                    View Jobs <ArrowRight size={14} />
                 </button>
              </div>
           </div>
        </div>
      </main>
    </div>
  );
}

export default function UserAnalytics() {
  return (
    <Suspense fallback={
      <div className="min-h-screen bg-[#0A0A0F] flex items-center justify-center font-mono text-[#6C3CE1]">
        <div className="flex flex-col items-center gap-4">
          <div className="w-12 h-12 border-4 border-[#6C3CE1] border-t-transparent rounded-full animate-spin" />
          <p className="text-[10px] font-black uppercase tracking-[0.3em] animate-pulse">// LOADING_ANALYTICS_GRID</p>
        </div>
      </div>
    }>
      <AnalyticsContent />
    </Suspense>
  );
}
