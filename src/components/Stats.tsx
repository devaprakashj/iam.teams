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
    <section className="bg-[#1F4E79] py-20">
      <div className="max-w-7xl mx-auto px-6 md:px-12">
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-y-12">
           {stats.map((s, i) => (
             <div key={i} className={`text-center space-y-2 relative ${i !== stats.length - 1 ? 'lg:border-r lg:border-white/10' : ''}`}>
                <p className="text-4xl md:text-5xl font-bold text-white tracking-tight">{s.val}</p>
                <p className="text-sm md:text-base font-medium text-[#9DC3E6] uppercase tracking-wider">{s.label}</p>
             </div>
           ))}
        </div>
      </div>
    </section>
  );
};

