"use client";
import React from 'react';
import { motion } from 'framer-motion';
import { Check } from 'lucide-react';

const plans = [
  {
    name: "FREE",
    label: "Free Forever",
    price: "₹0",
    features: [
      "iamfolio.in/username profile",
      "Upload resume or fill form",
      "1 resume export/month",
      "3 mock interviews/month",
      "Basic job matching",
      "Career score (once/month)"
    ],
    btn: "Create Free Profile",
    btnStyle: "border-2 border-primary text-primary hover:bg-primary hover:text-white"
  },
  {
    name: "PRO",
    label: "Most Popular",
    price: "₹199",
    sub: "/month",
    subtext: "or ₹1,499/year — save 37%",
    features: [
      "Everything in Free",
      "Unlimited resume exports",
      "All 8 premium templates",
      "Unlimited mock interviews",
      "Advanced job matching",
      "Full career analytics",
      "Priority in recruiter search",
      "Custom profile themes"
    ],
    btn: "Go Pro",
    btnStyle: "bg-primary text-white hover:bg-primary-hover shadow-xl shadow-primary/20",
    popular: true
  },
  {
    name: "COLLEGE",
    label: "For Institutions",
    price: "Custom",
    features: [
      "Unlimited student profiles",
      "Placement officer dashboard",
      "Batch analytics & reports",
      "Direct recruiter access",
      "NAAC-ready data exports",
      "Dedicated support"
    ],
    btn: "Contact Us",
    btnStyle: "bg-cta text-white hover:bg-cta-hover shadow-xl shadow-cta/20"
  }
];

export const Pricing = () => {
  return (
    <section id="pricing" className="py-24 bg-gray-bg">
      <div className="max-w-7xl mx-auto px-6 md:px-12 text-center">
        <h2 className="text-4xl md:text-5xl font-bold text-dark">Simple, honest pricing</h2>
        <p className="mt-4 text-xl text-gray-text">Start free. Upgrade when you're ready.</p>
        
        <div className="mt-16 grid grid-cols-1 lg:grid-cols-3 gap-8 max-w-6xl mx-auto items-start">
          {plans.map((p, i) => (
            <motion.div
              key={i}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.1 }}
              className={`p-10 rounded-card bg-white border ${
                p.popular ? 'border-primary ring-4 ring-primary/5 scale-105 relative z-10' : 'border-gray-border'
              } shadow-card`}
            >
              {p.popular && (
                <div className="absolute top-0 left-1/2 -translate-x-1/2 -translate-y-1/2 bg-primary text-white px-6 py-1.5 rounded-full text-[10px] font-bold uppercase tracking-wider shadow-lg">
                   {p.label}
                </div>
              )}
              
              {!p.popular && (
                <span className="text-xs font-bold text-gray-light uppercase tracking-widest block mb-6">{p.label}</span>
              )}
              
              <div className="mb-8">
                <div className="flex items-baseline justify-center gap-1">
                   <p className="text-5xl font-bold text-dark tracking-tight">{p.price}</p>
                   {p.sub && <span className="text-gray-text font-bold text-lg">{p.sub}</span>}
                </div>
                {p.subtext && <p className="mt-2 text-xs text-primary font-bold">{p.subtext}</p>}
              </div>
              
              <div className="space-y-4 mb-10 text-left">
                 {p.features.map((f, j) => (
                    <div key={j} className="flex gap-3 items-start text-sm font-medium text-gray-text leading-tight">
                       <Check className="w-4 h-4 text-primary shrink-0 mt-0.5" />
                       <p>{f}</p>
                    </div>
                 ))}
              </div>
              
              <button className={`w-full py-4 rounded-button font-bold text-lg transition-all ${p.btnStyle}`}>
                 {p.btn}
              </button>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};

