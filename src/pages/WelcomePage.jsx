import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import WelcomeCTAButton from '../components/WelcomeCTAButton';
import UnicornScene from "unicornstudio-react";

/**
 * WelcomePage - High-Fidelity Entry Portal
 * Features a cinematic 3D background powered by UnicornStudio.
 */
const WelcomePage = () => {
  const navigate = useNavigate();
  const [isExiting, setIsExiting] = useState(false);

  const handleExplore = () => {
    // Persistent unlock for the Radar experience
    localStorage.setItem('__RADAR_UNLOCKED__', 'true');
    setIsExiting(true);
    
    // Smooth transition to /home after the 3D scene exit animation
    setTimeout(() => {
      navigate('/home');
    }, 1000);
  };

  // Auto-redirect if already logged in and unlocked
  React.useEffect(() => {
    const isUnlocked = localStorage.getItem('__RADAR_UNLOCKED__') === 'true';
    if (isUnlocked && !isExiting) {
      navigate('/dashboard');
    }
  }, [navigate, isExiting]);

  return (
    <div className="relative w-screen h-screen overflow-hidden bg-[#030303] text-white flex flex-col items-center justify-center">
      
      <div className="absolute inset-0 z-0 pointer-events-none overflow-hidden flex items-center justify-center bg-black/40">
        <UnicornScene 
          projectId="8We9yaiLaC1BIfo2nzpA" 
          width="1440px" 
          height="900px" 
          scale={1} 
          dpi={1.5} 
          sdkUrl="https://cdn.jsdelivr.net/gh/hiunicornstudio/unicornstudio.js@2.1.5/dist/unicornStudio.umd.js" 
        />
        {/* Cinematic Vignette Overlay to blend the 3D model */}
        <div className="absolute inset-0 bg-gradient-to-b from-black/60 via-transparent to-black/80 z-[1]" />
      </div>
      
      {/* MAIN CONTENT LAYER */}
      <motion.div
        initial={{ opacity: 0, scale: 0.9, y: 20 }}
        animate={{ opacity: 1, scale: 1, y: 0 }}
        transition={{ duration: 1.2, ease: "easeOut" }}
        className="relative z-10 text-center"
      >
        <div className="flex flex-col items-center justify-center gap-6 mb-16">
            <div className="p-8 rounded-[3rem] bg-white/[0.02] backdrop-blur-xl border border-white/10 shadow-[0_0_80px_rgba(16,185,129,0.15)] group hover:border-primary/40 transition-all duration-700 relative overflow-hidden">
               <div className="absolute inset-0 bg-gradient-to-tr from-primary/5 via-transparent to-secondary/5 opacity-0 group-hover:opacity-100 transition-opacity" />
               <img src="/logo.png" alt="SkillGap Radar Logo" className="w-24 h-24 object-contain drop-shadow-[0_0_30px_rgba(16,185,129,0.4)] transition-transform duration-700 group-hover:scale-110" />
            </div>
            <div className="space-y-2">
              <h1 className="text-6xl font-black italic tracking-tighter drop-shadow-[0_0_30px_rgba(16,185,129,0.2)] bg-gradient-to-b from-white to-white/60 bg-clip-text text-transparent">
                SkillGap Radar
              </h1>
              <div className="h-[1px] w-24 bg-gradient-to-r from-transparent via-primary/50 to-transparent mx-auto" />
            </div>
        </div>
        
        <div className="relative px-4 mb-8">
          <WelcomeCTAButton onClick={handleExplore} />
        </div>
        
        <motion.p 
          initial={{ opacity: 0 }}
          animate={{ opacity: 0.4 }}
          transition={{ delay: 1.5, duration: 1 }}
          className="mt-12 text-[10px] font-black uppercase tracking-[0.8em] text-primary"
        >
           [ Initiate Trajectory Matrix ]
        </motion.p>
      </motion.div>

      {/* EXIT TRANSITION SHUTTER */}
      <AnimatePresence>
        {isExiting && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.8 }}
            className="absolute inset-0 z-[100] bg-black backdrop-blur-3xl"
          />
        )}
      </AnimatePresence>

      <style>{`
        .tracking-tightest { letter-spacing: -0.05em; }
      `}</style>
    </div>
  );
};

export default WelcomePage;
