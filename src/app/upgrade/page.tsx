'use client'
import { useState, useEffect, Suspense } from 'react'
import { useRouter, useSearchParams } from 'next/navigation'
import PaymentButton from '@/components/PaymentButton'

function UpgradePageContent() {
  const router = useRouter()
  const params = useSearchParams()
  const expired = params.get('expired') === 'true'
  const feature = params.get('feature')
  const [billing, setBilling] = useState<'monthly'|'annual'>('monthly')
  const [success, setSuccess] = useState(false)
  const [upgradedPlan, setUpgradedPlan] = useState('')
  const [currentPlan, setCurrentPlan] = useState('free')
  const [dueDate, setDueDate] = useState<string | null>(null)

  useEffect(() => {
    const savedPlan = localStorage.getItem('userPlan')
    const savedExpiry = localStorage.getItem('planExpiry')
    if (savedPlan) setCurrentPlan(savedPlan)
    if (savedExpiry) setDueDate(savedExpiry)
  }, [])

  // Mock user data — replace with real auth
  const user = {
    id: 'user_123',
    name: 'Devaprakash J',
    email: 'devaprakashofficial@gmail.com',
    trialUsed: true // already used trial
  }

  const handleSuccess = (planId: string) => {
    const isAnnual = planId.includes('annual')
    const expiryDate = new Date()
    if (isAnnual) expiryDate.setFullYear(expiryDate.getFullYear() + 1)
    else expiryDate.setMonth(expiryDate.getMonth() + 1)
    
    const formattedDate = expiryDate.toLocaleDateString('en-IN', { 
      day: 'numeric', 
      month: 'short', 
      year: 'numeric' 
    })

    localStorage.setItem('userPlan', planId.includes('premium') ? 'premium' : 'pro')
    localStorage.setItem('planExpiry', formattedDate)
    
    setDueDate(formattedDate)
    setUpgradedPlan(planId)
    setSuccess(true)
    setCurrentPlan(planId.includes('premium') ? 'premium' : 'pro')
  }

  // SUCCESS STATE
  if (success) {
    return (
      <div className="min-h-screen bg-[#0A0A0F] flex items-center 
                      justify-center">
        <div className="text-center">
          <div className="text-6xl mb-6">🎉</div>
          <h1 className="text-3xl font-bold text-white mb-3">
            Welcome to {upgradedPlan.includes('premium') 
              ? 'Premium' : 'Pro'}!
          </h1>
          <p className="text-[#64748B] mb-2 font-mono text-sm">
            Your account has been upgraded successfully
          </p>
          {dueDate && (
            <p className="text-[#6EE7B7] mb-8 font-mono text-[10px] font-black uppercase tracking-widest">
              Next Due Date: {dueDate}
            </p>
          )}
          <button
            onClick={() => router.push('/dashboard')}
            className="px-8 py-3 bg-[#6EE7B7] text-black 
                       font-bold rounded-lg font-mono"
          >
            GO TO DASHBOARD →
          </button>
        </div>
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-[#0A0A0F]">
      
      {/* TOP BAR */}
      <div className="sticky top-0 z-50 flex items-center justify-between 
                      p-4 bg-[#0A0A0F]/80 backdrop-blur-md border-b border-[#1E1E2E]">
        <div className="flex items-center gap-3">
          <div className="w-8 h-8 bg-[#6C3CE1] rounded-lg 
                          flex items-center justify-center 
                          text-white font-bold text-sm">IF</div>
          <span className="text-[#6EE7B7] font-mono font-bold">
            iamfolio
          </span>
          <div className="h-4 w-px bg-[#1E1E2E] mx-1" />
          <span className="text-[10px] font-black uppercase text-[#64748B] tracking-widest">
            Current: {currentPlan === 'free' ? 'FREE' : currentPlan.toUpperCase()}
          </span>
          {dueDate && currentPlan !== 'free' && (
            <>
              <div className="h-4 w-px bg-[#1E1E2E] mx-1" />
              <span className="text-[10px] font-black uppercase text-[#6EE7B7] tracking-widest">
                Due: {dueDate}
              </span>
            </>
          )}
        </div>
        <div className="flex items-center gap-4">
          <button
            onClick={() => router.push('/dashboard')}
            className="text-[#64748B] font-mono text-xs 
                       hover:text-white transition-colors"
          >
            ← Back to Dashboard
          </button>
        </div>
      </div>

      <div className="max-w-4xl mx-auto px-6 py-12">

        {/* EXPIRED BANNER */}
        {expired && (
          <div className="mb-8 p-4 border border-red-500/30 
                          bg-red-500/10 rounded-xl text-center">
            <p className="text-red-400 font-mono font-bold">
              ⚠ YOUR 7-DAY TRIAL HAS ENDED
            </p>
            <p className="text-[#64748B] text-sm mt-1">
              Choose a plan to continue using iamfolio
            </p>
          </div>
        )}

        {/* FEATURE LOCK BANNER */}
        {feature && !expired && (
          <div className="mb-8 p-4 border border-[#6C3CE1]/30 
                          bg-[#6C3CE1]/10 rounded-xl text-center">
            <p className="text-[#6C3CE1] font-mono font-bold">
              🔒 {feature.toUpperCase()} IS A PREMIUM FEATURE
            </p>
            <p className="text-[#64748B] text-sm mt-1">
              Upgrade to unlock this and all premium features
            </p>
          </div>
        )}

        {/* HEADER */}
        <div className="text-center mb-10">
          <p className="text-[#6EE7B7] font-mono text-xs 
                        tracking-widest mb-3">
            CHOOSE YOUR PLAN
          </p>
          <h1 className="text-4xl font-bold text-white mb-3">
            Unlock your full career potential
          </h1>
          <p className="text-[#64748B] font-mono text-sm">
            {user.trialUsed 
              ? 'Your trial has ended · Choose a plan to continue'
              : '7-day free trial included · No credit card needed'}
          </p>
        </div>

        {/* BILLING TOGGLE */}
        <div className="flex items-center justify-center gap-4 mb-8">
          <span className={`font-mono text-sm 
            ${billing === 'monthly' 
              ? 'text-white' : 'text-[#64748B]'}`}>
            Monthly
          </span>
          <button
            onClick={() => setBilling(
              billing === 'monthly' ? 'annual' : 'monthly'
            )}
            className={`w-12 h-6 rounded-full relative 
                        transition-colors
                        ${billing === 'annual' 
                          ? 'bg-[#6C3CE1]' : 'bg-[#1E1E2E]'}`}
          >
            <div className={`absolute top-1 w-4 h-4 
                            bg-white rounded-full transition-all
                            ${billing === 'annual' 
                              ? 'left-7' : 'left-1'}`} />
          </button>
          <span className={`font-mono text-sm 
            ${billing === 'annual' 
              ? 'text-white' : 'text-[#64748B]'}`}>
            Annual
          </span>
          <span className="text-[10px] bg-[#6EE7B7]/10 
                           text-[#6EE7B7] border border-[#6EE7B7]/30 
                           rounded-full px-2 py-0.5 font-mono">
            SAVE 30%
          </span>
        </div>

        {/* PLAN CARDS */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          
          {/* FREE */}
          <div className={`border-2 ${currentPlan === 'free' ? 'border-[#64748B]' : 'border-[#1E1E2E]'} 
                          bg-[#111118] rounded-2xl p-6 relative opacity-80`}>
            {currentPlan === 'free' && (
              <div className="absolute top-2 right-3">
                <span className="text-[8px] font-black bg-[#6EE7B7]/20 text-[#6EE7B7] px-2 py-0.5 rounded tracking-widest uppercase italic border border-[#6EE7B7]/30">Current</span>
              </div>
            )}
            <p className="font-mono text-[#64748B] text-xs 
                          tracking-widest mb-2 font-black uppercase">Free</p>
            <div className="flex items-baseline gap-1 mb-1">
              <span className="text-5xl font-bold text-white">
                ₹0
              </span>
              <span className="text-[#64748B] font-mono">/mo</span>
            </div>
            <p className="text-[#64748B] font-mono text-xs mb-4">
              Get started with iamfolio basic
            </p>
            <div className="border-t border-[#1E1E2E] my-4" />
            <ul className="space-y-2 mb-6 text-sm">
              {[
                '1 Basic resume template',
                'Single profile preview',
                'Limited downloads',
                'Skill analysis preview',
                'iamfolio watermark active'
              ].map(f => (
                <li key={f} className="flex gap-2 text-[#64748B]">
                  <span className="text-[#64748B]">✓</span> {f}
                </li>
              ))}
            </ul>
            <button disabled className="w-full py-4 bg-[#1E1E2E] text-[#64748B] font-black rounded-2xl font-mono text-[10px] uppercase tracking-widest cursor-not-allowed">
              {currentPlan === 'free' ? 'YOUR CURRENT PLAN' : 'BASIC ACTIVE'}
            </button>
          </div>
          
          {/* PRO */}
          <div className="border-2 border-[#6C3CE1] 
                          bg-[#111118] rounded-2xl p-6 relative">
            <div className="absolute -top-3 left-1/2 
                            -translate-x-1/2 bg-[#6C3CE1] 
                            text-white text-xs font-mono 
                            font-bold px-4 py-1 rounded-full">
              ⭐ MOST POPULAR
            </div>
            {currentPlan === 'pro' && (
              <div className="absolute top-2 right-3">
                <span className="text-[8px] font-black bg-[#6EE7B7]/20 text-[#6EE7B7] px-2 py-0.5 rounded tracking-widest uppercase italic">Active</span>
              </div>
            )}
            <p className="font-mono text-[#64748B] text-xs 
                          tracking-widest mb-2">PRO</p>
            <div className="flex items-baseline gap-1 mb-1">
              <span className="text-5xl font-bold text-[#6C3CE1]">
                ₹{billing === 'monthly' ? '59' : '499'}
              </span>
              <span className="text-[#64748B] font-mono">
                /{billing === 'monthly' ? 'mo' : 'yr'}
              </span>
            </div>
            {billing === 'annual' && (
              <p className="text-[#6EE7B7] font-mono text-xs mb-4">
                Save ₹209 vs monthly
              </p>
            )}
            <div className="border-t border-[#1E1E2E] my-4" />
            <ul className="space-y-2 mb-6 text-sm">
              {[
                'iamfolio.in/username profile',
                'All 8 resume templates',
                'Unlimited resume downloads',
                'ATS score checker',
                'Mock interviews (10/month)',
                'Smart job matching',
                'Profile analytics',
                'Remove iamfolio badge',
              ].map(f => (
                <li key={f} className="flex gap-2 text-[#E2E8F0]">
                  <span className="text-[#6EE7B7]">✓</span> {f}
                </li>
              ))}
            </ul>
            {currentPlan === 'pro' ? (
              <button disabled className="w-full py-4 bg-[#1E1E2E] text-[#64748B] font-black rounded-2xl font-mono text-[10px] uppercase tracking-widest cursor-not-allowed">
                Your Current Plan
              </button>
            ) : (
              <PaymentButton
                planId={billing === 'monthly' 
                  ? 'pro_monthly' : 'pro_annual'}
                label={user.trialUsed 
                  ? `UPGRADE TO PRO → ₹${billing === 'monthly' 
                      ? '59/mo' : '499/yr'}`
                  : `START 7-DAY TRIAL → ₹${billing === 'monthly' 
                      ? '59/mo' : '499/yr'}`}
                amount={billing === 'monthly' ? 59 : 499}
                userId={user.id}
                email={user.email}
                name={user.name}
                onSuccess={() => {
                  localStorage.setItem('userPlan', 'pro')
                  handleSuccess(billing === 'monthly' ? 'pro_monthly' : 'pro_annual')
                }}
              />
            )}
            {currentPlan === 'pro' && dueDate && (
              <p className="mt-4 text-center text-[9px] font-black text-[#64748B] uppercase tracking-widest">
                Renewing on {dueDate}
              </p>
            )}
          </div>

          {/* PREMIUM */}
          <div className="border-2 border-[#FF6B35] 
                          bg-[#111118] rounded-2xl p-6 relative">
            <div className="absolute -top-3 left-1/2 
                            -translate-x-1/2 bg-[#FF6B35] 
                            text-white text-xs font-mono 
                            font-bold px-4 py-1 rounded-full">
              🏆 BEST VALUE
            </div>
            {currentPlan === 'premium' && (
              <div className="absolute top-2 right-3">
                <span className="text-[8px] font-black bg-[#6EE7B7]/20 text-[#6EE7B7] px-2 py-0.5 rounded tracking-widest uppercase italic">Active</span>
              </div>
            )}
            <p className="font-mono text-[#64748B] text-xs 
                          tracking-widest mb-2">PREMIUM</p>
            <div className="flex items-baseline gap-1 mb-1">
              <span className="text-5xl font-bold text-[#FF6B35]">
                ₹999
              </span>
              <span className="text-[#64748B] font-mono">/yr</span>
            </div>
            <p className="text-[#6EE7B7] font-mono text-xs mb-4">
              Save ₹709 vs Pro monthly · Everything unlocked
            </p>
            <div className="border-t border-[#1E1E2E] my-4" />
            <ul className="space-y-2 mb-6 text-sm">
              {[
                'Everything in Pro',
                'Unlimited mock interviews',
                'Career DNA score report',
                'Priority recruiter search',
                'LinkedIn + GitHub import',
                'AI interview feedback',
                'Custom portfolio themes',
                'Video intro on profile',
                'Recruiter view notifications',
                'Custom domain support',
              ].map(f => (
                <li key={f} className="flex gap-2 text-[#E2E8F0]">
                  <span className="text-[#6EE7B7]">✓</span> {f}
                </li>
              ))}
            </ul>
            {currentPlan === 'premium' ? (
              <button disabled className="w-full py-4 bg-[#1E1E2E] text-[#64748B] font-black rounded-2xl font-mono text-[10px] uppercase tracking-widest cursor-not-allowed">
                Your Current Plan
              </button>
            ) : (
              <PaymentButton
                planId="premium_annual"
                label={user.trialUsed
                  ? "UPGRADE TO PREMIUM → ₹999/yr"
                  : "START 7-DAY TRIAL → ₹999/yr"}
                amount={999}
                userId={user.id}
                email={user.email}
                name={user.name}
                onSuccess={() => {
                  localStorage.setItem('userPlan', 'premium')
                  handleSuccess('premium_annual')
                }}
              />
            )}
            {currentPlan === 'premium' && dueDate && (
              <p className="mt-4 text-center text-[9px] font-black text-[#64748B] uppercase tracking-widest">
                Renewing on {dueDate}
              </p>
            )}
          </div>
        </div>

        {/* BOTTOM NOTE */}
        <p className="text-center text-[#64748B] font-mono 
                      text-xs mt-8">
          {user.trialUsed
            ? 'Secure payment via Razorpay · UPI, Cards, Net Banking'
            : 'No credit card needed · Cancel before day 7 · Pay nothing'}
        </p>

      </div>
    </div>
  )
}

export default function UpgradePage() {
  return (
    <Suspense fallback={<div>Loading...</div>}>
      <UpgradePageContent />
    </Suspense>
  )
}
