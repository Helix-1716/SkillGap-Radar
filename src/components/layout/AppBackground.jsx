import React from 'react';
import { motion } from 'framer-motion';

const AppBackground = ({ children, className = "" }) => {
  return (
    <div className={`relative min-h-screen w-full bg-[#030303] text-white overflow-hidden ${className}`}>
      {/* Mesh Gradient Base */}
      <div className="fixed inset-0 z-0 pointer-events-none">
        <div className="absolute top-[-10%] left-[-10%] w-[50%] h-[50%] bg-[#8b5cf6]/10 blur-[120px] rounded-full animate-pulse-slow" />
        <div className="absolute bottom-[-10%] right-[-10%] w-[50%] h-[50%] bg-[#ec4899]/10 blur-[120px] rounded-full animate-pulse-slow" />
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[30%] h-[30%] bg-[#4F46E5]/5 blur-[100px] rounded-full" />
      </div>

      {/* Floating Animated Blobs */}
      <div className="fixed inset-0 z-0 pointer-events-none opacity-30">
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
          className="absolute top-[20%] left-[10%] w-96 h-96 bg-[#8b5cf6]/20 blur-[100px] rounded-full"
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
          className="absolute bottom-[20%] right-[10%] w-80 h-80 bg-[#ec4899]/20 blur-[100px] rounded-full"
        />
      </div>

      {/* Grid Overlay */}
      <div className="fixed inset-0 z-0 pointer-events-none opacity-[0.03]" 
           style={{ backgroundImage: `radial-gradient(circle, #fff 1px, transparent 1px)`, backgroundSize: '40px 40px' }} />
      
      {/* Noise / Grain Texture */}
      <div className="fixed inset-0 z-0 pointer-events-none opacity-[0.02] mix-blend-overlay bg-noise" />

      {/* Main Content */}
      <div className="relative z-10">
        {children}
      </div>
      
      <style>{`
        .bg-noise {
          background-image: url("https://grainy-gradients.vercel.app/noise.svg");
        }
      `}</style>
    </div>
  );
};

export default AppBackground;
