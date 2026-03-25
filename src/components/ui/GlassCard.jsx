import React from 'react';
import { motion } from 'framer-motion';

const GlassCard = ({ children, className = "", hover = true, delay = 0 }) => {
  return (
    <motion.div
      initial={{ opacity: 0, y: 30 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.8, delay }}
      whileHover={hover ? { 
        y: -5,
        backgroundColor: 'rgba(255, 255, 255, 0.04)',
        borderColor: 'rgba(16, 185, 129, 0.2)',
        boxShadow: '0 20px 50px rgba(0,0,0,0.6)' 
      } : {}}
      className={`glass-morphism relative rounded-[2.5rem] p-8 transition-all duration-500 overflow-hidden group ${className}`}
    >
      {/* Technical Accents */}
      <div className="absolute top-0 left-0 w-8 h-8 pointer-events-none opacity-20 border-t border-l border-primary rounded-tl-3xl group-hover:opacity-60 transition-opacity" />
      <div className="absolute bottom-0 right-0 w-8 h-8 pointer-events-none opacity-20 border-b border-r border-primary rounded-br-3xl group-hover:opacity-60 transition-opacity" />
      
      {/* Scanning Light Strip (Hover) */}
      <motion.div 
        className="absolute inset-0 bg-gradient-to-b from-transparent via-primary/5 to-transparent h-20 w-full pointer-events-none opacity-0 group-hover:opacity-100"
        animate={{ y: ['0%', '400%'] }}
        transition={{ duration: 2, repeat: Infinity, ease: "linear" }}
      />

      <div className="relative z-10">
        {children}
      </div>
    </motion.div>
  );
};

export default GlassCard;
