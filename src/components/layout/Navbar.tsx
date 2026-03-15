"use client";
import React, { useState, useEffect } from 'react';
import Link from 'next/link';
import { useRouter, usePathname } from 'next/navigation';
import { motion, AnimatePresence } from 'framer-motion';
import { 
  Home, 
  User, 
  FileText, 
  Mic2, 
  Briefcase, 
  LineChart, 
  Settings, 
  Copy, 
  LogOut, 
  Menu, 
  X,
  ShieldCheck,
  Users,
  Database
} from 'lucide-react';
import { auth } from '@/lib/firebase';
import { onAuthStateChanged, signOut } from 'firebase/auth';
import { navItems } from '@/lib/constants';
const adminNavItems = [
  { icon: ShieldCheck, label: 'Overview', href: '/admin' },
  { icon: Users, label: 'Users', href: '/admin?tab=users' },
  { icon: LineChart, label: 'Financials', href: '/admin?tab=revenue' },
  { icon: Database, label: 'Ops', href: '/admin?tab=system' },
  { icon: Briefcase, label: 'Marketplace', href: '/admin?tab=jobs' },
  { icon: Mic2, label: 'Feedback', href: '/admin?tab=feedback' },
];

export default function Navbar({ isAdminPage = false }: { isAdminPage?: boolean }) {
  const currentNavItems = isAdminPage ? adminNavItems : navItems;
  const router = useRouter();
  const pathname = usePathname();
  const [user, setUser] = useState<any>(null);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [isProfileOpen, setIsProfileOpen] = useState(false);

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (currentUser) => {
      if (currentUser) {
        setUser(currentUser);
      } else {
        const isDemo = localStorage.getItem('isLoggedIn') === 'true';
        if (isDemo) {
          setUser({
            displayName: localStorage.getItem('userName') || 'Priya Sharma',
            email: 'priya@iamfolio.in'
          });
        }
      }
    });
    return () => unsubscribe();
  }, []);

  const handleLogout = async () => {
    await signOut(auth);
    localStorage.removeItem('isLoggedIn');
    localStorage.removeItem('userName');
    router.push('/');
  };


  const SidebarContent = () => (
    <div className="flex flex-col h-full bg-[#F3EEFF]">
      <div className="p-6 mb-4 flex justify-between items-center">
        <span className="text-xl font-black text-[#6C3CE1] tracking-tighter italic">iamfolio</span>
        <button onClick={() => setIsMobileMenuOpen(false)} className="lg:hidden text-gray-400 p-2">
          <X size={20} />
        </button>
      </div>
      
      <nav className="flex-1 px-3 space-y-1">
        {currentNavItems.map((item: any) => {
          const isActive = pathname === item.href;
          return (
            <Link 
              key={item.label}
              href={item.href || '#'}
              onClick={() => setIsMobileMenuOpen(false)}
              className={`w-full flex items-center gap-3 px-4 py-3 rounded-xl font-bold text-xs transition-all ${
                isActive 
                  ? 'bg-[#6C3CE1] text-white shadow-md' 
                  : 'text-gray-500 hover:bg-[#6C3CE1]/5 hover:text-[#6C3CE1]'
              }`}
            >
              <item.icon className="w-4 h-4" />
              {item.label}
            </Link>
          );
        })}
      </nav>

      <div className="p-4 border-t border-[#6C3CE1]/10">
        <div className="flex items-center gap-3 mb-4">
           <div className="w-9 h-9 rounded-full bg-[#6C3CE1] flex items-center justify-center text-white font-black text-xs">
              {user?.displayName?.split(' ').map((n: string) => n[0]).join('') || 'PS'}
           </div>
           <div className="min-w-0">
              <p className="text-[11px] font-black text-gray-900 truncate leading-none mb-1">{user?.displayName || 'Priya Sharma'}</p>
              <span className="text-[9px] font-bold text-[#6C3CE1] bg-white px-1.5 py-0.5 rounded-full uppercase tracking-tighter shadow-sm border border-[#6C3CE1]/10">Pro Plan</span>
           </div>
        </div>
        <button 
          onClick={handleLogout}
          className="w-full flex items-center gap-2 px-3 py-2 text-[10px] font-black text-gray-400 hover:text-red-500 transition-colors uppercase tracking-widest"
        >
          <LogOut className="w-3.5 h-3.5" />
          Sign Out
        </button>
      </div>
    </div>
  );

  return (
    <>
      <header className="bg-white border-b border-gray-100 sticky top-0 z-50 px-4 md:px-8 py-3">
        <div className="max-w-[1440px] mx-auto flex items-center justify-between gap-10">
          <div className="flex items-center shrink-0">
            <button 
              onClick={() => setIsMobileMenuOpen(true)}
              className="p-2 -ml-2 text-gray-400 hover:text-[#6C3CE1] lg:hidden transition-colors"
            >
              <Menu className="w-6 h-6" />
            </button>
          </div>

          <nav className="hidden lg:flex items-center gap-x-1 py-1 flex-1 px-2">
            {currentNavItems.map((item: any) => {
              const isActive = pathname === item.href;
              return (
                <Link 
                  key={item.label}
                  href={item.href || '#'}
                  className={`flex items-center gap-1.5 px-3 py-2 rounded-xl font-bold text-[10.5px] whitespace-nowrap transition-all ${
                    isActive 
                      ? 'bg-[#6C3CE1] text-white shadow-md' 
                      : 'text-gray-500 hover:bg-[#6C3CE1]/5 hover:text-[#6C3CE1]'
                  }`}
                >
                  <item.icon className="w-3 h-3" />
                  {item.label}
                </Link>
              );
            })}
          </nav>

          <div className="flex items-center gap-4 shrink-0">
             {!isAdminPage && (
               <div className="hidden xl:flex items-center gap-2 px-3 py-2 bg-[#F3EEFF] rounded-full text-[10px] font-bold text-[#6C3CE1] border border-[#6C3CE1]/10">
                  <span>iamfolio.in/{user?.email?.split('@')[0] || 'profile'}</span>
                  <button 
                    onClick={() => {
                      const handle = user?.email?.split('@')[0] || 'profile';
                      navigator.clipboard.writeText(`${window.location.host}/${handle}`);
                    }}
                    className="p-1 hover:bg-white rounded-full transition-colors"
                  >
                     <Copy className="w-3 h-3" />
                  </button>
               </div>
             )}
             
             <div className="relative">
                <button 
                  onClick={() => setIsProfileOpen(!isProfileOpen)}
                  className="flex items-center gap-3 p-1 pr-3 hover:bg-gray-50 rounded-full transition-all border border-transparent hover:border-gray-100"
                >
                   <div className="w-9 h-9 rounded-full bg-[#6C3CE1] flex items-center justify-center text-white font-black text-xs shadow-md">
                      {user?.displayName?.split(' ').map((n: string) => n[0]).join('') || 'PS'}
                   </div>
                    <div className="hidden sm:block text-left">
                       <p className="text-[11px] font-black text-gray-900 leading-none">{user?.displayName || 'Administrator'}</p>
                       <p className="text-[9px] font-bold text-[#6C3CE1] uppercase tracking-tighter mt-0.5">{isAdminPage ? 'System Admin' : 'Pro Member'}</p>
                    </div>
                </button>

                <AnimatePresence>
                  {isProfileOpen && (
                    <>
                      <motion.div 
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        exit={{ opacity: 0 }}
                        onClick={() => setIsProfileOpen(false)}
                        className="fixed inset-0 z-10"
                      />
                      <motion.div
                        initial={{ opacity: 0, y: 10, scale: 0.95 }}
                        animate={{ opacity: 1, y: 0, scale: 1 }}
                        exit={{ opacity: 0, y: 10, scale: 0.95 }}
                        className="absolute right-0 mt-2 w-56 bg-white rounded-2xl shadow-xl border border-gray-100 py-2 z-20"
                      >
                        <div className="px-4 py-3 border-b border-gray-50 mb-1">
                           <p className="text-xs font-black text-gray-900">{user?.displayName || 'User'}</p>
                           <p className="text-[10px] font-medium text-gray-400 truncate">{user?.email || 'user@example.com'}</p>
                        </div>
                         <Link href="/profile" className="flex items-center gap-3 px-4 py-2.5 text-xs font-bold text-gray-600 hover:bg-[#F3EEFF] hover:text-[#6C3CE1] transition-colors">
                            <User className="w-4 h-4" />
                            My Profile
                         </Link>
                         {isAdminPage ? (
                           <Link href="/" className="flex items-center gap-3 px-4 py-2.5 text-xs font-bold text-[#6C3CE1] hover:bg-[#F3EEFF] transition-colors">
                              <Home className="w-4 h-4" />
                              Home
                           </Link>
                         ) : (
                           <Link href="/admin" className="flex items-center gap-3 px-4 py-2.5 text-xs font-bold text-emerald-600 hover:bg-emerald-50 transition-colors">
                              <ShieldCheck className="w-4 h-4" />
                              Admin Panel
                           </Link>
                         )}
                         <Link href="/settings" className="flex items-center gap-3 px-4 py-2.5 text-xs font-bold text-gray-600 hover:bg-[#F3EEFF] hover:text-[#6C3CE1] transition-colors">
                           <Settings className="w-4 h-4" />
                           Settings
                        </Link>
                        <div className="h-px bg-gray-50 my-1"></div>
                        <button 
                          onClick={handleLogout}
                          className="w-full flex items-center gap-3 px-4 py-2.5 text-xs font-bold text-red-500 hover:bg-red-50 transition-colors"
                        >
                           <LogOut className="w-4 h-4" />
                           Sign Out
                        </button>
                      </motion.div>
                    </>
                  )}
                </AnimatePresence>
             </div>
          </div>
        </div>
      </header>

      {/* Sidebar - Mobile Overlay */}
      <AnimatePresence>
        {isMobileMenuOpen && (
          <>
            <motion.div 
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => setIsMobileMenuOpen(false)}
              className="fixed inset-0 bg-black/50 z-[60] lg:hidden backdrop-blur-sm"
            />
            <motion.aside 
              initial={{ x: '-100%' }}
              animate={{ x: 0 }}
              exit={{ x: '-100%' }}
              transition={{ type: 'spring', damping: 25, stiffness: 200 }}
              className="fixed left-0 top-0 bottom-0 w-[280px] bg-[#F3EEFF] z-[70] lg:hidden shadow-2xl"
            >
              <SidebarContent />
            </motion.aside>
          </>
        )}
      </AnimatePresence>
    </>
  );
}
