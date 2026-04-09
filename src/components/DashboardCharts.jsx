import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, PieChart, Pie, Cell } from 'recharts';
import Card from './Card';

const placementData = [
  { name: 'Jan', count: 45 },
  { name: 'Feb', count: 52 },
  { name: 'Mar', count: 88 },
  { name: 'Apr', count: 120 },
  { name: 'May', count: 180 },
  { name: 'Jun', count: 210 },
];

const branchData = [
  { name: 'CSE', value: 450 },
  { name: 'ECE', value: 300 },
  { name: 'IT', value: 250 },
  { name: 'ME', value: 100 },
];

const COLORS = ['#2563EB', '#3B82F6', '#60A5FA', '#93C5FD'];

const CustomTooltip = ({ active, payload, label }) => {
  if (active && payload && payload.length) {
    return (
      <div className="bg-[#1e1e1e] border border-[#333] p-3 rounded-lg shadow-lg">
        <p className="text-zinc-500 text-sm font-medium mb-1">{label || payload[0].name}</p>
        <p className="text-red-400 font-bold">
          {payload[0].value} Placed
        </p>
      </div>
    );
  }
  return null;
};

export function PlacementBarChart() {
  return (
    <Card className="h-[340px] flex flex-col">
      <h3 className="text-lg font-semibold text-zinc-100 mb-6">Placement Trends</h3>
      <div className="flex-1 w-full relative">
        <ResponsiveContainer width="100%" height="100%">
          <BarChart data={placementData} margin={{ top: 10, right: 10, left: -20, bottom: 0 }}>
            <CartesianGrid strokeDasharray="3 3" stroke="#E2E8F0" vertical={false} />
            <XAxis dataKey="name" stroke="#64748B" fontSize={12} tickLine={false} axisLine={false} />
            <YAxis stroke="#64748B" fontSize={12} tickLine={false} axisLine={false} />
            <Tooltip content={<CustomTooltip />} cursor={{ fill: '#F1F5F9' }} />
            <Bar dataKey="count" fill="#2563EB" radius={[4, 4, 0, 0]} barSize={32} />
          </BarChart>
        </ResponsiveContainer>
      </div>
    </Card>
  );
}

export function BranchPieChart() {
  return (
    <Card className="h-[340px] flex flex-col">
      <h3 className="text-lg font-semibold text-zinc-100 mb-4">Placements by Branch</h3>
      <div className="flex-1 w-full relative -mt-4">
        <ResponsiveContainer width="100%" height="100%">
          <PieChart>
            <Pie
              data={branchData}
              cx="50%"
              cy="50%"
              innerRadius={65}
              outerRadius={85}
              paddingAngle={2}
              dataKey="value"
              stroke="none"
              animationBegin={200}
              animationDuration={1000}
            >
              {branchData.map((entry, index) => (
                <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
              ))}
            </Pie>
            <Tooltip content={<CustomTooltip />} />
          </PieChart>
        </ResponsiveContainer>
        <div className="absolute inset-0 flex items-center justify-center pointer-events-none mt-4">
          <div className="text-center">
            <div className="text-2xl font-bold text-zinc-100">1.1k</div>
            <div className="text-xs text-zinc-500 font-medium uppercase tracking-wide">Total</div>
          </div>
        </div>
      </div>
      <div className="flex flex-wrap justify-center gap-4 mt-2">
        {branchData.map((entry, index) => (
          <div key={entry.name} className="flex items-center gap-1.5 text-xs text-zinc-400 font-medium">
            <span className="w-3 h-3 rounded-full" style={{ backgroundColor: COLORS[index % COLORS.length] }}></span>
            {entry.name}
          </div>
        ))}
      </div>
    </Card>
  );
}

export default function DashboardCharts() {
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 gap-6 w-full h-full">
      <PlacementBarChart />
      <BranchPieChart />
    </div>
  );
}
