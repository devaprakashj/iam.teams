"use client";
import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import Link from 'next/link';

export const Navbar = () => {
  const [isScrolled, setIsScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 10);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const navLinks = [
    { name: 'How It Works', id: 'how-it-works' },
    { name: 'Templates', id: 'templates' },
    { name: 'Pricing', id: 'pricing' },
    { name: 'For Colleges', id: 'for-colleges' }
  ];

  return (
    <nav 
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
        isScrolled ? 'bg-white border-b border-gray-border py-3 shadow-sm' : 'bg-transparent py-5'
      }`}
    >
      <div className="max-w-7xl mx-auto px-6 md:px-12 flex items-center justify-between">
        {/* Left: Logo */}
        <Link href="/" className="flex items-center gap-2 group">
          <div className="w-6 h-6 bg-primary rounded-sm shadow-sm transition-transform group-hover:rotate-12"></div>
          <span className="text-2xl font-bold text-primary tracking-tight">iamfolio</span>
        </Link>

        {/* Center: Links */}
        <div className="hidden md:flex items-center gap-8">
          {navLinks.map((link) => (
            <Link 
              key={link.name} 
              href={`#${link.id}`}
              className="text-[15px] font-semibold text-gray-text hover:text-primary transition-colors"
            >
              {link.name}
            </Link>
          ))}
        </div>

        {/* Right: Actions */}
        <div className="flex items-center gap-6">
          <Link 
            href="/login" 
            className="hidden sm:block text-[15px] font-semibold text-gray-text hover:text-primary transition-colors"
          >
            Sign In
          </Link>
          <Link 
            href="/build"
            className="px-6 py-2.5 bg-white border-2 border-cta text-cta font-bold rounded-button hover:bg-cta hover:text-white transition-all text-sm shadow-lg shadow-cta/10"
          >
            Build My Profile
          </Link>
        </div>
      </div>
    </nav>
  );
};


