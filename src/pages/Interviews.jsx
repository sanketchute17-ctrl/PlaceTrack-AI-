import { useState, useEffect, useContext } from 'react';
import axios from 'axios';
import AnimatedPage from '../components/AnimatedPage';
import Skeleton from '../components/Skeleton';
import { Calendar, Clock, MapPin, Video, Plus, X, Users } from 'lucide-react';
import { AuthContext } from '../context/AuthContext';

export default function Interviews() {
  const { user } = useContext(AuthContext);
  const [interviews, setInterviews] = useState([]);
  const [loading, setLoading] = useState(true);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [formData, setFormData] = useState({ company: '', date: '', time: '', type: 'Virtual', link: '' });

  const fetchInterviews = async () => {
    try {
      const { data } = await axios.get('http://localhost:5000/api/interviews');
      setInterviews(Array.isArray(data) ? data : []);
    } catch {
      setInterviews([]);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => { fetchInterviews(); }, []);

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await axios.post('http://localhost:5000/api/interviews', formData);
      setIsModalOpen(false);
      fetchInterviews();
      setFormData({ company: '', date: '', time: '', type: 'Virtual', link: '' });
    } catch {
      alert('Failed to schedule. Please check server connection.');
    }
  };

  return (
    <AnimatedPage className="space-y-6 pb-12 relative">
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 mb-8">
        <div>
          <h2 className="text-2xl font-bold text-white tracking-tight flex items-center gap-3">
            <Calendar className="text-red-500" size={24} /> Scheduled Interviews
          </h2>
          <p className="text-zinc-500 text-sm mt-1">Manage and track your upcoming technical and HR screening rounds.</p>
        </div>
        {user?.role !== 'student' && (
          <button onClick={() => setIsModalOpen(true)} className="flex items-center gap-2 px-4 py-2 bg-red-600 text-white font-medium rounded-lg hover:bg-red-500 transition-colors shadow-lg cursor-pointer">
            <Plus size={16} /> Schedule Interview
          </button>
        )}
      </div>

      {isModalOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-slate-900/60 backdrop-blur-md p-4">
          <div className="absolute inset-0" onClick={() => setIsModalOpen(false)}></div>
          <div className="bg-[#1e1e1e] border border-[#333] rounded-xl shadow-2xl w-full max-w-md p-6 relative z-10">
            <div className="flex justify-between items-center mb-5">
              <h3 className="text-xl font-bold text-white">Schedule New Round</h3>
              <button onClick={() => setIsModalOpen(false)} className="text-zinc-400 hover:text-white cursor-pointer"><X size={20} /></button>
            </div>
            <form onSubmit={handleSubmit} className="space-y-4">
              <input required value={formData.company} onChange={e=>setFormData({...formData, company: e.target.value})} placeholder="Company Name" className="w-full p-2.5 bg-[#121212] border border-[#444] rounded-lg text-white" />
              <div className="grid grid-cols-2 gap-4">
                <input required type="date" value={formData.date} onChange={e=>setFormData({...formData, date: e.target.value})} className="w-full p-2.5 bg-[#121212] border border-[#444] rounded-lg text-white" />
                <input required type="time" value={formData.time} onChange={e=>setFormData({...formData, time: e.target.value})} className="w-full p-2.5 bg-[#121212] border border-[#444] rounded-lg text-white" />
              </div>
              <select value={formData.type} onChange={e=>setFormData({...formData, type: e.target.value})} className="w-full p-2.5 bg-[#121212] border border-[#444] rounded-lg text-white outline-none">
                 <option value="Virtual">Virtual (Zoom/Meet)</option>
                 <option value="On-Campus">On-Campus</option>
              </select>
              <input required value={formData.link} onChange={e=>setFormData({...formData, link: e.target.value})} placeholder={formData.type === 'Virtual' ? "Meeting Link" : "Room Number"} className="w-full p-2.5 bg-[#121212] border border-[#444] rounded-lg text-white" />
              
              <div className="flex gap-3 pt-2">
                <button type="button" onClick={()=>setIsModalOpen(false)} className="flex-1 p-2.5 border border-[#444] text-zinc-300 rounded-lg cursor-pointer hover:bg-[#121212]">Cancel</button>
                <button type="submit" className="flex-1 p-2.5 bg-red-600 text-white font-bold rounded-lg cursor-pointer hover:bg-red-500 shadow-lg shadow-red-500/20">Confirm Slot</button>
              </div>
            </form>
          </div>
        </div>
      )}

      {loading ? (
         <div className="space-y-4">{[1,2,3].map(i => <Skeleton key={i} className="h-24 w-full" />)}</div>
      ) : interviews.length === 0 ? (
        <div className="text-center py-24 bg-[#1e1e1e] rounded-xl border border-[#333] shadow-xl">
          <Calendar size={56} className="mx-auto text-zinc-600 mb-4" />
          <h3 className="text-xl font-bold text-white mb-2">No interviews scheduled yet.</h3>
          <p className="text-zinc-500">Your upcoming screening details will dynamically propagate here.</p>
        </div>
      ) : (
        <div className="space-y-4">
          {interviews.map((iv) => (
            <div key={iv.id} className="p-5 bg-[#1e1e1e] border border-[#333] hover:border-red-500/30 rounded-xl flex flex-col md:flex-row items-start md:items-center justify-between gap-6 transition-all group shadow-sm hover:shadow-lg">
               <div className="flex items-center gap-4">
                  <div className="w-14 h-14 rounded-full border border-red-500/20 bg-red-500/10 flex items-center justify-center text-red-500">
                    <Users size={24} />
                  </div>
                  <div>
                    <h4 className="text-xl font-bold text-white mb-1">{iv.company} <span className="text-xs font-semibold px-2 py-0.5 bg-[#121212] border border-[#444] rounded text-zinc-400 align-middle ml-2">ROUND 1</span></h4>
                    <div className="flex gap-4 text-sm text-zinc-500 font-medium">
                       <span className="flex items-center gap-1.5"><Calendar size={14}/> {new Date(iv.date).toLocaleDateString()}</span>
                       <span className="flex items-center gap-1.5"><Clock size={14}/> {iv.time}</span>
                    </div>
                  </div>
               </div>

               <div className="flex flex-row md:flex-col items-center md:items-end gap-4 w-full md:w-auto mt-4 md:mt-0 pt-4 md:pt-0 border-t md:border-none border-[#333]">
                  <div className="flex gap-2">
                    <span className={`px-3 py-1 flex items-center gap-1.5 text-xs font-bold rounded border ${iv.type === 'Virtual' ? 'bg-blue-500/10 text-blue-400 border-blue-500/20' : 'bg-green-500/10 text-green-400 border-green-500/20'}`}>
                      {iv.type === 'Virtual' ? <Video size={12}/> : <MapPin size={12}/>} {iv.type}
                    </span>
                  </div>
                  <a href={iv.type === 'Virtual' ? (iv.link.startsWith('http') ? iv.link : `https://${iv.link}`) : '#'} target="_blank" className="px-5 py-2 bg-zinc-800 hover:bg-red-500 text-white text-sm font-bold rounded-lg transition-colors border border-[#444] hover:border-red-500 whitespace-nowrap cursor-pointer">
                    {iv.type === 'Virtual' ? 'Join Call' : iv.link}
                  </a>
               </div>
            </div>
          ))}
        </div>
      )}
    </AnimatedPage>
  );
}
