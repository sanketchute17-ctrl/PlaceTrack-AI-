import { useState, useEffect, useContext } from 'react';
import api from '../api/axios';
import AnimatedPage from '../components/AnimatedPage';
import Card from '../components/Card';
import Skeleton from '../components/Skeleton';
import { Users, Search, Plus, X } from 'lucide-react';
import { AuthContext } from '../context/AuthContext';

export default function Students() {
  const { user } = useContext(AuthContext);
  const [students, setStudents] = useState([]);
  const [loading, setLoading] = useState(true);
  const [search, setSearch] = useState('');
  
  // Modal State
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    branch: 'CSE',
    skills: '',
    placementStatus: 'Unplaced',
    resumeScore: 0
  });

  const fetchStudents = async () => {
    try {
      const { data } = await api.get('/students');
      setStudents(Array.isArray(data) ? data : []);
    } catch (err) {
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => { fetchStudents() }, []);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsSubmitting(true);
    try {
      const payload = {
        ...formData,
        skills: formData.skills.split(',').map(s => s.trim()).filter(Boolean),
        resumeScore: parseInt(formData.resumeScore) || 0
      };
      await api.post('/students', payload);
      fetchStudents();
      setIsModalOpen(false);
      setFormData({ name: '', email: '', branch: 'CSE', skills: '', placementStatus: 'Unplaced', resumeScore: 0 });
    } catch (err) {
      alert('Failed to add student');
    } finally {
      setIsSubmitting(false);
    }
  };

  const filteredStudents = students.filter(s => 
    s.name?.toLowerCase().includes(search.toLowerCase()) || 
    s.branch?.toLowerCase().includes(search.toLowerCase())
  );

  return (
    <AnimatedPage className="space-y-6 pb-12 relative">
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 mb-6">
        <div>
          <h2 className="text-2xl font-bold text-white tracking-tight">Student Directory</h2>
          <p className="text-zinc-500 text-sm mt-1">Manage and view placement statuses of all enrolled students.</p>
        </div>
        
        <div className="flex w-full sm:w-auto items-center gap-3">
          <div className="relative flex-1 sm:w-64">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400" size={18} />
            <input 
              type="text" 
              placeholder="Search students..." 
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              className="w-full pl-10 pr-4 py-2 border border-[#333] rounded-lg bg-[#1e1e1e] focus:ring-2 focus:ring-red-500 outline-none text-sm"
            />
          </div>
          
          {user?.role === 'admin' && (
            <button 
              onClick={() => setIsModalOpen(true)}
              className="flex items-center justify-center gap-2 px-4 py-2 bg-red-500 text-white text-sm font-medium rounded-lg hover:bg-red-600 transition-colors shadow-sm shrink-0 cursor-pointer"
            >
              <Plus size={16} />
              <span className="hidden sm:inline">Add Student</span>
            </button>
          )}
        </div>
      </div>

      {/* ADD STUDENT MODAL */}
      {isModalOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-slate-900/40 backdrop-blur-[2px] p-4">
          <div className="absolute inset-0" onClick={() => setIsModalOpen(false)}></div>
          <div className="bg-[#1e1e1e] rounded-xl shadow-2xl w-full max-w-md p-6 relative z-10 animate-in fade-in zoom-in-95 duration-200">
            <div className="flex justify-between items-center mb-5">
              <h3 className="text-xl font-bold text-white">Register New Student</h3>
              <button onClick={() => setIsModalOpen(false)} className="text-slate-400 hover:text-zinc-400 hover:bg-slate-100 p-1.5 rounded-lg transition-colors cursor-pointer">
                <X size={20} />
              </button>
            </div>
            
            <form onSubmit={handleSubmit} className="space-y-4">
              <div>
                <label className="block text-sm font-semibold text-zinc-300 mb-1">Full Name</label>
                <input required value={formData.name} onChange={e => setFormData({...formData, name: e.target.value})} type="text" placeholder="e.g. Rahul Kumar" className="w-full px-3 py-2 border border-[#444] rounded-lg outline-none focus:ring-2 focus:ring-red-500" />
              </div>
              
              <div>
                <label className="block text-sm font-semibold text-zinc-300 mb-1">Email Address</label>
                <input required value={formData.email} onChange={e => setFormData({...formData, email: e.target.value})} type="email" placeholder="student@college.edu" className="w-full px-3 py-2 border border-[#444] rounded-lg outline-none focus:ring-2 focus:ring-red-500" />
              </div>
              
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-semibold text-zinc-300 mb-1">Branch</label>
                  <select value={formData.branch} onChange={e => setFormData({...formData, branch: e.target.value})} className="w-full px-3 py-2 border border-[#444] rounded-lg outline-none focus:ring-2 focus:ring-red-500 bg-[#1e1e1e] cursor-pointer">
                    <option>CSE</option>
                    <option>ECE</option>
                    <option>IT</option>
                    <option>ME</option>
                  </select>
                </div>
                <div>
                  <label className="block text-sm font-semibold text-zinc-300 mb-1">Current Status</label>
                  <select value={formData.placementStatus} onChange={e => setFormData({...formData, placementStatus: e.target.value})} className="w-full px-3 py-2 border border-[#444] rounded-lg outline-none focus:ring-2 focus:ring-red-500 bg-[#1e1e1e] cursor-pointer">
                    <option>Unplaced</option>
                    <option>Shortlisted</option>
                    <option>Selected</option>
                  </select>
                </div>
              </div>
              
              <div>
                <label className="block text-sm font-semibold text-zinc-300 mb-1">Resume Score (Out of 100)</label>
                <input required value={formData.resumeScore} onChange={e => setFormData({...formData, resumeScore: e.target.value})} type="number" min="0" max="100" placeholder="e.g. 85" className="w-full px-3 py-2 border border-[#444] rounded-lg outline-none focus:ring-2 focus:ring-red-500" />
              </div>
              
              <div>
                <label className="block text-sm font-semibold text-zinc-300 mb-1">Skills (comma separated)</label>
                <input value={formData.skills} onChange={e => setFormData({...formData, skills: e.target.value})} type="text" placeholder="e.g. Java, DBMS, React" className="w-full px-3 py-2 border border-[#444] rounded-lg outline-none focus:ring-2 focus:ring-red-500" />
              </div>
              
              <div className="pt-4 flex gap-3">
                <button type="button" onClick={() => setIsModalOpen(false)} className="flex-1 px-4 py-2 border border-[#444] text-zinc-300 font-medium rounded-lg hover:bg-[#121212] transition-colors cursor-pointer">Cancel</button>
                <button type="submit" disabled={isSubmitting} className="flex-1 px-4 py-2 bg-red-500 text-white font-medium rounded-lg hover:bg-red-600 transition-colors cursor-pointer">{isSubmitting ? 'Saving...' : 'Add Student'}</button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* STUDENT LIST */}
      {loading ? (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {[1, 2, 3, 4, 5, 6].map(i => <Skeleton key={i} className="h-32" />)}
        </div>
      ) : filteredStudents.length === 0 ? (
        <div className="text-center py-20 bg-[#1e1e1e] rounded-xl border border-[#333] card-shadow">
          <Users size={48} className="mx-auto text-slate-300 mb-4" />
          <h3 className="text-lg font-semibold text-zinc-100">No students found</h3>
          <p className="text-zinc-500 text-sm mt-1">Try adjusting your search criteria.</p>
        </div>
      ) : (
        <div className="bg-[#1e1e1e] rounded-xl border border-[#333] card-shadow overflow-hidden">
          <div className="overflow-x-auto">
            <table className="w-full text-left border-collapse">
              <thead>
                <tr className="bg-[#121212] border-b border-[#333] text-zinc-400 text-sm uppercase tracking-wider">
                  <th className="px-6 py-4 font-semibold text-zinc-300">Student Name</th>
                  <th className="px-6 py-4 font-semibold text-zinc-300">Branch</th>
                  <th className="px-6 py-4 font-semibold text-zinc-300 hidden md:table-cell">Resume Score</th>
                  <th className="px-6 py-4 font-semibold text-zinc-300">Status</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-100">
                {filteredStudents.map((st) => (
                  <tr key={st.id} className="hover:bg-[#121212] transition-colors">
                    <td className="px-6 py-4 whitespace-nowrap">
                      <div className="flex items-center gap-3">
                        <div className="w-10 h-10 rounded-full bg-red-500/20 text-red-400 flex items-center justify-center font-bold">
                          {st.name?.charAt(0).toUpperCase()}
                        </div>
                        <div>
                          <div className="font-semibold text-white">{st.name}</div>
                          <div className="text-xs text-zinc-500">{st.email}</div>
                        </div>
                      </div>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <span className="font-medium text-zinc-300">{st.branch}</span>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap hidden md:table-cell">
                      <div className="flex items-center gap-2">
                        <div className="w-full bg-slate-200 rounded-full h-1.5">
                          <div className="bg-red-500 h-1.5 rounded-full" style={{ width: `${st.resumeScore || 0}%` }}></div>
                        </div>
                        <span className="text-xs font-semibold text-zinc-400">{st.resumeScore || 0}%</span>
                      </div>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <span className={`px-3 py-1 rounded-full text-xs font-bold ${
                        st.placementStatus === 'Selected' ? 'bg-green-100 text-green-700' :
                        st.placementStatus === 'Shortlisted' ? 'bg-yellow-100 text-yellow-700' :
                        'bg-slate-100 text-zinc-400'
                      }`}>
                        {st.placementStatus || 'Unplaced'}
                      </span>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      )}
    </AnimatedPage>
  );
}
