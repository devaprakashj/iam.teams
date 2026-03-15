"use client";

import React, { useState, useEffect, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { 
  ArrowLeft, 
  Save, 
  ChevronRight, 
  Check, 
  Sparkles, 
  Plus, 
  Trash2, 
  GripVertical, 
  Download, 
  Share2, 
  FileText, 
  Eye, 
  Target, 
  Zap, 
  Search,
  Monitor,
  Printer,
  ChevronDown,
  Layout as LayoutIcon,
  Palette,
  Type,
  FileCheck,
  Briefcase,
  Layers,
  AlertCircle
} from 'lucide-react';
import Link from 'next/link';

// --- Types ---

interface Experience {
  id: string;
  role: string;
  company: string;
  location: string;
  start: string;
  end: string;
  current: boolean;
  bullets: string[];
}

interface Education {
  id: string;
  degree: string;
  field: string;
  institution: string;
  location: string;
  start: string;
  end: string;
  grade: string;
}

interface Certification {
  id: string;
  name: string;
  issuer: string;
  year: string;
}

interface Project {
  id: string;
  title: string;
  description: string;
  tech: string[];
  link: string;
}

interface ResumeData {
  basic: {
    name: string;
    title: string;
    email: string;
    phone: string;
    location: string;
    linkedin: string;
    github: string;
    portfolio: string;
  };
  summary: string;
  experience: Experience[];
  skills: {
    technical: string[];
    tools: string[];
    soft: string[];
  };
  education: Education[];
  certifications: Certification[];
  projects: Project[];
  preferences: {
    template: string;
    color: string;
    font: string;
    pages: number;
    sections: {
      summary: boolean;
      experience: boolean;
      skills: boolean;
      education: boolean;
      certifications: boolean;
      languages: boolean;
      references: boolean;
    };
  };
}

// --- Initial Data (Devaprakash J) ---

const initialData: ResumeData = {
  basic: {
    name: "Devaprakash J",
    title: "AI/ML & Full Stack Developer",
    email: "devaprakashofficial@gmail.com",
    phone: "+91 9150536442",
    location: "Chennai, Tamil Nadu, India",
    linkedin: "linkedin.com/in/devaprakashj",
    github: "github.com/devaprakashofficial",
    portfolio: "iamfolio.in/devaprakash",
  },
  summary: "AI/ML & Full Stack Developer with 4+ years of freelance experience on Fiverr and Upwork. Skilled in Python, Machine Learning, React, Node.js, and Firebase. Built and deployed end-to-end web applications for startup clients. Currently pursuing B.Tech CSE (AI & ML) at Rajalakshmi Institute of Technology. Open to internships and collaborations.",
  experience: [
    {
      id: "1",
      role: "AI Software Developer",
      company: "Upwork",
      location: "Chennai, India",
      start: "Jul 2024",
      end: "Present",
      current: true,
      bullets: [
        "Developed and deployed AI/ML models for international clients on Upwork platform",
        "Built end-to-end machine learning pipelines using Python and scikit-learn",
        "Delivered 15+ AI projects with 5-star client ratings"
      ]
    },
    {
      id: "2",
      role: "Full Stack Developer",
      company: "Fiverr",
      location: "Remote",
      start: "Apr 2021",
      end: "Present",
      current: true,
      bullets: [
        "Developed 50+ web applications for startup clients using React, Node.js, and Firebase",
        "Maintained 4.9/5 star rating across 4+ years on the platform",
        "Delivered full-stack solutions from UI design to cloud deployment"
      ]
    },
    {
      id: "3",
      role: "Artificial Intelligence Consultant",
      company: "Amazon Mechanical Turk",
      location: "Remote — New York, US",
      start: "May 2025",
      end: "Present",
      current: true,
      bullets: [
        "Provided AI consulting services and data annotation for ML model training",
        "Evaluated AI model outputs for accuracy and quality assurance"
      ]
    },
    {
      id: "4",
      role: "Machine Learning Intern",
      company: "Codec Technologies India",
      location: "Chennai",
      start: "Jun 2025",
      end: "Jun 2025",
      current: false,
      bullets: [
        "Built ML models for real-world business use cases",
        "Implemented data preprocessing pipelines using Pandas and scikit-learn"
      ]
    },
    {
      id: "5",
      role: "Business Analytics Intern",
      company: "Codec Technologies India",
      location: "Chennai",
      start: "Feb 2025",
      end: "Jun 2025",
      current: false,
      bullets: [
        "Created Tableau dashboards for business KPI tracking and reporting",
        "Analysed large datasets using Python and Pandas for insights"
      ]
    },
    {
      id: "6",
      role: "Vice President",
      company: "TechSpark Club — RIT",
      location: "Chennai",
      start: "Jun 2025",
      end: "Present",
      current: true,
      bullets: [
        "Led technical club with 200+ student members",
        "Organized hackathons, workshops, and tech events at college level"
      ]
    },
    {
      id: "7",
      role: "Campus Ambassador",
      company: "Great Learning",
      location: "Chennai",
      start: "Jul 2025",
      end: "Present",
      current: true,
      bullets: [
        "Promoted tech learning programs to 500+ college students",
        "Organized webinars and career guidance sessions on campus"
      ]
    }
  ],
  skills: {
    technical: ["Python", "Machine Learning", "React", "Node.js", "Firebase", "Pandas", "Matplotlib", "yfinance API", "Deep Learning", "HTML", "CSS", "JavaScript"],
    tools: ["Tableau", "Git", "VS Code", "Jupyter Notebook"],
    soft: ["Problem Solving", "Team Leadership", "Client Communication"]
  },
  education: [
    {
      id: "e1",
      degree: "Bachelor of Technology",
      field: "Computer Science & Engineering (AI & ML)",
      institution: "Rajalakshmi Institute of Technology",
      location: "Chennai, Tamil Nadu",
      start: "Sep 2024",
      end: "Oct 2028 (Expected)",
      grade: ""
    },
    {
      id: "e2",
      degree: "Higher Secondary",
      field: "Science",
      institution: "Model School Ramapuram",
      location: "Chennai",
      start: "May 2017",
      end: "Mar 2024",
      grade: ""
    }
  ],
  certifications: [
    { id: "c1", name: "Tableau Desktop Certified Professional", issuer: "Tableau/Salesforce", year: "2024" },
    { id: "c2", name: "Developer & Technology Job Simulation", issuer: "Accenture UK", year: "2024" },
    { id: "c3", name: "Ethical Hacking: Web App Hacking", issuer: "Udemy", year: "2024" },
    { id: "c4", name: "Certificate of Excellence — Engineering Quiz", issuer: "Feb 2025", year: "2025" },
    { id: "c5", name: "Certificate of Participation — Management Quiz", issuer: "Feb 2025", year: "2025" }
  ],
  projects: [
    {
      id: "p1",
      title: "AI-Powered Stock Analyzer",
      description: "Implemented sentiment analysis and predictive modeling for stock market trends using Python & yfinance.",
      tech: ["Python", "yfinance", "NLTK", "Scikit-learn"],
      link: "https://github.com/devaprakashj/stock-analyzer"
    },
    {
      id: "p2",
      title: "SafeHome IoT System",
      description: "Developed a smart domestic security system with real-time alerts and cloud integration using Firebase.",
      tech: ["React", "Firebase", "Node.js", "Arduino"],
      link: "https://github.com/devaprakashj/safehome"
    }
  ],
  preferences: {
    template: "Dark Pro",
    color: "#6EE7B7",
    font: "Space Mono",
    pages: 1,
    sections: {
      summary: true,
      experience: true,
      skills: true,
      education: true,
      certifications: true,
      languages: false,
      references: false
    }
  }
};

// --- Main Page Component ---

export default function ResumeBuilderPage() {
  const [data, setData] = useState<ResumeData>(initialData);
  const [activeStep, setActiveStep] = useState(1);
  const [atsScore, setAtsScore] = useState(72);
  const [jdText, setJdText] = useState("");
  const [isBoosting, setIsBoosting] = useState(false);
  const [missingKeywords, setMissingKeywords] = useState<string[]>([]);
  const [foundKeywords, setFoundKeywords] = useState<string[]>([]);

  // Simulate ATS Boost
  useEffect(() => {
    const saved = localStorage.getItem('iamfolio-resume-draft');
    if (saved) {
      setData(JSON.parse(saved));
    }
  }, []);

  const saveDraft = () => {
    localStorage.setItem('iamfolio-resume-draft', JSON.stringify(data));
    alert("Draft saved to secure local storage.");
  };

  const exportPDF = async () => {
    const html2pdf = (await import('html2pdf.js')).default;
    const element = document.getElementById('resume-a4');
    const opt = {
      margin: 0,
      filename: `${data.basic.name.replace(' ', '_')}_Resume.pdf`,
      image: { type: 'jpeg', quality: 0.98 },
      html2canvas: { scale: 2, useCORS: true },
      jsPDF: { unit: 'in', format: 'letter', orientation: 'portrait' }
    };
    if (element) {
      html2pdf().set(opt as any).from(element).save();
    }
  };

  const handleAtsBoost = () => {
    if (!jdText) return;
    setIsBoosting(true);
    setTimeout(() => {
      const keywords = ["Python", "Machine Learning", "REST API", "Docker", "AWS", "Scikit-Learn", "TensorFlow", "FastAPI", "PostgreSQL", "React Native", "CI/CD", "Git"];
      setFoundKeywords(keywords.slice(0, 8));
      setMissingKeywords(keywords.slice(8));
      setAtsScore(91);
      setIsBoosting(false);
    }, 1500);
  };

  const steps = [
    { id: 1, title: "Basic Info", icon: Target },
    { id: 2, title: "Summary", icon: FileText },
    { id: 3, title: "Experience", icon: Briefcase },
    { id: 4, title: "Skills & Education", icon: Zap },
    { id: 5, title: "Download", icon: Download }
  ];

  const handleUpdate = (path: string, value: any) => {
    const keys = path.split('.');
    const newData = { ...data };
    let current: any = newData;
    for (let i = 0; i < keys.length - 1; i++) {
      current = current[keys[i]];
    }
    current[keys[keys.length - 1]] = value;
    setData(newData);
  };

  return (
    <div className="min-h-screen bg-[#0A0A0F] text-[#E2E8F0] font-mono selection:bg-[#6C3CE1]/30">
      {/* Navbar */}
      <nav className="sticky top-0 z-50 bg-[#0A0A0F]/80 backdrop-blur-md border-b border-[#1E1E2E] px-6 py-4">
        <div className="max-w-screen-2xl mx-auto flex justify-between items-center">
          <div className="flex items-center gap-4">
            <Link href="/" className="text-2xl font-black font-syne text-[#6C3CE1] hover:opacity-80 transition-opacity">
              iamfolio
            </Link>
            <div className="h-6 w-px bg-[#1E1E2E]" />
            <span className="text-[10px] font-bold uppercase tracking-[0.2em] text-[#64748B]">/ Resume-Builder</span>
          </div>
          <div className="flex items-center gap-6">
            <Link href="/dashboard" className="text-[10px] font-bold uppercase tracking-widest text-[#E2E8F0] hover:text-[#6C3CE1] transition-colors flex items-center gap-2">
              <ArrowLeft size={14} /> Back to Dashboard
            </Link>
            <button 
              onClick={saveDraft}
              className="px-5 py-2 bg-[#1E1E2E] border border-[#2E2E3E] rounded-md text-[10px] font-bold uppercase tracking-widest hover:bg-[#2E2E3E] transition-all flex items-center gap-2"
            >
              <Save size={14} /> Save Draft
            </button>
          </div>
        </div>
      </nav>

      <main className="max-w-screen-2xl mx-auto p-6 md:p-8 space-y-8">
        {/* ATS Job Target Input */}
        <section className="bg-[#111118]/80 border border-[#6EE7B7]/20 rounded-2xl overflow-hidden shadow-2xl">
          <div className="p-8 space-y-6">
            <div className="space-y-1">
              <h2 className="text-xl font-black font-syne text-[#E2E8F0] flex items-center gap-3">
                <Target className="text-[#6EE7B7]" size={24} /> Paste the job description to boost your ATS score
              </h2>
              <p className="text-sm text-[#64748B]">AI will match your resume keywords to this specific job requirement.</p>
            </div>
            
            <div className="relative group">
              <textarea 
                value={jdText}
                onChange={(e) => setJdText(e.target.value)}
                placeholder="Paste the job description (JD) here..."
                className="w-full h-32 bg-[#0A0A0F] border border-[#1E1E2E] rounded-xl p-4 text-sm focus:ring-2 focus:ring-[#6EE7B7]/20 focus:border-[#6EE7B7] transition-all outline-none resize-none placeholder:text-[#2E2E3E]"
              />
              <div className="absolute top-4 right-4 text-[10px] uppercase font-bold text-[#64748B] opacity-0 group-hover:opacity-100 transition-opacity">
                Shift + Enter to boost
              </div>
            </div>

            <div className="flex flex-col md:flex-row gap-4 items-center justify-between">
              <div className="flex flex-wrap gap-2">
                {foundKeywords.length > 0 ? (
                  foundKeywords.map((kw, i) => (
                    <span key={i} className="px-3 py-1 bg-[#6EE7B7]/10 border border-[#6EE7B7]/30 text-[#6EE7B7] text-[10px] font-bold uppercase rounded-full">
                      {kw} ✓
                    </span>
                  ))
                ) : (
                  <span className="text-[10px] uppercase font-bold text-[#64748B]">No context provided</span>
                )}
                {missingKeywords.length > 0 && (
                  missingKeywords.map((kw, i) => (
                    <span key={i} className="px-3 py-1 bg-[#EF4444]/10 border border-[#EF4444]/30 text-[#EF4444] text-[10px] font-bold uppercase rounded-full animate-pulse">
                      Missing: {kw}
                    </span>
                  ))
                )}
              </div>
              <div className="flex items-center gap-4">
                <button className="text-[10px] font-bold uppercase text-[#64748B] hover:text-[#E2E8F0] transition-colors">
                  Skip — Build general resume
                </button>
                <button 
                  onClick={handleAtsBoost}
                  disabled={isBoosting || !jdText}
                  className="px-8 py-3 bg-[#6EE7B7] text-[#0A0A0F] font-black text-xs uppercase tracking-[0.2em] rounded-lg hover:bg-[#6EE7B7]/80 disabled:opacity-50 disabled:cursor-not-allowed transition-all flex items-center gap-2 group shadow-[0_0_20px_#6EE7B733]"
                >
                  {isBoosting ? (
                    <>Processing AI Analysis...</>
                  ) : (
                    <>Analyze & Boost ATS <ChevronRight className="group-hover:translate-x-1 transition-transform" size={16} /></>
                  )}
                </button>
              </div>
            </div>
          </div>
        </section>

        {/* Progress Steps */}
        <section className="bg-[#111118] border border-[#1E1E2E] rounded-xl p-2">
          <div className="flex justify-between items-center px-4">
            {steps.map((step) => {
              const isActive = activeStep === step.id;
              const isDone = activeStep > step.id;
              return (
                <div 
                  key={step.id}
                  onClick={() => setActiveStep(step.id)}
                  className={`flex items-center gap-3 py-4 px-6 rounded-lg cursor-pointer transition-all ${
                    isActive ? 'bg-[#6EE7B7]/10 border border-[#6EE7B7]/30' : 'opacity-40 hover:opacity-100'
                  }`}
                >
                  <div className={`w-6 h-6 rounded-full flex items-center justify-center text-[10px] font-bold border ${
                    isDone ? 'bg-[#6EE7B7] border-[#6EE7B7] text-[#0A0A0F]' : 
                    isActive ? 'border-[#6EE7B7] text-[#6EE7B7]' : 'border-[#64748B] text-[#64748B]'
                  }`}>
                    {isDone ? <Check size={12} strokeWidth={4} /> : step.id}
                  </div>
                  <span className={`text-[10px] uppercase font-black tracking-widest hidden lg:block ${isActive ? 'text-[#6EE7B7]' : 'text-[#64748B]'}`}>
                    {step.title}
                  </span>
                </div>
              );
            })}
          </div>
        </section>

        <div className="grid grid-cols-1 xl:grid-cols-[45%_55%] gap-8 items-start">
          {/* Left Panel - Form */}
          <div className="space-y-8 h-[calc(100vh-400px)] overflow-y-auto pr-4 custom-scrollbar">
            <AnimatePresence mode="wait">
              {activeStep === 1 && (
                <motion.div 
                  key="step1"
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  exit={{ opacity: 0, x: 20 }}
                  className="space-y-8"
                >
                  <div className="space-y-2">
                    <h3 className="text-2xl font-black font-syne text-[#E2E8F0]">Basic Info</h3>
                    <div className="flex items-center gap-2">
                      <span className="text-[10px] font-bold text-[#64748B] uppercase">Auto-filled from your iamfolio profile</span>
                      <span className="px-2 py-0.5 bg-[#6EE7B7]/10 text-[#6EE7B7] text-[8px] font-bold uppercase rounded">Matched ✓</span>
                    </div>
                  </div>

                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <InputField label="Full Name" value={data.basic.name} onChange={(v) => handleUpdate('basic.name', v)} />
                    <InputField label="Job Title" value={data.basic.title} onChange={(v) => handleUpdate('basic.title', v)} />
                    <InputField label="Email Address" value={data.basic.email} onChange={(v) => handleUpdate('basic.email', v)} />
                    <InputField label="Phone Number" value={data.basic.phone} onChange={(v) => handleUpdate('basic.phone', v)} />
                    <InputField label="Location" value={data.basic.location} onChange={(v) => handleUpdate('basic.location', v)} />
                    <InputField label="LinkedIn URL" value={data.basic.linkedin} onChange={(v) => handleUpdate('basic.linkedin', v)} />
                    <InputField label="GitHub Profile" value={data.basic.github} onChange={(v) => handleUpdate('basic.github', v)} />
                    <InputField label="Portfolio Website" value={data.basic.portfolio} onChange={(v) => handleUpdate('basic.portfolio', v)} />
                  </div>
                </motion.div>
              )}

              {activeStep === 2 && (
                <motion.div 
                  key="step2"
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  exit={{ opacity: 0, x: 20 }}
                  className="space-y-8"
                >
                  <div className="space-y-2">
                    <h3 className="text-2xl font-black font-syne text-[#E2E8F0]">Professional Summary</h3>
                    <p className="text-xs text-[#64748B]">Summarize your technical career in 3-4 powerful lines.</p>
                  </div>

                  <div className="space-y-6">
                    <div className="relative group">
                      <textarea 
                        value={data.summary}
                        onChange={(e) => handleUpdate('summary', e.target.value)}
                        className="w-full h-48 bg-[#111118] border border-[#1E1E2E] rounded-xl p-6 text-sm focus:ring-2 focus:ring-[#6C3CE1]/20 focus:border-[#6C3CE1] transition-all outline-none resize-none leading-relaxed"
                      />
                      <div className="absolute bottom-4 right-6 flex gap-2">
                        <button className="px-3 py-1.5 bg-[#6C3CE1] text-white text-[9px] font-bold uppercase rounded-full flex items-center gap-1.5 hover:bg-[#6C3CE1]/80 shadow-lg shadow-[#6C3CE133]">
                          <Sparkles size={12} /> AI Rewrite ✨
                        </button>
                        <button className="px-3 py-1.5 bg-[#1E1E2E] text-white text-[9px] font-bold uppercase rounded-full flex items-center gap-1.5 hover:bg-[#2E2E3E]">
                          Shorter
                        </button>
                      </div>
                    </div>

                    <div className="flex justify-between items-center text-[10px] font-bold uppercase tracking-widest">
                       <span className={data.summary.split(' ').length > 80 ? 'text-[#EF4444]' : 'text-[#6EE7B7]'}>
                         Word Count: {data.summary.split(' ').length} / 80
                       </span>
                       <span className="text-[#64748B]">Impact Score: 8.4/10</span>
                    </div>
                  </div>
                </motion.div>
              )}

              {activeStep === 3 && (
                <motion.div 
                  key="step3"
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  exit={{ opacity: 0, x: 20 }}
                  className="space-y-8"
                >
                  <div className="flex justify-between items-center">
                    <div className="space-y-1">
                      <h3 className="text-2xl font-black font-syne text-[#E2E8F0]">Work Experience</h3>
                      <p className="text-[10px] font-bold text-[#64748B] uppercase">{data.experience.length} experiences imported — Reorder by dragging</p>
                    </div>
                    <button className="px-5 py-2.5 border border-[#6EE7B7]/20 text-[#6EE7B7] text-[10px] font-black uppercase tracking-widest rounded-lg hover:bg-[#6EE7B7]/5 transition-all flex items-center gap-2">
                      <Plus size={16} /> Add Experience
                    </button>
                  </div>

                  <div className="space-y-6">
                    {data.experience.map((exp, i) => (
                      <div 
                        key={exp.id}
                        className="p-6 bg-[#111118] border border-[#1E1E2E] rounded-xl space-y-4 group hover:border-[#6C3CE1]/30 transition-all relative overflow-hidden"
                      >
                         <div className="absolute left-0 top-0 bottom-0 w-1 bg-[#6C3CE1] opacity-0 group-hover:opacity-100 transition-opacity" />
                         <div className="flex justify-between items-start">
                            <div className="flex items-center gap-4">
                               <div className="cursor-grab text-[#2E2E3E] hover:text-[#64748B] transition-colors">
                                 <GripVertical size={20} />
                               </div>
                               <div>
                                  <h4 className="text-lg font-bold text-[#E2E8F0]">{exp.role}</h4>
                                  <p className="text-[10px] font-bold text-[#64748B] uppercase tracking-widest">{exp.company} // {exp.location}</p>
                               </div>
                            </div>
                            <div className="flex items-center gap-2">
                               <button className="p-2 text-[#2E2E3E] hover:text-[#EF4444] transition-colors"><Trash2 size={16} /></button>
                               <button className="p-2 text-[#2E2E3E] hover:text-[#E2E8F0] transition-colors"><ChevronDown size={16} /></button>
                            </div>
                         </div>
                         <div className="flex gap-4 text-[10px] font-bold text-[#64748B] uppercase">
                            <span>{exp.start} — {exp.end}</span>
                            {exp.current && <span className="text-[#6EE7B7]">{'{'} Current {'}'}</span>}
                         </div>
                         <div className="space-y-2">
                            {exp.bullets.map((bullet, bi) => (
                              <div key={bi} className="flex gap-3 text-sm text-[#64748B]">
                                 <span className="text-[#6C3CE1]">•</span>
                                 <p className="leading-relaxed">{bullet}</p>
                              </div>
                            ))}
                         </div>
                         <button className="px-3 py-1 bg-[#1E1E2E] text-[#6EE7B7] text-[8px] font-black uppercase rounded border border-transparent hover:border-[#6EE7B7]/20 transition-all flex items-center gap-1.5 ml-8 mt-2">
                           <Sparkles size={10} /> AI Improve ✨
                         </button>
                      </div>
                    ))}
                  </div>
                </motion.div>
              )}

              {activeStep === 4 && (
                <motion.div 
                  key="step4"
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  exit={{ opacity: 0, x: 20 }}
                  className="space-y-12"
                >
                  {/* Skills */}
                  <div className="space-y-6">
                    <div className="space-y-1">
                      <h3 className="text-2xl font-black font-syne text-[#E2E8F0]">Technical Arsenal</h3>
                      <p className="text-xs text-[#64748B]">Add keywords the recruiter will search for.</p>
                    </div>

                    <div className="space-y-4">
                       <TagInput 
                         label="Technical Skills" 
                         tags={data.skills.technical} 
                         onAdd={(t) => handleUpdate('skills.technical', [...data.skills.technical, t])}
                         onRemove={(t) => handleUpdate('skills.technical', data.skills.technical.filter(v => v !== t))}
                       />
                       <TagInput 
                         label="Tools & Platforms" 
                         tags={data.skills.tools} 
                         onAdd={(t) => handleUpdate('skills.tools', [...data.skills.tools, t])}
                         onRemove={(t) => handleUpdate('skills.tools', data.skills.tools.filter(v => v !== t))}
                       />
                       <div className="p-6 bg-[#6EE7B7]/5 border border-[#6EE7B7]/20 rounded-xl space-y-4">
                          <p className="text-[10px] font-black text-[#6EE7B7] uppercase tracking-widest flex items-center gap-2">
                            <Sparkles size={14} /> AI Suggestions (Based on Industry Target)
                          </p>
                          <div className="flex flex-wrap gap-2">
                             {["scikit-learn", "TensorFlow", "REST API", "Docker", "Kubernetes"].map(kw => (
                               <button key={kw} className="px-3 py-1.5 bg-[#0A0A0F] border border-[#1E1E2E] text-[10px] font-bold text-[#64748B] hover:text-[#6EE7B7] hover:border-[#6EE7B7]/30 transition-all rounded-lg">
                                 + {kw}
                               </button>
                             ))}
                          </div>
                       </div>
                    </div>
                  </div>

                  {/* Education */}
                  <div className="space-y-6">
                    <h3 className="text-2xl font-black font-syne text-[#E2E8F0]">Education</h3>
                    <div className="space-y-4">
                       {data.education.map(edu => (
                         <div key={edu.id} className="p-6 bg-[#111118] border border-[#1E1E2E] rounded-xl space-y-3 relative group">
                            <div className="flex justify-between items-start">
                               <div>
                                  <h4 className="text-lg font-bold text-[#E2E8F0]">{edu.degree}</h4>
                                  <p className="text-xs text-[#64748B] font-bold uppercase">{edu.institution} // {edu.location}</p>
                               </div>
                               <button className="p-2 text-[#2E2E3E] hover:text-[#EF4444] transition-colors opacity-0 group-hover:opacity-100"><Trash2 size={16} /></button>
                            </div>
                            <div className="text-[10px] font-bold text-[#64748B] uppercase">
                               {edu.start} — {edu.end}
                            </div>
                         </div>
                       ))}
                       <button className="w-full py-4 border-2 border-dashed border-[#1E1E2E] text-[#64748B] hover:border-[#6EE7B7]/30 hover:text-[#6EE7B7] transition-all rounded-xl text-xs font-bold uppercase tracking-[0.2em] flex items-center justify-center gap-2">
                          <Plus size={16} /> Add Education Level
                       </button>
                    </div>
                  </div>

                  {/* Certifications */}
                  <div className="space-y-6">
                    <h3 className="text-2xl font-black font-syne text-[#E2E8F0]">Certifications</h3>
                    <div className="space-y-3">
                       {data.certifications.map(cert => (
                         <div key={cert.id} className="flex items-center justify-between p-4 bg-[#111118] border border-[#1E1E2E] rounded-lg group">
                            <div className="flex items-center gap-4">
                               <div className="p-2 bg-[#6C3CE1]/10 rounded border border-[#6C3CE1]/20 text-[#6C3CE1]">
                                 <FileCheck size={16} />
                               </div>
                               <div className="space-y-0.5">
                                  <p className="text-xs font-bold text-[#E2E8F0]">{cert.name}</p>
                                  <p className="text-[9px] font-bold text-[#64748B] uppercase">{cert.issuer} • {cert.year}</p>
                               </div>
                            </div>
                            <button className="p-2 text-[#2E2E3E] hover:text-[#EF4444] transition-colors opacity-0 group-hover:opacity-100"><Trash2 size={14} /></button>
                         </div>
                       ))}
                    </div>
                  </div>

                  {/* Projects */}
                  <div className="space-y-6">
                    <h3 className="text-2xl font-black font-syne text-[#E2E8F0]">Projects</h3>
                    <div className="space-y-4">
                       {data.projects.map(proj => (
                         <div key={proj.id} className="p-6 bg-[#111118] border border-[#1E1E2E] rounded-xl space-y-3 relative group">
                            <div className="flex justify-between items-start">
                               <div>
                                  <h4 className="text-lg font-bold text-[#E2E8F0]">{proj.title}</h4>
                                  <p className="text-xs text-[#64748B] font-medium leading-relaxed">{proj.description}</p>
                               </div>
                               <button className="p-2 text-[#2E2E3E] hover:text-[#EF4444] transition-colors opacity-0 group-hover:opacity-100"><Trash2 size={16} /></button>
                            </div>
                            <div className="flex flex-wrap gap-1.5">
                               {proj.tech.map(t => (
                                 <span key={t} className="px-2 py-0.5 bg-white/5 text-[8px] font-bold text-white/40 uppercase rounded">{t}</span>
                               ))}
                            </div>
                         </div>
                       ))}
                       <button className="w-full py-4 border-2 border-dashed border-[#1E1E2E] text-[#64748B] hover:border-[#6EE7B7]/30 hover:text-[#6EE7B7] transition-all rounded-xl text-xs font-bold uppercase tracking-[0.2em] flex items-center justify-center gap-2">
                          <Plus size={16} /> Add Project
                       </button>
                    </div>
                  </div>
                </motion.div>
              )}

              {activeStep === 5 && (
                <motion.div 
                  key="step5"
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  exit={{ opacity: 0, x: 20 }}
                  className="space-y-12"
                >
                  <div className="space-y-2">
                    <h3 className="text-2xl font-black font-syne text-[#E2E8F0]">Final Polish</h3>
                    <p className="text-xs text-[#64748B]">Tailor the visual identity of your career manifest.</p>
                  </div>

                  {/* Template Picker */}
                  <div className="space-y-6">
                     <div className="flex items-center gap-2">
                        <LayoutIcon className="text-[#6EE7B7]" size={18} />
                        <h4 className="text-[10px] uppercase font-black tracking-[0.2em] text-[#E2E8F0]">Selected Template</h4>
                     </div>
                     <div className="flex overflow-x-auto gap-4 pb-4 custom-scrollbar">
                        {[
                          { name: 'Dark Pro', desc: 'Modern & High Contrast' },
                          { name: 'Classic', desc: 'Traditional ATS Style' },
                          { name: 'Modern', desc: 'Clean White Layout' },
                          { name: 'Minimal', desc: 'Maximum Readability' },
                          { name: 'Technical', desc: 'Code Focused' },
                          { name: 'Corporate', desc: 'Standard Business' },
                          { name: 'Creative', desc: 'Portfolio First' },
                          { name: 'Bold', desc: 'Full Color Impact' }
                        ].map((t) => (
                          <div 
                            key={t.name}
                            onClick={() => handleUpdate('preferences.template', t.name)}
                            className={`flex-shrink-0 w-40 h-52 rounded-xl border-2 cursor-pointer transition-all overflow-hidden ${
                              data.preferences.template === t.name ? 'border-[#6EE7B7] ring-4 ring-[#6EE7B7]/10' : 'border-[#1E1E2E] hover:border-[#6C3CE1]/50'
                            }`}
                          >
                             <div className={`h-3/4 bg-[#111118] p-4 flex flex-col gap-2 ${data.preferences.template === t.name ? 'opacity-100' : 'opacity-40'}`}>
                                <div className="w-full h-1 bg-[#6EE7B7]/20 rounded" />
                                <div className="w-2/3 h-1 bg-[#2E2E3E] rounded" />
                                <div className="space-y-1 pt-4">
                                   <div className="w-full h-1 bg-white/5 rounded" />
                                   <div className="w-full h-1 bg-white/5 rounded" />
                                   <div className="w-full h-1 bg-white/5 rounded" />
                                   <div className="w-full h-1 bg-white/5 rounded" />
                                </div>
                             </div>
                             <div className="h-1/4 bg-[#1E1E2E] p-2 text-center flex flex-col justify-center">
                                <p className="text-[9px] font-black uppercase text-white">{t.name}</p>
                                <p className="text-[7px] font-bold text-[#64748B] uppercase">{t.desc}</p>
                             </div>
                          </div>
                        ))}
                     </div>
                  </div>

                  <div className="grid grid-cols-2 gap-8">
                     <div className="space-y-4">
                        <div className="flex items-center gap-2">
                           <Palette className="text-[#6EE7B7]" size={18} />
                           <h4 className="text-[10px] uppercase font-black tracking-[0.2em] text-[#E2E8F0]">Accent Color</h4>
                        </div>
                        <div className="flex gap-3">
                           {["#6EE7B7", "#6C3CE1", "#0070C0", "#FF6B35", "#14B8A6", "#EF4444"].map(c => (
                             <button 
                               key={c}
                               onClick={() => handleUpdate('preferences.color', c)}
                               className={`w-8 h-8 rounded-full border-2 transition-all ${data.preferences.color === c ? 'scale-125 border-white' : 'border-transparent hover:scale-110'}`}
                               style={{ backgroundColor: c }}
                             />
                           ))}
                        </div>
                     </div>
                     <div className="space-y-4">
                        <div className="flex items-center gap-2">
                           <Type className="text-[#6EE7B7]" size={18} />
                           <h4 className="text-[10px] uppercase font-black tracking-[0.2em] text-[#E2E8F0]">Typography</h4>
                        </div>
                        <select 
                          value={data.preferences.font}
                          onChange={(e) => handleUpdate('preferences.font', e.target.value)}
                          className="w-full bg-[#111118] border border-[#1E1E2E] rounded-lg px-4 py-2 text-xs font-bold transition-all focus:ring-2 focus:ring-[#6EE7B7]/20 outline-none"
                        >
                           <option>Space Mono</option>
                           <option>Inter</option>
                           <option>System Default</option>
                           <option>Syne</option>
                        </select>
                     </div>
                  </div>

                  <div className="space-y-6">
                     <div className="flex items-center gap-2">
                        <Layers size={18} className="text-[#6EE7B7]" />
                        <h4 className="text-[10px] uppercase font-black tracking-[0.2em] text-[#E2E8F0]">Section Visibility</h4>
                     </div>
                     <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
                        {Object.entries(data.preferences.sections).map(([key, isEnabled]) => (
                          <button 
                            key={key}
                            onClick={() => handleUpdate(`preferences.sections.${key}`, !isEnabled)}
                            className={`flex items-center justify-between px-4 py-3 rounded-xl border text-[10px] font-black uppercase tracking-widest transition-all ${
                              isEnabled ? 'bg-[#6EE7B7]/10 border-[#6EE7B7]/30 text-[#6EE7B7]' : 'bg-[#111118] border-[#1E1E2E] text-[#64748B]'
                            }`}
                          >
                            {key}
                            {isEnabled ? <Check size={14} /> : <Plus size={14} className="opacity-40" />}
                          </button>
                        ))}
                     </div>
                  </div>
                </motion.div>
              )}
            </AnimatePresence>
            
            <div className="pt-12 flex justify-between items-center border-t border-[#1E1E2E]">
               <button 
                  onClick={() => setActiveStep(Math.max(1, activeStep - 1))}
                  className={`px-6 py-3 border border-[#1E1E2E] rounded-lg text-xs font-bold uppercase tracking-widest hover:bg-[#1E1E2E] transition-all flex items-center gap-3 ${activeStep === 1 ? 'opacity-0 pointer-events-none' : ''}`}
               >
                  <ArrowLeft size={16} /> Previous Step
               </button>
               <button 
                  onClick={() => setActiveStep(Math.min(5, activeStep + 1))}
                  className="px-10 py-4 bg-[#6C3CE1] text-white font-black text-xs uppercase tracking-[0.3em] rounded-lg hover:bg-[#6C3CE1]/80 transition-all flex items-center gap-3 shadow-[0_0_20px_#6C3CE133]"
               >
                  {activeStep === 5 ? 'Finish & Save ✓' : 'Next Step'} <ChevronRight size={18} />
               </button>
            </div>
          </div>

          {/* Right Panel - Live Preview */}
          <div className="sticky top-32 space-y-6">
            <div className="flex justify-between items-center">
               <div className="flex items-center gap-4">
                  <span className="text-[10px] font-black uppercase tracking-[0.4em] text-[#E2E8F0]">Live Preview</span>
                  <div className="px-3 py-1 bg-[#6EE7B7]/10 border border-[#6EE7B7]/30 text-[#6EE7B7] text-[10px] font-bold uppercase rounded-full flex items-center gap-2">
                    <Monitor size={12} /> Real-time Sync Active
                  </div>
               </div>
               <div className={`px-4 py-1.5 rounded-full border text-xs font-black transition-all ${
                 atsScore > 80 ? 'bg-[#6EE7B7]/10 border-[#6EE7B7] text-[#6EE7B7]' : 
                 atsScore > 60 ? 'bg-[#FFB020]/10 border-[#FFB020] text-[#FFB020]' : 'bg-[#EF4444]/10 border-[#EF4444] text-[#EF4444]'
               }`}>
                 ATS SCORE: {atsScore} / 100
               </div>
            </div>

            {/* Score Bars */}
            <div className="grid grid-cols-4 gap-4 p-4 bg-[#111118]/50 border border-[#1E1E2E] rounded-xl">
               <ScoreItem label="Compatibility" value={94} color="#6EE7B7" />
               <ScoreItem label="Keywords" value={atsScore === 91 ? 87 : 56} color={atsScore === 91 ? '#6EE7B7' : '#FFB020'} />
               <ScoreItem label="Format" value={98} color="#6EE7B7" />
               <ScoreItem label="Readability" value={89} color="#6EE7B7" />
            </div>

            {/* Resume Paper Container */}
            <div className="bg-[#1E1E2E] p-10 rounded-2xl shadow-inner-xl max-h-[800px] overflow-y-auto overflow-x-hidden group relative">
              <div id="resume-a4" className="bg-white w-full min-h-[1100px] shadow-2xl origin-top transition-transform duration-500 scale-[1] group-hover:scale-[1.01]">
                {/* Resume Header */}
                <header className="p-10 text-white flex flex-col gap-4" style={{ backgroundColor: data.preferences.template === 'Dark Pro' ? '#1A1A2E' : '#FFFFFF', color: data.preferences.template === 'Dark Pro' ? '#FFFFFF' : '#000000' }}>
                   <div className="flex justify-between items-start">
                      <div className="space-y-1">
                         <h1 className="text-3xl font-black font-syne uppercase tracking-tighter leading-none" style={{ color: data.preferences.template === 'Dark Pro' ? '#FFFFFF' : '#000000' }}>
                           {data.basic.name || "YOUR NAME"}
                         </h1>
                         <p className="text-sm font-bold uppercase tracking-[0.2em]" style={{ color: data.preferences.color }}>
                           {data.basic.title || "Target Job Role"}
                         </p>
                      </div>
                      <div className="text-[9px] uppercase font-bold text-right opacity-60 leading-relaxed">
                         {data.basic.location}<br />
                         {data.basic.email}<br />
                         {data.basic.phone}
                      </div>
                   </div>
                   <div className="h-px w-full bg-white/10" />
                   <div className="flex justify-between items-center text-[7px] font-black uppercase tracking-[0.2em] opacity-80">
                      <span>{data.basic.linkedin}</span>
                      <span>{data.basic.github}</span>
                      <span>{data.basic.portfolio}</span>
                   </div>
                </header>

                <div className="p-10 space-y-8 text-[#1A1A2E] leading-relaxed">
                   {/* Summary Section */}
                   {data.preferences.sections.summary && (
                     <section className="space-y-3">
                        <h2 className="text-[10px] font-black uppercase tracking-[0.4em] border-b pb-2" style={{ color: data.preferences.color, borderColor: `${data.preferences.color}33` }}>Professional Summary</h2>
                        <p className="text-[10px] font-medium leading-[1.6] text-[#4A4A68]">
                          {data.summary || "Describe your professional story and impact here..."}
                        </p>
                     </section>
                   )}

                   {/* Experience Section */}
                   {data.preferences.sections.experience && (
                     <section className="space-y-6">
                        <h2 className="text-[10px] font-black uppercase tracking-[0.4em] border-b pb-2" style={{ color: data.preferences.color, borderColor: `${data.preferences.color}33` }}>Experience</h2>
                        <div className="space-y-5">
                           {(data.experience || []).map((exp, i) => (
                             <div key={i} className="space-y-2">
                                <div className="flex justify-between items-baseline">
                                   <div className="flex items-center gap-2">
                                      <span className="text-[11px] font-black uppercase tracking-tight text-[#1A1A2E]">{exp.role}</span>
                                      <span className="text-[10px] opacity-40">|</span>
                                      <span className="text-[10px] font-bold text-[#6B7280]">{exp.company}</span>
                                   </div>
                                   <span className="text-[9px] font-bold text-[#9CA3AF] uppercase tabular-nums">{exp.start} — {exp.end}</span>
                                </div>
                                <ul className="space-y-1 ml-1">
                                   {exp.bullets.map((b, bi) => (
                                     <li key={bi} className="text-[9px] text-[#4A4A68] flex gap-2">
                                        <span style={{ color: data.preferences.color }}>•</span>
                                        <span>{b}</span>
                                     </li>
                                   ))}
                                </ul>
                             </div>
                           ))}
                        </div>
                     </section>
                   )}

                   {/* Skills Section */}
                   {data.preferences.sections.skills && (
                     <section className="space-y-4">
                        <h2 className="text-[10px] font-black uppercase tracking-[0.4em] border-b pb-2" style={{ color: data.preferences.color, borderColor: `${data.preferences.color}33` }}>Skills</h2>
                        <div className="grid grid-cols-1 gap-2">
                           <div className="flex gap-2 items-start">
                              <span className="text-[8px] font-black uppercase text-[#9CA3AF] min-w-[70px] pt-0.5">Technical:</span>
                              <div className="flex flex-wrap gap-1">
                                 {data.skills.technical.map((s, i) => (
                                   <span key={i} className="text-[9px] font-bold text-[#1A1A2E]">{s}{i < data.skills.technical.length - 1 ? ',' : ''}</span>
                                 ))}
                              </div>
                           </div>
                           <div className="flex gap-2 items-start">
                              <span className="text-[8px] font-black uppercase text-[#9CA3AF] min-w-[70px] pt-0.5">Tools:</span>
                              <div className="flex flex-wrap gap-1">
                                 {data.skills.tools.map((s, i) => (
                                   <span key={i} className="text-[9px] font-bold text-[#1A1A2E]">{s}{i < data.skills.tools.length - 1 ? ',' : ''}</span>
                                 ))}
                              </div>
                           </div>
                        </div>
                     </section>
                   )}

                   <div className="grid grid-cols-2 gap-10">
                      {/* Education Section */}
                      {data.preferences.sections.education && (
                        <section className="space-y-4">
                           <h2 className="text-[10px] font-black uppercase tracking-[0.4em] border-b pb-2" style={{ color: data.preferences.color, borderColor: `${data.preferences.color}33` }}>Education</h2>
                           <div className="space-y-4">
                              {(data.education || []).map((edu, i) => (
                                <div key={i} className="space-y-1">
                                   <p className="text-[10px] font-black text-[#1A1A2E] leading-tight uppercase tracking-tight">{edu.degree}</p>
                                   <p className="text-[9px] font-bold text-[#6B7280]">{edu.institution}</p>
                                   <p className="text-[8px] font-bold text-[#9CA3AF]">{edu.start} — {edu.end}</p>
                                </div>
                              ))}
                           </div>
                        </section>
                      )}

                      {/* Certifications Section */}
                      {data.preferences.sections.certifications && (
                        <section className="space-y-4">
                           <h2 className="text-[10px] font-black uppercase tracking-[0.4em] border-b pb-2" style={{ color: data.preferences.color, borderColor: `${data.preferences.color}33` }}>Certifications</h2>
                           <div className="space-y-2">
                              {data.certifications.map((cert, i) => (
                                <div key={i} className="flex gap-2 items-start">
                                   <span className="text-[12px]" style={{ color: data.preferences.color }}>✓</span>
                                   <div className="space-y-px">
                                      <p className="text-[9px] font-bold text-[#1A1A2E]">{cert.name}</p>
                                      <p className="text-[7px] font-black text-[#6B7280] uppercase tracking-tighter">{cert.issuer} • {cert.year}</p>
                                   </div>
                                </div>
                              ))}
                           </div>
                        </section>
                      )}
                   </div>

                   {/* Projects Section */}
                   <section className="space-y-4">
                      <h2 className="text-[10px] font-black uppercase tracking-[0.4em] border-b pb-2" style={{ color: data.preferences.color, borderColor: `${data.preferences.color}33` }}>Key Projects</h2>
                      <div className="grid grid-cols-1 gap-4">
                         {data.projects.map((proj, i) => (
                           <div key={i} className="space-y-1">
                              <div className="flex justify-between items-baseline">
                                 <span className="text-[10px] font-black uppercase tracking-tight text-[#1A1A2E]">{proj.title}</span>
                                 <span className="text-[8px] font-bold text-[#9CA3AF] italic">{proj.tech.join(' • ')}</span>
                              </div>
                              <p className="text-[9px] text-[#4A4A68] leading-tight">{proj.description}</p>
                           </div>
                         ))}
                      </div>
                   </section>
                </div>
              </div>

              {/* Sticky Hover Controls for Preview */}
              <div className="absolute inset-0 flex items-center justify-center bg-[#0A0A0F]/60 opacity-0 group-hover:opacity-100 transition-opacity pointer-events-none">
                 <div className="p-8 bg-[#111118] border border-[#6EE7B7]/20 rounded-2xl flex flex-col items-center gap-6 shadow-4xl pointer-events-auto">
                    <p className="text-xs font-black uppercase tracking-[0.3em] text-[#6EE7B7]">Preview Controller</p>
                    <div className="flex gap-4">
                       <button className="p-4 bg-[#1E1E2E] rounded-xl text-white hover:bg-[#6C3CE1] transition-all group/btn flex flex-col items-center gap-2">
                          <Eye size={20} />
                          <span className="text-[8px] font-bold uppercase tracking-widest opacity-0 group-hover/btn:opacity-100 transition-opacity">Zoom</span>
                       </button>
                       <button className="p-4 bg-[#1E1E2E] rounded-xl text-white hover:bg-[#6C3CE1] transition-all group/btn flex flex-col items-center gap-2">
                          <Printer size={20} />
                          <span className="text-[8px] font-bold uppercase tracking-widest opacity-0 group-hover/btn:opacity-100 transition-opacity">Print</span>
                       </button>
                    </div>
                 </div>
              </div>
            </div>

            {/* Final Action Bar */}
            <div className="p-6 bg-[#111118] border border-[#1E1E2E] rounded-2xl flex gap-4 shadow-2xl">
               <button 
                  onClick={exportPDF}
                  className="flex-1 py-4 bg-[#6C3CE1] text-white font-black text-[10px] uppercase tracking-[0.3em] rounded-xl hover:bg-[#6C3CE1]/80 transition-all flex items-center justify-center gap-3 shadow-[0_0_20px_#6C3CE144]"
               >
                  <Download size={18} /> Export PDF
               </button>
               <button className="px-6 py-4 border border-[#1E1E2E] text-[10px] font-black uppercase tracking-widest rounded-xl hover:bg-[#1E1E2E] transition-all flex items-center justify-center gap-2">
                  <Share2 size={16} /> Share
               </button>
               <button className="p-4 bg-[#FF6B35]/10 border border-[#FF6B35]/20 text-[#FF6B35] rounded-xl hover:bg-[#FF6B35] hover:text-white transition-all">
                  <Monitor size={20} />
               </button>
            </div>
          </div>
        </div>
      </main>

      {/* Global Styles */}
      <style jsx global>{`
        .custom-scrollbar::-webkit-scrollbar {
          width: 6px;
          height: 6px;
        }
        .custom-scrollbar::-webkit-scrollbar-track {
          background: #0A0A0F;
        }
        .custom-scrollbar::-webkit-scrollbar-thumb {
          background: #1E1E2E;
          border-radius: 10px;
        }
        .custom-scrollbar::-webkit-scrollbar-thumb:hover {
          background: #2E2E3E;
        }
        .shadow-inner-xl {
          box-shadow: inset 0 10px 30px 0 rgba(0, 0, 0, 0.4);
        }
      `}</style>
    </div>
  );
}

// --- Subcomponents ---

function InputField({ label, value, onChange }: { label: string, value: string, onChange: (v: string) => void }) {
  return (
    <div className="space-y-2">
      <label className="text-[10px] font-bold text-[#64748B] uppercase tracking-widest">{label}</label>
      <input 
        type="text"
        value={value}
        onChange={(e) => onChange(e.target.value)}
        className="w-full bg-[#111118] border border-[#1E1E2E] rounded-lg px-4 py-3 text-sm focus:ring-2 focus:ring-[#6EE7B7]/20 focus:border-[#6EE7B7] transition-all outline-none"
      />
    </div>
  );
}

function TagInput({ label, tags, onAdd, onRemove }: { label: string, tags: string[], onAdd: (t: string) => void, onRemove: (t: string) => void }) {
  const [input, setInput] = useState("");
  
  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter' && input.trim()) {
      onAdd(input.trim());
      setInput("");
    }
  };

  return (
    <div className="space-y-3">
      <label className="text-[10px] font-bold text-[#64748B] uppercase tracking-widest">{label}</label>
      <div className="p-4 bg-[#111118] border border-[#1E1E2E] rounded-xl space-y-4">
        <div className="flex flex-wrap gap-2">
          {tags.map((tag, i) => (
            <span key={i} className="px-3 py-1.5 bg-[#1E1E2E] border border-[#2E2E3E] text-[10px] font-bold text-[#E2E8F0] uppercase rounded-lg flex items-center gap-2 group">
              {tag}
              <button onClick={() => onRemove(tag)} className="text-[#64748B] hover:text-[#EF4444] transition-colors"><Trash2 size={12} /></button>
            </span>
          ))}
          <input 
            type="text"
            value={input}
            onChange={(e) => setInput(e.target.value)}
            onKeyDown={handleKeyDown}
            placeholder="+ Add skill..."
            className="flex-1 bg-transparent border-none outline-none text-[10px] font-bold uppercase tracking-widest text-[#E2E8F0] min-w-[120px]"
          />
        </div>
      </div>
    </div>
  );
}

function ScoreItem({ label, value, color }: { label: string, value: number, color: string }) {
  return (
    <div className="space-y-2">
       <div className="flex justify-between items-center text-[7px] font-black uppercase tracking-tighter text-[#64748B]">
          <span>{label}</span>
          <span style={{ color }}>{value}%</span>
       </div>
       <div className="h-1 w-full bg-[#1E1E2E] rounded-full overflow-hidden">
          <motion.div 
            initial={{ width: 0 }}
            animate={{ width: `${value}%` }}
            transition={{ duration: 1, ease: "easeOut" }}
            className="h-full rounded-full"
            style={{ backgroundColor: color }}
          />
       </div>
    </div>
  );
}
