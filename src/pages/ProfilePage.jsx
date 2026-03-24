import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { useNavigate, Navigate } from 'react-router-dom';
import { 
  User as UserIcon, 
  Mail, 
  MapPin, 
  Link as LinkIcon, 
  Award, 
  Shield, 
  Settings,
  Bell,
  Sparkles,
  Zap,
  ChevronRight,
  LogOut,
  Edit2,
  FileText,
  Lock,
  Globe,
  MoreVertical,
  Briefcase
} from 'lucide-react';
import AppBackground from '../components/layout/AppBackground';
import Navbar from "../components/layout/Navbar";
import GlassCard from '../components/ui/GlassCard';
import GlowButton from '../components/ui/GlowButton';
import { useAuth } from '../context/AuthContext';

const ProfilePage = () => {
  const navigate = useNavigate();
  const { user, profile, logout, getProfileImage, loading } = useAuth();
  const [activeTab, setActiveTab] = useState('expertise');

  if (!loading && !user) {
    return <Navigate to="/login" replace />;
  }

  const handleLogout = async () => {
    try {
      await logout();
      navigate('/');
    } catch (err) {
      console.error(err);
    }
  };

  const skills = [
    { name: 'React Architecture', level: 'Master', score: 95 },
    { name: 'Node.js Systems', level: 'Expert', score: 82 },
    { name: 'Cloud Infrastructure', level: 'Senior', score: 74 },
    { name: 'Vector Databases', level: 'Advanced', score: 68 },
  ];

  const documents = [
    { name: 'standard_resume_2026.pdf', date: 'Mar 20', size: '2.4 MB' },
    { name: 'portfolio_archive.zip', date: 'Jan 12', size: '45.8 MB' },
    { name: 'cert_google_clp.pdf', date: 'Dec 03', size: '1.1 MB' },
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
        
        <div className="grid lg:grid-cols-4 gap-8">
          
          {/* Identity Column */}
          <div className="lg:col-span-1 space-y-6">
            <GlassCard className="p-8 text-center relative overflow-hidden">
              <div className="absolute top-0 left-0 w-full h-24 bg-gradient-to-br from-primary/10 via-secondary/10 to-transparent pointer-events-none" />
              
              <div className="relative mb-6 inline-block group">
                <div className="w-32 h-32 rounded-[2.5rem] bg-white/5 border border-white/10 p-2 overflow-hidden shadow-2xl transition-transform duration-500 group-hover:scale-105 group-hover:rotate-3">
                  <img 
                    src={getProfileImage()} 
                    alt="User" 
                    className="w-full h-full object-cover rounded-[2rem]" 
                  />
                  <div className="absolute inset-0 bg-black/40 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center">
                    <Edit2 className="w-6 h-6 text-white" />
                  </div>
                </div>
                <div className="absolute -bottom-2 -right-2 w-10 h-10 rounded-2xl bg-primary border-4 border-[#030303] flex items-center justify-center text-white shadow-xl">
                   <Shield className="w-5 h-5" />
                </div>
              </div>

              <h2 className="text-2xl font-black mb-1 italic">{profile?.displayName}</h2>
              <p className="text-primary text-[10px] font-black uppercase tracking-widest mb-6 px-4 py-1.5 rounded-full bg-primary/10 inline-block border border-primary/20">
                Senior Radar Elite
              </p>

              <div className="flex justify-center gap-4 mb-8">
                <button className="w-10 h-10 rounded-xl bg-white/5 flex items-center justify-center hover:bg-white/10 hover:text-primary transition-all shadow-sm">
                  <svg className="w-4 h-4 fill-current" viewBox="0 0 24 24"><path d="M12 0c-6.626 0-12 5.373-12 12 0 5.302 3.438 9.8 8.207 11.387.599.111.793-.261.793-.577v-2.234c-3.338.726-4.041-1.416-4.041-1.416-.546-1.387-1.333-1.756-1.333-1.756-1.089-.745.083-.729.083-.729 1.205.084 1.839 1.237 1.839 1.237 1.07 1.834 2.807 1.304 3.492.997.107-.775.418-1.305.762-1.604-2.665-.305-5.467-1.334-5.467-5.931 0-1.311.469-2.381 1.236-3.221-.124-.303-.535-1.524.117-3.176 0 0 1.008-.322 3.301 1.23.957-.266 1.983-.399 3.003-.404 1.02.005 2.047.138 3.006.404 2.291-1.552 3.297-1.23 3.297-1.23.653 1.653.242 2.874.118 3.176.77.84 1.235 1.911 1.235 3.221 0 4.609-2.807 5.624-5.479 5.921.43.372.823 1.102.823 2.222v3.293c0 .319.192.694.801.576 4.765-1.589 8.199-6.086 8.199-11.386 0-6.627-5.373-12-12-12z"/></svg>
                </button>
                <button className="w-10 h-10 rounded-xl bg-white/5 flex items-center justify-center hover:bg-white/10 hover:text-blue-400 transition-all shadow-sm">
                  <svg className="w-4 h-4 fill-current" viewBox="0 0 24 24"><path d="M23.953 4.57a10 10 0 01-2.825.775 4.958 4.958 0 002.163-2.723c-.951.555-2.005.959-3.127 1.184a4.92 4.92 0 00-8.384 4.482C7.69 8.095 4.067 6.13 1.64 3.162a4.822 4.822 0 00-.666 2.475c0 1.71.87 3.213 2.188 4.096a4.904 4.904 0 01-2.228-.616v.06a4.923 4.923 0 003.946 4.84 4.996 4.996 0 01-2.212.085 4.936 4.936 0 004.604 3.417 9.867 9.867 0 01-6.102 2.105c-.39 0-.779-.023-1.17-.067a13.995 13.995 0 007.557 2.209c9.053 0 13.998-7.496 13.998-13.985 0-.21 0-.42-.015-.63A9.935 9.935 0 0024 4.59z"/></svg>
                </button>
                <button className="w-10 h-10 rounded-xl bg-white/5 flex items-center justify-center hover:bg-white/10 hover:text-secondary transition-all shadow-sm">
                  <LinkIcon className="w-4 h-4" />
                </button>
              </div>

              <div className="space-y-4 text-left border-t border-white/5 pt-8">
                <div className="flex items-center gap-3 text-white/40 group cursor-pointer hover:text-white transition-colors">
                  <div className="w-8 h-8 rounded-lg bg-white/5 flex items-center justify-center group-hover:text-primary"><Mail className="w-4 h-4" /></div>
                  <span className="text-xs font-semibold truncate">{profile?.email}</span>
                </div>
                <div className="flex items-center gap-3 text-white/40 group cursor-pointer hover:text-white transition-colors">
                  <div className="w-8 h-8 rounded-lg bg-white/5 flex items-center justify-center group-hover:text-primary"><Briefcase className="w-4 h-4" /></div>
                  <span className="text-xs font-semibold">Technical Architect</span>
                </div>
                <div className="flex items-center gap-3 text-white/40 group cursor-pointer hover:text-white transition-colors">
                  <div className="w-8 h-8 rounded-lg bg-white/5 flex items-center justify-center group-hover:text-primary"><Globe className="w-4 h-4" /></div>
                  <span className="text-xs font-semibold">Bay Area, CA</span>
                </div>
              </div>

              <button 
                onClick={handleLogout}
                className="w-full mt-10 p-4 rounded-2xl bg-red-500/5 border border-red-500/10 text-red-500 flex items-center justify-center gap-3 hover:bg-red-500/10 transition-all text-xs font-black uppercase tracking-widest"
              >
                <LogOut className="w-4 h-4" /> Sign Out
              </button>
            </GlassCard>

            <GlassCard className="p-6 bg-primary/5 border-primary/20 relative overflow-hidden group">
               <div className="absolute top-0 right-0 w-24 h-24 bg-primary/20 blur-[40px] pointer-events-none" />
               <div className="flex items-center gap-4 mb-4">
                  <div className="w-12 h-12 rounded-2xl bg-primary flex items-center justify-center text-white shadow-2xl group-hover:rotate-12 transition-transform">
                     <Award className="w-6 h-6" />
                  </div>
                  <div>
                    <div className="text-lg font-black italic">Rank #04</div>
                    <div className="text-[10px] font-black uppercase text-primary tracking-widest leading-none">Global Tier</div>
                  </div>
               </div>
               <div className="h-1 w-full bg-white/5 rounded-full overflow-hidden">
                  <motion.div initial={{ width: 0 }} animate={{ width: '88%' }} className="h-full bg-primary" />
               </div>
            </GlassCard>
          </div>

          {/* Main Content Column */}
          <div className="lg:col-span-3 space-y-8">
            
            {/* Detailed Stats Grid */}
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
              {[
                { label: 'Analyses', val: '43', color: 'text-blue-400' },
                { label: 'Verified Skills', val: '12', color: 'text-primary' },
                { label: 'Certifications', val: '5', color: 'text-secondary' },
                { label: 'Success Rate', val: '92%', color: 'text-emerald-400' },
              ].map((stat, i) => (
                <GlassCard key={i} className="p-6 text-center">
                  <div className={`text-2xl font-black mb-1 ${stat.color}`}>{stat.val}</div>
                  <div className="text-[9px] font-black uppercase text-white/30 tracking-widest">{stat.label}</div>
                </GlassCard>
              ))}
            </div>

            {/* Content Tabs */}
            <div className="flex gap-8 border-b border-white/5 px-2">
              {['expertise', 'assets', 'milestones'].map((tab) => (
                <button 
                  key={tab}
                  onClick={() => setActiveTab(tab)}
                  className={`py-4 text-[11px] font-black uppercase tracking-[0.2em] transition-all relative ${activeTab === tab ? 'text-white' : 'text-white/30 hover:text-white/60'}`}
                >
                  {tab}
                  {activeTab === tab && (
                    <motion.div 
                      layoutId="profile-tab"
                      className="absolute bottom-0 left-0 w-full h-1 bg-primary rounded-t-full shadow-[0_0_10px_rgba(139,92,246,0.8)]" 
                    />
                  )}
                </button>
              ))}
            </div>

            <AnimatePresence mode="wait">
              {activeTab === 'expertise' && (
                <motion.div 
                  key="expertise"
                  initial={{ opacity: 0, kx: -10 }} 
                  animate={{ opacity: 1, x: 0 }} 
                  exit={{ opacity: 0, x: 10 }}
                  className="space-y-6"
                >
                  <div className="grid md:grid-cols-2 gap-6">
                    {skills.map((skill, i) => (
                      <GlassCard key={i} className="p-6 group cursor-pointer hover:border-white/20 transition-all">
                        <div className="flex items-center justify-between mb-4">
                          <h4 className="font-bold">{skill.name}</h4>
                          <span className="text-[10px] font-black uppercase text-primary tracking-widest">{skill.level}</span>
                        </div>
                        <div className="relative h-2 w-full bg-white/5 rounded-full overflow-hidden mb-2">
                          <motion.div 
                            initial={{ width: 0 }} 
                            animate={{ width: `${skill.score}%` }} 
                            className="h-full bg-gradient-to-r from-primary to-secondary" 
                          />
                        </div>
                        <div className="flex justify-between text-[8px] font-black text-white/20 tracking-widest">
                           <span>{skill.score}% PROFICIENCY</span>
                           <span>MASTER TRACK</span>
                        </div>
                      </GlassCard>
                    ))}
                  </div>
                </motion.div>
              )}

              {activeTab === 'assets' && (
                <motion.div 
                  key="assets"
                  initial={{ opacity: 0, x: -10 }} 
                  animate={{ opacity: 1, x: 0 }} 
                  exit={{ opacity: 0, x: 10 }}
                  className="space-y-4"
                >
                  {documents.map((doc, i) => (
                    <GlassCard key={i} className="p-5 flex items-center justify-between hover:bg-white/[0.04] transition-all group">
                       <div className="flex items-center gap-5">
                          <div className="w-12 h-12 rounded-xl bg-white/5 flex items-center justify-center group-hover:text-primary transition-colors">
                             <FileText className="w-6 h-6" />
                          </div>
                          <div>
                             <div className="font-bold text-sm mb-1">{doc.name}</div>
                             <div className="text-[10px] text-white/20 font-black uppercase tracking-widest flex items-center gap-2">
                                <span>{doc.date}</span>
                                <span className="w-1 h-1 rounded-full bg-white/10" />
                                <span>{doc.size}</span>
                             </div>
                          </div>
                       </div>
                       <button className="p-3 rounded-lg bg-white/5 hover:bg-white/10 text-white/20 hover:text-white transition-all">
                          <ChevronRight className="w-5 h-5" />
                       </button>
                    </GlassCard>
                  ))}
                  <GlowButton variant="glass" className="w-full mt-4 py-6 border-dashed border-2 border-white/5 bg-transparent hover:bg-white/5 hover:border-white/10">
                     <Sparkles className="w-4 h-4 text-primary" /> Upload New Repository Asset
                  </GlowButton>
                </motion.div>
              )}
            </AnimatePresence>

          </div>
        </div>

      </div>
    </AppBackground>
  );
};

export default ProfilePage;
