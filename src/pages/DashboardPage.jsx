import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { useNavigate, Navigate } from 'react-router-dom';
import { 
  LayoutDashboard, 
  History, 
  TrendingUp, 
  Target, 
  Zap, 
  ChevronRight,
  Clock,
  CheckCircle2,
  AlertCircle,
  LogOut,
  User as UserIcon,
  ShieldCheck,
  Star,
  Map,
  Search,
  Loader2
} from 'lucide-react';
import AppBackground from '../components/layout/AppBackground';
import Navbar from "../components/layout/Navbar";
import GlassCard from '../components/ui/GlassCard';
import GlowButton from '../components/ui/GlowButton';
import { useAuth } from '../context/AuthContext';
import { supabase } from '../lib/supabase';

const DashboardPage = () => {
  const navigate = useNavigate();
  const { user, profile, logout, getProfileImage, loading } = useAuth();
  const [history, setHistory] = useState([]);
  const [stats, setStats] = useState({ total: 0, avgScore: 0, roadmaps: 0, readiness: 'N/A' });
  const [topGap, setTopGap] = useState(null);
  const [dataLoading, setDataLoading] = useState(true);

  // Redirect if not logged in
  if (!loading && !user) {
    return <Navigate to="/login" replace />;
  }

  useEffect(() => {
    if (!user) return;
    
    const fetchDashboardData = async () => {
      // PRE-LOAD: Try to get from LocalStorage immediately for zero-latency UI
      try {
        const cached = JSON.parse(localStorage.getItem('skillgap_local_history') || '[]');
        if (cached.length > 0) {
          setHistory(cached.map(a => ({
            id: a.id,
            role: a.role_title || 'Untitled',
            company: a.company || '',
            score: `${a.score}%`,
            date: formatRelativeDate(a.created_at),
            status: a.status || 'completed'
          })));
          
          // Estimate stats from cache
          const total = cached.length;
          const avgScore = total > 0 ? Math.round(cached.reduce((s, a) => s + (Number(a.score) || 0), 0) / total) : 0;
          setStats(prev => ({ ...prev, total, avgScore: `${avgScore}%` }));
        }
      } catch (e) { console.warn("Cache load failed", e); }

      setDataLoading(true);

      // Fetch analysis history from Supabase
      const { data: analyses, error } = await supabase
        .from("analyses")
        .select("*")
        .eq("user_id", user.uid)
        .order("created_at", { ascending: false })
        .limit(10);

      if (!error && analyses) {
        const formattedHistory = analyses.map(a => ({
          id: a.id,
          role: a.role_title || 'Untitled',
          company: a.company || '',
          score: `${a.score}%`,
          date: formatRelativeDate(a.created_at),
          status: a.status || 'completed'
        }));
        
        setHistory(formattedHistory);

        // SYNC: Update LocalStorage with fresh Supabase data
        try {
          localStorage.setItem('skillgap_local_history', JSON.stringify(analyses));
        } catch (e) { console.warn("Cache sync failed", e); }

        // Compute stats
        const total = analyses.length;
        const avgScore = total > 0 ? Math.round(analyses.reduce((s, a) => s + a.score, 0) / total) : 0;
        const readiness = avgScore > 80 ? 'High' : avgScore > 50 ? 'Medium' : total === 0 ? 'N/A' : 'Low';
        
        // Count unique roadmap-worthy analyses
        const roadmaps = analyses.filter(a => a.missing_skills && a.missing_skills.length > 0).length;

        setStats({ total, avgScore: `${avgScore}%`, roadmaps, readiness });

        // Find top gap from most recent analysis
        if (analyses.length > 0 && analyses[0].missing_skills?.length > 0) {
          const mostRecent = analyses[0];
          setTopGap({
            skill: mostRecent.missing_skills[0],
            score: mostRecent.score,
            context: `Focus on ${mostRecent.missing_skills.slice(0, 2).join(" and ")} to bridge the gap for your latest target role.`
          });
        }
      }

      setDataLoading(false);
    };

    fetchDashboardData();
  }, [user]);

  const formatRelativeDate = (dateStr) => {
    const now = new Date();
    const date = new Date(dateStr);
    const diffMs = now - date;
    const diffMins = Math.floor(diffMs / 60000);
    const diffHours = Math.floor(diffMs / 3600000);
    const diffDays = Math.floor(diffMs / 86400000);
    
    if (diffMins < 1) return 'Just now';
    if (diffMins < 60) return `${diffMins}m ago`;
    if (diffHours < 24) return `${diffHours}h ago`;
    if (diffDays < 7) return `${diffDays}d ago`;
    if (diffDays < 30) return `${Math.floor(diffDays / 7)}w ago`;
    return date.toLocaleDateString();
  };

  if (loading) {
    return (
      <AppBackground className="flex items-center justify-center">
        <div className="w-12 h-12 border-4 border-primary border-t-transparent rounded-full animate-spin" />
      </AppBackground>
    );
  }

  return (
    <AppBackground>
      <Navbar />
      <div className="max-w-7xl mx-auto px-6 pt-32 pb-20">
        
        {/* Profile Summary Strip */}
        <motion.div 
          initial={{ opacity: 0, y: -5 }}
          animate={{ opacity: 1, y: 0 }}
          className="flex flex-col md:flex-row items-center gap-6 mb-12 p-6 glass-morphism rounded-[2.5rem] border border-white/5"
        >
          <div className="w-20 h-20 rounded-[1.5rem] bg-white/5 border border-white/10 overflow-hidden shadow-2xl relative group">
            <img src={getProfileImage()} alt="User Profile" className="w-full h-full object-cover" />
            <div className="absolute inset-0 bg-primary/20 opacity-0 group-hover:opacity-100 transition-opacity" />
          </div>
          <div className="flex-1 text-center md:text-left">
            <div className="flex items-center justify-center md:justify-start gap-3 mb-1">
               <h2 className="text-2xl font-black italic text-white/90">{profile?.displayName}</h2>
               {stats.readiness === 'High' && (
                 <div className="px-2 py-0.5 rounded-md bg-primary/20 text-primary text-[8px] font-black uppercase tracking-widest border border-primary/20 flex items-center gap-1">
                   <Star className="w-2 h-2 fill-current" /> TOP 1%
                 </div>
               )}
            </div>
            <p className="text-white/50 text-xs font-semibold flex items-center justify-center md:justify-start gap-2">
               <span className="w-1.5 h-1.5 rounded-full bg-emerald-500 animate-pulse" /> Radar Active • {stats.total} Analyses Completed
            </p>
          </div>
          <div className="flex gap-4">
             <GlowButton onClick={() => navigate('/analyze')} size="sm" variant="primary" className="px-10">
                Initiate Radar <Zap className="w-3 h-3 ml-2" />
             </GlowButton>
          </div>
        </motion.div>

        {/* Quick Stats Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-12">
          {[
            { label: 'Analyses Run', val: dataLoading ? '...' : String(stats.total), icon: History, color: 'text-white/40' },
            { label: 'Avg Matching', val: dataLoading ? '...' : stats.avgScore, icon: TrendingUp, color: 'text-primary' },
            { label: 'Roadmaps', val: dataLoading ? '...' : String(stats.roadmaps), icon: Target, color: 'text-secondary' },
            { label: 'Readiness', val: dataLoading ? '...' : stats.readiness, icon: ShieldCheck, color: 'text-emerald-400' },
          ].map((stat, i) => (
            <GlassCard key={i} className="p-8 group relative overflow-hidden">
              <div className="absolute top-0 right-0 w-24 h-24 bg-white/[0.02] blur-3xl opacity-0 group-hover:opacity-100 transition-opacity" />
              <div className="flex items-start justify-between mb-6">
                <div className={`p-4 rounded-2xl bg-white/[0.03] border border-white/5 shadow-inner ${stat.color}`}>
                  <stat.icon className="w-6 h-6" />
                </div>
              </div>
              <div className="text-4xl font-black mb-2 italic tracking-tighter">{stat.val}</div>
              <div className="text-[10px] text-white/20 font-black uppercase tracking-[0.2em]">{stat.label}</div>
            </GlassCard>
          ))}
        </div>

        <div className="grid lg:grid-cols-3 gap-8">
          
          {/* Analysis History */}
          <GlassCard className="lg:col-span-2 p-8 relative overflow-hidden">
            <div className="absolute top-0 right-0 w-64 h-64 bg-primary/5 blur-[80px] pointer-events-none" />
            <h3 className="text-xl font-bold mb-8 flex items-center gap-3">
              <History className="w-5 h-5 text-primary" />
              Career Trajectories
            </h3>
            
            {dataLoading ? (
              <div className="flex items-center justify-center py-20">
                <Loader2 className="w-8 h-8 text-primary animate-spin" />
              </div>
            ) : history.length === 0 ? (
              <div className="text-center py-20">
                <Search className="w-10 h-10 text-white/10 mx-auto mb-4" />
                <p className="text-white/30 text-sm font-medium mb-6">No analyses yet. Start your first career scan!</p>
                <GlowButton onClick={() => navigate('/analyze')} size="sm" variant="primary" className="px-8">
                  Run First Analysis <Zap className="w-3 h-3" />
                </GlowButton>
              </div>
            ) : (
              <div className="space-y-4">
                {history.map((item, idx) => (
                  <motion.div 
                    initial={{ opacity: 0, y: 5 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: idx * 0.05 }}
                    key={item.id || idx} 
                    className="group flex items-center justify-between p-5 rounded-2xl bg-white/[0.02] border border-white/5 hover:border-primary/20 hover:bg-white/[0.04] transition-all cursor-pointer"
                  >
                    <div className="flex items-center gap-5">
                      <div className="w-12 h-12 rounded-xl bg-black border border-white/10 flex flex-col items-center justify-center p-2">
                         <span className="text-[10px] text-primary font-black leading-none">{item.score}</span>
                         <span className="text-[6px] text-white/30 font-black uppercase mt-1">Match</span>
                      </div>
                      <div>
                        <h4 className="font-bold text-sm mb-1 group-hover:text-primary transition-colors">{item.role}</h4>
                        <div className="flex items-center gap-3 text-[10px] text-white/20 font-black uppercase tracking-widest">
                          {item.company && (
                            <>
                              <span className="text-white/40">{item.company}</span>
                              <span className="w-1 h-1 rounded-full bg-white/10" />
                            </>
                          )}
                          <span className={`px-2 py-0.5 rounded-md ${item.status === 'Ready' ? 'bg-emerald-500/10 text-emerald-500' : item.status === 'Gap Detected' ? 'bg-red-500/10 text-red-400' : 'bg-primary/10 text-primary'}`}>
                            {item.status}
                          </span>
                          <span className="w-1 h-1 rounded-full bg-white/10" />
                          <span>{item.date}</span>
                        </div>
                      </div>
                    </div>
                    <ChevronRight className="w-5 h-5 text-white/10 group-hover:text-primary group-hover:translate-x-1 transition-all" />
                  </motion.div>
                ))}
              </div>
            )}
          </GlassCard>

          {/* Quick Actions / Roadmap */}
          <div className="space-y-8">
            <GlassCard className="p-8 border-secondary/20 bg-secondary/5 relative overflow-hidden group">
              <div className="absolute -top-10 -right-10 w-20 h-20 bg-secondary blur-[50px] opacity-20 transition-all group-hover:opacity-40" />
              <h3 className="text-xl font-bold mb-6 flex items-center gap-3 italic">
                <Target className="w-5 h-5 text-secondary" />
                Active Gap Goal
              </h3>
              {topGap ? (
                <>
                  <div className="p-4 rounded-2xl bg-black/40 border border-white/5 mb-6">
                     <div className="text-xs font-bold mb-3 flex items-center justify-between">
                        <span>{topGap.skill} Mastery</span>
                        <span className="text-secondary">{100 - topGap.score}%</span>
                     </div>
                     <div className="h-1.5 w-full bg-white/5 rounded-full overflow-hidden">
                        <motion.div initial={{ width: 0 }} animate={{ width: `${100 - topGap.score}%` }} className="h-full bg-secondary shadow-[0_0_10px_rgba(236,72,153,0.5)]" />
                     </div>
                  </div>
                  <p className="text-[10px] text-white/30 font-bold uppercase tracking-widest leading-relaxed">
                     {topGap.context}
                  </p>
                </>
              ) : (
                <p className="text-[10px] text-white/30 font-bold uppercase tracking-widest leading-relaxed">
                   Run your first analysis to identify gap goals.
                </p>
              )}
            </GlassCard>

            <GlassCard 
              className="p-8 group cursor-pointer hover:border-white/20 transition-all"
              onClick={() => navigate('/security-logs')}
            >
               <div className="flex items-center justify-between mb-8">
                  <div className="flex items-center gap-3">
                    <div className="w-10 h-10 rounded-xl bg-primary/10 flex items-center justify-center text-primary group-hover:scale-110 transition-transform">
                      <ShieldCheck className="w-6 h-6" />
                    </div>
                    <h4 className="font-bold text-sm">Security Vault</h4>
                  </div>
                  <ChevronRight className="w-4 h-4 text-white/10 group-hover:translate-x-1 transition-all" />
               </div>
               <div className="flex gap-2">
                  <div className="h-1 flex-1 bg-primary rounded-full" />
                  <div className="h-1 flex-1 bg-primary/20 rounded-full" />
                  <div className="h-1 flex-1 bg-primary/20 rounded-full" />
               </div>
               <div className="mt-3 text-[8px] text-primary/50 font-black uppercase tracking-[0.2em]">Tier II Encryption Active</div>
            </GlassCard>
          </div>
        </div>

      </div>
    </AppBackground>
  );
};

export default DashboardPage;
