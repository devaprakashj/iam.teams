"use client";
import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { 
  Users, 
  BarChart3, 
  PieChart, 
  CheckCircle2, 
  Search, 
  Filter, 
  ArrowUpRight, 
  Download,
  Share2,
  AlertCircle,
  Briefcase,
  GraduationCap,
  Building2,
  Clock,
  LayoutDashboard,
  Target,
  Bell
} from 'lucide-react';
import { 
  BarChart, 
  Bar, 
  XAxis, 
  YAxis, 
  CartesianGrid, 
  Tooltip, 
  ResponsiveContainer, 
  Cell,
  LineChart,
  Line
} from 'recharts';

// --- MOCK DATA ---
const deptPlacementData = [
  { dept: 'CSE', percentage: 89, color: '#6EE7B7' },
  { dept: 'IT', percentage: 84, color: '#6EE7B7' },
  { dept: 'ECE', percentage: 71, color: '#FBBF24' },
  { dept: 'Mech', percentage: 58, color: '#FF6B35' },
  { dept: 'Civil', percentage: 42, color: '#FF6B35' },
];

const topCompanies = [
  { name: 'TCS', hired: 142, package: '₹3.8L' },
  { name: 'Infosys', hired: 98, package: '₹3.6L' },
  { name: 'Wipro', hired: 76, package: '₹3.5L' },
  { name: 'Zoho', hired: 54, package: '₹6.2L' },
  { name: 'Freshworks', hired: 31, package: '₹8.4L' },
];

const studentsList = [
  { id: 1, name: 'Rahul Sharma', dept: 'CSE', score: 92, complete: '95%', status: 'Placed', company: 'Zoho' },
  { id: 2, name: 'Sanjana Reddy', dept: 'IT', score: 88, complete: '90%', status: 'Interviewing', company: 'TCS' },
  { id: 3, name: 'Vikram Singh', dept: 'ECE', score: 62, complete: '60%', status: 'Needs Help', company: '-' },
  { id: 4, name: 'Meera J.', dept: 'CSE', score: 84, complete: '85%', status: 'Active', company: '-' },
  { id: 5, name: 'Arun K.', dept: 'Mech', score: 58, complete: '45%', status: 'Needs Help', company: '-' },
];

const scoreDistribution = [
  { range: '90-100', count: 234 },
  { range: '80-89', count: 412 },
  { range: '70-79', count: 321 },
  { range: '60-69', count: 189 },
  { range: 'Below 60', count: 84 },
];

const placementTimeline = [
  { month: 'Oct', count: 45 },
  { month: 'Nov', count: 120 },
  { month: 'Dec', count: 80 },
  { month: 'Jan', count: 230 },
  { month: 'Feb', count: 180 },
  { month: 'Mar', count: 221 },
];

const skillsGap = [
  { skill: 'Docker', missing: '78%' },
  { skill: 'TensorFlow', missing: '65%' },
  { skill: 'AWS', missing: '61%' },
  { skill: 'System Design', missing: '54%' },
];

const MetricCard = ({ title, value, detail, color, icon: Icon }: any) => (
  <div className="p-6 bg-[#111118] border border-[#1E1E2E] rounded-2xl hover:border-[#6C3CE1]/30 transition-all group">
    <div className="flex justify-between items-start mb-4 text-black">
      <div className={`p-3 rounded-xl bg-opacity-10`} style={{ backgroundColor: `${color}1A`, color: color }}>
        <Icon size={20} />
      </div>
      <span className="text-[10px] font-black text-[#6EE7B7] bg-[#6EE7B7]/10 px-2 py-1 rounded-full uppercase tracking-widest italic tracking-tighter tracking-widest">{detail}</span>
    </div>
    <p className="text-[10px] font-black text-[#64748B] uppercase tracking-[0.2em] mb-1 font-mono">{title}</p>
    <h3 className="text-3xl font-black text-[#E2E8F0] font-syne italic">{value}</h3>
  </div>
);

export default function CollegeDashboard() {
  const [activeFilter, setActiveFilter] = useState('All');

  return (
    <div className="min-h-screen bg-[#0A0A0F] text-[#E2E8F0] font-inter">
      {/* NAVIGATION (Horizontal for College as simplified layout) */}
      <nav className="h-20 border-b border-[#1E1E2E] bg-[#111118]/50 backdrop-blur-xl px-6 md:px-12 flex items-center justify-between sticky top-0 z-50">
        <div className="flex items-center gap-4">
          <div className="w-9 h-9 bg-[#6C3CE1] rounded-lg flex items-center justify-center font-black italic text-white text-lg">IF</div>
          <div className="hidden sm:block">
            <h2 className="text-sm font-black uppercase italic tracking-tighter">Placement Hub</h2>
            <p className="text-[10px] font-bold text-[#64748B] uppercase tracking-widest italic opacity-60 font-mono italic">Institutional Command</p>
          </div>
        </div>

        <div className="hidden md:flex items-center gap-8">
          {['Dashboard', 'Students', 'Analytics', 'NAAC Reports'].map((item) => (
            <button key={item} className={`text-[11px] font-black uppercase tracking-[0.2em] transition-all hover:text-[#6C3CE1] ${item === 'Dashboard' ? 'text-[#6C3CE1]' : 'text-[#64748B]'}`}>
              {item}
            </button>
          ))}
        </div>

        <div className="flex items-center gap-4">
          <button className="p-2 border border-[#1E1E2E] rounded-full text-[#64748B] hover:text-[#E2E8F0] transition-colors"><Bell size={18} /></button>
          <div className="flex items-center gap-3 pl-4 border-l border-[#1E1E2E]">
            <div className="text-right hidden sm:block">
              <p className="text-[11px] font-black uppercase">Admin RIT</p>
              <p className="text-[9px] font-bold text-[#64748B] uppercase tracking-tighter">Placement Officer</p>
            </div>
            <div className="w-10 h-10 rounded-full bg-[#111118] border border-[#1E1E2E] flex items-center justify-center font-black italic text-[#6C3CE1] shadow-lg">RIT</div>
          </div>
        </div>
      </nav>

      <main className="max-w-7xl mx-auto px-6 md:px-12 py-10">
        {/* HEADER */}
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 mb-12">
          <div className="space-y-2">
            <div className="flex items-center gap-3">
              <span className="text-[10px] font-black text-[#6C3CE1] uppercase tracking-[0.3em] font-mono italic">// BATCH_2025_COMMAND</span>
              <div className="w-1.5 h-1.5 rounded-full bg-[#6EE7B7] animate-pulse" />
            </div>
            <h1 className="text-3xl md:text-5xl font-black font-syne uppercase italic tracking-tighter tracking-tighter">
              Rajalakshmi Institute of Technology
            </h1>
            <p className="text-sm md:text-base font-bold text-[#64748B] uppercase tracking-wide italic">Placement & Career Development Center</p>
          </div>
          <div className="flex gap-3">
            <button className="flex items-center gap-2 px-6 py-3 bg-[#111118] border border-[#1E1E2E] rounded-xl text-xs font-black uppercase tracking-widest hover:border-[#6C3CE1]/40 transition-all text-[#E2E8F0]">
              <Download size={16} /> Export
            </button>
            <button className="flex items-center gap-2 px-6 py-3 bg-[#6C3CE1] text-white rounded-xl text-xs font-black uppercase tracking-widest hover:opacity-90 shadow-xl shadow-[#6C3CE1]/20 transition-all active:scale-95">
              <Share2 size={16} /> Share
            </button>
          </div>
        </div>

        {/* SECTION 1: METRIC CARDS */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 mb-10">
          <MetricCard title="Total Students" value="1,240" detail="Batch of 2025" color="#6C3CE1" icon={Users} />
          <MetricCard title="Profiles Created" value="1,198" detail="96.6% Adoption" color="#6EE7B7" icon={CheckCircle2} />
          <MetricCard title="Placed Students" value="876" detail="70.6% Rate" color="#FF6B35" icon={Briefcase} />
          <MetricCard title="Avg ATS Score" value="82/100" detail="↑ +4 vs last batch" color="#60A5FA" icon={Target} />
        </div>

        {/* SECTION 2: PLACEMENT & COMPANIES */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 mb-10">
          {/* PLACEMENT BY DEPT */}
          <div className="p-8 bg-[#111118] border border-[#1E1E2E] rounded-[32px]">
            <h3 className="text-sm font-black uppercase tracking-widest italic font-mono text-[#64748B] mb-8">// PLACEMENT_BY_DEPT</h3>
            <div className="space-y-8">
              {deptPlacementData.map((item) => (
                <div key={item.dept} className="space-y-3">
                  <div className="flex justify-between items-end">
                    <span className="text-xs font-black text-[#E2E8F0]">{item.dept}</span>
                    <span className="text-xs font-black font-mono" style={{ color: item.color }}>{item.percentage}%</span>
                  </div>
                  <div className="h-3 w-full bg-[#0A0A0F] rounded-full overflow-hidden border border-[#1E1E2E]">
                    <motion.div 
                      initial={{ width: 0 }}
                      whileInView={{ width: `${item.percentage}%` }}
                      viewport={{ once: true }}
                      transition={{ duration: 1.2, ease: "easeOut" }}
                      className="h-full rounded-full"
                      style={{ backgroundColor: item.color }}
                    />
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* TOP COMPANIES */}
          <div className="p-8 bg-[#111118] border border-[#1E1E2E] rounded-[32px] overflow-hidden">
            <h3 className="text-sm font-black uppercase tracking-widest italic font-mono text-[#64748B] mb-8">// TOP_HIRING_COMPANIES</h3>
            <table className="w-full text-left">
              <thead>
                <tr className="text-[10px] font-black text-[#64748B] uppercase tracking-widest border-b border-[#1E1E2E]">
                  <th className="pb-4">Company</th>
                  <th className="pb-4">Hired</th>
                  <th className="pb-4">Avg Package</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-[#1E1E2E]">
                {topCompanies.map((company, i) => (
                  <tr key={i} className="group hover:bg-white/5 transition-colors">
                    <td className="py-4">
                      <div className="flex items-center gap-3">
                        <div className="w-8 h-8 rounded-lg bg-[#1E1E2E] border border-[#1E1E2E] flex items-center justify-center font-black text-xs group-hover:border-[#6EE7B7]/40 transition-all text-[#6EE7B7] italic">
                          {company.name[0]}
                        </div>
                        <span className="text-sm font-bold">{company.name}</span>
                      </div>
                    </td>
                    <td className="py-4 font-black font-mono text-sm">{company.hired}</td>
                    <td className="py-4 font-black font-mono text-sm text-[#FF6B35]">{company.package}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>

        {/* SECTION 3: STUDENT TABLE */}
        <div className="bg-[#111118] border border-[#1E1E2E] rounded-[32px] overflow-hidden mb-10">
          <div className="p-8 border-b border-[#1E1E2E] flex flex-col xl:flex-row xl:items-center justify-between gap-6">
            <div className="space-y-4">
              <h3 className="text-xl font-black uppercase italic font-syne tracking-tighter">Student Ledger</h3>
              <div className="flex flex-wrap gap-2">
                {['All', 'Placed', 'Interviewing', 'Active', 'Needs Help'].map(f => (
                  <button 
                    key={f} 
                    onClick={() => setActiveFilter(f)}
                    className={`px-4 py-1.5 text-[9px] font-black uppercase tracking-[0.2em] rounded-full border transition-all ${activeFilter === f ? 'bg-[#6C3CE1] border-[#6C3CE1] text-white shadow-lg shadow-[#6C3CE1]/20' : 'bg-transparent border-[#1E1E2E] text-[#64748B] hover:border-[#6C3CE1]/40'}`}
                  >
                    {f}
                  </button>
                ))}
              </div>
            </div>
            <div className="relative">
              <Search className="absolute left-5 top-1/2 -translate-y-1/2 text-[#64748B] w-4 h-4" />
              <input 
                type="text" 
                placeholder="SEARCH_BY_STUDENT_NAME_OR_ID" 
                className="bg-[#0A0A0F] border border-[#1E1E2E] rounded-full pl-14 pr-8 py-3.5 text-xs font-bold uppercase tracking-widest outline-none focus:border-[#6C3CE1]/50 transition-all w-full xl:w-96 font-mono italic"
              />
            </div>
          </div>
          <div className="overflow-x-auto">
            <table className="w-full text-left min-w-[1000px]">
              <thead>
                <tr className="bg-[#16161D] text-[10px] font-black text-[#64748B] uppercase tracking-widest font-mono">
                  <th className="px-8 py-5">Student</th>
                  <th className="px-8 py-5">Department</th>
                  <th className="px-8 py-5">ATS Score</th>
                  <th className="px-8 py-5">Profile</th>
                  <th className="px-8 py-5">Status</th>
                  <th className="px-8 py-5">Company</th>
                  <th className="px-8 py-5 text-right">Action</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-[#1E1E2E]">
                {studentsList.map((student) => (
                  <tr key={student.id} className={`hover:bg-white/5 transition-colors group ${student.status === 'Needs Help' ? 'border-l-4 border-[#FF6B35]' : 'border-l-4 border-transparent'}`}>
                    <td className="px-8 py-5">
                      <div className="flex items-center gap-4">
                        <div className="w-10 h-10 rounded-full bg-[#1E1E2E] flex items-center justify-center font-black italic text-[#6C3CE1] border border-[#1E1E2E] group-hover:border-[#6C3CE1]/40 transition-all">
                          {student.name[0]}
                        </div>
                        <div>
                          <p className="text-sm font-black uppercase tracking-tight">{student.name}</p>
                          <p className="text-[10px] font-bold text-[#64748B] uppercase">ID: 2025_CSE_{student.id}</p>
                        </div>
                      </div>
                    </td>
                    <td className="px-8 py-5 text-xs font-black uppercase tracking-widest text-[#64748B] font-mono">{student.dept}</td>
                    <td className="px-8 py-5">
                      <div className="flex items-center gap-2">
                        <span className={`text-sm font-black italic font-mono ${student.score > 80 ? 'text-[#6EE7B7]' : student.score > 65 ? 'text-[#60A5FA]' : 'text-[#FF6B35]'}`}>{student.score}</span>
                        {student.score < 65 && <AlertCircle size={12} className="text-[#FF6B35]" />}
                      </div>
                    </td>
                    <td className="px-8 py-5">
                      <div className="flex items-center gap-2">
                        <div className="w-20 h-1.5 bg-[#1E1E2E] rounded-full overflow-hidden">
                          <div className="h-full bg-[#6C3CE1] rounded-full" style={{ width: student.complete }} />
                        </div>
                        <span className="text-[10px] font-black text-[#64748B] font-mono">{student.complete}</span>
                      </div>
                    </td>
                    <td className="px-8 py-5">
                      <span className={`px-3 py-1 rounded-full text-[9px] font-black uppercase tracking-widest ${
                        student.status === 'Placed' ? 'bg-[#6EE7B7]/10 text-[#6EE7B7]' : 
                        student.status === 'Interviewing' ? 'bg-[#60A5FA]/10 text-[#60A5FA]' :
                        student.status === 'Active' ? 'bg-[#FBBF24]/10 text-[#FBBF24]' : 'bg-[#FF6B35]/10 text-[#FF6B35]'
                      }`}>
                        {student.status}
                      </span>
                    </td>
                    <td className="px-8 py-5 text-xs font-black uppercase text-[#64748B] font-mono">{student.company}</td>
                    <td className="px-8 py-5 text-right">
                      <div className="flex items-center justify-end gap-2">
                        <button className="px-4 py-2 bg-[#1E1E2E] hover:bg-[#6C3CE1] text-[#E2E8F0] rounded-lg text-[10px] font-black uppercase tracking-widest transition-all">View</button>
                        <button className="p-2 border border-[#1E1E2E] hover:border-[#FF6B35]/30 text-[#64748B] hover:text-[#FF6B35] rounded-lg transition-all"><Target size={14} /></button>
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>

        {/* SECTION 4: BATCH ANALYTICS */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-10">
          {/* PROFILE SCORE DISTRIBUTION */}
          <div className="p-8 bg-[#111118] border border-[#1E1E2E] rounded-[32px]">
            <h3 className="text-xs font-black uppercase tracking-widest italic font-mono text-[#64748B] mb-8 underline decoration-[#6C3CE1]/30 underline-offset-4">Score Distribution</h3>
            <div className="space-y-6">
              {scoreDistribution.map((item) => (
                <div key={item.range} className="space-y-2">
                  <div className="flex justify-between text-[10px] font-black uppercase italic tracking-widest">
                    <span className="text-[#64748B]">{item.range}</span>
                    <span className="text-[#E2E8F0]">{item.count} students</span>
                  </div>
                  <div className="h-1.5 w-full bg-[#0A0A0F] rounded-full overflow-hidden">
                    <motion.div 
                      initial={{ width: 0 }}
                      whileInView={{ width: `${(item.count/412)*100}%` }}
                      viewport={{ once: true }}
                      className="h-full bg-[#6C3CE1] rounded-full"
                    />
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* SKILLS GAP */}
          <div className="p-8 bg-[#111118] border border-[#1E1E2E] rounded-[32px]">
             <h3 className="text-xs font-black uppercase tracking-widest italic font-mono text-[#64748B] mb-8 underline decoration-[#FF6B35]/30 underline-offset-4">Skills Gap Report</h3>
             <div className="space-y-5">
                {skillsGap.map((item) => (
                  <div key={item.skill} className="flex items-center justify-between p-4 bg-[#0A0A0F] border border-[#1E1E2E] rounded-xl group hover:border-[#FF6B35]/40 transition-colors">
                    <span className="text-xs font-black uppercase italic tracking-widest">{item.skill}</span>
                    <div className="flex items-center gap-2">
                      <span className="text-xs font-black text-[#FF6B35] italic font-mono">{item.missing}</span>
                      <span className="text-[10px] font-bold text-[#64748B] uppercase tracking-tighter">Missing</span>
                    </div>
                  </div>
                ))}
             </div>
          </div>

          {/* PLACEMENT TIMELINE */}
          <div className="p-8 bg-[#111118] border border-[#1E1E2E] rounded-[32px]">
            <h3 className="text-xs font-black uppercase tracking-widest italic font-mono text-[#64748B] mb-8 underline decoration-[#6EE7B7]/30 underline-offset-4">Placement Timeline</h3>
            <div className="h-64">
              <ResponsiveContainer width="100%" height="100%">
                <LineChart data={placementTimeline}>
                  <XAxis dataKey="month" axisLine={false} tickLine={false} tick={{ fill: '#64748B', fontSize: 10, fontWeight: 'black' }} />
                  <Tooltip contentStyle={{ backgroundColor: '#111118', border: '1px solid #1E1E2E', borderRadius: '12px' }} />
                  <Line type="stepAfter" dataKey="count" stroke="#6EE7B7" strokeWidth={3} dot={{ r: 4, fill: '#6EE7B7' }} />
                </LineChart>
              </ResponsiveContainer>
            </div>
          </div>
        </div>

        {/* SECTION 5: NAAC REPORT */}
        <div className="p-10 bg-[#6C3CE1] rounded-[32px] overflow-hidden relative group">
           <div className="absolute top-0 right-0 w-96 h-96 bg-white/10 rounded-full blur-[100px] -translate-y-1/2 translate-x-1/2 group-hover:scale-110 transition-transform duration-700" />
           <div className="relative z-10 flex flex-col md:flex-row items-center justify-between gap-10">
              <div className="space-y-6 text-center md:text-left">
                 <div className="flex items-center justify-center md:justify-start gap-4">
                    <div className="w-12 h-12 bg-white rounded-2xl flex items-center justify-center font-black italic text-[#6C3CE1] text-2xl">IF</div>
                    <h2 className="text-2xl md:text-4xl font-black font-syne uppercase italic tracking-tighter text-white">Generate NAAC Report</h2>
                 </div>
                 <div className="grid grid-cols-2 lg:grid-cols-4 gap-8">
                    {[
                      { l: 'Total', v: '1,240' },
                      { l: 'Placed', v: '70.6%' },
                      { l: 'Avg Package', v: '₹4.8L' },
                      { l: 'Companies', v: '47' }
                    ].map(stat => (
                      <div key={stat.l}>
                        <p className="text-[10px] font-black uppercase text-white/60 tracking-widest mb-1 font-mono">{stat.l}</p>
                        <p className="text-xl font-black text-white italic">{stat.v}</p>
                      </div>
                    ))}
                 </div>
              </div>
              <div className="flex flex-col gap-3 w-full md:w-auto">
                 <button className="px-10 py-5 bg-white text-[#6C3CE1] rounded-2xl font-black text-xs uppercase tracking-widest hover:scale-105 active:scale-95 transition-all shadow-xl shadow-black/20 flex items-center justify-center gap-2">
                   <Download size={18} /> Download PDF Report
                 </button>
                 <button className="px-10 py-5 bg-[#0A0A0F] text-white rounded-2xl font-black text-xs uppercase tracking-widest hover:scale-105 active:scale-95 transition-all shadow-xl shadow-black/20 flex items-center justify-center gap-2">
                   <LayoutDashboard size={18} /> Download Excel
                 </button>
              </div>
           </div>
        </div>
      </main>
    </div>
  );
}
