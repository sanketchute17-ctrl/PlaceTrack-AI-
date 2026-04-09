import Card from './Card';

const activities = [
  { id: 1, student: 'Alex Sharma', company: 'Google', role: 'SDE', package: '42 LPA', time: '2 mins ago', initial: 'A' },
  { id: 2, student: 'Priya Patel', company: 'Microsoft', role: 'SWE', package: '45 LPA', time: '1 hr ago', initial: 'P' },
  { id: 3, student: 'Rahul Kumar', company: 'Amazon', role: 'SDE-1', package: '34 LPA', time: '3 hrs ago', initial: 'R' },
  { id: 4, student: 'Sneha Gupta', company: 'Atlassian', role: 'Frontend', package: '52 LPA', time: '5 hrs ago', initial: 'S' },
  { id: 5, student: 'Vikram Singh', company: 'Goldman Sachs', role: 'Analyst', package: '24 LPA', time: '1 day ago', initial: 'V' },
  { id: 6, student: 'Anjali Desai', company: 'Adobe', role: 'MTS-1', package: '40 LPA', time: '1 day ago', initial: 'A' },
  { id: 7, student: 'Rohan Das', company: 'Morgan Stanley', role: 'SDE', package: '30 LPA', time: '2 days ago', initial: 'R' },
];

export default function ActivityFeed() {
  return (
    <Card className="h-full flex flex-col flex-1 min-h-[500px]">
      <div className="flex items-center justify-between mb-5 px-1">
        <h3 className="text-lg font-semibold text-zinc-100">Recent Placements</h3>
        <button className="text-sm text-red-400 hover:text-red-300 font-medium transition-colors">View All</button>
      </div>
      
      <div className="flex-1 overflow-y-auto pr-2 space-y-1 custom-scrollbar -mr-2">
        {activities.map((item) => (
          <div 
            key={item.id}
            className="flex items-start gap-4 p-3 rounded-xl hover:bg-[#121212] transition-colors border border-transparent hover:border-[#2d2d2d] group"
          >
            <div className="w-10 h-10 rounded-full bg-red-500/10 text-red-400 flex items-center justify-center font-bold text-sm border border-red-500/20 group-hover:bg-red-500/20 transition-colors flex-shrink-0">
              {item.initial}
            </div>
            
            <div className="flex-1 min-w-0">
              <p className="text-sm font-semibold text-zinc-100 truncate group-hover:text-red-400 transition-colors">
                {item.student}
              </p>
              <p className="text-xs text-zinc-500 mt-0.5">
                placed at <span className="text-zinc-300 font-semibold">{item.company}</span>
              </p>
              <div className="flex items-center gap-2 mt-2 flex-wrap">
                <span className="text-[10px] font-medium bg-slate-100 text-zinc-400 px-2 py-0.5 rounded border border-[#333]">
                  {item.role}
                </span>
                <span className="text-[10px] font-medium bg-green-50 text-green-700 px-2 py-0.5 rounded border border-green-200">
                  {item.package}
                </span>
              </div>
            </div>
            
            <div className="text-[10px] text-slate-400 font-medium whitespace-nowrap pt-1">
              {item.time}
            </div>
          </div>
        ))}
      </div>
    </Card>
  );
}
