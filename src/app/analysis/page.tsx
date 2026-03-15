"use client";
import React from 'react';
import { motion } from 'framer-motion';
import { LineChart, BarChart2, PieChart, TrendingUp, Target, Award, Zap, AlertCircle, CheckCircle2, Star } from 'lucide-react';
import Navbar from '@/components/layout/Navbar';

export default function SkillAnalysis() {
  return (
    <div className="min-h-screen bg-[#F9FAFB] font-inter">
      <Navbar />

      <main className="pb-24">
        <div className="bg-white border-b border-gray-100 px-6 py-12 lg:px-12">
          <div className="max-w-[1400px] mx-auto">
            <h1 className="text-4xl font-black text-dark tracking-tighter">Skill Analysis</h1>
            <p className="text-gray-400 font-bold mt-2 uppercase tracking-widest text-xs">Deep insights into your professional competitive edge</p>
          </div>
        </div>

        <div className="p-6 lg:p-12 max-w-[1400px] mx-auto w-full">
          <div className="grid grid-cols-1 xl:grid-cols-4 gap-8">
            {/* Left: Overall Score Card */}
            <div className="xl:col-span-1 space-y-8">
               <div className="bg-white p-8 rounded-[40px] border border-gray-100 shadow-sm text-center">
                  <h3 className="text-[10px] font-black text-gray-400 uppercase tracking-widest mb-8">Overall Strength</h3>
                  <div className="relative w-48 h-48 mx-auto mb-8 flex items-center justify-center">
                     <svg className="w-full h-full transform -rotate-90">
                        <circle cx="96" cy="96" r="88" stroke="currentColor" strokeWidth="12" fill="transparent" className="text-gray-50" />
                        <motion.circle 
                          cx="96" cy="96" r="88" stroke="currentColor" strokeWidth="12" fill="transparent" 
                          strokeDasharray={552.92}
                          initial={{ strokeDashoffset: 552.92 }}
                          animate={{ strokeDashoffset: 552.92 * (1 - 0.82) }}
                          transition={{ duration: 1.5, ease: "easeOut" }}
                          className="text-[#6C3CE1]" 
                        />
                     </svg>
                     <div className="absolute inset-0 flex flex-col items-center justify-center">
                        <span className="text-5xl font-black text-dark">82</span>
                        <span className="text-[10px] font-black text-gray-400 uppercase">Percentile</span>
                     </div>
                  </div>
                  <p className="text-xs font-bold text-gray-400 leading-relaxed">You are stronger than 82% of candidates in the <strong>UI/UX Design</strong> category.</p>
               </div>

               <div className="bg-dark p-8 rounded-[40px] text-white">
                  <h3 className="text-xs font-black text-white/40 uppercase tracking-widest mb-6">Market Trends</h3>
                  <div className="space-y-6">
                     <TrendItem label="Design Systems" value="+24%" up />
                     <TrendItem label="Figma Plugins" value="+18%" up />
                     <TrendItem label="Traditional UX" value="-4%" />
                  </div>
               </div>
            </div>

            {/* Middle/Right: Detailed Analysis */}
            <div className="xl:col-span-3 space-y-8">
               <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                  <AnalysisBlock title="Skill Distribution" icon={Zap}>
                     <div className="space-y-5 mt-8">
                        <SkillBar label="Visual Design" value={95} color="bg-[#6C3CE1]" />
                        <SkillBar label="User Research" value={78} color="bg-[#6C3CE1]" />
                        <SkillBar label="Interaction Design" value={64} color="bg-[#6C3CE1]" />
                        <SkillBar label="Frontend (HTML/CSS)" value={42} color="bg-[#6C3CE1]" />
                     </div>
                  </AnalysisBlock>

                  <AnalysisBlock title="Gap Analysis" icon={Target}>
                     <div className="space-y-3 mt-8">
                        <GapItem type="warning" title="Motion Design" text="80% of top roles require Principle or Framer knowledge." />
                        <GapItem type="warning" title="Web Accessibility" text="Legal compliance is a growing requirement in US-based roles." />
                        <GapItem type="success" title="Figma Mastery" text="Your portfolio shows advanced auto-layout usage. Key asset!" />
                     </div>
                  </AnalysisBlock>
               </div>

               <div className="bg-white p-10 rounded-[40px] border border-gray-100 shadow-sm">
                  <div className="flex flex-col md:flex-row md:items-center justify-between gap-6 mb-10">
                     <div className="flex items-center gap-4">
                        <div className="p-3 bg-yellow-50 text-yellow-500 rounded-2xl">
                           <Award size={24} />
                        </div>
                        <div>
                           <h3 className="text-xl font-black text-dark tracking-tight">Certification Roadmap</h3>
                           <p className="text-xs font-bold text-gray-400 uppercase tracking-widest mt-1">Recommended for your next career jump</p>
                        </div>
                     </div>
                     <button className="px-8 py-3 bg-[#6C3CE1] text-white rounded-xl font-black text-[10px] uppercase tracking-widest hover:opacity-90 shadow-xl shadow-[#6C3CE1]/20 transition-all">Enroll via Partner</button>
                  </div>
                  
                  <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                     <CertCard title="Google UX Design" provider="Coursera" time="3-6 Months" />
                     <CertCard title="Certified Web Accessibility" provider="IAAP" time="2 Months" />
                     <CertCard title="Senior Design Leadership" provider="Interaction Design Foundation" time="6 Months" />
                  </div>
               </div>
            </div>
          </div>
        </div>
      </main>
    </div>
  );
}

function TrendItem({ label, value, up }: any) {
  return (
    <div className="flex items-center justify-between">
       <span className="text-xs font-bold text-white/70">{label}</span>
       <span className={`text-xs font-black ${up ? 'text-emerald-400' : 'text-rose-400'}`}>{value}</span>
    </div>
  );
}

function AnalysisBlock({ title, icon: Icon, children }: any) {
  return (
    <div className="bg-white p-8 rounded-[40px] border border-gray-100 shadow-sm min-h-[400px]">
       <div className="flex items-center gap-3">
          <Icon className="w-5 h-5 text-[#6C3CE1]" />
          <h3 className="text-xs font-black text-gray-400 uppercase tracking-widest">{title}</h3>
       </div>
       {children}
    </div>
  );
}

function SkillBar({ label, value, color }: any) {
  return (
    <div className="space-y-1.5">
       <div className="flex justify-between items-baseline">
          <span className="text-xs font-black text-dark uppercase tracking-tight">{label}</span>
          <span className="text-[10px] font-bold text-gray-400">{value}%</span>
       </div>
       <div className="w-full h-2 bg-gray-50 rounded-full overflow-hidden">
          <motion.div 
            initial={{ width: 0 }}
            animate={{ width: `${value}%` }}
            className={`h-full ${color} rounded-full`}
          />
       </div>
    </div>
  );
}

function GapItem({ type, title, text }: any) {
  const isWarning = type === 'warning';
  return (
    <div className={`p-4 rounded-3xl border ${isWarning ? 'bg-orange-50/50 border-orange-100' : 'bg-emerald-50/50 border-emerald-100'}`}>
       <div className="flex items-center gap-2 mb-2">
          {isWarning ? <AlertCircle className="w-4 h-4 text-orange-500" /> : <CheckCircle2 className="w-4 h-4 text-emerald-500" />}
          <span className={`text-[10px] font-black uppercase tracking-widest ${isWarning ? 'text-orange-500' : 'text-emerald-500'}`}>{title}</span>
       </div>
       <p className="text-[11px] font-bold text-gray-500 leading-relaxed">{text}</p>
    </div>
  );
}

function CertCard({ title, provider, time }: any) {
  return (
    <div className="p-6 bg-gray-50/50 border border-gray-100 rounded-[32px] group hover:bg-white hover:shadow-xl hover:border-transparent transition-all cursor-pointer">
       <h4 className="text-sm font-black text-dark uppercase mb-1 group-hover:text-[#6C3CE1] transition-colors">{title}</h4>
       <p className="text-[10px] font-bold text-gray-400 uppercase tracking-widest">{provider}</p>
       <div className="mt-8 flex items-center justify-between">
          <span className="text-[10px] font-black text-gray-300 uppercase">{time}</span>
          <div className="w-8 h-8 rounded-full bg-white shadow-sm flex items-center justify-center group-hover:bg-[#6C3CE1] group-hover:text-white transition-colors">
             <Star className="w-4 h-4" />
          </div>
       </div>
    </div>
  );
}
