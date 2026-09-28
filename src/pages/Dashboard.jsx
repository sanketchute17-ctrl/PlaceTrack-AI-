import { useState, useEffect } from 'react';
import api from '../api/axios';
import AnimatedPage from '../components/AnimatedPage';
import StatCard from '../components/StatCard';
import DashboardCharts from '../components/DashboardCharts';
import ActivityFeed from '../components/ActivityFeed';
import Skeleton from '../components/Skeleton';
import { Users, TrendingUp, Building2, Award } from 'lucide-react';

export default function Dashboard() {
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const [stats, setStats] = useState({
    totalStudents: 0,
    placedPercent: 0,
    companiesVisited: 0,
    topPackage: '0 LPA',
    recentPlacements: []
  });

  useEffect(() => {
    const fetchDashboardData = async () => {
      try {
        const [studentsRes, companiesRes, placementsRes] = await Promise.all([
          api.get('/students').catch(() => null),
          api.get('/companies').catch(() => null),
          api.get('/placements').catch(() => null),
        ]);

        if (!studentsRes || !companiesRes || !placementsRes) {
           setError('Backend connection failed. Rendering fallback placeholder data.');
           setStats({
              totalStudents: 1540,
              placedPercent: 82,
              companiesVisited: 45,
              topPackage: '45 LPA',
              recentPlacements: []
           });
           return;
        }

        setError(''); // Successfully connected

        const students = Array.isArray(studentsRes.data) ? studentsRes.data : [];
        const companies = Array.isArray(companiesRes.data) ? companiesRes.data : [];
        const placements = Array.isArray(placementsRes.data) ? placementsRes.data : [];

        const totalStudents = students.length;
        const placedStudents = students.filter(s => s?.placementStatus === 'Selected').length;
        const placedPercent = totalStudents === 0 ? 0 : Math.round((placedStudents / totalStudents) * 100);
        
        let topPackage = 0;
        placements.forEach(p => {
          if (p && typeof p.package === 'string') {
            const num = parseFloat(p.package.replace(/[^0-9.]/g, ''));
            if (!isNaN(num) && num > topPackage) topPackage = num;
          }
        });

        setStats({
          totalStudents,
          placedPercent,
          companiesVisited: companies.length,
          topPackage: topPackage ? `${topPackage} LPA` : '0 LPA',
          recentPlacements: placements.slice(-5).reverse()
        });
      } catch (err) {
        console.error('Data fetch error:', err);
        setError('Critical error establishing backend hooks. UI rendering fallback.');
        setStats({ totalStudents: 0, placedPercent: 0, companiesVisited: 0, topPackage: '0 LPA', recentPlacements: [] });
      } finally {
        setLoading(false);
      }
    };

    fetchDashboardData();
  }, []);

  return (
    <AnimatedPage className="space-y-6 pb-12">
      <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4 mb-2">
        <div>
          <h2 className="text-2xl font-bold text-white tracking-tight">Dashboard Loaded</h2>
          <p className="text-zinc-500 text-sm mt-1.5">Here's what's happening with placements today.</p>
        </div>
        <div className="flex items-center gap-3">
          {error && <span className="text-xs text-red-500 font-medium px-2">{error}</span>}
          <button className="px-4 py-2 bg-red-500 text-white text-sm font-medium rounded-lg hover:bg-red-600 transition-colors shadow-sm cursor-pointer" onClick={() => window.location.reload()}>
            Refresh Data
          </button>
        </div>
      </div>

      {loading ? (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {[1, 2, 3, 4].map(i => <Skeleton key={i} className="h-32" />)}
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          <StatCard title="Total Students" value={stats.totalStudents} icon={Users} trend={0} delay={0.1} />
          <StatCard title="Placed %" value={`${stats.placedPercent}%`} icon={TrendingUp} trend={0} delay={0.2} />
          <StatCard title="Companies Visited" value={stats.companiesVisited} icon={Building2} trend={0} delay={0.3} />
          <StatCard title="Highest Package" value={stats.topPackage} icon={Award} trend={0} delay={0.4} />
        </div>
      )}

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        <div className="lg:col-span-2">
          <DashboardCharts />
        </div>
        <div>
          <ActivityFeed />
        </div>
      </div>
    </AnimatedPage>
  );
}
