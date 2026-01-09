
import React, { useEffect, useState } from 'react';

interface ClockProps {
  time: Date;
}

const ClockDisplay: React.FC<ClockProps> = ({ time }) => {
  const [seconds, setSeconds] = useState(time.getSeconds());
  const [minutes, setMinutes] = useState(time.getMinutes());
  const [hours, setHours] = useState(time.getHours());

  useEffect(() => {
    setSeconds(time.getSeconds());
    setMinutes(time.getMinutes());
    setHours(time.getHours());
  }, [time]);

  // Rotations for CSS
  const secDeg = (seconds / 60) * 360;
  const minDeg = ((minutes + seconds / 60) / 60) * 360;
  const hrDeg = (((hours % 12) + minutes / 60) / 12) * 360;

  return (
    <div className="flex flex-col items-center justify-center space-y-12">
      {/* Analog Clock */}
      <div className="relative w-64 h-64 md:w-80 md:h-80 rounded-full border-4 border-indigo-500/20 glass shadow-2xl flex items-center justify-center">
        {/* Face Markers */}
        {[...Array(12)].map((_, i) => (
          <div
            key={i}
            className="absolute w-1 h-3 bg-slate-600 rounded-full"
            style={{ transform: `rotate(${i * 30}deg) translateY(-130px)` }}
          />
        ))}

        {/* Hour Hand */}
        <div
          className="absolute w-1.5 h-20 bg-slate-100 rounded-full origin-bottom transition-transform duration-500 ease-out"
          style={{ transform: `rotate(${hrDeg}deg) translateY(-50%)`, top: '10%' }}
        />
        
        {/* Minute Hand */}
        <div
          className="absolute w-1 h-32 bg-indigo-400 rounded-full origin-bottom transition-transform duration-500 ease-out"
          style={{ transform: `rotate(${minDeg}deg) translateY(-50%)`, top: '0%' }}
        />
        
        {/* Second Hand */}
        <div
          className="absolute w-0.5 h-36 bg-rose-500 rounded-full origin-bottom"
          style={{ transform: `rotate(${secDeg}deg) translateY(-50%)`, top: '-5%' }}
        />
        
        {/* Center Pin */}
        <div className="absolute w-4 h-4 bg-slate-900 border-2 border-indigo-500 rounded-full z-10" />
      </div>

      {/* Digital Display */}
      <div className="text-center">
        <div className="text-6xl md:text-8xl font-black font-mono tracking-tighter text-transparent bg-clip-text bg-gradient-to-b from-white to-slate-500">
          {time.toLocaleTimeString([], { hour12: false })}
        </div>
        <div className="text-slate-400 text-lg md:text-xl font-medium mt-2">
          {time.toLocaleDateString('en-US', { weekday: 'long', year: 'numeric', month: 'long', day: 'numeric' })}
        </div>
      </div>
    </div>
  );
};

export default ClockDisplay;
