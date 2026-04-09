import { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { CheckCircle2, CircleDashed, FileText, Upload, ChevronRight } from 'lucide-react';
import AnimatedPage from '../components/AnimatedPage';
import Card from '../components/Card';
import Skeleton from '../components/Skeleton';

const trackerSteps = [
  { id: 1, label: 'Applied', status: 'completed', date: 'Oct 12' },
  { id: 2, label: 'Shortlisted', status: 'completed', date: 'Oct 15' },
  { id: 3, label: 'Interview', status: 'current', date: 'Oct 20' },
  { id: 4, label: 'Selected', status: 'upcoming', date: 'TBD' },
];

export default function StudentProfile() {
  const [resumeText, setResumeText] = useState('');
  const [score, setScore] = useState(null);
  const [isCalculating, setIsCalculating] = useState(false);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const timer = setTimeout(() => setIsLoading(false), 1500);
    return () => clearTimeout(timer);
  }, []);

  const handleCalculateScore = () => {
    if (!resumeText.trim()) return;
    setIsCalculating(true);
    setTimeout(() => {
      setScore(78);
      setIsCalculating(false);
    }, 1500);
  };

  const getScoreColor = (s) => {
    if (s >= 80) return 'text-green-600 stroke-green-500';
    if (s >= 60) return 'text-amber-500 stroke-amber-500';
    return 'text-red-500 stroke-red-500';
  };

  return (
    <AnimatedPage className="space-y-6 pb-12">
      <div className="mb-2">
        <h2 className="text-2xl font-bold text-white tracking-tight">Student Profile</h2>
        <p className="text-zinc-500 text-sm mt-1">Manage your placement journey and resume.</p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Profile Card */}
        {isLoading ? (
           <Skeleton className="lg:col-span-1 h-[360px]" />
        ) : (
          <Card delay={0.1} className="lg:col-span-1 flex flex-col items-center text-center p-8 overflow-hidden h-[360px]">
            <div className="w-24 h-24 rounded-full bg-red-500/10 border border-red-500/20 flex items-center justify-center p-1 mb-5 shadow-sm">
               <div className="w-full h-full rounded-full bg-red-500 flex items-center justify-center">
                 <span className="text-2xl font-bold text-white">JD</span>
               </div>
            </div>
            <h3 className="text-xl font-bold text-white tracking-tight">Jane Doe</h3>
            <p className="text-red-400 font-medium text-sm mb-1 mt-1 bg-red-500/10 px-3 py-1 rounded-md">B.Tech Computer Science</p>
            <p className="text-zinc-500 text-xs mb-8">CGPA: 8.5 <span className="mx-1">•</span> Class of 2026</p>
            
            <div className="w-full grid grid-cols-2 gap-4 mt-auto">
              <div className="bg-[#121212] hover:bg-slate-100 transition-colors p-4 rounded-xl border border-[#333]">
                <div className="text-2xl font-bold text-zinc-100 mb-0.5">12</div>
                <div className="text-xs text-zinc-500 font-medium uppercase tracking-wider">Applications</div>
              </div>
              <div className="bg-red-500/10 hover:bg-red-500/20 transition-colors p-4 rounded-xl border border-red-500/30 group/stat">
                <div className="text-2xl font-bold text-red-400 group-hover/stat:scale-105 transition-transform">3</div>
                <div className="text-xs text-red-300 font-medium uppercase tracking-wider">Shortlists</div>
              </div>
            </div>
          </Card>
        )}

        {/* Timeline Tracker */}
        {isLoading ? (
          <Skeleton className="lg:col-span-2 h-[360px]" />
        ) : (
          <Card delay={0.2} className="lg:col-span-2 flex flex-col justify-center h-[360px] p-8">
            <div className="flex items-center justify-between mb-12">
              <h3 className="text-lg font-semibold text-white tracking-tight">Active Application: <span className="text-red-400">Microsoft</span></h3>
              <span className="px-4 py-1.5 bg-red-500/10 text-red-300 text-xs font-medium rounded-md border border-red-500/30">Software Engineer</span>
            </div>

            <div className="relative flex items-center justify-between w-full max-w-2xl mx-auto px-6 mb-8">
              {/* Connecting lines */}
              <div className="absolute left-10 right-10 top-6 -translate-y-1/2 h-1 bg-slate-100 rounded-full z-0"></div>
              <motion.div 
                initial={{ width: 0 }}
                animate={{ width: '50%' }}
                transition={{ duration: 1.5, ease: 'easeOut', delay: 0.5 }}
                className="absolute left-10 top-6 -translate-y-1/2 h-1 bg-red-500 rounded-full z-0" 
              ></motion.div>

              {trackerSteps.map((step, index) => (
                <div key={step.id} className="relative z-10 flex flex-col items-center gap-4 w-24">
                  <motion.div 
                    initial={{ scale: 0 }}
                    animate={{ scale: 1 }}
                    transition={{ delay: 0.3 + index * 0.1, type: 'spring' }}
                    className={`w-12 h-12 rounded-full flex items-center justify-center border-2 transition-colors bg-[#1e1e1e] mx-auto shadow-sm
                      ${step.status === 'completed' ? 'border-blue-600 outline outline-4 outline-blue-50' : 
                        step.status === 'current' ? 'border-blue-600' : 
                        'border-[#333]'}`}
                  >
                    {step.status === 'completed' ? (
                      <CheckCircle2 size={24} className="text-red-400" strokeWidth={2.5} />
                    ) : step.status === 'current' ? (
                      <motion.div 
                        animate={{ rotate: 360 }} 
                        transition={{ repeat: Infinity, duration: 4, ease: "linear" }}
                        className="w-full h-full rounded-full border-2 border-[#2d2d2d] border-t-white" 
                      >
                         <div className="w-full h-full rounded-full border-4 border-blue-500 border-r-transparent animate-spin"></div>
                      </motion.div>
                    ) : (
                      <span className="text-slate-400 text-sm font-bold">{step.id}</span>
                    )}
                  </motion.div>
                  <div className="text-center">
                    <p className={`text-sm font-semibold ${step.status === 'upcoming' ? 'text-slate-400' : 'text-zinc-100'}`}>
                      {step.label}
                    </p>
                    <p className="text-xs text-zinc-500 mt-1 font-medium">{step.date}</p>
                  </div>
                </div>
              ))}
            </div>
          </Card>
        )}
      </div>

      {/* Resume Score Checker */}
      {isLoading ? (
        <Skeleton className="w-full h-[400px]" />
      ) : (
        <Card delay={0.3} className="grid grid-cols-1 lg:grid-cols-5 gap-8 items-center !p-0 overflow-hidden">
          <div className="z-10 lg:col-span-3 p-8 lg:pr-4">
            <div className="flex items-center gap-3 mb-4">
              <div className="p-2.5 bg-red-500/10 rounded-lg text-red-400 border border-red-500/20">
                <FileText size={20} className="stroke-[2.5]" />
              </div>
              <h3 className="text-xl font-bold text-white">Resume AI Scorer</h3>
            </div>
            <p className="text-zinc-500 text-sm mb-6 max-w-lg leading-relaxed">
              Paste your resume text below or upload a PDF to get an instant AI-powered ATS compatibility score designed for Microsoft formatting.
            </p>
            
            <div className="relative group mb-6">
              <textarea 
                value={resumeText}
                onChange={(e) => setResumeText(e.target.value)}
                placeholder="Paste your resume content here..."
                className="w-full h-36 bg-[#121212] border border-[#333] rounded-xl p-4 text-sm text-zinc-100 placeholder-slate-400 focus:outline-none focus:bg-[#1e1e1e] focus:border-blue-500 focus:ring-2 focus:ring-red-500/20 transition-all resize-none shadow-inner"
              ></textarea>
              <button 
                className="absolute bottom-3 right-3 p-2 bg-[#1e1e1e] text-zinc-500 rounded-lg border border-[#333] hover:text-red-400 hover:bg-red-500/10 transition-colors shadow-sm"
              >
                <Upload size={16} />
              </button>
            </div>
            
            <button 
              onClick={handleCalculateScore}
              disabled={!resumeText.trim() || isCalculating}
              className={`w-full sm:w-auto px-6 py-2.5 rounded-lg text-sm font-semibold transition-all shadow-sm flex items-center justify-center gap-2
                ${!resumeText.trim() ? 'bg-slate-100 text-slate-400 cursor-not-allowed' : 
                  isCalculating ? 'bg-red-500/20 text-red-400 cursor-wait' : 'bg-red-500 hover:bg-red-600 text-white'}`}
            >
              {isCalculating ? (
                <>
                  <CircleDashed size={18} className="animate-spin" />
                  Analyzing...
                </>
              ) : (
                <>Calculate Score <ChevronRight size={18} /></>
              )}
            </button>
          </div>

          <div className="z-10 lg:col-span-2 flex flex-col items-center justify-center p-8 border-t lg:border-t-0 lg:border-l border-[#2d2d2d] h-full min-h-[300px] bg-[#121212]">
            {score === null && !isCalculating ? (
               <div className="text-center text-slate-400 p-8 border-2 border-dashed border-[#333] rounded-full w-48 h-48 flex flex-col items-center justify-center bg-[#1e1e1e]">
                 <FileText size={28} className="mb-2 text-slate-300" />
                 <span className="text-xs font-semibold uppercase tracking-wider">Awaiting Data</span>
               </div>
            ) : (
              <div className="relative w-48 h-48 flex items-center justify-center group">
                <svg className="w-full h-full transform -rotate-90" viewBox="0 0 100 100">
                  {/* Background circle */}
                  <circle 
                    cx="50" cy="50" r="45" 
                    fill="none" 
                    stroke="#E2E8F0" 
                    strokeWidth="8"
                  />
                  {/* Progress circle */}
                  <motion.circle 
                    cx="50" cy="50" r="45" 
                    fill="none" 
                    className={getScoreColor(score || 0)}
                    strokeWidth="8"
                    strokeLinecap="round"
                    initial={{ strokeDasharray: "0 283" }}
                    animate={{ strokeDasharray: `${((score || 0) * 283) / 100} 283` }}
                    transition={{ duration: 1.5, ease: "easeOut" }}
                  />
                </svg>
                <div className="absolute inset-0 flex flex-col items-center justify-center">
                  <motion.span 
                    initial={{ opacity: 0, scale: 0.8 }}
                    animate={{ opacity: 1, scale: 1 }}
                    transition={{ delay: 0.4 }}
                    className={`text-4xl font-bold tracking-tight ${getScoreColor(score || 0).split(' ')[0]}`}
                  >
                    {isCalculating ? '...' : `${score}%`}
                  </motion.span>
                  {!isCalculating && (
                    <motion.span 
                      initial={{ opacity: 0 }}
                      animate={{ opacity: 1 }}
                      transition={{ delay: 0.8 }}
                      className="text-[10px] text-zinc-500 mt-1 font-bold uppercase tracking-[0.15em]"
                    >
                      ATS Match
                    </motion.span>
                  )}
                </div>
              </div>
            )}
          </div>
        </Card>
      )}
    </AnimatedPage>
  );
}
