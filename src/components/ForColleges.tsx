"use client";
import React from 'react';
import { motion } from 'framer-motion';
import { Check, BarChart3, Users, PieChart, ArrowUpRight } from 'lucide-react';

export const ForColleges = () => {
  return (
    <section id="for-colleges" className="py-20 md:py-32 bg-[#0A0A0F] overflow-hidden">
      <div className="max-w-7xl mx-auto px-6 md:px-12 flex flex-col lg:flex-row items-center gap-16 md:gap-24">
        
        {/* LEFT TEXT */}
        <div className="flex-1 text-center lg:text-left">
          <motion.div 
            initial={{ opacity: 0, x: -30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
          >
            <span className="inline-block px-4 py-2 bg-[#6EE7B7]/10 text-[#6EE7B7] text-[10px] font-black uppercase tracking-[0.4em] rounded-full mb-8 italic font-mono border border-[#6EE7B7]/20">
               Institutional_Access // 2026
            </span>
            <h2 className="text-[32px] sm:text-[42px] md:text-[54px] lg:text-[72px] font-black text-white leading-[0.95] md:leading-[0.85] font-syne uppercase italic italic tracking-tighter">
               Supercharge your <br className="hidden md:block" /> placement cell
            </h2>
            <p className="mt-8 text-[11px] md:text-[13px] text-[#64748B] font-black uppercase tracking-[0.3em] font-mono italic max-w-xl mx-auto lg:mx-0">
               Give every student a powerful identity node. Track every placement in real-time.
            </p>

            <ul className="mt-12 space-y-5 text-left max-w-xl mx-auto lg:mx-0">
              {[
                'Bulk student manifest creation',
                'Officer Command Center v2.0',
                "Real-time student career telemetry",
                'Direct recruiter grid integration',
                'Batch reports for NAAC / NIRF',
                'Priority support grid manager'
              ].map((point, i) => (
                <li key={i} className="flex items-center gap-4">
                  <div className="w-6 h-6 rounded-full bg-[#6EE7B7]/15 flex items-center justify-center flex-shrink-0 text-[#6EE7B7] border border-[#6EE7B7]/20">
                    <Check className="w-4 h-4 stroke-[4]" />
                  </div>
                  <span className="text-[13px] md:text-[15px] text-[#64748B] font-bold uppercase tracking-tight">{point}</span>
                </li>
              ))}
            </ul>

            <button className="mt-12 px-10 py-5 md:px-12 md:py-6 bg-[#6C3CE1] text-white font-black rounded-sm text-base md:text-xl hover:translate-x-1 transition-all shadow-[0_0_40px_rgba(108,60,225,0.4)] uppercase tracking-[0.2em] font-mono italic w-full sm:w-auto">
               Partner with iamfolio →
            </button>
            <p className="mt-8 text-[9px] md:text-[10px] text-[#64748B] font-black uppercase tracking-[0.3em] font-mono italic opacity-60">
               Already trusted by 200+ colleges across the grid
            </p>
          </motion.div>
        </div>

        {/* RIGHT — Dashboard Mockup */}
        <div className="flex-1 w-full lg:max-w-xl">
          <motion.div 
            initial={{ opacity: 0, x: 30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            className="bg-[#111118] rounded-[32px] shadow-[0_40px_100px_rgba(0,0,0,0.6)] border border-[#1E1E2E] overflow-hidden group hover:border-[#6C3CE1]/30 transition-colors"
          >
            {/* Dashboard Header */}
            <div className="bg-[#0D0D14] border-b border-[#1E1E2E] px-6 md:px-10 py-5 md:py-6 flex items-center justify-between">
              <span className="text-[10px] md:text-[11px] font-black text-[#6EE7B7] uppercase tracking-[0.2em] font-mono">placement_command_v2.0</span>
              <div className="flex gap-2">
                <div className="w-3 h-3 rounded-full bg-[#1E1E2E]"></div>
                <div className="w-3 h-3 rounded-full bg-[#1E1E2E]"></div>
              </div>
            </div>

            {/* Dashboard Stats */}
            <div className="p-6 md:p-10">
              <div className="grid grid-cols-2 gap-3 md:gap-4 mb-10">
                {[
                  { label: 'Total', val: '1,240' },
                  { label: 'Placed', val: '876' },
                  { label: 'Avg_ATS', val: '82' },
                  { label: 'Active', val: '1,198' }
                ].map(stat => (
                  <div key={stat.label} className="text-center p-4 bg-[#0D0D14] border border-[#1E1E2E] rounded-2xl group-hover:bg-[#1E1E2E]/30 transition-colors">
                    <p className="text-[9px] font-black text-[#64748B] uppercase mb-1 font-mono tracking-widest">{stat.label}</p>
                    <p className="text-xl md:text-2xl font-black text-white font-syne italic">{stat.val}</p>
                  </div>
                ))}
              </div>

              {/* Mock Bar Chart */}
              <div className="mb-10 bg-[#0D0D14] p-6 rounded-2xl border border-[#1E1E2E]">
                <div className="flex items-center justify-between mb-8">
                  <h4 className="text-[10px] font-black text-[#64748B] uppercase tracking-[0.3em] font-mono italic">Placements_by_Dept</h4>
                  <BarChart3 className="w-5 h-5 text-[#6C3CE1]" />
                </div>
                <div className="flex items-end gap-3 h-32 pt-2 border-b border-[#1E1E2E]/30">
                  {[60, 85, 45, 95, 70].map((h, i) => (
                    <div key={i} className="flex-1 bg-[#6C3CE1]/15 rounded-t-sm relative group/bar">
                      <div className="absolute bottom-0 w-full bg-[#6C3CE1] rounded-t-sm transition-all duration-1000 group-hover:bg-[#6EE7B7] h-0" style={{ height: `${h}%` }}></div>
                    </div>
                  ))}
                </div>
              </div>

              {/* Student List Table */}
              <div className="space-y-4">
                <h4 className="text-[10px] font-black text-[#64748B] uppercase tracking-[0.3em] font-mono italic pl-2">Real_Time_Telemetry</h4>
                <div className="space-y-3">
                  {[
                    { name: 'Rahul S.', score: '94', status: 'PLACED', color: 'text-[#6EE7B7]' },
                    { name: 'Sneha R.', score: '88', status: 'INTERVIEW', color: 'text-yellow-500' },
                    { name: 'Arun K.', score: '91', status: 'ACTIVE', color: 'text-[#60A5FA]' }
                  ].map(student => (
                    <div key={student.name} className="flex flex-col sm:flex-row items-center justify-between p-4 bg-[#0D0D14] border border-[#1E1E2E] rounded-2xl gap-4 group/item hover:border-[#6C3CE1]/40 transition-all">
                      <div className="flex items-center gap-4 w-full sm:w-auto">
                        <div className="w-10 h-10 rounded-full bg-[#6C3CE1] border border-white/10 flex items-center justify-center font-black text-[12px] text-white font-syne shadow-lg">
                          {student.name[0]}
                        </div>
                        <span className="font-black text-white uppercase tracking-tight text-sm mb-[-2px]">{student.name}</span>
                      </div>
                      <div className="flex items-center justify-between sm:justify-end gap-10 w-full sm:w-auto pt-4 sm:pt-0 border-t sm:border-0 border-[#1E1E2E]">
                        <span className="font-black text-[#6EE7B7] italic font-mono text-base">{student.score}</span>
                        <span className={`text-[10px] font-black uppercase tracking-[0.2em] font-mono ${student.color} italic`}>{student.status}</span>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
};
