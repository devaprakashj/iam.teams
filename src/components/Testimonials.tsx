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
    <section className="py-24 bg-gray-bg">
      <div className="max-w-7xl mx-auto px-6 md:px-12 text-center">
        <h2 className="text-4xl md:text-5xl font-bold text-dark">Real people. Real results.</h2>
        
        <div className="mt-16 grid grid-cols-1 md:grid-cols-2 gap-8 max-w-5xl mx-auto">
          {reviews.map((r, i) => (
            <motion.div
              key={i}
              initial={{ opacity: 0, scale: 0.95 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.1 }}
              className="p-10 bg-white border border-gray-border rounded-card shadow-card relative flex flex-col items-start text-left"
            >
              <div className="flex gap-1 mb-6">
                {[...Array(5)].map((_, j) => (
                   <Star key={j} className="w-5 h-5 fill-[#FFB800] text-[#FFB800]" />
                ))}
              </div>
              <p className="text-lg text-gray-text font-medium mb-10 leading-relaxed italic">
                "{r.text}"
              </p>
              <div className="mt-auto flex items-center gap-4">
                <div className="w-12 h-12 bg-primary/10 rounded-full flex items-center justify-center text-primary font-bold">
                  {r.author[0]}
                </div>
                <div>
                  <p className="font-bold text-dark">{r.author}</p>
                  <p className="text-sm text-gray-light font-medium">{r.role} · {r.city}</p>
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};

