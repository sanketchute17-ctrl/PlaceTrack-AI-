export default function Logo({ size = 'md', showText = true, className = '' }) {
  const iconSizes = {
    sm: 'w-8 h-8',
    md: 'w-10 h-10',
    lg: 'w-14 h-14'
  };

  const textSizes = {
    sm: 'text-base',
    md: 'text-xl',
    lg: 'text-3xl'
  };

  return (
    <div className={`flex items-center gap-3 ${className}`}>
      {/* FUTURISTIC GLOWING LOGO MARK */}
      <div className={`relative ${iconSizes[size]} flex items-center justify-center shrink-0`}>
        {/* Glow Aura */}
        <div className="absolute inset-0 bg-gradient-to-tr from-red-600 via-rose-500 to-orange-500 rounded-xl blur-sm opacity-70 animate-pulse"></div>
        
        {/* Logo Container */}
        <div className="relative w-full h-full bg-[#161618] border border-white/10 rounded-xl flex items-center justify-center shadow-lg overflow-hidden group">
          {/* Subtle Grid Background inside Logo */}
          <div className="absolute inset-0 bg-[radial-gradient(#ef4444_1px,transparent_1px)] [background-size:6px_6px] opacity-20"></div>
          
          {/* Custom SVG Icon combining Location Pin + Growth Vector + AI Radar */}
          <svg viewBox="0 0 40 40" fill="none" xmlns="http://www.w3.org/2000/svg" className="w-3/5 h-3/5 relative z-10 text-white drop-shadow-[0_0_8px_rgba(239,68,68,0.8)]">
            <circle cx="20" cy="20" r="16" stroke="url(#logo_grad_1)" strokeWidth="2.5" strokeDasharray="3 3" opacity="0.6" />
            <path d="M20 6C13.3726 6 8 11.3726 8 18C8 25.5 20 34 20 34C20 34 32 25.5 32 18C32 11.3726 26.6274 6 20 6Z" fill="url(#logo_grad_2)" opacity="0.85" />
            <path d="M20 11L25 17H21.5V23H18.5V17H15L20 11Z" fill="#FFFFFF" />
            
            <defs>
              <linearGradient id="logo_grad_1" x1="0" y1="0" x2="40" y2="40" gradientUnits="userSpaceOnUse">
                <stop stopColor="#F87171" />
                <stop offset="1" stopColor="#F97316" />
              </linearGradient>
              <linearGradient id="logo_grad_2" x1="8" y1="6" x2="32" y2="34" gradientUnits="userSpaceOnUse">
                <stop stopColor="#EF4444" />
                <stop offset="1" stopColor="#DC2626" />
              </linearGradient>
            </defs>
          </svg>
        </div>
      </div>

      {/* TYPOGRAPHY */}
      {showText && (
        <div className="flex items-center gap-1.5 leading-none">
          <span className={`font-black text-white tracking-tight ${textSizes[size]}`}>
            Place<span className="text-transparent bg-clip-text bg-gradient-to-r from-red-400 via-rose-500 to-orange-400">Track</span>
          </span>
          <span className="px-1.5 py-0.5 bg-red-500/10 border border-red-500/30 text-red-400 font-extrabold text-[10px] rounded uppercase tracking-wider shadow-sm">
            AI
          </span>
        </div>
      )}
    </div>
  );
}
