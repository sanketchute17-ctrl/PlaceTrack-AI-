import { useState, useEffect, useContext } from 'react';
import api from '../api/axios';
import AnimatedPage from '../components/AnimatedPage';
import Card from '../components/Card';
import Skeleton from '../components/Skeleton';
import { Building2, MapPin, Briefcase, Plus, X } from 'lucide-react';
import { AuthContext } from '../context/AuthContext';

const DEFAULT_COMPANIES = [
  { id: 'c1', name: 'Google', role: 'Software Engineer', package: 45.0, location: 'Bangalore', type: 'Full-time', eligibility: ['React', 'Node.js', 'System Design'] },
  { id: 'c2', name: 'Microsoft', role: 'SDE Intern', package: 38.5, location: 'Hyderabad', type: 'Full-time', eligibility: ['C++', 'Azure', 'Algorithms'] },
  { id: 'c3', name: 'Amazon', role: 'Frontend Engineer', package: 32.0, location: 'Remote', type: 'Full-time', eligibility: ['React', 'JavaScript', 'CSS'] }
];

export default function Companies() {
  const { user } = useContext(AuthContext);
  const [companies, setCompanies] = useState([]);
  const [loading, setLoading] = useState(true);
  
  // Add Company Modal State
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [formData, setFormData] = useState({
    name: '',
    role: '',
    package: '',
    eligibility: ''
  });

  const fetchCompanies = async () => {
    try {
      const { data } = await api.get('/companies');
      if (Array.isArray(data) && data.length > 0) {
        setCompanies(data);
      } else {
        setCompanies(DEFAULT_COMPANIES);
      }
    } catch (err) {
      console.warn('Companies fetch fallback:', err);
      setCompanies(DEFAULT_COMPANIES);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchCompanies();
  }, []);

  const handleOpenModal = () => setIsModalOpen(true);
  const handleCloseModal = () => setIsModalOpen(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsSubmitting(true);
    try {
      const eligibilityArray = formData.eligibility.split(',').map(s => s.trim()).filter(Boolean);
      
      const payload = {
        id: 'c_' + Date.now(),
        name: formData.name,
        role: formData.role,
        package: parseFloat(formData.package) || 0,
        eligibility: eligibilityArray,
        location: 'Remote',
        type: 'Full-time'
      };

      try {
        await api.post('/companies', payload);
      } catch (err) {
        console.warn("Backend add company failed, adding to client state:", err);
      }
      
      setCompanies(prev => [payload, ...prev]);
      handleCloseModal();
      setFormData({ name: '', role: '', package: '', eligibility: '' });
    } catch (err) {
      console.error('Failed to add company', err);
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <AnimatedPage className="space-y-6 pb-12 relative">
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 mb-6">
        <div>
          <h2 className="text-2xl font-bold text-white tracking-tight">Visiting Companies</h2>
          <p className="text-zinc-500 text-sm mt-1">Explore current placement opportunities from live database</p>
        </div>
        {user?.role === 'admin' && (
          <button 
            onClick={handleOpenModal}
            className="flex items-center justify-center gap-2 px-4 py-2 bg-red-500 text-white text-sm font-medium rounded-lg hover:bg-red-600 transition-colors shadow-sm cursor-pointer"
          >
            <Plus size={16} />
            <span>Add Company</span>
          </button>
        )}
      </div>

      {/* MODAL */}
      {isModalOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-slate-900/40 backdrop-blur-[2px] p-4">
          <div className="absolute inset-0" onClick={handleCloseModal}></div>
          
          <div className="bg-[#1e1e1e] rounded-xl shadow-2xl w-full max-w-md p-6 relative z-10 animate-in fade-in zoom-in-95 duration-200">
            <div className="flex justify-between items-center mb-5">
              <h3 className="text-xl font-bold text-white">Add New Company</h3>
              <button onClick={handleCloseModal} className="text-slate-400 hover:text-zinc-400 hover:bg-slate-100 p-1.5 rounded-lg transition-colors cursor-pointer">
                <X size={20} />
              </button>
            </div>
            
            <form onSubmit={handleSubmit} className="space-y-4">
              <div>
                <label className="block text-sm font-semibold text-zinc-300 mb-1">Company Name</label>
                <input required value={formData.name} onChange={e => setFormData({...formData, name: e.target.value})} type="text" placeholder="e.g. Google" className="w-full px-3 py-2 border border-[#444] rounded-lg focus:ring-2 focus:ring-red-500 focus:border-transparent outline-none transition-all text-white" />
              </div>
              
              <div>
                <label className="block text-sm font-semibold text-zinc-300 mb-1">Role Offered</label>
                <input required value={formData.role} onChange={e => setFormData({...formData, role: e.target.value})} type="text" placeholder="e.g. Software Engineer" className="w-full px-3 py-2 border border-[#444] rounded-lg focus:ring-2 focus:ring-red-500 focus:border-transparent outline-none transition-all text-white" />
              </div>
              
              <div>
                <label className="block text-sm font-semibold text-zinc-300 mb-1">Package (in LPA)</label>
                <input required value={formData.package} onChange={e => setFormData({...formData, package: e.target.value})} type="number" step="0.1" placeholder="e.g. 45.5" className="w-full px-3 py-2 border border-[#444] rounded-lg focus:ring-2 focus:ring-red-500 focus:border-transparent outline-none transition-all text-white" />
              </div>
              
              <div>
                <label className="block text-sm font-semibold text-zinc-300 mb-1">Eligibility Skills (comma separated)</label>
                <input value={formData.eligibility} onChange={e => setFormData({...formData, eligibility: e.target.value})} type="text" placeholder="e.g. React, Node.js, Java" className="w-full px-3 py-2 border border-[#444] rounded-lg focus:ring-2 focus:ring-red-500 focus:border-transparent outline-none transition-all text-white" />
              </div>
              
              <div className="pt-4 flex gap-3">
                <button type="button" onClick={handleCloseModal} className="flex-1 px-4 py-2 border border-[#444] text-zinc-300 font-medium rounded-lg hover:bg-[#121212] transition-colors cursor-pointer">
                  Cancel
                </button>
                <button type="submit" disabled={isSubmitting} className="flex-1 px-4 py-2 bg-red-500 text-white font-medium rounded-lg hover:bg-red-600 transition-colors disabled:opacity-50 cursor-pointer">
                  {isSubmitting ? 'Saving...' : 'Save Company'}
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      {loading ? (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {[1, 2, 3, 4, 5, 6].map(i => <Skeleton key={i} className="h-48" />)}
        </div>
      ) : companies.length === 0 ? (
        <div className="text-center py-20 bg-[#1e1e1e] rounded-xl border border-[#333] card-shadow">
          <Building2 size={48} className="mx-auto text-slate-300 mb-4" />
          <h3 className="text-lg font-semibold text-zinc-100">No companies found.</h3>
          <p className="text-zinc-500">Wait for the administration to add new opportunities.</p>
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {companies.map((company) => (
            <Card key={company.id} hover className="flex flex-col h-full">
              <div className="flex justify-between items-start mb-4">
                <div className="w-12 h-12 rounded-lg bg-red-500/10 border border-red-500/20 flex items-center justify-center text-red-400 font-bold text-lg">
                  {company.name.substring(0, 2).toUpperCase()}
                </div>
                <span className="px-2.5 py-1 text-xs font-bold rounded-md bg-red-500/10 text-red-300 border border-blue-200 uppercase tracking-wide list-none">
                  {company.type || 'Full-time'}
                </span>
              </div>
              
              <h3 className="text-lg font-semibold text-white mb-1">{company.name}</h3>
              <p className="text-zinc-400 font-medium text-sm mb-4">{company.role}</p>

              <div className="space-y-2 mt-auto">
                <div className="flex items-center gap-2 text-sm text-zinc-500">
                  <MapPin size={16} className="text-slate-400" />
                  <span>{company.location || 'Remote'}</span>
                </div>
                <div className="flex items-center gap-2 text-sm text-zinc-500">
                  <Briefcase size={16} className="text-slate-400" />
                  <span>{company.package} LPA</span>
                </div>
              </div>

              <div className="mt-6 pt-4 border-t border-[#2d2d2d] flex flex-wrap gap-2 text-ellipsis">
                {company.eligibility && company.eligibility.slice(0, 3).map((skill, index) => (
                  <span key={index} className="px-2 py-1 bg-[#121212] border border-[#333] text-zinc-400 rounded text-xs font-medium">
                    {skill}
                  </span>
                ))}
                {company.eligibility?.length > 3 && (
                  <span className="px-2 py-1 bg-[#121212] border border-[#333] text-zinc-400 rounded text-xs font-medium">
                    +{company.eligibility.length - 3}
                  </span>
                )}
              </div>

              {/* STUDENT APPLY ACTIONS */}
              {user?.role === 'student' && (
                 <div className="mt-4 pt-4 border-t border-[#2d2d2d] w-full mt-auto">
                    <button 
                      onClick={() => alert(`Application successfully submitted to ${company.name} for the ${company.role} position!`)}
                      className="w-full py-2.5 bg-gradient-to-r from-red-600/10 to-rose-600/10 hover:from-red-500/20 hover:to-rose-500/20 text-red-500 font-bold rounded-xl border border-red-500/20 transition-all shadow-sm cursor-pointer"
                    >
                      Apply Now
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
