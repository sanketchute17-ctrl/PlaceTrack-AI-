import { motion } from 'framer-motion';
import { useEffect } from 'react';

export default function LoadingScreen({ onComplete }) {
  useEffect(() => {
    const timer = setTimeout(() => {
      onComplete();
    }, 1500); 
    return () => clearTimeout(timer);
  }, [onComplete]);

  return (
    <motion.div
      initial={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 0.4, ease: "easeInOut" }}
      className="fixed inset-0 z-[100] flex flex-col items-center justify-center bg-[#121212]"
    >
      <motion.div 
        initial={{ scale: 0.95, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        transition={{ duration: 0.4 }}
        className="flex flex-col items-center"
      >
        <div className="w-16 h-16 rounded-2xl bg-red-500 flex items-center justify-center mb-6 shadow-lg shadow-blue-600/20">
          <span className="text-2xl font-bold text-white">PT</span>
        </div>
        
        <h1 className="text-xl font-bold text-zinc-100 tracking-wide mb-8">PlaceTrack</h1>
        
        <div className="w-48 h-1.5 bg-slate-200 rounded-full overflow-hidden">
          <motion.div 
            initial={{ width: "0%" }}
            animate={{ width: "100%" }}
            transition={{ duration: 1.2, ease: "easeInOut" }}
            className="h-full bg-red-500 rounded-full"
          ></motion.div>
        </div>
      </motion.div>
    </motion.div>
  );
}
