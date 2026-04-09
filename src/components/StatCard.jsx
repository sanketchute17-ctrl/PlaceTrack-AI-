import { useEffect, useState } from 'react';
import Card from './Card';
import Skeleton from './Skeleton';

export default function StatCard({ title, value, icon: Icon, delay, prefix = '', suffix = '', trend, isLoading = false }) {
  const [currentValue, setCurrentValue] = useState(0);
  
  useEffect(() => {
    if (isLoading) return;
    
    let start = 0;
    const end = typeof value === 'string' ? parseFloat(value.replace(/,/g, '')) : value;
    if (isNaN(end)) return;
    
    const duration = 1000;
    const incrementTime = 30;
    const steps = duration / incrementTime;
    const increment = end / steps;
    
    const timer = setInterval(() => {
      start += increment;
      if (start >= end) {
        clearInterval(timer);
        setCurrentValue(end);
      } else {
        setCurrentValue(Number.isInteger(end) ? Math.ceil(start) : Number(start.toFixed(1)));
      }
    }, incrementTime);
    
    return () => clearInterval(timer);
  }, [value, isLoading]);

  if (isLoading) {
    return (
      <Card delay={0.1} className="h-[140px] flex flex-col justify-between">
        <div className="flex justify-between items-start mb-2">
          <Skeleton className="w-11 h-11 rounded-lg" />
          {trend && <Skeleton className="w-12 h-6 rounded-md" />}
        </div>
        <div>
          <Skeleton className="w-20 h-4 mb-2" />
          <Skeleton className="w-24 h-8" />
        </div>
      </Card>
    );
  }

  const displayValue = isNaN(parseFloat(value)) 
    ? value 
    : (Number.isInteger(currentValue) ? currentValue.toLocaleString() : currentValue);

  return (
    <Card delay={delay} hover={false} className="h-[140px] flex flex-col justify-between">
      <div className="flex justify-between items-start mb-2">
        <div className="p-2.5 bg-red-500/10 rounded-lg text-red-400 ring-1 ring-blue-100">
          <Icon size={20} className="stroke-[2.5]" />
        </div>
        {trend && (
          <span className={`text-xs font-semibold px-2 py-1 rounded-md ${trend > 0 ? 'bg-green-50 text-green-700 ring-1 ring-green-200' : 'bg-red-50 text-red-700 ring-1 ring-red-200'}`}>
            {trend > 0 ? '+' : ''}{trend}%
          </span>
        )}
      </div>
      
      <div>
        <h3 className="text-zinc-500 text-sm font-medium mb-1">{title}</h3>
        <div className="flex items-baseline gap-1">
          {prefix && <span className="text-lg font-semibold text-zinc-300">{prefix}</span>}
          <div className="text-3xl font-bold text-zinc-100 tracking-tight">
            {displayValue}
          </div>
          {suffix && <span className="text-lg font-semibold text-zinc-400">{suffix}</span>}
        </div>
      </div>
    </Card>
  );
}
