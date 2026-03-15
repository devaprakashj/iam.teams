"use client";
import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Menu, X, Rocket, User } from 'lucide-react';
import Link from 'next/link';

export const Navbar = () => {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [userName, setUserName] = useState('');
  const [menuOpen, setMenuOpen] = useState(false);

  useEffect(() => {
    // Check login state
    const loggedIn = localStorage.getItem('isLoggedIn') === 'true';
    const name = localStorage.getItem('userName') || '';
    setIsLoggedIn(loggedIn);
    setUserName(name);

    const handleScroll = () => {
      setIsScrolled(window.scrollY > 10);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const handleLogout = () => {
    localStorage.removeItem('isLoggedIn');
    localStorage.removeItem('userName');
    setIsLoggedIn(false);
    window.location.reload(); // Refresh to update all components
  };

  const navLinks = [
    { name: 'How It Works', id: 'how-it-works' },
    { name: 'Templates', id: 'templates' },
    { name: 'Pricing', id: 'pricing' },
    { name: 'For Colleges', id: 'for-colleges' }
  ];

  return (
    <nav 
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
        isScrolled ? 'bg-[#0A0A0F]/90 backdrop-blur-xl border-b border-[#1E1E2E] shadow-2xl' : 'bg-transparent'
      } ${menuOpen ? 'bg-[#0A0A0F] h-screen md:h-auto' : 'h-14 md:h-20'}`}
    >
      <div className="max-w-7xl mx-auto px-6 md:px-12 h-14 md:h-20 flex items-center justify-between">
        {/* Left: Logo */}
        <Link href="/" className="group flex items-center gap-2" onClick={() => setMenuOpen(false)}>
          <div className="w-8 h-8 bg-[#6C3CE1] rounded flex items-center justify-center text-white font-black text-xs">
            IF
          </div>
          <span className="text-lg md:text-xl font-black tracking-tighter text-[#6EE7B7] font-syne uppercase italic group-hover:text-white transition-colors">
            iamfolio
          </span>
        </Link>

        {/* Center: Links (Desktop) */}
        <div className="hidden md:flex items-center gap-8">
          {navLinks.map((link) => (
            <Link 
              key={link.name} 
              href={`#${link.id}`}
              className="text-[11px] font-black text-[#64748B] hover:text-white transition-colors tracking-[0.2em] uppercase font-mono"
            >
              {link.name}
            </Link>
          ))}
        </div>

        {/* Right: Actions */}
        <div className="flex items-center gap-2 md:gap-5">
          {isLoggedIn ? (
            <div className="flex items-center gap-2 md:gap-4">
              <Link 
                href="/dashboard"
                className="px-4 md:px-5 py-1.5 md:py-2 border border-[#6C3CE1] text-[#6C3CE1] font-black rounded-full text-[9px] md:text-[11px] uppercase tracking-widest hover:bg-[#6C3CE1] hover:text-white transition-all shadow-[0_0_20px_rgba(108,60,225,0.2)] font-mono"
              >
                Dashboard
              </Link>
              <div className="flex items-center gap-2 md:pr-4 md:border-r border-[#1E1E2E]">
                <div className="w-7 h-7 md:w-8 md:h-8 rounded-full bg-[#6C3CE1] flex items-center justify-center text-white text-[10px] md:text-xs font-black shadow-[0_0_15px_rgba(108,60,225,0.3)]">
                  {userName[0]}
                </div>
                <span className="text-[#E2E8F0] font-black text-xs hidden lg:block uppercase tracking-widest font-mono">{userName}</span>
              </div>
              <button 
                onClick={handleLogout}
                className="hidden md:block text-[10px] font-black text-[#64748B] hover:text-[#EF4444] transition-colors uppercase tracking-widest font-mono"
              >
                Logout
              </button>
            </div>
          ) : (
            <div className="flex items-center gap-4">
              <Link 
                href="/signin" 
                className="hidden sm:block text-[11px] font-black text-[#64748B] hover:text-white transition-colors uppercase tracking-widest font-mono"
              >
                Log In
              </Link>
              <Link 
                href="/signup"
                className="px-4 md:px-6 py-2 md:py-2.5 bg-[#6C3CE1] text-white font-black rounded-sm hover:bg-[#6C3CE1]/80 transition-all text-[9px] md:text-[11px] shadow-[0_0_25px_rgba(108,60,225,0.3)] uppercase tracking-[0.2em] font-mono whitespace-nowrap"
              >
                Start Free Trial
              </Link>
            </div>
          )}

          {/* Mobile Hamburger Menu Toggle */}
          <button 
            className="md:hidden p-2 text-[#64748B] hover:text-white transition-colors"
            onClick={() => setMenuOpen(!menuOpen)}
          >
            {menuOpen ? <X size={24} /> : <Menu size={24} />}
          </button>
        </div>
      </div>

      {/* Mobile Menu Overlay */}
      <AnimatePresence>
        {menuOpen && (
          <motion.div 
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            className="md:hidden absolute top-14 left-0 right-0 bg-[#0A0A0F] border-b border-[#1E1E2E] p-6 flex flex-col gap-6 z-40 border-t border-white/5"
          >
            {navLinks.map((link) => (
              <Link 
                key={link.name} 
                href={`#${link.id}`}
                className="text-sm font-black text-[#64748B] hover:text-white transition-all tracking-[0.2em] uppercase font-mono flex items-center justify-between group"
                onClick={() => setMenuOpen(false)}
              >
                <span>{link.name}</span>
                <Rocket size={14} className="opacity-0 group-hover:opacity-100 transition-opacity text-[#6EE7B7]" />
              </Link>
            ))}
            {!isLoggedIn && (
               <Link 
                 href="/signin"
                 className="text-sm font-black text-[#64748B] hover:text-white transition-all tracking-[0.2em] uppercase font-mono flex items-center justify-between group"
                 onClick={() => setMenuOpen(false)}
               >
                 <span>Log In</span>
                 <User size={14} className="opacity-0 group-hover:opacity-100 transition-opacity text-[#6EE7B7]" />
               </Link>
            )}
            <div className="pt-4 border-t border-white/5 mx-[-1.5rem] px-6">
                <button 
                    onClick={handleLogout}
                    className={`${isLoggedIn ? 'block' : 'hidden'} w-full text-left text-sm font-black text-[#EF4444] uppercase tracking-widest font-mono`}
                >
                    Logout Node
                </button>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </nav>
  );
};


