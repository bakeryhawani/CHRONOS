
import React, { useState, useEffect } from 'react';
import { getTemporalInsight } from '../services/geminiService';
import { TemporalInsight } from '../types';

const AITemporalInsight: React.FC<{ currentTime: Date }> = ({ currentTime }) => {
  const [insight, setInsight] = useState<TemporalInsight | null>(null);
  const [loading, setLoading] = useState(false);

  const fetchInsight = async () => {
    setLoading(true);
    const timeStr = currentTime.toLocaleTimeString([], { hour12: false });
    const dateStr = currentTime.toLocaleDateString();
    const result = await getTemporalInsight(timeStr, dateStr);
    setInsight(result);
    setLoading(false);
  };

  useEffect(() => {
    fetchInsight();
    // Refresh every hour or so
    const interval = setInterval(fetchInsight, 3600000);
    return () => clearInterval(interval);
  }, []);

  return (
    <div className="w-full max-w-4xl glass p-8 rounded-3xl border border-white/5 relative overflow-hidden group">
      <div className="absolute top-0 right-0 p-4">
        <div className={`w-3 h-3 rounded-full ${loading ? 'bg-yellow-500 animate-pulse' : 'bg-green-500'}`} />
      </div>
      
      <div className="flex flex-col md:flex-row items-start md:items-center gap-6">
        <div className="p-4 bg-indigo-500/10 rounded-2xl border border-indigo-500/20">
          <svg className="w-10 h-10 text-indigo-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 10V3L4 14h7v7l9-11h-7z" />
          </svg>
        </div>
        
        <div className="flex-1">
          <div className="flex items-center gap-2 mb-2">
            <span className="text-xs font-black uppercase tracking-widest text-indigo-500">AI Temporal Insight</span>
            <span className="px-2 py-0.5 rounded-full bg-slate-800 text-[10px] text-slate-400 border border-slate-700">
              {insight?.category || 'Momentum'}
            </span>
          </div>
          
          {loading ? (
            <div className="space-y-2">
              <div className="h-4 w-full bg-slate-800 animate-pulse rounded" />
              <div className="h-4 w-3/4 bg-slate-800 animate-pulse rounded" />
            </div>
          ) : (
            <>
              <p className="text-xl text-slate-100 font-medium leading-relaxed">
                "{insight?.fact}"
              </p>
              <p className="mt-4 text-sm text-slate-500 italic">
                {insight?.relevance}
              </p>
            </>
          )}
        </div>

        <button 
          onClick={fetchInsight}
          disabled={loading}
          className="p-3 bg-slate-800 hover:bg-slate-700 text-slate-300 rounded-xl transition-colors disabled:opacity-50"
          title="Refresh Insight"
        >
          <svg className={`w-5 h-5 ${loading ? 'animate-spin' : ''}`} fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 4v5h.582m15.356 2A8.001 8.001 0 004.582 9m0 0H9m11 11v-5h-.581m0 0a8.003 8.003 0 01-15.357-2m15.357 2H15" />
          </svg>
        </button>
      </div>

      {/* Background Decor */}
      <div className="absolute -bottom-12 -right-12 w-48 h-48 bg-indigo-500/5 rounded-full blur-3xl group-hover:bg-indigo-500/10 transition-all" />
    </div>
  );
};

export default AITemporalInsight;
