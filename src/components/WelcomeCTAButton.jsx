import { motion } from 'framer-motion';
import { ArrowRight } from 'lucide-react';

const WelcomeCTAButton = ({ onClick }) => {
  return (
    <motion.button
      onClick={onClick}
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.8, delay: 0.5, ease: "easeOut" }}
      whileHover={{ scale: 1.05 }}
      whileTap={{ scale: 0.95 }}
      className="group relative px-8 py-4 bg-white/5 backdrop-blur-xl border border-white/10 rounded-full overflow-hidden transition-all duration-500 hover:border-white/20 hover:shadow-[0_0_40px_rgba(139,92,246,0.3)]"
    >
      <div className="absolute inset-0 bg-gradient-to-r from-violet-600/20 to-pink-600/20 opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
      <div className="relative flex items-center gap-3">
        <span className="text-lg font-medium tracking-wide text-white/90 group-hover:text-white transition-colors duration-300">
          Explore that matters!
        </span>
        <motion.div
          animate={{ x: [0, 5, 0] }}
          transition={{ repeat: Infinity, duration: 1.5, ease: "easeInOut" }}
        >
          <ArrowRight className="w-5 h-5 text-white/70 group-hover:text-white transition-colors duration-300" />
        </motion.div>
      </div>
      
      {/* Subtle bottom glow line */}
      <div className="absolute bottom-0 left-0 right-0 h-[2px] bg-gradient-to-r from-transparent via-violet-500/50 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
    </motion.button>
  );
};

export default WelcomeCTAButton;
