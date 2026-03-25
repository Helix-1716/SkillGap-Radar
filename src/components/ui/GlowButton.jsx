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
    primary: "bg-primary/90 text-black border-transparent hover:bg-primary hover:shadow-[0_0_15px_rgba(16,185,129,0.3)]",
    secondary: "bg-secondary/90 text-white border-transparent hover:bg-secondary hover:shadow-[0_0_15px_rgba(99,102,241,0.3)]",
    glass: "bg-white/5 text-white/80 hover:text-white border-white/5 hover:border-white/20 hover:bg-white/10",
    outline: "bg-transparent border-white/10 text-white/50 hover:text-white hover:border-white/30 hover:bg-white/5",
  };

  const sizes = {
    sm: "px-4 py-2 text-[10px] font-black tracking-widest uppercase",
    md: "px-8 py-4 text-xs font-black tracking-widest uppercase",
    lg: "px-12 py-6 text-sm font-black tracking-widest uppercase",
  };

  return (
    <motion.button
      whileTap={{ scale: 0.98 }}
      onClick={onClick}
      className={`relative rounded-2xl transition-all duration-200 flex items-center justify-center gap-3 overflow-hidden border ${variants[variant]} ${sizes[size]} ${className}`}
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
