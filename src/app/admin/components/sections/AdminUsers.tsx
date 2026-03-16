"use client";
import React, { useState } from 'react';
import { 
  Search, 
  Filter, 
  ExternalLink, 
  ShieldAlert, 
  Zap, 
  Calendar, 
  CreditCard,
  UserCheck,
  History,
  AlertTriangle,
  X,
  Save,
  RefreshCw
} from 'lucide-react';

const usersList = [
  { id: 1, name: 'Devaprakash J', email: 'devaprakashofficial@gmail.com', username: 'devaprakash', plan: 'Pro', billing: 'Monthly', expiry: '15 Apr 2026', joined: 'Mar 15, 2026', score: 91, initials: 'DJ', color: '#6C3CE1', rzpId: 'sub_P7x9K3j0L2m1', syncStatus: 'synced' },
  { id: 2, name: 'Priya R', email: 'priya@gmail.com', username: 'priyar', plan: 'Premium', billing: 'Annual', expiry: '14 Mar 2027', joined: 'Mar 14, 2026', score: 88, initials: 'PR', color: '#FF6B35', rzpId: 'sub_K4v8M2n1P5q3', syncStatus: 'synced' },
  { id: 3, name: 'Arun K', email: 'arun@gmail.com', username: 'arunk', plan: 'Trial', billing: 'N/A', expiry: '21 Mar 2026', joined: 'Mar 15, 2026', score: 74, initials: 'AK', color: '#FBBF24', rzpId: 'N/A', syncStatus: 'none' },
  { id: 4, name: 'Sanjana Reddy', email: 'sanjana@example.com', username: 'sanjana', plan: 'Free', billing: 'N/A', expiry: 'Never', joined: 'Mar 10, 2026', score: 95, initials: 'SR', color: '#64748B', rzpId: 'N/A', syncStatus: 'none' },
];

export const AdminUsers = () => {
  const [filter, setFilter] = useState('All');
  const [users, setUsers] = useState(usersList);
  const [selectedUser, setSelectedUser] = useState<any>(null);
  
  // Local state for modal fields
  const [editTier, setEditTier] = useState('');
  const [editBilling, setEditBilling] = useState('');
  const [editExpiry, setEditExpiry] = useState('');

  const openManage = (user: any) => {
    setSelectedUser(user);
    setEditTier(user.plan);
    setEditBilling(user.billing);
    setEditExpiry(user.expiry);
  };

  const handleCommit = () => {
    setUsers(prev => prev.map(u => 
      u.id === selectedUser.id 
        ? { ...u, plan: editTier, billing: editBilling, expiry: editExpiry, syncStatus: 'mismatch' } 
        : u
    ));

    // SYNC_WITH_LOCALSTORAGE: If editing the main test user (Devaprakash), update his local instance
    if (selectedUser.username === 'devaprakash') {
      localStorage.setItem('userPlan', editTier.toLowerCase());
      localStorage.setItem('planExpiry', editExpiry);
      
      // If it's a trial, we want them to see the 'Expired' state to prompt upgrade
      if (editTier === 'Trial') {
        const url = new URL(window.location.href);
        url.searchParams.set('expired', 'true');
        window.history.pushState({}, '', url);
      }
    }

    setSelectedUser(null);
    alert(`Node updated: ${selectedUser.username} is now on ${editTier} plan. Please refresh the page to see changes as the User.`);
  };

  const filteredUsers = users.filter(u => {
    if (filter === 'All Users') return true;
    if (filter === 'Trial') return u.plan === 'Trial';
    if (filter === 'Pro') return u.plan === 'Pro';
    if (filter === 'Premium') return u.plan === 'Premium';
    return true;
  });

  const stats = [
    { label: 'Active Subs', value: '12,431', icon: UserCheck, color: '#6EE7B7' },
    { label: 'Expiring Soon', value: '842', icon: AlertTriangle, color: '#FBBF24' },
    { label: 'Churned', value: '124', icon: History, color: '#FF6B35' },
    { label: 'Revenue Share', value: '₹4.2L', icon: CreditCard, color: '#6C3CE1' },
  ];

  return (
    <div className="space-y-8 animate-in fade-in slide-in-from-bottom-4 duration-500">
      
      {/* STATS OVERVIEW */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
        {stats.map((s, i) => (
          <div key={i} className="p-6 bg-[#111118] border border-[#1E1E2E] rounded-2xl group hover:border-[#6C3CE1]/30 transition-all">
            <div className="flex justify-between items-start mb-4">
              <div className="p-3 bg-[#0A0A0F] rounded-xl" style={{ color: s.color }}>
                <s.icon size={20} />
              </div>
            </div>
            <p className="text-[10px] font-black text-[#64748B] uppercase tracking-widest mb-1 font-mono">{s.label}</p>
            <h3 className="text-2xl font-black text-white italic font-syne tracking-tighter">{s.value}</h3>
          </div>
        ))}
      </div>

      {/* HEADER & FILTERS */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-6 bg-[#111118] p-8 border border-[#1E1E2E] rounded-[32px]">
        <div className="space-y-1">
          <h2 className="text-xl font-black font-syne uppercase italic tracking-tighter text-white">Users & Subscriptions</h2>
          <p className="text-[10px] font-black text-[#64748B] uppercase tracking-[0.2em] font-mono italic">Manage access and billing cycles</p>
        </div>
        <div className="flex flex-wrap gap-2">
          {['All Users', 'Trial', 'Pro', 'Premium', 'Suspended'].map(f => (
            <button key={f} onClick={() => setFilter(f)} className={`px-4 py-2 text-[9px] font-black uppercase tracking-widest rounded-full border transition-all ${filter === f ? 'bg-[#6C3CE1] border-[#6C3CE1] text-white shadow-lg shadow-[#6C3CE1]/20' : 'bg-[#0A0A0F] border-[#1E1E2E] text-[#64748B] hover:border-[#6C3CE1]/40'}`}>
              {f}
            </button>
          ))}
        </div>
      </div>

      {/* TABLE */}
      <div className="bg-[#111118] border border-[#1E1E2E] rounded-[32px] overflow-hidden">
        <div className="p-8 border-b border-[#1E1E2E] flex flex-col md:flex-row md:items-center justify-between gap-6">
          <div className="relative flex-1">
            <Search className="absolute left-5 top-1/2 -translate-y-1/2 text-[#64748B] w-4 h-4" />
            <input 
              type="text" 
              placeholder="SEARCH_USERS_BY_SUB_ID_OR_EMAIL" 
              className="bg-[#0A0A0F] border border-[#1E1E2E] rounded-full pl-14 pr-8 py-3.5 text-xs font-bold uppercase tracking-widest outline-none focus:border-[#6C3CE1]/50 transition-all w-full font-mono italic text-white"
            />
          </div>
          <button className="flex items-center gap-2 px-6 py-3.5 bg-[#0A0A0F] border border-[#1E1E2E] rounded-full text-[10px] font-black uppercase tracking-widest text-[#64748B] hover:text-[#E2E8F0]">
            <Filter size={14} /> Advanced Filters
          </button>
        </div>

        <div className="overflow-x-auto">
          <table className="w-full text-left">
            <thead>
              <tr className="bg-[#16161D] text-[10px] font-black text-[#64748B] uppercase tracking-[0.2em] font-mono border-b border-[#1E1E2E]">
                <th className="px-8 py-5">User_Details</th>
                <th className="px-8 py-5">Sub_Tier</th>
                <th className="px-8 py-5">Razorpay_Status</th>
                <th className="px-8 py-5 text-center">Renewal_Date</th>
                <th className="px-8 py-5 text-right">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-[#1E1E2E]">
              {filteredUsers.map((user) => (
                <tr key={user.id} className="hover:bg-white/[0.02] transition-colors group">
                  <td className="px-8 py-6">
                    <div className="flex items-center gap-4">
                      <div className="w-12 h-12 rounded-2xl bg-[#0A0A0F] border border-[#1E1E2E] flex items-center justify-center font-black italic group-hover:border-[#6C3CE1]/40 shadow-xl transition-all" style={{ color: user.color }}>
                        {user.initials}
                      </div>
                      <div>
                        <p className="text-sm font-black uppercase tracking-tight text-white">{user.name}</p>
                        <p className="text-[10px] font-bold text-[#64748B] tracking-wide font-mono">@{user.username}</p>
                      </div>
                    </div>
                  </td>
                  <td className="px-8 py-6">
                    <div className="flex flex-col gap-1">
                      <span className={`px-2 py-0.5 rounded text-[9px] font-black uppercase tracking-widest w-fit border`} 
                        style={{ color: user.color, borderColor: `${user.color}40`, backgroundColor: `${user.color}10` }}>
                        {user.plan}
                      </span>
                      {user.plan !== 'Free' && user.plan !== 'Trial' && (
                        <p className="text-[8px] font-black text-[#64748B] uppercase tracking-tighter">Auto-Renewal ON</p>
                      )}
                    </div>
                  </td>
                  <td className="px-8 py-6">
                    <div className="flex flex-col gap-2">
                      <div className="flex items-center gap-1.5 min-w-[120px]">
                         <span className={`w-1.5 h-1.5 rounded-full ${user.syncStatus === 'synced' ? 'bg-[#6EE7B7]' : user.syncStatus === 'none' ? 'bg-[#64748B]' : 'bg-[#FF6B35]'}`} />
                         <span className="text-[9px] font-black uppercase text-white/50 tracking-tighter font-mono">{user.rzpId}</span>
                      </div>
                      <span className={`px-2 py-0.5 rounded text-[8px] font-bold uppercase tracking-widest w-fit ${user.syncStatus === 'synced' ? 'text-[#6EE7B7] bg-[#6EE7B7]/10' : 'text-[#64748B] bg-white/5'}`}>
                        {user.syncStatus === 'synced' ? 'PRO_LINKED_SHELL' : 'LOCAL_ONLY'}
                      </span>
                    </div>
                  </td>
                  <td className="px-8 py-6 text-center">
                    <div className="flex flex-col items-center gap-1">
                      <p className="text-xs font-black text-white font-mono">{user.expiry}</p>
                      {user.plan !== 'Free' && (
                        <div className="w-20 h-1 bg-[#1E1E2E] rounded-full overflow-hidden">
                           <div className="h-full bg-[#6C3CE1]" style={{ width: '60%' }} />
                        </div>
                      )}
                    </div>
                  </td>
                  <td className="px-8 py-6 text-right">
                    <div className="flex items-center justify-end gap-2">
                      <button 
                        onClick={() => openManage(user)}
                        className="p-3 bg-[#0A0A0F] border border-[#1E1E2E] hover:bg-[#6C3CE1] hover:border-[#6C3CE1] text-white rounded-xl transition-all shadow-lg" 
                        title="Manage Subscription"
                      >
                        <Zap size={16} />
                      </button>
                      <button className="p-3 bg-[#0A0A0F] border border-[#1E1E2E] hover:bg-white hover:text-black rounded-xl transition-all shadow-lg" title="View Full Report">
                        <ExternalLink size={16} />
                      </button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      {/* QUICK_MANAGE_MODAL */}
      {selectedUser && (
        <div className="fixed inset-0 z-[100] flex items-center justify-center p-6 bg-[#0A0A0F]/90 backdrop-blur-sm animate-in fade-in duration-300">
          <div className="w-full max-w-lg bg-[#111118] border border-[#1E1E2E] rounded-[40px] overflow-hidden shadow-2xl animate-in zoom-in-95 duration-300">
             <div className="p-8 border-b border-[#1E1E2E] flex items-center justify-between">
                <div>
                   <h3 className="text-xl font-black font-syne uppercase italic tracking-tighter text-white">Manage Subscription</h3>
                   <p className="text-[10px] font-black text-[#64748B] uppercase tracking-widest font-mono italic mt-1">Editing node: {selectedUser.username}</p>
                </div>
                <button onClick={() => setSelectedUser(null)} className="p-3 bg-[#0A0A0F] rounded-2xl text-[#64748B] hover:text-white transition-colors">
                  <X size={20} />
                </button>
             </div>

             <div className="p-8 space-y-8">
                <div className="grid grid-cols-2 gap-6">
                   <div className="space-y-3">
                      <p className="text-[10px] font-black uppercase tracking-widest text-[#64748B] font-mono">Current_Tier</p>
                      <select 
                        value={editTier}
                        onChange={(e) => {
                          const newTier = e.target.value;
                          setEditTier(newTier);
                          
                          // AUTO_LOGIC: If switching to Trial, set expiry to 7 days from now
                          if (newTier === 'Trial') {
                            const trialEnd = new Date();
                            trialEnd.setDate(trialEnd.getDate() + 7);
                            setEditExpiry(trialEnd.toLocaleDateString('en-IN', { 
                              day: 'numeric', 
                              month: 'short', 
                              year: 'numeric' 
                            }));
                            setEditBilling('N/A');
                          }
                          
                          if (newTier === 'Free') {
                             setEditExpiry('Never');
                             setEditBilling('N/A');
                          }
                        }}
                        className="w-full bg-[#0A0A0F] border border-[#1E1E2E] rounded-2xl px-5 py-4 text-xs font-black uppercase tracking-widest text-white outline-none focus:border-[#6C3CE1]"
                      >
                         <option>Free</option>
                         <option>Trial</option>
                         <option>Pro</option>
                         <option>Premium</option>
                      </select>
                   </div>
                   <div className="space-y-3">
                      <p className="text-[10px] font-black uppercase tracking-widest text-[#64748B] font-mono">Billing_Mode</p>
                      <select 
                        value={editBilling}
                        onChange={(e) => setEditBilling(e.target.value)}
                        className="w-full bg-[#0A0A0F] border border-[#1E1E2E] rounded-2xl px-5 py-4 text-xs font-black uppercase tracking-widest text-white outline-none focus:border-[#6C3CE1]"
                      >
                         <option>Monthly</option>
                         <option>Annual</option>
                         <option>N/A</option>
                      </select>
                   </div>
                </div>

                <div className="space-y-3">
                   <p className="text-[10px] font-black uppercase tracking-widest text-[#64748B] font-mono">Subscription_Expiry_Override</p>
                   <div className="relative">
                      <Calendar className="absolute left-5 top-1/2 -translate-y-1/2 text-[#64748B]" size={18} />
                      <input 
                        type="text" 
                        value={editExpiry}
                        onChange={(e) => setEditExpiry(e.target.value)}
                        className="w-full bg-[#0A0A0F] border border-[#1E1E2E] rounded-2xl pl-14 pr-5 py-4 text-xs font-black uppercase tracking-widest text-white outline-none focus:border-[#6C3CE1]" 
                      />
                   </div>
                </div>

                <div className="p-6 bg-[#FF6B35]/5 border border-[#FF6B35]/20 rounded-3xl space-y-4">
                   <div className="flex gap-4">
                      <AlertTriangle className="text-[#FF6B35] flex-shrink-0" size={20} />
                      <div className="space-y-2">
                         <p className="text-[10px] font-bold text-[#E2E8F0] uppercase leading-relaxed tracking-wider">
                            Razorpay Subscription Control
                         </p>
                         <p className="text-[9px] text-[#64748B] uppercase tracking-tighter">
                            Linked ID: <span className="text-white font-mono">{selectedUser.rzpId}</span>
                         </p>
                      </div>
                   </div>
                   <div className="flex gap-2">
                     <button className="flex-1 py-3 bg-[#FF6B35] text-white rounded-xl text-[9px] font-black uppercase tracking-widest hover:opacity-90">
                       <History size={14} className="inline mr-1" /> Terminate Billing
                     </button>
                     <button className="flex-1 py-3 bg-[#111118] border border-[#1E1E2E] text-white rounded-xl text-[9px] font-black uppercase tracking-widest hover:bg-[#1E1E2E]">
                       <RefreshCw size={14} className="inline mr-1" /> Force Sync
                     </button>
                   </div>
                </div>

                <div className="flex gap-4">
                   <button 
                    onClick={handleCommit}
                    className="flex-1 py-5 bg-[#6C3CE1] text-white rounded-2xl text-[10px] font-black uppercase tracking-widest shadow-xl shadow-[#6C3CE1]/20 hover:opacity-90 active:scale-[0.98] transition-all"
                   >
                      <Save size={16} className="inline mr-2" /> Commit Overrides
                   </button>
                   <button onClick={() => setSelectedUser(null)} className="px-8 py-5 bg-[#1E1E2E] text-white rounded-2xl text-[10px] font-black uppercase tracking-widest hover:bg-[#252535]">
                      Dismiss
                   </button>
                </div>
             </div>
          </div>
        </div>
      )}
    </div>
  );
};
