
import React from 'react';
import { UserStats } from '../types';

interface DashboardProps {
  stats: UserStats;
  onStart: () => void;
}

const Dashboard: React.FC<DashboardProps> = ({ stats, onStart }) => {
  const progress = Math.min(100, (stats.totalReps / stats.dailyGoal) * 100);

  return (
    <div className="p-6 space-y-8 flex flex-col h-full animate-fadeIn">
      <section className="bg-gray-900 rounded-3xl p-6 border border-gray-800 shadow-xl">
        <h2 className="text-sm font-semibold text-gray-400 uppercase tracking-wider mb-4">Daily Goal</h2>
        <div className="flex items-center justify-between mb-2">
          <span className="text-5xl font-orbitron font-bold">{stats.totalReps} <span className="text-lg text-gray-500">/ {stats.dailyGoal}</span></span>
          <span className="text-[#ff2d75] font-bold">{Math.round(progress)}%</span>
        </div>
        <div className="w-full h-3 bg-black rounded-full overflow-hidden border border-gray-800">
          <div 
            className="h-full bg-gradient-to-r from-[#ff2d75] to-pink-400 shadow-neon transition-all duration-1000"
            style={{ width: `${progress}%` }}
          />
        </div>
      </section>

      <section className="grid grid-cols-2 gap-4">
        <div className="bg-gray-900 p-4 rounded-2xl border border-gray-800">
          <span className="text-xs text-gray-500 block mb-1">TOTAL REPS</span>
          <span className="text-2xl font-orbitron font-bold neon-pink">{stats.totalReps}</span>
        </div>
        <div className="bg-gray-900 p-4 rounded-2xl border border-gray-800">
          <span className="text-xs text-gray-500 block mb-1">STREAK</span>
          <span className="text-2xl font-orbitron font-bold text-white">3 Days</span>
        </div>
      </section>

      <section className="flex-1">
        <h3 className="text-sm font-semibold text-gray-400 uppercase tracking-wider mb-4">Recent Activity</h3>
        <div className="space-y-3">
          {stats.history.length === 0 ? (
            <p className="text-gray-600 text-center py-8">No activity yet today. Time to move!</p>
          ) : (
            stats.history.slice(0, 5).map((h, i) => (
              <div key={i} className="flex justify-between p-3 bg-gray-950 rounded-lg border-l-2 border-[#ff2d75]">
                <span>{h.date}</span>
                <span className="font-bold">+{h.count} reps</span>
              </div>
            ))
          )}
        </div>
      </section>

      <div className="sticky bottom-6 mt-auto">
        <button 
          onClick={onStart}
          className="w-full py-5 bg-[#ff2d75] text-white rounded-2xl font-orbitron font-bold text-xl shadow-neon transform active:scale-95 transition-all"
        >
          START WORKOUT
        </button>
      </div>
    </div>
  );
};

export default Dashboard;
