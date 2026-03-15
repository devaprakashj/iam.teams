"use client";
import React, { useState } from 'react';
import { motion } from 'framer-motion';
import Link from 'next/link';
import { Mail, Lock, User, ArrowRight, Github, Chrome } from 'lucide-react';
import { useRouter } from 'next/navigation';
import { auth, googleProvider } from '@/lib/firebase';
import { createUserWithEmailAndPassword, updateProfile, signInWithPopup } from 'firebase/auth';

export default function SignUp() {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);
  const router = useRouter();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError('');
    setLoading(true);

    try {
      const userCredential = await createUserWithEmailAndPassword(auth, email, password);
      // Update profile with name
      if (userCredential.user) {
        await updateProfile(userCredential.user, {
          displayName: name
        });
        
        localStorage.setItem('isLoggedIn', 'true');
        localStorage.setItem('userName', name);
        router.push('/welcome');
      }
    } catch (err: any) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  const handleGoogleLogin = async () => {
    setError('');
    setLoading(true);
    try {
      const result = await signInWithPopup(auth, googleProvider);
      if (result.user) {
        localStorage.setItem('isLoggedIn', 'true');
        localStorage.setItem('userName', result.user.displayName || 'User');
        router.push('/welcome');
      }
    } catch (err: any) {
      setError('Google Sign-Up failed. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-[#0A0A0F] text-[#E2E8F0] font-mono flex overflow-hidden selection:bg-[#6C3CE1]/30">
      {/* Left Side: Brand & Social Proof (Desktop Only) */}
      <div className="hidden lg:flex w-1/2 bg-[#0D0D14] relative items-center justify-center p-12 overflow-hidden border-r border-[#1E1E2E]">
        {/* Background Patterns */}
        <div className="absolute inset-0 opacity-20">
          <div className="absolute top-[-20%] left-[-20%] w-[80%] h-[80%] bg-[#6C3CE1]/20 blur-[150px] rounded-full"></div>
          <div className="absolute bottom-[-20%] right-[-20%] w-[80%] h-[80%] bg-[#FF6B35]/20 blur-[150px] rounded-full"></div>
        </div>
        
        <div className="relative z-10 max-w-lg">
          <motion.div
            initial={{ opacity: 0, x: -30 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8 }}
          >
            <Link href="/" className="mb-12 inline-block">
              <span className="text-4xl font-black text-[#6EE7B7] tracking-tighter italic font-syne">iamfolio</span>
            </Link>
            
            <h2 className="text-6xl font-black font-syne text-white leading-[0.9] mb-8 italic">
               BUILD YOUR <br />
              <span className="text-[#6C3CE1]">IDENTITY IN 60s.</span>
            </h2>

            {/* Floating Mockup Card */}
            <motion.div 
               animate={{ y: [0, -15, 0] }}
               transition={{ duration: 4, repeat: Infinity, ease: "easeInOut" }}
               className="bg-[#111118] border border-[#1E1E2E] p-8 rounded-3xl shadow-2xl relative"
            >
               <div className="flex items-center gap-4 mb-6">
                  <div className="w-14 h-14 rounded-full bg-[#6C3CE1] flex items-center justify-center text-white font-black text-xl italic">PS</div>
                  <div>
                    <p className="text-white font-black text-lg leading-none font-syne italic">Priya Sharma</p>
                    <p className="text-[#64748B] text-[10px] mt-1.5 uppercase tracking-widest font-black">UI/UX Designer</p>
                  </div>
               </div>
               <p className="text-[#E2E8F0] text-lg font-medium italic leading-relaxed font-syne">
                 "Creating my portfolio on iamfolio was a breeze. I just focused on my skills, and the platform handled all the complex design work for me!"
               </p>
               <div className="mt-8 flex gap-2">
                 {[1,2,3,4,5].map(star => (
                   <div key={star} className="w-2.5 h-2.5 bg-[#6EE7B7] rounded-full"></div>
                 ))}
               </div>
            </motion.div>

            <div className="mt-16 grid grid-cols-3 gap-8">
              <div>
                <p className="text-3xl font-black font-syne text-white italic">50K+</p>
                <p className="text-[#64748B] text-[9px] font-black uppercase tracking-[0.2em] mt-1.5">Users</p>
              </div>
              <div>
                <p className="text-3xl font-black font-syne text-white italic">120+</p>
                <p className="text-[#64748B] text-[9px] font-black uppercase tracking-[0.2em] mt-1.5">Nations</p>
              </div>
              <div>
                <p className="text-3xl font-black font-syne text-white italic">100%</p>
                <p className="text-[#64748B] text-[9px] font-black uppercase tracking-[0.2em] mt-1.5">Secure</p>
              </div>
            </div>
          </motion.div>
        </div>
      </div>

      {/* Right Side: Form */}
      <div className="flex-1 flex items-center justify-center p-4 sm:p-6 bg-[#0A0A0F] relative">
        {/* Animated Background Ornaments */}
        <div className="absolute inset-0 overflow-hidden pointer-events-none opacity-30">
          <div className="absolute top-[-10%] left-[-10%] w-[50%] h-[50%] bg-[#6C3CE1]/15 blur-[120px] rounded-full"></div>
          <div className="absolute bottom-[-10%] left-[-10%] w-[50%] h-[50%] bg-[#FF6B35]/15 blur-[120px] rounded-full"></div>
        </div>

        <motion.div 
          initial={{ opacity: 0, scale: 0.95 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.8 }}
          className="w-full max-w-[440px] z-10 py-4"
        >
          <div className="text-center mb-8">
            <Link href="/" className="inline-block mb-6 lg:hidden font-syne">
              <span className="text-5xl font-black text-[#6EE7B7] tracking-tighter italic">IF</span>
            </Link>
            <h1 className="text-3xl sm:text-4xl font-black font-syne text-white tracking-tight italic uppercase">Create account</h1>
            <p className="text-[#64748B] mt-2 font-bold text-xs uppercase tracking-widest leading-loose text-center">Join 50,000+ professionals building their destiny.</p>
          </div>

          <div className="bg-[#111118]/80 backdrop-blur-xl rounded-[28px] border border-[#1E1E2E] p-6 sm:p-10 relative overflow-hidden shadow-2xl">
            {error && (
              <div className="mb-6 p-4 bg-[#EF4444]/10 border border-[#EF4444]/20 text-[#EF4444] text-[10px] font-black rounded-xl text-center uppercase tracking-widest italic">
                {error}
              </div>
            )}
            <form onSubmit={handleSubmit} className="space-y-5">
              <div className="group">
                <label className="block text-[10px] font-black text-[#64748B] uppercase tracking-[0.2em] mb-2.5 ml-1">Full Name</label>
                <div className="relative">
                  <div className="absolute left-4 top-1/2 -translate-y-1/2 border-r border-[#1E1E2E] pr-3">
                    <User className="w-4 h-4 text-[#64748B] group-focus-within:text-[#6C3CE1] transition-colors" />
                  </div>
                  <input 
                    type="text" 
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                    placeholder="John Doe"
                    className="w-full pl-14 pr-4 py-4 bg-[#0A0A0F] border border-[#1E1E2E] rounded-2xl focus:outline-none focus:ring-4 focus:ring-[#6C3CE1]/10 focus:border-[#6C3CE1] transition-all font-bold text-[#E2E8F0] text-sm placeholder:text-[#2E2E3E] shadow-sm"
                    required
                  />
                </div>
              </div>

              <div className="group">
                <label className="block text-[10px] font-black text-[#64748B] uppercase tracking-[0.2em] mb-2.5 ml-1">Email Address</label>
                <div className="relative">
                  <div className="absolute left-4 top-1/2 -translate-y-1/2 border-r border-[#1E1E2E] pr-3">
                    <Mail className="w-4 h-4 text-[#64748B] group-focus-within:text-[#6C3CE1] transition-colors" />
                  </div>
                  <input 
                    type="email" 
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    placeholder="name@company.com"
                    className="w-full pl-14 pr-4 py-4 bg-[#0A0A0F] border border-[#1E1E2E] rounded-2xl focus:outline-none focus:ring-4 focus:ring-[#6C3CE1]/10 focus:border-[#6C3CE1] transition-all font-bold text-[#E2E8F0] text-sm placeholder:text-[#2E2E3E] shadow-sm"
                    required
                  />
                </div>
              </div>

              <div className="group">
                <label className="block text-[10px] font-black text-[#64748B] uppercase tracking-[0.2em] mb-2.5 ml-1">Password</label>
                <div className="relative">
                  <div className="absolute left-4 top-1/2 -translate-y-1/2 border-r border-[#1E1E2E] pr-3">
                    <Lock className="w-4 h-4 text-[#64748B] group-focus-within:text-[#6C3CE1] transition-colors" />
                  </div>
                  <input 
                    type="password" 
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    placeholder="At least 8 characters"
                    className="w-full pl-14 pr-4 py-4 bg-[#0A0A0F] border border-[#1E1E2E] rounded-2xl focus:outline-none focus:ring-4 focus:ring-[#6C3CE1]/10 focus:border-[#6C3CE1] transition-all font-bold text-[#E2E8F0] text-sm placeholder:text-[#2E2E3E] shadow-sm"
                    required
                  />
                </div>
              </div>

              <motion.button 
                type="submit"
                disabled={loading}
                whileHover={{ scale: 1.01, y: -2 }}
                whileTap={{ scale: 0.98 }}
                className={`w-full py-5 text-white font-black rounded-[20px] text-[12px] uppercase tracking-[0.3em] shadow-xl transition-all flex items-center justify-center gap-3 mt-4 ${loading ? 'bg-[#6C3CE1]/70 cursor-not-allowed' : 'bg-[#6C3CE1] hover:shadow-[0_0_30px_rgba(108,60,225,0.4)]'}`}
              >
                {loading ? 'CREATING...' : 'GET STARTED'} <ArrowRight className="w-5 h-5 group-hover:translate-x-1.5 transition-transform" />
              </motion.button>
            </form>

            <div className="relative my-8 text-center">
              <div className="absolute inset-0 flex items-center"><div className="w-full border-t border-[#1E1E2E]"></div></div>
              <span className="relative bg-[#111118] px-4 text-[9px] font-black text-[#64748B] uppercase tracking-[0.3em]">OR SIGN UP WITH</span>
            </div>

            <div className="grid grid-cols-2 gap-4">
              <button 
                onClick={handleGoogleLogin}
                disabled={loading}
                className="flex items-center justify-center gap-3 py-3.5 px-4 bg-[#0A0A0F] border border-[#1E1E2E] rounded-xl font-black text-[10px] uppercase tracking-widest text-[#E2E8F0] hover:border-[#6C3CE1]/40 transition-all active:scale-95 disabled:opacity-50"
              >
                <img src="https://www.vectorlogo.zone/logos/google/google-icon.svg" className="w-4 h-4" alt="Google" /> 
                <span>Google</span>
              </button>
              <button className="flex items-center justify-center gap-3 py-3.5 px-4 bg-[#0A0A0F] border border-[#1E1E2E] rounded-xl font-black text-[10px] uppercase tracking-widest text-[#E2E8F0] hover:border-[#6C3CE1]/40 transition-all active:scale-95">
                <Github size={16} />
                <span>GitHub</span>
              </button>
            </div>

            <p className="mt-8 text-center text-[10px] text-[#64748B] font-black uppercase tracking-widest">
              ALREADY HAVE AN ACCOUNT? <Link href="/signin" className="text-[#6EE7B7] hover:underline underline-offset-4 decoration-2">LOG IN INSTEAD</Link>
            </p>
          </div>
        </motion.div>
      </div>
    </div>
  );
}
