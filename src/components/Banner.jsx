import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Sparkles, ArrowRight, X } from 'lucide-react';

export default function Banner() {
  const [visible, setVisible] = useState(true);
  const navigate = useNavigate();

  if (!visible) return null;

  return (
    <div className="bg-gradient-to-r from-red-900/90 via-rose-900/90 to-orange-900/90 border-b border-red-500/30 text-white py-2.5 px-4 text-xs sm:text-sm font-medium sticky top-0 z-50 backdrop-blur-md shadow-lg flex items-center justify-between">
      <div className="flex items-center gap-2 max-w-7xl mx-auto text-center sm:text-left justify-center flex-1">
        <span className="p-1 bg-red-500/20 rounded-lg text-red-400 shrink-0 hidden sm:inline-block">
          <Sparkles size={16} />
        </span>
        <span className="text-zinc-200">
          <strong className="text-white font-bold">⚠️ Guest Mode Active:</strong> Until you sign in, placement features (AI ATS, Student Portals & Applications) are locked. <span className="hidden md:inline text-red-200 font-semibold">Sign in to unlock full benefits!</span>
        </span>
        <button
          onClick={() => navigate('/login')}
          className="ml-2 px-3 py-1 bg-gradient-to-r from-red-500 to-rose-600 hover:from-red-600 hover:to-rose-700 text-white font-bold rounded-lg text-xs transition-all shadow-sm flex items-center gap-1 shrink-0 cursor-pointer"
        >
          <span>Sign In / Register</span>
          <ArrowRight size={12} />
        </button>
      </div>

      <button
        onClick={() => setVisible(false)}
        className="text-zinc-400 hover:text-white p-1 rounded-lg transition-colors cursor-pointer shrink-0 ml-2"
        aria-label="Close Announcement"
      >
        <X size={16} />
      </button>
    </div>
  );
}
