
import React, { useState, useEffect } from 'react';
import { AppScreen, UserStats } from './types';
import LoginScreen from './components/LoginScreen';
import Dashboard from './components/Dashboard';
import OfflineBlocker from './components/OfflineBlocker';
import SideMenu from './components/SideMenu';
import WorkoutScreen from './components/WorkoutScreen';
import PlansScreen from './components/PlansScreen';
import PremiumScreen from './components/PremiumScreen';

const App: React.FC = () => {
  const [isOnline, setIsOnline] = useState(navigator.onLine);
  const [screen, setScreen] = useState<AppScreen>(AppScreen.LOGIN);
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [stats, setStats] = useState<UserStats>({
    totalReps: 0,
    dailyGoal: 10000,
    history: []
  });

  useEffect(() => {
    const handleOnline = () => setIsOnline(true);
    const handleOffline = () => setIsOnline(false);

    window.addEventListener('online', handleOnline);
    window.addEventListener('offline', handleOffline);

    // Load from localStorage
    const saved = localStorage.getItem('rs_setup_stats');
    if (saved) {
      const parsed = JSON.parse(saved);
      // Ensure daily goal is updated to 10,000 even for returning users if it was 50
      if (parsed.dailyGoal === 50) parsed.dailyGoal = 10000;
      setStats(parsed);
    }

    return () => {
      window.removeEventListener('online', handleOnline);
      window.removeEventListener('offline', handleOffline);
    };
  }, []);

  useEffect(() => {
    localStorage.setItem('rs_setup_stats', JSON.stringify(stats));
  }, [stats]);

  if (!isOnline) {
    return <OfflineBlocker />;
  }

  const navigateTo = (newScreen: AppScreen) => {
    setScreen(newScreen);
    setIsMenuOpen(false);
  };

  const handleLogin = (guest: boolean) => {
    setIsLoggedIn(true);
    setScreen(AppScreen.DASHBOARD);
  };

  const renderScreen = () => {
    switch (screen) {
      case AppScreen.LOGIN:
        return <LoginScreen onLogin={handleLogin} />;
      case AppScreen.DASHBOARD:
        return <Dashboard stats={stats} onStart={() => setScreen(AppScreen.WORKOUT)} />;
      case AppScreen.WORKOUT:
        return (
          <WorkoutScreen 
            stats={stats} 
            setStats={setStats} 
            onClose={() => setScreen(AppScreen.DASHBOARD)} 
          />
        );
      case AppScreen.PLANS:
        return <PlansScreen />;
      case AppScreen.PREMIUM:
        return <PremiumScreen />;
      default:
        return <Dashboard stats={stats} onStart={() => setScreen(AppScreen.WORKOUT)} />;
    }
  };

  return (
    <div className="min-h-screen bg-black text-white relative flex flex-col">
      {isLoggedIn && (
        <header className="p-4 border-b border-gray-800 flex justify-between items-center bg-black sticky top-0 z-40">
          <h1 className="text-xl font-orbitron font-bold tracking-tighter">
            RS <span className="neon-pink">SETUP</span> COUNTER
          </h1>
          <button 
            onClick={() => setIsMenuOpen(true)}
            className="p-2 text-white hover:text-[#ff2d75]"
          >
            <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16m-7 6h7" />
            </svg>
          </button>
        </header>
      )}

      <main className="flex-1 flex flex-col">
        {renderScreen()}
      </main>

      <SideMenu 
        isOpen={isMenuOpen} 
        onClose={() => setIsMenuOpen(false)} 
        onNavigate={navigateTo}
      />
    </div>
  );
};

export default App;
