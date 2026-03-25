import React from 'react';
import { motion } from 'framer-motion';

const GlassCard = ({ children, className = "", hover = true, delay = 0 }) => {
  return (
    <motion.div
      initial={{ opacity: 0, y: 5 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.4, delay }}
      whileHover={hover ? { 
        backgroundColor: 'rgba(255, 255, 255, 0.06)',
        borderColor: 'rgba(16, 185, 129, 0.2)',
      } : {}}
      className={`glass-morphism relative rounded-[2.5rem] p-8 transition-all duration-300 overflow-hidden group ${className}`}
    >
      {/* Technical Accents */}
      <div className="absolute top-0 left-0 w-8 h-8 pointer-events-none opacity-20 border-t border-l border-primary rounded-tl-3xl group-hover:opacity-60 transition-opacity" />
      <div className="absolute bottom-0 right-0 w-8 h-8 pointer-events-none opacity-20 border-b border-r border-primary rounded-br-3xl group-hover:opacity-60 transition-opacity" />
      
      {/* Scanning Light Strip (Hover-Only Performance Scan) */}
      <div className="absolute inset-0 z-0 pointer-events-none opacity-0 group-hover:opacity-100 transition-opacity duration-300">
        <motion.div 
          className="absolute top-0 left-0 w-full h-20 bg-gradient-to-b from-transparent via-primary/5 to-transparent"
          animate={{ y: ['-100%', '400%'] }}
          transition={{ duration: 2.5, repeat: Infinity, ease: "linear" }}
        />
      </div>

      <div className="relative z-10">
        {children}
      </div>
    </motion.div>
  );
};

export default GlassCard;
