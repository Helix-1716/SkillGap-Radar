import React from 'react';
import { motion } from 'framer-motion';
import { 
  Shield, 
  Clock, 
  MapPin, 
  Smartphone, 
  History, 
  AlertTriangle, 
  CheckCircle2,
  Lock,
  ArrowLeft
} from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import AppBackground from '../components/layout/AppBackground';
import Navbar from '../components/layout/Navbar';
import GlassCard from '../components/ui/GlassCard';
import GlowButton from '../components/ui/GlowButton';
import { useAuth } from '../context/AuthContext';

const SecurityLogsPage = () => {
  const navigate = useNavigate();
  const { profile } = useAuth();

  const sessions = [
    { device: 'Chromium on Windows 11', location: 'Bay Area, CA', time: 'Active Now', status: 'current' },
    { device: 'iPhone 15 Pro', location: 'Bay Area, CA', time: '2 hours ago', status: 'verified' },
    { device: 'Safari on macOS', location: 'San Francisco, CA', time: '3 days ago', status: 'expired' },
  ];

  const securityEvents = [
    { event: 'Recovery Email Updated', date: 'Mar 24, 2026', icon: Lock, color: 'text-primary' },
    { event: 'New Login Detected', date: 'Mar 22, 2026', icon: AlertTriangle, color: 'text-secondary' },
    { event: 'Tier III Verification Passed', date: 'Mar 20, 2026', icon: CheckCircle2, color: 'text-emerald-400' },
  ];

  return (
    <AppBackground>
      <Navbar />
      <div className="max-w-4xl mx-auto px-6 pt-32 pb-20">
        
        <div className="flex items-center justify-between mb-12">
           <button 
             onClick={() => navigate(-1)} 
             className="flex items-center gap-2 text-white/40 hover:text-white transition-colors group"
           >
             <div className="w-8 h-8 rounded-lg bg-white/5 flex items-center justify-center group-hover:bg-white/10">
                <ArrowLeft className="w-4 h-4" />
             </div>
             <span className="text-[10px] font-black uppercase tracking-widest">Return to Profile</span>
           </button>
           <div className="px-4 py-1 rounded-full bg-emerald-500/10 border border-emerald-500/20 text-emerald-500 text-[8px] font-black uppercase tracking-widest">
              Radar-Shield™ Active
           </div>
        </div>

        <div className="mb-12">
           <h1 className="text-4xl font-black mb-2 flex items-center gap-4 italic">
             <Shield className="w-10 h-10 text-primary" />
             Security Protocols
           </h1>
           <p className="text-white/30 font-medium">Monitoring your account integrity and verification tiers.</p>
        </div>

        <div className="grid md:grid-cols-3 gap-6 mb-12">
           {[
             { label: 'Trust Score', val: '99.8', color: 'text-emerald-400' },
             { label: 'Security Tier', val: 'III', color: 'text-primary' },
             { label: 'Key Encryption', val: 'RSA-4k', color: 'text-secondary' },
           ].map((stat, i) => (
             <GlassCard key={i} className="p-6 text-center">
                <div className={`text-3xl font-black mb-1 ${stat.color}`}>{stat.val}</div>
                <div className="text-[9px] font-black uppercase tracking-widest text-white/20">{stat.label}</div>
             </GlassCard>
           ))}
        </div>

        <div className="space-y-8">
           {/* Active Sessions */}
           <GlassCard className="p-8">
              <h3 className="text-xl font-bold mb-8 flex items-center gap-3">
                 <Smartphone className="w-5 h-5 text-primary" />
                 Active Sessions
              </h3>
              <div className="space-y-4">
                 {sessions.map((session, idx) => (
                    <div key={idx} className="flex items-center justify-between p-5 rounded-2xl bg-white/[0.02] border border-white/5 group hover:border-white/10 transition-all">
                       <div className="flex items-center gap-5">
                          <div className={`w-12 h-12 rounded-xl flex items-center justify-center ${session.status === 'current' ? 'bg-primary/20 text-primary' : 'bg-white/5 text-white/20'}`}>
                             {session.status === 'current' ? <Shield className="w-6 h-6" /> : <Smartphone className="w-6 h-6" />}
                          </div>
                          <div>
                             <h4 className="font-bold text-sm mb-1">{session.device}</h4>
                             <div className="flex items-center gap-3 text-[10px] text-white/20 font-black uppercase tracking-widest">
                                <span className="flex items-center gap-1"><MapPin className="w-3 h-3 text-white/10" /> {session.location}</span>
                                <span className="w-1 h-1 rounded-full bg-white/10" />
                                <span className="flex items-center gap-1"><Clock className="w-3 h-3 text-white/10" /> {session.time}</span>
                             </div>
                          </div>
                       </div>
                       {session.status === 'expired' && (
                          <button className="text-[10px] font-black uppercase tracking-widest text-primary hover:underline">Revoke</button>
                       )}
                    </div>
                 ))}
              </div>
           </GlassCard>

           {/* Event Log */}
           <GlassCard className="p-8 relative overflow-hidden">
              <div className="absolute top-0 right-0 w-64 h-64 bg-secondary/5 blur-[80px] pointer-events-none" />
              <h3 className="text-xl font-bold mb-8 flex items-center gap-3">
                 <History className="w-5 h-5 text-secondary" />
                 System Audit Trail
              </h3>
              <div className="space-y-6">
                 {securityEvents.map((event, idx) => (
                    <div key={idx} className="flex items-center gap-6 relative">
                       {idx !== securityEvents.length - 1 && (
                          <div className="absolute left-[23px] top-10 w-[2px] h-10 bg-white/5" />
                       )}
                       <div className={`w-12 h-12 rounded-xl bg-white/5 flex items-center justify-center flex-shrink-0 ${event.color}`}>
                          <event.icon className="w-6 h-6" />
                       </div>
                       <div>
                          <div className="font-bold text-sm">{event.event}</div>
                          <div className="text-[10px] text-white/20 font-black uppercase tracking-widest mt-1">{event.date}</div>
                       </div>
                    </div>
                 ))}
              </div>
           </GlassCard>
        </div>

        <div className="mt-12 text-center">
           <p className="text-[10px] text-white/20 font-black uppercase tracking-[0.3em] mb-6 leading-relaxed max-w-lg mx-auto">
              Your data is encrypted following the Zero-Knowledge Radar Protocol (ZKRP). 
              SkillGap Radar does not store your raw credentials.
           </p>
           <GlowButton variant="glass" size="sm">Enable Biometric Lock</GlowButton>
        </div>

      </div>
    </AppBackground>
  );
};

export default SecurityLogsPage;
