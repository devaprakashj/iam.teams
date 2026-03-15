"use client";
import React from 'react';
import { motion } from 'framer-motion';
import { Star } from 'lucide-react';

const reviews = [
  {
    text: "Uploaded my resume, got my profile in 1 minute. Shared iamfolio.in/arun with 3 companies the same day. Got a call in 2 days!",
    author: "Arun K.",
    role: "BCA Graduate",
    city: "Chennai"
  },
  {
    text: "I'm a commerce student. I always thought these platforms were only for engineers. iamfolio changed everything for me.",
    author: "Sneha R.",
    role: "B.Com Graduate",
    city: "Coimbatore"
  },
  {
    text: "Switched from teaching to UX design. My iamfolio profile got me 3 interviews in one week. Unbelievable.",
    author: "Meena J.",
    role: "Career Switcher",
    city: "Bangalore"
  },
  {
    text: "iamfolio.in/rahul is literally my business card now. Every client I send it to says it looks amazing.",
    author: "Rahul S.",
    role: "Freelance Developer",
    city: "Mumbai"
  }
];

export const Testimonials = () => {
  return (
    <section className="py-16 md:py-24 bg-white">
      <div className="max-w-7xl mx-auto px-6 md:px-12 text-center">
        <h2 className="text-2xl md:text-5xl font-black text-gray-900 font-syne uppercase italic tracking-tighter italic leading-tight">Real people. <br className="md:hidden" /> Real results.</h2>
        <p className="mt-4 text-[9px] md:text-[11px] text-gray-400 font-black uppercase tracking-[0.3em] font-mono italic">// NETWORK_VERIFIED_SIGNALS</p>
        
        <div className="mt-12 md:mt-16 grid grid-cols-1 md:grid-cols-2 gap-6 md:gap-8 max-w-5xl mx-auto">
          {reviews.map((r, i) => (
            <motion.div
              key={i}
              initial={{ opacity: 0, scale: 0.95 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.1 }}
              className="p-8 md:p-10 bg-gray-50 border border-gray-100 rounded-2xl shadow-xl relative flex flex-col items-start text-left hover:border-[#6C3CE1]/30 transition-all duration-300"
            >
              <div className="flex gap-1 mb-6 md:mb-8">
                {[...Array(5)].map((_, j) => (
                   <Star key={j} className="w-3 h-3 md:w-4 md:h-4 fill-[#FBBF24] text-[#FBBF24]" />
                ))}
              </div>
              <p className="text-base md:text-lg text-gray-500 font-medium mb-8 md:mb-10 leading-relaxed italic">
                "{r.text}"
              </p>
              <div className="mt-auto flex items-center gap-3 md:gap-4">
                <div className="w-10 h-10 md:w-12 md:h-12 bg-[#6C3CE1] rounded-full flex items-center justify-center text-white font-black font-syne shadow-[0_10px_20px_rgba(108,60,225,0.2)] text-sm md:text-base">
                   {r.author[0]}
                </div>
                <div>
                  <p className="font-bold text-gray-900 uppercase tracking-tight font-syne text-sm md:text-base">{r.author}</p>
                  <p className="text-[9px] md:text-[10px] text-gray-400 font-black uppercase tracking-widest font-mono mt-0.5">{r.role} · {r.city}</p>
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};

