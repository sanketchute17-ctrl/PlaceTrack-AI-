import { Bell, Search, LogOut, Menu, ArrowRight } from 'lucide-react';
import { useContext, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { AuthContext } from '../context/AuthContext';
import Logo from './Logo';

export default function TopNavbar({ setIsMobileOpen }) {
  const { user, logout, token } = useContext(AuthContext);
  const [showNotifs, setShowNotifs] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');
  const navigate = useNavigate();

  const handleSearch = (e) => {
    if (e.key === 'Enter' && searchQuery.trim()) {
      navigate(`/search?q=${encodeURIComponent(searchQuery.trim())}`);
      setSearchQuery('');
    }
  };

  return (
    <header className="h-16 bg-[#1e1e1e] border-b border-[#333] flex items-center justify-between px-4 sm:px-6 sticky top-0 z-40 transition-all">
      <div className="flex items-center gap-3">
        {/* MOBILE HAMBURGER BUTTON */}
        <button 
          onClick={() => setIsMobileOpen && setIsMobileOpen(true)}
          className="md:hidden p-2 text-zinc-300 hover:text-white hover:bg-[#121212] rounded-xl transition-colors cursor-pointer"
          aria-label="Open Mobile Menu"
        >
          <Menu size={22} />
        </button>

        {/* LOGO VISIBLE ON MOBILE / TABLET */}
        <div className="md:hidden">
          <Logo size="sm" showText={false} />
        </div>

        {/* SEARCH INPUT */}
        <div className="flex items-center gap-2.5 bg-[#121212] border border-[#333] px-3 py-2 rounded-xl text-zinc-400 focus-within:border-red-500/50 focus-within:ring-1 focus-within:ring-red-500/30 transition-all w-44 sm:w-64 md:w-80">
          <Search size={16} className="shrink-0" />
          <input 
            type="text" 
            placeholder="Search..." 
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            onKeyDown={handleSearch}
            className="bg-transparent border-none outline-none text-xs sm:text-sm text-zinc-100 placeholder:text-zinc-500 w-full"
          />
        </div>
      </div>

      <div className="flex items-center gap-2 sm:gap-4 relative">
        <button 
          onClick={() => setShowNotifs(!showNotifs)}
          className="relative p-2 text-slate-400 hover:text-red-400 transition-colors rounded-full hover:bg-red-500/10 cursor-pointer"
        >
          <Bell size={18} />
          <span className="absolute top-1.5 right-1.5 w-2 h-2 bg-red-500 rounded-full border-2 border-[#1e1e1e]"></span>
        </button>

        {showNotifs && (
          <div className="absolute top-12 right-0 sm:right-12 w-72 sm:w-80 bg-[#1e1e1e] border border-[#333] rounded-xl shadow-2xl py-2 z-50 animate-in fade-in slide-in-from-top-4 duration-200">
            <div className="px-4 py-3 border-b border-[#333] flex justify-between items-center bg-[#121212]/50">
              <h4 className="font-semibold text-white text-sm">Notifications</h4>
              <span className="text-[10px] text-red-500 font-bold bg-red-500/10 px-2 py-0.5 rounded-full">3 New</span>
            </div>
            
            <div className="max-h-72 overflow-y-auto">
              <div className="px-4 py-3 border-b border-[#333] hover:bg-[#121212] transition-colors cursor-pointer">
                <div className="flex justify-between items-start mb-1">
                  <span className="font-semibold text-zinc-100 text-xs">New Interview Scheduled</span>
                  <span className="text-[10px] text-zinc-500 font-medium">2m ago</span>
                </div>
                <p className="text-[11px] text-zinc-400 leading-relaxed">Google has reviewed your application for Software Engineer and scheduled a screening round.</p>
              </div>
              
              <div className="px-4 py-3 border-b border-[#333] hover:bg-[#121212] transition-colors cursor-pointer">
                <div className="flex justify-between items-start mb-1">
                  <span className="font-semibold text-zinc-100 text-xs">Profile Viewed</span>
                  <span className="text-[10px] text-zinc-500 font-medium">1h ago</span>
                </div>
                <p className="text-[11px] text-zinc-400 leading-relaxed">Microsoft recruiter opened your resume and technical portfolio.</p>
              </div>
            </div>
            
            <div className="px-4 py-2 border-t border-[#333] text-center bg-[#121212]/50">
              <button onClick={() => setShowNotifs(false)} className="text-xs font-semibold text-red-500 hover:text-red-400 cursor-pointer">Mark all as read</button>
            </div>
          </div>
        )}
        
        <div className="flex items-center gap-2 sm:gap-3 pl-2 sm:pl-4 border-l border-[#333]">
          {token ? (
            <>
              <div className="hidden md:block text-right">
                <p className="text-xs sm:text-sm font-semibold text-zinc-100">{user?.name || 'User'}</p>
                <p className="text-[10px] sm:text-xs text-zinc-500 capitalize font-medium">{user?.role || 'Member'}</p>
              </div>
              <button onClick={logout} className="p-2 text-slate-400 hover:text-red-500 cursor-pointer rounded-full hover:bg-red-500/10 transition-colors" title="Logout">
                 <LogOut size={18} />
              </button>
            </>
          ) : (
            <button
              onClick={() => navigate('/login')}
              className="px-3.5 py-1.5 bg-gradient-to-r from-red-600 to-rose-600 hover:from-red-500 hover:to-rose-500 text-white font-bold rounded-xl text-xs transition-all shadow-[0_0_15px_rgba(239,68,68,0.3)] flex items-center gap-1.5 cursor-pointer"
            >
              <span>Sign In / Register</span>
              <ArrowRight size={14} />
            </button>
          )}
        </div>
      </div>
    </header>
  );
}
