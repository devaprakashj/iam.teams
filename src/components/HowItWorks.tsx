"use client";
import React from 'react';
import { motion } from 'framer-motion';
import { FileText, Linkedin, PencilLine } from 'lucide-react';

export const HowItWorks = () => {
  return (
    <section id="how-it-works" className="py-24 bg-gray-bg">
      <div className="max-w-7xl mx-auto px-6 md:px-12 text-center">
        <h2 className="text-4xl md:text-5xl font-bold text-dark">Start your profile — 3 ways, 60 seconds</h2>
        <p className="mt-4 text-xl text-gray-text">No matter where you are in your career journey</p>

        <div className="mt-16 grid grid-cols-1 md:grid-cols-3 gap-8">
          {/* Card 1 — Resume */}
          <motion.div 
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="bg-white p-10 rounded-card shadow-card border border-gray-border relative group hover:-translate-y-1 transition-all duration-300"
          >
            <div className="absolute top-0 left-1/2 -translate-x-1/2 -translate-y-1/2 bg-green-500 text-white text-[10px] font-bold uppercase tracking-wider px-4 py-1.5 rounded-full">
              Recommended
            </div>
            <div className="w-16 h-16 bg-primary/10 rounded-2xl flex items-center justify-center mx-auto mb-8">
              <FileText className="w-8 h-8 text-primary" />
            </div>
            <h3 className="text-2xl font-bold text-dark">Have a resume?</h3>
            <p className="mt-4 text-gray-text leading-relaxed">
              Drop your PDF or Word file. AI reads everything and builds your profile in seconds.
            </p>
            <button className="mt-8 w-full py-3 bg-green-500 hover:bg-green-600 text-white font-bold rounded-button transition-colors">
              Upload Now →
            </button>
          </motion.div>

          {/* Card 2 — LinkedIn */}
          <motion.div 
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.1 }}
            className="bg-white p-10 rounded-card shadow-card border border-gray-border group hover:-translate-y-1 transition-all duration-300"
          >
            <div className="w-16 h-16 bg-blue-100 rounded-2xl flex items-center justify-center mx-auto mb-8">
              <Linkedin className="w-8 h-8 text-[#0077B5]" />
            </div>
            <h3 className="text-2xl font-bold text-dark">On LinkedIn?</h3>
            <p className="mt-4 text-gray-text leading-relaxed">
              Paste your LinkedIn URL. AI imports your experience, skills, bio automatically.
            </p>
            <button className="mt-8 w-full py-3 bg-[#0077B5] hover:bg-[#006699] text-white font-bold rounded-button transition-colors">
              Import Now →
            </button>
          </motion.div>

          {/* Card 3 — Starting fresh? */}
          <motion.div 
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.2 }}
            className="bg-white p-10 rounded-card shadow-card border border-gray-border group hover:-translate-y-1 transition-all duration-300"
          >
            <div className="w-16 h-16 bg-cta/10 rounded-2xl flex items-center justify-center mx-auto mb-8">
              <PencilLine className="w-8 h-8 text-cta" />
            </div>
            <h3 className="text-2xl font-bold text-dark">Starting fresh?</h3>
            <p className="mt-4 text-gray-text leading-relaxed">
              No resume? No problem. Answer simple questions — AI builds your profile from scratch.
            </p>
            <button className="mt-8 w-full py-3 bg-cta hover:bg-cta-hover text-white font-bold rounded-button transition-colors">
              Start Fresh →
            </button>
          </motion.div>
        </div>

        <p className="mt-12 text-gray-text italic">
          All 3 paths → your free <span className="text-primary font-semibold">iamfolio.in/username</span> ready in under 2 minutes
        </p>
      </div>
    </section>
  );
};

