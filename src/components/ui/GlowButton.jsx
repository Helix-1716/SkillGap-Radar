import React from 'react';
import { motion } from 'framer-motion';

const GlowButton = ({ 
  children, 
  onClick, 
  variant = "primary", 
  className = "",
  size = "md" 
}) => {
  const variants = {
    primary: "bg-primary text-black border-transparent hover:brightness-110 shadow-[0_0_20px_rgba(16,185,129,0.2)]",
    secondary: "bg-secondary text-white border-transparent hover:brightness-110 shadow-[0_0_20px_rgba(99,102,241,0.2)]",
    glass: "glass-morphism text-white/90 hover:text-white border-white/10 hover:border-primary/40",
    outline: "bg-transparent border-white/10 text-white/60 hover:text-white hover:bg-white/5",
  };

  const sizes = {
    sm: "px-4 py-2 text-[10px] font-black tracking-widest uppercase",
    md: "px-8 py-4 text-xs font-black tracking-widest uppercase",
    lg: "px-12 py-6 text-sm font-black tracking-widest uppercase",
  };

  return (
    <motion.button
      whileHover={{ scale: 1.02, y: -1 }}
      whileTap={{ scale: 0.98 }}
      onClick={onClick}
      className={`relative rounded-2xl transition-all duration-500 flex items-center justify-center gap-3 overflow-hidden border ${variants[variant]} ${sizes[size]} ${className}`}
    >
      {/* Internal "Hardware Light" Gloss */}
      <div className="absolute top-0 left-0 w-full h-[1px] bg-white/20" />
      <div className="absolute inset-0 bg-gradient-to-tr from-transparent via-white/5 to-transparent opacity-0 group-hover:opacity-100 transition-opacity" />
      
      <div className="relative z-10 flex items-center gap-3 drop-shadow-sm">
        {children}
      </div>
    </motion.button>
  );
};

export default GlowButton;
