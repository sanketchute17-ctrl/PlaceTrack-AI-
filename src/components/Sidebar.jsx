import { NavLink } from 'react-router-dom';
import { LayoutDashboard, Users, Briefcase, Calendar, Settings, X, FileText } from 'lucide-react';
import { useContext } from 'react';
import { AuthContext } from '../context/AuthContext';
import Logo from './Logo';

const navItems = [
  { icon: LayoutDashboard, label: 'Dashboard', path: '/' },
  { icon: Users, label: 'Students', path: '/students' },
  { icon: Briefcase, label: 'Companies', path: '/companies' },
  { icon: Calendar, label: 'Internships', path: '/internships' },
  { icon: FileText, label: 'ATS Checker', path: '/ats-checker' },
  { icon: Calendar, label: 'Interviews', path: '/interviews' },
  { icon: FileText, label: 'Reports', path: '/reports' },
  { icon: Settings, label: 'Settings', path: '/settings' },
];

export default function Sidebar({ isCollapsed, setIsCollapsed, isMobileOpen, setIsMobileOpen }) {
  const { user } = useContext(AuthContext);
  const userInitial = user?.name ? user.name.charAt(0).toUpperCase() : 'P';

  return (
    <>
      {/* MOBILE BACKDROP OVERLAY */}
      {isMobileOpen && (
        <div 
          onClick={() => setIsMobileOpen(false)}
          className="fixed inset-0 bg-slate-900/80 backdrop-blur-sm z-40 md:hidden transition-opacity"
        />
      )}

      {/* SIDEBAR CONTAINER */}
      <aside 
        className={`bg-[#1e1e1e] border-r border-[#333] transition-all duration-300 z-50 flex flex-col h-dvh fixed left-0 top-0
          ${isMobileOpen ? 'translate-x-0' : '-translate-x-full md:translate-x-0'}
          ${isCollapsed ? 'md:w-20' : 'md:w-64'}
          w-64`}
      >
        {/* BRAND HEADER */}
        <div className="flex items-center justify-between p-4 border-b border-[#2d2d2d] h-16 overflow-hidden">
          <Logo size="sm" showText={!isCollapsed || isMobileOpen} />
          
          {/* Close button for Mobile */}
          <button 
            onClick={() => setIsMobileOpen(false)}
            className="md:hidden p-1.5 rounded-lg text-zinc-400 hover:text-white hover:bg-[#121212] transition-colors cursor-pointer"
          >
            <X size={20} />
          </button>
        </div>

        {/* NAV LINKS */}
        <nav className="flex-1 overflow-y-auto py-4 px-3 space-y-1">
          {navItems.map((item) => {
            let Icon = item.icon;
            return (
              <NavLink
                key={item.path}
                to={item.path}
                onClick={() => setIsMobileOpen && setIsMobileOpen(false)}
                className={({ isActive }) => `
                  flex items-center gap-3 px-3 py-3 rounded-xl transition-all duration-150 group relative
                  ${isActive 
                    ? 'bg-red-500/10 text-red-400 font-semibold border border-red-500/20 shadow-sm' 
                    : 'text-zinc-400 hover:text-white hover:bg-[#121212] font-medium'}
                `}
              >
                {({ isActive }) => (
                  <>
                    <Icon size={20} className={isActive ? 'text-red-400' : 'text-slate-400 group-hover:text-zinc-300'} />
                    <span className={`whitespace-nowrap text-sm ${isCollapsed ? 'md:hidden' : 'block'}`}>
                      {item.label}
                    </span>
                  </>
                )}
              </NavLink>
            );
          })}
        </nav>

        {/* USER PROFILE FOOTER */}
        <div className="p-4 border-t border-[#2d2d2d] bg-[#121212]/50">
          <div className="flex items-center gap-3">
            <div className="w-9 h-9 rounded-full bg-red-500/20 text-red-400 font-bold flex items-center justify-center shrink-0 border border-red-500/30">
              {userInitial}
            </div>
            <div className={`overflow-hidden ${isCollapsed ? 'md:hidden' : 'block'}`}>
              <p className="text-sm font-semibold text-zinc-100 truncate">{user?.name || 'User Profile'}</p>
              <p className="text-xs text-zinc-500 capitalize truncate font-medium">{user?.role || 'Guest'} Tier</p>
            </div>
          </div>
        </div>
      </aside>
    </>
  );
}
