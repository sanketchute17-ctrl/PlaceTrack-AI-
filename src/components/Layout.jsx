import { useState } from 'react';
import Sidebar from './Sidebar';
import TopNavbar from './TopNavbar';

export default function Layout({ children }) {
  const [isCollapsed, setIsCollapsed] = useState(false);
  const [isMobileOpen, setIsMobileOpen] = useState(false);

  return (
    <div className="flex min-h-dvh bg-[#121212] text-zinc-100 font-sans selection:bg-red-500/20 selection:text-white relative overflow-x-hidden">
      
      {/* Placement related background image */}
      <div 
        className="fixed inset-0 z-0 opacity-30 bg-cover bg-center pointer-events-none mix-blend-overlay"
        style={{ backgroundImage: 'url("https://images.unsplash.com/photo-1521737604893-d14cc237f11d?q=80&w=2684&auto=format&fit=crop")' }}
      ></div>
      
      {/* Background Watermark */}
      <div className="fixed inset-0 z-0 flex items-center justify-center pointer-events-none overflow-hidden">
        <h1 className="text-[14vw] font-black text-white/[0.02] tracking-tighter uppercase whitespace-nowrap rotate-[-5deg] select-none">
          PlaceTrack Portal
        </h1>
      </div>

      <div className="relative z-10 flex w-full min-h-dvh">
        <Sidebar 
          isCollapsed={isCollapsed} 
          setIsCollapsed={setIsCollapsed} 
          isMobileOpen={isMobileOpen} 
          setIsMobileOpen={setIsMobileOpen} 
        />

        <div className={`flex-1 flex flex-col transition-all duration-300 w-full min-w-0 ${isCollapsed ? 'md:ml-20' : 'md:ml-64'} ml-0`}>
          <TopNavbar setIsMobileOpen={setIsMobileOpen} />
          
          <main className="flex-1 p-4 sm:p-6 lg:p-8 z-10 overflow-x-hidden relative max-w-[1600px] mx-auto w-full">
            {children}
          </main>
        </div>
      </div>
    </div>
  );
}
