"use client";
import React from 'react';
import { motion } from 'framer-motion';
import { Settings, Shield, Bell, CreditCard, User, LogOut, ChevronRight, Smartphone, Globe, Lock } from 'lucide-react';
import Navbar from '@/components/layout/Navbar';

export default function SettingsPage() {
  return (
    <div className="min-h-screen bg-[#F9FAFB] font-inter">
      <Navbar />

      <main className="pb-24">
        <div className="bg-white border-b border-gray-100 px-6 py-12 lg:px-12">
          <div className="max-w-[1400px] mx-auto">
            <h1 className="text-4xl font-black text-dark tracking-tighter">Settings</h1>
            <p className="text-gray-400 font-bold mt-2 uppercase tracking-widest text-xs">Manage your account and preferences</p>
          </div>
        </div>

        <div className="p-6 lg:p-12 max-w-4xl mx-auto w-full">
           <div className="space-y-4">
              <SettingsGroup title="Account & Profile">
                 <SettingsItem icon={User} label="Profile Information" value="Priya Sharma" />
                 <SettingsItem icon={Globe} label="Display Name" value="priya_ux" />
                 <SettingsItem icon={Smartphone} label="Connected Devices" value="2 active" />
              </SettingsGroup>

              <SettingsGroup title="Security">
                 <SettingsItem icon={Shield} label="Two-Factor Authentication" value="Enabled" toggle active />
                 <SettingsItem icon={Lock} label="Change Password" />
                 <SettingsItem icon={Shield} label="Login Activity" />
              </SettingsGroup>

              <SettingsGroup title="Notifications">
                 <SettingsItem icon={Bell} label="Email Notifications" toggle active />
                 <SettingsItem icon={Bell} label="Marketing Updates" toggle />
                 <SettingsItem icon={Bell} label="Job Match Alerts" toggle active />
              </SettingsGroup>

              <SettingsGroup title="Billing & Plan">
                 <SettingsItem icon={CreditCard} label="Current Plan" value="Pro Annual" badge="Platinum" />
                 <SettingsItem icon={CreditCard} label="Payment Method" value="Visa ending in 4242" />
                 <SettingsItem icon={CreditCard} label="Billing History" />
              </SettingsGroup>

              <div className="pt-8 flex justify-center">
                 <button className="flex items-center gap-2 px-10 py-4 bg-rose-50 text-rose-500 rounded-2xl font-black text-xs uppercase tracking-widest hover:bg-rose-100 transition-all">
                    <LogOut className="w-4 h-4" />
                    Delete Account Permanently
                 </button>
              </div>
           </div>
        </div>
      </main>
    </div>
  );
}

function SettingsGroup({ title, children }: any) {
  return (
    <div className="bg-white rounded-[40px] border border-gray-100 shadow-sm overflow-hidden">
       <div className="px-8 py-6 bg-gray-50/50 border-b border-gray-100">
          <h3 className="text-[10px] font-black text-gray-400 uppercase tracking-widest">{title}</h3>
       </div>
       <div className="divide-y divide-gray-50">
          {children}
       </div>
    </div>
  );
}

function SettingsItem({ icon: Icon, label, value, toggle, active, badge }: any) {
  return (
    <div className="px-8 py-5 flex items-center justify-between group hover:bg-gray-50/50 transition-colors cursor-pointer">
       <div className="flex items-center gap-4">
          <div className="p-2.5 bg-gray-50 text-gray-400 rounded-xl group-hover:bg-[#6C3CE1]/5 group-hover:text-[#6C3CE1] transition-colors">
             <Icon size={18} />
          </div>
          <div>
             <p className="text-sm font-black text-dark tracking-tight">{label}</p>
             {value && <p className="text-[10px] font-bold text-gray-400 uppercase tracking-tighter mt-0.5">{value}</p>}
          </div>
       </div>
       <div className="flex items-center gap-4">
          {badge && <span className="px-2 py-0.5 bg-[#6C3CE1] text-white text-[8px] font-black rounded-full uppercase tracking-widest shadow-lg shadow-[#6C3CE1]/20">{badge}</span>}
          {toggle ? (
             <div className={`w-10 h-5 rounded-full relative transition-colors ${active ? 'bg-[#6C3CE1]' : 'bg-gray-200'}`}>
                <div className={`absolute top-1 w-3 h-3 bg-white rounded-full transition-all ${active ? 'right-1' : 'left-1'}`} />
             </div>
          ) : (
             <ChevronRight className="w-4 h-4 text-gray-300 group-hover:text-dark transition-colors" />
          )}
       </div>
    </div>
  );
}
