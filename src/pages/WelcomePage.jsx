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
    // Flag the experience as unlocked for this specific JavaScript lifecycle
    // (Resets to false on every page refresh/reload)
    window.__RADAR_UNLOCKED__ = true;
    setIsExiting(true);
    
    // Smooth transition to /home after the 3D scene exit animation
    setTimeout(() => {
      navigate('/home');
    }, 1000);
  };

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
        <div className="flex flex-col items-center justify-center gap-6 mb-12">
            <div className="p-4 rounded-[2rem] bg-white/5 backdrop-blur-3xl border border-white/10 shadow-[0_0_50px_rgba(139,92,246,0.2)]">
               <div className="w-16 h-16 rounded-2xl bg-gradient-to-tr from-violet-600 to-pink-600 animate-pulse" />
            </div>
            <h1 className="text-5xl font-black italic tracking-tightest drop-shadow-[0_0_20px_rgba(255,255,255,0.2)]">
              SkillGap Radar
            </h1>
        </div>
        
        <div className="relative px-4">
          <WelcomeCTAButton onClick={handleExplore} />
        </div>
        
        <motion.p 
          initial={{ opacity: 0 }}
          animate={{ opacity: 0.3 }}
          transition={{ delay: 1.5, duration: 1 }}
          className="mt-12 text-[10px] font-black uppercase tracking-[0.5em]"
        >
           Initiate Trajectory Matrix
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
