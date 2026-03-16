"use client";
import React from 'react';
import { motion } from 'framer-motion';
import { Check } from 'lucide-react';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import PaymentButton from './PaymentButton';

import { PRICING } from '@/constants/pricing';

const faqs = [
  {
    q: "What happens after 7 days?",
    a: "Choose Pro (₹59/mo or ₹499/yr) or Premium (₹999/yr). No payment during trial."
  },
  {
    q: "Is there a free plan?",
    a: "No free plan — everyone gets a full 7-day trial. Pay only if you want to continue."
  },
  {
    q: "Which plan is better value?",
    a: "Premium ₹999/yr = ₹83/month with everything unlocked. Pro ₹499/yr = ₹41.5/month for core features. Premium saves ₹709 vs Pro monthly."
  },
  {
    q: "Payment methods?",
    a: "UPI, Debit/Credit cards, Net Banking via Razorpay. All Indian banks supported."
  }
];

export const Pricing = () => {
  const router = useRouter();
  const [isAnnual, setIsAnnual] = React.useState(true);

  // Placeholder for user - should be replaced with real auth later
  const user = { id: 'guest_user', email: '', name: '' };

  return (
    <section id="pricing" className="py-16 md:py-24 bg-white">
      <div className="max-w-7xl mx-auto px-6 md:px-12 text-center">
        <h2 className="text-2xl md:text-6xl font-black text-gray-900 font-syne uppercase italic tracking-tighter italic leading-tight">7 days free. <br className="md:hidden" /> Then choose.</h2>
        <p className="mt-4 text-[9px] md:text-[11px] text-gray-400 font-black uppercase tracking-[0.2em] md:tracking-[0.3em] font-mono italic">// NO_CREDIT_CARD_REQUIRED · CANCEL_ANYTIME</p>
        
        {/* Toggle Bar */}
        <div className="mt-10 md:mt-16 flex flex-col sm:flex-row items-center justify-center gap-4">
           <div className="bg-gray-50 p-1 rounded-full border border-gray-100 flex items-center relative">
              <button 
                onClick={() => setIsAnnual(false)}
                className={`relative z-10 px-6 md:px-8 py-2 md:py-2.5 rounded-full font-mono text-[9px] md:text-[11px] font-black uppercase tracking-widest transition-all ${!isAnnual ? 'text-white' : 'text-gray-400'}`}
              >
                Monthly
              </button>
              <button 
                onClick={() => setIsAnnual(true)}
                className={`relative z-10 px-6 md:px-8 py-2 md:py-2.5 rounded-full font-mono text-[9px] md:text-[11px] font-black uppercase tracking-widest transition-all ${isAnnual ? 'text-white' : 'text-gray-400'}`}
              >
                Annual
              </button>
              <motion.div 
                animate={{ x: isAnnual ? '100% ' : '0%' }}
                className="absolute left-1 top-1 bottom-1 w-[calc(50%-4px)] bg-[#6C3CE1] rounded-full"
              />
           </div>
           {isAnnual && (
             <span className="bg-[#6EE7B7]/10 text-[#6EE7B7] px-3 py-1 rounded-full text-[8px] font-black uppercase tracking-widest border border-[#6EE7B7]/20">Save 30%</span>
           )}
        </div>

        <div className="mt-12 md:mt-20 grid grid-cols-1 md:grid-cols-2 gap-8 md:gap-10 max-w-5xl mx-auto items-stretch mb-12 md:mb-20">
          {/* PRO CARD */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className={`p-8 md:p-10 rounded-2xl bg-gray-50 border-2 border-[#6C3CE1] flex flex-col items-start text-left relative transition-all duration-300 hover:shadow-2xl hover:scale-[1.01]`}
          >
            <div className="absolute top-0 right-6 md:right-10 -translate-y-1/2 bg-[#6C3CE1] text-white px-3 md:px-4 py-1 font-black text-[8px] md:text-[9px] uppercase tracking-widest rounded-full shadow-lg font-mono italic">
               ⭐ MOST POPULAR
            </div>
            
            <div className="mb-8 md:mb-10 w-full">
              <p className="text-[9px] md:text-[10px] font-black text-[#6C3CE1] uppercase tracking-[0.3em] font-mono mb-4 md:mb-6">PRO</p>
              <div className="flex items-baseline gap-1">
                 <p className="text-lg md:text-xl font-black text-gray-900 tracking-widest font-mono">₹</p>
                 <p className="text-4xl md:text-6xl font-black text-gray-900 tracking-tighter font-syne italic">{isAnnual ? PRICING.pro.annual : PRICING.pro.monthly}</p>
                 <span className="text-gray-400 font-black text-xs md:text-sm uppercase font-mono">/{isAnnual ? 'yr' : 'mo'}</span>
              </div>
              <p className="mt-2 text-[9px] md:text-[10px] font-bold text-gray-400 uppercase tracking-wide font-mono italic leading-relaxed">
                {isAnnual 
                  ? `// ₹${PRICING.pro.monthly_if_annual}/MONTH · BILLED ANNUALLY` 
                  : `// BILLED MONTHLY · CANCEL ANYTIME`}
              </p>
              {isAnnual ? (
                <div className="flex flex-col gap-2 md:gap-3 mt-4">
                  <div className="inline-flex self-start px-2 py-1 bg-[#6EE7B7]/10 border border-[#6EE7B7]/20 rounded text-[8px] font-black text-[#6EE7B7] uppercase tracking-widest font-mono">
                    YOU SAVE ₹{PRICING.pro.savings_annual}
                  </div>
                  <button onClick={() => setIsAnnual(false)} className="text-[8px] md:text-[9px] text-left font-black text-gray-400 uppercase tracking-widest font-mono hover:text-gray-900 transition-colors">
                    Or ₹{PRICING.pro.monthly}/mo billed monthly
                  </button>
                </div>
              ) : (
                <button onClick={() => setIsAnnual(true)} className="mt-4 text-[8px] md:text-[9px] font-black text-[#6EE7B7] uppercase tracking-widest font-mono hover:underline">
                  Or ₹{PRICING.pro.annual}/yr — save ₹{PRICING.pro.savings_annual} →
                </button>
              )}
            </div>
            
            <div className="space-y-3 md:space-y-4 mb-10 md:mb-12 flex-1 w-full">
               {[
                 { t: "iamfolio.in/username profile", c: true },
                 { t: "All index templates", c: true },
                 { t: "Unlimited exports", c: true },
                 { t: "ATS score checker", c: true },
                 { t: "Mock interviews (10/mo)", c: true },
                 { t: "Smart job matching", c: true },
                 { t: "Remove badge", c: true },
                 { t: "Unlimited mocks", c: false },
                 { t: "Career DNA score", c: false }
               ].map((f, j) => (
                  <div key={j} className={`flex gap-3 items-center text-[10px] md:text-[11px] font-bold uppercase tracking-tight ${f.c ? 'text-[#64748B]' : 'text-[#64748B]/40'}`}>
                     {f.c ? <Check className="w-3.5 h-3.5 md:w-4 md:h-4 text-[#6EE7B7] shrink-0" /> : <p className="w-3.5 h-3.5 md:w-4 md:h-4 flex items-center justify-center text-[8px]">🔒</p>}
                     <p>{f.t}</p>
                  </div>
               ))}
            </div>
            
            <PaymentButton
              planId={isAnnual ? "pro_annual" : "pro_monthly"}
              label={`START 7-DAY TRIAL → then ${isAnnual ? '₹499/yr' : '₹59/mo'}`}
              amount={isAnnual ? 499 : 59}
              userId={user.id}
              email={user.email}
              name={user.name}
              onSuccess={() => router.push('/dashboard?upgraded=true')}
            />
          </motion.div>

          {/* PREMIUM CARD */}
           <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.1 }}
            className={`p-8 md:p-10 rounded-2xl bg-gray-50 border-2 border-gray-100 flex flex-col items-start text-left relative transition-all duration-300 hover:shadow-2xl hover:scale-[1.01]`}
          >
            <div className="mb-8 md:mb-10 w-full">
              <p className="text-[9px] md:text-[10px] font-black text-gray-400 uppercase tracking-[0.3em] font-mono mb-4 md:mb-6 italic">PREMIUM</p>
              <div className="flex items-baseline gap-1">
                 <p className="text-lg md:text-xl font-black text-gray-900 tracking-widest font-mono">₹</p>
                 <p className="text-4xl md:text-6xl font-black text-gray-900 tracking-tighter font-syne italic">{PRICING.premium.annual}</p>
                 <span className="text-gray-400 font-black text-xs md:text-sm uppercase font-mono">/yr</span>
              </div>
              <p className="mt-2 text-[9px] md:text-[10px] font-bold text-gray-400 uppercase tracking-wide font-mono italic leading-relaxed">// THE_ULTIMATE_CAREER_MANIFEST</p>
              <div className="inline-flex mt-4 px-2 py-1 bg-[#6EE7B7]/10 border border-[#6EE7B7]/20 rounded text-[8px] font-black text-[#6EE7B7] uppercase tracking-widest font-mono">
                7-day free trial included
              </div>
            </div>
            
            <div className="space-y-3 md:space-y-4 mb-10 md:mb-12 flex-1 w-full">
               {[
                 "Everything in Pro",
                 "Unlimited mock interviews",
                 "Career DNA score report",
                 "Priority recruiter search",
                 "LinkedIn auto-import",
                 "AI interview feedback",
                 "Custom portfolio themes",
                 "Video intro on profile",
                 "View notifications",
                 "7-day trial included"
               ].map((f, j) => (
                  <div key={j} className="flex gap-3 items-center text-[10px] md:text-[11px] font-bold text-[#64748B] uppercase tracking-tight">
                     <Check className="w-3.5 h-3.5 md:w-4 md:h-4 text-[#6EE7B7] shrink-0" />
                     <p>{f}</p>
                  </div>
               ))}
            </div>
            
            <PaymentButton
              planId="premium_annual"
              label="GET PREMIUM → ₹999/yr"
              amount={999}
              userId={user.id}
              email={user.email}
              name={user.name}
              onSuccess={() => router.push('/dashboard?upgraded=true')}
            />
          </motion.div>
        </div>

        {/* COLLEGE PLAN */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="bg-gray-50 border-2 border-gray-100 rounded-2xl p-8 md:p-10 max-w-5xl mx-auto flex flex-col md:flex-row gap-6 md:gap-8 items-center text-left"
        >
          <div className="flex-1 space-y-3 md:space-y-4">
             <p className="text-[9px] md:text-[10px] font-black text-[#FF6B35] uppercase tracking-[0.3em] font-mono italic">COLLEGE PLAN</p>
             <h3 className="text-2xl md:text-3xl font-black font-syne text-gray-900 uppercase italic tracking-tighter italic">FOR INSTITUTIONS</h3>
             <p className="text-[10px] md:text-[12px] font-bold text-gray-400 uppercase tracking-widest font-mono">Starting ₹2L/year · Batch access</p>
             <div className="grid grid-cols-1 md:grid-cols-2 gap-x-8 gap-y-2 md:gap-y-3 pt-2 md:pt-4">
                {[
                  "Unlimited profiles", "Officer dashboard",
                  "ATS analytics", "NAAC-ready reports"
                ].map((f, i) => (
                  <div key={i} className="flex items-center gap-2 text-[9px] md:text-[10px] font-bold text-[#64748B] uppercase tracking-tight">
                    <Check className="w-3 h-3 text-[#FF6B35]" /> {f}
                  </div>
                ))}
             </div>
          </div>
          <button className="w-full md:w-auto whitespace-nowrap px-8 md:px-10 py-4 md:py-5 bg-[#FF6B35] text-white font-black text-[10px] md:text-[12px] uppercase tracking-widest rounded-sm font-mono italic shadow-lg hover:scale-105 transition-all">
             CONTACT US →
          </button>
        </motion.div>

        {/* FAQ Section */}
        <div className="mt-20 md:mt-32 space-y-12 md:space-y-16">
          <div className="text-center space-y-4">
            <h2 className="text-2xl md:text-5xl font-black text-gray-900 font-syne uppercase italic tracking-tighter italic font-syne leading-tight">Common Questions</h2>
            <p className="text-[9px] md:text-[11px] text-gray-400 font-black uppercase tracking-[0.2em] md:tracking-[0.3em] font-mono italic">// GRID_OPERATIONAL_DATA</p>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 md:gap-6 max-w-5xl mx-auto">
             {faqs.map((faq, i) => (
               <div key={i} className="p-6 md:p-8 bg-gray-50 border border-gray-100 rounded-2xl text-left space-y-3 md:space-y-4 hover:border-[#6C3CE1] transition-all group">
                  <h4 className="text-[11px] md:text-[13px] font-black text-gray-900 font-mono uppercase tracking-widest group-hover:text-[#6C3CE1] transition-colors">{faq.q}</h4>
                  <p className="text-[10px] md:text-[11px] font-bold text-gray-400 leading-relaxed uppercase tracking-tight">{faq.a}</p>
               </div>
             ))}
          </div>
        </div>
        
        <div className="mt-16 md:mt-24 text-center">
          <Link href="/pricing" className="text-[9px] md:text-[10px] font-black text-[#64748B] uppercase tracking-widest hover:text-white transition-all underline underline-offset-4 decoration-[#1E1E2E]">Feature Comparison Grid →</Link>
        </div>
      </div>
    </section>
  );
};

