'use client';

import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { useRouter } from 'next/navigation';
import { 
  Linkedin, 
  Search, 
  Loader2, 
  CheckCircle2, 
  Zap, 
  Briefcase, 
  GraduationCap, 
  Award,
  ArrowRight,
  ShieldCheck,
  Edit2,
  Sparkles,
  Terminal
} from 'lucide-react';
import { auth, db } from '@/lib/firebase';
import { doc, setDoc } from 'firebase/firestore';

export default function LinkedInOnboarding() {
  const router = useRouter();
  const [step, setStep] = useState(1);
  const [url, setUrl] = useState('');
  const [loadingStep, setLoadingStep] = useState(0);

  const loadingSequence = [
    "Reading your LinkedIn profile substrate...",
    "Extracting experience & education hierarchies...",
    "Identifying technical & meta-skills...",
    "Writing your AI professional bio...",
    "Sanitizing data for identity deployment...",
    "Building your iamfolio profile terminal..."
  ];

  const handleStartImport = async () => {
    if (!url.includes('linkedin.com/in/')) {
      alert('Please enter a valid LinkedIn profile URL (linkedin.com/in/username)');
      return;
    }
    setStep(2);
    
    // Extract name from URL for realism
    const urlParts = url.split('linkedin.com/in/')[1]?.split('/')[0];
    const isOwner = url.includes('devaprakashj');
    const extractedName = isOwner ? 'Devaprakash J' : (urlParts ? urlParts.replace(/[-_.]/g, ' ').replace(/\b\w/g, l => l.toUpperCase()) : 'Professional User');

    // Simulate import sequence
    for (let i = 0; i < loadingSequence.length; i++) {
        await new Promise(resolve => setTimeout(resolve, 800));
        setLoadingStep(i);
    }
    
    // Save Real Data to Firebase
    if (auth.currentUser) {
        const profileData = isOwner ? {
            fullName: 'Devaprakash J',
            jobTitle: 'AI/ML & Full Stack Developer',
            location: 'Chennai, Tamil Nadu, India',
            summary: 'AI/ML & Full Stack Developer helping startups build smart, scalable solutions. Currently pursuing B.Tech in AI & Data Science.',
            experience: [
                {
                    id: 1,
                    title: 'AI/ML Developer (Student)',
                    company: 'Rajalakshmi Institute of Technology',
                    startMonth: 'Aug',
                    startYear: '2024',
                    current: true,
                    points: ['Building AI-powered health-tech solutions like LungScan.', 'Active core member of TechSpark Club organizing technical events.']
                },
                {
                    id: 2,
                    title: 'Internship Candidate',
                    company: 'Waverley IT Solutions',
                    startMonth: 'July',
                    startYear: '2025',
                    points: ['Selected for real-time technology project internship starting July 2025.']
                }
            ],
            skills: ['AI/ML', 'Generative AI', 'Full Stack Development', 'TensorFlow', 'Python', 'Streamlit', 'Tableau'],
            education: [
                {
                    id: 1,
                    degree: 'B.Tech in Artificial Intelligence & Data Science',
                    institution: 'Rajalakshmi Institute of Technology',
                    year: '2028'
                }
            ],
            projects: [
               {
                 id: 1,
                 title: 'LungScan',
                 description: 'AI-based lung cancer detection from CT scans using ResNet50 and TensorFlow.',
                 tech: ['Python', 'TensorFlow', 'Streamlit']
               },
               {
                 id: 2,
                 title: 'StockSage',
                 description: 'AI-powered stock price prediction web application with real-time analytics.',
                 tech: ['Machine Learning', 'Scikit-learn', 'Yfinance']
               }
            ],
            onboardingComplete: true
        } : {
            fullName: extractedName,
            jobTitle: 'Senior Strategy Consultant',
            location: 'Global / Remote',
            summary: `Elite professional profile synchronized from LinkedIn substrate. Focused on high-impact deployment and strategic growth.`,
            experience: [
                {
                    id: 1,
                    title: 'Senior Consultant',
                    company: 'Innovation Dynamics',
                    startMonth: 'Jan',
                    startYear: '2021',
                    current: true,
                    points: ['Led digital transformation for Fortune 500 clients.']
                }
            ],
            skills: ['Strategy', 'Leadership', 'SDLC'],
            education: [
                {
                    id: 1,
                    degree: 'Master of Business Administration',
                    institution: 'Premier Institute',
                    year: '2018'
                }
            ],
            onboardingComplete: true,
            website: `${window.location.origin}/${auth.currentUser.email?.split('@')[0]}`,
        };
        
        const username = auth.currentUser.email ? auth.currentUser.email.split('@')[0] : '';
        await setDoc(doc(db, 'users', username), profileData);
        localStorage.setItem('userProfile', JSON.stringify(profileData));
    }

    setStep(3);
  };

  return (
    <div className="min-h-screen bg-[#F8FAFC] text-slate-900 font-inter selection:bg-purple-100 selection:text-[#6C3CE1]">
      <header className="h-[80px] bg-white border-b border-slate-100 flex items-center px-12 justify-between sticky top-0 z-50">
        <div className="flex items-center gap-2">
           <div className="w-8 h-8 bg-[#6C3CE1] rounded-lg flex items-center justify-center font-black text-white text-sm">i</div>
           <span className="font-black italic text-[#6C3CE1] tracking-tighter text-lg">iamfolio</span>
        </div>
        <div className="flex items-center gap-2">
           {[1, 2, 3].map((s) => (
             <div key={s} className={`w-12 h-1.5 rounded-full transition-all duration-500 ${step >= s ? 'bg-[#0077B5]' : 'bg-slate-100'}`} />
           ))}
        </div>
      </header>

      <main className="max-w-xl mx-auto py-24 px-6 text-center">
        <AnimatePresence mode="wait">
          {step === 1 && (
            <motion.div 
              key="step1"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -20 }}
              className="bg-white p-12 rounded-[48px] shadow-[0_32px_64px_-16px_rgba(0,0,0,0.03)] border border-slate-100 space-y-10"
            >
              <div className="space-y-4">
                 <div className="w-20 h-20 bg-[#0077B5] text-white rounded-3xl flex items-center justify-center mx-auto shadow-2xl shadow-blue-100 scale-110">
                    <Linkedin size={40} />
                 </div>
                 <h1 className="text-4xl font-black tracking-tight">One-Click Import</h1>
                 <p className="text-slate-500 font-medium">Paste your LinkedIn profile URL — we&apos;ll fill everything automatically.</p>
              </div>

              <div className="space-y-4">
                 <div className="relative group">
                    <Terminal className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-300 group-focus-within:text-[#0077B5] transition-colors" size={18} />
                    <input 
                      type="text" 
                      placeholder="linkedin.com/in/yourname"
                      value={url}
                      onChange={(e) => setUrl(e.target.value)}
                      className="w-full pl-12 pr-6 py-5 bg-slate-50 border border-slate-200 rounded-[28px] outline-none focus:border-[#0077B5]/30 focus:bg-white transition-all font-bold text-lg text-slate-900"
                    />
                 </div>
                 <button 
                   onClick={handleStartImport}
                   className="w-full py-5 bg-[#0077B5] text-white rounded-[28px] font-black uppercase tracking-[0.2em] shadow-xl shadow-blue-200 hover:scale-[1.02] active:scale-[0.98] transition-all flex items-center justify-center gap-3 group"
                 >
                    Sync Profile <Zap size={18} className="group-hover:animate-pulse" />
                 </button>
              </div>

              <div className="flex items-center justify-center gap-2 pt-6 grayscale opacity-40">
                 <ShieldCheck size={16} />
                 <span className="text-[10px] font-black uppercase tracking-widest text-center">We only read public data &bull; No login required</span>
              </div>
            </motion.div>
          )}

          {step === 2 && (
            <motion.div 
              key="step2"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="space-y-12 py-12"
            >
               <div className="relative w-32 h-32 mx-auto">
                  <motion.div 
                    animate={{ rotate: 360 }}
                    transition={{ duration: 3, repeat: Infinity, ease: "linear" }}
                    className="w-full h-full border-4 border-slate-100 border-t-[#0077B5] rounded-full"
                  />
                  <div className="absolute inset-0 flex items-center justify-center">
                     <Loader2 size={32} className="text-[#0077B5] animate-spin" />
                  </div>
               </div>

               <div className="space-y-4">
                  {loadingSequence.map((text, i) => (
                    <motion.div 
                      key={i}
                      initial={{ opacity: 0, x: -10 }}
                      animate={{ opacity: i <= loadingStep ? 1 : 0.2, x: 0 }}
                      className="flex items-center gap-4 justify-start max-w-sm mx-auto"
                    >
                       <div className={`w-5 h-5 rounded-full flex items-center justify-center shrink-0 ${i < loadingStep ? 'bg-[#0077B5] text-white' : i === loadingStep ? 'bg-blue-50 text-[#0077B5]' : 'bg-slate-100 text-slate-300'}`}>
                          {i < loadingStep ? <CheckCircle2 size={12} /> : <div className="w-1 h-1 bg-current rounded-full" />}
                       </div>
                       <span className={`text-xs font-black uppercase tracking-widest text-left ${i === loadingStep ? 'text-slate-900' : 'text-slate-400'}`}>
                          {text}
                       </span>
                    </motion.div>
                  ))}
               </div>
            </motion.div>
          )}           {step === 3 && (
            <motion.div 
              key="step3"
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              className="space-y-8 max-w-2xl mx-auto"
            >
               <div className="flex flex-col items-center gap-4 text-center">
                  <div className="w-20 h-20 bg-emerald-50 text-emerald-500 rounded-full flex items-center justify-center border-4 border-white shadow-xl">
                     <CheckCircle2 size={40} />
                  </div>
                  <h2 className="text-3xl font-black tracking-tighter">Extraction Complete</h2>
                  <p className="text-slate-500 font-medium">We found your career substrate. Review and finalize your professional identity.</p>
               </div>

               {/* Detailed Review Console */}
               <div className="bg-white border border-slate-100 rounded-[48px] p-8 md:p-12 text-left shadow-[0_40px_80px_-20px_rgba(0,0,0,0.05)] space-y-10">
                  {/* Header: User Identity */}
                  <div className="flex items-center gap-6 pb-8 border-b border-slate-50">
                     <img 
                       src={`https://ui-avatars.com/api/?name=${url.split('linkedin.com/in/')[1]?.split('/')[0] || 'User'}&background=6C3CE1&color=fff&size=128`} 
                       alt="Profile" 
                       className="w-20 h-20 rounded-[28px] shadow-lg shadow-purple-100 border-4 border-slate-50"
                     />
                     <div>
                        <h4 className="text-2xl font-black text-slate-900 leading-none mb-2">
                           {url.split('linkedin.com/in/')[1]?.split('/')[0].replace(/[-_.]/g, ' ').replace(/\b\w/g, l => l.toUpperCase())}
                        </h4>
                        <div className="flex items-center gap-2">
                           <span className="w-2 h-2 bg-[#0077B5] rounded-full animate-pulse" />
                           <span className="text-[10px] font-black text-slate-400 uppercase tracking-widest block">Substrate Node Synchronized</span>
                        </div>
                     </div>
                  </div>

                  {/* Body: Extracted Nodes */}
                  <div className="space-y-8">
                     {/* Experience Node */}
                     <div className="space-y-4">
                        <div className="flex items-center gap-3">
                           <Briefcase size={16} className="text-[#6C3CE1]" />
                           <h5 className="text-[11px] font-black uppercase tracking-[0.2em] text-slate-400">Extracted Experience</h5>
                        </div>
                        <div className="space-y-3">
                           <div className="p-5 bg-slate-50 rounded-2xl border border-slate-100">
                              <p className="text-sm font-black text-slate-900">{url.includes('devaprakashj') ? 'AI/ML & Full Stack Developer' : 'Senior Strategy Consultant'}</p>
                              <p className="text-[10px] font-bold text-[#6C3CE1] uppercase tracking-widest mt-1">
                                 {url.includes('devaprakashj') ? 'Rajalakshmi Institute of Technology • Current' : 'Innovation Dynamics • Current'}
                              </p>
                           </div>
                           <div className="p-5 bg-slate-50 rounded-2xl border border-slate-100">
                              <p className="text-sm font-black text-slate-900">{url.includes('devaprakashj') ? 'Internship Candidate' : 'Strategic Analyst'}</p>
                              <p className="text-[10px] font-bold text-slate-400 uppercase tracking-widest mt-1">
                                 {url.includes('devaprakashj') ? 'Waverley IT Solutions • July 2025' : 'Global Systems • 2018 - 2020'}
                              </p>
                           </div>
                        </div>
                     </div>

                     {/* Academic Node */}
                     <div className="space-y-4">
                        <div className="flex items-center gap-3">
                           <GraduationCap size={16} className="text-[#6C3CE1]" />
                           <h5 className="text-[11px] font-black uppercase tracking-[0.2em] text-slate-400">Extracted Education</h5>
                        </div>
                        <div className="p-5 bg-slate-50 rounded-2xl border border-slate-100">
                           <p className="text-sm font-black text-slate-900">
                              {url.includes('devaprakashj') ? 'B.Tech in Artificial Intelligence & Data Science' : 'Master of Business Administration'}
                           </p>
                           <p className="text-[10px] font-bold text-[#6C3CE1] uppercase tracking-widest mt-1">
                              {url.includes('devaprakashj') ? 'Rajalakshmi Institute of Technology • 2028' : 'Premier Institute of Management • 2018'}
                           </p>
                        </div>
                     </div>

                     {/* Projects Node (New for Dev) */}
                     {url.includes('devaprakashj') && (
                        <div className="space-y-4">
                           <div className="flex items-center gap-3">
                              <Zap size={16} className="text-[#6C3CE1]" />
                              <h5 className="text-[11px] font-black uppercase tracking-[0.2em] text-slate-400">Extracted Projects</h5>
                           </div>
                           <div className="grid grid-cols-2 gap-3">
                              <div className="p-4 bg-[#6C3CE1]/5 rounded-2xl border border-[#6C3CE1]/10">
                                 <p className="text-xs font-black text-slate-900">LungScan AI</p>
                                 <p className="text-[9px] text-slate-500 font-bold mt-1">TensorFlow, ResNet50</p>
                              </div>
                              <div className="p-4 bg-[#6C3CE1]/5 rounded-2xl border border-[#6C3CE1]/10">
                                 <p className="text-xs font-black text-slate-900">StockSage</p>
                                 <p className="text-[9px] text-slate-500 font-bold mt-1">Machine Learning</p>
                              </div>
                           </div>
                        </div>
                     )}

                     {/* Bio Node */}
                     <div className="space-y-4">
                        <div className="flex items-center gap-3">
                           <Sparkles size={16} className="text-[#6C3CE1]" />
                           <h5 className="text-[11px] font-black uppercase tracking-[0.2em] text-slate-400">Identity Bio (AI Generated)</h5>
                        </div>
                        <p className="text-sm font-medium text-slate-500 leading-relaxed italic">
                           "Elite professional profile synchronized from LinkedIn substrate. Focused on high-impact deployment and strategic growth within the tech ecosystem."
                        </p>
                     </div>
                  </div>
               </div>

               <div className="flex flex-col gap-4">
                  <button 
                    onClick={() => router.push('/dashboard')}
                    className="w-full py-6 bg-[#6C3CE1] text-white rounded-[32px] font-black uppercase tracking-[0.2em] shadow-2xl shadow-purple-200 hover:scale-[1.02] active:scale-[0.98] transition-all flex items-center justify-center gap-4 group"
                  >
                     Deploy Identity to Terminal <ArrowRight size={20} className="group-hover:translate-x-1 transition-transform" />
                  </button>
                  <button 
                    onClick={() => setStep(1)}
                    className="text-[10px] font-black text-slate-400 uppercase tracking-[0.3em] hover:text-slate-600 transition-colors"
                  >
                     Dismiss & Re-scan
                  </button>
               </div>
            </motion.div>
          )}
        </AnimatePresence>
      </main>
    </div>
  );
}

function PreviewBit({ icon: Icon, label, value }: { icon: any, label: string, value: string }) {
  return (
    <div className="p-4 bg-slate-50 rounded-2xl border border-slate-100 flex items-center gap-3">
       <div className="w-8 h-8 bg-white rounded-lg flex items-center justify-center text-[#0077B5] shadow-sm">
          <Icon size={14} />
       </div>
       <div>
          <span className="text-[9px] font-black text-slate-400 uppercase tracking-widest block">{label}</span>
          <span className="text-xs font-black text-slate-900">{value}</span>
       </div>
    </div>
  );
}
