
import React from 'react';
import { AppScreen } from '../types';

interface SideMenuProps {
  isOpen: boolean;
  onClose: () => void;
  onNavigate: (screen: AppScreen) => void;
}

const SideMenu: React.FC<SideMenuProps> = ({ isOpen, onClose, onNavigate }) => {
  return (
    <>
      {/* Overlay */}
      <div 
        className={`fixed inset-0 bg-black/80 backdrop-blur-sm z-50 transition-opacity duration-300 ${isOpen ? 'opacity-100' : 'opacity-0 pointer-events-none'}`}
        onClick={onClose}
      />
      
      {/* Menu Drawer */}
      <div className={`fixed right-0 top-0 bottom-0 w-72 bg-gray-950 z-50 transform transition-transform duration-300 ease-in-out border-l border-gray-800 ${isOpen ? 'translate-x-0' : 'translate-x-full'}`}>
        <div className="p-6 h-full flex flex-col">
          <div className="flex justify-between items-center mb-10">
            <h2 className="text-xl font-orbitron font-bold italic">MENU</h2>
            <button onClick={onClose} className="p-2">
              <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
              </svg>
            </button>
          </div>

          <nav className="space-y-6 flex-1">
            <button 
              onClick={() => onNavigate(AppScreen.DASHBOARD)}
              className="w-full text-left py-3 px-4 rounded-xl hover:bg-gray-900 transition-colors flex items-center gap-3 font-semibold"
            >
              <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 neon-pink" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 12l2-2m0 0l7-7 7 7M5 10v10a1 1 0 001 1h3m10-11l2 2m-2-2v10a1 1 0 01-1 1h-3m-6 0a1 1 0 001-1v-4a1 1 0 011-1h2a1 1 0 011 1v4a1 1 0 001 1m-6 0h6" />
              </svg>
              Home
            </button>
            <button 
              onClick={() => onNavigate(AppScreen.PLANS)}
              className="w-full text-left py-3 px-4 rounded-xl hover:bg-gray-900 transition-colors flex items-center gap-3 font-semibold relative overflow-hidden group"
            >
              <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 text-pink-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z" />
              </svg>
              Women's Special
              <span className="absolute right-2 top-1/2 -translate-y-1/2 bg-[#ff2d75] text-[10px] px-2 py-0.5 rounded-full text-white font-bold">7 DAYS</span>
            </button>
            <button 
              onClick={() => onNavigate(AppScreen.PREMIUM)}
              className="w-full text-left py-3 px-4 rounded-xl hover:bg-gray-900 transition-colors flex items-center gap-3 font-semibold"
            >
              <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 text-yellow-500" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 3v4M3 5h4M6 17v4m-2-2h4m5-16l2.286 6.857L21 12l-5.714 2.143L13 21l-2.286-6.857L5 12l5.714-2.143L13 3z" />
              </svg>
              Unlock Premium
            </button>
          </nav>

          <div className="mt-auto pt-6 border-t border-gray-800">
            <p className="text-xs text-gray-500 mb-2">Logged in as</p>
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-full bg-[#ff2d75] flex items-center justify-center font-bold text-lg">G</div>
              <div>
                <p className="font-bold text-sm">Guest User</p>
                <p className="text-xs text-gray-500">guest@rssetup.com</p>
              </div>
            </div>
            <button className="w-full mt-6 py-3 border border-gray-800 rounded-xl text-red-500 text-sm font-bold hover:bg-red-500/10">
              Logout
            </button>
          </div>
        </div>
      </div>
    </>
  );
};

export default SideMenu;
