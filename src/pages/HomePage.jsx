import React from 'react';
import { motion } from 'framer-motion';
import { useNavigate } from 'react-router-dom';
import { 
  ArrowRight, 
  Play,
  Sparkles,
  Zap,
  Globe,
  ShieldCheck,
  Map,
  ChevronRight
} from 'lucide-react';
import AppBackground from '../components/layout/AppBackground';
import Navbar from '../components/layout/Navbar';
import GlassCard from '../components/ui/GlassCard';
import GlowButton from '../components/ui/GlowButton';

const HomePage = () => {
  const navigate = useNavigate();

  return (
    <AppBackground>
      <Navbar />
      
      {/* Hero Section */}
      <section className="relative pt-48 pb-32 px-6 overflow-hidden">
        <div className="max-w-7xl mx-auto relative z-10 text-center">
          <motion.div
            initial={{ opacity: 0, scale: 0.9, y: 30 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            transition={{ duration: 0.8 }}
          >
            <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-white/5 border border-white/10 text-primary text-[10px] font-black uppercase tracking-[0.2em] mb-10 shadow-2xl">
              <span className="relative flex h-2 w-2">
                <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-primary opacity-75"></span>
                <span className="relative inline-flex rounded-full h-2 w-2 bg-primary"></span>
              </span>
              Next-Gen AI Gap Detection
            </div>

            <h1 className="text-6xl md:text-8xl font-black tracking-tightest mb-8 leading-[1]">
              Know what’s missing <br />
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-primary via-indigo-400 to-secondary animate-gradient-x">
                before you apply
              </span>
            </h1>

            <p className="max-w-2xl mx-auto text-lg md:text-xl text-white/40 mb-14 leading-relaxed font-light px-4">
              Stop playing the guessing game. Use advanced AI to extract your core competencies, match them with market demand, and generate a 4-week roadmap to success.
            </p>

            <div className="flex flex-col sm:flex-row items-center justify-center gap-6">
              <GlowButton 
                onClick={() => navigate('/analyze')}
                size="lg" 
                className="group w-full sm:w-auto px-12"
              >
                Analyze Portfolio <Sparkles className="w-5 h-5 group-hover:rotate-12 transition-transform" />
              </GlowButton>
              <GlowButton 
                onClick={() => navigate('/features')}
                variant="glass" 
                size="lg"
                className="group w-full sm:w-auto border-white/10"
              >
                Explore Capabilities <Play className="w-5 h-5 group-hover:fill-current transition-all" />
              </GlowButton>
            </div>
          </motion.div>
        </div>

        {/* Ambient Hero Glow */}
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-full max-w-4xl h-full max-h-[500px] bg-primary/20 blur-[180px] rounded-full pointer-events-none -z-1" />
      </section>

      {/* Stats/Social Proof Bar */}
      <section className="px-6 mb-40">
        <div className="max-w-6xl mx-auto grid grid-cols-2 md:grid-cols-4 gap-8 py-10 border-y border-white/5">
          {[
            { label: 'Analyses Run', val: '450K+' },
            { label: 'Skills Tracked', val: '12M+' },
            { label: 'Success Rate', val: '94%' },
            { label: 'Roadmaps Built', val: '180K' },
          ].map((stat, i) => (
            <div key={i} className="text-center group cursor-default">
              <div className="text-2xl font-black mb-1 group-hover:text-primary transition-colors">{stat.val}</div>
              <div className="text-[10px] text-white/20 uppercase font-black tracking-widest">{stat.label}</div>
            </div>
          ))}
        </div>
      </section>

      {/* Featured Section Preview */}
      <section className="max-w-7xl mx-auto px-6 mb-48">
        <div className="grid lg:grid-cols-2 gap-16 items-center">
           <GlassCard className="p-1 group relative overflow-hidden" hover={false}>
              <div className="p-8 space-y-8">
                 <div className="w-14 h-14 bg-primary/10 rounded-2xl flex items-center justify-center">
                    <Zap className="w-8 h-8 text-primary" />
                 </div>
                 <h2 className="text-5xl font-black leading-tight italic">Predictive <br /> Readiness</h2>
                 <p className="text-white/30 text-lg leading-relaxed font-semibold">
                    Our analyzer doesn't just check keywords; it predicts your success based on technical depth, project quality, and industry trends.
                 </p>
                 <GlowButton variant="glass" size="md" onClick={() => navigate('/features')}>
                    Learn about the Engine <ArrowRight className="w-4 h-4" />
                 </GlowButton>
              </div>
           </GlassCard>

           <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
              {[
                { title: 'Vector Mapping', icon: Globe, val: 'Elite accuracy' },
                { title: 'Goal Targets', icon: ShieldCheck, val: 'Zero guesswork' },
                { title: 'Roadmap AI', icon: Map, val: '4-Week paths' },
                { title: 'Secure Vault', icon: Zap, val: 'E2E Encryption' },
              ].map((item, i) => (
                <GlassCard key={i} className="!p-6 group border-white/5 bg-white/[0.02]">
                   <item.icon className="w-6 h-6 text-secondary mb-6 group-hover:scale-110 transition-transform" />
                   <h4 className="text-base font-bold mb-1">{item.title}</h4>
                   <p className="text-[10px] text-white/30 font-black uppercase tracking-widest">{item.val}</p>
                </GlassCard>
              ))}
           </div>
        </div>
      </section>

      {/* CTA Final */}
      <section className="px-6 mb-48">
         <div className="max-w-5xl mx-auto glass-morphism rounded-[3rem] p-16 text-center border border-white/10 relative overflow-hidden group">
            <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-full h-full bg-secondary/5 blur-[120px] rounded-full pointer-events-none" />
            <h2 className="text-5xl md:text-7xl font-black mb-10 italic">Your first analysis is on us.</h2>
            <div className="flex flex-col sm:flex-row items-center justify-center gap-6">
               <GlowButton onClick={() => navigate('/analyze')} variant="secondary" size="lg" className="px-16">Get Started Now</GlowButton>
               <GlowButton onClick={() => navigate('/signup')} variant="glass" size="lg">Join the Waitlist</GlowButton>
            </div>
         </div>
      </section>

      {/* Footer */}
      <footer className="px-6 py-20 border-t border-white/5 relative bg-[#030303]">
        <div className="max-w-7xl mx-auto flex flex-col items-center text-center">
          <div className="flex items-center gap-3 mb-10">
            <div className="w-10 h-10 rounded-xl bg-gradient-to-tr from-primary to-secondary" />
            <span className="text-2xl font-black tracking-tightest">SkillGap Radar</span>
          </div>
          <div className="flex gap-10 items-center justify-center text-xs font-bold uppercase tracking-[0.3em] text-white/30 mb-10">
            <button onClick={() => navigate('/')} className="hover:text-white">Home</button>
            <button onClick={() => navigate('/analyze')} className="hover:text-white">Analyze</button>
            <button onClick={() => navigate('/features')} className="hover:text-white">Features</button>
            <button onClick={() => navigate('/profile')} className="hover:text-white">Profile</button>
          </div>
          <div className="text-[10px] text-white/10 font-black uppercase tracking-[0.5em]">
            © 2026 SkillGap Radar • All Rights Reserved
          </div>
        </div>
      </footer>

      <style>{`
        .tracking-tightest { letter-spacing: -0.05em; }
        .animate-gradient-x {
          background-size: 200% 200%;
          animation: gradient-x 15s ease infinite;
        }
        @keyframes gradient-x {
          0% { background-position: 0% 50%; }
          50% { background-position: 100% 50%; }
          100% { background-position: 0% 50%; }
        }
      `}</style>
    </AppBackground>
  );
};

export default HomePage;
