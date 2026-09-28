import { useState, useEffect, useContext } from 'react';
import api from '../api/axios';
import AnimatedPage from '../components/AnimatedPage';
import Card from '../components/Card';
import Skeleton from '../components/Skeleton';
import { Rocket, MapPin, Briefcase, Plus, X, Building2 } from 'lucide-react';
import { AuthContext } from '../context/AuthContext';

export default function Internships() {
  const { user } = useContext(AuthContext);
  const [internships, setInternships] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(false);
  
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [formData, setFormData] = useState({
    name: '',
    role: '',
    package: '',
    location: '',
    duration: '',
    eligibility: ''
  });

  const fetchInternships = async () => {
    try {
      const { data } = await api.get('/internships');
      setInternships(Array.isArray(data) ? data : []);
    } catch (err) {
      console.error('Failed to fetch internships', err);
      setError(true);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchInternships();
  }, []);

  const handleOpenModal = () => setIsModalOpen(true);
  const handleCloseModal = () => setIsModalOpen(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsSubmitting(true);
    try {
      const eligibilityArray = formData.eligibility.split(',').map(s => s.trim()).filter(Boolean);
      const payload = { ...formData, eligibility: eligibilityArray };

      await api.post('/internships', payload);
      
      fetchInternships();
      handleCloseModal();
      setFormData({ name: '', role: '', package: '', location: '', duration: '', eligibility: '' });
    } catch (err) {
      console.error('Failed to add internship', err);
      alert('Failed to add internship. Please check server connection.');
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <AnimatedPage className="space-y-6 pb-12 relative">
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 mb-6">
        <div>
          <h2 className="text-2xl font-bold text-white tracking-tight">Active Internships</h2>
          <p className="text-zinc-500 text-sm mt-1">Explore current summer and 6-month internship opportunities</p>
        </div>
        {user?.role === 'admin' && (
          <button 
            onClick={handleOpenModal}
            className="flex items-center justify-center gap-2 px-4 py-2 bg-red-500 text-white text-sm font-medium rounded-lg hover:bg-red-600 transition-colors shadow-sm cursor-pointer"
          >
            <Plus size={16} />
            <span>Add Internship</span>
          </button>
        )}
      </div>

      {isModalOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-slate-900/60 backdrop-blur-md p-4">
          <div className="absolute inset-0" onClick={handleCloseModal}></div>
          <div className="bg-[#1e1e1e] border border-[#333] rounded-xl shadow-2xl w-full max-w-md p-6 relative z-10 animate-in fade-in zoom-in-95 duration-200">
            <div className="flex justify-between items-center mb-5">
              <h3 className="text-xl font-bold text-white">Post New Internship</h3>
              <button onClick={handleCloseModal} className="text-slate-400 hover:text-zinc-300 p-1.5 rounded-lg transition-colors cursor-pointer"><X size={20} /></button>
            </div>
            
            <form onSubmit={handleSubmit} className="space-y-4">
              <div>
                <label className="block text-xs font-semibold text-zinc-400 uppercase tracking-wider mb-1">Company Name</label>
                <input required value={formData.name} onChange={e => setFormData({...formData, name: e.target.value})} type="text" placeholder="e.g. Microsoft" className="w-full px-3 py-2 bg-[#121212] border border-[#444] rounded-lg focus:ring-2 focus:ring-red-500 focus:border-red-500 outline-none transition-all text-white" />
              </div>
              <div>
                <label className="block text-xs font-semibold text-zinc-400 uppercase tracking-wider mb-1">Role</label>
                <input required value={formData.role} onChange={e => setFormData({...formData, role: e.target.value})} type="text" placeholder="e.g. SDE Intern" className="w-full px-3 py-2 bg-[#121212] border border-[#444] rounded-lg focus:ring-2 focus:ring-red-500 focus:border-red-500 outline-none transition-all text-white" />
              </div>
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="block text-xs font-semibold text-zinc-400 uppercase tracking-wider mb-1">Stipend</label>
                  <input required value={formData.package} onChange={e => setFormData({...formData, package: e.target.value})} type="text" placeholder="e.g. 50K/Month" className="w-full px-3 py-2 bg-[#121212] border border-[#444] rounded-lg focus:ring-2 focus:ring-red-500 focus:border-red-500 outline-none transition-all text-white" />
                </div>
                <div>
                  <label className="block text-xs font-semibold text-zinc-400 uppercase tracking-wider mb-1">Duration</label>
                  <input required value={formData.duration} onChange={e => setFormData({...formData, duration: e.target.value})} type="text" placeholder="e.g. 6 Months" className="w-full px-3 py-2 bg-[#121212] border border-[#444] rounded-lg focus:ring-2 focus:ring-red-500 focus:border-red-500 outline-none transition-all text-white" />
                </div>
              </div>
              <div>
                <label className="block text-xs font-semibold text-zinc-400 uppercase tracking-wider mb-1">Location</label>
                <input value={formData.location} onChange={e => setFormData({...formData, location: e.target.value})} type="text" placeholder="e.g. Remote / Bangalore" className="w-full px-3 py-2 bg-[#121212] border border-[#444] rounded-lg focus:ring-2 focus:ring-red-500 focus:border-red-500 outline-none transition-all text-white" />
              </div>
              <div>
                <label className="block text-xs font-semibold text-zinc-400 uppercase tracking-wider mb-1">Required Skills (Comma separated)</label>
                <input value={formData.eligibility} onChange={e => setFormData({...formData, eligibility: e.target.value})} type="text" placeholder="e.g. React, Node.js" className="w-full px-3 py-2 bg-[#121212] border border-[#444] rounded-lg focus:ring-2 focus:ring-red-500 focus:border-red-500 outline-none transition-all text-white" />
              </div>
              
              <div className="pt-4 flex gap-3">
                <button type="button" onClick={handleCloseModal} className="flex-1 px-4 py-2.5 border border-[#444] text-zinc-300 font-medium rounded-lg hover:bg-[#121212] transition-colors cursor-pointer">Cancel</button>
                <button type="submit" disabled={isSubmitting} className="flex-1 px-4 py-2.5 bg-red-600 text-white font-bold rounded-lg hover:bg-red-500 transition-colors disabled:opacity-50 cursor-pointer shadow-lg shadow-red-500/20">{isSubmitting ? 'Posting...' : 'Post Internship'}</button>
              </div>
            </form>
          </div>
        </div>
      )}

      {loading ? (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {[1, 2, 3].map(i => <Skeleton key={i} className="h-48" />)}
        </div>
      ) : error ? (
        <div className="text-center py-20 bg-red-500/10 rounded-xl border border-red-500/20 flex flex-col items-center">
          <div className="w-16 h-16 bg-red-500/20 text-red-500 rounded-full flex items-center justify-center mb-4 border border-red-500/20"><Building2 size={24} /></div>
          <h3 className="text-lg font-bold text-red-400 mb-1">Database Error</h3>
          <p className="text-red-400/80 font-medium max-w-sm">Failed to fetch data from backend.</p>
        </div>
      ) : internships.length === 0 ? (
        <div className="text-center py-24 bg-[#1e1e1e] rounded-xl border border-[#333] shadow-xl">
          <Rocket size={56} className="mx-auto text-zinc-600 mb-4" />
          <h3 className="text-xl font-bold text-white mb-2">No active internships right now.</h3>
          <p className="text-zinc-500 max-w-md mx-auto">Check back later or contact administration to post new opportunities directly through the portal.</p>
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {internships.map((intern) => (
            <Card key={intern.id} hover className="flex flex-col h-full bg-[#1e1e1e] border-[#333]">
              <div className="flex justify-between items-start mb-4">
                <div className="w-12 h-12 rounded-lg bg-orange-500/10 border border-orange-500/20 flex items-center justify-center text-orange-400 font-bold text-lg shadow-[0_0_15px_rgba(249,115,22,0.2)]">
                  {intern.name?.substring(0, 2).toUpperCase() || 'CP'}
                </div>
                <span className="px-3 py-1 text-[10px] font-black rounded-md bg-orange-500/10 text-orange-400 border border-orange-500/20 uppercase tracking-widest list-none shadow-[0_0_10px_rgba(249,115,22,0.1)]">
                  {intern.duration}
                </span>
              </div>
              <h3 className="text-lg font-bold text-white mb-1 tracking-wide">{intern.name}</h3>
              <p className="text-zinc-400 font-semibold text-sm mb-4">{intern.role}</p>

              <div className="space-y-2 mt-auto">
                <div className="flex items-center gap-2 text-sm text-zinc-500 font-medium">
                  <MapPin size={16} className="text-orange-500/70" /> <span>{intern.location}</span>
                </div>
                <div className="flex items-center gap-2 text-sm text-zinc-500 font-medium">
                  <Briefcase size={16} className="text-orange-500/70" /> <span>{intern.package} Stipend</span>
                </div>
              </div>

              <div className="mt-6 pt-4 border-t border-[#333] flex flex-wrap gap-2 text-ellipsis">
                {intern.eligibility && intern.eligibility.map((skill, index) => (
                  <span key={index} className="px-2 py-1 bg-[#121212] border border-[#444] text-zinc-300 rounded text-xs font-medium uppercase tracking-wider">{skill}</span>
                ))}
              </div>
              
              {user?.role === 'student' && (
                 <div className="mt-4 pt-4 border-t border-[#333] w-full mt-auto">
                    <button 
                      onClick={() => alert(`Application successfully submitted to ${intern.name}!`)}
                      className="w-full py-3 bg-gradient-to-r from-orange-600/10 to-red-600/10 hover:from-orange-500/20 hover:to-red-500/20 text-orange-500 font-bold rounded-xl border border-orange-500/20 transition-all shadow-sm cursor-pointer"
                    >
                      Apply for Internship
                    </button>
                 </div>
              )}
            </Card>
          ))}
        </div>
      )}
    </AnimatedPage>
  );
}
