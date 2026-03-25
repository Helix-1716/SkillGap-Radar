import React from 'react';
import { motion } from 'framer-motion';

const AppBackground = ({ children, className = "" }) => {
  return (
    <div className={`relative min-h-screen w-full bg-[#030303] text-white overflow-hidden ${className}`}>
      {/* Mesh Gradient Base */}
      <div className="fixed inset-0 z-0 pointer-events-none">
        <div className="absolute top-[-10%] left-[-10%] w-[50%] h-[50%] bg-primary/5 blur-[120px] rounded-full animate-pulse-slow font-inter" />
        <div className="absolute bottom-[-10%] right-[-10%] w-[50%] h-[50%] bg-secondary/5 blur-[120px] rounded-full animate-pulse-slow" />
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[30%] h-[30%] bg-white/2 blur-[100px] rounded-full" />
      </div>

      {/* Floating Animated Blobs */}
      <div className="fixed inset-0 z-0 pointer-events-none opacity-20">
        <motion.div
          animate={{
            x: [0, 40, -20, 0],
            y: [0, -30, 20, 0],
          }}
          transition={{
            duration: 20,
            repeat: Infinity,
            ease: "easeInOut"
          }}
          className="absolute top-[20%] left-[10%] w-96 h-96 bg-primary/20 blur-[100px] rounded-full"
        />
        <motion.div
          animate={{
            x: [0, -50, 30, 0],
            y: [0, 40, -50, 0],
          }}
          transition={{
            duration: 25,
            repeat: Infinity,
            ease: "easeInOut"
          }}
          className="absolute bottom-[20%] right-[10%] w-80 h-80 bg-secondary/20 blur-[100px] rounded-full"
        />
      </div>

      {/* Technical Grid Base */}
      <div className="fixed inset-0 z-0 pointer-events-none tech-grid opacity-[0.05]" />
      
      {/* Corner Crosshairs (CAD-style) */}
      <div className="fixed top-8 left-8 z-0 pointer-events-none opacity-5 text-[7px] font-black text-primary tracking-[0.3em]">
        0.00° LAT / 0.00° LON
      </div>
      <div className="fixed bottom-8 right-8 z-0 pointer-events-none opacity-5 text-[7px] font-black text-primary tracking-[0.3em] text-right">
        [ SYS_RADAR_ACTIVE ]<br />
        MATRIX_RESOLUTION: 1.05
      </div>
      
      {/* Noise / Grain Texture */}
      <div className="fixed inset-0 z-0 pointer-events-none opacity-[0.03] mix-blend-overlay bg-noise" />

      {/* Main Content */}
      <div className="relative z-10">
        {children}
      </div>
      
      <style>{`
        .bg-noise {
          background-image: url("/noise.svg");
        }
      `}</style>
    </div>
  );
};

export default AppBackground;
