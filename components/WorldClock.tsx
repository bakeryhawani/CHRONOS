
import React from 'react';
import { POPULAR_TIMEZONES } from '../constants';

const WorldClock: React.FC<{ currentTime: Date }> = ({ currentTime }) => {
  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 w-full max-w-6xl">
      {POPULAR_TIMEZONES.map((tz) => {
        const zoneTime = new Date(currentTime.toLocaleString('en-US', { timeZone: tz.id }));
        const timeStr = zoneTime.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit', hour12: true });
        
        return (
          <div key={tz.id} className="glass p-6 rounded-2xl flex flex-col items-center justify-between group hover:border-indigo-500/50 transition-all duration-300">
            <span className="text-slate-400 text-sm font-semibold uppercase tracking-wider">{tz.name}</span>
            <span className="text-3xl font-bold font-mono text-white mt-2">{timeStr}</span>
            <span className="text-xs text-slate-500 mt-2">
              {zoneTime.toLocaleDateString([], { month: 'short', day: 'numeric' })}
            </span>
          </div>
        );
      })}
    </div>
  );
};

export default WorldClock;
