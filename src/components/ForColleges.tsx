"use client";
import React from 'react';
import { motion } from 'framer-motion';
import { Check, BarChart3, Users, PieChart, ArrowUpRight } from 'lucide-react';

export const ForColleges = () => {
  return (
    <section id="for-colleges" className="py-24 bg-white overflow-hidden">
      <div className="max-w-7xl mx-auto px-6 md:px-12 flex flex-col lg:flex-row items-center gap-16">
        
        {/* LEFT TEXT */}
        <div className="flex-1">
          <motion.div 
            initial={{ opacity: 0, x: -30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
          >
            <h2 className="text-4xl font-bold text-dark leading-tight">
              Supercharge your <br /> placement cell
            </h2>
            <p className="mt-4 text-xl text-gray-text">
              Give every student a powerful profile. Track every placement.
            </p>

            <ul className="mt-10 space-y-4">
              {[
                'Bulk student profile creation in minutes',
                'Placement officer dashboard with full analytics',
                "Track every student's career score and job matches",
                'Share student profiles directly with recruiters',
                'Batch reports ready for NAAC and placement records',
                'Dedicated support manager'
              ].map((point, i) => (
                <li key={i} className="flex items-center gap-3">
                  <div className="w-5 h-5 rounded-full bg-primary/10 flex items-center justify-center flex-shrink-0 text-primary">
                    <Check className="w-3 h-3 stroke-[4]" />
                  </div>
                  <span className="text-gray-text font-medium">{point}</span>
                </li>
              ))}
            </ul>

            <button className="mt-10 px-8 py-4 bg-primary text-white font-bold rounded-button text-lg hover:bg-primary-hover transition-all">
              Partner with iamfolio →
            </button>
            <p className="mt-6 text-sm text-gray-light font-medium uppercase tracking-wider">
              Already trusted by 200+ colleges across India
            </p>
          </motion.div>
        </div>

        {/* RIGHT — Dashboard Mockup */}
        <div className="flex-1 w-full lg:max-w-xl">
          <motion.div 
            initial={{ opacity: 0, x: 30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            className="bg-white rounded-xl shadow-2xl border border-gray-border overflow-hidden"
          >
            {/* Dashboard Header */}
            <div className="bg-gray-50 border-b border-gray-border px-6 py-4 flex items-center justify-between">
              <span className="text-sm font-bold text-dark">Placement Dashboard — 2025 Batch</span>
              <div className="flex gap-1.5">
                <div className="w-2.5 h-2.5 rounded-full bg-gray-200"></div>
                <div className="w-2.5 h-2.5 rounded-full bg-gray-200"></div>
              </div>
            </div>

            {/* Dashboard Stats */}
            <div className="p-6">
              <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 mb-8">
                {[
                  { label: 'Total', val: '1,240' },
                  { label: 'Created', val: '1,198' },
                  { label: 'Placed', val: '876' },
                  { label: 'Avg Score', val: '82' }
                ].map(stat => (
                  <div key={stat.label} className="text-center p-3 bg-gray-bg rounded-lg">
                    <p className="text-[10px] font-bold text-gray-light uppercase mb-1">{stat.label}</p>
                    <p className="text-lg font-bold text-dark">{stat.val}</p>
                  </div>
                ))}
              </div>

              {/* Mock Bar Chart */}
              <div className="mb-8">
                <div className="flex items-center justify-between mb-4">
                  <h4 className="text-xs font-bold text-dark uppercase tracking-wider">Placements by Dept</h4>
                  <BarChart3 className="w-4 h-4 text-primary" />
                </div>
                <div className="flex items-end gap-3 h-32 pt-2">
                  {[60, 85, 45, 95, 70].map((h, i) => (
                    <div key={i} className="flex-1 bg-primary/20 rounded-t-sm relative group">
                      <div className="absolute bottom-0 w-full bg-primary rounded-t-sm transition-all duration-1000" style={{ height: `${h}%` }}></div>
                    </div>
                  ))}
                </div>
              </div>

              {/* Student List Table */}
              <div>
                <h4 className="text-xs font-bold text-dark uppercase tracking-wider mb-4">Recent Actvity</h4>
                <div className="space-y-3">
                  {[
                    { name: 'Rahul S.', score: '94', status: 'Placed', color: 'text-green-500' },
                    { name: 'Sneha R.', score: '88', status: 'Interviewing', color: 'text-blue-500' },
                    { name: 'Arun K.', score: '91', status: 'Active', color: 'text-amber-500' }
                  ].map(student => (
                    <div key={student.name} className="flex items-center justify-between p-3 border border-gray-border rounded-lg text-sm">
                      <div className="flex items-center gap-3">
                        <div className="w-8 h-8 rounded-full bg-gray-100 flex items-center justify-center font-bold text-[10px] text-gray-text">
                          {student.name[0]}
                        </div>
                        <span className="font-bold text-dark">{student.name}</span>
                      </div>
                      <div className="flex items-center gap-6">
                        <span className="font-bold text-primary italic">{student.score}</span>
                        <span className={`text-[10px] font-bold uppercase tracking-wider ${student.color}`}>{student.status}</span>
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

