import { useNavigate } from 'react-router-dom';
import { Lock, ShieldAlert, ArrowRight, X } from 'lucide-react';
import Logo from './Logo';

export default function LockModal({ isOpen, onClose, title = "Authentication Required", message = "Sign in or create a free account to unlock full placement features." }) {
  const navigate = useNavigate();

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-slate-950/80 backdrop-blur-md p-4 animate-in fade-in duration-200">
      <div className="absolute inset-0" onClick={onClose}></div>

      <div className="bg-[#18181c] border border-red-500/30 rounded-3xl shadow-[0_0_50px_rgba(239,68,68,0.2)] max-w-md w-full p-6 sm:p-8 relative z-10 text-center overflow-hidden">
        {/* Glow background */}
        <div className="absolute top-0 left-1/2 -translate-x-1/2 w-48 h-48 bg-red-600/20 rounded-full blur-3xl pointer-events-none"></div>

        <button
          onClick={onClose}
          className="absolute top-4 right-4 text-zinc-400 hover:text-white p-2 rounded-xl bg-white/5 hover:bg-white/10 transition-colors cursor-pointer"
        >
          <X size={18} />
        </button>

        <div className="flex justify-center mb-4">
          <Logo size="sm" />
        </div>

        <div className="w-16 h-16 rounded-2xl bg-gradient-to-tr from-red-500/20 to-orange-500/20 border border-red-500/30 flex items-center justify-center mx-auto mb-5 text-red-400 shadow-inner">
          <Lock size={32} />
        </div>

        <h3 className="text-xl sm:text-2xl font-black text-white mb-2 tracking-tight">{title}</h3>
        <p className="text-zinc-400 text-xs sm:text-sm leading-relaxed mb-6 font-medium">
          {message}
        </p>

        <div className="space-y-3">
          <button
            onClick={() => navigate('/login')}
            className="w-full py-3.5 px-4 bg-gradient-to-r from-red-600 via-rose-600 to-orange-600 hover:from-red-500 hover:to-orange-500 text-white font-extrabold rounded-2xl transition-all shadow-[0_0_20px_rgba(239,68,68,0.4)] flex items-center justify-center gap-2 cursor-pointer text-sm"
          >
            <span>Sign In / Create Account</span>
            <ArrowRight size={16} />
          </button>

          <button
            onClick={onClose}
            className="w-full py-2.5 px-4 bg-[#121212] border border-[#333] hover:border-zinc-500 text-zinc-400 hover:text-white font-semibold rounded-2xl transition-colors cursor-pointer text-xs"
          >
            Continue Browsing Preview
          </button>
        </div>

        <div className="mt-5 pt-4 border-t border-white/5 flex items-center justify-center gap-2 text-[11px] text-zinc-500">
          <ShieldAlert size={14} className="text-red-400" />
          <span>Protected System Feature • Free Instant Registration</span>
        </div>
      </div>
    </div>
  );
}
