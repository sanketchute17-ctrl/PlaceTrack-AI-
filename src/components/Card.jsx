import { motion } from 'framer-motion';

export default function Card({ children, className = '', delay = 0, hover = false }) {
  const safeClassName = typeof className === 'string' ? className : '';

  return (
    <motion.div
      initial={{ opacity: 0, y: 10 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.4, delay, ease: 'easeOut' }}
      className={`bg-[#1e1e1e] rounded-xl border border-[#333] card-shadow ${
        hover ? 'hover:-translate-y-1 hover:card-shadow-hover hover:border-red-500/30 transition-all duration-200 cursor-pointer' : ''
      } ${safeClassName}`}
    >
      {children}
    </motion.div>
  );
}
