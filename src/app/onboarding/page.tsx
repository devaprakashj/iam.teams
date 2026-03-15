"use client";
import React, { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { motion, AnimatePresence } from 'framer-motion';
import Link from 'next/link';
import { 
  ChevronLeft, 
  Info,
  User,
  Mail,
  Phone,
  Linkedin,
  Github,
  Globe,
  Briefcase,
  GraduationCap,
  Award,
  Zap,
  CheckCircle2,
  Sparkles,
  BookOpen,
  Trophy,
  Coffee,
  Code,
  Star,
  ArrowRight,
  Plus,
  Trash2,
  Cpu,
  Terminal,
  Search,
  Loader2,
  Link2
} from 'lucide-react';
import { auth, db } from '@/lib/firebase';
import { doc, setDoc, getDoc } from 'firebase/firestore';
import { onAuthStateChanged } from 'firebase/auth';

export default function Onboarding() {
  const router = useRouter();
  const [step, setStep] = useState(7);
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [user, setUser] = useState<any>(null);
  
  // Selection States
  const [experienceLevel, setExperienceLevel] = useState('');
  const [isStudent, setIsStudent] = useState<boolean | null>(null);
  const [hasOver20Years, setHasOver20Years] = useState<boolean | null>(null);
  const [eduLevelPursued, setEduLevelPursued] = useState('');
  const [goal, setGoal] = useState('');
  const [selectedTemplate, setSelectedTemplate] = useState<string | null>(null);
  const [entryMethod, setEntryMethod] = useState<'upload' | 'scratch' | null>(null);
  const [isFresher, setIsFresher] = useState(false);
  
  const [formData, setFormData] = useState({
    fullName: '',
    phone: '',
    email: '',
    linkedin: '',
    github: '',
    website: '',
    specialization: '',
    summary: '',
    skills: {
      languages: [] as string[],
      frameworks: [] as string[],
      libraries: [] as string[],
      tools: [] as string[],
      databases: [] as string[]
    },
    projects: [
      { id: Date.now(), title: '', duration: '', tech: [] as string[], description: '', link: '', points: [''] }
    ],
    experience: [
      { id: Date.now(), title: '', company: '', location: '', startMonth: '', startYear: '', endMonth: '', endYear: '', current: false, points: [''] }
    ],
    education: [
      { id: Date.now(), degree: '', specialization: '', institution: '', location: '', month: '', year: '', cgpa: '' }
    ],
    certifications: [] as string[],
    achievements: [] as string[],
    interests: [] as string[],
    languagesKnown: [] as string[],
  });

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, async (currentUser) => {
      if (currentUser) {
        setUser(currentUser);
        setFormData(prev => ({ 
          ...prev, 
          fullName: currentUser.displayName || '', 
          email: currentUser.email || '' 
        }));
        setLoading(false);
      } else {
        const isDemo = localStorage.getItem('isLoggedIn') === 'true';
        if (isDemo) {
          setLoading(false);
        } else {
          router.push('/signin');
        }
      }
    });
    return () => unsubscribe();
  }, [router]);

  const handleSave = async () => {
    const isDemo = localStorage.getItem('isLoggedIn') === 'true';
    if (!user && !isDemo) return;
    setSaving(true);
    try {
      const payload = {
        ...formData,
        experienceLevel,
        isStudent,
        goal,
        selectedTemplate,
        entryMethod,
        onboardingComplete: true,
        updatedAt: new Date().toISOString()
      };

      const username = user?.email ? user.email.split('@')[0] : 'demo';

      if (user) {
        // Save to users with email prefix as ID instead of UID/Full Email
        const userRef = doc(db, 'users', username);
        await setDoc(userRef, payload, { merge: true });

        // Save to public_profiles with prefix as ID
        const profileRef = doc(db, 'public_profiles', username);
        await setDoc(profileRef, payload, { merge: true });

        // Also save a mapping for the username/prefix for clean URLs
        const handleRef = doc(db, 'handles', username);
        await setDoc(handleRef, { email: user.email, uid: user.uid }, { merge: true });

      } else if (isDemo) {
        localStorage.setItem('onboardingComplete', 'true');
        localStorage.setItem('userProfile', JSON.stringify(payload));
      }
      
      if (formData.fullName) {
        localStorage.setItem('userName', formData.fullName);
      }
      
      // Redirect to dashboard after onboarding completion
      router.push('/dashboard');
    } catch (err) {
      console.error(err);
      alert('Failed to save profile. Please try again.');
    } finally {
      setSaving(false);
    }
  };

  const paginate = (dir: number) => {
    let nextStep = step + dir;
    setStep(Math.max(7, Math.min(14, nextStep)));
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-white flex items-center justify-center">
        <div className="w-12 h-12 border-4 border-[#6C3CE1] border-t-transparent rounded-full animate-spin"></div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-white font-inter flex flex-col selection:bg-purple-50">
      {/* HEADER */}
      <header className="h-[70px] bg-white border-b border-[#EEEEEE] px-6 md:px-10 flex items-center justify-between sticky top-0 z-50">
        <div className="flex items-center gap-2">
          <div className="w-8 h-8 bg-[#6C3CE1] rounded-lg flex items-center justify-center font-bold text-white shadow-sm">
            i
          </div>
          <span className="text-[#6C3CE1] text-[20px] font-black tracking-tighter italic">iamfolio</span>
        </div>
      </header>

      {/* Progress Bar */}
      <div className="h-1 w-full bg-slate-100 sticky top-[70px] z-40">
        <motion.div 
          initial={{ opacity: "0%" }}
          animate={{ width: `${((step - 6) / 8) * 100}%` }}
          className="h-full bg-[#6C3CE1]"
        />
      </div>

      {/* CONTENT */}
      <main className="flex-grow flex flex-col items-center bg-white overflow-y-auto">
        <div className="w-full mx-auto max-w-[800px] px-6 py-12 md:py-16">
           <div className="flex flex-col items-center">
              
              {/* Main Content */}
              <div className="w-full">
                <AnimatePresence mode="wait">
            {step === 1 && (
              <motion.div
                key="step1"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -20 }}
                className="text-center"
              >
                <div className="flex items-center justify-center gap-2 mb-4">
                  <h1 className="text-[32px] md:text-[44px] font-bold text-[#1E293B] tracking-tight">
                    How long have you been working?
                  </h1>
                  <Info className="w-6 h-6 text-[#2B5AA8] cursor-help" />
                </div>
                <p className="text-[#64748B] text-lg mb-12">
                  We'll find the best templates for your experience level.
                </p>

                <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-5 gap-4">
                  {[
                    "No Experience",
                    "Less Than 3 Years",
                    "3-5 Years",
                    "5-10 Years",
                    "10+ Years"
                  ].map((level) => (
                    <button
                      key={level}
                      onClick={() => {
                        setExperienceLevel(level);
                        paginate(1);
                      }}
                      className="h-[80px] px-4 bg-white border border-[#E2E8F0] rounded-xl text-[15px] font-semibold text-[#1E293B] hover:border-[#6C3CE1] hover:shadow-md transition-all flex items-center justify-center text-center leading-tight"
                    >
                      {level}
                    </button>
                  ))}
                </div>
              </motion.div>
            )}

            {step === 2 && (
              <motion.div
                key="step2"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -20 }}
                className="text-center"
              >
                <div className="flex items-center gap-4 mb-4">
                  <button onClick={() => paginate(-1)} className="p-2 -ml-2 hover:bg-slate-50 rounded-full transition-colors">
                    <ChevronLeft className="w-6 h-6 text-slate-400" />
                  </button>
                  <h1 className="text-[28px] md:text-[36px] font-bold text-[#1E293B] tracking-tight flex-grow text-center leading-tight">
                    {experienceLevel === "10+ Years" 
                      ? "Do you have more than 20 years of experience?"
                      : "Are you a student?"}
                  </h1>
                </div>
                <p className="text-[#64748B] text-md mb-12">
                   {experienceLevel === "10+ Years"
                      ? "This helps us determine the best way to present your long career."
                      : "This helps us tailor your resume sections."}
                </p>

                <div className="flex flex-col sm:flex-row justify-center gap-6">
                  {["Yes", "No"].map((choice) => (
                    <button
                      key={choice}
                      onClick={() => {
                        if (experienceLevel === "10+ Years") {
                          setHasOver20Years(choice === "Yes");
                        } else {
                          setIsStudent(choice === "Yes");
                        }
                        paginate(1);
                      }}
                      className="w-full sm:w-[240px] h-[100px] bg-white border border-[#E2E8F0] rounded-2xl text-[18px] font-bold text-[#1E293B] hover:border-[#6C3CE1] hover:shadow-lg transition-all flex items-center justify-center"
                    >
                      {choice}
                    </button>
                  ))}
                </div>
              </motion.div>
            )}

            {step === 3 && (
              <motion.div
                key="step3"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -20 }}
                className="text-center"
              >
                <div className="flex items-center gap-4 mb-4">
                  <button onClick={() => paginate(-1)} className="p-2 -ml-2 hover:bg-slate-50 rounded-full transition-colors">
                    <ChevronLeft className="w-6 h-6 text-slate-400" />
                  </button>
                  <h1 className="text-[28px] md:text-[36px] font-bold text-[#1E293B] tracking-tight flex-grow text-center leading-tight">
                    What is your main goal?
                  </h1>
                </div>
                <p className="text-[#64748B] text-md mb-12">
                   This helps us customize your experience.
                </p>

                <div className="flex flex-col sm:flex-row justify-center gap-6">
                  {["Apply for a Job", "Change Careers", "Update Profile"].map((g) => (
                    <button
                      key={g}
                      onClick={() => {
                        setGoal(g);
                        paginate(1);
                      }}
                      className="w-full sm:w-[240px] h-[100px] bg-white border border-[#E2E8F0] rounded-2xl text-[18px] font-bold text-[#1E293B] hover:border-[#6C3CE1] hover:shadow-lg transition-all flex items-center justify-center p-6 text-center"
                    >
                      {g}
                    </button>
                  ))}
                </div>
              </motion.div>
            )}

            {step === 4 && (
              <motion.div
                key="step4"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -20 }}
                className="text-center"
              >
                <div className="flex items-center gap-4 mb-4">
                  <button onClick={() => paginate(-1)} className="p-2 -ml-2 hover:bg-slate-50 rounded-full transition-colors">
                    <ChevronLeft className="w-6 h-6 text-slate-400" />
                  </button>
                  <h1 className="text-[28px] md:text-[36px] font-bold text-[#1E293B] tracking-tight flex-grow text-center leading-tight">
                    What education level are you currently pursuing?
                  </h1>
                </div>
                <p className="text-[#64748B] text-md mb-10">
                  Select the highest level you are working toward.
                </p>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 max-w-[600px] mx-auto">
                  {[
                    "Secondary School",
                    "Vocational Certificate",
                    "Apprenticeship",
                    "Associates",
                    "Bachelors",
                    "Masters",
                    "Doctorate / Ph.D.",
                    "Prefer not to answer"
                  ].map((level) => (
                    <button
                      key={level}
                      onClick={() => {
                        setEduLevelPursued(level);
                        paginate(1);
                      }}
                      className="h-[60px] bg-white border border-[#E2E8F0] rounded-xl text-[15px] font-semibold text-[#1E293B] hover:border-[#6C3CE1] hover:shadow-md transition-all flex items-center justify-center"
                    >
                      {level}
                    </button>
                  ))}
                </div>
              </motion.div>
            )}

            {step === 5 && (
              <motion.div
                key="step5"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -20 }}
                className="text-center w-full"
              >
                <div className="flex items-center gap-4 mb-4">
                  <button onClick={() => paginate(-1)} className="p-2 -ml-2 hover:bg-slate-50 rounded-full transition-colors">
                    <ChevronLeft className="w-6 h-6 text-slate-400" />
                  </button>
                  <h1 className="text-[28px] md:text-[36px] font-bold text-[#1E293B] tracking-tight flex-grow text-center">
                    Best templates for {experienceLevel.toLowerCase()}
                  </h1>
                </div>
                <p className="text-[#64748B] text-md mb-10">
                  You can always change your template later.
                </p>

                <div className="grid grid-cols-2 md:grid-cols-4 gap-6 mb-12">
                   {[1, 2, 3, 4].map((t) => (
                     <div 
                       key={t}
                       onClick={() => {
                         setSelectedTemplate(`template-${t}`);
                         paginate(1);
                       }}
                       className={`aspect-[3/4] bg-slate-100 rounded-lg border-2 cursor-pointer transition-all hover:border-[#6C3CE1] hover:shadow-xl group relative overflow-hidden ${selectedTemplate === `template-${t}` ? 'border-[#6C3CE1]' : 'border-transparent'}`}
                     >
                        <div className="absolute inset-0 bg-slate-200 animate-pulse group-hover:bg-slate-100" />
                        <div className="absolute bottom-4 left-0 right-0 opacity-0 group-hover:opacity-100 transition-opacity">
                           <span className="bg-[#6C3CE1] text-white text-[10px] font-bold px-3 py-1 rounded-full uppercase tracking-wider">Use This</span>
                        </div>
                     </div>
                   ))}
                </div>

                <button 
                  onClick={() => paginate(1)}
                  className="text-[#6C3CE1] font-bold hover:underline"
                >
                  Skip for now, choose later
                </button>
              </motion.div>
            )}

            {step === 6 && (
              <motion.div
                key="step6"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -20 }}
                className="text-center"
              >
                <div className="flex items-center gap-4 mb-4">
                  <button onClick={() => paginate(-1)} className="p-2 -ml-2 hover:bg-slate-50 rounded-full transition-colors">
                    <ChevronLeft className="w-6 h-6 text-slate-400" />
                  </button>
                  <h1 className="text-[28px] md:text-[36px] font-bold text-[#1E293B] tracking-tight flex-grow text-center">
                    Are you uploading an existing resume?
                  </h1>
                </div>
                <p className="text-[#64748B] text-md mb-12">
                  Just review, edit, and update the details.
                </p>

                <div className="flex flex-col md:flex-row justify-center gap-8 max-w-[800px] mx-auto">
                   {/* Option 1: Upload */}
                   <div 
                    onClick={() => {
                      setEntryMethod('upload');
                      paginate(1);
                    }}
                    className="flex-1 p-8 bg-white border border-[#E2E8F0] rounded-[32px] cursor-pointer hover:border-[#6C3CE1] hover:shadow-2xl transition-all group relative"
                   >
                      <div className="absolute -top-3 left-1/2 -translate-x-1/2 bg-[#FF5577] text-white text-[10px] font-black px-4 py-1.5 rounded-full uppercase tracking-widest shadow-lg">
                        Recommended
                      </div>
                      <div className="w-16 h-16 bg-[#FDF2F4] text-[#FF5577] rounded-2xl flex items-center justify-center mx-auto mb-6 group-hover:scale-110 transition-transform">
                        <ArrowRight className="-rotate-45" />
                      </div>
                      <h3 className="text-[20px] font-bold text-[#1E293B] mb-2">Yes, upload from my resume</h3>
                      <p className="text-sm text-[#64748B] leading-relaxed">
                        We&apos;ll extract the details and fill it for you.
                      </p>
                   </div>

                   {/* Option 2: Scratch */}
                   <div 
                    onClick={() => {
                      setEntryMethod('scratch');
                      paginate(1);
                    }}
                    className="flex-1 p-8 bg-white border border-[#E2E8F0] rounded-[32px] cursor-pointer hover:border-[#6C3CE1] hover:shadow-2xl transition-all group"
                   >
                      <div className="w-16 h-16 bg-slate-50 text-slate-400 rounded-2xl flex items-center justify-center mx-auto mb-6 group-hover:scale-110 transition-transform">
                        <Plus />
                      </div>
                      <h3 className="text-[20px] font-bold text-[#1E293B] mb-2">No, start from scratch</h3>
                      <p className="text-sm text-[#64748B] leading-relaxed">
                        We&apos;ll guide you through each section step-by-step.
                      </p>
                   </div>
                </div>
              </motion.div>
            )}

            {step === 7 && (
              <motion.div
                 key="step7"
                 initial={{ opacity: 0, y: 20 }}
                 animate={{ opacity: 1, y: 0 }}
                 exit={{ opacity: 0, y: -20 }}
                 className="space-y-8"
              >
                  <div className="flex items-center gap-4 mb-8">
                    <h2 className="text-2xl font-black text-slate-800">Contact Information</h2>
                  </div>
                  
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <InputField label="Full Name" value={formData.fullName} onChange={(v: string) => setFormData({...formData, fullName: v})} icon={User} placeholder="Jane Doe" />
                    <InputField label="Phone Number" value={formData.phone} onChange={(v: string) => setFormData({...formData, phone: v})} icon={Phone} placeholder="+91 98765 43210" />
                    <InputField label="Professional Email" value={formData.email} onChange={(v: string) => setFormData({...formData, email: v})} icon={Mail} placeholder="jane@example.com" />
                    <InputField label="LinkedIn URL" value={formData.linkedin} onChange={(v: string) => setFormData({...formData, linkedin: v})} icon={Linkedin} placeholder="linkedin.com/in/username" />
                  </div>

                  <div className="flex justify-end pt-8">
                    <button 
                      onClick={() => paginate(1)}
                      className="px-10 py-4 bg-[#1E293B] text-white rounded-xl font-bold hover:bg-[#6C3CE1] transition-all shadow-lg"
                    >
                      Next Step
                    </button>
                  </div>
              </motion.div>
            )}
            
            {/* Step 8: Education */}
            {step === 8 && (
              <motion.div
                key="step8"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -20 }}
                className="space-y-8"
              >
                <div className="flex items-center gap-4 mb-8">
                  <button onClick={() => paginate(-1)} className="p-2 -ml-2 hover:bg-slate-50 rounded-full transition-colors">
                    <ChevronLeft className="w-6 h-6 text-slate-400" />
                  </button>
                  <h2 className="text-2xl font-black text-slate-800">Education</h2>
                </div>
                
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <UniversitySearchField 
                    label="School / University" 
                    value={formData.education[0].institution} 
                    onChange={(univ: string, loc?: string) => {
                      const newEdu = [...formData.education];
                      newEdu[0] = { ...newEdu[0], institution: univ, location: loc || newEdu[0].location };
                      setFormData({ ...formData, education: newEdu });
                    }} 
                    icon={GraduationCap} 
                    placeholder="Search your college..." 
                  />
                  <InputField 
                    label="Location" 
                    value={formData.education[0].location} 
                    onChange={(v: string) => setFormData({...formData, education: [{...formData.education[0], location: v}]})} 
                    icon={Globe} 
                    placeholder="Palo Alto, CA" 
                    disabled={!!formData.education[0].institution}
                    readOnly
                  />
                  <SearchableSelect
                    label="Degree"
                    value={formData.education[0].degree}
                    onChange={(v: string) => setFormData({...formData, education: [{...formData.education[0], degree: v}]})}
                    options={['B.Tech', 'B.E', 'B.Sc', 'B.Com', 'B.A', 'M.Tech', 'M.E', 'M.Sc', 'MBA', 'PhD', 'Diploma']}
                    icon={Award}
                    placeholder="Select Degree"
                  />
                  <SearchableSelect
                    label="Field of Study"
                    value={formData.education[0].specialization}
                    onChange={(v: string) => setFormData({...formData, education: [{...formData.education[0], specialization: v}]})}
                    options={['Computer Science', 'Artificial Intelligence', 'Data Science', 'Electronics', 'Information Technology', 'Mechanical Engineering', 'Civil Engineering', 'Business Administration', 'Software Engineering', 'Mathematics', 'Physics']}
                    icon={BookOpen}
                    placeholder="Select Field"
                  />
                  
                  <div className="md:col-span-2 grid grid-cols-2 gap-4">
                    <SearchableSelect 
                      label="Graduation Month" 
                      value={formData.education[0].month} 
                      onChange={(v: string) => setFormData({...formData, education: [{...formData.education[0], month: v}]})} 
                      options={['January', 'February', 'March', 'April', 'May', 'June', 'July', 'August', 'September', 'October', 'November', 'December']}
                      placeholder="Select Month" 
                    />
                    <SearchableSelect 
                      label="Graduation Year" 
                      value={formData.education[0].year} 
                      onChange={(v: string) => setFormData({...formData, education: [{...formData.education[0], year: v}]})} 
                      options={Array.from({length: 40}, (_, i) => (new Date().getFullYear() + 5 - i).toString())}
                      placeholder="Select Year" 
                    />
                  </div>
                </div>

                <div className="flex justify-between pt-8">
                  <button onClick={() => paginate(-1)} className="text-slate-400 font-bold hover:text-slate-800">Back</button>
                  <button onClick={() => paginate(1)} className="px-10 py-4 bg-[#1E293B] text-white rounded-xl font-bold hover:bg-[#6C3CE1] transition-all shadow-lg">Next Step</button>
                </div>
              </motion.div>
            )}

            {/* Step 9: Experience */}
            {step === 9 && (
              <motion.div
                key="step9"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -20 }}
                className="space-y-8"
              >
                <div className="flex items-center justify-between mb-8">
                  <h2 className="text-2xl font-black text-slate-800">Work Experience</h2>
                  <div className="flex items-center gap-3 bg-slate-50 px-4 py-2 rounded-xl border border-slate-100">
                    <span className="text-[11px] font-black text-slate-400 uppercase tracking-widest">I am a Fresher</span>
                    <input 
                      type="checkbox" 
                      checked={isFresher} 
                      onChange={(e) => setIsFresher(e.target.checked)}
                      className="w-5 h-5 accent-[#6C3CE1] cursor-pointer"
                    />
                  </div>
                </div>

                {!isFresher ? (
                  <div className="space-y-12">
                    {formData.experience.map((exp, index) => (
                      <div key={exp.id} className="p-8 bg-white border border-slate-100 rounded-[32px] shadow-sm relative group/card">
                        {formData.experience.length > 1 && (
                          <button 
                            onClick={() => {
                              const newExp = formData.experience.filter((_, i) => i !== index);
                              setFormData({ ...formData, experience: newExp });
                            }}
                            className="absolute -top-3 -right-3 w-8 h-8 bg-white border border-slate-100 text-slate-400 hover:text-red-500 rounded-full flex items-center justify-center shadow-lg transition-all opacity-0 group-hover/card:opacity-100"
                          >
                            <Trash2 size={14} />
                          </button>
                        )}
                        
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                          <SearchableSelect
                            label="Job Title"
                            value={exp.title}
                            onChange={(v: string) => {
                              const newExp = [...formData.experience];
                              newExp[index] = { ...newExp[index], title: v };
                              setFormData({ ...formData, experience: newExp });
                            }}
                            options={['Software Engineer', 'Frontend Developer', 'Backend Developer', 'Full Stack Developer', 'Data Scientist', 'Product Manager', 'UX Designer', 'Marketing Specialist', 'Sales Executive']}
                            icon={Briefcase}
                            placeholder="Software Engineer"
                          />
                          <SearchableSelect
                            label="Employer / Company"
                            value={exp.company}
                            onChange={(v: string) => {
                              const newExp = [...formData.experience];
                              newExp[index] = { ...newExp[index], company: v };
                              setFormData({ ...formData, experience: newExp });
                            }}
                            options={['Google', 'Microsoft', 'Amazon', 'Meta', 'Netflix', 'TCS', 'Infosys', 'Wipro', 'Zoho', 'Freshworks']}
                            icon={Briefcase}
                            placeholder="Innovation Corp"
                          />
                          <SearchableSelect
                            label="Location / City"
                            value={exp.location}
                            onChange={(v: string) => {
                              const newExp = [...formData.experience];
                              newExp[index] = { ...newExp[index], location: v };
                              setFormData({ ...formData, experience: newExp });
                            }}
                            options={['Chennai, TN', 'Bangalore, KA', 'Hyderabad, TS', 'Mumbai, MH', 'Delhi, NCR', 'Pune, MH', 'Remote']}
                            icon={Globe}
                            placeholder="Chennai, TN"
                          />
                          <SearchableSelect
                            label="Employment Type"
                            value={(exp as any).workType || ''}
                            onChange={(v: string) => {
                              const newExp = [...formData.experience];
                              (newExp[index] as any).workType = v;
                              setFormData({ ...formData, experience: newExp });
                            }}
                            options={['Full-time', 'Part-time', 'Internship', 'Freelance', 'Contract']}
                            icon={Zap}
                            placeholder="Select Type"
                          />
                          
                          <div className="flex items-center gap-2 mt-auto pb-4">
                            <input 
                              type="checkbox" 
                              checked={exp.current} 
                              onChange={(e) => {
                                const newExp = [...formData.experience];
                                newExp[index] = { ...newExp[index], current: e.target.checked };
                                setFormData({ ...formData, experience: newExp });
                              }}
                              className="w-4 h-4 accent-[#6C3CE1]"
                            />
                            <span className="text-sm font-bold text-slate-700">I currently work here</span>
                          </div>

                          <div className="md:col-span-2 grid grid-cols-2 md:grid-cols-4 gap-4">
                            <SearchableSelect 
                              label="Start Month" 
                              value={exp.startMonth} 
                              onChange={(v: string) => {
                                const newExp = [...formData.experience];
                                newExp[index] = { ...newExp[index], startMonth: v };
                                setFormData({ ...formData, experience: newExp });
                              }} 
                              options={['January', 'February', 'March', 'April', 'May', 'June', 'July', 'August', 'September', 'October', 'November', 'December']}
                              placeholder="Select Month" 
                            />
                            <SearchableSelect 
                              label="Start Year" 
                              value={exp.startYear} 
                              onChange={(v: string) => {
                                const newExp = [...formData.experience];
                                newExp[index] = { ...newExp[index], startYear: v };
                                setFormData({ ...formData, experience: newExp });
                              }} 
                              options={Array.from({length: 60}, (_, i) => (new Date().getFullYear() - i).toString())}
                              placeholder="Select Year" 
                            />
                            {!exp.current && (
                              <>
                                <SearchableSelect 
                                  label="End Month" 
                                  value={exp.endMonth} 
                                  onChange={(v: string) => {
                                    const newExp = [...formData.experience];
                                    newExp[index] = { ...newExp[index], endMonth: v };
                                    setFormData({ ...formData, experience: newExp });
                                  }} 
                                  options={['January', 'February', 'March', 'April', 'May', 'June', 'July', 'August', 'September', 'October', 'November', 'December']}
                                  placeholder="Select Month" 
                                />
                                <SearchableSelect 
                                  label="End Year" 
                                  value={exp.endYear} 
                                  onChange={(v: string) => {
                                    const newExp = [...formData.experience];
                                    newExp[index] = { ...newExp[index], endYear: v };
                                    setFormData({ ...formData, experience: newExp });
                                  }} 
                                  options={Array.from({length: 60}, (_, i) => (new Date().getFullYear() - i).toString())}
                                  placeholder="Select Year" 
                                />
                              </>
                            )}
                          </div>
                        </div>
                      </div>
                    ))}

                    <button 
                      onClick={() => {
                        setFormData({
                          ...formData,
                          experience: [
                            ...formData.experience,
                            { id: Date.now(), title: '', company: '', location: '', startMonth: '', startYear: '', endMonth: '', endYear: '', current: false, points: [''] }
                          ]
                        });
                      }}
                      className="w-full py-5 border-2 border-dashed border-slate-200 rounded-[32px] text-slate-400 font-black uppercase tracking-[0.2em] hover:border-[#6C3CE1] hover:text-[#6C3CE1] transition-all flex items-center justify-center gap-3 group"
                    >
                      <Plus size={18} className="group-hover:rotate-180 transition-transform duration-500" />
                      Add Another Work Node
                    </button>
                  </div>
                ) : (
                  <div className="py-20 text-center space-y-4">
                    <div className="w-16 h-16 bg-emerald-50 text-emerald-500 rounded-full flex items-center justify-center mx-auto mb-4">
                       <Zap size={32} />
                    </div>
                    <h4 className="text-xl font-black text-slate-800 tracking-tight">Launching as a Fresher</h4>
                    <p className="text-slate-500 font-medium max-w-sm mx-auto">We'll focus your profile on your academic substrate and technical projects instead.</p>
                  </div>
                )}

                <div className="flex justify-between pt-8">
                  <button onClick={() => paginate(-1)} className="text-slate-400 font-bold hover:text-slate-800">Back</button>
                  <button onClick={() => paginate(1)} className="px-10 py-4 bg-[#1E293B] text-white rounded-xl font-bold hover:bg-[#6C3CE1] transition-all shadow-lg">Next Step</button>
                </div>
              </motion.div>
            )}

            {/* Step 10: Projects */}
            {step === 10 && (
              <motion.div
                key="step10"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -20 }}
                className="space-y-8"
              >
                <div className="flex items-center gap-4 mb-8">
                  <h2 className="text-2xl font-black text-slate-800">Technical Projects</h2>
                </div>
                
                <div className="space-y-12">
                  {formData.projects.map((proj, index) => (
                    <div key={proj.id} className="p-8 bg-white border border-slate-100 rounded-[32px] shadow-sm relative group/card">
                       {formData.projects.length > 1 && (
                          <button 
                            onClick={() => {
                              const newProj = formData.projects.filter((_, i) => i !== index);
                              setFormData({ ...formData, projects: newProj });
                            }}
                            className="absolute -top-3 -right-3 w-8 h-8 bg-white border border-slate-100 text-slate-400 hover:text-red-500 rounded-full flex items-center justify-center shadow-lg transition-all opacity-0 group-hover/card:opacity-100"
                          >
                            <Trash2 size={14} />
                          </button>
                        )}

                      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                        <InputField 
                          label="Project Title" 
                          value={proj.title} 
                          onChange={(v: string) => {
                            const newProj = [...formData.projects];
                            newProj[index] = { ...newProj[index], title: v };
                            setFormData({ ...formData, projects: newProj });
                          }} 
                          icon={Zap} 
                          placeholder="AI Portfolio Builder" 
                        />
                        <InputField 
                          label="Live URL / Demo Link" 
                          value={proj.link} 
                          onChange={(v: string) => {
                            const newProj = [...formData.projects];
                            newProj[index] = { ...newProj[index], link: v };
                            setFormData({ ...formData, projects: newProj });
                          }} 
                          icon={Link2} 
                          placeholder="https://github.com/your-username/project" 
                        />
                        <TagInput 
                          label="Technologies Used" 
                          tags={proj.tech} 
                          setTags={(ts: string[]) => {
                            const newProj = [...formData.projects];
                            newProj[index] = { ...newProj[index], tech: ts };
                            setFormData({ ...formData, projects: newProj });
                          }} 
                          icon={Code} 
                          placeholder="Next.js, Tailwind, Firebase..." 
                        />
                        <SearchableSelect
                          label="Duration" 
                          value={proj.duration} 
                          onChange={(v: string) => {
                            const newProj = [...formData.projects];
                            newProj[index] = { ...newProj[index], duration: v };
                            setFormData({ ...formData, projects: newProj });
                          }} 
                          options={[
                            '1 Month', '2 Months', '3 Months', '4 Months', '5 Months', '6 Months', 
                            '6-12 Months', '1 Year', '2 Years', 'Ongoing'
                          ]}
                          icon={Globe} 
                          placeholder="3 Months" 
                        />
                        
                        <div className="md:col-span-2 space-y-2">
                          <label className="text-[11px] font-bold text-slate-400 uppercase tracking-widest ml-1">Project Description</label>
                          <textarea 
                            value={proj.description}
                            onChange={(e) => {
                              const newProj = [...formData.projects];
                              newProj[index] = { ...newProj[index], description: e.target.value };
                              setFormData({ ...formData, projects: newProj });
                            }}
                            className="w-full bg-[#F8FAFC] border border-[#E2E8F0] rounded-xl p-6 text-[15px] font-medium text-slate-800 focus:border-[#6C3CE1] focus:bg-white outline-none transition-all resize-none h-24"
                            placeholder="Briefly describe what you built..."
                          />
                        </div>
                      </div>
                    </div>
                  ))}

                  <button 
                    onClick={() => {
                      setFormData({
                        ...formData,
                        projects: [
                          ...formData.projects,
                          { id: Date.now(), title: '', duration: '', tech: [] as string[], description: '', link: '', points: [''] }
                        ]
                      });
                    }}
                    className="w-full py-5 border-2 border-dashed border-slate-200 rounded-[32px] text-slate-400 font-black uppercase tracking-[0.2em] hover:border-[#6C3CE1] hover:text-[#6C3CE1] transition-all flex items-center justify-center gap-3 group"
                  >
                    <Plus size={18} className="group-hover:rotate-180 transition-transform duration-500" />
                    Add Another Project Node
                  </button>
                </div>

                <div className="flex justify-between pt-8">
                  <button onClick={() => paginate(-1)} className="text-slate-400 font-bold hover:text-slate-800">Back</button>
                  <button onClick={() => paginate(1)} className="px-10 py-4 bg-[#1E293B] text-white rounded-xl font-bold hover:bg-[#6C3CE1] transition-all shadow-lg">Next Step</button>
                </div>
              </motion.div>
            )}

             {/* Step 11: Skills */}
            {step === 11 && (
              <motion.div
                key="step11"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -20 }}
                className="space-y-8"
              >
                <div className="flex items-center gap-4 mb-8">
                  <button onClick={() => paginate(-1)} className="p-2 -ml-2 hover:bg-slate-50 rounded-full transition-colors">
                    <ChevronLeft className="w-6 h-6 text-slate-400" />
                  </button>
                  <h2 className="text-2xl font-black text-slate-800">Technical Skills</h2>
                </div>
                
                <div className="space-y-8">
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                    <TagInput 
                      label="Programming Languages" 
                      tags={formData.skills.languages} 
                      setTags={(ts: string[]) => setFormData({...formData, skills: {...formData.skills, languages: ts}})} 
                      placeholder="Java, Python, JS..." 
                      icon={Code}
                    />
                    <TagInput 
                      label="Frameworks / Libraries" 
                      tags={formData.skills.frameworks} 
                      setTags={(ts: string[]) => setFormData({...formData, skills: {...formData.skills, frameworks: ts}})} 
                      placeholder="React, Spring Boot..." 
                      icon={Zap}
                    />
                  </div>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                    <TagInput 
                      label="Tools & Devops" 
                      tags={formData.skills.tools} 
                      setTags={(ts: string[]) => setFormData({...formData, skills: {...formData.skills, tools: ts}})} 
                      placeholder="Git, Docker, Jenkins..." 
                      icon={Cpu}
                    />
                    <TagInput 
                      label="Databases" 
                      tags={formData.skills.databases} 
                      setTags={(ts: string[]) => setFormData({...formData, skills: {...formData.skills, databases: ts}})} 
                      placeholder="PostgreSQL, MongoDB..." 
                      icon={Terminal}
                    />
                  </div>
                </div>

                <div className="flex justify-between pt-8">
                  <button onClick={() => paginate(-1)} className="text-slate-400 font-bold hover:text-slate-800" >Back</button>
                  <button onClick={() => paginate(1)} className="px-10 py-4 bg-[#1E293B] text-white rounded-xl font-bold hover:bg-[#6C3CE1] transition-all shadow-lg">Next Step</button>
                </div>
              </motion.div>
            )}

            {/* Step 12: Certifications */}
            {step === 12 && (
              <motion.div
                key="step12"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -20 }}
                className="space-y-8"
              >
                <div className="flex items-center gap-4 mb-8">
                  <button onClick={() => paginate(-1)} className="p-2 -ml-2 hover:bg-slate-50 rounded-full transition-colors">
                    <ChevronLeft className="w-6 h-6 text-slate-400" />
                  </button>
                  <h2 className="text-2xl font-black text-slate-800">Certs & Achievements</h2>
                </div>
                
                <div className="space-y-8">
                  <TagInput 
                    label="Professional Certifications" 
                    tags={formData.certifications} 
                    setTags={(ts: string[]) => setFormData({...formData, certifications: ts})} 
                    placeholder="AWS Solutions Architect, Google Cert..." 
                    icon={Award}
                  />
                  <TagInput 
                    label="Key Achievements" 
                    tags={formData.achievements} 
                    setTags={(ts: string[]) => setFormData({...formData, achievements: ts})} 
                    placeholder="Winner of Hackathon 2024, Best Employee..." 
                    icon={Trophy}
                  />
                </div>

                <div className="flex justify-between pt-8">
                  <button onClick={() => paginate(-1)} className="text-slate-400 font-bold hover:text-slate-800">Back</button>
                  <button onClick={() => paginate(1)} className="px-10 py-4 bg-[#1E293B] text-white rounded-xl font-bold hover:bg-[#6C3CE1] transition-all shadow-lg">Next Step</button>
                </div>
              </motion.div>
            )}

            {/* Step 13: Summary */}
            {step === 13 && (
              <motion.div
                key="step13"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -20 }}
                className="space-y-8"
              >
                <div className="flex items-center gap-4 mb-8">
                  <button onClick={() => paginate(-1)} className="p-2 -ml-2 hover:bg-slate-50 rounded-full transition-colors">
                    <ChevronLeft className="w-6 h-6 text-slate-400" />
                  </button>
                  <h2 className="text-2xl font-black text-slate-800">Professional Summary</h2>
                </div>
                
                <div className="space-y-4">
                   <label className="text-[11px] font-bold text-slate-400 uppercase tracking-widest ml-1">Profile Summary</label>
                   <textarea 
                     value={formData.summary}
                     onChange={(e) => setFormData({...formData, summary: e.target.value})}
                     placeholder="A brief overview of your professional background and key achievements..."
                     className="w-full h-40 bg-[#F8FAFC] border border-[#E2E8F0] rounded-2xl p-6 text-[15px] font-medium text-slate-800 focus:border-[#6C3CE1] focus:bg-white outline-none transition-all resize-none"
                   />
                </div>

                <div className="flex justify-between pt-8">
                  <button onClick={() => paginate(-1)} className="text-slate-400 font-bold hover:text-slate-800">Back</button>
                  <button onClick={() => paginate(1)} className="px-10 py-4 bg-[#1E293B] text-white rounded-xl font-bold hover:bg-[#6C3CE1] transition-all shadow-lg">Next Step</button>
                </div>
              </motion.div>
            )}

            {/* Step 14: Finish */}
            {step === 14 && (
              <motion.div
                key="step14"
                initial={{ opacity: 0, scale: 0.95 }}
                animate={{ opacity: 1, scale: 1 }}
                className="text-center py-20"
              >
                <div className="max-w-md mx-auto">
                  <CheckCircle2 className="w-20 h-20 text-[#6C3CE1] mx-auto mb-6" />
                  <h2 className="text-3xl font-black text-slate-800 mb-4">Identity Ready!</h2>
                  <p className="text-slate-500 mb-12">
                    You have successfully built your professional substrate. Let&apos;s deploy to your mission control dashboard.
                  </p>
                  <button 
                    onClick={handleSave}
                    disabled={saving}
                    className="w-full py-5 bg-[#6C3CE1] text-white rounded-2xl font-black text-lg shadow-xl hover:bg-[#5A2ECF] transition-all disabled:opacity-50"
                  >
                    {saving ? 'Syncing Profile...' : 'Finalize & Go to Dashboard'}
                  </button>
                </div>
              </motion.div>
            )}
          </AnimatePresence>
          </div>

          </div>
        </div>
      </main>

      {/* FOOTER */}
      <footer className="border-t border-[#EEEEEE] py-6 bg-white">
        <div className="max-w-[1000px] mx-auto px-6 flex flex-col md:flex-row justify-between items-center gap-4">
          <div className="flex gap-6">
            {['Terms & Conditions', 'Privacy Policy', 'Accessibility', 'Contact Us'].map((label) => (
              <Link key={label} href="#" className="text-[11px] font-bold text-[#1E293B] uppercase tracking-wider hover:underline">
                {label}
              </Link>
            ))}
          </div>
          <p className="text-[11px] text-[#64748B]">&copy; 2026, iamfolio Technologies Pvt. Ltd. All rights reserved.</p>
        </div>
      </footer>
    </div>
  );
}


function UniversitySearchField({ label, value, onChange, icon: Icon, placeholder }: any) {
  const [query, setQuery] = useState(value);
  const [results, setResults] = useState<{name: string, state: string}[]>([]);
  const [loading, setLoading] = useState(false);
  const [showDropdown, setShowDropdown] = useState(false);

  useEffect(() => {
    const timer = setTimeout(async () => {
      if (query.length > 2) {
        setLoading(true);
        try {
          const res = await fetch(`http://universities.hipolabs.com/search?country=India&name=${query}`);
          const data = await res.json();
          const processed = data.map((u: any) => ({
            name: u.name,
            state: u['state-province'] || 'India'
          })).slice(0, 10);
          setResults(processed);
          setShowDropdown(true);
        } catch (err) {
          console.error("Error fetching universities:", err);
        } finally {
          setLoading(false);
        }
      } else {
        setResults([]);
        setShowDropdown(false);
      }
    }, 500);

    return () => clearTimeout(timer);
  }, [query]);

  return (
    <div className="space-y-2 relative">
      <label className="text-[11px] font-bold text-slate-400 uppercase tracking-widest ml-1">{label}</label>
      <div className="relative group">
        {Icon && <Icon className="absolute left-5 top-1/2 -translate-y-1/2 text-slate-300 group-focus-within:text-[#6C3CE1] transition-colors" size={18} />}
        <input 
          type="text" 
          value={query}
          onChange={(e) => {
            setQuery(e.target.value);
            onChange(e.target.value);
          }}
          onFocus={() => query.length > 2 && setShowDropdown(true)}
          placeholder={placeholder}
          className={`w-full bg-[#F8FAFC] border border-[#E2E8F0] rounded-xl ${Icon ? 'pl-14' : 'px-6'} pr-12 py-4 text-[15px] font-medium text-slate-800 focus:border-[#6C3CE1] focus:bg-white outline-none transition-all placeholder:text-slate-300`}
        />
        <div className="absolute right-4 top-1/2 -translate-y-1/2">
           {loading ? <Loader2 size={16} className="text-[#6C3CE1] animate-spin" /> : <Search size={16} className="text-slate-300" />}
        </div>

        <AnimatePresence>
          {showDropdown && results.length > 0 && (
            <motion.div 
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: 10 }}
              className="absolute top-full left-0 right-0 mt-2 bg-white border border-slate-100 rounded-2xl shadow-2xl z-[100] max-h-[300px] overflow-y-auto custom-scrollbar overflow-x-hidden"
            >
              {results.map((univ, i) => (
                <button
                  key={i}
                  onClick={() => {
                    setQuery(univ.name);
                    onChange(univ.name, univ.state);
                    setShowDropdown(false);
                  }}
                  className="w-full px-6 py-4 text-left text-sm font-bold text-slate-700 hover:bg-slate-50 border-b border-slate-50 last:border-0 flex items-center justify-between transition-colors group"
                >
                  <div className="flex items-center gap-3">
                    <div className="w-1.5 h-1.5 bg-[#6C3CE1] rounded-full shrink-0" />
                    <span>{univ.name}</span>
                  </div>
                  <span className="text-[10px] text-slate-400 group-hover:text-[#6C3CE1]">{univ.state}</span>
                </button>
              ))}
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </div>
  );
}

function SearchableSelect({ label, value, onChange, options, icon: Icon, placeholder }: any) {
  const [showDropdown, setShowDropdown] = useState(false);
  const [query, setQuery] = useState('');

  const filtered = options.filter((o: string) => o.toLowerCase().includes(query.toLowerCase()));

  return (
    <div className="space-y-2 relative">
      <label className="text-[11px] font-bold text-slate-400 uppercase tracking-widest ml-1">{label}</label>
      <div className="relative group">
        {Icon && <Icon className="absolute left-5 top-1/2 -translate-y-1/2 text-slate-300 group-focus-within:text-[#6C3CE1] transition-colors" size={18} />}
        <input 
          type="text" 
          value={value || query}
          onChange={(e) => {
            setQuery(e.target.value);
            setShowDropdown(true);
            if (!e.target.value) onChange('');
          }}
          onFocus={() => setShowDropdown(true)}
          placeholder={placeholder}
          className={`w-full bg-[#F8FAFC] border border-[#E2E8F0] rounded-xl ${Icon ? 'pl-14' : 'px-6'} pr-6 py-4 text-[15px] font-medium text-slate-800 focus:border-[#6C3CE1] focus:bg-white outline-none transition-all placeholder:text-slate-300`}
        />
        <AnimatePresence>
          {showDropdown && (
            <motion.div 
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: 10 }}
              className="absolute top-full left-0 right-0 mt-2 bg-white border border-slate-100 rounded-2xl shadow-2xl z-[100] max-h-[200px] overflow-y-auto custom-scrollbar"
            >
              {filtered.map((opt: string, i: number) => (
                <button
                  key={i}
                  onClick={() => {
                    onChange(opt);
                    setQuery('');
                    setShowDropdown(false);
                  }}
                  className="w-full px-6 py-3 text-left text-sm font-bold text-slate-700 hover:bg-slate-50 transition-colors"
                >
                  {opt}
                </button>
              ))}
            </motion.div>
          )}
        </AnimatePresence>
      </div>
      {showDropdown && <div className="fixed inset-0 z-[90]" onClick={() => setShowDropdown(false)} />}
    </div>
  );
}

function InputField({ label, value, onChange, icon: Icon, placeholder, readOnly }: any) {
  return (
    <div className="space-y-2 group">
      <label className="text-[11px] font-bold text-slate-400 uppercase tracking-widest ml-1">{label}</label>
      <div className="relative">
        {Icon && <Icon className="absolute left-5 top-1/2 -translate-y-1/2 text-slate-300 group-focus-within:text-[#6C3CE1] transition-colors" size={18} />}
        <input 
          type="text" 
          value={value}
          onChange={e => !readOnly && onChange(e.target.value)}
          placeholder={placeholder}
          readOnly={readOnly}
          className={`w-full ${readOnly ? 'bg-slate-50 text-slate-500 cursor-not-allowed border-slate-100' : 'bg-[#F8FAFC] border-[#E2E8F0] text-slate-800 focus:border-[#6C3CE1] focus:bg-white'} border rounded-xl ${Icon ? 'pl-14' : 'px-6'} pr-6 py-4 text-[15px] font-medium outline-none transition-all placeholder:text-slate-300`}
        />
      </div>
    </div>
  );
}

function TagInput({ label, tags, setTags, placeholder, icon: Icon }: any) {
  const [input, setInput] = useState('');

  const addTag = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter' && input.trim()) {
      e.preventDefault();
      if (!tags.includes(input.trim())) {
        setTags([...tags, input.trim()]);
      }
      setInput('');
    }
  };

  const removeTag = (t: string) => {
    setTags(tags.filter((tag: string) => tag !== t));
  };

  return (
    <div className="space-y-4">
      <div className="flex justify-between items-center">
        <label className="text-[11px] font-bold text-slate-400 uppercase tracking-widest ml-1 flex items-center gap-2">
          {Icon && <Icon size={12} />} {label}
        </label>
        <span className="text-[10px] font-bold text-slate-300 uppercase">Press Enter</span>
      </div>
      <div className="relative">
        <input 
          type="text" 
          value={input} 
          onChange={e => setInput(e.target.value)}
          onKeyDown={addTag}
          placeholder={placeholder}
          className="w-full bg-[#F8FAFC] border border-[#E2E8F0] rounded-xl px-6 py-4 text-[15px] font-medium text-slate-800 focus:border-[#6C3CE1] focus:bg-white outline-none transition-all placeholder:text-slate-300"
        />
      </div>
      <div className="flex flex-wrap gap-2">
        {tags.map((t: string) => (
          <span key={t} className="flex items-center gap-2 px-3 py-1.5 bg-[#F1F5F9] text-[#475569] border border-[#E2E8F0] rounded-lg text-[12px] font-semibold group transition-all hover:bg-[#6C3CE1] hover:text-white">
            {t}
            <button onClick={() => removeTag(t)} className="opacity-50 hover:opacity-100"><Trash2 size={12} /></button>
          </span>
        ))}
      </div>
    </div>
  );
}
