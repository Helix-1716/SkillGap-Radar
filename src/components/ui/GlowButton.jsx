import React from 'react';
import { motion } from 'framer-motion';

const GlowButton = ({ 
  children, 
  onClick, 
  variant = "primary", // primary, secondary, glass, outline
  className = "",
  size = "md" 
}) => {
  const variants = {
    primary: "bg-primary text-white shadow-[0_0_30px_rgba(139,92,246,0.2)] hover:shadow-[0_0_50px_rgba(139,92,246,0.4)]",
    secondary: "bg-secondary text-white shadow-[0_0_30px_rgba(236,72,153,0.2)] hover:shadow-[0_0_50px_rgba(236,72,153,0.4)]",
    glass: "glass-morphism text-white/90 hover:text-white border border-white/10 hover:border-white/20",
    outline: "bg-transparent border border-white/20 text-white hover:bg-white/5",
  };

  const sizes = {
    sm: "px-4 py-2 text-xs",
    md: "px-6 py-3 text-sm font-semibold",
    lg: "px-10 py-5 text-lg font-bold",
  };

  return (
    <motion.button
      whileHover={{ scale: 1.05, y: -2 }}
      whileTap={{ scale: 0.95 }}
      onClick={onClick}
      className={`relative rounded-2xl transition-all duration-300 flex items-center justify-center gap-2 overflow-hidden ${variants[variant]} ${sizes[size]} ${className}`}
    >
      <div className="relative z-10 flex items-center gap-2">
        {children}
      </div>
      {(variant === "primary" || variant === "secondary") && (
        <div className="absolute inset-0 bg-white/10 opacity-0 hover:opacity-100 transition-opacity" />
      )}
    </motion.button>
  );
};

export default GlowButton;
