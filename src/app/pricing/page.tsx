"use client";

import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { 
  Check, 
  X, 
  Zap, 
  Star, 
  ShieldCheck, 
  Clock, 
  ArrowRight, 
  ChevronDown, 
  Lock, 
  Bell, 
  Globe, 
  Layout, 
  FileText, 
  Search, 
  Target, 
  MessageSquare, 
  Smartphone, 
  BarChart3,
  HelpCircle,
  Menu
} from 'lucide-react';
import Link from 'next/link';

// --- Constants ---

import { PRICING as GLOBAL_PRICING } from '@/constants/pricing';

const FEATURE_LIST = [
  { name: 'iamfolio.in/username profile', pro: true, premium: true },
  { name: 'All 8 resume templates', pro: true, premium: true },
  { name: 'Unlimited resume downloads', pro: true, premium: true },
  { name: 'ATS score checker', pro: true, premium: true },
  { name: 'Mock interviews (10/month)', pro: true, premium: true },
  { name: 'Smart job matching', pro: true, premium: true },
  { name: 'Profile analytics', pro: true, premium: true },
  { name: 'Remove iamfolio badge', pro: true, premium: true },
  { name: 'Unlimited mock interviews', pro: false, premium: true },
  { name: 'Career DNA score report', pro: false, premium: true },
  { name: 'Priority recruiter search', pro: false, premium: true },
  { name: 'LinkedIn + GitHub auto-import', pro: false, premium: true },
  { name: 'AI interview feedback', pro: false, premium: true },
  { name: 'Custom portfolio themes', pro: false, premium: true },
  { name: 'Video intro on profile', pro: false, premium: true },
  { name: 'Recruiter view notifications', pro: false, premium: true },
  { name: 'One-tap job apply', pro: false, premium: true },
  { name: 'Custom domain support', pro: false, premium: true },
];

const FAQS = [
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

// --- Sub-components ---

const PlanFeature = ({ check, text, disabled }: { check: boolean | string, text: string, disabled?: boolean }) => (
  <div className={`flex items-start gap-3 text-xs ${disabled ? 'opacity-30' : 'opacity-100'}`}>
    {typeof check === 'string' ? (
      <span className="text-[#6EE7B7] font-black w-4 flex-shrink-0 text-center">{check}</span>
    ) : check ? (
      <Check size={16} className="text-[#6EE7B7] flex-shrink-0" />
    ) : (
      <X size={16} className="text-[#EF4444] flex-shrink-0" />
    )}
    <span className={`font-medium ${disabled ? 'line-through' : ''}`}>{text}</span>
  </div>
);

// --- Main Page ---

export default function PricingPage() {
  const [billingCycle, setBillingCycle] = useState<'monthly' | 'annual'>('annual');
  const [isExpired, setIsExpired] = useState(false);
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  // Check URL params for expired state
  useEffect(() => {
    const params = new URLSearchParams(window.location.search);
    if (params.get('expired') === 'true') {
      setIsExpired(true);
    }
  }, []);

  return (
    <div className={`min-h-screen bg-[#0A0A0F] text-[#E2E8F0] font-mono selection:bg-[#6C3CE1]/30 relative overflow-x-hidden ${isExpired ? 'overflow-hidden' : ''}`}>
      
      {/* Account Locked Overlay */}
      <AnimatePresence>
        {isExpired && (
          <motion.div 
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            className="fixed inset-0 z-[100] bg-[#0A0A0F]/90 backdrop-blur-xl flex items-center justify-center p-4 sm:p-6 overflow-y-auto"
          >
            <motion.div 
              initial={{ scale: 0.9, y: 20 }}
              animate={{ scale: 1, y: 0 }}
              className="max-w-4xl w-full space-y-8 sm:space-y-12 py-10 sm:py-20"
            >
              <div className="text-center space-y-4">
                <div className="inline-flex p-3 sm:p-4 bg-[#EF4444]/10 rounded-full border border-[#EF4444]/20 text-[#EF4444] mb-2 sm:mb-4">
                  <Lock size={32} className="animate-pulse sm:w-10 sm:h-10" />
                </div>
                <h1 className="text-3xl sm:text-5xl font-black font-syne uppercase tracking-tighter italic leading-none">Your trial<br />has ended.</h1>
                <p className="text-[10px] sm:text-xs text-[#64748B] max-w-md mx-auto uppercase font-bold">Choose a plan to revive your identity.</p>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-6 sm:gap-8 max-w-3xl mx-auto">
                <PricingCard plan="pro" billing={billingCycle} setBilling={setBillingCycle} compact={true} />
                <PricingCard plan="premium" billing={billingCycle} setBilling={setBillingCycle} featured compact={true} />
              </div>

              <div className="text-center">
                <button 
                  onClick={() => setIsExpired(false)}
                  className="text-[9px] sm:text-[10px] font-black uppercase tracking-widest text-[#64748B] hover:text-[#6EE7B7] transition-all"
                >
                  Need help? Contact support
                </button>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Navbar */}
      <nav className="sticky top-0 z-50 bg-[#0A0A0F]/80 backdrop-blur-md border-b border-[#1E1E2E] px-4 sm:px-8 py-4 sm:py-6">
        <div className="max-w-7xl mx-auto flex justify-between items-center">
          <Link href="/" className="flex items-center gap-2 sm:gap-3">
             <div className="w-7 h-7 sm:w-8 sm:h-8 bg-[#6C3CE1] rounded flex items-center justify-center font-black text-white italic">IF</div>
             <span className="text-lg sm:text-xl font-black font-syne text-[#6EE7B7] tracking-tight">iamfolio</span>
          </Link>
          <div className="hidden md:flex items-center gap-8">
            <Link href="/" className="text-[10px] font-bold text-[#64748B] hover:text-white transition-colors uppercase tracking-widest">Home</Link>
            <Link href="/dashboard" className="text-[10px] font-bold text-[#64748B] hover:text-white transition-colors uppercase tracking-widest">Dashboard</Link>
            <button className="px-5 py-2 bg-white text-black text-[10px] font-black uppercase tracking-widest rounded-full hover:bg-[#6EE7B7] transition-all">
              Sign In
            </button>
          </div>
          <button onClick={() => setIsMenuOpen(!isMenuOpen)} className="md:hidden p-2 text-[#64748B]">
            <Menu size={20} />
          </button>
        </div>
        {/* Mobile menu */}
        <AnimatePresence>
          {isMenuOpen && (
            <motion.div 
              initial={{ height: 0, opacity: 0 }}
              animate={{ height: 'auto', opacity: 1 }}
              exit={{ height: 0, opacity: 0 }}
              className="md:hidden border-t border-[#1E1E2E] mt-4 pt-4 flex flex-col gap-4 overflow-hidden"
            >
              <Link href="/" className="text-[10px] font-black text-[#64748B] uppercase tracking-widest">Home</Link>
              <Link href="/dashboard" className="text-[10px] font-black text-[#64748B] uppercase tracking-widest">Dashboard</Link>
              <button className="w-full py-3 bg-white text-black text-[10px] font-black uppercase tracking-widest rounded-lg">Sign In</button>
            </motion.div>
          )}
        </AnimatePresence>
      </nav>

      <main className="max-w-7xl mx-auto px-4 sm:px-8 py-12 sm:py-20 space-y-20 sm:space-y-32">
        
        {/* Header */}
        <header className="space-y-12 sm:space-y-16">
          <div className="text-center space-y-4 sm:space-y-6">
            <h2 className="text-[8px] sm:text-[10px] font-bold text-[#6EE7B7] uppercase tracking-[0.5em]">Pricing</h2>
            <div className="space-y-2">
              <h1 className="text-4xl sm:text-6xl md:text-8xl font-black font-syne tracking-tighter leading-[0.85] italic">7 DAYS FREE.</h1>
              <h3 className="text-xl sm:text-3xl md:text-4xl font-black font-syne text-[#6EE7B7] italic uppercase">Then choose your plan.</h3>
            </div>
            <p className="text-[#64748B] max-w-lg mx-auto text-[10px] sm:text-sm font-medium">
              Full access tijdens trial · No credit card required · Cancel anytime
            </p>
          </div>

          <motion.section 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="bg-[#111118] border-2 border-[#6EE7B7]/30 rounded-3xl overflow-hidden p-6 sm:p-10 md:p-16 flex flex-col md:flex-row gap-8 md:gap-12 items-center relative group"
          >
            <div className="absolute top-0 right-0 p-8 opacity-5 group-hover:opacity-10 transition-opacity hidden md:block">
              <Zap size={200} className="text-[#6EE7B7]" />
            </div>
            
            <div className="flex-1 space-y-4 sm:space-y-6 z-10 text-center md:text-left">
              <div className="space-y-1 sm:space-y-2">
                <span className="text-7xl sm:text-9xl font-black font-syne text-[#6EE7B7] leading-none italic">7</span>
                <p className="text-lg sm:text-2xl font-black font-syne uppercase tracking-widest text-[#6EE7B7]">Day Free Trial</p>
              </div>
              <p className="text-sm sm:text-lg font-medium text-[#E2E8F0]">Get full access to everything — zero payment needed to start building your career manifest.</p>
            </div>

            <div className="w-full md:w-auto flex flex-col gap-4 sm:gap-6 z-10 bg-[#0A0A0F]/50 backdrop-blur-md p-6 sm:p-8 rounded-2xl border border-white/5">
              <div className="space-y-3 sm:space-y-4">
                 <PlanFeature check text="No credit card required" />
                 <PlanFeature check text="Full Pro + Premium features" />
                 <PlanFeature check text="Cancel before day 7 — pay nothing" />
              </div>
              <div className="space-y-2 sm:space-y-3">
                <button className="w-full py-4 sm:py-5 bg-[#6EE7B7] text-[#0A0A0F] font-black text-[10px] sm:text-xs uppercase tracking-[0.2em] sm:tracking-[0.3em] rounded-xl hover:shadow-[0_0_30px_rgba(110,231,183,0.3)] transition-all">
                  Start Trial →
                </button>
                <p className="text-[8px] sm:text-[10px] text-center text-[#64748B] font-bold uppercase tracking-widest">Takes 60s to sign up</p>
              </div>
            </div>
          </motion.section>
        </header>

        {/* Toggle */}
        <section className="flex flex-col items-center gap-6 sm:gap-8">
          <p className="text-[10px] sm:text-xs font-bold text-[#64748B] uppercase tracking-widest italic text-center px-4">After your trial, choose how to pay:</p>
          <div className="flex flex-col xs:flex-row items-center gap-4 sm:gap-6 p-2 bg-[#111118] border border-[#1E1E2E] rounded-2xl xs:rounded-full w-full max-w-[400px]">
            <button 
              onClick={() => setBillingCycle('monthly')}
              className={`w-full xs:w-auto flex-1 px-4 sm:px-8 py-3 rounded-xl xs:rounded-full text-[9px] sm:text-[10px] font-black uppercase tracking-widest transition-all ${billingCycle === 'monthly' ? 'bg-[#6C3CE1] text-white' : 'text-[#64748B] hover:text-white'}`}
            >
              Monthly
            </button>
            <div className="flex items-center gap-3 pr-2 w-full xs:w-auto">
               <button 
                onClick={() => setBillingCycle('annual')}
                className={`flex-1 px-4 sm:px-8 py-3 rounded-full text-[9px] sm:text-[10px] font-black uppercase tracking-widest transition-all ${billingCycle === 'annual' ? 'bg-[#6C3CE1] text-white' : 'text-[#64748B] hover:text-white'}`}
              >
                Annual
              </button>
              <span className="hidden xs:inline px-2 py-1 bg-[#6EE7B7]/10 text-[#6EE7B7] text-[7px] sm:text-[8px] font-black rounded uppercase">Save 30%</span>
            </div>
          </div>
          <span className="xs:hidden px-2 py-1 bg-[#6EE7B7]/10 text-[#6EE7B7] text-[8px] font-black rounded uppercase">Save 30% on Annual</span>
        </section>

        {/* Plan Cards */}
        <section className="grid grid-cols-1 md:grid-cols-2 gap-8 md:gap-10 max-w-5xl mx-auto items-stretch">
          <PricingCard plan="pro" billing={billingCycle} setBilling={setBillingCycle} />
          <PricingCard plan="premium" billing={billingCycle} setBilling={setBillingCycle} featured />
        </section>

        {/* Institution Plan */}
        <section className="bg-gradient-to-br from-[#111118] to-[#0A0A0F] border-2 border-[#FF6B35]/20 rounded-3xl p-6 sm:p-12 overflow-hidden relative">
           <div className="absolute -top-24 -right-24 w-64 h-64 bg-[#FF6B35]/10 rounded-full blur-3xl opacity-30" />
           <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 sm:gap-12 items-center">
              <div className="space-y-3 sm:space-y-4 text-center lg:text-left">
                 <span className="px-2 py-1 bg-[#FF6B35]/10 text-[#FF6B35] text-[8px] sm:text-[9px] font-black rounded uppercase">For Institutions</span>
                 <h3 className="text-xl sm:text-3xl font-black font-syne uppercase italic">College / Institution Plan</h3>
                 <p className="text-xs sm:text-sm text-[#64748B] leading-relaxed">Bulk student profiles, placement dashboard, and direct recruiter portals.</p>
              </div>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-y-3 sm:gap-y-4 gap-x-8 sm:gap-x-12">
                 {[
                   'Unlimited students', 'PO Dashboard',
                   'Batch Analytics', 'NAAC Reports',
                   'Recruiter access', 'Dedicated support',
                   'Custom branding', 'Bulk onboarding'
                 ].map(f => (
                   <PlanFeature key={f} check text={f} />
                 ))}
              </div>
              <div className="bg-[#0A0A0F] border border-white/5 p-6 sm:p-8 rounded-2xl flex flex-col items-center gap-4 sm:gap-6">
                 <div className="text-center">
                    <p className="text-xl sm:text-2xl font-black font-syne text-white italic uppercase">Custom</p>
                    <p className="text-[8px] sm:text-[10px] text-[#64748B] font-bold uppercase">Starting ₹2L/year</p>
                 </div>
                 <button className="w-full py-3 sm:py-4 border border-[#FF6B35] text-[#FF6B35] font-black text-[9px] sm:text-[10px] uppercase tracking-[0.2em] sm:tracking-[0.3em] rounded-lg hover:bg-[#FF6B35] hover:text-white transition-all">
                    Contact Us →
                 </button>
              </div>
           </div>
        </section>

        {/* Comparison */}
        <section className="space-y-12 sm:space-y-16">
           <div className="text-center space-y-3 s:space-y-4">
              <h2 className="text-xl sm:text-3xl font-black font-syne uppercase italic tracking-tight">Pro vs Premium</h2>
              <p className="text-[8px] sm:text-xs text-[#64748B] uppercase font-bold tracking-widest px-4">The ultimate showdown. Choose your weapon.</p>
           </div>
           
           <div className="overflow-x-auto mx-[-1rem] sm:mx-0 px-4 sm:px-0">
              <table className="w-full text-left border-collapse min-w-[700px]">
                 <thead>
                    <tr className="border-b border-[#1E1E2E]">
                       <th className="py-4 sm:py-6 px-3 sm:px-4 text-[9px] sm:text-[10px] font-bold text-[#64748B] uppercase tracking-widest">Feature</th>
                       <th className="py-4 sm:py-6 px-3 sm:px-4 text-center">
                          <span className="text-[10px] sm:text-[11px] font-black text-[#6C3CE1] uppercase tracking-widest">Pro ₹59/mo</span>
                       </th>
                       <th className="py-4 sm:py-6 px-3 sm:px-4 text-center">
                          <span className="text-[10px] sm:text-[11px] font-black text-[#FF6B35] uppercase tracking-widest">Premium ₹999/yr</span>
                       </th>
                    </tr>
                 </thead>
                 <tbody>
                    {FEATURE_LIST.map((f, i) => (
                      <tr key={i} className="border-b border-white/[0.03] hover:bg-white/[0.01] transition-colors">
                         <td className="py-3 sm:py-4 px-3 sm:px-4 text-[10px] sm:text-[11px] font-medium text-white/70">{f.name}</td>
                         <td className="py-3 sm:py-4 px-3 sm:px-4 text-center text-[#6C3CE1]">
                            <div className="flex justify-center">
                               {typeof f.pro === 'string' ? (
                                 <span className="text-[8px] sm:text-[9px] font-black">{f.pro}</span>
                               ) : f.pro ? (
                                 <Check size={14} className="text-[#6EE7B7]" />
                               ) : (
                                 <X size={14} className="text-[#EF4444]" />
                               )}
                            </div>
                         </td>
                         <td className="py-3 sm:py-4 px-3 sm:px-4 text-center text-[#FF6B35]">
                            <div className="flex justify-center">
                               {typeof f.premium === 'string' ? (
                                 <span className="text-[8px] sm:text-[9px] font-black">{f.premium}</span>
                               ) : f.premium ? (
                                 <Check size={14} className="text-[#6EE7B7]" />
                               ) : (
                                 <X size={14} className="text-[#EF4444]" />
                               )}
                            </div>
                         </td>
                      </tr>
                    ))}
                 </tbody>
              </table>
           </div>
        </section>

        {/* FAQ */}
        <section className="space-y-12 sm:space-y-16">
          <div className="text-center space-y-3 sm:space-y-4">
             <h2 className="text-xl sm:text-3xl font-black font-syne uppercase italic tracking-tight">FAQ</h2>
             <p className="text-[8px] sm:text-xs text-[#64748B] uppercase font-bold tracking-widest">No hidden terms. Clear as glass.</p>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 sm:gap-6">
             {FAQS.map((faq, i) => (
               <div key={i} className="p-6 sm:p-8 bg-[#111118] border border-[#1E1E2E] rounded-3xl space-y-3 sm:space-y-4 hover:border-white/10 transition-all">
                  <div className="flex items-start gap-3">
                     <HelpCircle size={16} className="text-[#6EE7B7] shrink-0 mt-1" />
                     <h4 className="text-xs sm:text-sm font-black text-white italic">{faq.q}</h4>
                  </div>
                  <p className="text-[10px] sm:text-xs text-[#64748B] leading-relaxed ml-7">{faq.a}</p>
               </div>
             ))}
          </div>
        </section>

        {/* CTA */}
        <section className="bg-[#6C3CE1] rounded-3xl p-8 sm:p-12 md:p-20 text-center overflow-hidden relative shadow-[0_30px_100px_rgba(108,60,225,0.3)]">
           <div className="absolute top-0 left-0 w-full h-full opacity-10 pointer-events-none">
              <div className="absolute top-0 right-0 w-96 h-96 bg-white rounded-full blur-[100px]" />
           </div>
           <div className="relative z-10 space-y-8 sm:space-y-10">
              <div className="space-y-3 sm:space-y-4">
                 <h2 className="text-3xl sm:text-5xl md:text-7xl font-black font-syne uppercase italic tracking-tighter text-white">Start your trial<br />today.</h2>
                 <p className="text-white/60 text-[8px] sm:text-sm font-bold uppercase tracking-widest">No credit card · Full access · Cancel anytime</p>
              </div>
              <button className="w-full sm:w-auto px-8 sm:px-12 py-4 sm:py-5 bg-[#6EE7B7] text-[#0A0A0F] font-black text-[10px] sm:text-sm uppercase tracking-[0.2em] sm:tracking-[0.3em] rounded-xl hover:scale-105 transition-all shadow-2xl">
                Create Account → Free Trial
              </button>
           </div>
        </section>

      </main>

      <footer className="py-12 sm:py-20 border-t border-white/5 bg-[#050508] mt-20">
         <div className="max-w-7xl mx-auto px-6 sm:px-8 flex flex-col sm:flex-row justify-between items-center gap-6 text-[9px] sm:text-[10px] font-bold uppercase tracking-[0.2em] text-[#64748B]">
            <span>© 2026 iamfolio</span>
            <div className="flex gap-4 sm:gap-8">
               <Link href="/terms" className="hover:text-white transition-colors">Terms</Link>
               <Link href="/privacy" className="hover:text-white transition-colors">Privacy</Link>
            </div>
         </div>
      </footer>

    </div>
  );
}

// Pricing Card
function PricingCard({ plan, billing, setBilling, featured, compact }: any) {
  const isPro = plan === 'pro';
  const color = isPro ? '#6C3CE1' : '#FF6B35';
  
  return (
    <motion.div 
      whileHover={{ y: -8 }}
      className={`relative p-6 sm:p-10 bg-[#111118] border-2 rounded-3xl flex flex-col gap-6 sm:gap-10 transition-all ${featured ? 'shadow-[0_20px_50px_rgba(255,107,53,0.15)] bg-gradient-to-b from-[#111118] to-[#15151F]' : ''} ${compact ? 'scale-95' : ''}`}
      style={{ borderColor: isPro ? '#6C3CE1' : '#1E1E2E' }}
    >
      {featured && (
        <div className="absolute -top-4 left-1/2 -translate-x-1/2 px-4 py-1.5 bg-[#FF6B35] text-white text-[8px] sm:text-[10px] font-black uppercase tracking-widest rounded-full shadow-lg font-mono italic whitespace-nowrap">
          🏆 BEST VALUE
        </div>
      )}

      {isPro && !featured && (
         <div className="absolute top-0 right-6 sm:right-10 -translate-y-1/2 bg-[#6C3CE1] text-white px-3 sm:px-4 py-1 font-black text-[7px] sm:text-[9px] uppercase tracking-widest rounded-full shadow-lg font-mono italic whitespace-nowrap">
            ⭐ MOST POPULAR
         </div>
      )}

      <div className="space-y-4 sm:space-y-6">
        <div className="space-y-1">
          <p className="text-[9px] sm:text-[11px] font-black uppercase tracking-[0.3em] font-mono" style={{ color }}>{isPro ? 'PRO' : 'PREMIUM'}</p>
          <div className="flex items-baseline gap-1 sm:gap-2">
            <div className="flex items-baseline gap-0.5 sm:gap-1">
              <span className="text-lg sm:text-xl font-black font-mono">₹</span>
              <span className="text-4xl sm:text-6xl font-black font-syne italic tracking-tighter">
                {isPro ? (billing === 'monthly' ? GLOBAL_PRICING.pro.monthly : GLOBAL_PRICING.pro.annual) : GLOBAL_PRICING.premium.annual}
              </span>
            </div>
            <span className="text-xs sm:text-sm font-black text-[#64748B] uppercase font-mono">/{isPro && billing === 'monthly' ? 'mo' : 'yr'}</span>
          </div>
          
          <div className="pt-1 sm:pt-2">
            {isPro ? (
              billing === 'monthly' ? (
                <div className="space-y-2 sm:space-y-3">
                  <p className="text-[8px] sm:text-[10px] font-bold text-[#64748B] uppercase tracking-wide font-mono italic line-clamp-1">// BILLED MONTHLY</p>
                  <button onClick={() => setBilling?.('annual')} className="block text-[7px] sm:text-[9px] font-black text-[#6EE7B7] uppercase tracking-widest font-mono hover:underline">
                    OR SAVE ₹{GLOBAL_PRICING.pro.savings_annual}/YR →
                  </button>
                </div>
              ) : (
                <div className="space-y-2 sm:space-y-3">
                  <p className="text-[8px] sm:text-[10px] font-bold text-[#64748B] uppercase tracking-wide font-mono italic line-clamp-1">// ₹{GLOBAL_PRICING.pro.monthly_if_annual}/MO · ANNUALLY</p>
                  <div className="flex flex-col gap-2 sm:gap-3">
                    <div className="inline-flex self-start px-2 py-0.5 sm:py-1 bg-[#6EE7B7]/10 border border-[#6EE7B7]/20 rounded text-[7px] sm:text-[8px] font-black text-[#6EE7B7] uppercase tracking-widest font-mono">
                      SAVE ₹{GLOBAL_PRICING.pro.savings_annual}
                    </div>
                  </div>
                </div>
              )
            ) : (
                <p className="text-[8px] sm:text-[10px] font-bold text-[#64748B] uppercase tracking-wide font-mono italic line-clamp-1">// ₹{GLOBAL_PRICING.premium.monthly_equivalent}/MO · ANNUALLY</p>
            )}
          </div>
        </div>

        <div className="inline-flex px-2 sm:px-3 py-1 bg-[#6EE7B7]/10 border border-[#6EE7B7]/20 rounded-full text-[7px] sm:text-[9px] font-black text-[#6EE7B7] uppercase tracking-widest font-mono">
          7-DAY TRIAL INCLUDED
        </div>
      </div>

      <div className="h-px bg-white/5" />

      <div className="flex-1 space-y-3 sm:space-y-4">
        {isPro ? (
          <>
            {[
              { t: "iamfolio.in profile", c: true },
              { t: "8 resume templates", c: true },
              { t: "Unlimited downloads", c: true },
              { t: "ATS score checker", c: true },
              { t: "Mock (10/month)", c: true },
              { t: "Smart job matching", c: true },
              { t: "Profile analytics", c: true },
              { t: "Locked features", c: false }
            ].map((f, i) => (
              <div key={i} className={`flex items-center gap-2 sm:gap-3 text-[9px] sm:text-[11px] font-bold uppercase tracking-tight ${f.c ? 'text-[#64748B]' : 'text-[#64748B]/40'}`}>
                {f.c ? <Check size={14} className="text-[#6EE7B7] flex-shrink-0" /> : <span className="w-3.5 h-3.5 flex items-center justify-center flex-shrink-0 text-[10px]">🔒</span>}
                <span className={!f.c ? 'line-through opacity-50' : ''}>{f.t}</span>
              </div>
            ))}
          </>
        ) : (
          <>
            {[
              "Everything in Pro",
              "Unlimited mocks",
              "Career DNA score",
              "Priority recruiter",
              "Auto-import info",
              "AI feedback",
              "Custom themes",
              "Custom domain"
            ].map((f, i) => (
              <div key={i} className="flex items-center gap-2 sm:gap-3 text-[9px] sm:text-[11px] font-bold text-[#64748B] uppercase tracking-tight">
                <Check size={14} className="text-[#6EE7B7] flex-shrink-0" />
                <span>{f}</span>
              </div>
            ))}
          </>
        )}
      </div>

      <button 
        className="w-full py-4 sm:py-5 font-black text-[10px] sm:text-[12px] uppercase tracking-[0.1em] sm:tracking-[0.2em] rounded-sm transition-all shadow-lg hover:shadow-2xl font-mono italic text-center"
        style={{ backgroundColor: color, color: '#FFFFFF' }}
      >
        START 7-DAY TRIAL →
      </button>
    </motion.div>
  );
}
