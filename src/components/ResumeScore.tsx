"use client";
import React from 'react';
import { motion } from 'framer-motion';
import { Check } from 'lucide-react';

export const ResumeScore = () => {
  return (
    <section className="py-24 bg-gray-bg">
      <div className="max-w-7xl mx-auto px-6 md:px-12 flex flex-col lg:flex-row items-center gap-20">
        
        {/* LEFT — Score Report Card */}
        <div className="flex-1 w-full flex justify-center lg:justify-start">
          <motion.div 
            initial={{ opacity: 0, x: -40 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            className="w-full max-w-lg bg-white p-10 rounded-card shadow-card border border-gray-border"
          >
            <h3 className="text-xl font-bold text-dark mb-8">Your Profile Score Report</h3>
            
            <div className="flex flex-col items-center mb-10">
              <div className="relative w-48 h-48 flex items-center justify-center">
                <svg className="w-full h-full transform -rotate-90">
                  <circle cx="96" cy="96" r="80" fill="none" stroke="#F3F4F6" strokeWidth="12" />
                  <circle 
                    cx="96" cy="96" r="80" fill="none" stroke="#6C3CE1" strokeWidth="12" 
                    strokeDasharray="502.4" strokeDashoffset="60.3" strokeLinecap="round" 
                  />
                </svg>
                <div className="absolute inset-0 flex flex-col items-center justify-center translate-y-2">
                  <span className="text-5xl font-bold text-dark italic">88</span>
                  <span className="text-sm font-bold text-gray-light uppercase tracking-wider">/100</span>
                </div>
              </div>
            </div>

            <div className="space-y-6">
              {[
                { label: 'ATS Compatibility', val: '91%', color: 'bg-green-500' },
                { label: 'Keyword Match', val: '78%', color: 'bg-yellow-500' },
                { label: 'Format Score', val: '95%', color: 'bg-green-500' },
                { label: 'Readability', val: '88%', color: 'bg-green-500' }
              ].map(item => (
                <div key={item.label}>
                  <div className="flex justify-between text-xs font-bold font-sans text-dark mb-2 uppercase tracking-wide">
                    <span>{item.label}</span>
                    <span className="text-gray-text">{item.val}</span>
                  </div>
                  <div className="h-2 w-full bg-gray-100 rounded-full overflow-hidden">
                    <div className={`h-full ${item.color} rounded-full`} style={{ width: item.val }}></div>
                  </div>
                </div>
              ))}
            </div>
            <p className="mt-8 text-center text-xs text-gray-light font-medium uppercase tracking-wider">
              Updated every time you edit your profile
            </p>
          </motion.div>
        </div>

        {/* RIGHT — Text */}
        <div className="flex-1">
          <motion.div 
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
          >
            <h2 className="text-4xl md:text-5xl font-bold text-dark leading-tight">
              Know exactly how strong <br /> your profile is
            </h2>
            
            <ul className="mt-10 space-y-6">
              {[
                'Most resumes are rejected before a human ever sees them',
                'iamfolio scores your profile and tells you exactly what to fix',
                'Optimized for Indian companies: TCS, Infosys, Wipro, Zoho, Swiggy, Freshworks and 1000+ more',
                'Real-time score updates as you improve your profile'
              ].map((point, i) => (
                <li key={i} className="flex items-start gap-4">
                  <div className="mt-1 w-6 h-6 rounded-full bg-primary/10 flex items-center justify-center flex-shrink-0 text-primary">
                    <Check className="w-4 h-4 stroke-[3]" />
                  </div>
                  <p className="text-lg text-gray-text font-medium">{point}</p>
                </li>
              ))}
            </ul>

            <button className="mt-12 px-10 py-5 bg-cta text-white font-bold rounded-button text-lg hover:bg-cta-hover transition-all shadow-xl shadow-cta/20">
              Score My Profile Free →
            </button>
          </motion.div>
        </div>
      </div>
    </section>
  );
};

