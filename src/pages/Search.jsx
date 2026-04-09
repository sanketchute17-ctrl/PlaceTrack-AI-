import { useState, useEffect, useContext } from 'react';
import { useSearchParams } from 'react-router-dom';
import axios from 'axios';
import AnimatedPage from '../components/AnimatedPage';
import Card from '../components/Card';
import Skeleton from '../components/Skeleton';
import { Building2, Rocket, MapPin, Briefcase, Search as SearchIcon } from 'lucide-react';
import { AuthContext } from '../context/AuthContext';

export default function Search() {
  const [searchParams] = useSearchParams();
  const query = searchParams.get('q') || '';
  const { user } = useContext(AuthContext);
  
  const [results, setResults] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const performSearch = async () => {
      setLoading(true);
      try {
        const [companiesRes, internshipsRes] = await Promise.all([
          axios.get('http://localhost:5000/api/companies').catch(() => ({ data: [] })),
          axios.get('http://localhost:5000/api/internships').catch(() => ({ data: [] }))
        ]);

        const allData = [
          ...companiesRes.data.map(item => ({ ...item, source: 'company' })),
          ...internshipsRes.data.map(item => ({ ...item, source: 'internship' }))
        ];

        const lowercaseQuery = query.toLowerCase();
        
        const filtered = allData.filter(item => {
          const matchName = item.name?.toLowerCase().includes(lowercaseQuery);
          const matchRole = item.role?.toLowerCase().includes(lowercaseQuery);
          const matchSkills = item.eligibility?.some(skill => skill.toLowerCase().includes(lowercaseQuery));
          return matchName || matchRole || matchSkills;
        });

        setResults(filtered);
      } catch (err) {
        console.error('Search aggregation failed:', err);
      } finally {
        setLoading(false);
      }
    };

    if (query) {
      performSearch();
    } else {
      setResults([]);
      setLoading(false);
    }
  }, [query]);

  return (
    <AnimatedPage className="space-y-6 pb-12 relative">
      <div className="mb-8">
        <h2 className="text-2xl font-bold text-white tracking-tight flex items-center gap-3">
          <SearchIcon size={24} className="text-red-500" /> Search Results
        </h2>
        <p className="text-zinc-500 text-sm mt-1">Showing matches for "<span className="text-zinc-300 font-semibold">{query}</span>"</p>
      </div>

      {loading ? (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {[1, 2, 3].map(i => <Skeleton key={i} className="h-48" />)}
        </div>
      ) : results.length === 0 ? (
        <div className="text-center py-24 bg-[#1e1e1e] rounded-xl border border-[#333] shadow-xl">
          <SearchIcon size={56} className="mx-auto text-zinc-600 mb-4" />
          <h3 className="text-xl font-bold text-white mb-2">No exact matches found.</h3>
          <p className="text-zinc-500 max-w-md mx-auto">Try adjusting your keywords, searching for different skills, or exploring the raw company endpoints.</p>
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {results.map((item, idx) => (
            <Card key={item.id || idx} hover className="flex flex-col h-full bg-[#1e1e1e] border-[#333]">
              <div className="flex justify-between items-start mb-4">
                <div className={`w-12 h-12 rounded-lg flex items-center justify-center font-bold text-lg ${item.source === 'company' ? 'bg-red-500/10 border-red-500/20 text-red-400' : 'bg-orange-500/10 border-orange-500/20 text-orange-400'}`}>
                  {item.name?.substring(0, 2).toUpperCase() || 'CT'}
                </div>
                <span className={`px-2.5 py-1 text-xs font-bold rounded-md border uppercase tracking-wide list-none ${item.source === 'company' ? 'bg-red-500/10 text-red-300 border-red-500/20' : 'bg-orange-500/10 text-orange-400 border-orange-500/20'}`}>
                  {item.source === 'company' ? 'Full-Time' : 'Internship'}
                </span>
              </div>
              <h3 className="text-lg font-semibold text-white mb-1">{item.name}</h3>
              <p className="text-zinc-400 font-medium text-sm mb-4">{item.role}</p>

              <div className="space-y-2 mt-auto">
                {item.location && (
                  <div className="flex items-center gap-2 text-sm text-zinc-500">
                    <MapPin size={16} className={item.source === 'company' ? 'text-red-400/50' : 'text-orange-400/50'} />
                    <span>{item.location}</span>
                  </div>
                )}
                <div className="flex items-center gap-2 text-sm text-zinc-500">
                  <Briefcase size={16} className={item.source === 'company' ? 'text-red-400/50' : 'text-orange-400/50'} />
                  <span>{item.package} {item.source === 'company' ? 'LPA' : 'Stipend'}</span>
                </div>
              </div>

              <div className="mt-6 pt-4 border-t border-[#2d2d2d] flex flex-wrap gap-2 text-ellipsis">
                {item.eligibility && item.eligibility.slice(0, 3).map((skill, index) => (
                  <span key={index} className="px-2 py-1 bg-[#121212] border border-[#333] text-zinc-400 rounded text-xs font-medium">
                    {skill}
                  </span>
                ))}
                {item.eligibility?.length > 3 && (
                  <span className="px-2 py-1 bg-[#121212] border border-[#333] text-zinc-400 rounded text-xs font-medium">
                    +{item.eligibility.length - 3}
                  </span>
                )}
              </div>
              
              {user?.role === 'student' && (
                 <div className="mt-4 pt-4 border-t border-[#2d2d2d] w-full mt-auto">
                    <button 
                      onClick={() => alert(`Successfully submitted application to ${item.name} for the ${item.role} position!`)}
                      className={`w-full py-2.5 font-bold rounded-xl border transition-all shadow-sm cursor-pointer ${item.source === 'company' ? 'bg-gradient-to-r from-red-600/10 to-rose-600/10 hover:from-red-500/20 hover:to-rose-500/20 text-red-500 border-red-500/20' : 'bg-gradient-to-r from-orange-600/10 to-red-600/10 hover:from-orange-500/20 hover:to-red-500/20 text-orange-500 border-orange-500/20'}`}
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
