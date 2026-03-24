import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { useNavigate, useLocation } from 'react-router-dom';
import { 
  User, 
  LogOut, 
  LayoutDashboard, 
  ChevronDown, 
  Settings,
  Bell,
  Sparkles,
  Zap,
  CheckCircle2,
  Clock,
  Shield
} from 'lucide-react';
import GlowButton from '../ui/GlowButton';
import { useAuth } from '../../context/AuthContext';

const Navbar = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const { user, profile, logout, getProfileImage, loading } = useAuth();
  const [scrolled, setScrolled] = useState(false);
  const [showDropdown, setShowDropdown] = useState(false);
  const [showNotifications, setShowNotifications] = useState(false);
  const [unreadCount, setUnreadCount] = useState(2);

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 50);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const handleNav = (path) => {
    navigate(path);
    window.scrollTo({ top: 0, behavior: 'smooth' });
    setShowDropdown(false);
    setShowNotifications(false);
  };

  const menuItems = [
    { label: 'Home', path: '/home' },
    { label: 'Analyze', path: '/analyze' },
    { label: 'Features', path: '/features' },
  ];

  const notifications = [
    { id: 1, title: 'Analysis Complete', desc: 'Matching score: 88% for Figma Intern.', time: '2m', icon: Zap, color: 'text-primary' },
    { id: 2, title: 'Security Tier Updated', desc: 'Trust level increased to Tier III.', time: '1h', icon: Shield, color: 'text-secondary' }
  ];

  return (
    <nav className={`fixed top-0 w-full z-[100] px-6 py-6 transition-all duration-500 ${scrolled ? 'py-4' : ''}`}>
      <div className={`max-w-7xl mx-auto flex items-center justify-between transition-all duration-500 rounded-[2rem] px-8 py-3 border backdrop-blur-3xl ${scrolled ? 'bg-black/60 border-white/10 shadow-2xl' : 'bg-white/5 border-white/5 shadow-lg'}`}>
        
        {/* Logo */}
        <div 
          onClick={() => handleNav('/home')}
          className="flex items-center gap-2 cursor-pointer group"
        >
          <div className="w-10 h-10 rounded-xl bg-gradient-to-tr from-primary to-secondary rotate-[-10deg] group-hover:rotate-0 transition-transform duration-500 shadow-[0_0_20px_rgba(139,92,246,0.3)]" />
          <span className="text-xl font-black tracking-tightest">SkillGap Radar</span>
        </div>
        
        {/* Desktop Menu */}
        <div className="hidden lg:flex items-center gap-10 text-[10px] font-black uppercase tracking-[0.2em] text-white/40">
          {menuItems.map((item) => (
            <button 
              key={item.label}
              onClick={() => handleNav(item.path)} 
              className={`hover:text-white transition-all relative py-2 ${location.pathname === item.path ? 'text-white' : ''}`}
            >
              {item.label}
              {location.pathname === item.path && (
                <motion.span 
                  layoutId="nav-active"
                  className="absolute -bottom-1 left-0 w-full h-[2px] bg-primary shadow-[0_0_10px_rgba(139,92,246,0.8)]" 
                />
              )}
            </button>
          ))}
        </div>

        {/* User / Auth Section */}
        <div className="flex items-center gap-4">
          <AnimatePresence mode="wait">
            {loading ? (
               <div key="loading" className="w-10 h-10 rounded-xl bg-white/5 animate-pulse" />
            ) : user ? (
              <div key="user" className="flex items-center gap-4 relative">
                
                {/* Notifications Panel */}
                <div className="relative">
                  <button 
                    onClick={() => {
                        setShowNotifications(!showNotifications);
                        setShowDropdown(false);
                        if (!showNotifications) setUnreadCount(0);
                    }}
                    className="flex w-10 h-10 rounded-xl bg-white/5 items-center justify-center hover:bg-white/10 transition-colors relative group"
                  >
                    <Bell className={`w-4 h-4 transition-colors ${showNotifications ? 'text-primary' : 'text-white/40'}`} />
                    {unreadCount > 0 && <div className="absolute top-2 right-2 w-2 h-2 rounded-full bg-primary" />}
                    <div className="absolute -bottom-8 left-1/2 -translate-x-1/2 px-2 py-1 bg-white/90 text-black text-[8px] font-bold rounded opacity-0 group-hover:opacity-100 transition-opacity whitespace-nowrap">Radar-Shield Status</div>
                  </button>

                  <AnimatePresence>
                    {showNotifications && (
                      <motion.div
                        initial={{ opacity: 0, y: 10, scale: 0.95 }}
                        animate={{ opacity: 1, y: 0, scale: 1 }}
                        exit={{ opacity: 0, scale: 0.95 }}
                        className="absolute top-full right-0 mt-3 w-80 glass-morphism rounded-3xl border border-white/10 shadow-3xl p-5"
                      >
                         <h4 className="text-[10px] font-black uppercase tracking-widest text-white/30 mb-6 flex items-center justify-between">
                            Active Transmissions 
                            <button className="hover:text-primary transition-colors">Clear All</button>
                         </h4>
                         <div className="space-y-4 max-h-[300px] overflow-y-auto pr-2 scrollbar-none">
                            {notifications.map((notif) => (
                              <div key={notif.id} className="flex gap-4 p-3 rounded-2xl bg-white/[0.02] border border-white/5 hover:border-white/10 transition-all cursor-pointer">
                                 <div className={`w-10 h-10 rounded-xl bg-white/5 flex items-center justify-center flex-shrink-0 ${notif.color}`}>
                                    <notif.icon className="w-4 h-4" />
                                 </div>
                                 <div className="flex-1">
                                    <div className="flex justify-between items-start mb-1">
                                       <span className="text-[11px] font-bold">{notif.title}</span>
                                       <span className="text-[8px] text-white/20 font-black">{notif.time} ago</span>
                                    </div>
                                    <p className="text-[9px] text-white/40 leading-relaxed font-medium">{notif.desc}</p>
                                 </div>
                              </div>
                            ))}
                         </div>
                         <div className="mt-6 pt-4 border-t border-white/5 text-center">
                            <span className="text-[9px] text-white/10 font-black tracking-widest uppercase">Radar Protocol Secure</span>
                         </div>
                      </motion.div>
                    )}
                  </AnimatePresence>
                </div>

                {/* Profile Toggle */}
                <div className="relative">
                  <button 
                    onClick={() => {
                        setShowDropdown(!showDropdown);
                        setShowNotifications(false);
                    }}
                    className="flex items-center gap-3 p-1 pl-3 bg-white/5 border border-white/5 rounded-2xl hover:border-white/10 transition-all group"
                  >
                    <div className="hidden sm:block text-right">
                      <div className="text-[10px] font-black uppercase tracking-widest leading-none mb-1">{profile?.displayName?.split(' ')[0]}</div>
                      <div className="text-[8px] text-primary font-black uppercase tracking-widest opacity-60">Level 3</div>
                    </div>
                    <div className="w-8 h-8 rounded-xl bg-white/10 overflow-hidden border border-white/10 group-hover:border-primary/50 transition-colors">
                      <img 
                        src={getProfileImage()} 
                        alt="User" 
                        className="w-full h-full object-cover"
                        onError={(e) => { e.target.src = "https://api.dicebear.com/7.x/avataaars/svg?seed=fallback"; }}
                      />
                    </div>
                  </button>

                  <AnimatePresence>
                    {showDropdown && (
                      <motion.div
                        initial={{ opacity: 0, y: 10, scale: 0.95 }}
                        animate={{ opacity: 1, y: 0, scale: 1 }}
                        exit={{ opacity: 0, y: 10, scale: 0.95 }}
                        className="absolute top-full right-0 mt-3 w-64 glass-morphism rounded-3xl border border-white/10 shadow-3xl p-3"
                      >
                         <div className="p-4 border-b border-white/5 mb-2">
                            <div className="text-sm font-bold truncate">{profile?.displayName}</div>
                            <div className="text-[10px] text-white/30 truncate mt-1">{profile?.email}</div>
                         </div>
                         <div className="space-y-1">
                            <button onClick={() => handleNav('/dashboard')} className="w-full flex items-center gap-3 p-3 rounded-xl hover:bg-white/5 transition-all text-xs font-semibold group">
                               <LayoutDashboard className="w-4 h-4 text-white/40 group-hover:text-primary" /> Dashboard
                            </button>
                            <button onClick={() => handleNav('/profile')} className="w-full flex items-center gap-3 p-3 rounded-xl hover:bg-white/5 transition-all text-xs font-semibold group">
                               <User className="w-4 h-4 text-white/40 group-hover:text-primary" /> View Profile
                            </button>
                            <button onClick={() => handleNav('/security-logs')} className="w-full flex items-center gap-3 p-3 rounded-xl hover:bg-white/5 transition-all text-xs font-semibold group border-b border-white/5 pb-4 mb-2">
                               <Settings className="w-4 h-4 text-white/40 group-hover:text-primary" /> Security Logs
                            </button>
                            <button onClick={logout} className="w-full flex items-center gap-3 p-3 rounded-xl hover:bg-red-500/10 transition-all text-xs font-semibold text-red-500/80 group">
                               <LogOut className="w-4 h-4" /> Sign Out
                            </button>
                         </div>
                      </motion.div>
                    )}
                  </AnimatePresence>
                </div>

              </div>
            ) : (
              <div key="guest" className="flex items-center gap-4">
                <button onClick={() => navigate('/login')} className="hidden sm:block text-[10px] font-black uppercase tracking-widest text-white/40 hover:text-white px-4 py-2 hover:bg-white/5 rounded-xl transition-all">Login</button>
                <GlowButton onClick={() => navigate('/signup')} size="sm" className="px-6">Get Started <Sparkles className="w-4 h-4" /></GlowButton>
              </div>
            )}
          </AnimatePresence>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
