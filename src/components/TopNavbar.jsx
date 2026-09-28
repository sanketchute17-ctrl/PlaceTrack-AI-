import { Bell, Search, LogOut } from 'lucide-react';
import { useContext, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { AuthContext } from '../context/AuthContext';
import Logo from './Logo';

export default function TopNavbar() {
  const { user, logout } = useContext(AuthContext);
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
    <header className="h-16 bg-[#1e1e1e] border-b border-[#333] flex items-center justify-between px-6 sticky top-0 z-40 transition-all">
      <div className="flex items-center gap-4">
        {/* LOGO VISIBLE ON MOBILE / TABLET */}
        <div className="lg:hidden">
          <Logo size="sm" showText={false} />
        </div>

        <div className="flex items-center gap-3 bg-[#121212] border border-[#333] px-3 py-2 rounded-xl text-zinc-400 focus-within:border-red-500/50 focus-within:ring-1 focus-within:ring-red-500/30 transition-all w-full max-w-sm">
          <Search size={18} className="flex-shrink-0" />
          <input 
            type="text" 
            placeholder="Search companies, roles, skills..." 
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            onKeyDown={handleSearch}
            className="bg-transparent border-none outline-none text-sm text-zinc-100 placeholder:text-zinc-500 w-full"
          />
        </div>
      </div>

      <div className="flex items-center gap-4 relative">
        <button 
          onClick={() => setShowNotifs(!showNotifs)}
          className="relative p-2 text-slate-400 hover:text-red-400 transition-colors rounded-full hover:bg-red-500/10 cursor-pointer"
        >
          <Bell size={20} />
          <span className="absolute top-1.5 right-1.5 w-2 h-2 bg-red-500 rounded-full border-2 border-[#1e1e1e]"></span>
        </button>

        {showNotifs && (
          <div className="absolute top-12 right-20 w-80 bg-[#1e1e1e] border border-[#333] rounded-xl shadow-2xl py-2 z-50 animate-in fade-in slide-in-from-top-4 duration-200">
            <div className="px-4 py-3 border-b border-[#333] flex justify-between items-center bg-[#121212]/50">
              <h4 className="font-semibold text-white">Notifications</h4>
              <span className="text-xs text-red-500 font-bold bg-red-500/10 px-2 py-1 rounded-full">3 New</span>
            </div>
            
            <div className="max-h-80 overflow-y-auto">
              <div className="px-4 py-3 border-b border-[#333] hover:bg-[#121212] transition-colors cursor-pointer">
                <div className="flex justify-between items-start mb-1">
                  <span className="font-semibold text-zinc-100 text-sm">New Interview Scheduled</span>
                  <span className="text-[10px] text-zinc-500 font-medium">2m ago</span>
                </div>
                <p className="text-xs text-zinc-400 leading-relaxed">Google has reviewed your application for Software Engineer and scheduled a screening round.</p>
              </div>
              
              <div className="px-4 py-3 border-b border-[#333] hover:bg-[#121212] transition-colors cursor-pointer">
                <div className="flex justify-between items-start mb-1">
                  <span className="font-semibold text-zinc-100 text-sm">Profile Viewed</span>
                  <span className="text-[10px] text-zinc-500 font-medium">1h ago</span>
                </div>
                <p className="text-xs text-zinc-400 leading-relaxed">Microsoft recruiter opened your resume and technical portfolio.</p>
              </div>

              <div className="px-4 py-3 hover:bg-[#121212] transition-colors cursor-pointer">
                <div className="flex justify-between items-start mb-1">
                  <span className="font-semibold text-zinc-100 text-sm">System Update</span>
                  <span className="text-[10px] text-zinc-500 font-medium">1d ago</span>
                </div>
                <p className="text-xs text-zinc-400 leading-relaxed">Your account has been officially promoted to the requested tier tracking permissions.</p>
              </div>
            </div>
            
            <div className="px-4 py-2 border-t border-[#333] text-center bg-[#121212]/50">
              <button onClick={() => setShowNotifs(false)} className="text-xs font-semibold text-red-500 hover:text-red-400 cursor-pointer">Mark all as read</button>
            </div>
          </div>
        )}
        
        <div className="flex items-center gap-3 pl-4 border-l border-[#333]">
          <div className="hidden md:block text-right">
            <p className="text-sm font-semibold text-zinc-100">{user?.name || 'Guest User'}</p>
            <p className="text-xs text-zinc-500 capitalize font-medium">{user?.role || 'Guest'}</p>
          </div>
          <button onClick={logout} className="p-2 text-slate-400 hover:text-red-600 cursor-pointer rounded-full hover:bg-red-500/10 transition-colors" title="Logout">
             <LogOut size={18} />
          </button>
        </div>
      </div>
    </header>
  );
}
