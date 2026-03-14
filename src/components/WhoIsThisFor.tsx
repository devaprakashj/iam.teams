"use client";
import React from 'react';
import { motion } from 'framer-motion';
import { GraduationCap, Rocket, Briefcase, Globe } from 'lucide-react';

const users = [
  {
    icon: GraduationCap,
    title: "Students",
    desc: "Build your profile before placement season. Stand out from 1000 applicants with iamfolio.in/yourname"
  },
  {
    icon: Rocket,
    title: "Fresh Graduates",
    desc: "No experience? No problem. Your skills, projects and potential speak for you."
  },
  {
    icon: Briefcase,
    title: "Professionals",
    desc: "Career switch or promotion — update once, share everywhere."
  },
  {
    icon: Globe,
    title: "Freelancers",
    desc: "Replace your portfolio website with iamfolio.in/yourname. Free forever."
  }
];

export const WhoIsThisFor = () => {
  return (
    <section className="py-24 bg-white">
      <div className="max-w-7xl mx-auto px-6 md:px-12 text-center">
        <h2 className="text-4xl md:text-5xl font-bold text-dark">iamfolio is for every career</h2>
        
        <div className="mt-16 grid grid-cols-1 md:grid-cols-2 gap-6">
          {users.map((u, i) => (
            <motion.div
              key={i}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.1 }}
              className="bg-[#F3EEFF] p-8 rounded-card border border-primary/5 flex items-center gap-8 text-left hover:shadow-card transition-all"
            >
              <div className="w-16 h-16 bg-white rounded-2xl flex items-center justify-center shrink-0 shadow-sm">
                 <u.icon className="w-8 h-8 text-primary" />
              </div>
              <div>
                <h3 className="text-2xl font-bold text-dark mb-2 tracking-tight">{u.title}</h3>
                <p className="text-gray-text font-medium leading-relaxed">
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

