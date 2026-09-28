import { useState, useContext, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { Lock, ShieldAlert, ArrowRight, X, User, Briefcase, ShieldCheck, Mail, MoveRight } from 'lucide-react';
import { AuthContext } from '../context/AuthContext';
import Logo from './Logo';

export default function LockModal({
  isOpen,
  onClose,
  title = "Authentication Required",
  message = "Sign in or create a free account to unlock full placement features."
}) {
  const { login, register } = useContext(AuthContext);
  const navigate = useNavigate();
  const [isLogin, setIsLogin] = useState(true);
  const [selectedRole, setSelectedRole] = useState('student');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const [successMsg, setSuccessMsg] = useState('');
  const [formData, setFormData] = useState({ name: '', email: '', password: '' });

  useEffect(() => {
    if (isOpen) {
      setError('');
      setSuccessMsg('');
    }
  }, [isOpen]);

  if (!isOpen) return null;

  const handleFillDemo = (role) => {
    setSelectedRole(role);
    setIsLogin(true);
    setError('');
    setSuccessMsg('');
    setFormData({
      name: '',
      email: `${role}@test.com`,
      password: '123456'
    });
  };

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
        onClose();
        navigate('/dashboard');
      } else {
        setIsLogin(true);
        setSuccessMsg(`Account created! Auto-filled credentials. Click Authenticate to enter.`);
        setLoading(false);
      }
    } else {
      setError(result?.message || 'Authentication failed. Please check credentials.');
      setLoading(false);
    }
  };

  const roles = [
    { id: 'student', label: 'Student', icon: User, color: 'text-red-400 border-red-500/50 bg-red-500/10' },
    { id: 'company', label: 'Company', icon: Briefcase, color: 'text-orange-400 border-orange-500/50 bg-orange-500/10' },
    { id: 'admin', label: 'Admin', icon: ShieldCheck, color: 'text-rose-400 border-rose-500/50 bg-rose-500/10' }
  ];

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-slate-950/85 backdrop-blur-md p-4 animate-in fade-in duration-200 overflow-y-auto">
      <div className="fixed inset-0" onClick={onClose}></div>

      <div className="bg-[#18181c] border border-red-500/30 rounded-3xl shadow-[0_0_50px_rgba(239,68,68,0.25)] max-w-lg w-full p-6 sm:p-8 relative z-10 overflow-hidden my-auto max-h-[90vh] overflow-y-auto">
        {/* Glow background */}
        <div className="absolute top-0 left-1/2 -translate-x-1/2 w-64 h-64 bg-red-600/15 rounded-full blur-3xl pointer-events-none"></div>

        <button
          onClick={onClose}
          className="absolute top-4 right-4 text-zinc-400 hover:text-white p-2 rounded-xl bg-white/5 hover:bg-white/10 transition-colors cursor-pointer z-20"
          aria-label="Close modal"
        >
          <X size={20} />
        </button>

        <div className="flex justify-center mb-3">
          <Logo size="sm" />
        </div>

        <div className="text-center mb-5">
          <h3 className="text-xl sm:text-2xl font-black text-white tracking-tight">{title}</h3>
          <p className="text-zinc-400 text-xs sm:text-sm mt-1 leading-relaxed font-medium">
            {message}
          </p>
        </div>

        {/* 1-CLICK QUICK DEMO LOGIN BUTTONS */}
        <div className="mb-5 bg-[#121212] p-3 rounded-2xl border border-white/10">
          <p className="text-[10px] font-bold text-red-400 uppercase tracking-wider mb-2 text-center">⚡ 1-Click Quick Demo Sign In</p>
          <div className="flex gap-2">
            <button
              type="button"
              onClick={() => handleFillDemo('student')}
              className="flex-1 py-2 px-2 bg-red-500/10 hover:bg-red-500/20 text-red-300 text-[11px] font-bold rounded-xl border border-red-500/30 transition-all text-center cursor-pointer active:scale-95"
            >
              Demo Student
            </button>
            <button
              type="button"
              onClick={() => handleFillDemo('company')}
              className="flex-1 py-2 px-2 bg-orange-500/10 hover:bg-orange-500/20 text-orange-300 text-[11px] font-bold rounded-xl border border-orange-500/30 transition-all text-center cursor-pointer active:scale-95"
            >
              Demo Company
            </button>
            <button
              type="button"
              onClick={() => handleFillDemo('admin')}
              className="flex-1 py-2 px-2 bg-rose-500/10 hover:bg-rose-500/20 text-rose-300 text-[11px] font-bold rounded-xl border border-rose-500/30 transition-all text-center cursor-pointer active:scale-95"
            >
              Demo Admin
            </button>
          </div>
        </div>

        {/* SIGN IN / CREATE ACCOUNT TABS */}
        <div className="flex bg-[#121212] rounded-2xl p-1 mb-4 border border-white/5 relative">
          <button
            type="button"
            onClick={() => { setIsLogin(true); setError(''); setSuccessMsg(''); }}
            className={`flex-1 py-2 text-xs font-bold rounded-xl transition-all cursor-pointer ${isLogin ? 'bg-gradient-to-r from-red-600 to-rose-600 text-white shadow-md' : 'text-zinc-400 hover:text-white'}`}
          >
            Sign In
          </button>
          <button
            type="button"
            onClick={() => { setIsLogin(false); setError(''); setSuccessMsg(''); }}
            className={`flex-1 py-2 text-xs font-bold rounded-xl transition-all cursor-pointer ${!isLogin ? 'bg-gradient-to-r from-red-600 to-rose-600 text-white shadow-md' : 'text-zinc-400 hover:text-white'}`}
          >
            Create Account
          </button>
        </div>

        <form onSubmit={handleSubmit} className="space-y-3.5">
          {/* ROLE SELECTOR */}
          <div>
            <p className="text-[10px] font-bold text-zinc-400 uppercase tracking-widest mb-1.5 ml-1">Select Account Role</p>
            <div className="grid grid-cols-3 gap-2">
              {roles.map((role) => {
                const Icon = role.icon;
                const isSelected = selectedRole === role.id;
                return (
                  <button
                    key={role.id}
                    type="button"
                    onClick={() => setSelectedRole(role.id)}
                    className={`flex flex-col items-center justify-center p-2.5 rounded-2xl border transition-all cursor-pointer ${isSelected ? role.color : 'border-white/5 bg-[#121212] text-zinc-400 hover:text-white hover:border-zinc-500/30'}`}
                  >
                    <Icon size={16} className="mb-1" />
                    <span className="text-[10px] font-bold">{role.label}</span>
                  </button>
                );
              })}
            </div>
          </div>

          {!isLogin && (
            <div className="relative">
              <User className="absolute left-3.5 top-1/2 -translate-y-1/2 text-zinc-500" size={16} />
              <input
                required={!isLogin}
                value={formData.name}
                onChange={e => setFormData({ ...formData, name: e.target.value })}
                type="text"
                placeholder="Full Name"
                className="w-full pl-10 pr-4 py-2.5 bg-[#121212] border border-[#333] rounded-xl text-white text-xs placeholder:text-zinc-500 focus:outline-none focus:border-red-500 transition-all font-medium"
              />
            </div>
          )}

          <div className="relative">
            <Mail className="absolute left-3.5 top-1/2 -translate-y-1/2 text-zinc-500" size={16} />
            <input
              required
              value={formData.email}
              onChange={e => setFormData({ ...formData, email: e.target.value })}
              type="email"
              placeholder="Email Address"
              className="w-full pl-10 pr-4 py-2.5 bg-[#121212] border border-[#333] rounded-xl text-white text-xs placeholder:text-zinc-500 focus:outline-none focus:border-red-500 transition-all font-medium"
            />
          </div>

          <div className="relative">
            <Lock className="absolute left-3.5 top-1/2 -translate-y-1/2 text-zinc-500" size={16} />
            <input
              required
              value={formData.password}
              onChange={e => setFormData({ ...formData, password: e.target.value })}
              type="password"
              placeholder="Password"
              className="w-full pl-10 pr-4 py-2.5 bg-[#121212] border border-[#333] rounded-xl text-white text-xs placeholder:text-zinc-500 focus:outline-none focus:border-red-500 transition-all font-medium"
            />
          </div>

          {error && (
            <div className="p-2.5 rounded-xl bg-red-500/10 border border-red-500/30 text-red-300 text-xs text-center font-medium">
              {error}
            </div>
          )}

          {successMsg && (
            <div className="p-2.5 rounded-xl bg-green-500/10 border border-green-500/30 text-green-400 text-xs text-center font-medium">
              {successMsg}
            </div>
          )}

          <button
            type="submit"
            disabled={loading}
            className="w-full py-3 bg-gradient-to-r from-red-600 via-rose-600 to-orange-600 hover:from-red-500 hover:to-orange-500 text-white font-extrabold rounded-xl transition-all shadow-[0_0_20px_rgba(239,68,68,0.4)] flex items-center justify-center gap-2 cursor-pointer text-xs disabled:opacity-50 mt-2"
          >
            {loading ? (
              <div className="w-4 h-4 border-2 border-white/30 border-t-white rounded-full animate-spin"></div>
            ) : (
              <>
                <span>{isLogin ? 'Authenticate & Access Portal' : 'Create Free Account'}</span>
                <MoveRight size={16} />
              </>
            )}
          </button>
        </form>

        <div className="mt-4 pt-3 border-t border-white/5 flex items-center justify-between text-[11px] text-zinc-500">
          <button
            type="button"
            onClick={onClose}
            className="text-zinc-400 hover:text-white font-medium cursor-pointer"
          >
            ← Continue Browsing Landing Page
          </button>
          <span className="flex items-center gap-1 text-red-400 font-medium">
            <ShieldAlert size={12} />
            <span>Secure Ecosystem</span>
          </span>
        </div>
      </div>
    </div>
  );
}
