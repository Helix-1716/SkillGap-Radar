import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { useNavigate } from 'react-router-dom';
import { Mail, Lock, User, Sparkles, AlertCircle } from 'lucide-react';
import AppBackground from '../../components/layout/AppBackground';
import Navbar from '../../components/layout/Navbar';
import GlowButton from '../../components/ui/GlowButton';
import { useAuth } from '../../context/AuthContext';

const SignupPage = () => {
  const navigate = useNavigate();
  const { loginWithGoogle, loginWithGithub } = useAuth();
  const [error, setError] = useState("");

  const handleProviderLogin = async (provider) => {
    try {
      setError("");
      if (provider === 'google') {
        await loginWithGoogle();
      } else {
        await loginWithGithub();
      }
      navigate('/dashboard');
    } catch (err) {
      setError(err.message || "Failed to sign up. Please try again.");
    }
  };

  return (
    <AppBackground>
      <Navbar />
      <div className="min-h-screen flex items-center justify-center p-6 pt-28 pb-12">
        <motion.div
          initial={{ opacity: 0, scale: 0.9, y: 20 }}
          animate={{ opacity: 1, scale: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="w-full max-w-md glass-morphism rounded-[2.5rem] border border-white/10 p-10 relative overflow-hidden group"
        >
          <div className="absolute top-0 right-0 w-32 h-32 bg-secondary/10 blur-[60px] pointer-events-none" />
          
          <div className="text-center mb-10">
            <h1 className="text-3xl font-bold tracking-tight mb-2">Join the Future</h1>
            <p className="text-white/40 text-sm">Track your readiness. Improve faster. Apply smarter.</p>
          </div>

          {error && (
            <div className="mb-6 p-4 bg-red-500/10 border border-red-500/20 rounded-2xl flex items-center gap-3 text-red-500 text-xs">
              <AlertCircle className="w-4 h-4 flex-shrink-0" />
              {error}
            </div>
          )}

          <div className="space-y-4">
            <div className="space-y-2">
              <label className="text-xs font-semibold text-white/50 uppercase tracking-widest ml-1">Full Name</label>
              <div className="relative group/input">
                <User className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-white/20 group-focus-within/input:text-secondary transition-colors" />
                <input 
                  type="text" 
                  placeholder="John Doe"
                  className="w-full bg-white/5 border border-white/5 rounded-2xl py-4 pl-12 pr-4 outline-none focus:border-secondary/50 focus:bg-white/10 transition-all text-sm"
                />
              </div>
            </div>

            <div className="space-y-2">
              <label className="text-xs font-semibold text-white/50 uppercase tracking-widest ml-1">Email Address</label>
              <div className="relative group/input">
                <Mail className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-white/20 group-focus-within/input:text-secondary transition-colors" />
                <input 
                  type="email" 
                  placeholder="name@example.com"
                  className="w-full bg-white/5 border border-white/5 rounded-2xl py-4 pl-12 pr-4 outline-none focus:border-secondary/50 focus:bg-white/10 transition-all text-sm"
                />
              </div>
            </div>

            <div className="space-y-2">
              <label className="text-xs font-semibold text-white/50 uppercase tracking-widest ml-1">Password</label>
              <div className="relative group/input">
                <Lock className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-white/20 group-focus-within/input:text-secondary transition-colors" />
                <input 
                  type="password" 
                  placeholder="Minimum 8 characters"
                  className="w-full bg-white/5 border border-white/5 rounded-2xl py-4 pl-12 pr-4 outline-none focus:border-secondary/50 focus:bg-white/10 transition-all text-sm"
                />
              </div>
            </div>

            <GlowButton 
              variant="secondary"
              onClick={() => navigate('/dashboard')}
              className="w-full py-4 text-base"
            >
              Create Account <Sparkles className="w-5 h-5" />
            </GlowButton>

            <div className="relative py-2">
              <div className="absolute inset-0 flex items-center"><span className="w-full border-t border-white/5" /></div>
              <div className="relative flex justify-center text-[10px] uppercase font-bold text-white/10 tracking-[0.3em]">Sign up with</div>
            </div>

            <div className="grid grid-cols-2 gap-4">
              <button 
                onClick={() => handleProviderLogin('github')}
                className="flex items-center justify-center gap-2 bg-white/5 border border-white/5 hover:bg-white/10 rounded-2xl p-4 transition-all group"
              >
                <svg className="w-5 h-5 group-hover:scale-110 transition-transform fill-current" viewBox="0 0 24 24"><path d="M12 0c-6.626 0-12 5.373-12 12 0 5.302 3.438 9.8 8.207 11.387.599.111.793-.261.793-.577v-2.234c-3.338.726-4.041-1.416-4.041-1.416-.546-1.387-1.333-1.756-1.333-1.756-1.089-.745.083-.729.083-.729 1.205.084 1.839 1.237 1.839 1.237 1.07 1.834 2.807 1.304 3.492.997.107-.775.418-1.305.762-1.604-2.665-.305-5.467-1.334-5.467-5.931 0-1.311.469-2.381 1.236-3.221-.124-.303-.535-1.524.117-3.176 0 0 1.008-.322 3.301 1.23.957-.266 1.983-.399 3.003-.404 1.02.005 2.047.138 3.006.404 2.291-1.552 3.297-1.23 3.297-1.23.653 1.653.242 2.874.118 3.176.77.84 1.235 1.911 1.235 3.221 0 4.609-2.807 5.624-5.479 5.921.43.372.823 1.102.823 2.222v3.293c0 .319.192.694.801.576 4.765-1.589 8.199-6.086 8.199-11.386 0-6.627-5.373-12-12-12z"/></svg>
                <span className="text-sm font-semibold">GitHub</span>
              </button>
              <button 
                onClick={() => handleProviderLogin('google')}
                className="flex items-center justify-center gap-2 bg-white/5 border border-white/5 hover:bg-white/10 rounded-2xl p-4 transition-all group"
              >
                <div className="w-5 h-5 bg-white/10 rounded-full flex items-center justify-center group-hover:scale-110 transition-transform">
                  <span className="text-[10px] font-black">G</span>
                </div>
                <span className="text-sm font-semibold">Google</span>
              </button>
            </div>
          </div>

          <p className="mt-8 text-center text-sm text-white/30">
            Already have an account? <button onClick={() => navigate('/login')} className="text-secondary font-bold hover:underline">Log In</button>
          </p>
        </motion.div>
      </div>
    </AppBackground>
  );
};

export default SignupPage;
