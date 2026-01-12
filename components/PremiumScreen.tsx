
import React from 'react';

const PremiumScreen: React.FC = () => {
  return (
    <div className="flex-1 flex flex-col p-6 overflow-hidden relative">
      <div className="text-center mb-8">
        <h2 className="text-2xl font-orbitron font-bold text-yellow-500 flex items-center justify-center gap-2">
           RS PREMIUM
        </h2>
        <p className="text-xs text-gray-500">Go beyond the basics.</p>
      </div>

      <div className="space-y-6">
        <div className="relative">
          <div className="bg-gray-900 p-6 rounded-3xl border border-gray-800 premium-blur">
             <h3 className="text-lg font-bold mb-2">Advanced AI Tracking</h3>
             <p className="text-sm text-gray-500">Full skeletal analysis using Gemini Vision to ensure perfect posture and form detection.</p>
          </div>
          <div className="absolute inset-0 flex items-center justify-center">
            <span className="bg-yellow-500 text-black px-4 py-1 rounded-full text-xs font-bold shadow-lg">LOCKED</span>
          </div>
        </div>

        <div className="relative">
          <div className="bg-gray-900 p-6 rounded-3xl border border-gray-800 premium-blur">
             <h3 className="text-lg font-bold mb-2">Pro Diet & Nutrition</h3>
             <p className="text-sm text-gray-500">Personalized macro breakdown based on your weight, age, and activity level.</p>
          </div>
          <div className="absolute inset-0 flex items-center justify-center">
            <span className="bg-yellow-500 text-black px-4 py-1 rounded-full text-xs font-bold shadow-lg">LOCKED</span>
          </div>
        </div>

         <div className="relative">
          <div className="bg-gray-900 p-6 rounded-3xl border border-gray-800 premium-blur">
             <h3 className="text-lg font-bold mb-2">Cloud History</h3>
             <p className="text-sm text-gray-500">Sync your progress across all devices and export data to PDF for your trainer.</p>
          </div>
          <div className="absolute inset-0 flex items-center justify-center">
            <span className="bg-yellow-500 text-black px-4 py-1 rounded-full text-xs font-bold shadow-lg">LOCKED</span>
          </div>
        </div>
      </div>

      <div className="mt-auto pt-8">
        <div className="bg-gradient-to-br from-gray-900 to-black p-6 rounded-3xl border-2 border-yellow-600/50 shadow-2xl">
          <div className="text-center mb-4">
            <span className="text-3xl font-orbitron font-black">$4.99</span>
            <span className="text-gray-400 text-sm italic"> / month</span>
          </div>
          <button className="w-full py-4 bg-yellow-500 text-black font-bold rounded-2xl shadow-[0_0_20px_rgba(234,179,8,0.3)] hover:scale-[1.02] transition-transform">
            UNLOCK PREMIUM NOW
          </button>
          <p className="text-[10px] text-gray-500 text-center mt-4 uppercase font-bold tracking-widest">
             Cancel anytime • SECURE CHECKOUT
          </p>
        </div>
      </div>
    </div>
  );
};

export default PremiumScreen;
