'use client';

import React, { useState, useEffect, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { useRouter } from 'next/navigation';
import { 
  Send, 
  Sparkles, 
  User, 
  ArrowRight, 
  ChevronRight, 
  CheckCircle2, 
  Briefcase, 
  BookOpen, 
  Award,
  Terminal,
  Cpu,
  Zap,
  Star
} from 'lucide-react';
import { auth, db } from '@/lib/firebase';
import { doc, setDoc } from 'firebase/firestore';

// Types
interface Message {
  id: string;
  type: 'ai' | 'user';
  text: string;
  timestamp: Date;
}

interface ProfileDraft {
  fullName: string;
  jobTitle: string;
  company: string;
  experience: string;
  skills: string[];
  achievement: string;
  education: string;
  project: string;
  goal: string;
}

export default function AIChatOnboarding() {
  const router = useRouter();
  const chatEndRef = useRef<HTMLDivElement>(null);
  
  // State
  const [messages, setMessages] = useState<Message[]>([
    {
      id: '1',
      type: 'ai',
      text: "Hey! I'm your iamfolio AI. I'll build your complete career profile just by chatting with you. Let's start — what's your name and what do you do? 😊",
      timestamp: new Date()
    }
  ]);
  const [inputText, setInputText] = useState('');
  const [isTyping, setIsTyping] = useState(false);
  const [questionStep, setQuestionStep] = useState(1);
  const [progress, setProgress] = useState(0);
  
  // Profile Preview Data
  const [draft, setDraft] = useState<ProfileDraft>({
    fullName: '',
    jobTitle: '',
    company: '',
    experience: '',
    skills: [],
    achievement: '',
    education: '',
    project: '',
    goal: ''
  });

  // Auto-scroll chat
  useEffect(() => {
    chatEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [messages, isTyping]);

  const questions = [
    {
      step: 1,
      id: 'icebreaker',
      aiResponse: (ans: string) => `Nice to meet you, ${ans.split(' ')[0]}! How long have you been working as a professional? And which company are you currently at?`,
    },
    {
      step: 2,
      id: 'experience',
      aiResponse: () => `That's great! What are the top tools and skills you use every day at work?`,
    },
    {
      step: 3,
      id: 'skills',
      aiResponse: () => `Impressive! Can you tell me about one thing you're most proud of at work? Even a small win counts 🎯`,
    },
    {
      step: 4,
      id: 'achievement',
      aiResponse: () => `Got it! What's your educational background — degree, college, and year of graduation?`,
    },
    {
      step: 5,
      id: 'education',
      aiResponse: () => `Have you worked on any personal projects, freelance work, or side projects? Tell me about one!`,
    },
    {
      step: 6,
      id: 'projects',
      aiResponse: () => `Almost done! What kind of job or role are you looking for next?`,
    },
    {
      step: 7,
      id: 'goal',
      aiResponse: () => `Perfect! I have everything I need. I'm building your iamfolio profile now... ✨`,
    }
  ];

  const handleSendMessage = (text: string) => {
    if (!text.trim()) return;

    // Add User Message
    const userMsg: Message = {
      id: Date.now().toString(),
      type: 'user',
      text,
      timestamp: new Date()
    };
    setMessages(prev => [...prev, userMsg]);
    setInputText('');
    
    // Process Answer & Update Draft
    processAnswer(text);

    // AI Response Logic
    setIsTyping(true);
    setTimeout(() => {
      const nextQ = questions.find(q => q.step === questionStep);
      if (nextQ) {
        const aiMsg: Message = {
          id: (Date.now() + 1).toString(),
          type: 'ai',
          text: nextQ.aiResponse(text),
          timestamp: new Date()
        };
        setMessages(prev => [...prev, aiMsg]);
        setQuestionStep(prev => prev + 1);
        setProgress(prev => Math.min(prev + 14, 100));
        
        // Final Step Check
        if (questionStep === 7) {
          setTimeout(completeOnboarding, 3000);
        }
      }
      setIsTyping(false);
    }, 1500);
  };

  const processAnswer = (ans: string) => {
    switch (questionStep) {
      case 1: // Name & Role
        const parts = ans.split(' ');
        setDraft(prev => ({ 
          ...prev, 
          fullName: parts.length > 1 ? ans.split(' ').slice(0, 2).join(' ') : ans,
          jobTitle: ans.toLowerCase().includes('as a') ? ans.split('as a')[1].trim() : 'Professional'
        }));
        break;
      case 2: // Experience & Company
        setDraft(prev => ({ 
          ...prev, 
          experience: ans.includes('years') ? ans.match(/\d+/) + ' Years' : 'Professional XP',
          company: ans.includes('at') ? ans.split('at')[1].trim() : 'Innovation Corp'
        }));
        break;
      case 3: // Skills
        const skillsArray = ans.replace(/and|,/g, '').split(' ').filter(s => s.length > 3).slice(0, 5);
        setDraft(prev => ({ ...prev, skills: skillsArray }));
        break;
      case 4: // Achievement
        setDraft(prev => ({ ...prev, achievement: ans }));
        break;
      case 5: // Education
        setDraft(prev => ({ ...prev, education: ans }));
        break;
      case 6: // Project
        setDraft(prev => ({ ...prev, project: ans }));
        break;
      case 7: // Goal
        setDraft(prev => ({ ...prev, goal: ans }));
        break;
    }
  };

  const completeOnboarding = async () => {
    const userProfile = {
      fullName: draft.fullName,
      email: auth.currentUser?.email || '',
      phone: '',
      jobTitle: draft.jobTitle,
      location: 'Global',
      summary: draft.achievement || 'Professional with a focus on delivering excellence.',
      experience: [
        {
          id: Date.now(),
          title: draft.jobTitle,
          company: draft.company,
          startMonth: 'Jan',
          startYear: '2023',
          current: true,
          points: [draft.achievement, 'Leading key initiatives and driving team performance.']
        }
      ],
      education: [
        {
          id: Date.now() + 1,
          degree: draft.education.split(',')[0] || 'Bachelor\'s Degree',
          institution: draft.education.split(',')[1] || 'University',
          year: '2022'
        }
      ],
      skills: draft.skills,
      projects: [
        {
          id: Date.now() + 2,
          title: draft.project.split(' ')[0] || 'Core Initiative',
          description: draft.project,
          tech: draft.skills.slice(0, 2).join(', ')
        }
      ],
      goal: draft.goal,
      onboardingComplete: true
    };

    try {
      if (auth.currentUser) {
        const username = auth.currentUser.email ? auth.currentUser.email.split('@')[0] : '';
        await setDoc(doc(db, 'users', username), userProfile);
        localStorage.setItem('userProfile', JSON.stringify(userProfile));
        localStorage.setItem('onboardingComplete', 'true');
        router.push('/dashboard');
      }
    } catch (err) {
      console.error("Error saving profile:", err);
    }
  };

  return (
    <div className="flex h-screen bg-white overflow-hidden font-inter">
      {/* Left Panel: Chat Interface (70%) */}
      <div className="w-full lg:w-[70%] flex flex-col relative border-r border-slate-100">
        {/* Chat Header */}
        <header className="h-[80px] px-8 flex items-center justify-between border-b border-slate-50 shrink-0">
          <div className="flex items-center gap-4">
             <div className="w-10 h-10 bg-[#6C3CE1] rounded-xl flex items-center justify-center font-black text-white shadow-lg shadow-purple-200">i</div>
             <div>
                <h4 className="text-sm font-black text-slate-900 leading-none mb-1">iamfolio AI</h4>
                <div className="flex items-center gap-2">
                   <div className="w-1.5 h-1.5 bg-emerald-500 rounded-full animate-pulse" />
                   <span className="text-[10px] font-black text-slate-400 uppercase tracking-widest leading-none">Establishing Profile Node</span>
                </div>
             </div>
          </div>
          
          <div className="flex flex-col items-end gap-2">
             <div className="flex items-center gap-3">
                <span className="text-[10px] font-black text-slate-400 uppercase tracking-widest text-right">Profile Synthesis</span>
                <span className="text-[10px] font-black text-[#6C3CE1]">{progress}%</span>
             </div>
             <div className="w-32 h-1.5 bg-slate-100 rounded-full overflow-hidden">
                <motion.div 
                  initial={{ width: 0 }}
                  animate={{ width: `${progress}%` }}
                  className="h-full bg-[#6C3CE1]"
                />
             </div>
          </div>
        </header>

        {/* Chat Window */}
        <div className="flex-grow overflow-y-auto p-8 space-y-8 scroll-smooth custom-scrollbar">
           <AnimatePresence initial={false}>
              {messages.map((msg) => (
                <motion.div
                  key={msg.id}
                  initial={{ opacity: 0, y: 10, scale: 0.95 }}
                  animate={{ opacity: 1, y: 0, scale: 1 }}
                  className={`flex ${msg.type === 'user' ? 'justify-end' : 'justify-start'}`}
                >
                  <div className={`max-w-[80%] flex items-end gap-3 ${msg.type === 'user' ? 'flex-row-reverse' : ''}`}>
                     <div className={`w-8 h-8 rounded-lg shrink-0 flex items-center justify-center border ${msg.type === 'user' ? 'bg-slate-50 border-slate-200' : 'bg-[#6C3CE1] border-[#6C3CE1]'}`}>
                        {msg.type === 'user' ? <User size={14} className="text-slate-400" /> : <Cpu size={14} className="text-white" />}
                     </div>
                     <div className={`p-5 rounded-2xl text-[15px] font-medium leading-relaxed shadow-sm ${msg.type === 'user' ? 'bg-slate-900 text-white rounded-br-none' : 'bg-[#6C3CE1]/5 text-slate-900 border border-[#6C3CE1]/10 rounded-bl-none'}`}>
                        {msg.text}
                     </div>
                  </div>
                </motion.div>
              ))}
              {isTyping && (
                <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="flex justify-start">
                  <div className="flex items-end gap-3">
                     <div className="w-8 h-8 rounded-lg bg-[#6C3CE1] flex items-center justify-center">
                        <Cpu size={14} className="text-white" />
                     </div>
                     <div className="p-4 bg-slate-50 rounded-2xl rounded-bl-none flex gap-1.5">
                        {[0, 1, 2].map((i) => (
                          <motion.div
                            key={i}
                            animate={{ scale: [1, 1.5, 1], opacity: [0.5, 1, 0.5] }}
                            transition={{ duration: 0.8, repeat: Infinity, delay: i * 0.1 }}
                            className="w-1.5 h-1.5 bg-[#6C3CE1] rounded-full"
                          />
                        ))}
                     </div>
                  </div>
                </motion.div>
              )}
           </AnimatePresence>
           <div ref={chatEndRef} />
        </div>

        {/* Input Area */}
        <div className="p-8 border-t border-slate-50 bg-white shadow-[0_-10px_40px_rgba(0,0,0,0.02)]">
           <form 
             onSubmit={(e) => { e.preventDefault(); handleSendMessage(inputText); }}
             className="max-w-4xl mx-auto flex items-center gap-4 bg-slate-50 p-2 rounded-2xl border border-slate-200 focus-within:border-[#6C3CE1]/30 transition-all focus-within:bg-white"
           >
              <input 
                type="text" 
                value={inputText}
                onChange={(e) => setInputText(e.target.value)}
                placeholder="Type your answer here..."
                className="flex-grow bg-transparent outline-none px-4 py-3 font-medium text-slate-900"
              />
              <button 
                type="submit"
                disabled={!inputText.trim() || isTyping}
                className="w-12 h-12 bg-[#6C3CE1] text-white rounded-xl flex items-center justify-center hover:scale-105 active:scale-95 transition-all disabled:opacity-50 disabled:grayscale shadow-lg shadow-purple-100"
              >
                 <Send size={18} />
              </button>
           </form>
           <p className="text-[10px] text-center mt-4 font-black text-slate-300 uppercase tracking-widest">
              Secured Connection &bull; AI Synthesis Powered
           </p>
        </div>
      </div>

      {/* Right Panel: Live Profile Preview (30%) */}
      <div className="hidden lg:block w-[30%] bg-slate-50 p-8 h-screen overflow-y-auto custom-scrollbar relative">
         <div className="sticky top-0 mb-8 z-10">
            <h3 className="text-[11px] font-black text-slate-400 uppercase tracking-[0.3em] mb-4">Identity Telemetry</h3>
            <div className="flex gap-2">
               <div className="w-1 h-1 bg-emerald-500 rounded-full animate-pulse" />
               <div className="w-1 h-1 bg-emerald-500 rounded-full animate-pulse delay-75" />
            </div>
         </div>

         {/* The Profile Preview Card */}
         <div className="space-y-6">
            <PreviewCard label="Core Identity" active={!!draft.fullName}>
               <div className="flex items-center gap-4">
                  <div className="w-14 h-14 rounded-2xl bg-white border border-slate-100 shadow-sm flex items-center justify-center font-black text-[#6C3CE1] text-2xl">
                     {draft.fullName?.[0] || '?'}
                  </div>
                  <div>
                     <h2 className="text-xl font-black text-slate-900 tracking-tight">{draft.fullName || 'Synchronizing...'}</h2>
                     <p className="text-[#6C3CE1] text-xs font-bold uppercase tracking-widest">{draft.jobTitle || 'Awaiting Input'}</p>
                  </div>
               </div>
            </PreviewCard>

            <PreviewCard label="Experience Substrate" active={!!draft.company} icon={Briefcase}>
               <h4 className="text-sm font-black text-slate-900 mb-1">{draft.jobTitle}</h4>
               <p className="text-[10px] text-slate-400 font-bold uppercase tracking-widest mb-3">{draft.company} &bull; {draft.experience}</p>
               <div className="h-2 w-full bg-slate-100 rounded-full overflow-hidden">
                  <motion.div initial={{ width: 0 }} animate={{ width: draft.achievement ? '100%' : '30%' }} className="h-full bg-emerald-400" />
               </div>
            </PreviewCard>

            <PreviewCard label="Logic Modules (Skills)" active={draft.skills.length > 0} icon={Cpu}>
               <div className="flex flex-wrap gap-2">
                  {draft.skills.length > 0 ? draft.skills.map((skill, i) => (
                    <span key={i} className="px-3 py-1 bg-white border border-slate-100 rounded-lg text-[10px] font-black text-slate-700 shadow-sm animate-in fade-in slide-in-from-bottom-1">{skill}</span>
                  )) : (
                    <div className="space-y-2 w-full">
                       <div className="h-4 bg-slate-100 rounded-lg w-[80%] animate-pulse" />
                       <div className="h-4 bg-slate-100 rounded-lg w-[60%] animate-pulse delay-75" />
                    </div>
                  )}
               </div>
            </PreviewCard>

            <PreviewCard label="Intellectual History" active={!!draft.education} icon={BookOpen}>
               <p className="text-xs font-bold text-slate-600 leading-relaxed italic">{draft.education || 'Knowledge nodes pending registration...'}</p>
            </PreviewCard>

            <PreviewCard label="Mission Objective" active={!!draft.goal} icon={Zap}>
               <div className="p-4 bg-[#6C3CE1] rounded-2xl text-white">
                  <div className="flex items-center gap-2 mb-2">
                     <Star size={10} fill="white" />
                     <span className="text-[9px] font-black uppercase tracking-widest opacity-60">Target Deployment</span>
                  </div>
                  <p className="text-xs font-black italic">{draft.goal || 'Defining career trajectory...'}</p>
               </div>
            </PreviewCard>
         </div>

         {/* Bottom Glow */}
         <div className="absolute bottom-0 left-0 right-0 h-40 bg-gradient-to-t from-slate-50 to-transparent pointer-events-none" />
      </div>

      <style jsx global>{`
        .custom-scrollbar::-webkit-scrollbar {
          width: 5px;
        }
        .custom-scrollbar::-webkit-scrollbar-track {
          background: transparent;
        }
        .custom-scrollbar::-webkit-scrollbar-thumb {
          background: #E2E8F0;
          border-radius: 10px;
        }
        .custom-scrollbar::-webkit-scrollbar-thumb:hover {
          background: #CBD5E1;
        }
      `}</style>
    </div>
  );
}

function PreviewCard({ label, active, icon: Icon, children }: any) {
  return (
    <motion.div 
      initial={false}
      animate={{ opacity: active ? 1 : 0.4, scale: active ? 1 : 0.98 }}
      className={`bg-white border p-6 rounded-[28px] shadow-sm relative overflow-hidden transition-all duration-500 ${active ? 'border-slate-100' : 'border-slate-50'}`}
    >
       <div className="flex items-center gap-3 mb-4">
          {Icon && (
            <div className={`w-8 h-8 rounded-lg flex items-center justify-center border shadow-sm ${active ? 'bg-purple-50 border-purple-100 text-[#6C3CE1]' : 'bg-slate-50 border-slate-100 text-slate-300'}`}>
               <Icon size={14} />
            </div>
          )}
          <span className={`text-[9px] font-black uppercase tracking-[0.2em] ${active ? 'text-[#6C3CE1]' : 'text-slate-300'}`}>{label}</span>
          {active && <CheckCircle2 size={12} className="text-emerald-500 ml-auto" />}
       </div>
       {children}
    </motion.div>
  );
}
