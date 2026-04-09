import { motion } from 'framer-motion';

export default function Skeleton({ className = "", shape = "rect" }) {
  const safeClassName = typeof className === 'string' ? className : '';
  const baseClasses = "bg-slate-200 animate-pulse relative overflow-hidden";
  const shapeClasses = shape === 'circle' ? 'rounded-full' : 'rounded-lg';
  
  return (
    <div className={`${baseClasses} ${shapeClasses} ${safeClassName}`}>
      <motion.div
        className="absolute inset-0 -translate-x-full bg-gradient-to-r from-transparent via-white/40 to-transparent z-10"
        animate={{ translateX: ['-100%', '200%'] }}
        transition={{ duration: 1.5, repeat: Infinity, ease: 'easeInOut' }}
      />
    </div>
  );
}
