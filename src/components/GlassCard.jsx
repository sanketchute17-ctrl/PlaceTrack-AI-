import { motion } from 'framer-motion';

export default function GlassCard({ children, className = '', delay = 0, hover = true }) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5, delay, ease: 'easeOut' }}
      className={`glass rounded-2xl p-6 ${hover ? 'glass-hover hover:border-indigo-500/30 hover:shadow-indigo-500/5' : ''} ${className}`}
    >
      {children}
    </motion.div>
  );
}
