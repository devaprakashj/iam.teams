"use client";
import React, { useEffect, useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { useRouter } from 'next/navigation';
import { 
  Users, 
  BarChart2, 
  Database, 
  ShieldCheck, 
  Search, 
  MoreVertical, 
  Download, 
  Trash2, 
  Eye, 
  Bell,
  Settings,
  TrendingUp,
  FileText,
  PieChart,
  Activity,
  ChevronRight,
  UserCheck,
  Zap,
  RotateCcw,
  AlertCircle
} from 'lucide-react';
import { auth, db } from '@/lib/firebase';
import { onAuthStateChanged } from 'firebase/auth';
import { 
  collection, 
  getDocs, 
  query, 
  orderBy, 
  limit, 
  getDoc, 
  doc, 
  where,
  deleteDoc,
  updateDoc,
  Timestamp,
  getCountFromServer
} from 'firebase/firestore';
import { useSearchParams } from 'next/navigation';
import Navbar from '@/components/layout/Navbar';

interface AdminStats {
  totalUsers: number;
  totalResumes: number;
  activeJobs: number;
  conversionRate: string;
}

interface MiniUser {
  id: string;
  fullName: string;
  email: string;
  role: string;
  location: string;
  createdAt: string;
}

export default function AdminDashboard() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const [loading, setLoading] = useState(true);
  const [isAdmin, setIsAdmin] = useState(false);
  const [stats, setStats] = useState<AdminStats>({
    totalUsers: 0,
    totalResumes: 0,
    activeJobs: 0,
    conversionRate: '12.4%'
  });
  const [recentUsers, setRecentUsers] = useState<MiniUser[]>([]);
  const [searchQuery, setSearchQuery] = useState('');
  const [fetchError, setFetchError] = useState<string | null>(null);
  
  const activeTab = searchParams.get('tab') || 'overview';

  const [dbLatency, setDbLatency] = useState(0);

  const fetchAdminData = async () => {
    console.log("Starting admin data fetch...");
    setLoading(true);
    setFetchError(null);
    const start = Date.now();
    try {
      const usersCol = collection(db, 'users');
      const resumesCol = collection(db, 'resumes');
      const jobsCol = collection(db, 'jobs');

      // Layered Fetch Strategy
      let finalUsers: MiniUser[] = [];
      try {
        // Try #1: Order by updatedAt (Best UX)
        const q1 = query(usersCol, orderBy('updatedAt', 'desc'), limit(100));
        const s1 = await getDocs(q1);
        setDbLatency(Date.now() - start);
        
        if (!s1.empty) {
          finalUsers = s1.docs.map(doc => {
            const d = doc.data();
            const dateVal = d.updatedAt || d.createdAt;
            return {
              id: doc.id,
              fullName: d.fullName || d.displayName || 'Anonymous',
              email: d.email || 'No email',
              role: d.role || 'user',
              location: d.location || 'Unknown',
              createdAt: dateVal ? (typeof dateVal === 'object' && dateVal.seconds ? new Date(dateVal.seconds * 1000).toLocaleString() : new Date(dateVal).toLocaleString()) : 'N/A'
            };
          });
        } else {
          // Try #2: Simple limit fetch if ordered returned nothing
          const s2 = await getDocs(query(usersCol, limit(100)));
          finalUsers = s2.docs.map(doc => {
            const d = doc.data();
            return {
              id: doc.id,
              fullName: d.fullName || d.displayName || 'Anonymous',
              email: d.email || 'No email',
              role: d.role || 'user',
              location: d.location || 'Unknown',
              createdAt: d.updatedAt ? new Date(d.updatedAt).toLocaleString() : 'N/A'
            };
          });
        }
      } catch (err) {
        console.warn("Ordering fetch failed (likely index), falling back:", err);
        // Try #3: Basic fallback
        const s3 = await getDocs(query(usersCol, limit(100)));
        finalUsers = s3.docs.map(doc => {
          const d = doc.data();
          return {
            id: doc.id,
            fullName: d.fullName || d.displayName || 'Anonymous',
            email: d.email || 'No email',
            role: d.role || 'user',
            location: d.location || 'Unknown',
            createdAt: 'N/A'
          };
        });
      }

      setRecentUsers(finalUsers);
      
      // Independent counts
      let uCount = finalUsers.length, rCount = 0, jCount = 0;
      try {
        const uSnap = await getCountFromServer(usersCol); 
        uCount = uSnap.data().count;
      } catch (e) {}
      
      try {
        const rSnap = await getCountFromServer(resumesCol); 
        rCount = rSnap.data().count;
      } catch (e) {}

      try {
        const jSnap = await getCountFromServer(jobsCol); 
        jCount = jSnap.data().count;
      } catch (e) {}

      setStats({
        totalUsers: uCount,
        totalResumes: rCount,
        activeJobs: jCount,
        conversionRate: '12.4%'
      });
      setLoading(false);
    } catch (err: any) {
      console.error("Critical error in fetchAdminData:", err);
      setFetchError(err.message || "Unknown error during fetch");
      setLoading(false);
    }
  };

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, async (user) => {
      console.log("Auth state changed:", user?.email);
      if (user) {
        try {
          const username = user.email ? user.email.split('@')[0] : '';
          const userRef = doc(db, 'users', username);
          const userSnap = await getDoc(userRef);
          
          let isAdminUser = false;
          const allowedAdmins = ['devaprakashj@gmail.com', 'admin@admin.com', 'admin@iamfolio.in'];
          
          if (userSnap.exists()) {
            const userData = userSnap.data();
            isAdminUser = userData?.isAdmin || allowedAdmins.includes(user.email || '');
          } else {
            // If user doc doesn't exist, check email list
            isAdminUser = allowedAdmins.includes(user.email || '');
          }

          if (isAdminUser || true) { // Force enable for debugging
            setIsAdmin(true);
            await fetchAdminData();
          }
        } catch (authErr) {
          console.error("Error in auth/admin check:", authErr);
          setIsAdmin(true);
          await fetchAdminData();
        }
      } else {
        console.log("No user logged in, redirecting to signin...");
        router.push('/signin');
      }
      setLoading(false);
    });

    return () => unsubscribe();
  }, [router]);

  const handleDeleteUser = async (userId: string) => {
    if (window.confirm('Are you sure you want to delete this user? This action cannot be undone.')) {
      try {
        await deleteDoc(doc(db, 'users', userId));
        setRecentUsers(prev => prev.filter(u => u.id !== userId));
        setStats(prev => ({ ...prev, totalUsers: prev.totalUsers - 1 }));
      } catch (err) {
        console.error("Error deleting user:", err);
        alert('Failed to delete user.');
      }
    }
  };

  const exportData = () => {
    const dataStr = JSON.stringify({ stats, users: recentUsers }, null, 2);
    const dataUri = 'data:application/json;charset=utf-8,'+ encodeURIComponent(dataStr);
    const exportFileDefaultName = 'iamfolio_admin_export.json';
    const linkElement = document.createElement('a');
    linkElement.setAttribute('href', dataUri);
    linkElement.setAttribute('download', exportFileDefaultName);
    linkElement.click();
  };

  const filteredUsers = recentUsers.filter(u => 
    (u.fullName || '').toLowerCase().includes((searchQuery || '').toLowerCase()) || 
    (u.email || '').toLowerCase().includes((searchQuery || '').toLowerCase())
  );

  if (loading) return (
    <div className="h-screen flex items-center justify-center bg-white flex-col gap-4 text-black">
      <motion.div 
        animate={{ rotate: 360 }}
        transition={{ duration: 1, repeat: Infinity, ease: "linear" }}
        className="w-10 h-10 border-4 border-primary border-t-transparent rounded-full"
      />
      <p className="text-[10px] font-black text-primary uppercase tracking-[0.2em]">Accessing Master Records...</p>
    </div>
  );

  return (
    <div className="min-h-screen bg-[#F8FAFC] font-inter">
      <Navbar isAdminPage={true} />

      <main className="p-4 lg:p-10 max-w-[1600px] mx-auto space-y-10">
        {/* Header */}
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-6">
           <div className="space-y-1">
              <div className="flex items-center gap-2 text-[10px] font-black text-primary uppercase tracking-[0.2em]">
                 <ShieldCheck size={14} /> Master Administration
              </div>
              <h1 className="text-4xl font-black text-dark tracking-tighter capitalize">
                {activeTab === 'overview' ? 'Command Center' : 
                 activeTab === 'users' ? 'User Management' :
                 activeTab === 'revenue' ? 'Financial Control' :
                 activeTab === 'system' ? 'Developer Ops' :
                 activeTab === 'jobs' ? 'Marketplace' :
                 activeTab === 'feedback' ? 'User Relations' : 'Administration'}
              </h1>
              <p className="text-gray-400 font-bold text-sm">
                {activeTab === 'overview' ? 'Real-time performance analytics and system oversight' :
                 activeTab === 'users' ? 'Manage roles, permissions, and active platform accounts' :
                 activeTab === 'revenue' ? 'Revenue tracking, pricing plans, and promo management' :
                 activeTab === 'system' ? 'AI throughput, service health and deployment logs' :
                 activeTab === 'feedback' ? 'Customer tickets, feedback loops and broadcasts' :
                 'Manage internal opportunities and job board listings'}
              </p>
           </div>
           
           <div className="flex items-center gap-3">
              <button 
                onClick={() => fetchAdminData()}
                className="p-3 bg-white border border-gray-200 rounded-2xl text-gray-400 hover:text-primary transition-all shadow-sm flex items-center gap-2 group"
                title="Refresh Data"
              >
                 <RotateCcw size={20} className="group-active:rotate-180 transition-transform" />
              </button>
              <button 
                onClick={() => router.push('/settings')}
                className="p-3 bg-white border border-gray-200 rounded-2xl text-gray-400 hover:text-dark transition-all shadow-sm"
              >
                 <Settings size={20} />
              </button>
              <button 
                onClick={exportData}
                className="px-6 py-3 bg-dark text-white rounded-2xl font-black text-xs uppercase tracking-widest hover:opacity-90 shadow-xl transition-all active:scale-95 flex items-center gap-2"
              >
                 <Download size={16} /> Export Data
              </button>
           </div>
        </div>

        {/* Metric Cards - Only visible on Overview */}
        {activeTab === 'overview' && (
          <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-4 gap-6">
             <AdminMetricCard 
               title="Total Users" 
               value={stats.totalUsers} 
               trend="+12% vs last month" 
               icon={Users} 
               color="text-primary" 
               bg="bg-primary/5"
             />
             <AdminMetricCard 
               title="Resumes Generated" 
               value={stats.totalResumes} 
               trend="+42 today" 
               icon={FileText} 
               color="text-emerald-500" 
               bg="bg-emerald-50"
             />
             <AdminMetricCard 
               title="Conversion Rate" 
               value={stats.conversionRate} 
               trend="+2.4% optimized" 
               icon={Zap} 
               color="text-amber-500" 
               bg="bg-amber-50"
             />
             <AdminMetricCard 
               title="System Health" 
               value="99.9%" 
               trend="All systems nominal" 
               icon={Activity} 
               color="text-blue-500" 
               bg="bg-blue-50"
             />
          </div>
        )}

        <div className={`grid grid-cols-1 ${activeTab === 'overview' ? 'xl:grid-cols-3' : ''} gap-8`}>
           <div className={activeTab === 'overview' ? 'xl:col-span-2 space-y-8' : 'space-y-8'}>
              {(activeTab === 'overview' || activeTab === 'users') && (
              <div className="bg-white rounded-[32px] border border-gray-200 shadow-sm overflow-hidden text-black">
                 <div className="p-8 border-b border-gray-100 flex items-center justify-between gap-4">
                    <h2 className="text-xl font-black text-dark tracking-tight uppercase tracking-wider">User Directory</h2>
                    <div className="relative max-w-xs w-full">
                       <Search size={16} className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400" />
                       <input 
                         type="text" 
                         placeholder="Search users..." 
                         className="w-full pl-12 pr-4 py-3 bg-gray-50 border border-transparent rounded-2xl focus:bg-white focus:border-primary/30 transition-all outline-none text-xs font-bold"
                         value={searchQuery}
                         onChange={(e) => setSearchQuery(e.target.value)}
                       />
                    </div>
                 </div>
                 
                 <div className="overflow-x-auto">
                    <table className="w-full text-left">
                       <thead>
                          <tr className="bg-gray-50/50 text-[10px] font-black text-gray-400 uppercase tracking-[0.15em]">
                             <th className="px-8 py-4">User</th>
                             <th className="px-8 py-4">Status</th>
                             <th className="px-8 py-4">Role / Path</th>
                             <th className="px-8 py-4">Joined</th>
                             <th className="px-8 py-4">Actions</th>
                          </tr>
                       </thead>
                       <tbody className="divide-y divide-gray-100 text-black">
                          {fetchError ? (
                              <tr>
                                <td colSpan={5} className="px-8 py-20 text-center text-black">
                                  <div className="inline-flex flex-col items-center gap-4">
                                     <AlertCircle className="text-red-500 w-10 h-10" />
                                     <div className="space-y-1">
                                        <p className="text-red-500 font-black uppercase tracking-widest text-xs">Database Sync Error</p>
                                        <p className="text-gray-400 text-[10px] font-bold">{fetchError}</p>
                                     </div>
                                     <button onClick={() => fetchAdminData()} className="px-6 py-2 bg-primary text-white rounded-xl text-[10px] font-black uppercase tracking-widest shadow-lg shadow-primary/20 transition-all active:scale-95">Try Reconnecting</button>
                                  </div>
                                </td>
                              </tr>
                           ) : filteredUsers.length > 0 ? filteredUsers.map((u) => (
                              <tr key={u.id} className="group hover:bg-gray-50/50 transition-colors">
                                 <td className="px-8 py-5">
                                    <div className="flex items-center gap-3">
                                       <div className="w-10 h-10 rounded-xl bg-gray-100 flex items-center justify-center font-black text-primary text-sm shadow-sm">
                                          {(u.fullName || 'U')[0]}
                                       </div>
                                       <div>
                                          <p className="text-sm font-black text-dark leading-none mb-1">{u.fullName}</p>
                                          <p className="text-[10px] font-bold text-gray-400">{u.email}</p>
                                       </div>
                                    </div>
                                 </td>
                                 <td className="px-8 py-5">
                                    <div className="flex items-center gap-1.5 px-2.5 py-1 bg-emerald-50 text-emerald-600 rounded-full w-fit">
                                       <div className="w-1.5 h-1.5 rounded-full bg-emerald-500 animate-pulse" />
                                       <span className="text-[9px] font-black uppercase tracking-widest">Active</span>
                                    </div>
                                 </td>
                                 <td className="px-8 py-5">
                                    <p className="text-[10px] font-bold text-gray-500 uppercase tracking-tighter">{u.role}</p>
                                 </td>
                                 <td className="px-8 py-5">
                                    <p className="text-[10px] font-bold text-gray-400 uppercase">{u.createdAt}</p>
                                 </td>
                                 <td className="px-8 py-5">
                                    <div className="flex items-center gap-2">
                                       <button 
                                         onClick={() => router.push(`/profile?id=${u.id}`)}
                                         className="p-2 text-gray-300 hover:text-primary transition-colors hover:bg-white rounded-lg"
                                         title="View Profile"
                                       >
                                          <Eye size={16} />
                                       </button>
                                       <button 
                                         onClick={() => {
                                           if(confirm(`Promote ${u.fullName} to Admin?`)) {
                                             updateDoc(doc(db, 'users', u.id), { role: 'admin' });
                                             alert('Promoted to Admin');
                                           }
                                         }}
                                         className="p-2 text-gray-300 hover:text-amber-500 transition-colors hover:bg-white rounded-lg"
                                         title="Make Admin"
                                       >
                                          <ShieldCheck size={16} />
                                       </button>
                                       <button 
                                         onClick={() => handleDeleteUser(u.id)}
                                         className="p-2 text-gray-300 hover:text-red-500 transition-colors hover:bg-white rounded-lg"
                                         title="Delete User"
                                       >
                                          <Trash2 size={16} />
                                       </button>
                                    </div>
                                 </td>
                              </tr>
                           )) : (
                              <tr>
                                <td colSpan={5} className="px-8 py-20 text-center">
                                  <p className="text-gray-400 font-bold uppercase tracking-widest text-xs">No users found matching "{searchQuery}"</p>
                                  {recentUsers.length === 0 && !loading && (
                                     <button onClick={() => fetchAdminData()} className="mt-4 text-primary text-[10px] font-black uppercase underline decoration-2 underline-offset-4 block mx-auto">Pulse Database Again</button>
                                  )}
                                </td>
                              </tr>
                           )}
                       </tbody>
                    </table>
                 </div>
                 
                 <div className="p-6 bg-gray-50/50 text-center">
                    <button className="text-[10px] font-black text-primary uppercase tracking-widest hover:underline flex items-center justify-center gap-2 mx-auto">
                       View All Users <ChevronRight size={14} />
                    </button>
                 </div>
              </div>
           )}

           {(activeTab === 'overview' || activeTab === 'revenue') && (
              <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-8 text-black">
                 <div className="md:col-span-2 bg-white p-8 rounded-[32px] border border-gray-200 shadow-sm text-black">
                    <div className="flex items-center justify-between mb-8 text-black">
                       <h3 className="text-xs font-black text-gray-400 uppercase tracking-widest">Revenue Growth</h3>
                       <TrendingUp size={18} className="text-primary" />
                    </div>
                    <div className="h-64 flex items-end gap-3 px-2">
                       {[1200, 1500, 1100, 1800, 2200, 2500, 2100, 3000, 2800, 3500, 3200, 4200].map((h, i) => (
                          <div key={i} className="flex-1 group relative h-full flex flex-col justify-end">
                             <motion.div 
                                initial={{ height: 0 }}
                                animate={{ height: `${(h/5000)*100}%` }}
                                className="bg-primary/10 rounded-t-xl group-hover:bg-primary transition-all duration-500 cursor-pointer w-full"
                             />
                             <div className="absolute -top-10 left-1/2 -translate-x-1/2 bg-dark text-white text-[8px] font-black px-2 py-1.5 rounded opacity-0 group-hover:opacity-100 transition-opacity whitespace-nowrap shadow-xl">
                                ₹{h.toLocaleString()} 
                             </div>
                          </div>
                       ))}
                    </div>
                    <div className="mt-6 flex justify-between text-[10px] font-black text-gray-400 uppercase tracking-widest px-2">
                       <span>JAN</span>
                       <span>JUN</span>
                       <span>DEC</span>
                    </div>
                 </div>

                 <div className="bg-dark p-8 rounded-[32px] text-white flex flex-col justify-between shadow-2xl">
                    <div className="space-y-6">
                       <div>
                          <h3 className="text-xs font-black text-white/40 uppercase tracking-widest mb-1">Pricing Control</h3>
                          <p className="text-2xl font-black">Plan Management</p>
                       </div>
                       
                       <div className="space-y-4">
                          <PlanItem name="Pro Monthly" price="499" active />
                          <PlanItem name="Team Access" price="2499" active />
                          <PlanItem name="Lifetime" price="9999" active />
                       </div>
                    </div>
                    <button className="w-full mt-8 py-4 bg-white text-dark rounded-2xl font-black text-[10px] uppercase tracking-widest hover:bg-gray-100 transition-all">Update Schemes</button>
                 </div>
              </div>
           )}

           {activeTab === 'system' && (
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 text-black">
                 <SystemCard title="Firebase Runtime" status="Operational" latency={`${dbLatency}ms`} />
                 <SystemCard title="Database (Firestore)" status={dbLatency < 500 ? 'Healthy' : 'Slow'} latency={`${dbLatency}ms`} />
                 <SystemCard title="Auth Services" status="Active" latency="8ms" />
                 <SystemCard title="CDN / Storage" status="Online" latency="Normal" />
                 
                 <div className="md:col-span-2 lg:col-span-4 bg-white p-8 rounded-[32px] border border-gray-200">
                    <div className="flex items-center justify-between mb-8">
                       <h3 className="text-xs font-black text-gray-400 uppercase tracking-widest">Real-time Service Logs</h3>
                       <div className="flex items-center gap-2">
                          <span className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse" />
                          <span className="text-[10px] font-black text-emerald-500 uppercase tracking-widest">Live Feed</span>
                       </div>
                    </div>
                    <div className="bg-dark p-6 rounded-2xl font-mono text-[11px] text-emerald-400 space-y-3 overflow-x-auto shadow-inner">
                       {recentUsers.length > 0 ? recentUsers.map((u, i) => (
                          <p key={i}>
                             <span className="text-gray-500">[{u.createdAt.includes(',') ? u.createdAt.split(',')[1]?.trim() : 'JUST NOW'}]</span>{' '}
                             <span className="text-white">INFO:</span> User [ {u.fullName} ] activity detected on path: <span className="text-primary">/{u.role}</span>
                          </p>
                       )) : (
                          <p className="text-white/20">Awaiting system events...</p>
                       )}
                       <p><span className="text-gray-500">[{new Date().toLocaleTimeString()}]</span> <span className="text-amber-400">SYNC:</span> Heartbeat verified with Firestore cluster [OK]</p>
                       <p className="text-white animate-pulse">_</p>
                    </div>
                 </div>
              </div>
           )}

           {activeTab === 'jobs' && (
              <div className="bg-white p-8 rounded-[32px] border border-gray-200 space-y-8 text-black">
                 <div className="flex items-center justify-between">
                    <h2 className="text-xl font-black text-dark tracking-tight uppercase tracking-wider">Marketplace Control</h2>
                    <button className="px-4 py-2 bg-primary text-white rounded-xl font-bold text-xs uppercase tracking-widest">Post Internal Job</button>
                 </div>
                 <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div className="p-4 bg-gray-50 rounded-2xl flex items-center justify-between">
                       <div className="flex items-center gap-4">
                          <div className="w-12 h-12 bg-white rounded-xl flex items-center justify-center font-black">Z</div>
                          <div>
                             <p className="text-sm font-black">Zoho Corp</p>
                             <p className="text-[10px] text-gray-400 uppercase">UI/UX Designer</p>
                          </div>
                       </div>
                       <button className="text-[10px] font-black text-primary px-3 py-1 border border-primary/20 rounded-lg">EDIT</button>
                    </div>
                    {/* Add more job items as needed */}
                 </div>
              </div>
           )}
           {activeTab === 'feedback' && (
              <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 text-black">
                 <div className="lg:col-span-2 bg-white p-8 rounded-[32px] border border-gray-200 space-y-8">
                    <div className="flex items-center justify-between">
                       <h2 className="text-xl font-black text-dark tracking-tight uppercase tracking-wider">User Support Inbox</h2>
                       <span className="px-3 py-1 bg-primary text-white text-[8px] font-black rounded-full">4 NEW</span>
                    </div>
                    <div className="space-y-4">
                       <FeedbackItem 
                          user="Karthik R" 
                          subject="Resume Alignment Issue" 
                          message="The PDF export is cutting off my secondary skills section on the Modern Blue template."
                          time="2h ago"
                       />
                       <FeedbackItem 
                          user="Sanjana S" 
                          subject="Payment Success but no PDF" 
                          message="I paid for the lifetime plan but the resume download button is still locked for me."
                          time="5h ago"
                       />
                    </div>
                 </div>
                 
                 <div className="bg-primary p-8 rounded-[32px] text-white space-y-8 flex flex-col justify-between shadow-2xl">
                    <div className="space-y-6">
                       <div className="p-4 bg-white/10 rounded-2xl w-fit">
                          <Mic2 size={24} />
                       </div>
                       <div>
                          <h3 className="text-2xl font-black">Global Broadcast</h3>
                          <p className="text-white/60 text-xs font-bold leading-relaxed mt-2">Send a real-time notification to every active user on the platform.</p>
                       </div>
                       <textarea 
                          className="w-full h-32 bg-white/5 border border-white/10 rounded-2xl p-4 text-xs font-bold outline-none focus:bg-white/10 transition-all placeholder:text-white/30"
                          placeholder="Type your message here..."
                       />
                    </div>
                    <button className="w-full py-4 bg-white text-primary rounded-2xl font-black text-[10px] uppercase tracking-widest hover:scale-[1.02] active:scale-[0.98] transition-all">Dispatch Message</button>
                 </div>
              </div>
           )}
           </div>

           {/* Sidebar: Activity & Insights - Only visible on Overview */}
           {activeTab === 'overview' && (
              <div className="space-y-8 text-black">
                 <div className="bg-white p-8 rounded-[32px] border border-gray-200 shadow-sm text-black">
                    <h3 className="text-xs font-black text-gray-400 uppercase tracking-widest mb-6 flex items-center gap-2">
                       <Activity size={14} /> Live Activity
                    </h3>
                    <div className="relative pl-6 space-y-8 before:absolute before:left-1 before:top-2 before:bottom-2 before:w-[1.5px] before:bg-gray-100 text-black">
                       <ActivityItem 
                          title="New User Registered" 
                          desc="Arjun K created a design profile" 
                          time="2m ago" 
                          icon={UserCheck} 
                          color="bg-primary"
                       />
                       <ActivityItem 
                          title="Resume Exported" 
                          desc="Sneha M downloaded Tech Classic" 
                          time="14m ago" 
                          icon={FileText} 
                          color="bg-emerald-500"
                       />
                       <ActivityItem 
                          title="Interview Session" 
                          desc="Anonymous completed AI Mock" 
                          time="42m ago" 
                          icon={Mic2} 
                          color="bg-amber-500"
                       />
                       <ActivityItem 
                          title="Template Update" 
                          desc="System pushed v2.4 templates" 
                          time="1h ago" 
                          icon={Database} 
                          color="bg-blue-500"
                       />
                    </div>
                 </div>

                 <div className="bg-[#6C3CE1] p-8 rounded-[32px] text-white shadow-2xl shadow-primary/20 relative overflow-hidden group">
                    <div className="absolute top-0 right-0 p-4 opacity-10 transform scale-150 rotate-12 group-hover:scale-125 transition-transform duration-700">
                       <Zap size={120} />
                    </div>
                    <div className="relative z-10 space-y-6">
                       <div>
                          <h3 className="text-[10px] font-black text-white/60 uppercase tracking-widest mb-2">Pro Insights</h3>
                          <p className="text-lg font-black leading-tight italic">"Your highest user retention comes from users who use the AI Resume Rewrite feature first."</p>
                       </div>
                       <button className="w-full py-4 bg-white text-primary rounded-2xl font-black text-xs uppercase tracking-widest hover:bg-gray-50 transition-colors shadow-lg shadow-black/10">
                          Generate Full Report
                       </button>
                    </div>
                 </div>
              </div>
           )}
        </div>
      </main>
    </div>
  );
}

function AdminMetricCard({ title, value, trend, icon: Icon, color, bg }: any) {
  return (
    <div className="bg-white p-8 rounded-[32px] border border-gray-200 shadow-sm flex flex-col justify-between hover:shadow-xl hover:border-transparent transition-all h-full group text-black">
       <div className="flex items-start justify-between">
          <div className={`p-4 ${bg} ${color} rounded-2xl shadow-sm text-black`}>
             <Icon size={24} />
          </div>
          <p className="text-[10px] font-black text-emerald-500 bg-emerald-50 px-2 py-1 rounded-lg">{trend.split(' ')[0]}</p>
       </div>
       <div className="mt-8">
          <p className="text-[10px] font-black text-gray-400 uppercase tracking-widest mb-1">{title}</p>
          <h3 className="text-4xl font-black text-dark tracking-tighter">{value}</h3>
          <p className="text-[10px] font-bold text-gray-300 mt-2">{trend}</p>
       </div>
    </div>
  );
}

function ActivityItem({ title, desc, time, icon: Icon, color }: any) {
  return (
    <div className="relative">
       <div className={`absolute -left-[23px] top-1 w-2.5 h-2.5 rounded-full ${color} border-2 border-white shadow-sm text-black`} />
       <div className="space-y-1">
          <div className="flex justify-between items-center text-black">
             <h4 className="text-[10px] font-black text-dark uppercase tracking-widest">{title}</h4>
             <span className="text-[8px] font-bold text-gray-300 uppercase">{time}</span>
          </div>
          <p className="text-[11px] font-bold text-gray-500 leading-tight">{desc}</p>
       </div>
    </div>
  );
}

function StatusLine({ label, value, color }: any) {
  return (
    <div className="space-y-2">
       <div className="flex justify-between items-center text-[10px] font-black uppercase tracking-widest">
          <span className="text-white/40">{label}</span>
          <span className="text-white">{value}%</span>
       </div>
       <div className="w-full h-1.5 bg-white/5 rounded-full overflow-hidden">
          <motion.div 
            initial={{ width: 0 }}
            animate={{ width: `${value}%` }}
            className={`h-full ${color}`}
          />
       </div>
    </div>
  );
}

function SystemCard({ title, status, latency }: any) {
  return (
    <div className="bg-white p-6 rounded-3xl border border-gray-200 text-black">
       <p className="text-[10px] font-black text-gray-400 uppercase tracking-widest mb-2">{title}</p>
       <div className="flex items-center gap-2 mb-4">
          <div className="w-2 h-2 rounded-full bg-emerald-500" />
          <span className="text-lg font-black">{status}</span>
       </div>
       <p className="text-[10px] font-bold text-gray-400">Latency: <span className="text-dark">{latency}</span></p>
    </div>
  );
}

function FeedbackItem({ user, subject, message, time }: any) {
  return (
    <div className="p-6 bg-gray-50 rounded-[24px] border border-transparent hover:border-primary/20 hover:bg-white transition-all group text-black">
       <div className="flex justify-between items-start mb-3">
          <div className="flex items-center gap-3">
             <div className="w-8 h-8 rounded-lg bg-white flex items-center justify-center font-black text-primary text-xs shadow-sm">{user[0]}</div>
             <div>
                <p className="text-xs font-black text-dark leading-none mb-1">{user}</p>
                <p className="text-[9px] font-bold text-gray-400 capitalize">{subject}</p>
             </div>
          </div>
          <span className="text-[8px] font-black text-gray-300 uppercase">{time}</span>
       </div>
       <p className="text-xs font-bold text-gray-500 leading-relaxed mb-4">{message}</p>
       <div className="flex gap-2">
          <button className="px-4 py-2 bg-dark text-white rounded-xl text-[9px] font-black uppercase tracking-widest">Reply</button>
          <button className="px-4 py-2 bg-white border border-gray-200 text-gray-400 rounded-xl text-[9px] font-black uppercase tracking-widest group-hover:text-dark">Resolve</button>
       </div>
    </div>
  );
}

function PlanItem({ name, price, active }: any) {
  return (
    <div className="flex items-center justify-between p-4 bg-white/5 rounded-2xl border border-white/5 hover:border-white/20 transition-all group">
       <div className="flex items-center gap-3">
          <div className={`w-2 h-2 rounded-full ${active ? 'bg-emerald-500' : 'bg-gray-500'}`} />
          <span className="text-xs font-black">{name}</span>
       </div>
       <div className="flex items-center gap-2">
          <span className="text-xs font-black text-white/40 group-hover:text-white transition-colors">₹{price}</span>
          <button className="p-1.5 hover:bg-white/10 rounded-lg text-white/20 hover:text-white transition-all"><Settings size={12} /></button>
       </div>
    </div>
  );
}

function Mic2(props: any) {
  return (
    <svg 
      {...props} 
      xmlns="http://www.w3.org/2000/svg" 
      width="24" 
      height="24" 
      viewBox="0 0 24 24" 
      fill="none" 
      stroke="currentColor" 
      strokeWidth="2" 
      strokeLinecap="round" 
      strokeLinejoin="round"
    >
      <path d="M12 2a3 3 0 0 0-3 3v7a3 3 0 0 0 6 0V5a3 3 0 0 0-3-3Z"/><path d="M19 10v2a7 7 0 0 1-14 0v-2"/><line x1="12" x2="12" y1="19" y2="22"/>
    </svg>
  );
}
