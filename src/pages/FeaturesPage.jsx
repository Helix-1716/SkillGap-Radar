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
    hidden: { opacity: 0, y: 20 },
    show: { opacity: 1, y: 0 }
  };

  return (
    <AppBackground>
      <Navbar />
      <div className="max-w-7xl mx-auto px-6 pt-40 pb-32">
        <div className="text-center mb-24">
          <motion.div 
             initial={{ opacity: 0, scale: 0.8 }}
             animate={{ opacity: 1, scale: 1 }}
             className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-primary/10 border border-primary/20 text-primary text-[10px] font-black uppercase tracking-[0.2em] mb-6"
          >
            Capabilities
          </motion.div>
          <h1 className="text-6xl font-black mb-6">Designed for Excellence</h1>
          <p className="text-white/40 text-xl max-w-2xl mx-auto leading-relaxed">
            SkillGap Radar uses state-of-the-art vector mapping to provide a laboratory-precise analysis of your professional profile.
          </p>
        </div>

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
              color: 'text-blue-400',
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
              <GlassCard className="h-full group hover:border-white/20 transition-all border-white/5">
                <div className={`w-14 h-14 rounded-2xl bg-white/5 flex items-center justify-center mb-8 group-hover:scale-110 transition-transform`}>
                  <feature.icon className={`w-7 h-7 ${feature.color}`} />
                </div>
                <h3 className="text-2xl font-bold mb-4">{feature.title}</h3>
                <p className="text-sm text-white/30 leading-relaxed font-medium">{feature.desc}</p>
              </GlassCard>
            </motion.div>
          ))}
        </motion.div>

        <div className="mt-24 p-12 glass-morphism rounded-[3rem] border border-white/5 flex flex-col md:flex-row items-center justify-between gap-10">
          <div>
            <h2 className="text-3xl font-black mb-3 italic">Ready to see it in action?</h2>
            <p className="text-white/40 font-medium">Join 450,000+ students already perfecting their profiles.</p>
          </div>
          <GlowButton size="lg" className="px-12" onClick={() => window.location.href = '/analyze'}>
            Try Analyze Now
          </GlowButton>
        </div>
      </div>
    </AppBackground>
  );
};

export default FeaturesPage;
