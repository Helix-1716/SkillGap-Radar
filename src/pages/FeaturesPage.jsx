import React from 'react';
import { motion } from 'framer-motion';
import { Sparkles, Globe, ShieldCheck, Zap, BarChart3, LayoutDashboard, Search, FileText } from 'lucide-react';
import AppBackground from '../components/layout/AppBackground';
import Navbar from '../components/layout/Navbar';
import GlassCard from '../components/ui/GlassCard';
import GlowButton from '../components/ui/GlowButton';

const FeaturesPage = () => {
  const container = {
    hidden: { opacity: 0 },
    show: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1
      }
    }
  };

  const item = {
    hidden: { opacity: 0, y: 5 },
    show: { opacity: 1, y: 0 }
  };

  return (
    <AppBackground>
      <Navbar />
      <div className="max-w-7xl mx-auto px-6 pt-40 pb-32">
        <div className="text-center mb-24 relative">
          <motion.div 
             initial={{ opacity: 0, y: 5 }}
             animate={{ opacity: 1, y: 0 }}
             transition={{ duration: 0.4 }}
             className="inline-flex items-center gap-2 px-5 py-2.5 rounded-full bg-primary/10 border border-primary/20 text-primary text-[10px] font-black uppercase tracking-[0.4em] mb-8 shadow-[0_0_30px_rgba(16,185,129,0.1)]"
          >
            [ Capability Matrix ]
          </motion.div>
          <h1 className="text-7xl font-black mb-8 italic tracking-tighter bg-gradient-to-b from-white to-white/40 bg-clip-text text-transparent">
            Designed for Excellence
          </h1>
          <p className="text-white/40 text-xl max-w-2xl mx-auto leading-relaxed font-medium">
            SkillGap Radar employs high-fidelity vector matching to provide a laboratory-precise analysis of your professional trajectory.
          </p>
        </div>

          {/* Features Grid */}
          <motion.div 
            variants={container}
            initial="hidden"
            animate="show"
            className="grid md:grid-cols-2 lg:grid-cols-3 gap-8"
          >
            {[
              { 
                title: 'Vectorised Skill Extraction', 
                icon: Zap, 
                color: 'text-primary',
                desc: 'Our AI doesn\'t just find keywords; it understands the depth and semantic meaning of your experience.' 
              },
              { 
                title: 'Real-time Market Sync', 
                icon: Globe, 
                color: 'text-secondary',
                desc: 'Direct integration with major job boards ensures your results are matched against current hiring demands.' 
              },
              { 
                title: 'Roadmap Generation', 
                icon: Search, 
                color: 'text-primary',
                desc: 'Custom 4-week learning paths generated specifically to eliminate your most critical skill gaps.' 
              },
              { 
                title: 'Portfolio Audit', 
                icon: FileText, 
                color: 'text-green-400',
                desc: 'Connect your GitHub or Portfolio site for a technical deep-dive into your actual implementation quality.' 
              },
              { 
                title: 'Readiness Scoring', 
                icon: BarChart3, 
                color: 'text-yellow-400',
                desc: 'Transparent scoring across 5 key metrics: Technical, Educational, Industry, Keyword, and soft skills.' 
              },
              { 
                title: 'Enterprise Security', 
                icon: ShieldCheck, 
                color: 'text-primary',
                desc: 'Your data is encrypted and processing happens in secure isolated containers. Your privacy is paramount.' 
              },
            ].map((feature, idx) => (
              <motion.div key={idx} variants={item}>
                <GlassCard className="h-full p-10 group hover:border-white/20 transition-all border-white/10 bg-white/[0.01]">
                  <div className={`w-16 h-16 rounded-[1.5rem] bg-white/5 flex items-center justify-center mb-10 group-hover:scale-110 transition-all duration-500`}>
                    <feature.icon className={`w-8 h-8 ${feature.color}`} />
                  </div>
                  <h3 className="text-2xl font-black mb-4 italic tracking-tight">{feature.title}</h3>
                  <p className="text-sm text-white/40 leading-relaxed font-medium">{feature.desc}</p>
                </GlassCard>
              </motion.div>
            ))}
          </motion.div>

        <div className="mt-40 p-16 glass-morphism rounded-[3.5rem] border border-white/5 relative overflow-hidden group">
          <div className="absolute top-0 right-0 w-96 h-96 bg-primary/5 blur-[120px] pointer-events-none" />
          <div className="flex flex-col md:flex-row items-center justify-between gap-12 relative">
            <div className="max-w-xl">
              <h2 className="text-5xl font-black mb-4 italic tracking-tight">Ready to initiate analysis?</h2>
              <p className="text-white/40 text-lg font-medium leading-relaxed">Join the next generation of professionals perfecting their professional trajectory.</p>
            </div>
            <GlowButton size="lg" className="px-14 py-8 text-lg" onClick={() => window.location.href = '/analyze'}>
              Initialize Radar <Zap className="w-5 h-5 ml-3" />
            </GlowButton>
          </div>
        </div>
      </div>
    </AppBackground>
  );
};

export default FeaturesPage;
