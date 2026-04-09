import { useState, useContext, useEffect } from 'react';
import { AuthContext } from '../context/AuthContext';
import { useNavigate } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import { User, Briefcase, ShieldCheck, Mail, Lock, Rocket, Sparkles, MoveRight, MessageCircle, X, Bot, Send } from 'lucide-react';

export default function Login() {
  const { login, register } = useContext(AuthContext);
  const navigate = useNavigate();
  const [isLogin, setIsLogin] = useState(true);
  const [selectedRole, setSelectedRole] = useState('student');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const [successMsg, setSuccessMsg] = useState('');
  const [launching, setLaunching] = useState(false);
  const [mousePos, setMousePos] = useState({ x: 0, y: 0 });
  const [isChatOpen, setIsChatOpen] = useState(false);
  const [chatMessages, setChatMessages] = useState([
    { sender: 'ai', text: 'Hello! I am your AI assistant. I can guide you through the login process. Are you logging in as a Student, Company, or Admin?' }
  ]);
  const [chatInput, setChatInput] = useState('');

  const handleSendMessage = (e) => {
    e.preventDefault();
    if (!chatInput.trim()) return;
    
    const newMessages = [...chatMessages, { sender: 'user', text: chatInput }];
    setChatMessages(newMessages);
    setChatInput('');
    
    setTimeout(() => {
      let aiResponse = "I can guide you! Please select your role (Student, Company, Admin) and enter your credentials.";
      const lowerInput = chatInput.toLowerCase();
      
      if (lowerInput.includes('student')) {
        aiResponse = "Great! Select 'Student' from the Account Tier, then enter your email and password to sign in.";
      } else if (lowerInput.includes('company')) {
        aiResponse = "Welcome! Select 'Company', then use your corporate email to access your dashboard.";
      } else if (lowerInput.includes('admin')) {
        aiResponse = "Hello Admin. Please select 'Admin' and enter your secure credentials.";
      } else if (lowerInput.includes('register') || lowerInput.includes('create account')) {
        aiResponse = "To create a new account, click the 'Create Account' tab, select your role, and fill in your details.";
      } else if (lowerInput.includes('forgot') || lowerInput.includes('password')) {
        aiResponse = "If you forgot your password, please contact the administrator as password reset is currently unavailable in this demo.";
      }
      
      setChatMessages(prev => [...prev, { sender: 'ai', text: aiResponse }]);
    }, 600);
  };

  const [formData, setFormData] = useState({
    name: '',
    email: '',
    password: ''
  });

  // Smooth Parallax Effect for Background Layers
  useEffect(() => {
    const handleMouseMove = (e) => {
      setMousePos({
        x: (e.clientX / window.innerWidth - 0.5) * 40,
        y: (e.clientY / window.innerHeight - 0.5) * 40
      });
    };
    window.addEventListener('mousemove', handleMouseMove);
    return () => window.removeEventListener('mousemove', handleMouseMove);
  }, []);

  const roles = [
    { id: 'student', label: 'Student', icon: User, color: 'text-red-400 border-red-500/50 shadow-[0_0_15px_rgba(248,113,113,0.3)] bg-red-500/10' },
    { id: 'company', label: 'Company', icon: Briefcase, color: 'text-orange-400 border-orange-500/50 shadow-[0_0_15px_rgba(16,185,129,0.3)] bg-orange-500/10' },
    { id: 'admin', label: 'Admin', icon: ShieldCheck, color: 'text-rose-400 border-rose-500/50 shadow-[0_0_15px_rgba(251,113,133,0.3)] bg-rose-500/10' }
  ];

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError('');
    setSuccessMsg('');

    let result;
    if (isLogin) {
      result = await login(formData.email, formData.password, selectedRole);
    } else {
      result = await register(formData.name, formData.email, formData.password, selectedRole);
    }

    if (result && result.success) {
      if (isLogin) {
        setLaunching(true);
        setTimeout(() => {
          navigate('/');
        }, 1500); 
      } else {
        // Success routing - Force them to login
        setIsLogin(true);
        setSuccessMsg(`Your ${selectedRole.toUpperCase()} account has been created securely! You may now authenticate.`);
        setFormData({ ...formData, password: '' });
        setLoading(false);
      }
    } else {
      setError(result?.message || 'Authentication failed. Network Error.');
      setLoading(false);
      setFormData({ ...formData, password: '' });
    }
  };

  const particles = Array.from({ length: 30 }).map((_, i) => ({
    id: i,
    size: Math.random() * 4 + 2,
    x: Math.random() * 100,
    y: Math.random() * 100,
    duration: Math.random() * 20 + 15,
    delay: Math.random() * 5
  }));

  return (
    <div className="min-h-screen w-full relative flex items-center justify-center lg:justify-end overflow-hidden bg-[#121212] lg:pr-24 font-sans border-0 p-0 m-0">
      
      <motion.div 
        animate={{ x: mousePos.x * -1, y: mousePos.y * -1 }} 
        transition={{ type: "spring", stiffness: 40, damping: 30 }}
        className="absolute inset-[-5%] w-[110%] h-[110%] z-0 pointer-events-none"
      >
        <div className="absolute inset-0 bg-gradient-to-br from-[#121212] via-[#1e1e1e] to-[#121212]"></div>
        <div className="absolute inset-0 opacity-20 bg-cover bg-center mix-blend-screen saturate-150 transition-opacity duration-1000" style={{ backgroundImage: 'url("https://images.unsplash.com/photo-1521737604893-d14cc237f11d?q=80&w=2684&auto=format&fit=crop")' }}></div>

        <motion.div animate={{ scale: [1, 1.2, 1], opacity: [0.15, 0.3, 0.15] }} transition={{ duration: 10, repeat: Infinity, ease: "easeInOut" }} className="absolute top-[-10%] left-[0%] w-[60vw] h-[60vw] bg-red-600/30 rounded-full blur-[140px]" />
        <motion.div animate={{ scale: [1, 1.3, 1], opacity: [0.1, 0.25, 0.1] }} transition={{ duration: 12, repeat: Infinity, ease: "easeInOut", delay: 3 }} className="absolute bottom-[-20%] right-[10%] w-[70vw] h-[70vw] bg-rose-600/30 rounded-full blur-[160px]" />
        <motion.div animate={{ x: [-50, 50, -50], y: [-50, 50, -50], opacity: [0.1, 0.2, 0.1] }} transition={{ duration: 15, repeat: Infinity, ease: "linear" }} className="absolute top-[20%] right-[30%] w-[40vw] h-[40vw] bg-orange-500/20 rounded-full blur-[120px]" />

        {particles.map((p) => (
          <motion.div key={p.id} initial={{ y: `${p.y}vh`, x: `${p.x}vw`, opacity: 0 }} animate={{ y: [`${p.y}vh`, `${p.y - 30}vh`], opacity: [0, 0.8, 0], scale: [0.8, 1.2, 0.8] }} transition={{ duration: p.duration, delay: p.delay, repeat: Infinity, ease: "linear" }} className="absolute rounded-full bg-red-300 shadow-[0_0_12px_rgba(248,113,113,0.9)]" style={{ width: p.size, height: p.size }} />
        ))}
      </motion.div>

      <div className="absolute left-16 2xl:left-32 top-1/2 -translate-y-1/2 hidden lg:flex flex-col z-10 max-w-xl pointer-events-none">
        <motion.div initial={{ opacity: 0, x: -60, filter: 'blur(10px)' }} animate={{ opacity: 1, x: 0, filter: 'blur(0px)' }} transition={{ duration: 1, ease: "easeOut" }}>
          <div className="inline-flex items-center justify-center p-4 rounded-3xl bg-white/5 backdrop-blur-2xl border border-white/10 mb-8 shadow-[0_0_40px_-10px_rgba(248,113,113,0.4)]">
            <Sparkles size={44} className="text-red-400" />
          </div>
          <h1 className="text-7xl xl:text-[88px] font-black text-white tracking-widest mb-6 leading-none shadow-black/50 drop-shadow-2xl">
            PlaceTrack
            <br />
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-[#f87171] to-[#fb7185] filter drop-shadow-[0_0_20px_rgba(239,68,68,0.4)]">Portal</span>
          </h1>
          <p className="text-[#94a3b8] font-medium text-xl leading-relaxed max-w-lg border-l-4 border-red-500 pl-4">A state-of-the-art ecosystem bridging the gap between top talent, aggressive hiring companies, and seamless administration.</p>
        </motion.div>
      </div>

      <motion.div initial={{ opacity: 0, scale: 0.9, y: 30, rotateX: 10 }} animate={{ opacity: 1, scale: 1, y: 0, rotateX: 0 }} transition={{ type: "spring", stiffness: 100, damping: 20 }} style={{ perspective: 1000 }} className="w-full max-w-[460px] z-20 mx-4 lg:mx-0 relative">
        <div className="absolute -inset-[1px] bg-gradient-to-br from-red-500/30 via-transparent to-rose-500/30 rounded-[2.5rem] blur-sm pointer-events-none"></div>
        
        <div className="relative bg-[#121212]/70 backdrop-blur-3xl border border-white/10 px-8 sm:px-10 py-10 rounded-[2.5rem] shadow-[0_30px_60px_-15px_rgba(0,0,0,0.8),0_0_30px_-5px_rgba(248,113,113,0.2)] overflow-hidden">
          
          <div className="text-center mb-8 lg:hidden">
             <h2 className="text-3xl font-extrabold text-white tracking-tight">PlaceTrack <span className="text-red-400">Portal</span></h2>
          </div>

          <h3 className="text-2xl font-bold text-white mb-2">{isLogin ? 'Welcome Back' : 'Join the Ecosystem'}</h3>
          <p className="text-slate-400 text-sm mb-6 font-medium">
            {isLogin ? 'Ensure you select your correct role tier before entering credentials.' : 'Select your designated role to register your account.'}
          </p>

          <form onSubmit={handleSubmit} className="space-y-5 relative">
            
            <div className="flex bg-[#1e1e1e]/80 rounded-2xl p-1 mb-6 shadow-inner border border-white/5 relative z-10 w-full overflow-hidden">
              <motion.div layoutId="tabIndicator" className="absolute inset-y-1 w-[calc(50%-0.25rem)] bg-gradient-to-br from-[#f87171] to-[#dc2626] rounded-xl shadow-[0_0_20px_-5px_rgba(248,113,113,0.6)]" initial={false} animate={{ left: isLogin ? '0.25rem' : 'calc(50% + 0.125rem)' }} transition={{ type: "spring", stiffness: 300, damping: 25 }} />
              <button onClick={(e) => { e.preventDefault(); setIsLogin(true); setError(''); setSuccessMsg(''); }} className={`relative z-10 flex-1 py-3 text-sm font-bold rounded-xl transition-colors duration-300 cursor-pointer ${isLogin ? 'text-white' : 'text-slate-400 hover:text-slate-200'}`}>Sign In</button>
              <button onClick={(e) => { e.preventDefault(); setIsLogin(false); setError(''); setSuccessMsg(''); }} className={`relative z-10 flex-1 py-3 text-sm font-bold rounded-xl transition-colors duration-300 cursor-pointer ${!isLogin ? 'text-white' : 'text-slate-400 hover:text-slate-200'}`}>Create Account</button>
            </div>

            {/* ALWAYS SHOWN ROLE SELECTOR */}
            <div>
              <p className="text-xs font-bold text-slate-500 uppercase tracking-widest mb-3 ml-1">Account Tier</p>
              <div className="grid grid-cols-3 gap-3">
                {roles.map((role) => {
                  const Icon = role.icon;
                  const isSelected = selectedRole === role.id;
                  return (
                    <button key={role.id} type="button" onClick={() => setSelectedRole(role.id)} className={`relative flex flex-col items-center justify-center p-3 rounded-2xl border transition-all duration-300 group overflow-hidden cursor-pointer ${isSelected ? role.color : 'border-white/5 bg-[#1e1e1e]/50 text-slate-400 hover:bg-[#1e1e1e]/80 hover:border-slate-500/30 hover:text-slate-200'}`}>
                      {isSelected && <motion.div layoutId="roleGlow" className="absolute inset-0 bg-gradient-to-t from-white/10 to-transparent"></motion.div>}
                      <Icon size={24} className={`mb-2 relative z-10 transition-transform ${isSelected ? '' : 'group-hover:-translate-y-1'}`} strokeWidth={isSelected ? 2.5 : 2} />
                      <span className="text-[10px] sm:text-xs font-bold tracking-wide relative z-10">{role.label}</span>
                    </button>
                  );
                })}
              </div>
            </div>
            
            <AnimatePresence mode="popLayout" initial={false}>
              {!isLogin && (
                <motion.div initial={{ opacity: 0, height: 0, scale: 0.95 }} animate={{ opacity: 1, height: 'auto', scale: 1 }} exit={{ opacity: 0, height: 0, scale: 0.95 }} transition={{ duration: 0.4, ease: "easeInOut" }} className="space-y-5 overflow-hidden">
                  <div className="relative group">
                    <User className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-500 group-focus-within:text-[#f87171] transition-colors duration-300" size={20} />
                    <input required={!isLogin} value={formData.name} onChange={e => setFormData({...formData, name: e.target.value})} type="text" placeholder="Full Name" className="w-full pl-12 pr-4 py-3.5 bg-[#1e1e1e]/60 border border-white/5 rounded-2xl text-white placeholder:text-slate-500 focus:outline-none focus:bg-[#1e1e1e]/80 focus:border-[#f87171]/50 focus:ring-1 focus:ring-[#f87171] transition-all shadow-inner font-medium" />
                  </div>
                </motion.div>
              )}
            </AnimatePresence>

            <div className="relative group">
              <Mail className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-500 group-focus-within:text-[#f87171] transition-colors duration-300" size={20} />
              <input required value={formData.email} onChange={e => setFormData({...formData, email: e.target.value})} type="email" placeholder="Corporate Email" className="w-full pl-12 pr-4 py-3.5 bg-[#1e1e1e]/60 border border-white/5 rounded-2xl text-white placeholder:text-slate-500 focus:outline-none focus:bg-[#1e1e1e]/80 focus:border-[#f87171]/50 focus:ring-1 focus:ring-[#f87171] transition-all shadow-inner font-medium" />
            </div>

            <div className="relative group">
              <Lock className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-500 group-focus-within:text-[#f87171] transition-colors duration-300" size={20} />
              <input required value={formData.password} onChange={e => setFormData({...formData, password: e.target.value})} type="password" placeholder="Password Array" className="w-full pl-12 pr-4 py-3.5 bg-[#1e1e1e]/60 border border-white/5 rounded-2xl text-white placeholder:text-slate-500 focus:outline-none focus:bg-[#1e1e1e]/80 focus:border-[#f87171]/50 focus:ring-1 focus:ring-[#f87171] transition-all shadow-inner font-medium" />
            </div>

            <AnimatePresence>
              {error && (
                <motion.div initial={{ opacity: 0, y: -10, scale: 0.95 }} animate={{ opacity: 1, y: 0, scale: 1 }} exit={{ opacity: 0, scale: 0.95 }} className="w-full p-4 rounded-xl bg-red-500/10 border border-red-500/30 text-red-300 text-sm text-center font-medium shadow-[0_0_20px_rgba(239,68,68,0.15)] flex flex-col">
                  {error}
                </motion.div>
              )}
              {successMsg && (
                <motion.div initial={{ opacity: 0, y: -10, scale: 0.95 }} animate={{ opacity: 1, y: 0, scale: 1 }} exit={{ opacity: 0, scale: 0.95 }} className="w-full p-4 rounded-xl bg-green-500/10 border border-green-500/30 text-green-400 text-sm text-center font-medium shadow-[0_0_20px_rgba(34,197,94,0.15)] flex flex-col">
                  {successMsg}
                </motion.div>
              )}
            </AnimatePresence>

            <div className="pt-4 relative min-h-[60px]">
              
              {/* Cinematic Rocket Launch Sequence Layer */}
              <AnimatePresence>
                {launching && (
                  <motion.div key="rocket-engine" initial={{ y: 20, opacity: 0, scale: 0.5 }} animate={{ y: -800, opacity: [0, 1, 1, 0], scale: 1.5 }} transition={{ duration: 1.8, ease: "easeIn" }} className="absolute inset-0 flex items-center justify-center text-white z-50 pointer-events-none">
                    <div className="relative flex flex-col items-center">
                      <Rocket size={42} strokeWidth={2.5} className="-rotate-12 text-[#f87171] filter drop-shadow-[0_0_20px_rgba(248,113,113,1)]" fill="#1e1e1e" />
                      <motion.div initial={{ height: 0, opacity: 0 }} animate={{ height: ['0px', '200px', '300px'], opacity: [0, 1, 0] }} transition={{ duration: 1.5, ease: "easeOut" }} className="w-8 origin-top rounded-b-full bg-gradient-to-b from-orange-400 via-red-500 to-transparent blur-md absolute top-[40px] -rotate-12" />
                    </div>
                  </motion.div>
                )}
              </AnimatePresence>

              <button type="submit" disabled={loading || launching} className={`relative w-full py-4 rounded-2xl font-bold flex items-center justify-center gap-2 transition-all duration-500 cursor-pointer overflow-hidden border ${launching ? 'bg-transparent border-transparent text-transparent shadow-none scale-90' : 'bg-gradient-to-r from-[#f87171] to-[#6366f1] hover:shadow-[0_0_30px_rgba(248,113,113,0.6)] text-white border-red-400/30 hover:scale-[1.02] active:scale-[0.98]'}`}>
                <div className="absolute inset-0 bg-gradient-to-b from-white/20 to-transparent opacity-50 rounded-2xl pointer-events-none"></div>
                {!launching && (
                  <motion.div animate={{ opacity: 1 }} className="flex items-center justify-center gap-2 w-full h-full relative z-10">
                    {loading ? <div className="w-6 h-6 border-2 border-white/30 border-t-white rounded-full animate-spin"></div> : (
                      <>
                        <span className="text-base tracking-wide">{isLogin ? 'Authenticate Sequence' : 'Initialize Account'}</span>
                        <MoveRight size={20} className="group-hover:translate-x-1.5 transition-transform duration-300" strokeWidth={2.5} />
                      </>
                    )}
                  </motion.div>
                )}
              </button>
            </div>
          </form>

        </div>
      </motion.div>

      {/* AI Chatbot */}
      <div className="fixed bottom-6 right-6 z-50 flex flex-col items-end">
        <AnimatePresence>
          {isChatOpen && (
            <motion.div
              initial={{ opacity: 0, y: 20, scale: 0.9 }}
              animate={{ opacity: 1, y: 0, scale: 1 }}
              exit={{ opacity: 0, y: 20, scale: 0.9 }}
              className="mb-4 w-80 sm:w-96 bg-[#121212]/95 backdrop-blur-2xl border border-green-500/40 rounded-2xl shadow-[0_0_40px_rgba(34,197,94,0.2)] overflow-hidden flex flex-col"
              style={{ height: '420px' }}
            >
              <div className="bg-gradient-to-r from-green-600/20 to-green-400/10 p-4 border-b border-green-500/20 flex justify-between items-center">
                <div className="flex items-center gap-3">
                  <div className="p-2 bg-green-500/20 rounded-lg">
                    <Bot className="text-green-400" size={20} />
                  </div>
                  <div>
                    <h4 className="text-white font-bold text-sm tracking-wide">Login Assistant AI</h4>
                    <p className="text-green-400 text-[10px] uppercase tracking-wider font-semibold">Online</p>
                  </div>
                </div>
                <button type="button" onClick={() => setIsChatOpen(false)} className="text-slate-400 hover:text-white transition-colors cursor-pointer bg-white/5 hover:bg-white/10 p-1.5 rounded-lg border-0">
                  <X size={18} />
                </button>
              </div>
              
              <div className="flex-1 overflow-y-auto p-4 space-y-4">
                {chatMessages.map((msg, idx) => (
                  <motion.div initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} key={idx} className={`flex ${msg.sender === 'ai' ? 'justify-start' : 'justify-end'}`}>
                    <div className={`max-w-[85%] p-3.5 rounded-2xl text-sm leading-relaxed shadow-sm ${msg.sender === 'ai' ? 'bg-green-500/10 border border-green-500/30 text-green-50 rounded-tl-sm' : 'bg-gradient-to-br from-slate-800 to-slate-900 border border-slate-700 text-white rounded-tr-sm'}`}>
                      {msg.text}
                    </div>
                  </motion.div>
                ))}
              </div>
              
              <div className="p-3 border-t border-green-500/20 bg-[#161616]">
                <form onSubmit={handleSendMessage} className="relative flex items-center m-0">
                  <input
                    type="text"
                    value={chatInput}
                    onChange={(e) => setChatInput(e.target.value)}
                    placeholder="Ask how to login..."
                    className="w-full bg-[#222] text-white text-sm rounded-xl pl-4 pr-12 py-3 focus:outline-none focus:ring-1 focus:ring-green-500/50 border border-white/10 shadow-inner"
                  />
                  <button type="submit" disabled={!chatInput.trim()} className="absolute right-2 p-2 bg-green-500/20 border-0 rounded-lg text-green-400 hover:text-green-300 disabled:opacity-50 disabled:cursor-not-allowed cursor-pointer transition-colors hover:bg-green-500/30">
                    <Send size={16} />
                  </button>
                </form>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
        
        <motion.button
          type="button"
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
          onClick={() => setIsChatOpen(!isChatOpen)}
          className="w-16 h-16 rounded-full bg-gradient-to-tr from-green-500 to-emerald-400 shadow-[0_0_30px_rgba(34,197,94,0.5)] flex items-center justify-center text-white cursor-pointer hover:shadow-[0_0_40px_rgba(34,197,94,0.7)] transition-shadow border border-green-300/30 group"
        >
          {isChatOpen ? <X size={28} /> : <Bot size={28} className="group-hover:animate-pulse" />}
        </motion.button>
      </div>
    </div>
  );
}
