
import React, { useState, useEffect } from 'react';
import ClockDisplay from './components/ClockDisplay';
import WorldClock from './components/WorldClock';
import TimeTools from './components/TimeTools';
import AITemporalInsight from './components/AITemporalInsight';
import { TabType } from './types';

const App: React.FC = () => {
  const [currentTime, setCurrentTime] = useState(new Date());
  const [activeTab, setActiveTab] = useState<TabType>(TabType.CLOCK);

  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentTime(new Date());
    }, 1000);
    return () => clearInterval(timer);
  }, []);

  const getGreeting = () => {
    const hour = currentTime.getHours();
    if (hour < 12) return "Good Morning";
    if (hour < 18) return "Good Afternoon";
    return "Good Evening";
  };

  return (
    <div className="min-h-screen relative flex flex-col items-center pb-32">
      {/* Background Ambience */}
      <div className="fixed inset-0 pointer-events-none z-0">
        <div className="absolute top-0 -left-48 w-96 h-96 bg-indigo-600/10 rounded-full blur-[120px] animate-pulse-slow" />
        <div className="absolute bottom-0 -right-48 w-96 h-96 bg-blue-600/10 rounded-full blur-[120px] animate-pulse-slow" style={{ animationDelay: '2s' }} />
      </div>

      {/* Header */}
      <header className="w-full max-w-7xl px-6 py-12 flex flex-col md:flex-row items-center justify-between z-10 gap-6">
        <div className="flex items-center space-x-3">
          <div className="w-10 h-10 bg-indigo-600 rounded-xl flex items-center justify-center shadow-[0_0_20px_rgba(79,70,229,0.4)]">
            <svg className="w-6 h-6 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
            </svg>
          </div>
          <span className="text-2xl font-black tracking-tight bg-clip-text text-transparent bg-gradient-to-r from-white to-slate-400 uppercase">Chronos AI</span>
        </div>
        
        <div className="text-right hidden md:block">
          <h2 className="text-slate-100 font-bold text-xl">{getGreeting()}</h2>
          <p className="text-slate-500 text-sm font-medium">Your Temporal Command Center</p>
        </div>
      </header>

      {/* Main Content Area */}
      <main className="w-full max-w-7xl px-6 z-10 flex flex-col items-center">
        {activeTab === TabType.CLOCK && (
          <div className="w-full flex flex-col items-center space-y-20 py-8 animate-in fade-in slide-in-from-bottom-4 duration-700">
            <ClockDisplay time={currentTime} />
            <AITemporalInsight currentTime={currentTime} />
          </div>
        )}

        {activeTab === TabType.WORLD && (
          <div className="w-full flex flex-col items-center py-8 animate-in fade-in slide-in-from-bottom-4 duration-700">
            <h2 className="text-3xl font-black mb-12 text-slate-200">Global Horizon</h2>
            <WorldClock currentTime={currentTime} />
          </div>
        )}

        {activeTab === TabType.TOOLS && (
          <div className="w-full flex flex-col items-center py-8 animate-in fade-in slide-in-from-bottom-4 duration-700">
            <h2 className="text-3xl font-black mb-12 text-slate-200">Precision Utilities</h2>
            <TimeTools />
          </div>
        )}
      </main>

      {/* Sticky Bottom Navigation */}
      <nav className="fixed bottom-8 left-1/2 -translate-x-1/2 glass p-2 rounded-2xl border border-white/10 shadow-2xl z-50 flex items-center space-x-2">
        <button
          onClick={() => setActiveTab(TabType.CLOCK)}
          className={`flex items-center space-x-2 px-6 py-3 rounded-xl transition-all duration-300 ${activeTab === TabType.CLOCK ? 'bg-indigo-600 text-white shadow-lg' : 'text-slate-400 hover:text-slate-200 hover:bg-white/5'}`}
        >
          <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
          </svg>
          <span className="font-bold text-sm">Main</span>
        </button>
        <button
          onClick={() => setActiveTab(TabType.WORLD)}
          className={`flex items-center space-x-2 px-6 py-3 rounded-xl transition-all duration-300 ${activeTab === TabType.WORLD ? 'bg-indigo-600 text-white shadow-lg' : 'text-slate-400 hover:text-slate-200 hover:bg-white/5'}`}
        >
          <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 12a9 9 0 01-9 9m9-9a9 9 0 00-9-9m9 9H3m9 9a9 9 0 01-9-9m9 9c1.657 0 3-4.03 3-9s-1.343-9-3-9m0 18c-1.657 0-3-4.03-3-9s1.343-9 3-9m-9 9a9 9 0 019-9" />
          </svg>
          <span className="font-bold text-sm">World</span>
        </button>
        <button
          onClick={() => setActiveTab(TabType.TOOLS)}
          className={`flex items-center space-x-2 px-6 py-3 rounded-xl transition-all duration-300 ${activeTab === TabType.TOOLS ? 'bg-indigo-600 text-white shadow-lg' : 'text-slate-400 hover:text-slate-200 hover:bg-white/5'}`}
        >
          <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 6V4m0 2a2 2 0 100 4m0-4a2 2 0 110 4m-6 8a2 2 0 100-4m0 4a2 2 0 110-4m0 4v2m0-6V4m6 6v10m6-2a2 2 0 100-4m0 4a2 2 0 110-4m0 4v2m0-6V4" />
          </svg>
          <span className="font-bold text-sm">Tools</span>
        </button>
      </nav>

      {/* Footer Info */}
      <footer className="mt-auto py-8 text-slate-600 text-sm z-10">
        &copy; {currentTime.getFullYear()} Chronos AI &bull; Intelligent Temporal Experience
      </footer>
    </div>
  );
};

export default App;
