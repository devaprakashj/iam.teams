"use client";
import React from 'react';
import { motion } from 'framer-motion';
import { Briefcase, MapPin, Clock, Search, Filter, Bookmark, Building, ChevronRight, TrendingUp } from 'lucide-react';
import Navbar from '@/components/layout/Navbar';

export default function JobMatches() {
  return (
    <div className="min-h-screen bg-[#F9FAFB] font-inter">
      <Navbar />

      <main className="pb-24">
        <div className="bg-white border-b border-gray-100 px-6 py-12 lg:px-12">
          <div className="max-w-[1400px] mx-auto">
            <div className="flex flex-col md:flex-row md:items-center justify-between gap-8">
              <div className="max-w-xl">
                <h1 className="text-4xl font-black text-dark tracking-tighter">Job Matches</h1>
                <p className="text-gray-400 font-bold mt-2 uppercase tracking-widest text-xs">Curated recommendations based on your current profile</p>
                <div className="mt-8 flex items-center p-2 bg-gray-50 border border-gray-100 rounded-2xl shadow-sm">
                   <div className="p-2 text-gray-400"><Search size={20} /></div>
                   <input 
                     type="text" 
                     placeholder="Search roles, companies or skills..." 
                     className="bg-transparent border-none focus:ring-0 text-sm font-bold w-full"
                   />
                   <button className="px-6 py-2.5 bg-dark text-white rounded-xl font-black text-[10px] uppercase tracking-widest hover:bg-gray-800 transition-colors">Search</button>
                </div>
              </div>
              <div className="flex flex-wrap gap-3">
                 <button className="flex items-center gap-2 px-6 py-3 bg-white border border-gray-100 rounded-xl font-black text-[10px] uppercase tracking-widest hover:border-[#6C3CE1] transition-all"><Filter size={16} /> Filters</button>
                 <button className="flex items-center gap-2 px-6 py-3 bg-white border border-gray-100 rounded-xl font-black text-[10px] uppercase tracking-widest hover:border-[#6C3CE1] transition-all"><Bookmark size={16} /> Saved Jobs</button>
              </div>
            </div>
          </div>
        </div>

        <div className="p-6 lg:p-12 max-w-[1400px] mx-auto w-full">
          <div className="grid grid-cols-1 xl:grid-cols-4 gap-8">
            {/* Sidebar Stats */}
            <div className="xl:col-span-1 space-y-6">
               <div className="bg-white p-8 rounded-[32px] border border-gray-100 shadow-sm overflow-hidden relative">
                  <div className="absolute -right-4 -top-4 text-gray-50"><TrendingUp size={120} /></div>
                  <h3 className="text-xs font-black text-gray-400 uppercase tracking-widest mb-6 relative">Match Statistics</h3>
                  <div className="space-y-6 relative">
                     <StatItem label="Top 5% Candidate" value="Match Strength" />
                     <StatItem label="24 Active" value="Targeted Roles" />
                     <StatItem label="12 New" value="Jobs Today" />
                  </div>
               </div>

               <div className="bg-[#6C3CE1]/5 p-8 rounded-[32px] border border-[#6C3CE1]/10">
                  <h3 className="text-xs font-black text-[#6C3CE1] uppercase tracking-widest mb-4">Skill Match Tip</h3>
                  <p className="text-[11px] font-bold text-[#6C3CE1]/70 leading-relaxed mb-4">Adding <strong>AWS</strong> & <strong>Docker</strong> to your profile could unlock 15 more high-paying roles.</p>
                  <button className="text-[10px] font-black text-[#6C3CE1] uppercase tracking-widest hover:underline">Update Skills →</button>
               </div>
            </div>

            {/* Job Grid */}
            <div className="xl:col-span-3">
               <div className="flex items-center justify-between mb-8">
                  <h3 className="text-xs font-black text-gray-400 uppercase tracking-[0.2em]">Top Matches for you</h3>
                  <div className="flex items-center gap-4">
                     <span className="text-xs font-bold text-gray-400">Sort by: <span className="text-dark">Best Match</span></span>
                  </div>
               </div>

               <div className="space-y-4">
                  <JobCard 
                    company="Zoho Corp" 
                    role="Senior UI/UX Designer" 
                    location="Chennai, India" 
                    pay="₹12–18 LPA" 
                    match="98%" 
                    tags={['Remote Friendly', 'Health Benefits', 'Tech Stack']}
                  />
                  <JobCard 
                    company="Freshworks" 
                    role="Product Designer" 
                    location="Chennai, India" 
                    pay="₹10–15 LPA" 
                    match="94%" 
                    tags={['On-site', 'Stock Options']}
                  />
                  <JobCard 
                    company="Atlassian" 
                    role="Product Design Lead" 
                    location="Bangalore, India" 
                    pay="₹35–45 LPA" 
                    match="89%" 
                    tags={['Global Team', 'Unlimited PTO']}
                  />
                  <JobCard 
                    company="Paypal" 
                    role="UX Researcher (L3)" 
                    location="Chennai, India" 
                    pay="₹18–24 LPA" 
                    match="86%" 
                    tags={['Hybrid', 'Bonus']}
                  />
                  <JobCard 
                    company="Swiggy" 
                    role="Interaction Designer" 
                    location="Bangalore, India" 
                    pay="₹15–20 LPA" 
                    match="82%" 
                    tags={['Growth Phase', 'Mentorship']}
                  />
               </div>

               <div className="mt-12 flex justify-center">
                  <button className="px-10 py-4 bg-white border border-gray-100 rounded-2xl font-black text-[10px] uppercase tracking-widest hover:border-[#6C3CE1] hover:text-[#6C3CE1] transition-all shadow-sm">Load More Matches</button>
               </div>
            </div>
          </div>
        </div>
      </main>
    </div>
  );
}

function StatItem({ label, value }: any) {
  return (
    <div>
       <p className="text-[10px] font-bold text-gray-400 uppercase tracking-tighter mb-1">{value}</p>
       <p className="text-lg font-black text-dark">{label}</p>
    </div>
  );
}

function JobCard({ company, role, location, pay, match, tags }: any) {
  return (
    <motion.div 
      whileHover={{ scale: 1.005 }}
      className="bg-white p-6 rounded-[32px] border border-gray-100 shadow-sm hover:shadow-xl hover:border-transparent transition-all flex flex-col md:flex-row md:items-center justify-between gap-6 group cursor-pointer"
    >
      <div className="flex items-center gap-6">
        <div className="w-16 h-16 bg-gray-50 rounded-2xl border border-gray-100 flex items-center justify-center text-xl font-black text-gray-300 group-hover:bg-[#6C3CE1]/5 group-hover:text-[#6C3CE1] transition-colors">
          {company[0]}
        </div>
        <div>
          <h4 className="text-xl font-black text-dark mb-1 group-hover:text-[#6C3CE1] transition-colors">{role}</h4>
          <div className="flex flex-wrap items-center gap-x-4 gap-y-2 text-xs font-bold text-gray-400 uppercase tracking-tight">
            <span className="flex items-center gap-1.5"><Building size={14} /> {company}</span>
            <span className="flex items-center gap-1.5"><MapPin size={14} /> {location}</span>
            <span className="text-[#6C3CE1] font-black">{pay}</span>
          </div>
          <div className="flex flex-wrap gap-2 mt-4">
             {tags.map((tag: string) => (
                <span key={tag} className="px-3 py-1 bg-gray-50 rounded-full text-[9px] font-bold text-gray-400 uppercase tracking-tighter">{tag}</span>
             ))}
          </div>
        </div>
      </div>
      <div className="flex items-center gap-6">
         <div className="text-right">
            <p className="text-[10px] font-black text-[#22C55E] uppercase tracking-widest mb-1">{match} Match</p>
            <div className="w-24 h-1.5 bg-gray-50 rounded-full overflow-hidden">
               <div className="h-full bg-[#22C55E]" style={{ width: match }}></div>
            </div>
         </div>
         <button className="p-4 bg-gray-50 rounded-2xl group-hover:bg-[#6C3CE1] group-hover:text-white transition-all transform group-hover:translate-x-1">
            <ChevronRight size={20} />
         </button>
      </div>
    </motion.div>
  );
}
