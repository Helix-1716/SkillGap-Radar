import React, { useState, useEffect } from 'react';
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
  Briefcase,
  Loader2,
  Save
} from 'lucide-react';
import AppBackground from '../components/layout/AppBackground';
import Navbar from "../components/layout/Navbar";
import GlassCard from '../components/ui/GlassCard';
import GlowButton from '../components/ui/GlowButton';
import { useAuth } from '../context/AuthContext';
import { supabase } from '../lib/supabase';

const ProfilePage = () => {
  const navigate = useNavigate();
  const { user, profile, logout, getProfileImage, loading, updateProfile } = useAuth();
  const [activeTab, setActiveTab] = useState('expertise');
  const [skills, setSkills] = useState([]);
  const [documents, setDocuments] = useState([]);
  const [profileStats, setProfileStats] = useState({
    analyses: 0, verifiedSkills: 0, certifications: 0, successRate: '0%'
  });
  const [dataLoading, setDataLoading] = useState(true);
  const [isEditing, setIsEditing] = useState(false);
  const [isSaving, setIsSaving] = useState(false);
  const [editedProfile, setEditedProfile] = useState({
    displayName: '',
    title: '',
    location: '',
    bio: ''
  });

  if (!loading && !user) {
    return <Navigate to="/login" replace />;
  }

  useEffect(() => {
    if (!user) return;

    const fetchProfileData = async () => {
      setDataLoading(true);

      // Fetch user skills
      const { data: skillsData } = await supabase
        .from("user_skills")
        .select("*")
        .eq("user_id", user.uid)
        .order("score", { ascending: false });

      if (skillsData) {
        setSkills(skillsData.map(s => ({
          name: s.name,
          level: getSkillLevel(s.score),
          score: s.score
        })));
      }

      // Fetch user documents
      const { data: docsData } = await supabase
        .from("user_documents")
        .select("*")
        .eq("user_id", user.uid)
        .order("created_at", { ascending: false })
        .limit(10);

      if (docsData) {
        setDocuments(docsData.map(d => ({
          id: d.id,
          name: d.name,
          date: new Date(d.created_at).toLocaleDateString('en-US', { month: 'short', day: '2-digit' }),
          size: formatFileSize(d.size_bytes)
        })));
      }

      // Fetch analyses for stats
      const { data: analysesData } = await supabase
        .from("analyses")
        .select("score")
        .eq("user_id", user.uid);

      if (analysesData) {
        const total = analysesData.length;
        const successCount = analysesData.filter(a => a.score >= 70).length;
        const successRate = total > 0 ? Math.round((successCount / total) * 100) : 0;
        setProfileStats({
          analyses: total,
          verifiedSkills: skillsData?.length || 0,
          certifications: 0,
          successRate: `${successRate}%`
        });
      }

      setDataLoading(false);
    };

    fetchProfileData();
  }, [user]);

  useEffect(() => {
    if (profile) {
      setEditedProfile({
        displayName: profile.displayName || '',
        title: profile.title || '',
        location: profile.location || '',
        bio: profile.bio || ''
      });
    }
  }, [profile]);

  const getSkillLevel = (score) => {
    if (score >= 90) return 'Master';
    if (score >= 75) return 'Expert';
    if (score >= 60) return 'Senior';
    if (score >= 40) return 'Advanced';
    return 'Beginner';
  };

  const formatFileSize = (bytes) => {
    if (!bytes) return '0 B';
    const sizes = ['B', 'KB', 'MB', 'GB'];
    const i = Math.floor(Math.log(bytes) / Math.log(1024));
    return `${(bytes / Math.pow(1024, i)).toFixed(1)} ${sizes[i]}`;
  };

  const handleSaveProfile = async () => {
    setIsSaving(true);
    try {
      const { error } = await updateProfile({
        display_name: editedProfile.displayName,
        title: editedProfile.title,
        location: editedProfile.location,
        bio: editedProfile.bio
      });
      if (!error) setIsEditing(false);
    } catch (err) {
      console.error("Profile save error:", err);
    } finally {
      setIsSaving(false);
    }
  };

  const handleLogout = async () => {
    try {
      await logout();
      localStorage.removeItem('__RADAR_UNLOCKED__');
      navigate('/');
    } catch (err) {
      console.error(err);
    }
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
        
        <div className="grid lg:grid-cols-4 gap-8">
          
          {/* Identity Column */}
          <div className="lg:col-span-1 space-y-6">
            <GlassCard className="p-8 text-center relative overflow-hidden">
              <div className="absolute top-0 left-0 w-full h-24 bg-gradient-to-br from-primary/10 via-secondary/10 to-transparent pointer-events-none" />
              
              <div className="relative mb-8 inline-block group">
                <div className="w-32 h-32 rounded-[2.5rem] bg-white/5 border border-white/10 p-2 overflow-hidden shadow-2xl transition-all duration-700 group-hover:border-primary/50 relative">
                  <img 
                    src={getProfileImage()} 
                    alt="User" 
                    className="w-full h-full object-cover rounded-[2rem]" 
                  />
                  <div className="absolute inset-0 bg-primary/20 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center backdrop-blur-[2px]">
                    <Settings className="w-6 h-6 text-white animate-spin-slow" />
                  </div>
                </div>
                <div className="absolute -bottom-2 -right-2 w-10 h-10 rounded-2xl bg-primary border-4 border-[#0F172A] flex items-center justify-center text-black shadow-xl">
                   <Shield className="w-5 h-5 fill-current" />
                </div>
              </div>

              <div className="mb-6">
                <h2 className="text-2xl font-black mb-1 italic tracking-tight">{profile?.displayName}</h2>
                <div className="px-4 py-1.5 rounded-full bg-primary/10 border border-primary/20 inline-flex items-center gap-2">
                  <div className="w-1 h-1 rounded-full bg-primary animate-pulse" />
                  <span className="text-primary text-[9px] font-black uppercase tracking-widest">{profile?.title || 'Elite Pilot'}</span>
                </div>
              </div>

              <p className="text-[10px] text-white/30 font-medium leading-relaxed mb-8 px-4 italic">
                {profile?.bio || "No technical authorization statement provided."}
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
                  <span className="text-xs font-semibold">{profile?.title || 'Set your title'}</span>
                </div>
                <div className="flex items-center gap-3 text-white/40 group cursor-pointer hover:text-white transition-colors">
                  <div className="w-8 h-8 rounded-lg bg-white/5 flex items-center justify-center group-hover:text-primary"><Globe className="w-4 h-4" /></div>
                  <span className="text-xs font-semibold">{profile?.location || 'Set your location'}</span>
                </div>
              </div>

              <button 
                onClick={handleLogout}
                className="w-full mt-10 p-4 rounded-2xl bg-red-500/5 border border-red-500/10 text-red-500 flex items-center justify-center gap-3 hover:bg-red-500/10 transition-all text-xs font-black uppercase tracking-widest"
              >
                <LogOut className="w-4 h-4" /> Sign Out
              </button>
            </GlassCard>


          </div>

          {/* Main Content Column */}
          <div className="lg:col-span-3 space-y-8">
            
            {/* Detailed Stats Grid */}
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
              {[
                { label: 'Analyses', val: dataLoading ? '...' : String(profileStats.analyses), color: 'text-blue-400' },
                { label: 'Verified Skills', val: dataLoading ? '...' : String(profileStats.verifiedSkills), color: 'text-primary' },
                { label: 'Documents', val: dataLoading ? '...' : String(documents.length), color: 'text-secondary' },
                { label: 'Success Rate', val: dataLoading ? '...' : profileStats.successRate, color: 'text-emerald-400' },
              ].map((stat, i) => (
                <GlassCard key={i} className="p-6 text-center">
                  <div className={`text-2xl font-black mb-1 ${stat.color}`}>{stat.val}</div>
                  <div className="text-[9px] font-black uppercase text-white/30 tracking-widest">{stat.label}</div>
                </GlassCard>
              ))}
            </div>

            {/* Content Tabs */}
            <div className="flex gap-8 border-b border-white/5 px-2">
              {['expertise', 'assets', 'matrix settings'].map((tab) => (
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
                  initial={{ opacity: 0, y: 5 }} 
                  animate={{ opacity: 1, y: 0 }} 
                  exit={{ opacity: 0, y: -5 }}
                  className="space-y-8"
                >
                  {dataLoading ? (
                    <div className="flex items-center justify-center py-20">
                      <Loader2 className="w-8 h-8 text-primary animate-spin" />
                    </div>
                  ) : skills.length === 0 ? (
                    <div className="text-center py-20">
                      <Zap className="w-10 h-10 text-white/10 mx-auto mb-4" />
                      <p className="text-white/30 text-sm font-medium mb-6">No verified skills yet. Run an analysis to discover your expertise!</p>
                      <GlowButton onClick={() => navigate('/analyze')} size="sm" variant="primary" className="px-8">
                        Analyze Now <Sparkles className="w-3 h-3" />
                      </GlowButton>
                    </div>
                  ) : (
                    <div className="grid md:grid-cols-2 gap-8">
                      {skills.map((skill, i) => (
                        <GlassCard key={i} className="p-8 group cursor-pointer border-white/10 hover:border-primary/30 transition-all duration-300">
                          <div className="flex items-center justify-between mb-6">
                            <h4 className="text-lg font-bold tracking-tight text-white/90">{skill.name}</h4>
                            <div className="text-[9px] font-black uppercase text-primary tracking-widest px-3 py-1 bg-primary/5 rounded-lg border border-primary/10">Verified</div>
                          </div>
                          <div className="relative h-1 w-full bg-white/5 rounded-full overflow-hidden mb-4">
                            <motion.div 
                              initial={{ width: 0 }} 
                              animate={{ width: `${skill.score}%` }} 
                              transition={{ duration: 1.5, ease: "circOut" }}
                              className="h-full bg-primary shadow-[0_0_15px_rgba(16,185,129,0.3)]" 
                            />
                          </div>
                          <div className="flex justify-between text-[7px] font-black text-white/20 tracking-[0.3em]">
                             <span>{skill.score}% PROFICIENCY MATRIX</span>
                             <span className="text-white/40">LVL: {skill.level.toUpperCase()}</span>
                          </div>
                        </GlassCard>
                      ))}
                    </div>
                  )}
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
                  {dataLoading ? (
                    <div className="flex items-center justify-center py-20">
                      <Loader2 className="w-8 h-8 text-primary animate-spin" />
                    </div>
                  ) : documents.length === 0 ? (
                    <div className="text-center py-20">
                      <FileText className="w-10 h-10 text-white/10 mx-auto mb-4" />
                      <p className="text-white/30 text-sm font-medium mb-6">No documents uploaded yet. Upload a resume to get started!</p>
                      <GlowButton onClick={() => navigate('/analyze')} size="sm" variant="primary" className="px-8">
                        Upload Resume <Sparkles className="w-3 h-3" />
                      </GlowButton>
                    </div>
                  ) : (
                    <>
                      {documents.map((doc, i) => (
                        <GlassCard key={doc.id || i} className="p-5 flex items-center justify-between hover:bg-white/[0.04] transition-all group">
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
                    </>
                  )}
                  <GlowButton onClick={() => navigate('/analyze')} variant="glass" className="w-full mt-4 py-6 border-dashed border-2 border-white/5 bg-transparent hover:bg-white/5 hover:border-white/10">
                     <Sparkles className="w-4 h-4 text-primary" /> Upload New Repository Asset
                  </GlowButton>
                </motion.div>
              )}
              {activeTab === 'matrix settings' && (
                <motion.div 
                  key="settings"
                  initial={{ opacity: 0, scale: 0.98 }} 
                  animate={{ opacity: 1, scale: 1 }} 
                  exit={{ opacity: 0, scale: 0.98 }}
                  className="space-y-8"
                >
                   <GlassCard className="p-12 border-white/10 relative overflow-hidden bg-white/[0.01]">
                      <div className="flex items-center justify-between mb-12">
                         <div className="flex items-center gap-4">
                            <div className="w-12 h-12 rounded-2xl bg-primary/10 flex items-center justify-center text-primary">
                               <Settings className="w-6 h-6" />
                            </div>
                            <div>
                               <h3 className="text-xl font-bold italic tracking-tight">Identity Calibration</h3>
                               <p className="text-[10px] text-white/20 font-black uppercase tracking-widest mt-1">Update primary matrix metadata</p>
                            </div>
                         </div>
                         <GlowButton onClick={handleSaveProfile} disabled={isSaving} variant="primary" size="sm" className="px-8 font-black uppercase text-[10px]">
                            {isSaving ? <Loader2 className="w-4 h-4 animate-spin" /> : "Sync Changes"}
                         </GlowButton>
                      </div>

                      <div className="grid md:grid-cols-2 gap-10">
                         <div className="space-y-6">
                            <div className="space-y-2">
                               <label className="text-[10px] font-black uppercase tracking-widest text-white/30 ml-1">Callsign / Name</label>
                               <input 
                                 type="text"
                                 value={editedProfile.displayName}
                                 onChange={(e) => setEditedProfile({...editedProfile, displayName: e.target.value})}
                                 className="w-full bg-white/5 border border-white/10 rounded-2xl p-4 text-sm focus:border-primary/50 outline-none transition-all placeholder:text-white/10"
                                 placeholder="Elite Pilot"
                               />
                            </div>
                            <div className="space-y-2">
                               <label className="text-[10px] font-black uppercase tracking-widest text-white/30 ml-1">Professional Designation</label>
                               <input 
                                 type="text"
                                 value={editedProfile.title}
                                 onChange={(e) => setEditedProfile({...editedProfile, title: e.target.value})}
                                 className="w-full bg-white/5 border border-white/10 rounded-2xl p-4 text-sm focus:border-primary/50 outline-none transition-all placeholder:text-white/10"
                                 placeholder="Software Architect"
                               />
                            </div>
                            <div className="space-y-2">
                               <label className="text-[10px] font-black uppercase tracking-widest text-white/30 ml-1">Geo-Location Vector</label>
                               <input 
                                 type="text"
                                 value={editedProfile.location}
                                 onChange={(e) => setEditedProfile({...editedProfile, location: e.target.value})}
                                 className="w-full bg-white/5 border border-white/10 rounded-2xl p-4 text-sm focus:border-primary/50 outline-none transition-all placeholder:text-white/10"
                                 placeholder="San Francisco, CA"
                               />
                            </div>
                         </div>
                         <div className="space-y-6">
                            <div className="space-y-2 h-full flex flex-col">
                               <label className="text-[10px] font-black uppercase tracking-widest text-white/30 ml-1">Authorization Bio</label>
                               <textarea 
                                 value={editedProfile.bio}
                                 onChange={(e) => setEditedProfile({...editedProfile, bio: e.target.value})}
                                 className="w-full h-full bg-white/5 border border-white/10 rounded-2xl p-5 text-sm focus:border-primary/50 outline-none transition-all placeholder:text-white/10 resize-none min-h-[200px]"
                                 placeholder="Brief technical summary..."
                               />
                            </div>
                         </div>
                      </div>

                      <div className="mt-12 p-6 rounded-2xl bg-primary/5 border border-primary/10 flex items-center justify-between">
                         <div className="flex items-center gap-4">
                            <Shield className="w-5 h-5 text-primary/40" />
                            <p className="text-[9px] font-black uppercase tracking-widest text-primary/40 leading-relaxed max-w-lg">
                               Primary identity attributes are used for AI vector matching and PDF authorization. Unauthorized modifications are logged to the security vault.
                            </p>
                         </div>
                      </div>
                   </GlassCard>
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
