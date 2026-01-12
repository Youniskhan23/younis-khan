
import React from 'react';

const OfflineBlocker: React.FC = () => {
  return (
    <div className="fixed inset-0 bg-black flex flex-col items-center justify-center p-8 z-[100] text-center">
      <div className="w-24 h-24 mb-6 text-[#ff2d75]">
        <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M18.364 5.636a9 9 0 010 12.728m0 0l-2.829-2.829m2.829 2.829L21 21M15.536 8.464a5 5 0 010 7.072m0 0l-2.829-2.829m-4.243 2.829a4.978 4.978 0 01-1.414-2.83m-1.414 5.658a9 9 0 01-2.167-9.238m7.824 2.167a1 1 0 111.414 1.414m-1.414-1.414L3 3" />
        </svg>
      </div>
      <h1 className="text-2xl font-bold font-orbitron mb-2">OFFLINE MODE</h1>
      <p className="text-gray-400 max-w-xs">
        Please connect to the Internet to use RS Setup Counter. Online syncing and AI models require an active connection.
      </p>
      <button 
        onClick={() => window.location.reload()}
        className="mt-8 px-8 py-3 bg-[#ff2d75] text-white font-bold rounded-full shadow-neon active:scale-95 transition-all"
      >
        RETRY CONNECTION
      </button>
    </div>
  );
};

export default OfflineBlocker;
