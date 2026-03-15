"use client";
import React from 'react';
import Link from 'next/link';
import { Facebook, Twitter, Instagram, Linkedin, Github } from 'lucide-react';

export const Footer = () => {
  return (
    <footer className="bg-white text-gray-900 pt-16 md:pt-24 pb-10 md:pb-12 border-t border-gray-100">
      <div className="max-w-7xl mx-auto px-6 md:px-12">
        <div className="grid grid-cols-1 md:grid-cols-3 lg:grid-cols-5 gap-10 md:gap-12 lg:gap-16 mb-16 md:mb-20">
          
          {/* Logo & Tagline */}
          <div className="md:col-span-3 lg:col-span-2 space-y-6 md:space-y-8 flex flex-col items-center md:items-start text-center md:text-left">
            <Link href="/" className="flex items-center gap-3">
              <div className="w-8 h-8 bg-[#6C3CE1] rounded flex items-center justify-center font-black text-white italic">IF</div>
              <span className="text-xl md:text-2xl font-black font-syne text-[#6C3CE1] tracking-tighter uppercase italic">iamfolio</span>
            </Link>
            <p className="text-gray-400 max-w-xs font-bold leading-relaxed uppercase tracking-tight font-mono text-[10px] md:text-xs">
              Your career manifest. Your identity. <br className="hidden md:block" />
              High-performance profiles for the professional grid.
            </p>
          </div>
          
          {/* Columns */}
          <div className="grid grid-cols-2 md:grid-cols-3 lg:contents gap-8 md:col-span-3 lg:col-span-3">
            <div>
              <h4 className="font-black mb-6 md:mb-8 text-gray-900 uppercase tracking-[0.2em] text-[9px] md:text-[10px] font-mono italic">// PRODUCT</h4>
              <ul className="space-y-3 md:space-y-4 text-gray-500 font-bold text-[10px] md:text-[11px] uppercase tracking-wide">
                <li><Link href="#features" className="hover:text-black transition-colors">Telemetry</Link></li>
                <li><Link href="#templates" className="hover:text-black transition-colors">Templates</Link></li>
                <li><Link href="#pricing" className="hover:text-black transition-colors">Pricing</Link></li>
                <li><Link href="#" className="hover:text-black transition-colors">AI Scoring</Link></li>
              </ul>
            </div>

            <div>
              <h4 className="font-black mb-6 md:mb-8 text-gray-900 uppercase tracking-[0.2em] text-[9px] md:text-[10px] font-mono italic">// ENTITY</h4>
              <ul className="space-y-3 md:space-y-4 text-gray-500 font-bold text-[10px] md:text-[11px] uppercase tracking-wide">
                <li><Link href="#" className="hover:text-black transition-colors">Operational</Link></li>
                <li><Link href="#" className="hover:text-black transition-colors">Privacy</Link></li>
                <li><Link href="#" className="hover:text-black transition-colors">Terms</Link></li>
              </ul>
            </div>

            <div className="col-span-2 md:col-span-1">
              <h4 className="font-black mb-6 md:mb-8 text-gray-900 uppercase tracking-[0.2em] text-[9px] md:text-[10px] font-mono italic">// RESOURCES</h4>
              <ul className="space-y-3 md:space-y-4 text-gray-500 font-bold text-[10px] md:text-[11px] uppercase tracking-wide">
                <li><Link href="#" className="hover:text-black transition-colors">The Grid</Link></li>
                <li><Link href="#" className="hover:text-black transition-colors">Support</Link></li>
                <li><Link href="#" className="hover:text-black transition-colors">Community</Link></li>
              </ul>
            </div>
          </div>

        </div>

        <div className="pt-10 md:pt-12 border-t border-gray-100 flex flex-col md:flex-row justify-between items-center gap-8">
          <p className="text-[8px] md:text-[9px] text-gray-400 font-black uppercase tracking-[0.3em] font-mono text-center md:text-left">
            © 2026 iamfolio grid systems. Synchronized for performance.
          </p>
          <div className="flex gap-6 md:gap-8">
            {[Linkedin, Instagram, Twitter, Github].map((Icon, i) => (
              <Link key={i} href="#" className="text-gray-400 hover:text-black transition-all hover:scale-125">
                <Icon className="w-4 h-4 md:w-5 md:h-5" />
              </Link>
            ))}
          </div>
        </div>
      </div>
    </footer>
  );
};

