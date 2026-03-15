"use client";
import React from 'react';

const stats = [
  { val: "50,000+", label: "Profiles Created" },
  { val: "200+", label: "College Partners" },
  { val: "89%", label: "More Interview Calls" },
  { val: "1,000+", label: "Hiring Companies" },
];

export const Stats = () => {
  return (
    <section className="bg-gray-50 py-12 md:py-20 border-y border-gray-100">
      <div className="max-w-7xl mx-auto px-6 md:px-12">
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-y-10 md:gap-y-12">
           {stats.map((s, i) => (
               <div key={i} className={`text-center space-y-1 md:space-y-2 relative ${(i % 2 !== 1) ? 'border-r border-gray-100' : ''} ${i !== stats.length - 1 ? 'lg:border-r lg:border-gray-100' : ''}`}>
                  <p className="text-3xl md:text-5xl font-black text-[#6C3CE1] font-syne italic tracking-tighter">{s.val}</p>
                  <p className="text-[9px] md:text-[11px] font-black text-gray-400 uppercase tracking-[0.2em] md:tracking-[0.3em] font-mono">{s.label}</p>
               </div>
           ))}
        </div>
      </div>
    </section>
  );
};

