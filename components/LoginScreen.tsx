
import React from 'react';

interface LoginScreenProps {
  onLogin: (guest: boolean) => void;
}

const LoginScreen: React.FC<LoginScreenProps> = ({ onLogin }) => {
  return (
    <div className="flex-1 flex flex-col items-center justify-center p-8 space-y-12">
      <div className="text-center">
        <h1 className="text-4xl font-orbitron font-bold tracking-widest mb-2">
          RS <span className="neon-pink">SETUP</span>
        </h1>
        <p className="text-gray-400 font-light italic">Master your core, elevate your strength.</p>
      </div>

      <div className="w-full max-w-sm space-y-4">
        <button 
          onClick={() => onLogin(false)}
          className="w-full flex items-center justify-center gap-3 bg-white text-black py-4 px-6 rounded-xl font-bold hover:bg-gray-100 transition-colors"
        >
          <img src="https://www.google.com/favicon.ico" className="w-5 h-5" alt="Google" />
          Continue with Google
        </button>
        
        <button 
          onClick={() => onLogin(true)}
          className="w-full py-4 px-6 rounded-xl font-bold border border-gray-700 text-gray-300 hover:border-[#ff2d75] hover:text-[#ff2d75] transition-all"
        >
          Continue as Guest
        </button>
      </div>

      <p className="text-xs text-gray-500 text-center max-w-xs">
        By continuing, you agree to our <span className="underline cursor-pointer">Terms of Service</span> and <span className="underline cursor-pointer">Privacy Policy</span>.
      </p>
    </div>
  );
};

export default LoginScreen;
