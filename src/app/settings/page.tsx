"use client";
import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { 
  Settings, 
  Shield, 
  Bell, 
  CreditCard, 
  User, 
  LogOut, 
  ChevronRight, 
  Smartphone, 
  Globe, 
  Lock,
  ArrowLeft,
  Download,
  Calendar,
  CheckCircle2
} from 'lucide-react';
import { useRouter } from 'next/navigation';
import jsPDF from 'jspdf';
import autoTable from 'jspdf-autotable';

export default function SettingsPage() {
  const router = useRouter();
  const [currentPlan, setCurrentPlan] = useState('free');
  const [dueDate, setDueDate] = useState<string | null>(null);

  useEffect(() => {
    const savedPlan = localStorage.getItem('userPlan');
    const savedExpiry = localStorage.getItem('planExpiry');
    
    if (savedPlan) {
      setCurrentPlan(savedPlan);
      
      // FALLBACK: If user is PRO but expiry is somehow missing, set a default
      if (savedPlan !== 'free' && !savedExpiry) {
        const fallbackDate = new Date();
        fallbackDate.setMonth(fallbackDate.getMonth() + 1);
        const formatted = fallbackDate.toLocaleDateString('en-IN', { 
          day: 'numeric', 
          month: 'short', 
          year: 'numeric' 
        });
        localStorage.setItem('planExpiry', formatted);
        setDueDate(formatted);
      } else {
        setDueDate(savedExpiry);
      }
    }
  }, []);

  const downloadInvoice = (inv: any) => {
    const doc = new jsPDF();
    
    // Header - Left Side (Logo)
    doc.setFontSize(28);
    doc.setTextColor(108, 60, 225);
    doc.setFont('helvetica', 'bold');
    doc.text('iamfolio', 20, 25);
    
    // Header - Right Side (Invoice Label)
    doc.setFontSize(20);
    doc.setTextColor(50, 50, 50);
    doc.text('INVOICE', 160, 25);
    
    // Divider
    doc.setDrawColor(230, 230, 230);
    doc.line(20, 35, 190, 35);
    
    // Business Details (Left)
    doc.setFontSize(10);
    doc.setTextColor(100, 116, 139);
    doc.setFont('helvetica', 'normal');
    doc.text('IAMFOLIO TECHNOLOGIES PVT LTD', 20, 45);
    doc.text('123 Sky Tower, Tech Park', 20, 50);
    doc.text('Chennai, TN 600001, India', 20, 55);
    doc.text('GSTIN: 33AAAAA0000A1Z5', 20, 60);
    
    // Customer Details (Right)
    doc.setTextColor(50, 50, 50);
    doc.setFont('helvetica', 'bold');
    doc.text('BILL TO:', 140, 45);
    doc.setFont('helvetica', 'normal');
    doc.setTextColor(100, 116, 139);
    doc.text('Devaprakash J', 140, 50);
    doc.text('devaprakashofficial@gmail.com', 140, 55);
    
    // Invoice Summary Table Info
    doc.setTextColor(50, 50, 50);
    doc.setFont('helvetica', 'bold');
    doc.text(`Invoice ID: ${inv.id}`, 20, 75);
    doc.text(`Date: ${inv.date}`, 20, 80);
    doc.text(`Status: ${inv.status.toUpperCase()}`, 20, 85);

    // Table
    autoTable(doc, {
      startY: 95,
      head: [['Description', 'Plan Type', 'Amount (INR)', 'Total']],
      body: [
        [
          'Subscription Access - All Premium Templates & Analytics', 
          inv.plan, 
          inv.amount.replace('₹', 'INR '), 
          inv.amount.replace('₹', 'INR ')
        ]
      ],
      theme: 'striped',
      headStyles: { fillColor: [108, 60, 225], fontSize: 10, cellPadding: 5 },
      bodyStyles: { fontSize: 10, cellPadding: 5 },
      columnStyles: {
        2: { halign: 'right' },
        3: { halign: 'right' }
      }
    });

    const finalY = (doc as any).lastAutoTable.finalY + 15;
    
    // Total Summary
    doc.setFont('helvetica', 'bold');
    doc.text(`Grand Total: ${inv.amount.replace('₹', 'INR ')}`, 140, finalY);
    
    // Footer
    doc.setFontSize(9);
    doc.setTextColor(150, 150, 150);
    doc.text('Note: This is a computer-generated invoice and does not require a physical signature.', 20, 280);
    doc.text('Visit us at iamfolio.in', 90, 285);
    
    doc.save(`iamfolio_${inv.id}.pdf`);
  };

  const history = [
    { id: 'INV-001', date: '15 Mar 2026', plan: currentPlan.toUpperCase(), amount: currentPlan === 'pro' ? '₹59' : currentPlan === 'premium' ? '₹999' : '₹0', status: 'Success' },
    { id: 'INV-000', date: '15 Feb 2026', plan: 'TRIAL', amount: '₹0', status: 'Success' },
  ].filter(inv => currentPlan !== 'free' || inv.plan === 'TRIAL');

  return (
    <div className="min-h-screen bg-[#0A0A0F] text-[#E2E8F0] font-inter">
      {/* HEADER */}
      <nav className="h-20 border-b border-[#1E1E2E] bg-[#111118]/50 backdrop-blur-xl px-6 md:px-12 flex items-center justify-between sticky top-0 z-50">
        <div className="flex items-center gap-4">
          <button onClick={() => router.back()} className="p-2 hover:bg-[#1E1E2E] rounded-full transition-colors">
            <ArrowLeft size={20} />
          </button>
          <div className="flex flex-col">
            <h1 className="text-xl font-black font-syne uppercase italic tracking-tighter">Account Settings</h1>
            <p className="text-[10px] font-bold text-[#64748B] uppercase tracking-widest italic font-mono italic">Manage your profile and billing</p>
          </div>
        </div>
        <div className="w-10 h-10 rounded-full bg-[#6C3CE1] flex items-center justify-center font-bold text-white italic">
          DJ
        </div>
      </nav>

      <main className="p-6 md:p-12 max-w-5xl mx-auto">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-10">
          
          {/* LEFT: NAV TABS */}
          <div className="lg:col-span-1 space-y-4">
             <div className="p-1.5 bg-[#111118] border border-[#1E1E2E] rounded-2xl">
                {[
                  { icon: User, label: 'Profile', active: true },
                  { icon: Shield, label: 'Security' },
                  { icon: Bell, label: 'Notifications' },
                  { icon: CreditCard, label: 'Billing' },
                  { icon: Settings, label: 'General' },
                ].map((item, i) => (
                  <button key={i} className={`w-full flex items-center gap-3 px-4 py-3 rounded-xl text-[10px] font-black uppercase tracking-widest transition-all ${
                    item.active ? 'bg-[#6C3CE1] text-white' : 'text-[#64748B] hover:text-white hover:bg-[#1E1E2E]'
                  }`}>
                    <item.icon size={16} />
                    <span>{item.label}</span>
                  </button>
                ))}
             </div>

             <div className="p-6 bg-gradient-to-br from-[#1E1E2E] to-[#111118] rounded-2xl border border-[#1E1E2E] relative overflow-hidden group">
                <div className="absolute -right-4 -top-4 w-24 h-24 bg-[#6C3CE1] rounded-full blur-[60px] opacity-20" />
                <h4 className="text-[10px] font-black uppercase tracking-widest text-[#6C3CE1] mb-2">Support Hero</h4>
                <p className="text-xs text-[#E2E8F0] mb-4">Need help with your subscription or account?</p>
                <button className="w-full py-2.5 bg-[#1E1E2E] border border-[#1E1E2E] text-white text-[9px] font-black uppercase tracking-widest rounded-lg hover:border-[#6C3CE1] transition-all">Chat with Support</button>
             </div>
          </div>

          {/* RIGHT: CONTENT */}
          <div className="lg:col-span-2 space-y-8">
             
             {/* SECTION: BILLING SUMMARY */}
             <div className="p-8 bg-[#111118] border border-[#1E1E2E] rounded-[32px] relative overflow-hidden">
                <div className="flex flex-col md:flex-row md:items-center justify-between gap-6 relative z-10">
                   <div>
                      <h3 className="text-sm font-black uppercase tracking-widest text-[#64748B] mb-4">Current Subscription</h3>
                      <div className="flex items-center gap-4">
                         <div className={`w-14 h-14 rounded-2xl flex items-center justify-center ${currentPlan !== 'free' ? 'bg-[#6C3CE1]/10 text-[#6C3CE1]' : 'bg-[#1E1E2E] text-[#64748B]'}`}>
                            <CreditCard size={28} />
                         </div>
                         <div>
                            <div className="flex items-center gap-2">
                               <p className="text-2xl font-black font-syne uppercase italic">{currentPlan === 'free' ? 'Starter Free' : currentPlan.toUpperCase()}</p>
                               {currentPlan !== 'free' && <CheckCircle2 size={16} className="text-[#6EE7B7]" />}
                            </div>
                            <p className="text-[10px] font-mono text-[#64748B] font-bold uppercase">
                               {currentPlan === 'free' ? 'Basic tools unlocked' : `Next renewal: ${dueDate || 'Checking...'}`}
                            </p>
                         </div>
                      </div>
                   </div>
                   <button 
                    onClick={() => router.push('/upgrade')}
                    className="px-8 py-3 bg-[#6C3CE1] text-white rounded-xl text-[10px] font-black uppercase tracking-widest shadow-xl shadow-[#6C3CE1]/20 hover:scale-[1.02] transition-all active:scale-95"
                   >
                     {currentPlan === 'free' ? 'Upgrade Plan' : 'Manage Plan'}
                   </button>
                </div>
             </div>

             {/* SECTION: BILLING HISTORY */}
             <div className="space-y-4">
                <div className="flex items-center justify-between px-2">
                   <h3 className="text-[10px] font-black uppercase tracking-widest text-[#64748B]">Recent Invoices</h3>
                   <button className="text-[9px] font-black uppercase tracking-widest text-[#6C3CE1] hover:underline transition-all">View All Transactions</button>
                </div>

                <div className="bg-[#111118] border border-[#1E1E2E] rounded-[32px] overflow-hidden">
                   <table className="w-full text-left border-collapse">
                      <thead>
                         <tr className="border-b border-[#1E1E2E]">
                            <th className="px-8 py-5 text-[9px] font-black uppercase tracking-widest text-[#64748B]">Invoice ID</th>
                            <th className="px-8 py-5 text-[9px] font-black uppercase tracking-widest text-[#64748B]">Date</th>
                            <th className="px-8 py-5 text-[9px] font-black uppercase tracking-widest text-[#64748B]">Amount</th>
                            <th className="px-8 py-5 text-[9px] font-black uppercase tracking-widest text-[#64748B]">Status</th>
                            <th className="px-8 py-5"></th>
                         </tr>
                      </thead>
                      <tbody className="divide-y divide-[#1E1E2E]">
                         {history.length > 0 ? history.map((row, i) => (
                           <tr key={i} className="group hover:bg-[#1E1E2E]/30 transition-colors">
                              <td className="px-8 py-5">
                                 <p className="text-[11px] font-black font-mono">{row.id}</p>
                                 <p className="text-[9px] font-bold text-[#64748B] uppercase tracking-tighter">{row.plan}</p>
                              </td>
                              <td className="px-8 py-5 text-[11px] font-bold text-[#E2E8F0]">{row.date}</td>
                              <td className="px-8 py-5 text-[11px] font-black text-white">{row.amount}</td>
                              <td className="px-8 py-5">
                                 <span className="px-2 py-0.5 bg-[#6EE7B7]/10 text-[#6EE7B7] text-[9px] font-black rounded uppercase tracking-widest border border-[#6EE7B7]/20">
                                    {row.status}
                                 </span>
                              </td>
                              <td className="px-8 py-5 text-right">
                                 <button 
                                  onClick={() => downloadInvoice(row)}
                                  className="p-2 text-[#64748B] hover:text-[#6EE7B7] transition-colors"
                                 >
                                    <Download size={14} />
                                 </button>
                              </td>
                           </tr>
                         )) : (
                            <tr>
                               <td colSpan={5} className="px-8 py-10 text-center text-[10px] font-bold text-[#64748B] uppercase tracking-widest">No payment records found</td>
                            </tr>
                         )}
                      </tbody>
                   </table>
                </div>
             </div>

             {/* SECTION: PAYMENT DETAILS */}
             <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="p-6 bg-[#111118] border border-[#1E1E2E] rounded-3xl">
                   <div className="flex items-center gap-2 mb-6 text-[#64748B]">
                      <Calendar size={14} />
                      <h4 className="text-[10px] font-black uppercase tracking-widest">Upcoming Payment</h4>
                   </div>
                   {currentPlan !== 'free' ? (
                      <div>
                        <p className="text-xl font-black text-white mb-1">{currentPlan === 'pro' ? '₹59' : '₹999'}</p>
                        <p className="text-[10px] font-bold text-[#64748B] uppercase">Will be charged on {dueDate}</p>
                      </div>
                   ) : (
                      <p className="text-[10px] font-bold text-[#64748B] uppercase">No upcoming charges</p>
                   )}
                </div>
                
                <div className="p-6 bg-[#111118] border border-[#1E1E2E] rounded-3xl group">
                   <div className="flex items-center gap-2 mb-6 text-[#64748B]">
                      <CreditCard size={14} />
                      <h4 className="text-[10px] font-black uppercase tracking-widest">Default Method</h4>
                   </div>
                   <div className="flex items-center justify-between">
                      <div className="flex items-center gap-3">
                         <div className="w-10 h-7 bg-white rounded flex items-center justify-center p-1">
                            <img src="https://upload.wikimedia.org/wikipedia/commons/thumb/5/5e/Visa_Inc._logo.svg/2560px-Visa_Inc._logo.svg.png" alt="Visa" className="h-2 opacity-80" />
                         </div>
                         <div>
                            <p className="text-[11px] font-black text-white">VISA •••• 4242</p>
                            <p className="text-[9px] font-bold text-[#64748B] uppercase">Exp: 12/28</p>
                         </div>
                      </div>
                      <ChevronRight size={14} className="text-[#64748B] group-hover:text-white transition-all transform group-hover:translate-x-1" />
                   </div>
                </div>
             </div>

             <div className="pt-8 flex justify-between items-center px-4">
                <p className="text-[10px] font-bold text-[#64748B] uppercase tracking-widest italic font-mono">// SYSTEM_VERIFIED_V2.1</p>
                <button className="flex items-center gap-2 px-6 py-3 bg-red-500/10 text-red-500 rounded-xl font-black text-[9px] uppercase tracking-widest hover:bg-red-500/20 transition-all active:scale-95">
                  <LogOut className="w-3 h-3" />
                  Logout from all sessions
                </button>
             </div>

          </div>
        </div>
      </main>
    </div>
  );
}
