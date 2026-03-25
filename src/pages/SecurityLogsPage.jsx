import React, { useState, useEffect } from 'react';
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
  ArrowLeft,
  Loader2,
  LogIn,
  LogOut as LogOutIcon,
  Monitor,
  Zap
} from 'lucide-react';
import { useNavigate, Navigate } from 'react-router-dom';
import AppBackground from '../components/layout/AppBackground';
import Navbar from '../components/layout/Navbar';
import GlassCard from '../components/ui/GlassCard';
import GlowButton from '../components/ui/GlowButton';
import { useAuth } from '../context/AuthContext';
import { supabase } from '../lib/supabase';

const SecurityLogsPage = () => {
  const navigate = useNavigate();
  const { user, profile, loading } = useAuth();
  const [sessions, setSessions] = useState([]);
  const [securityEvents, setSecurityEvents] = useState([]);
  const [dataLoading, setDataLoading] = useState(true);
  const [stats, setStats] = useState({ trustScore: '0', tier: 'I', encryption: 'AES-256' });

  if (!loading && !user) {
    return <Navigate to="/login" replace />;
  }

  useEffect(() => {
    if (!user) return;

    const fetchSecurityData = async () => {
      setDataLoading(true);

      // Fetch sessions
      const { data: sessionData } = await supabase
        .from("security_logs")
        .select("*")
        .eq("user_id", user.uid)
        .eq("type", "session")
        .order("created_at", { ascending: false })
        .limit(10);

      if (sessionData) {
        setSessions(sessionData.map(s => ({
          id: s.id,
          device: parseDevice(s.device || s.title),
          location: s.location || 'Unknown',
          time: formatRelativeDate(s.created_at),
          status: s.status || 'verified'
        })));
      }

      // Fetch security events
      const { data: eventData } = await supabase
        .from("security_logs")
        .select("*")
        .eq("user_id", user.uid)
        .eq("type", "event")
        .order("created_at", { ascending: false })
        .limit(10);

      if (eventData) {
        setSecurityEvents(eventData.map(e => ({
          id: e.id,
          event: e.title,
          date: new Date(e.created_at).toLocaleDateString('en-US', { month: 'short', day: '2-digit', year: 'numeric' }),
          iconType: getEventIcon(e.title),
          color: getEventColor(e.title)
        })));

        // Compute trust score based on events
        const totalEvents = eventData.length;
        const trustScore = Math.min(99.9, 90 + totalEvents * 0.5);
        const tier = totalEvents > 5 ? 'III' : totalEvents > 2 ? 'II' : 'I';
        setStats({ trustScore: trustScore.toFixed(1), tier, encryption: 'AES-256' });
      }

      setDataLoading(false);
    };

    fetchSecurityData();
  }, [user]);

  const parseDevice = (userAgent) => {
    if (!userAgent) return 'Unknown Device';
    if (userAgent.includes('Chrome')) return `Chrome on ${userAgent.includes('Windows') ? 'Windows' : userAgent.includes('Mac') ? 'macOS' : 'Linux'}`;
    if (userAgent.includes('Firefox')) return `Firefox on ${userAgent.includes('Windows') ? 'Windows' : 'macOS'}`;
    if (userAgent.includes('Safari') && !userAgent.includes('Chrome')) return 'Safari on macOS';
    if (userAgent.includes('iPhone')) return 'iPhone';
    if (userAgent.includes('Android')) return 'Android Device';
    return userAgent.substring(0, 40);
  };

  const getEventIcon = (title) => {
    if (title.includes('Login')) return 'login';
    if (title.includes('Logged Out') || title.includes('Logout')) return 'logout';
    if (title.includes('Verification') || title.includes('Verified')) return 'verified';
    return 'lock';
  };

  const getEventColor = (title) => {
    if (title.includes('Login')) return 'text-secondary';
    if (title.includes('Logged Out') || title.includes('Logout')) return 'text-red-400';
    if (title.includes('Verification') || title.includes('Verified')) return 'text-emerald-400';
    return 'text-primary';
  };

  const renderEventIcon = (iconType) => {
    switch (iconType) {
      case 'login': return <LogIn className="w-6 h-6" />;
      case 'logout': return <LogOutIcon className="w-6 h-6" />;
      case 'verified': return <CheckCircle2 className="w-6 h-6" />;
      default: return <Lock className="w-6 h-6" />;
    }
  };

  const formatRelativeDate = (dateStr) => {
    const now = new Date();
    const date = new Date(dateStr);
    const diffMs = now - date;
    const diffMins = Math.floor(diffMs / 60000);
    const diffHours = Math.floor(diffMs / 3600000);
    const diffDays = Math.floor(diffMs / 86400000);
    
    if (diffMins < 1) return 'Active Now';
    if (diffMins < 60) return `${diffMins} min ago`;
    if (diffHours < 24) return `${diffHours} hours ago`;
    if (diffDays < 7) return `${diffDays} days ago`;
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
             { label: 'Trust Score', val: dataLoading ? '...' : stats.trustScore, color: 'text-emerald-400' },
             { label: 'Security Tier', val: dataLoading ? '...' : stats.tier, color: 'text-primary' },
             { label: 'Key Encryption', val: stats.encryption, color: 'text-secondary' },
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
              {dataLoading ? (
                <div className="flex items-center justify-center py-12">
                  <Loader2 className="w-8 h-8 text-primary animate-spin" />
                </div>
              ) : sessions.length === 0 ? (
                <div className="text-center py-12">
                  <Monitor className="w-10 h-10 text-white/10 mx-auto mb-4" />
                  <p className="text-white/30 text-sm font-medium">No sessions recorded yet.</p>
                </div>
              ) : (
                <div className="space-y-4">
                   {sessions.map((session, idx) => (
                      <div key={session.id || idx} className="flex items-center justify-between p-5 rounded-2xl bg-white/[0.02] border border-white/5 group hover:border-white/10 transition-all">
                         <div className="flex items-center gap-5">
                            <div className={`w-12 h-12 rounded-xl flex items-center justify-center ${idx === 0 ? 'bg-primary/20 text-primary' : 'bg-white/5 text-white/20'}`}>
                               {idx === 0 ? <Shield className="w-6 h-6" /> : <Smartphone className="w-6 h-6" />}
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
                      </div>
                   ))}
                </div>
              )}
           </GlassCard>

           {/* Event Log */}
           <GlassCard className="p-8 relative overflow-hidden">
              <div className="absolute top-0 right-0 w-64 h-64 bg-secondary/5 blur-[80px] pointer-events-none" />
              <h3 className="text-xl font-bold mb-8 flex items-center gap-3">
                 <History className="w-5 h-5 text-secondary" />
                 System Audit Trail
              </h3>
              {dataLoading ? (
                <div className="flex items-center justify-center py-12">
                  <Loader2 className="w-8 h-8 text-primary animate-spin" />
                </div>
              ) : securityEvents.length === 0 ? (
                <div className="text-center py-12">
                  <History className="w-10 h-10 text-white/10 mx-auto mb-4" />
                  <p className="text-white/30 text-sm font-medium">No security events recorded yet.</p>
                </div>
              ) : (
                <div className="space-y-6">
                   {securityEvents.map((event, idx) => (
                      <div key={event.id || idx} className="flex items-center gap-6 relative">
                         {idx !== securityEvents.length - 1 && (
                            <div className="absolute left-[23px] top-10 w-[2px] h-10 bg-white/5" />
                         )}
                         <div className={`w-12 h-12 rounded-xl bg-white/5 flex items-center justify-center flex-shrink-0 ${event.color}`}>
                            {renderEventIcon(event.iconType)}
                         </div>
                         <div>
                            <div className="font-bold text-sm">{event.event}</div>
                            <div className="text-[10px] text-white/20 font-black uppercase tracking-widest mt-1">{event.date}</div>
                         </div>
                      </div>
                   ))}
                </div>
              )}
           </GlassCard>
        </div>

        <div className="mt-12 text-center">
           <p className="text-[10px] text-white/20 font-black uppercase tracking-[0.3em] mb-6 leading-relaxed max-w-lg mx-auto">
              Your data is encrypted following the Zero-Knowledge Radar Protocol (ZKRP). 
              SkillGap Radar does not store your raw credentials.
           </p>
        </div>

      </div>
    </AppBackground>
  );
};

export default SecurityLogsPage;
