import Sidebar from './Sidebar';
import TopNavbar from './TopNavbar';

export default function Layout({ children }) {
  return (
    <div className="flex min-h-screen bg-[#121212] text-zinc-100 font-sans selection:bg-red-500/20 selection:text-white relative overflow-hidden">
      
      {/* 40% opacity placement related background image */}
      <div 
        className="fixed inset-0 z-0 opacity-40 bg-cover bg-center pointer-events-none mix-blend-overlay"
        style={{ backgroundImage: 'url("https://images.unsplash.com/photo-1521737604893-d14cc237f11d?q=80&w=2684&auto=format&fit=crop")' }}
      ></div>
      
      {/* Huge App Name Background Watermark */}
      <div className="fixed inset-0 z-0 flex items-center justify-center pointer-events-none overflow-hidden">
        <h1 className="text-[12vw] font-black text-white/[0.03] tracking-tighter uppercase whitespace-nowrap rotate-[-5deg] select-none">
          PlaceTrack Portal
        </h1>
      </div>

      <div className="relative z-10 flex w-full">
        <Sidebar />
        <div className="flex-1 flex flex-col ml-16 sm:ml-20 md:ml-64 transition-all duration-300">
          <TopNavbar />
          <main className="flex-1 p-6 lg:p-8 z-10 overflow-x-hidden relative max-w-[1600px] mx-auto w-full h-full">
            {children}
          </main>
        </div>
      </div>
    </div>
  );
}
