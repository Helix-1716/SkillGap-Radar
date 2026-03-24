import React from 'react';
import { motion, AnimatePresence } from 'framer-motion';
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
  Search
} from 'lucide-react';
import AppBackground from '../components/layout/AppBackground';
import Navbar from "../components/layout/Navbar";
import GlassCard from '../components/ui/GlassCard';
import GlowButton from '../components/ui/GlowButton';
import { useAuth } from '../context/AuthContext';

const DashboardPage = () => {
  const navigate = useNavigate();
  const { user, profile, logout, getProfileImage, loading } = useAuth();

  // Redirect if not logged in
  if (!loading && !user) {
    return <Navigate to="/login" replace />;
  }

  const history = [
    { role: 'Frontend Intern', company: 'Google', score: '74%', date: '2 days ago', status: 'In Progress' },
    { role: 'Backend Engineer', company: 'Stripe', score: '52%', date: '1 week ago', status: 'Gap Detected' },
    { role: 'UI/UX Designer', company: 'Figma', score: '88%', date: '2 weeks ago', status: 'Ready' },
  ];

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
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          className="flex flex-col md:flex-row items-center gap-6 mb-12 p-6 glass-morphism rounded-[2.5rem] border border-white/5"
        >
          <div className="w-20 h-20 rounded-[1.5rem] bg-white/5 border border-white/10 overflow-hidden shadow-2xl relative group">
            <img src={getProfileImage()} alt="User Profile" className="w-full h-full object-cover" />
            <div className="absolute inset-0 bg-primary/20 opacity-0 group-hover:opacity-100 transition-opacity" />
          </div>
          <div className="flex-1 text-center md:text-left">
            <div className="flex items-center justify-center md:justify-start gap-3 mb-1">
               <h2 className="text-2xl font-black italic">{profile?.displayName}</h2>
               <div className="px-2 py-0.5 rounded-md bg-primary/20 text-primary text-[8px] font-black uppercase tracking-widest border border-primary/20 flex items-center gap-1">
                  <Star className="w-2 h-2 fill-current" /> TOP 1%
               </div>
            </div>
            <p className="text-white/30 text-xs font-semibold flex items-center justify-center md:justify-start gap-2">
               <span className="w-1.5 h-1.5 rounded-full bg-emerald-500 animate-pulse" /> Radar Active • Verification Tier III
            </p>
          </div>
          <div className="flex gap-4">
             <GlowButton onClick={() => navigate('/analyze')} size="sm" variant="secondary" className="px-8">
                Initiate Radar <Zap className="w-3 h-3" />
             </GlowButton>
          </div>
        </motion.div>

        {/* Quick Stats Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-12">
          {[
            { label: 'Analyses Run', val: '12', icon: History, color: 'text-blue-400' },
            { label: 'Avg Matching', val: '68%', icon: TrendingUp, color: 'text-primary' },
            { label: 'Roadmaps', val: '3', icon: Target, color: 'text-secondary' },
            { label: 'Readiness', val: 'High', icon: CheckCircle2, color: 'text-emerald-400' },
          ].map((stat, i) => (
            <GlassCard key={i} className="p-6">
              <div className="flex items-start justify-between mb-4">
                <div className={`p-3 rounded-xl bg-white/5 ${stat.color}`}>
                  <stat.icon className="w-6 h-6" />
                </div>
                <span className="text-[10px] font-black uppercase text-white/10 tracking-widest">Global Rank #24</span>
              </div>
              <div className="text-3xl font-black mb-1">{stat.val}</div>
              <div className="text-xs text-white/30 font-bold uppercase tracking-wider">{stat.label}</div>
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
            <div className="space-y-4">
              {history.map((item, idx) => (
                <motion.div 
                  initial={{ opacity: 0, x: -10 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: idx * 0.1 }}
                  key={idx} 
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
                        <span className="text-white/40">{item.company}</span>
                        <span className="w-1 h-1 rounded-full bg-white/10" />
                        <span className={`px-2 py-0.5 rounded-md ${item.status === 'Ready' ? 'bg-emerald-500/10 text-emerald-500' : 'bg-primary/10 text-primary'}`}>
                          {item.status}
                        </span>
                      </div>
                    </div>
                  </div>
                  <ChevronRight className="w-5 h-5 text-white/10 group-hover:text-primary group-hover:translate-x-1 transition-all" />
                </motion.div>
              ))}
            </div>
          </GlassCard>

          {/* Quick Actions / Roadmap */}
          <div className="space-y-8">
            <GlassCard className="p-8 border-secondary/20 bg-secondary/5 relative overflow-hidden group">
              <div className="absolute -top-10 -right-10 w-20 h-20 bg-secondary blur-[50px] opacity-20 transition-all group-hover:opacity-40" />
              <h3 className="text-xl font-bold mb-6 flex items-center gap-3 italic">
                <Target className="w-5 h-5 text-secondary" />
                Active Gap Goal
              </h3>
              <div className="p-4 rounded-2xl bg-black/40 border border-white/5 mb-6">
                 <div className="text-xs font-bold mb-3 flex items-center justify-between">
                    <span>Vue.js Framework Mastery</span>
                    <span className="text-secondary">45%</span>
                 </div>
                 <div className="h-1.5 w-full bg-white/5 rounded-full overflow-hidden">
                    <motion.div initial={{ width: 0 }} animate={{ width: '45%' }} className="h-full bg-secondary shadow-[0_0_10px_rgba(236,72,153,0.5)]" />
                 </div>
              </div>
              <p className="text-[10px] text-white/30 font-bold uppercase tracking-widest leading-relaxed">
                 Focus on Composition API and State management logic to bridge the gap for Stripe’s current opening.
              </p>
            </GlassCard>

            <GlassCard className="p-8 group cursor-pointer hover:border-white/20 transition-all">
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
