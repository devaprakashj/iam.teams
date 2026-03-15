"use client";
import React from 'react';
import { motion } from 'framer-motion';
import { Brain, Download, Mic, Search, Globe, ChartBar } from 'lucide-react';

const features = [
  {
    icon: Brain,
    color: 'text-[#6C3CE1]',
    bgColor: 'bg-[#6C3CE1]/10',
    borderColor: 'border-[#6C3CE1]/20',
    title: "AI Profile Builder",
    desc: "Upload resume or answer questions — AI writes your professional manifest, extracts skills, and formats everything."
  },
  {
    icon: Download,
    color: 'text-[#60A5FA]',
    bgColor: 'bg-[#60A5FA]/10',
    borderColor: 'border-[#60A5FA]/20',
    title: "ATS Resume Export",
    desc: "Download your profile as a perfectly formatted PDF resume in one click. 8 high-performance templates included."
  },
  {
    icon: Mic,
    color: 'text-[#FF6B35]',
    bgColor: 'bg-[#FF6B35]/10',
    borderColor: 'border-[#FF6B35]/20',
    title: "Mock Interview Engine",
    desc: "AI interviews you based on your identity node and target role. Real-time feedback after each spoken answer."
  },
  {
    icon: Search,
    color: 'text-[#6EE7B7]',
    bgColor: 'bg-[#6EE7B7]/10',
    borderColor: 'border-[#6EE7B7]/20',
    title: "Smart Job Matching",
    desc: "The platform matches live Indian job openings to your exact skills, experience and target role automatically."
  },
  {
    icon: Globe,
    color: 'text-[#6C3CE1]',
    bgColor: 'bg-[#6C3CE1]/10',
    borderColor: 'border-[#6C3CE1]/20',
    title: "Public Identity Node",
    desc: "Your own iamfolio.in/username — share on WhatsApp, email, LinkedIn, anywhere in one tap. Instant access."
  },
  {
    icon: ChartBar,
    color: 'text-[#6EE7B7]',
    bgColor: 'bg-[#6EE7B7]/10',
    borderColor: 'border-[#6EE7B7]/20',
    title: "Career Telemetry",
    desc: "Track profile views, job applications, interview scores, and career growth metrics over the professional grid."
  }
];

export const Features = () => {
  return (
    <section id="features" className="py-16 md:py-24 bg-white">
      <div className="max-w-7xl mx-auto px-6 md:px-12">
        <div className="text-center mb-12 md:mb-20">
          <h2 className="text-2xl md:text-5xl font-black text-gray-900 font-syne uppercase italic tracking-tighter italic leading-tight">Everything inside <br className="md:hidden" /> your profile</h2>
          <p className="mt-4 md:mt-6 text-[10px] md:text-[11px] text-gray-400 font-black uppercase tracking-[0.2em] md:tracking-[0.3em] font-mono italic">// ONE_MANIFEST. INFINITE_POSSIBILITIES.</p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {features.map((f, i) => (
            <motion.div
              key={i}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.1 }}
              className="p-8 md:p-10 bg-gray-50 rounded-2xl border border-gray-100 hover:border-[#6C3CE1]/30 transition-all duration-300 shadow-xl group"
            >
              <div className={`w-12 h-12 md:w-14 md:h-14 ${f.bgColor} ${f.borderColor} border rounded-xl flex items-center justify-center mb-6 md:mb-8 group-hover:scale-110 transition-transform`}>
                <f.icon className={`w-6 h-6 md:w-7 md:h-7 ${f.color}`} />
              </div>
              <h3 className="text-lg md:text-xl font-black text-gray-900 mb-3 md:mb-4 font-syne uppercase italic italic leading-none">{f.title}</h3>
              <p className="text-xs md:text-[13px] text-gray-500 leading-relaxed font-medium">
                {f.desc}
              </p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};

