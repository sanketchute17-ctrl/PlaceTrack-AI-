import { NavLink } from 'react-router-dom';
import { LayoutDashboard, Users, Briefcase, Calendar, Settings, Menu, X } from 'lucide-react';
import { useState } from 'react';

const navItems = [
  { icon: LayoutDashboard, label: 'Dashboard', path: '/' },
  { icon: Users, label: 'Students', path: '/students' },
  { icon: Briefcase, label: 'Companies', path: '/companies' },
  { icon: Calendar, label: 'Internships', path: '/internships' },
  { icon: Users, label: 'ATS Checker', path: '/ats-checker' },
  { icon: Calendar, label: 'Interviews', path: '/interviews' },
  { icon: Users, label: 'Reports', path: '/reports' },
  { icon: Settings, label: 'Settings', path: '/settings' },
];

export default function Sidebar() {
  const [isCollapsed, setIsCollapsed] = useState(false);

  return (
    <aside className={`bg-[#1e1e1e] border-r border-[#333] transition-all duration-300 z-50 flex flex-col h-screen fixed left-0 top-0
      ${isCollapsed ? 'w-20' : 'w-64'}`}>
      <div className="flex items-center justify-between p-4 border-b border-[#2d2d2d] h-16">
        {!isCollapsed && (
          <div className="font-heading font-semibold text-lg text-zinc-100 flex items-center gap-2">
            <div className="w-8 h-8 rounded-lg bg-red-500 flex items-center justify-center text-white font-bold text-sm">
              PT
            </div>
            PlaceTrack
          </div>
        )}
        <button 
          onClick={() => setIsCollapsed(!isCollapsed)}
          className="p-1.5 rounded-md hover:bg-slate-100 transition-colors text-zinc-500 flex-shrink-0 mx-auto"
        >
          {isCollapsed ? <Menu size={20} /> : <X size={20} />}
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
                  ? 'bg-red-500/10 text-red-400 font-medium' 
                  : 'text-zinc-400 hover:text-white hover:bg-[#121212] font-medium'}
              `}
            >
              {({ isActive }) => {
                let Icon = item.icon;
                return (
                  <>
                    <Icon size={20} className={isActive ? 'text-red-400' : 'text-slate-400 group-hover:text-zinc-400'} />
                    {!isCollapsed && <span className="whitespace-nowrap">{item.label}</span>}
                    
                    {isCollapsed && (
                      <div className="absolute left-full ml-2 px-2 py-1 bg-slate-800 text-xs text-white rounded opacity-0 invisible group-hover:opacity-100 group-hover:visible transition-all whitespace-nowrap z-50 shadow-sm border border-slate-700">
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

      <div className="p-4 border-t border-[#2d2d2d] bg-[#121212]/50">
        <div className={`flex items-center gap-3 ${isCollapsed ? 'justify-center' : ''}`}>
          <div className="w-10 h-10 rounded-full bg-red-500/20 text-red-300 font-bold flex items-center justify-center flex-shrink-0 border border-red-500/30/50">
            JD
          </div>
          {!isCollapsed && (
            <div className="overflow-hidden">
              <p className="text-sm font-semibold text-zinc-100 truncate">Jane Doe</p>
              <p className="text-xs text-zinc-500 truncate">Placement Officer</p>
            </div>
          )}
        </div>
      </div>
    </aside>
  );
}
