"use client";
import React from 'react';
import { motion } from 'framer-motion';
import { Brain, Download, Mic, Search, Globe, ChartBar } from 'lucide-react';

const features = [
  {
    icon: Brain,
    color: 'text-primary',
    bgColor: 'bg-primary/10',
    title: "AI Profile Builder",
    desc: "Upload resume or answer questions — AI writes your bio, extracts skills, formats everything"
  },
  {
    icon: Download,
    color: 'text-blue-500',
    bgColor: 'bg-blue-50',
    title: "ATS Resume Export",
    desc: "Download your profile as a perfectly formatted PDF resume in one click. 8 templates."
  },
  {
    icon: Mic,
    color: 'text-cta',
    bgColor: 'bg-cta/10',
    title: "Mock Interview Practice",
    desc: "AI interviews you based on your profile and target role. Real-time feedback after each answer."
  },
  {
    icon: Search,
    color: 'text-teal-500',
    bgColor: 'bg-teal-50',
    title: "Smart Job Matching",
    desc: "Platform matches live Indian job openings to your exact skills, experience and target role."
  },
  {
    icon: Globe,
    color: 'text-primary',
    bgColor: 'bg-primary/10',
    title: "Public Profile Page",
    desc: "Your own iamfolio.in/username — share on WhatsApp, email, LinkedIn, anywhere in one tap."
  },
  {
    icon: ChartBar,
    color: 'text-green-500',
    bgColor: 'bg-green-50',
    title: "Career Dashboard",
    desc: "Track profile views, job applications, interview scores, and career progress over time."
  }
];

export const Features = () => {
  return (
    <section id="features" className="py-24 bg-gray-bg">
      <div className="max-w-7xl mx-auto px-6 md:px-12">
        <div className="text-center mb-16">
          <h2 className="text-4xl md:text-5xl font-bold text-dark">Everything inside your iamfolio profile</h2>
          <p className="mt-4 text-xl text-gray-text">One profile. Infinite possibilities.</p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {features.map((f, i) => (
            <motion.div
              key={i}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.1 }}
              className="p-10 bg-white rounded-card shadow-card border border-gray-border hover:-translate-y-1 transition-all duration-300"
            >
              <div className={`w-14 h-14 ${f.bgColor} rounded-xl flex items-center justify-center mb-8`}>
                <f.icon className={`w-7 h-7 ${f.color}`} />
              </div>
              <h3 className="text-2xl font-bold text-dark mb-4">{f.title}</h3>
              <p className="text-gray-text leading-relaxed">
                {f.desc}
              </p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};

