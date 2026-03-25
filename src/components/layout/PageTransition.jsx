import React, { useState, useEffect } from 'react';
import { useLocation } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import { Zap, Loader2 } from 'lucide-react';

/**
 * PageTransition - High-Performance Cinematic Loading Shutter
 * Appears during navigation to maintain the "Laboratory" aesthetic.
 */
const PageTransition = ({ children }) => {
  const location = useLocation();
  const [displayLocation, setDisplayLocation] = useState(location);
  const [transitionStage, setTransitionStage] = useState('idle'); // idle, loading

  useEffect(() => {
    if (location.pathname !== displayLocation.pathname) {
      setTransitionStage('loading');
      
      // Artificial delay to show the "Scanning" matrix (UX choice)
      const timer = setTimeout(() => {
        setDisplayLocation(location);
        setTransitionStage('idle');
      }, 1200); // 1.2s for a premium feel

      return () => clearTimeout(timer);
    }
  }, [location, displayLocation]);

  return (
    <div className="relative w-full h-full">
      {/* SHUTTER LAYER */}
      <AnimatePresence mode="wait">
        {transitionStage === 'loading' && (
          <motion.div
            key="shutter"
            initial={{ opacity: 0, scale: 1 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.4, ease: "easeInOut" }}
            className="fixed inset-0 z-[999] bg-[#030303] flex flex-col items-center justify-center p-6 overflow-hidden pointer-events-auto"
          >
            {/* Background Texture for the Loader */}
            <div className="absolute inset-0 z-0 bg-noise opacity-5 pointer-events-none" />
            <div className="absolute inset-x-0 h-[1px] top-1/2 bg-gradient-to-r from-transparent via-primary/40 to-transparent animate-pulse shadow-[0_0_20px_rgba(139,92,246,0.3)]" />
            
            <motion.div 
               initial={{ opacity: 0, y: 10 }}
               animate={{ opacity: 1, y: 0 }}
               className="relative z-10 flex flex-col items-center gap-8"
            >
               <div className="relative">
                  <div className="w-24 h-24 rounded-[2rem] bg-white/5 border border-white/10 flex items-center justify-center backdrop-blur-3xl">
                     <Zap className="w-10 h-10 text-primary animate-pulse" />
                     <div className="absolute inset-0 rounded-[2rem] border-2 border-primary/20 animate-ping opacity-20" />
                  </div>
                  <Loader2 className="w-32 h-32 text-primary/10 absolute -top-4 -left-4 animate-spin-slow" />
               </div>

               <div className="text-center">
                  <h2 className="text-2xl font-black italic tracking-tightest mb-2 italic">SkillGap Radar</h2>
                  <div className="flex items-center justify-center gap-3">
                     <span className="text-[9px] font-black uppercase tracking-[0.6em] text-white/20 animate-pulse">Syncing Vector Matrix</span>
                     <div className="flex gap-1">
                        <motion.div animate={{ opacity: [0, 1, 0] }} transition={{ repeat: Infinity, duration: 1 }} className="w-1 h-1 rounded-full bg-primary" />
                        <motion.div animate={{ opacity: [0, 1, 0] }} transition={{ repeat: Infinity, duration: 1, delay: 0.2 }} className="w-1 h-1 rounded-full bg-primary" />
                        <motion.div animate={{ opacity: [0, 1, 0] }} transition={{ repeat: Infinity, duration: 1, delay: 0.4 }} className="w-1 h-1 rounded-full bg-primary" />
                     </div>
                  </div>
               </div>
            </motion.div>

            {/* Matrix Decorative Elements */}
            <div className="absolute bottom-10 left-10 text-[8px] font-black uppercase tracking-[0.4em] text-white/5 flex flex-col gap-1">
               <span>P-ID: {Math.random().toString(36).substr(2, 9).toUpperCase()}</span>
               <span>SYSTEM STATUS: COMPILING</span>
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* RENDER CURRENT PAGE */}
      <motion.div
        key={displayLocation.pathname}
        initial={{ opacity: 0, y: 10 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6, ease: "easeOut" }}
      >
        {children}
      </motion.div>
      
      <style>{`
        .animate-spin-slow {
           animation: spin 5s linear infinite;
        }
        @keyframes spin {
           from { transform: rotate(0deg); }
           to { transform: rotate(360deg); }
        }
        .bg-noise {
           background-image: url("/noise.svg");
        }
      `}</style>
    </div>
  );
};

export default PageTransition;
