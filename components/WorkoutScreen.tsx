
import React, { useState, useEffect, useRef } from 'react';
import { UserStats } from '../types';

interface WorkoutScreenProps {
  stats: UserStats;
  setStats: React.Dispatch<React.SetStateAction<UserStats>>;
  onClose: () => void;
}

const WorkoutScreen: React.FC<WorkoutScreenProps> = ({ stats, setStats, onClose }) => {
  const [count, setCount] = useState(0);
  const [target, setTarget] = useState(100); // Default session target
  const [method, setMethod] = useState<'sensor' | 'camera'>('sensor');
  const [isWorkoutActive, setIsWorkoutActive] = useState(false);
  const [sensorStatus, setSensorStatus] = useState<string>('Ready');
  const [permissionState, setPermissionState] = useState<'prompt' | 'granted' | 'denied'>('prompt');
  const [isCooldownActive, setIsCooldownActive] = useState(false);
  
  const videoRef = useRef<HTMLVideoElement>(null);
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const lastFrameRef = useRef<Uint8ClampedArray | null>(null);
  const cooldownRef = useRef(false);

  // Sound Logic
  const playCongratulation = () => {
    const msg = new SpeechSynthesisUtterance("Congratulations! Goal Reached.");
    msg.pitch = 1.2;
    msg.rate = 1;
    window.speechSynthesis.speak(msg);
  };

  const incrementCount = () => {
    if (cooldownRef.current) return;
    
    setCount(prev => {
      const next = prev + 1;
      if (next === target) playCongratulation();
      return next;
    });

    cooldownRef.current = true;
    setIsCooldownActive(true);

    setTimeout(() => {
      cooldownRef.current = false;
      setIsCooldownActive(false);
    }, 1200); // 1.2 second cooldown between reps
  };

  // Permission Request for Camera
  const requestCameraPermission = async () => {
    try {
      const stream = await navigator.mediaDevices.getUserMedia({ video: { facingMode: 'user' } });
      setPermissionState('granted');
      setSensorStatus('Camera Access Granted');
      // Stop stream immediately until workout starts
      stream.getTracks().forEach(track => track.stop());
    } catch (err) {
      console.error("Camera access denied:", err);
      setPermissionState('denied');
      setSensorStatus('Camera Access Denied');
    }
  };

  // Sensor Logic (Motion/Proximity Hybrid)
  useEffect(() => {
    if (method !== 'sensor' || !isWorkoutActive) return;

    let lastZ = 0;
    const handleMotion = (event: DeviceMotionEvent) => {
      const acc = event.accelerationIncludingGravity;
      if (!acc) return;
      
      const z = acc.z || 0;
      if (Math.abs(z - lastZ) > 8) {
        if (z > 12) { 
           incrementCount();
        }
      }
      lastZ = z;
    };

    if (typeof DeviceMotionEvent !== 'undefined' && typeof (DeviceMotionEvent as any).requestPermission === 'function') {
      (DeviceMotionEvent as any).requestPermission().then((state: string) => {
        if (state === 'granted') {
          window.addEventListener('devicemotion', handleMotion);
          setSensorStatus('Active');
        } else {
          setSensorStatus('Permission Denied');
          setMethod('camera');
        }
      });
    } else {
      window.addEventListener('devicemotion', handleMotion);
      setSensorStatus('Active');
    }

    return () => window.removeEventListener('devicemotion', handleMotion);
  }, [isWorkoutActive, method]);

  // Camera Logic (Simple Motion Detection)
  useEffect(() => {
    if (method !== 'camera' || !isWorkoutActive) return;

    let stream: MediaStream | null = null;

    const startCamera = async () => {
      try {
        stream = await navigator.mediaDevices.getUserMedia({ video: { facingMode: 'user' } });
        if (videoRef.current) {
          videoRef.current.srcObject = stream;
          videoRef.current.play();
          setPermissionState('granted');
        }
      } catch (err) {
        setSensorStatus('Camera Failed');
        setPermissionState('denied');
      }
    };

    startCamera();

    const interval = setInterval(() => {
      if (!videoRef.current || !canvasRef.current) return;
      const ctx = canvasRef.current.getContext('2d');
      if (!ctx) return;

      ctx.drawImage(videoRef.current, 0, 0, 100, 100);
      const currentFrame = ctx.getImageData(0, 0, 100, 100).data;

      if (lastFrameRef.current) {
        let diff = 0;
        for (let i = 0; i < currentFrame.length; i += 4) {
          diff += Math.abs(currentFrame[i] - lastFrameRef.current[i]);
        }
        
        if (diff > 500000) { 
           incrementCount();
        }
      }
      lastFrameRef.current = currentFrame;
    }, 200);

    return () => {
      clearInterval(interval);
      if (stream) {
        stream.getTracks().forEach(t => t.stop());
      }
    };
  }, [isWorkoutActive, method]);

  const saveWorkout = () => {
    const today = new Date().toLocaleDateString();
    setStats(prev => ({
      ...prev,
      totalReps: prev.totalReps + count,
      history: [{ date: today, count: count }, ...prev.history]
    }));
    onClose();
  };

  return (
    <div className="flex-1 flex flex-col p-6 animate-fadeIn">
      <div className="flex justify-between items-center mb-8">
        <button onClick={onClose} className="text-gray-400">
          <svg xmlns="http://www.w3.org/2000/svg" className="h-8 w-8" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
          </svg>
        </button>
        <h2 className="font-orbitron font-bold">WORKOUT MODE</h2>
        <div className="w-8"></div>
      </div>

      <div className="bg-gray-900 rounded-3xl p-8 border border-gray-800 flex flex-col items-center flex-1 shadow-2xl relative overflow-hidden">
        {method === 'camera' && isWorkoutActive && (
          <div className="absolute top-0 left-0 w-full h-full opacity-20 pointer-events-none">
             <video ref={videoRef} className="w-full h-full object-cover" muted playsInline />
             <canvas ref={canvasRef} width="100" height="100" className="hidden" />
          </div>
        )}

        <div className="z-10 text-center space-y-4">
          <p className="text-xs uppercase tracking-[0.3em] text-gray-500 font-bold">Current Reps</p>
          <div 
            className={`text-[120px] font-orbitron font-black leading-none neon-pink shadow-neon-text drop-shadow-[0_0_20px_rgba(255,45,117,0.5)] transition-all duration-300 ${isCooldownActive ? 'opacity-40 scale-95 blur-[1px]' : 'opacity-100 scale-100 blur-0'}`}
          >
            {count}
          </div>
          <p className="text-sm text-gray-400">Target: {target}</p>
        </div>

        {!isWorkoutActive ? (
          <div className="mt-12 w-full space-y-6 z-10">
            <div className="flex justify-between items-center bg-black p-4 rounded-xl border border-gray-800">
              <span className="text-sm font-bold text-white">Session Target</span>
              <div className="flex items-center gap-4">
                <button onClick={() => setTarget(Math.max(10, target - 10))} className="w-8 h-8 rounded-full bg-gray-800 flex items-center justify-center font-bold text-white">-</button>
                <span className="font-orbitron font-bold text-xl text-white">{target}</span>
                <button onClick={() => setTarget(target + 10)} className="w-8 h-8 rounded-full bg-gray-800 flex items-center justify-center font-bold text-white">+</button>
              </div>
            </div>

            <div className="flex gap-2">
              <button 
                onClick={() => setMethod('sensor')}
                className={`flex-1 py-3 rounded-xl font-bold text-xs transition-all ${method === 'sensor' ? 'bg-[#ff2d75] border-transparent text-white' : 'bg-transparent border border-gray-700 text-gray-400'}`}
              >
                PROXIMITY
              </button>
              <button 
                onClick={() => {
                  setMethod('camera');
                  if (permissionState !== 'granted') requestCameraPermission();
                }}
                className={`flex-1 py-3 rounded-xl font-bold text-xs transition-all ${method === 'camera' ? 'bg-[#ff2d75] border-transparent text-white' : 'bg-transparent border border-gray-700 text-gray-400'}`}
              >
                AI CAMERA
              </button>
            </div>

            <div className="bg-gray-950 p-4 rounded-xl border border-dashed border-gray-700 text-center">
              <p className="text-[10px] text-gray-400 uppercase mb-2">Instructions</p>
              <p className="text-xs text-gray-300">
                {method === 'sensor' 
                  ? "Place phone on floor directly under your chest." 
                  : "Prop phone up in front of you. Ensure your body is in the frame."}
              </p>
              <p className={`text-[10px] mt-2 font-bold ${permissionState === 'denied' ? 'text-red-500' : 'text-pink-400'}`}>
                {sensorStatus}
              </p>
            </div>

            <button 
              onClick={() => {
                if (method === 'camera' && permissionState !== 'granted') {
                   requestCameraPermission();
                } else {
                   setIsWorkoutActive(true);
                }
              }}
              className="w-full py-5 bg-white text-black rounded-2xl font-orbitron font-bold text-lg hover:bg-gray-100 transition-all shadow-lg active:scale-95"
            >
              START WORKOUT
            </button>
          </div>
        ) : (
          <div className="mt-auto w-full space-y-4 z-10">
             <div className="text-center py-2 animate-pulse text-xs text-gray-400 font-bold uppercase tracking-widest">
               {method === 'sensor' ? 'SENSING BODY...' : 'AI MOTION DETECTING...'}
             </div>
             {isCooldownActive && (
               <div className="text-center text-[10px] text-pink-500 font-bold tracking-widest uppercase">
                 Rep Registered • Wait...
               </div>
             )}
             <button 
              onClick={saveWorkout}
              className="w-full py-5 bg-[#ff2d75] text-white rounded-2xl font-orbitron font-bold text-lg shadow-neon active:scale-95 transition-transform"
            >
              FINISH & SAVE
            </button>
            <button 
              onClick={() => setIsWorkoutActive(false)}
              className="w-full py-2 text-gray-500 text-xs uppercase font-bold tracking-widest hover:text-white"
            >
              Reset Session
            </button>
          </div>
        )}
      </div>
    </div>
  );
};

export default WorkoutScreen;
