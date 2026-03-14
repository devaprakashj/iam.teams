"use client";
import React, { useRef } from 'react';
import { motion } from 'framer-motion';
import { ChevronLeft, ChevronRight, Zap, Star } from 'lucide-react';
const templates = [
  { name: 'Olesia Pro', color: 'bg-blue-600', layout: 'modern-blue', tag: 'Best Seller' },
  { name: 'John Carter', color: 'bg-emerald-500', layout: 'creative-green', tag: 'Creative' },
  { name: 'Steve Jobs', color: 'bg-[#1e293b]', layout: 'corporate-navy', tag: 'Executive' },
  { name: 'Alex Laurens', color: 'bg-black', layout: 'clean-black' },
  { name: 'Aparna Das', color: 'bg-yellow-400', layout: 'bold-yellow', tag: 'New' },
  { name: 'Hellen Pro', color: 'bg-pink-500', layout: 'elegant-centered' },
  { name: 'Tech Core', color: 'bg-slate-900', layout: 'dark-grid' },
  { name: 'Minimalist', color: 'bg-slate-100', layout: 'standard' },
];

export const TemplateGallery = () => {
  const scrollRef = useRef<HTMLDivElement>(null);

  const scroll = (direction: 'left' | 'right') => {
    if (scrollRef.current) {
      const { scrollLeft, clientWidth } = scrollRef.current;
      const scrollTo = direction === 'left' ? scrollLeft - clientWidth / 2 : scrollLeft + clientWidth / 2;
      scrollRef.current.scrollTo({ left: scrollTo, behavior: 'smooth' });
    }
  };

  const renderLayout = (type: string, color: string) => {
    const sectionHeading = "text-[6px] font-black text-dark uppercase tracking-widest border-b border-gray-100 pb-1 mb-2";
    const bodyText = "text-[4.5px] text-gray-text leading-tight";
    const boldText = "text-[4.8px] font-bold text-dark";

    const Avatar = ({ initials, className = "" }: { initials: string, className?: string }) => (
      <div className={`w-10 h-10 rounded-full flex items-center justify-center text-[10px] font-black shadow-sm ${className}`}>
        {initials}
      </div>
    );

    const StarRating = ({ rating }: { rating: number }) => (
      <div className="flex gap-0.5 mt-0.5">
        {[1, 2, 3, 4, 5].map(i => (
          <div key={i} className={`w-1 h-1 rounded-full ${i <= rating ? 'bg-primary' : 'bg-gray-200'}`}></div>
        ))}
      </div>
    );

    const ProgressBar = ({ progress, color = "bg-primary" }: { progress: number, color?: string }) => (
      <div className="w-full h-1 bg-gray-100 rounded-full overflow-hidden mt-1">
        <div className={`h-full ${color}`} style={{ width: `${progress}%` }}></div>
      </div>
    );

    switch (type) {
      case 'modern-blue':
        return (
          <div className="h-full flex flex-col bg-white">
            <div className={`h-1.5 w-full ${color}`}></div>
            <div className="p-5 flex-1 space-y-4 overflow-hidden">
              <div className="flex justify-between items-start">
                <div className="space-y-1">
                  <h4 className="text-[11px] font-black text-blue-600 tracking-tighter uppercase leading-none">Priya Sharma</h4>
                  <p className="text-[5px] text-gray-400 font-bold tracking-widest uppercase">Senior Product Designer · 6+ Years</p>
                </div>
                <Avatar initials="PS" className="bg-blue-50 text-blue-600 border-2 border-blue-100" />
              </div>
              <div className="space-y-3">
                 <div>
                    <p className={sectionHeading}>Executive Profile</p>
                    <p className={bodyText}>Design leader specializing in enterprise SaaS ecosystems. Expert in converging business logic with user empathy to build interfaces that scale to millions of concurrent users. Proven track record in reducing churn by 25%.</p>
                 </div>
                 <div>
                    <p className={sectionHeading}>Core Experience</p>
                    <div className="space-y-2.5">
                       <div>
                          <p className={boldText}>Lead Product Designer · Zoho Corporation</p>
                          <p className="text-[3.5px] text-gray-400 font-bold">Jan 2022 – Present · Chennai, India</p>
                          <p className={bodyText}>Architected the Apollo Design System which synchronized UI patterns across 45+ enterprise apps, reducing front-end debt by $200k/year and increasing dev velocity by 40%.</p>
                       </div>
                       <div>
                          <p className={boldText}>UX Designer · Microsoft India (Contract)</p>
                          <p className="text-[3.5px] text-gray-400 font-bold">June 2019 – Dec 2021 · Bangalore</p>
                          <p className={bodyText}>Conducted high-fidelity usability audits for the Azure Billing Dashboard, identifying critical friction points for enterprise administrators and improving NPS by 12 points.</p>
                       </div>
                    </div>
                 </div>
                 <div className="grid grid-cols-2 gap-4">
                    <div>
                        <p className={sectionHeading}>Strategic Skills</p>
                        <div className="space-y-2">
                           {['Product Strategy', 'Systems Thinking', 'User Research'].map(s => (
                             <div key={s}>
                                <p className="text-[4px] font-bold">{s}</p>
                                <ProgressBar progress={s === 'Product Strategy' ? 95 : 85} color="bg-blue-500" />
                             </div>
                           ))}
                        </div>
                    </div>
                    <div>
                        <p className={sectionHeading}>Certifications</p>
                        <ul className="list-disc list-inside text-[3.8px] text-gray-500 space-y-1">
                           <li>HCI Certified Professional</li>
                           <li>Google UX Design Expert</li>
                           <li>Advanced Design Ops 2.0</li>
                        </ul>
                    </div>
                 </div>
              </div>
            </div>
          </div>
        );
      case 'creative-green':
        return (
          <div className="h-full flex bg-white overflow-hidden">
            <div className="w-[38%] bg-slate-50 p-4 space-y-5 border-r border-gray-100">
               <Avatar initials="PS" className="bg-emerald-500 text-white w-12 h-12 text-[12px] mx-auto rounded-lg shadow-emerald-200 shadow-lg" />
               <div className="space-y-4">
                  <div>
                    <p className="text-[5.5px] font-black text-emerald-600 uppercase tracking-widest mb-1.5 border-b border-emerald-100 pb-0.5">Contact Meta</p>
                    <p className="text-[4px] font-bold text-dark">priya@iamfolio.in</p>
                    <p className="text-[4px] font-bold text-dark">+91 98450 12345</p>
                    <p className="text-[4px] text-gray-400">Bangalore, IN</p>
                  </div>
                  <div>
                    <p className="text-[5.5px] font-black text-emerald-600 uppercase tracking-widest mb-1.5 border-b border-emerald-100 pb-0.5">Core Arsenal</p>
                    <div className="space-y-1.5">
                       {['Interface Design', 'Prototyping', 'Motion Graphics', 'User Testing'].map(s => (
                         <div key={s}>
                            <p className="text-[3.8px] font-bold text-dark">{s}</p>
                            <StarRating rating={s === 'User Testing' ? 4 : 5} />
                         </div>
                       ))}
                    </div>
                  </div>
                  <div>
                    <p className="text-[5.5px] font-black text-emerald-600 uppercase tracking-widest mb-1.5 border-b border-emerald-100 pb-0.5">Languages</p>
                    <p className="text-[4px] font-bold text-dark">English (Native), Tamil (Fluent), Hindi</p>
                  </div>
               </div>
            </div>
            <div className="flex-1 p-6 space-y-5">
               <div className="border-l-4 border-emerald-500 pl-3">
                  <h4 className="text-[12px] font-black text-dark tracking-tight leading-none uppercase">Priya Sharma</h4>
                  <p className="text-[5px] text-emerald-600 font-black uppercase tracking-widest mt-1">Growth Designer & Strategist</p>
               </div>
               <div className="space-y-4">
                  <div>
                    <p className={sectionHeading}>Professional Narrative</p>
                    <div className="space-y-3">
                       <div>
                          <p className={boldText}>Sr. Experience Lead · Razorpay</p>
                          <p className="text-[3.5px] text-gray-400 font-bold">2021 – Present</p>
                          <p className={bodyText}>Spearheaded the redesign of the merchant checkout flow used by 12M+ businesses. Increased conversion rates by 8% through behavioral psychology optimizations.</p>
                       </div>
                       <div>
                          <p className={boldText}>Product Designer · Freshworks</p>
                          <p className="text-[3.5px] text-gray-400 font-bold">2018 – 2021</p>
                          <p className={bodyText}>Redesigned the core CRM ticketing interface, reducing average time-to-close by 18%. Collaborated with 50+ engineers globally.</p>
                       </div>
                    </div>
                  </div>
                  <div>
                    <p className={sectionHeading}>Key Projects</p>
                    <div className="space-y-2">
                       <p className={bodyText}><span className="font-bold text-dark">Project Nebula:</span> A high-concurrency real-time dashboard for 2M+ active fintech users.</p>
                       <p className={bodyText}><span className="font-bold text-dark">Apollo V3:</span> Comprehensive design system implementation for cross-platform apps.</p>
                    </div>
                  </div>
                  <div>
                    <p className={sectionHeading}>Academic Foundation</p>
                    <p className={boldText}>B.Des in Communication Design</p>
                    <p className={bodyText}>National Institute of Design (NID) · GPA 9.2/10</p>
                  </div>
               </div>
            </div>
          </div>
        );
      case 'corporate-navy':
        return (
          <div className="h-full flex flex-col bg-white overflow-hidden">
            <div className={`h-16 flex items-center px-6 gap-4 ${color} shadow-lg shadow-slate-200`}>
               <Avatar initials="PS" className="bg-white/10 text-white w-10 h-10 border border-white/20 font-black italic shadow-inner" />
               <div>
                  <h4 className="text-[11px] font-black text-white tracking-widest uppercase mb-0.5">PRIYA SHARMA</h4>
                  <p className="text-[4.8px] text-blue-200 font-bold uppercase tracking-[0.2em]">Principal Experience Designer</p>
               </div>
            </div>
            <div className="p-6 flex-1 grid grid-cols-12 gap-8">
               <div className="col-span-8 space-y-5">
                  <div>
                     <p className={sectionHeading}>Professional Brief</p>
                     <p className={bodyText}>Senior Design Strategist with a decade of experience in building enterprise-grade software. Specialist in human-centered AI, complex data visualization, and design-to-development handoff optimization.</p>
                  </div>
                  <div>
                     <p className={sectionHeading}>Notable Impact</p>
                     <div className="space-y-3.5">
                        {[1, 2, 3].map(i => (
                          <div key={i}>
                             <p className={boldText}>{i === 1 ? 'Design Partner · Google Cloud' : i === 2 ? 'Sr. UX Architect · IBM Watson' : 'UX Lead · Zoho'}</p>
                             <p className="text-[3.5px] text-gray-400 uppercase font-black mb-1">{i === 1 ? '2022-Pres' : i === 2 ? '2019-2022' : '2017-2019'}</p>
                             <p className={bodyText}>{i === 1 ? 'Leading design for cloud database infrastructure used by Fortune 500 companies.' : i === 2 ? 'Designed the interaction model for AI-powered oncology diagnosis tools.' : 'Architected the core UI of Zoho CRM, impacting 10M+ global users.'}</p>
                          </div>
                        ))}
                     </div>
                  </div>
                  <div>
                     <p className={sectionHeading}>Key Achievements</p>
                     <ul className="list-disc list-inside text-[4.2px] text-gray-500 space-y-1">
                        <li>Won Red Dot Design Award 2023 for Project "Aura".</li>
                        <li>Reduced front-end dev time by 35% through standardized tokens.</li>
                        <li>Mentored 15+ junior designers into mid-level positions.</li>
                     </ul>
                  </div>
               </div>
               <div className="col-span-4 space-y-5 border-l border-gray-50 pl-6">
                  <div>
                     <p className={sectionHeading}>Technical Arsenal</p>
                     <div className="space-y-2">
                        {['Strategy', 'Design Ops', 'Systems Archetype', 'Data viz', 'AI/ML UX'].map(s => (
                          <div key={s} className="bg-slate-50 p-2 rounded-sm border-l-2 border-[#1e293b]">
                             <p className="text-[4px] font-black text-dark">{s}</p>
                          </div>
                        ))}
                     </div>
                  </div>
                  <div>
                     <p className={sectionHeading}>Recognition</p>
                     <div className="space-y-2">
                        <div className="p-2 bg-blue-50/50 rounded inline-block w-full">
                           <p className="text-[4px] font-black text-blue-900 leading-tight">Interaction Designer of the Year</p>
                           <p className="text-[3.5px] text-blue-700">DesignX Magazine · 2022</p>
                        </div>
                     </div>
                  </div>
               </div>
            </div>
          </div>
        );
      case 'bold-yellow':
        return (
          <div className="h-full border-[6px] border-yellow-400 bg-white p-6 flex flex-col overflow-hidden">
             <div className="flex gap-6 mb-7 border-b-2 border-slate-100 pb-5">
                <Avatar initials="PS" className="bg-yellow-100 text-yellow-600 rounded-2xl w-14 h-14 text-[14px] font-black shadow-inner" />
                <div className="flex-1 flex flex-col justify-center">
                   <h4 className="text-[14px] font-black text-dark leading-none tracking-tighter">PRIYA SHARMA</h4>
                   <p className="text-[5.5px] text-yellow-600 font-black uppercase mt-1 tracking-widest">Interface Architect & Product Lead</p>
                </div>
             </div>
             <div className="flex-1 grid grid-cols-2 gap-8">
                <div className="space-y-6">
                   <div>
                      <p className="text-[6px] font-black text-dark uppercase bg-yellow-400 px-2 py-0.5 w-max mb-3 tracking-[0.1em]">Core Objective</p>
                      <p className={bodyText}>To leverage deep expertise in user psychology and interface engineering to build industry-leading experiences for next-generation AI platforms. Passionate about creating seamless design-to-code bridges.</p>
                   </div>
                   <div>
                      <p className="text-[6px] font-black text-dark uppercase bg-yellow-400 px-2 py-0.5 w-max mb-3 tracking-[0.1em]">Key Competencies</p>
                      <div className="grid grid-cols-2 gap-y-2.5">
                         {['Sketch', 'Gen-AI', 'SQL', 'Git', 'CSS/JS', 'Spline', 'Three.js'].map(s => <p key={s} className="text-[4px] font-black text-dark">✔ {s}</p>)}
                      </div>
                   </div>
                   <div>
                      <p className="text-[6px] font-black text-dark uppercase bg-yellow-400 px-2 py-0.5 w-max mb-3 tracking-[0.1em]">Awards</p>
                      <div className="space-y-1.5 text-[4px] text-gray-500 font-bold">
                         <p>🏆 Behance Interaction Star (2023)</p>
                         <p>🏆 App of the Day · Apple (2022)</p>
                         <p>🏆 UX Innovator · TechWeek (2021)</p>
                      </div>
                   </div>
                </div>
                <div className="space-y-6">
                   <div>
                      <p className="text-[6px] font-black text-dark uppercase bg-yellow-400 px-2 py-0.5 w-max mb-3 tracking-[0.1em]">Work Journey</p>
                      <div className="space-y-4">
                         <div>
                            <p className={boldText}>Sr. Lead Architect</p>
                            <p className="text-[4px] font-bold text-yellow-600">Zoho · Jan 2022 - Present</p>
                            <p className={bodyText}>Shipped the Global Search tool used by 45M+ users. Developed a custom tokenizer for design systems that reduced handoff errors by 90%.</p>
                         </div>
                         <div>
                            <p className={boldText}>Full-Stack Designer</p>
                            <p className="text-[4px] font-bold text-yellow-600">FreeCharge · 2019 - 2021</p>
                            <p className={bodyText}>Re-engineered the digital payment flow, managing technical debt and improving transaction success rates by 15%.</p>
                         </div>
                      </div>
                   </div>
                </div>
             </div>
          </div>
        );
      case 'clean-black':
        return (
          <div className="h-full flex bg-white overflow-hidden">
            <div className="w-[30%] bg-black p-5 text-white flex flex-col space-y-6">
               <div className="w-12 h-12 border-2 border-white rounded-full flex items-center justify-center font-black text-[14px] mx-auto shadow-xl">PS</div>
               <div className="space-y-5">
                  <div>
                    <p className="text-[5.5px] font-black text-gray-500 uppercase tracking-widest mb-2 border-b border-white/10 pb-1">Identification</p>
                    <p className="text-[4px] font-bold text-gray-200">priya@folio.in</p>
                    <p className="text-[4px] text-gray-400">Bangalore, India</p>
                  </div>
                  <div>
                    <p className="text-[5.5px] font-black text-gray-500 uppercase tracking-widest mb-2 border-b border-white/10 pb-1">Expertise</p>
                    <div className="space-y-1.5">
                       {['React/NextJS', 'Swift/iOS', 'Framer Motion', 'WebGL/Canvas'].map(s => <p key={s} className="text-[4px] font-medium text-gray-300">✦ {s}</p>)}
                    </div>
                  </div>
                  <div>
                    <p className="text-[5.5px] font-black text-gray-500 uppercase tracking-widest mb-2 border-b border-white/10 pb-1">Public Repo</p>
                    <p className="text-[3.5px] font-mono text-gray-500">github.com/priya_ux</p>
                  </div>
               </div>
               <div className="mt-auto h-4 w-full bg-white/5 rounded-full"></div>
            </div>
            <div className="flex-1 p-8 space-y-6">
               <div className="space-y-1.5">
                  <h4 className="text-[15px] font-black text-dark tracking-tighter leading-none">Priya Sharma</h4>
                  <p className="text-[5.5px] text-gray-400 font-bold uppercase tracking-[0.3em]">Senior Interface Engineer</p>
               </div>
               <div className="space-y-5">
                  <div>
                     <p className={sectionHeading}>Career Narrative</p>
                     <p className={bodyText}>Architecting high-performance digital products for global scale. My approach blends engineering precision with aesthetic mastery. I specialize in building zero-latency user interfaces in high-concurrency environments.</p>
                  </div>
                  <div>
                     <p className={sectionHeading}>Impact History</p>
                     <div className="space-y-4">
                        {[1, 2].map(i => (
                          <div key={i} className="flex gap-4">
                             <p className="text-[4px] font-bold text-gray-300">{i === 1 ? '2023' : '2021'}</p>
                             <div>
                                <p className={boldText}>{i === 1 ? 'Lead Engineer @ MicroFlow Fintech' : 'UX Engineer @ Swiggy'}</p>
                                <p className={bodyText}>{i === 1 ? 'Optimized the payment gateway UI leading to a 22% reduction in bounce rate and processing $2M+ daily.' : 'Engineered the "Track Order" animation system used by 20M+ users across India.'}</p>
                             </div>
                          </div>
                        ))}
                     </div>
                  </div>
                  <div>
                     <p className={sectionHeading}>Open Source</p>
                     <p className={bodyText}><span className="font-bold text-dark">Lumina-UI:</span> Contributed core animations used by 5k+ developers globally.</p>
                  </div>
               </div>
            </div>
          </div>
        );
      case 'elegant-centered':
        return (
          <div className="h-full bg-white p-6 flex flex-col text-center overflow-hidden">
             <div className="border-b border-gray-100 pb-5 mb-5">
                <Avatar initials="PS" className="bg-pink-50 text-pink-600 mx-auto mb-3 w-12 h-12" />
                <h4 className="text-[13px] font-serif font-bold text-dark italic">Priya Sharma</h4>
                <p className="text-[5px] text-gray-400 italic tracking-widest">Visual Experience Designer · Bangalore</p>
             </div>
             <div className="flex-1 space-y-5">
                <div>
                   <p className="text-[5.5px] font-bold text-pink-600 uppercase tracking-widest mb-2 italic">Design Philosophy</p>
                   <p className="text-[4.5px] text-gray-500 leading-relaxed italic px-6">"Design is not just what it looks like and feels like. Design is how it works." Focusing on minimalism and human centeredness in the fashion-tech space.</p>
                </div>
                <div>
                   <p className="text-[5.5px] font-bold text-pink-600 uppercase tracking-widest mb-2 italic">Industry Journey</p>
                   <div className="space-y-4">
                      <div>
                         <p className={boldText}>Lead Brand Designer · Nykaa Luxe</p>
                         <p className="text-[3.5px] text-gray-300">2021 – Present</p>
                         <p className={bodyText}>Refined the visual identity for the 'Summer Glow' campaign, increasing social engagement by 45% and resulting in a 12% uptick in Q3 revenue.</p>
                      </div>
                      <div>
                         <p className={boldText}>Visual Designer · Myntra Fashion</p>
                         <p className="text-[3.5px] text-gray-300">2018 – 2021</p>
                         <p className={bodyText}>Conceptualized and delivered high-impact UI for the 'End of Reason Sale', managing asset pipelines reaching 50M+ shoppers.</p>
                      </div>
                   </div>
                </div>
                <div className="grid grid-cols-2 gap-4 pt-2">
                   <div className="text-right border-r border-gray-100 pr-4">
                      <p className="text-[5px] font-bold text-pink-600 uppercase mb-1">Passions</p>
                      <p className="text-[4px] text-gray-500">Photography, Type Design</p>
                   </div>
                   <div className="text-left pl-4">
                      <p className="text-[5px] font-bold text-pink-600 uppercase mb-1">Education</p>
                      <p className="text-[4px] text-gray-500">M.Des, IDC School of Design</p>
                   </div>
                </div>
             </div>
          </div>
        );
      case 'dark-grid':
        return (
          <div className="h-full bg-slate-900 p-6 flex flex-col overflow-hidden">
             <div className="flex justify-between items-start mb-8 border-b border-slate-800 pb-5">
                <div>
                   <h4 className="text-[14px] font-mono font-black text-white tracking-widest leading-none">PRIYA.SHARMA</h4>
                   <p className="text-[5px] font-mono text-emerald-400 mt-2 uppercase tracking-widest">&gt;&gt; System Architect v2.0.4</p>
                </div>
                <div className="text-right font-mono text-[4px] text-slate-500">
                   <p>LAT: 12.9716 N</p>
                   <p>LNG: 77.5946 E</p>
                </div>
             </div>
             <div className="flex-1 space-y-5">
                <div className="bg-slate-800/50 border border-slate-700 p-3 rounded">
                   <p className="text-[5px] font-mono text-white mb-2 uppercase border-b border-slate-700 pb-1">Current Operations</p>
                   <div className="space-y-3">
                      <div className="flex gap-4">
                         <span className="text-[4px] font-mono text-emerald-500">[2022-Pres]</span>
                         <div>
                            <p className="text-[4px] font-mono text-white font-bold">Principal Engineer @ Freshworks</p>
                            <p className="text-[3.8px] font-mono text-slate-400">Scaling infra for 1M+ concurrent socket connections. Reduced latency by 150ms through Rust optimizations.</p>
                         </div>
                      </div>
                      <div className="flex gap-4">
                         <span className="text-[4px] font-mono text-slate-500">[2019-2022]</span>
                         <div>
                            <p className="text-[4px] font-mono text-white font-bold">Cloud Architect @ AWS India</p>
                            <p className="text-[3.8px] font-mono text-slate-400">Managed multi-region deployments for top fintech startups. 99.999% uptime maintained.</p>
                         </div>
                      </div>
                   </div>
                </div>
                <div className="grid grid-cols-3 gap-3">
                   {['Kubernetes', 'GoLang', 'Rust', 'Kafka', 'Redis', 'Docker'].map(s => (
                     <div key={s} className="bg-slate-800 border border-slate-700 p-1.5 text-center rounded">
                        <p className="text-[4px] font-mono text-emerald-400">{s}</p>
                     </div>
                   ))}
                </div>
                <div className="bg-slate-800/30 p-3 border-l-2 border-emerald-500">
                   <p className="text-[5px] font-mono text-white uppercase italic">Certification_Log</p>
                   <p className="text-[3.8px] font-mono text-slate-400 mt-1">CKA (Certified Kubernetes Admin) · AWS Solution Architect Pro · HashiCorp TerraForm Associate</p>
                </div>
             </div>
          </div>
        );
      case 'standard':
        return (
          <div className="h-full bg-slate-50 p-6 flex flex-col overflow-hidden">
             <div className="bg-white p-6 shadow-sm border border-slate-200">
                <div className="flex justify-between items-start mb-6">
                   <h4 className="text-[12px] font-bold text-slate-900 uppercase tracking-widest border-l-4 border-slate-900 pl-3">Priya Sharma</h4>
                   <p className="text-[4px] font-bold text-slate-400 uppercase">Product Analyst</p>
                </div>
                <div className="space-y-5">
                   <div>
                      <p className={sectionHeading}>Experience Summary</p>
                      <div className="space-y-4">
                         <div>
                            <p className={boldText}>Lead Strategist · Zoho Corp</p>
                            <p className="text-[3.5px] text-slate-400 mb-1">2022 - Present</p>
                            <p className={bodyText}>Analyzed market trends for the Zoho Workplace suite, leading to a 20% increase in enterprise seat adoption across EMEA regions.</p>
                         </div>
                         <div>
                            <p className={boldText}>Junior Analyst · Oracle</p>
                            <p className="text-[3.5px] text-slate-400 mb-1">2019 - 2022</p>
                            <p className={bodyText}>Optimized SQL queries for internal reporting, reducing dashboard load times by 60% for the global sales team.</p>
                         </div>
                      </div>
                   </div>
                   <div className="grid grid-cols-2 gap-6">
                      <div>
                         <p className={sectionHeading}>Competencies</p>
                         <div className="grid grid-cols-1 gap-1">
                            {['Data Viz', 'SQL/NoSQL', 'Market Analysis', 'Python'].map(s => <p key={s} className="text-[4px] font-bold text-slate-600">▪ {s}</p>)}
                         </div>
                      </div>
                      <div>
                         <p className={sectionHeading}>Education</p>
                         <p className={boldText}>MBA, IIM Bangalore</p>
                         <p className={bodyText}>Class of 2019 · Silver Medalist</p>
                      </div>
                   </div>
                </div>
             </div>
          </div>
        );
      default:
        return (
          <div className="p-8 space-y-6 bg-white flex flex-col h-full border-t-[3px] border-primary overflow-hidden">
            <div className="flex justify-between items-end border-b border-gray-100 pb-5">
               <div className="space-y-1">
                  <h4 className="text-[13px] font-black text-dark tracking-tighter uppercase leading-none">Priya Sharma</h4>
                  <p className="text-[5.5px] text-primary font-bold tracking-widest uppercase">Senior Product Designer · B.E Computer Science</p>
               </div>
               <div className="text-right space-y-0.5">
                  <p className="text-[4.5px] font-bold text-gray-400 uppercase italic">Digital Profile: iamfolio.in/priya</p>
                  <p className="text-[4px] text-gray-400">Bangalore, IN · Remote</p>
               </div>
            </div>
            <div className="flex-1 space-y-6">
               <div>
                  <p className={sectionHeading}>Career Summary</p>
                  <p className="text-[5px] text-gray-text leading-relaxed font-medium">Design leader with a deep technical background in engineering. Specialist in bridging the gap between complex backend logic and user-friendly interface designs. Mentored 20+ designers in the last 4 years.</p>
               </div>
               <div>
                  <p className={sectionHeading}>Experience Milestones</p>
                  <div className="space-y-5">
                      <div className="flex justify-between items-start">
                         <div className="space-y-1">
                            <p className={boldText}>Lead Experience Designer · Zoho Corporation</p>
                            <p className={bodyText}>Managed a cross-functional squad of 15 designers and developers to ship the 'Global Search' overhaul, resulting in a 35% decrease in time-to-task and 4M+ daily active searchers.</p>
                         </div>
                         <p className="text-[3.8px] text-gray-400 font-black italic">2021 – Pres</p>
                      </div>
                      <div className="flex justify-between items-start">
                         <div className="space-y-1">
                            <p className={boldText}>Sr. Product Designer · Cisco Systems</p>
                            <p className={bodyText}>Designed the Webex Enterprise Dashboard, simplifying billing and meeting analytics for millions of active corporate users globally.</p>
                         </div>
                         <p className="text-[3.8px] text-gray-400 font-black italic">2018 – 2021</p>
                      </div>
                  </div>
               </div>
               <div className="grid grid-cols-2 gap-6">
                  <div>
                    <p className={sectionHeading}>Key Projects</p>
                    <div className="space-y-2">
                       <p className={bodyText}><span className="font-bold text-dark">OmniSearch API:</span> A unified search experience across 50+ Zoho apps.</p>
                       <p className={bodyText}><span className="font-bold text-dark">Lumina Design:</span> Open-source design library with over 10k stars on GitHub.</p>
                    </div>
                  </div>
                  <div>
                    <p className={sectionHeading}>Education</p>
                    <p className={boldText}>B.E in Computer Science</p>
                    <p className={bodyText}>Anna University, Chennai · 2018</p>
                    <p className="text-[4px] text-gray-400 italic">First Class with Distinction</p>
                  </div>
               </div>
            </div>
            <div className="flex justify-between items-center pt-3 border-t border-gray-50">
               <p className="text-[4px] font-bold text-gray-200">ATS-READY DOCUMENT ID: #IFP-2026-PS-00923</p>
               <div className="flex gap-1.5">
                  <div className="w-1 h-1 rounded-full bg-primary/20"></div>
                  <div className="w-1 h-1 rounded-full bg-primary/20"></div>
                  <div className="w-1 h-1 rounded-full bg-primary/20"></div>
               </div>
            </div>
          </div>
        );
    }
  };

  return (
    <section id="templates" className="py-24 bg-white relative">
      <div className="max-w-7xl mx-auto px-6 md:px-12 text-center">
        <h2 className="text-4xl md:text-5xl font-bold text-dark tracking-tight">8+ ATS-friendly templates</h2>
        <p className="mt-4 text-xl text-gray-text font-medium">Export a professional resume from your profile in one click.</p>

        <div className="relative mt-16 group">
          {/* Scroll Buttons */}
          <button 
            onClick={() => scroll('left')}
            className="absolute left-0 top-1/2 -translate-y-1/2 -translate-x-6 z-20 w-12 h-12 bg-white rounded-full shadow-xl border border-gray-border flex items-center justify-center text-gray-text hover:text-primary transition-all opacity-0 group-hover:opacity-100 hidden md:flex"
          >
            <ChevronLeft className="w-6 h-6" />
          </button>
          <button 
            onClick={() => scroll('right')}
            className="absolute right-0 top-1/2 -translate-y-1/2 translate-x-6 z-20 w-12 h-12 bg-white rounded-full shadow-xl border border-gray-border flex items-center justify-center text-gray-text hover:text-primary transition-all opacity-0 group-hover:opacity-100 hidden md:flex"
          >
            <ChevronRight className="w-6 h-6" />
          </button>

          {/* Scrollable Row */}
          <div 
            ref={scrollRef}
            className="flex gap-8 overflow-x-auto pb-10 snap-x scrollbar-hide no-scrollbar px-4"
          >
            {templates.map((tpl, i) => (
              <motion.div 
                key={tpl.name}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.1 }}
                className="flex-shrink-0 w-72 snap-start group cursor-pointer"
              >
                <div className="relative aspect-[3/4.2] bg-white rounded-2xl border border-gray-border shadow-md group-hover:shadow-2xl group-hover:-translate-y-2 transition-all duration-500 overflow-hidden">
                  {/* Tag */}
                  {tpl.tag && (
                    <div className="absolute top-4 right-4 z-10 px-3 py-1 bg-white/90 backdrop-blur-sm border border-gray-100 rounded-full shadow-sm">
                      <p className="text-[10px] font-bold text-primary uppercase tracking-widest flex items-center gap-1">
                        {tpl.tag === 'Hot' ? <Zap className="w-3 h-3 fill-primary" /> : <Star className="w-3 h-3 fill-primary" />}
                        {tpl.tag}
                      </p>
                    </div>
                  )}

                  <div className="h-full bg-white overflow-hidden">
                    {renderLayout(tpl.layout, tpl.color)}
                  </div>

                  {/* Overlay */}
                  <div className="absolute inset-0 bg-primary/0 group-hover:bg-primary/5 transition-colors pointer-events-none"></div>
                </div>

                <div className="mt-6 text-center">
                  <h3 className="text-lg font-bold text-dark group-hover:text-primary transition-colors">{tpl.name}</h3>
                  <button className="mt-4 w-full py-3 bg-white border-2 border-primary text-primary font-bold rounded-button hover:bg-primary hover:text-white transition-all text-sm uppercase tracking-widest shadow-lg shadow-primary/5">
                    Use This Template
                  </button>
                </div>
              </motion.div>
            ))}
          </div>
        </div>

        <div className="mt-12 flex items-center justify-center gap-2">
            <p className="text-gray-text font-medium">Want something custom?</p>
            <button className="text-primary font-bold hover:underline">
              Browse Template Library →
            </button>
        </div>
      </div>
    </section>
  );
};
