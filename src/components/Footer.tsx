"use client";
import React from 'react';
import Link from 'next/link';
import { Facebook, Twitter, Instagram, Linkedin, Github } from 'lucide-react';

export const Footer = () => {
  return (
    <footer className="bg-dark text-white pt-20 pb-10">
      <div className="max-w-7xl mx-auto px-6 md:px-12">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-12 lg:gap-8 mb-16">
          
          {/* Logo & Tagline */}
          <div className="lg:col-span-2 space-y-6">
            <Link href="/" className="flex items-center gap-2">
              <div className="w-8 h-8 bg-primary rounded-lg flex items-center justify-center font-bold text-white">i</div>
              <span className="text-2xl font-bold tracking-tight">iamfolio</span>
            </Link>
            <p className="text-gray-400 max-w-xs font-medium leading-relaxed">
              Your career. Your identity. Your story. <br />
              AI-powered profiles for the modern Indian workforce.
            </p>
          </div>
          
          {/* Columns */}
          <div>
            <h4 className="font-bold mb-6 text-white uppercase tracking-wider text-sm">Product</h4>
            <ul className="space-y-4 text-gray-400 font-medium text-sm">
              <li><Link href="#features" className="hover:text-white transition-colors">How It Works</Link></li>
              <li><Link href="#templates" className="hover:text-white transition-colors">Templates</Link></li>
              <li><Link href="#pricing" className="hover:text-white transition-colors">Pricing</Link></li>
              <li><Link href="#" className="hover:text-white transition-colors">AI Resume Score</Link></li>
              <li><Link href="#" className="hover:text-white transition-colors">Mock Interviews</Link></li>
            </ul>
          </div>

          <div>
            <h4 className="font-bold mb-6 text-white uppercase tracking-wider text-sm">Company</h4>
            <ul className="space-y-4 text-gray-400 font-medium text-sm">
              <li><Link href="#" className="hover:text-white transition-colors">About Us</Link></li>
              <li><Link href="#" className="hover:text-white transition-colors">Careers</Link></li>
              <li><Link href="#" className="hover:text-white transition-colors">Privacy Policy</Link></li>
              <li><Link href="#" className="hover:text-white transition-colors">Terms of Service</Link></li>
            </ul>
          </div>

          <div>
            <h4 className="font-bold mb-6 text-white uppercase tracking-wider text-sm">Resources</h4>
            <ul className="space-y-4 text-gray-400 font-medium text-sm">
              <li><Link href="#" className="hover:text-white transition-colors">Blog</Link></li>
              <li><Link href="#" className="hover:text-white transition-colors">Contact Support</Link></li>
              <li><Link href="#" className="hover:text-white transition-colors">Help Center</Link></li>
              <li><Link href="#" className="hover:text-white transition-colors">For Colleges</Link></li>
            </ul>
          </div>

        </div>

        <div className="pt-10 border-t border-white/10 flex flex-col md:flex-row justify-between items-center gap-6">
          <p className="text-sm text-gray-500 font-medium">
            © 2025 iamfolio Technologies Pvt. Ltd. Made with ❤️ for India.
          </p>
          <div className="flex gap-6">
            {[Linkedin, Instagram, Twitter, Facebook, Github].map((Icon, i) => (
              <Link key={i} href="#" className="text-gray-500 hover:text-white transition-colors">
                <Icon className="w-5 h-5" />
              </Link>
            ))}
          </div>
        </div>
      </div>
    </footer>
  );
};

