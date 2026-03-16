"use client";
import React, { useState } from 'react';
import { AdminSidebar } from './components/AdminSidebar';
import { AdminTopbar } from './components/AdminTopbar';
import { AdminOverview } from './components/sections/AdminOverview';
import { AdminUsers } from './components/sections/AdminUsers';
import { AdminRevenue } from './components/sections/AdminRevenue';
import { AdminColleges } from './components/sections/AdminColleges';
import { AdminModeration } from './components/sections/AdminModeration';
import { AdminHealth } from './components/sections/AdminHealth';
import { AdminSettings } from './components/sections/AdminSettings';
import { AdminPlans } from './components/sections/AdminPlans';

export default function AdminDashboard() {
  const [activeTab, setActiveTab] = useState('overview');

  return (
    <div className="flex h-screen bg-[#0A0A0F] text-[#E2E8F0] font-inter overflow-hidden">
      {/* SIDEBAR */}
      <AdminSidebar active={activeTab} setActive={setActiveTab} />

      {/* MAIN CONTENT */}
      <div className="flex-1 flex flex-col min-w-0">
        <AdminTopbar section={activeTab} />
        
        <main className="flex-1 overflow-y-auto no-scrollbar p-6 md:p-10">
          <div className="max-w-[1600px] mx-auto">
            {activeTab === 'overview' && <AdminOverview />}
            {activeTab === 'users' && <AdminUsers />}
            {activeTab === 'revenue' && <AdminRevenue />}
            {activeTab === 'plans' && <AdminPlans />}
            {activeTab === 'colleges' && <AdminColleges />}
            {activeTab === 'moderation' && <AdminModeration />}
            {activeTab === 'health' && <AdminHealth />}
            {activeTab === 'settings' && <AdminSettings />}
          </div>
        </main>
      </div>
    </div>
  );
}
