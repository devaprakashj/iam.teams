'use client';

import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { useRouter } from 'next/navigation';
import { 
  Github, 
  Search, 
  Folder, 
  Star, 
  Cpu, 
  CheckCircle2, 
  ArrowRight, 
  Code2, 
  Globe,
  Loader2,
  Terminal,
  Zap,
  Sparkles
} from 'lucide-react';

export default function GitHubOnboarding() {
  const router = useRouter();
  const [step, setStep] = useState(1);
  const [username, setUsername] = useState('');
  const [loadingText, setLoadingText] = useState('');
  const [selectedRepos, setSelectedRepos] = useState<string[]>([]);
  
  // Mock Repos (Simulating API Discovery)
  const repos = [
    { 
      name: 'e-commerce-redesign', 
      lang: ['React', 'CSS', 'JavaScript'], 
      stars: 12, 
      updated: '2 months', 
      desc: 'A full-stack e-commerce UI built with React, featuring a high-fidelity cart and checkout system.',
      recommended: true 
    },
    { 
      name: 'ai-orchestrator', 
      lang: ['Python', 'LangChain', 'OpenAI'], 
      stars: 45, 
      updated: '1 week', 
      desc: 'Autonomous agent framework for orchestrating complex LLM workflows with multi-tool usage.',
      recommended: true 
    },
    { 
      name: 'portfolio-v2', 
      lang: ['Next.js', 'Tailwind', 'Three.js'], 
      stars: 8, 
      updated: '5 days', 
      desc: 'Advanced professional identity substrate with 3D canvas interactions and glassmorphic UI.',
      recommended: true 
    },
    { 
      name: 'node-api-boilerplate', 
      lang: ['Node.js', 'Express', 'Redis'], 
      stars: 4, 
      updated: '6 months', 
      desc: 'Production-ready API foundation with built-in auth, caching, and telemetry middleware.'
    },
    { 
      name: 'data-viz-library', 
      lang: ['D3.js', 'TypeScript', 'SVG'], 
      stars: 22, 
      updated: '3 months', 
      desc: 'Custom SVG mapping engine for high-density professional data visualization.'
    }
  ];

  const handleStartScan = () => {
    if (!username) return;
    setStep(2);
    
    // Scan animation cycle
    const scanSteps = [
      "Scanning repositories...",
      "Reading README files...",
      "Analysing code languages...",
      "Identifying top projects...",
      "Writing AI descriptions...",
      "Almost ready..."
    ];
    
    scanSteps.forEach((text, i) => {
      setTimeout(() => setLoadingText(text), i * 800);
    });
    
    setTimeout(() => setStep(3), scanSteps.length * 800);
  };

  const toggleRepo = (name: string) => {
    setSelectedRepos(prev => 
      prev.includes(name) ? prev.filter(r => r !== name) : [...prev, name].slice(0, 6)
    );
  };

  return (
    <div className="min-h-screen bg-white text-slate-900 font-inter selection:bg-purple-100 selection:text-[#6C3CE1]">
      {/* Header */}
      <header className="h-[80px] bg-white border-b border-slate-50 flex items-center px-12 justify-between sticky top-0 z-50">
        <div className="flex items-center gap-2">
           <div className="w-8 h-8 bg-[#6C3CE1] rounded-lg flex items-center justify-center font-black text-white text-sm">i</div>
           <span className="font-black italic text-[#6C3CE1] tracking-tighter text-lg">iamfolio</span>
        </div>
        <div className="flex items-center gap-2">
           {[1, 2, 3].map((s) => (
             <div key={s} className={`w-10 h-1.5 rounded-full transition-all duration-500 ${step >= s ? 'bg-[#6C3CE1]' : 'bg-slate-100'}`} />
           ))}
        </div>
      </header>

      <main className="max-w-4xl mx-auto py-20 px-6">
        <AnimatePresence mode="wait">
          {step === 1 && (
            <motion.div 
              key="step1"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -20 }}
              className="text-center space-y-12"
            >
              <div className="space-y-4">
                 <div className="w-20 h-20 bg-slate-900 text-white rounded-[28px] flex items-center justify-center mx-auto shadow-2xl hover:scale-110 transition-transform cursor-pointer">
                    <Github size={40} />
                 </div>
                 <h1 className="text-4xl md:text-5xl font-black tracking-tighter">Build your portfolio <br /> from <span className="text-[#6C3CE1] italic">GitHub</span></h1>
                 <p className="text-slate-500 font-medium max-w-lg mx-auto">Connect your GitHub — we&apos;ll turn your repos into a beautiful project portfolio automatically.</p>
              </div>

              <div className="max-w-md mx-auto space-y-4">
                 <div className="relative group">
                    <Terminal className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-300 group-focus-within:text-[#6C3CE1] transition-colors" size={18} />
                    <input 
                      type="text" 
                      placeholder="Enter GitHub username"
                      value={username}
                      onChange={(e) => setUsername(e.target.value)}
                      className="w-full pl-12 pr-6 py-5 bg-slate-50 border border-slate-200 rounded-[28px] outline-none focus:border-[#6C3CE1]/30 focus:bg-white transition-all font-bold text-lg"
                    />
                 </div>
                 <button 
                   onClick={handleStartScan}
                   className="w-full py-5 bg-[#6C3CE1] text-white rounded-[28px] font-black uppercase tracking-[0.2em] shadow-xl shadow-purple-100 hover:scale-[1.02] active:scale-[0.98] transition-all flex items-center justify-center gap-3 group"
                 >
                    Start Scanner <Zap size={18} className="group-hover:animate-pulse" />
                 </button>
              </div>
              
              <div className="pt-12 grid grid-cols-1 md:grid-cols-2 gap-6 items-center text-left max-w-2xl mx-auto border-t border-slate-100">
                 <FeatureCheck label="README Analysis" desc="AI reads your code and docs to write project summaries." />
                 <FeatureCheck label="Tech Detection" desc="Auto-categorizes projects by stack and languages." />
                 <FeatureCheck label="Social Proof" desc="Syncs stars and activity to build credibility." />
                 <FeatureCheck label="Live Link Scanner" desc="Finds and attaches your deployed demo links." />
              </div>
            </motion.div>
          )}

          {step === 2 && (
            <motion.div 
              key="step2"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="flex flex-col items-center justify-center min-h-[400px] space-y-12"
            >
               <div className="relative">
                  <motion.div 
                    animate={{ rotate: 360 }}
                    transition={{ duration: 3, repeat: Infinity, ease: "linear" }}
                    className="w-32 h-32 border-4 border-slate-50 border-t-[#6C3CE1] rounded-full"
                  />
                  <div className="absolute inset-0 flex items-center justify-center">
                     <Cpu size={32} className="text-[#6C3CE1] animate-pulse" />
                  </div>
               </div>
               <div className="text-center space-y-2">
                  <h3 className="text-lg font-black uppercase tracking-[0.4em] text-[#6C3CE1] animate-pulse">{loadingText}</h3>
                  <p className="text-slate-400 font-medium">Accessing GitHub Intelligence Substrate...</p>
               </div>
            </motion.div>
          )}

          {step === 3 && (
            <motion.div 
              key="step3"
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              className="space-y-12"
            >
               <div className="flex flex-col md:flex-row md:items-end justify-between gap-6">
                  <div>
                     <h2 className="text-3xl font-black tracking-tight mb-2">Select your best projects</h2>
                     <p className="text-slate-500 font-medium">Pick up to 6 repositories to showcase on your iamfolio identity.</p>
                  </div>
                  <div className="px-4 py-2 bg-purple-50 text-[#6C3CE1] rounded-full text-[10px] font-black uppercase tracking-widest">
                     {selectedRepos.length} / 6 Selected
                  </div>
               </div>

               <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  {repos.map((repo, i) => (
                    <motion.div 
                      key={repo.name}
                      onClick={() => toggleRepo(repo.name)}
                      initial={{ opacity: 0, y: 10 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ delay: i * 0.1 }}
                      className={`p-8 rounded-[40px] border-2 transition-all cursor-pointer relative group ${selectedRepos.includes(repo.name) ? 'border-[#6C3CE1] bg-purple-50/20' : 'border-slate-100 bg-white hover:border-slate-200'}`}
                    >
                       <div className="flex justify-between items-start mb-6">
                          <div className={`w-12 h-12 rounded-2xl flex items-center justify-center border ${selectedRepos.includes(repo.name) ? 'bg-[#6C3CE1] text-white border-[#6C3CE1]' : 'bg-slate-50 border-slate-100 text-slate-400'}`}>
                             {selectedRepos.includes(repo.name) ? <CheckCircle2 size={24} /> : <Folder size={24} />}
                          </div>
                          {repo.recommended && (
                            <span className="px-3 py-1 bg-emerald-50 text-emerald-600 rounded-full text-[9px] font-black uppercase tracking-tight">AI Recommended</span>
                          )}
                       </div>
                       
                       <h3 className="text-xl font-black text-slate-900 mb-2 truncate">{repo.name.replace(/-/g, ' ')}</h3>
                       <p className="text-sm text-slate-500 font-medium leading-relaxed mb-6 line-clamp-2">{repo.desc}</p>
                       
                       <div className="flex flex-wrap gap-2 mb-6">
                          {repo.lang.map((l) => (
                            <span key={l} className="px-2 py-1 bg-white border border-slate-100 rounded-lg text-[9px] font-bold text-slate-400">{l}</span>
                          ))}
                       </div>

                       <div className="flex items-center justify-between pt-6 border-t border-slate-100">
                          <div className="flex items-center gap-3">
                             <div className="flex items-center gap-1.5 grayscale opacity-40">
                                <Star size={12} fill="currentColor" />
                                <span className="text-[10px] font-black tracking-widest">{repo.stars}</span>
                             </div>
                             <span className="text-[10px] font-black text-slate-300 uppercase tracking-widest leading-none mt-0.5">{repo.updated} ago</span>
                          </div>
                          <button className="p-2 text-slate-300 group-hover:text-[#6C3CE1] transition-colors">
                             <ArrowRight size={18} />
                          </button>
                       </div>
                    </motion.div>
                  ))}
               </div>

               <div className="pt-12 border-t border-slate-100 flex flex-col md:flex-row gap-6">
                  <button 
                    onClick={() => router.push('/dashboard')}
                    className="flex-1 py-5 bg-slate-100 text-slate-600 rounded-3xl font-black uppercase tracking-widest hover:bg-slate-200 transition-all"
                  >
                     Skip Portfolio
                  </button>
                  <button 
                    onClick={() => router.push('/dashboard')}
                    className="flex-[2] py-5 bg-[#6C3CE1] text-white rounded-3xl font-black uppercase tracking-widest shadow-xl shadow-purple-100 hover:scale-[1.02] active:scale-[0.98] transition-all flex items-center justify-center gap-3"
                  >
                     Deploy Identity Substrate <Sparkles size={18} />
                  </button>
               </div>
            </motion.div>
          )}
        </AnimatePresence>
      </main>
    </div>
  );
}

function FeatureCheck({ label, desc }: { label: string, desc: string }) {
  return (
    <div className="flex gap-4 items-start">
       <div className="w-6 h-6 rounded-full bg-emerald-50 border border-emerald-100 flex items-center justify-center text-emerald-500 shrink-0">
          <CheckCircle2 size={14} />
       </div>
       <div>
          <h4 className="text-xs font-black uppercase tracking-widest text-slate-900 mb-1">{label}</h4>
          <p className="text-[11px] text-slate-400 font-medium leading-relaxed">{desc}</p>
       </div>
    </div>
  );
}
