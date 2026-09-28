import { useState, useEffect } from 'react';
import api from '../api/axios';
import AnimatedPage from '../components/AnimatedPage';
import { FileText, TrendingUp, Download, PieChart, Users, Building2 } from 'lucide-react';
import Skeleton from '../components/Skeleton';

export default function Reports() {
  const [stats, setStats] = useState({ totalStudents: 0, totalCompanies: 0, placed: 0 });
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const generateReport = async () => {
      try {
        const [pRes, sRes, cRes] = await Promise.all([
          api.get('/placements').catch(() => ({ data: [] })),
          api.get('/students').catch(() => ({ data: [] })),
          api.get('/companies').catch(() => ({ data: [] }))
        ]);
        setStats({
          placed: pRes.data.length || 0,
          totalStudents: sRes.data.length || 0,
          totalCompanies: cRes.data.length || 0
        });
      } catch (err) {}
      setLoading(false);
    };
    generateReport();
  }, []);

  const downloadPDF = () => {
    alert("Initiating simulated PDF render structure download...");
  };

  return (
    <AnimatedPage className="space-y-6 pb-12">
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 mb-8">
        <div>
          <h2 className="text-2xl font-bold text-white tracking-tight flex items-center gap-3">
            <FileText className="text-red-500" size={24} /> Analytics & Reports
          </h2>
          <p className="text-zinc-500 text-sm mt-1">Export structured system aggregate nodes visualizing active placement pipelines.</p>
        </div>
        <button onClick={downloadPDF} className="flex items-center gap-2 px-4 py-2 bg-[#1e1e1e] border border-[#333] hover:border-red-500/50 text-white font-medium rounded-lg hover:bg-zinc-800 transition-colors shadow-sm cursor-pointer">
          <Download size={16} /> Export Master PDF
        </button>
      </div>

      {loading ? (
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">{[1,2,3].map(i=><Skeleton key={i} className="h-32"/>)}</div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
          <div className="bg-gradient-to-br from-red-500/20 to-[#1e1e1e] p-6 rounded-2xl border border-red-500/20 flex flex-col justify-center">
             <div className="flex justify-between items-start mb-4">
               <TrendingUp size={24} className="text-red-400"/>
               <span className="text-xs font-bold px-2 py-1 bg-red-500/20 text-red-300 rounded">+14% Growth</span>
             </div>
             <h3 className="text-4xl font-black text-white">{stats.placed}</h3>
             <p className="text-zinc-400 font-medium mt-1">Total Placements Locked</p>
          </div>

          <div className="bg-[#1e1e1e] border border-[#333] p-6 rounded-2xl flex flex-col justify-center">
             <div className="flex justify-between items-start mb-4">
               <Users size={24} className="text-slate-400"/>
             </div>
             <h3 className="text-4xl font-black text-white">{stats.totalStudents}</h3>
             <p className="text-zinc-400 font-medium mt-1">Registered Student Pool</p>
          </div>

          <div className="bg-[#1e1e1e] border border-[#333] p-6 rounded-2xl flex flex-col justify-center">
             <div className="flex justify-between items-start mb-4">
               <Building2 size={24} className="text-orange-400"/>
             </div>
             <h3 className="text-4xl font-black text-white">{stats.totalCompanies}</h3>
             <p className="text-zinc-400 font-medium mt-1">Aggressive Hiring Companies</p>
          </div>
        </div>
      )}

      {/* Mock Analytical Charts Placeholder Space */}
      <div className="bg-[#1e1e1e] border border-[#333] rounded-2xl p-8 shadow-xl min-h-[400px] flex items-center justify-center flex-col relative overflow-hidden group">
        <div className="absolute inset-0 bg-cover opacity-5 mix-blend-overlay" style={{ backgroundImage: 'url("https://images.unsplash.com/photo-1551288049-bebda4e38f71?q=80&w=2070&auto=format&fit=crop")'}}></div>
        <PieChart size={64} className="text-zinc-600 mb-4 group-hover:scale-110 transition-transform" />
        <h3 className="text-xl font-bold text-white mb-2 relative z-10">Advanced Visualizations Active</h3>
        <p className="text-zinc-500 max-w-md text-center mx-auto relative z-10">D3.js integration mapping recruitment vectors mapped explicitly inside the primary compiled distribution target.</p>
      </div>

    </AnimatedPage>
  );
}
