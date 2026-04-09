import { useContext } from 'react';
import { AuthContext } from '../context/AuthContext';
import AnimatedPage from '../components/AnimatedPage';
import Card from '../components/Card';
import { Settings as SettingsIcon, Bell, Lock, User, Palette } from 'lucide-react';

export default function Settings() {
  const { user } = useContext(AuthContext);

  return (
    <AnimatedPage className="pb-12 max-w-4xl mx-auto">
      <div className="flex items-center gap-3 mb-8">
        <div className="w-10 h-10 rounded-xl bg-red-500/20 text-red-400 flex items-center justify-center">
          <SettingsIcon size={20} />
        </div>
        <div>
          <h2 className="text-2xl font-bold text-white tracking-tight">Account Settings</h2>
          <p className="text-zinc-500 text-sm mt-1">Manage your profile, security, and preferences.</p>
        </div>
      </div>

      <div className="space-y-6">
        {/* Profile Card */}
        <Card>
          <div className="flex items-center gap-3 mb-6 border-b border-[#2d2d2d] pb-4">
            <User size={18} className="text-red-400" />
            <h3 className="text-lg font-semibold text-zinc-100">Personal Information</h3>
          </div>
          
          <div className="flex flex-col md:flex-row gap-8">
            <div className="flex-shrink-0 flex flex-col items-center">
              <div className="w-24 h-24 bg-red-500 rounded-full flex items-center justify-center text-white text-3xl font-bold mb-3 shadow-md shadow-blue-200">
                {user?.name ? user.name.charAt(0).toUpperCase() : 'U'}
              </div>
              <button className="text-sm text-red-400 font-medium hover:text-red-300 transition-colors">
                Change Avatar
              </button>
            </div>
            
            <div className="flex-1 space-y-4">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium text-zinc-300 mb-1">Full Name</label>
                  <input type="text" readOnly defaultValue={user?.name || 'Loading...'} className="w-full px-4 py-2 border border-[#333] rounded-lg bg-[#121212] text-zinc-400 focus:outline-none" />
                </div>
                <div>
                  <label className="block text-sm font-medium text-zinc-300 mb-1">Email Address</label>
                  <input type="email" readOnly defaultValue={user?.email || 'Loading...'} className="w-full px-4 py-2 border border-[#333] rounded-lg bg-[#121212] text-zinc-400 focus:outline-none" />
                </div>
              </div>
              <div>
                <label className="block text-sm font-medium text-zinc-300 mb-1">Account Role</label>
                <div className="inline-flex items-center gap-2 px-3 py-1.5 bg-red-500/10 text-red-300 rounded-lg text-sm font-medium border border-red-500/20">
                  <span className="w-2 h-2 rounded-full bg-red-500"></span>
                  {(user?.role || 'student').toUpperCase()}
                </div>
              </div>
            </div>
          </div>
        </Card>

        {/* Security & Password */}
        <Card>
          <div className="flex items-center gap-3 mb-6 border-b border-[#2d2d2d] pb-4">
            <Lock size={18} className="text-zinc-500" />
            <h3 className="text-lg font-semibold text-zinc-100">Security & Password</h3>
          </div>
          
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            <div className="space-y-4">
              <div>
                <label className="block text-sm font-medium text-zinc-300 mb-1">Current Password</label>
                <input type="password" placeholder="••••••••" className="w-full px-4 py-2 border border-[#333] rounded-lg focus:ring-2 focus:ring-red-500 focus:border-transparent outline-none transition-all" />
              </div>
              <div className="pt-2">
                <button className="px-5 py-2 bg-slate-100 text-zinc-300 font-medium rounded-lg hover:bg-slate-200 transition-colors text-sm cursor-pointer">
                  Update Password
                </button>
              </div>
            </div>
            
            <div className="space-y-4 border-t lg:border-t-0 lg:border-l border-[#2d2d2d] lg:pl-6 pt-4 lg:pt-0">
               <h4 className="text-sm font-medium text-zinc-100">Two-Factor Authentication</h4>
               <p className="text-sm text-zinc-500">Add an extra layer of security to your account. We recommend turning this on.</p>
               <button className="px-5 py-2 border-2 border-[#333] text-zinc-300 font-medium rounded-lg hover:border-[#444] transition-colors text-sm mt-2 cursor-pointer">
                 Enable 2FA
               </button>
            </div>
          </div>
        </Card>

        {/* Preferences */}
        <Card>
          <div className="flex items-center gap-3 mb-6 border-b border-[#2d2d2d] pb-4">
            <Palette size={18} className="text-zinc-500" />
            <h3 className="text-lg font-semibold text-zinc-100">Preferences</h3>
          </div>
          
          <div className="space-y-5">
            <div className="flex items-center justify-between">
              <div>
                <h4 className="text-sm font-medium text-zinc-100">Appearance (Dark Mode)</h4>
                <p className="text-sm text-zinc-500">Switch between light and dark themes.</p>
              </div>
              <div className="w-12 h-6 bg-slate-200 rounded-full relative cursor-pointer">
                <div className="w-4 h-4 bg-[#1e1e1e] rounded-full absolute left-1 top-1 shadow-sm"></div>
              </div>
            </div>
            
            <div className="flex items-center justify-between pt-5 border-t border-[#2d2d2d]">
              <div className="flex items-center gap-3">
                <div className="w-8 h-8 rounded-full bg-red-500/10 flex items-center justify-center text-red-400">
                  <Bell size={16} />
                </div>
                <div>
                  <h4 className="text-sm font-medium text-zinc-100">Email Notifications</h4>
                  <p className="text-sm text-zinc-500">Receive alerts inside your inbox.</p>
                </div>
              </div>
              <div className="w-12 h-6 bg-red-500 rounded-full relative cursor-pointer">
                <div className="w-4 h-4 bg-[#1e1e1e] rounded-full absolute right-1 top-1 shadow-sm"></div>
              </div>
            </div>
          </div>
        </Card>
      </div>
    </AnimatedPage>
  );
}
