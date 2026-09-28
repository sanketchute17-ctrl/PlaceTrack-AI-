import { NavLink } from 'react-router-dom';
import { LayoutDashboard, Users, Briefcase, Calendar, Settings, Menu, X, FileText } from 'lucide-react';
import { useState, useContext } from 'react';
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

export default function Sidebar() {
  const [isCollapsed, setIsCollapsed] = useState(false);
  const { user } = useContext(AuthContext);

  const userInitial = user?.name ? user.name.charAt(0).toUpperCase() : 'P';

  return (
    <aside className={`bg-[#1e1e1e] border-r border-[#333] transition-all duration-300 z-50 flex flex-col h-screen fixed left-0 top-0
      ${isCollapsed ? 'w-20' : 'w-64'}`}>
      
      {/* BRAND HEADER WITH CUSTOM LOGO */}
      <div className="flex items-center justify-between p-4 border-b border-[#2d2d2d] h-16 overflow-hidden">
        <Logo size="sm" showText={!isCollapsed} />
        
        <button 
          onClick={() => setIsCollapsed(!isCollapsed)}
          className="p-1.5 rounded-md hover:bg-[#121212] transition-colors text-zinc-400 flex-shrink-0 ml-auto cursor-pointer"
        >
          {isCollapsed ? <Menu size={18} /> : <X size={18} />}
        </button>
      </div>

      <nav className="flex-1 overflow-y-auto py-6 px-3 space-y-1">
        {navItems.map((item) => {
          return (
            <NavLink
              key={item.path}
              to={item.path}
              className={({ isActive }) => `
                flex items-center gap-3 px-3 py-2.5 rounded-lg transition-colors duration-150 group relative
                ${isActive 
                  ? 'bg-red-500/10 text-red-400 font-medium border border-red-500/20' 
                  : 'text-zinc-400 hover:text-white hover:bg-[#121212] font-medium'}
              `}
            >
              {({ isActive }) => {
                let Icon = item.icon;
                return (
                  <>
                    <Icon size={20} className={isActive ? 'text-red-400' : 'text-slate-400 group-hover:text-zinc-300'} />
                    {!isCollapsed && <span className="whitespace-nowrap text-sm">{item.label}</span>}
                    
                    {isCollapsed && (
                      <div className="absolute left-full ml-2 px-2.5 py-1 bg-slate-800 text-xs text-white rounded opacity-0 invisible group-hover:opacity-100 group-hover:visible transition-all whitespace-nowrap z-50 shadow-md border border-slate-700 font-medium">
                        {item.label}
                      </div>
                    )}
                  </>
                );
              }}
            </NavLink>
          );
        })}
      </nav>

      {/* USER PROFILE FOOTER */}
      <div className="p-4 border-t border-[#2d2d2d] bg-[#121212]/50">
        <div className={`flex items-center gap-3 ${isCollapsed ? 'justify-center' : ''}`}>
          <div className="w-9 h-9 rounded-full bg-red-500/20 text-red-400 font-bold flex items-center justify-center flex-shrink-0 border border-red-500/30">
            {userInitial}
          </div>
          {!isCollapsed && (
            <div className="overflow-hidden">
              <p className="text-sm font-semibold text-zinc-100 truncate">{user?.name || 'User Profile'}</p>
              <p className="text-xs text-zinc-500 capitalize truncate font-medium">{user?.role || 'Guest'} Tier</p>
            </div>
          )}
        </div>
      </div>
    </aside>
  );
}
