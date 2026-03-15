"use client";
import React from 'react';
import { motion } from 'framer-motion';
import { Mic2, Play, Calendar, History, Star, TrendingUp, Sparkles } from 'lucide-react';
import Navbar from '@/components/layout/Navbar';

export default function MockInterviews() {
  return (
    <div className="min-h-screen bg-[#F9FAFB] font-inter">
      <Navbar />

      <main className="pb-24">
        <div className="bg-white border-b border-gray-100 px-6 py-12 lg:px-12">
          <div className="max-w-[1400px] mx-auto">
            <div className="flex flex-col md:flex-row md:items-center justify-between gap-6">
              <div>
                <h1 className="text-4xl font-black text-dark tracking-tighter">AI Mock Interviews</h1>
                <p className="text-gray-400 font-bold mt-2 uppercase tracking-widest text-xs flex items-center gap-2">
                  <Sparkles className="w-3.5 h-3.5 text-[#6C3CE1]" />
                  Practice with our advanced AI Intervewer
                </p>
              </div>
              <button className="flex items-center gap-2 px-8 py-4 bg-[#6C3CE1] text-white rounded-2xl font-black text-sm hover:opacity-90 shadow-xl shadow-[#6C3CE1]/20 transition-all active:scale-95 uppercase tracking-widest">
                <Play className="w-4 h-4" />
                Start New Session
              </button>
            </div>
          </div>
        </div>

        <div className="p-6 lg:p-12 max-w-[1400px] mx-auto w-full">
          <div className="grid grid-cols-1 xl:grid-cols-3 gap-8">
            {/* Main Content Area */}
            <div className="xl:col-span-2 space-y-8">
              <section>
                <h3 className="text-xs font-black text-gray-400 uppercase tracking-[0.2em] mb-6">Available Roles</h3>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <RoleCard 
                    title="UI/UX Designer" 
                    description="Focus on design systems, user empathy, and Figma proficiency."
                    difficulty="Intermediate"
                    sessions="124 practiced"
                  />
                  <RoleCard 
                    title="Frontend Developer" 
                    description="Test your React, Next.js, and CSS expertise."
                    difficulty="Advanced"
                    sessions="89 practiced"
                  />
                  <RoleCard 
                    title="Product Manager" 
                    description="Strategy, roadmap, and stakeholder communication focus."
                    difficulty="Intermediate"
                    sessions="56 practiced"
                  />
                  <RoleCard 
                    title="HR / General" 
                    description="Soft skills, behavioral questions, and culture fit."
                    difficulty="Beginner"
                    sessions="210 practiced"
                  />
                </div>
              </section>

              <section>
                <div className="flex items-center justify-between mb-6">
                  <h3 className="text-xs font-black text-gray-400 uppercase tracking-[0.2em]">Recent Sessions</h3>
                  <button className="text-xs font-black text-[#6C3CE1] uppercase tracking-widest hover:underline">View All History</button>
                </div>
                <div className="bg-white rounded-[32px] border border-gray-100 overflow-hidden shadow-sm">
                   <div className="overflow-x-auto">
                      <table className="w-full text-left">
                         <thead className="bg-gray-50/50">
                            <tr>
                               <th className="px-6 py-4 text-[10px] font-black text-gray-400 uppercase tracking-widest">Date</th>
                               <th className="px-6 py-4 text-[10px] font-black text-gray-400 uppercase tracking-widest">Role</th>
                               <th className="px-6 py-4 text-[10px] font-black text-gray-400 uppercase tracking-widest">Score</th>
                               <th className="px-6 py-4 text-[10px] font-black text-gray-400 uppercase tracking-widest">Status</th>
                            </tr>
                         </thead>
                         <tbody className="divide-y divide-gray-50">
                            <HistoryRow date="Oct 12, 2023" role="UI/UX Designer" score="82/100" status="Completed" />
                            <HistoryRow date="Oct 08, 2023" role="Frontend Dev" score="74/100" status="Needs Review" />
                            <HistoryRow date="Oct 01, 2023" role="Behavioral" score="91/100" status="Completed" />
                         </tbody>
                      </table>
                   </div>
                </div>
              </section>
            </div>

            {/* Support Area */}
            <div className="space-y-8">
              <div className="bg-[#6C3CE1] p-8 rounded-[40px] text-white shadow-2xl shadow-[#6C3CE1]/20 relative overflow-hidden group">
                <div className="absolute top-0 right-0 p-8 opacity-10 group-hover:scale-110 transition-transform">
                  <TrendingUp size={120} />
                </div>
                <h3 className="text-2xl font-black tracking-tight mb-2">Performance Analytics</h3>
                <p className="text-white/70 text-sm font-medium mb-8">Detailed feedback on your tone, pace, and content relevance.</p>
                <div className="space-y-4">
                  <Metric label="Tone" value={88} />
                  <Metric label="Clarity" value={72} />
                  <Metric label="Relevance" value={91} />
                </div>
                <button className="w-full mt-8 py-4 bg-white text-[#6C3CE1] rounded-2xl font-black text-xs uppercase tracking-widest hover:scale-[1.02] transition-all">
                  Analyze My Progress
                </button>
              </div>

              <div className="bg-white p-8 rounded-[40px] border border-gray-100 shadow-sm">
                <h3 className="text-xl font-black text-dark tracking-tight mb-6">Upcoming Schedule</h3>
                <div className="space-y-4">
                  <ScheduleItem time="Tomorrow, 10:00 AM" label="Final HR Round Practice" />
                  <ScheduleItem time="Friday, 3:00 PM" label="System Design Review" />
                </div>
                <button className="w-full mt-6 py-4 border-2 border-gray-100 text-gray-400 rounded-2xl font-black text-xs uppercase tracking-widest hover:border-[#6C3CE1] hover:text-[#6C3CE1] transition-all">
                   <Calendar className="w-4 h-4 inline-block mr-2" />
                   Schedule New
                </button>
              </div>
            </div>
          </div>
        </div>
      </main>
    </div>
  );
}

function RoleCard({ title, description, difficulty, sessions }: any) {
  return (
    <motion.div 
      whileHover={{ y: -5 }}
      className="bg-white p-6 rounded-[32px] border border-gray-100 shadow-sm hover:shadow-xl hover:border-transparent transition-all group"
    >
      <div className="flex justify-between items-start mb-4">
        <div className="p-3 bg-gray-50 rounded-2xl group-hover:bg-[#6C3CE1]/5 transition-colors">
          <Mic2 className="w-6 h-6 text-gray-400 group-hover:text-[#6C3CE1]" />
        </div>
        <span className={`text-[9px] font-black uppercase tracking-widest px-2 py-1 rounded-full ${difficulty === 'Advanced' ? 'bg-red-50 text-red-500' : 'bg-green-50 text-green-500'}`}>
          {difficulty}
        </span>
      </div>
      <h4 className="text-lg font-black text-dark mb-1">{title}</h4>
      <p className="text-xs font-bold text-gray-400 leading-relaxed mb-6">{description}</p>
      <div className="flex items-center justify-between">
        <span className="text-[10px] font-black text-[#6C3CE1] uppercase tracking-tighter">{sessions}</span>
        <button className="p-2 bg-gray-50 rounded-xl hover:bg-[#6C3CE1] hover:text-white transition-colors">
          <Play size={14} />
        </button>
      </div>
    </motion.div>
  );
}

function HistoryRow({ date, role, score, status }: any) {
  return (
    <tr className="hover:bg-gray-50 transition-colors">
      <td className="px-6 py-4 text-xs font-bold text-gray-600">{date}</td>
      <td className="px-6 py-4 text-xs font-black text-dark">{role}</td>
      <td className="px-6 py-4">
        <span className="text-xs font-black text-[#6C3CE1]">{score}</span>
      </td>
      <td className="px-6 py-4">
        <span className={`text-[9px] font-black uppercase tracking-widest px-2 py-0.5 rounded-full ${status === 'Completed' ? 'bg-green-50 text-green-600' : 'bg-orange-50 text-orange-600'}`}>
          {status}
        </span>
      </td>
    </tr>
  );
}

function Metric({ label, value }: any) {
  return (
    <div className="space-y-1.5">
      <div className="flex justify-between text-[10px] font-black uppercase tracking-tighter">
        <span>{label}</span>
        <span>{value}%</span>
      </div>
      <div className="w-full h-1 bg-white/10 rounded-full overflow-hidden">
        <motion.div 
          initial={{ width: 0 }}
          animate={{ width: `${value}%` }}
          className="h-full bg-white rounded-full"
        />
      </div>
    </div>
  );
}

function ScheduleItem({ time, label }: any) {
  return (
    <div className="p-4 bg-gray-50/50 rounded-2xl flex items-center gap-4">
       <div className="w-10 h-10 bg-white rounded-xl shadow-sm border border-gray-100 flex items-center justify-center text-[#6C3CE1]">
          <History size={18} />
       </div>
       <div>
          <p className="text-[10px] font-bold text-gray-400 uppercase tracking-tighter mb-0.5">{time}</p>
          <p className="text-xs font-black text-dark">{label}</p>
       </div>
    </div>
  );
}
