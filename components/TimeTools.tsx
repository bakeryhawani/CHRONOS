
import React, { useState, useEffect, useRef } from 'react';

const TimeTools: React.FC = () => {
  // Stopwatch State
  const [stopwatchTime, setStopwatchTime] = useState(0);
  const [isStopwatchRunning, setIsStopwatchRunning] = useState(false);
  const stopwatchRef = useRef<number | null>(null);

  // Timer State
  const [timerTime, setTimerTime] = useState(0);
  const [isTimerRunning, setIsTimerRunning] = useState(false);
  const timerRef = useRef<number | null>(null);
  const [inputMinutes, setInputMinutes] = useState('0');

  // Stopwatch Logic
  useEffect(() => {
    if (isStopwatchRunning) {
      stopwatchRef.current = window.setInterval(() => {
        setStopwatchTime((prev) => prev + 10);
      }, 10);
    } else {
      if (stopwatchRef.current) clearInterval(stopwatchRef.current);
    }
    return () => { if (stopwatchRef.current) clearInterval(stopwatchRef.current); };
  }, [isStopwatchRunning]);

  // Timer Logic
  useEffect(() => {
    if (isTimerRunning && timerTime > 0) {
      timerRef.current = window.setInterval(() => {
        setTimerTime((prev) => {
          if (prev <= 1000) {
            setIsTimerRunning(false);
            return 0;
          }
          return prev - 1000;
        });
      }, 1000);
    } else {
      if (timerRef.current) clearInterval(timerRef.current);
    }
    return () => { if (timerRef.current) clearInterval(timerRef.current); };
  }, [isTimerRunning, timerTime]);

  const formatStopwatch = (ms: number) => {
    const minutes = Math.floor(ms / 60000);
    const seconds = Math.floor((ms % 60000) / 1000);
    const centis = Math.floor((ms % 1000) / 10);
    return `${minutes.toString().padStart(2, '0')}:${seconds.toString().padStart(2, '0')}.${centis.toString().padStart(2, '0')}`;
  };

  const formatTimer = (ms: number) => {
    const totalSeconds = Math.floor(ms / 1000);
    const minutes = Math.floor(totalSeconds / 60);
    const seconds = totalSeconds % 60;
    return `${minutes.toString().padStart(2, '0')}:${seconds.toString().padStart(2, '0')}`;
  };

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 gap-8 w-full max-w-4xl">
      {/* Stopwatch Section */}
      <div className="glass p-8 rounded-3xl border border-slate-800">
        <h3 className="text-xl font-bold mb-6 text-indigo-400">Stopwatch</h3>
        <div className="text-5xl font-mono text-white mb-8 text-center">{formatStopwatch(stopwatchTime)}</div>
        <div className="flex space-x-4">
          <button
            onClick={() => setIsStopwatchRunning(!isStopwatchRunning)}
            className={`flex-1 py-3 rounded-xl font-bold transition-all ${isStopwatchRunning ? 'bg-rose-500/20 text-rose-400' : 'bg-indigo-500 text-white hover:bg-indigo-400'}`}
          >
            {isStopwatchRunning ? 'Stop' : 'Start'}
          </button>
          <button
            onClick={() => { setStopwatchTime(0); setIsStopwatchRunning(false); }}
            className="px-6 py-3 rounded-xl bg-slate-800 text-slate-400 hover:bg-slate-700 transition-all"
          >
            Reset
          </button>
        </div>
      </div>

      {/* Timer Section */}
      <div className="glass p-8 rounded-3xl border border-slate-800">
        <h3 className="text-xl font-bold mb-6 text-teal-400">Timer</h3>
        {isTimerRunning || timerTime > 0 ? (
          <div className="text-5xl font-mono text-white mb-8 text-center">{formatTimer(timerTime)}</div>
        ) : (
          <div className="mb-8 flex justify-center items-center space-x-2">
            <input
              type="number"
              value={inputMinutes}
              onChange={(e) => setInputMinutes(e.target.value)}
              className="w-24 bg-slate-900 border border-slate-700 rounded-xl px-4 py-2 text-2xl font-mono focus:outline-none focus:border-teal-500"
              placeholder="0"
            />
            <span className="text-slate-400 font-bold">MINUTES</span>
          </div>
        )}
        <div className="flex space-x-4">
          <button
            onClick={() => {
              if (!isTimerRunning && timerTime === 0) {
                setTimerTime(parseInt(inputMinutes) * 60000);
              }
              setIsTimerRunning(!isTimerRunning);
            }}
            className={`flex-1 py-3 rounded-xl font-bold transition-all ${isTimerRunning ? 'bg-rose-500/20 text-rose-400' : 'bg-teal-500 text-white hover:bg-teal-400'}`}
          >
            {isTimerRunning ? 'Pause' : 'Start'}
          </button>
          <button
            onClick={() => { setTimerTime(0); setIsTimerRunning(false); }}
            className="px-6 py-3 rounded-xl bg-slate-800 text-slate-400 hover:bg-slate-700 transition-all"
          >
            Reset
          </button>
        </div>
      </div>
    </div>
  );
};

export default TimeTools;
