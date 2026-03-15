"use client";
import React from 'react';
import { motion } from 'framer-motion';
import { GraduationCap, Rocket, Briefcase, Globe } from 'lucide-react';

const users = [
  {
    icon: GraduationCap,
    title: "Students",
    desc: "Build your professional manifest before placement season. Stand out from 1000 applicants with iamfolio.in/{username}"
  },
  {
    icon: Rocket,
    title: "Fresh Graduates",
    desc: "No experience? No problem. Your skills, projects and identity potential speak for you on the grid."
  },
  {
    icon: Briefcase,
    title: "Professionals",
    desc: "Career switch or promotion — update once, share everywhere. Secure your professional legacy."
  },
  {
    icon: Globe,
    title: "Freelancers",
    desc: "Replace your portfolio website with a high-performance identity node. 7-day trial included."
  }
];

export const WhoIsThisFor = () => {
  return (
    <section className="py-16 md:py-24 bg-white">
      <div className="max-w-7xl mx-auto px-6 md:px-12 text-center">
        <h2 className="text-2xl md:text-5xl font-black text-gray-900 font-syne uppercase italic tracking-tighter italic leading-tight">iamfolio is for <br className="md:hidden" /> every career</h2>
        
        <div className="mt-10 md:mt-16 grid grid-cols-1 md:grid-cols-2 gap-4 md:gap-6">
          {users.map((u, i) => (
            <motion.div
              key={i}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.1 }}
              className="bg-gray-50 p-6 md:p-8 rounded-2xl border border-gray-100 flex items-center md:items-start lg:items-center gap-5 md:gap-8 text-left hover:border-[#6C3CE1]/40 transition-[border,background] duration-300"
            >
              <div className="w-12 h-12 md:w-16 md:h-16 bg-white border border-gray-100 rounded-xl md:rounded-2xl flex items-center justify-center shrink-0 shadow-lg group">
                 <u.icon className="w-6 h-6 md:w-8 md:h-8 text-[#6C3CE1] group-hover:scale-110 transition-transform" />
              </div>
              <div className="space-y-1">
                <h3 className="text-lg md:text-xl font-black text-gray-900 font-syne uppercase italic italic leading-none">{u.title}</h3>
                <p className="text-xs md:text-[13px] text-gray-500 font-medium leading-relaxed">
                  {u.desc}
                </p>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};

