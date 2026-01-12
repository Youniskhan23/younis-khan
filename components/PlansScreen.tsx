
import React, { useState } from 'react';

const PlansScreen: React.FC = () => {
  const [activeTab, setActiveTab] = useState<'workout' | 'diet'>('workout');

  const workoutPlan = [
    { day: 1, title: "Lower Body", task: "3x15 Squats, 3x12 Lunges, 3x20 Glute Bridges" },
    { day: 2, title: "Upper Body", task: "3x10 Pushups, 3x12 Tricep Dips, 3x15 Plank Shoulder Taps" },
    { day: 3, title: "Active Rest", task: "30-min Walk or Light Yoga Stretch" },
    { day: 4, title: "Core & Abs", task: "3x20 Setups, 3x30s Plank, 3x15 Leg Raises" },
    { day: 5, title: "Full Body", task: "Burpees 3x10, Jumping Jacks 3x30, High Knees 3x30s" },
    { day: 6, title: "Glutes & Legs", task: "3x15 Sumo Squats, 3x12 Fire Hydrants, 3x12 Donkey Kicks" },
    { day: 7, title: "Deep Stretch", task: "Full body mobility routine and meditation" }
  ];

  const dietPlan = [
    { day: 1, meal: "Oats with berries, Grilled chicken salad, Grilled fish with broccoli" },
    { day: 2, meal: "Boiled eggs, Quinoa bowl, Tofu and stir-fry veggies" },
    { day: 3, meal: "Greek yogurt, Avocado toast with tuna, Baked sweet potato & beans" },
    { day: 4, meal: "Smoothie bowl, Turkey wrap, Steak with asparagus" },
    { day: 5, meal: "Omelette with spinach, Lentil soup, Grilled salmon" },
    { day: 6, meal: "Pancakes (Protein), Caesar salad (No croutons), Roasted veg mix" },
    { day: 7, meal: "Fruit bowl, Low-carb pasta, Chicken clear soup" }
  ];

  return (
    <div className="flex-1 p-6 space-y-6 overflow-y-auto">
      <div className="text-center">
        <h2 className="text-2xl font-orbitron font-bold text-pink-400">WOMEN'S SPECIAL</h2>
        <p className="text-xs text-gray-500">7-Day Transformation Program</p>
      </div>

      <div className="flex bg-gray-900 rounded-full p-1 border border-gray-800">
        <button 
          onClick={() => setActiveTab('workout')}
          className={`flex-1 py-3 rounded-full text-sm font-bold transition-all ${activeTab === 'workout' ? 'bg-[#ff2d75] text-white shadow-neon' : 'text-gray-500'}`}
        >
          WORKOUT
        </button>
        <button 
          onClick={() => setActiveTab('diet')}
          className={`flex-1 py-3 rounded-full text-sm font-bold transition-all ${activeTab === 'diet' ? 'bg-[#ff2d75] text-white shadow-neon' : 'text-gray-500'}`}
        >
          DIET PLAN
        </button>
      </div>

      <div className="space-y-4">
        {activeTab === 'workout' ? (
          workoutPlan.map((p) => (
            <div key={p.day} className="bg-gray-900/50 p-4 rounded-2xl border border-gray-800 hover:border-[#ff2d75] transition-colors">
              <div className="flex justify-between items-center mb-2">
                <span className="text-[10px] font-bold text-[#ff2d75] uppercase tracking-tighter">Day {p.day}</span>
                <span className="text-sm font-bold">{p.title}</span>
              </div>
              <p className="text-sm text-gray-400 font-light leading-relaxed">{p.task}</p>
            </div>
          ))
        ) : (
          dietPlan.map((d) => (
            <div key={d.day} className="bg-gray-900/50 p-4 rounded-2xl border border-gray-800 hover:border-[#ff2d75] transition-colors">
               <div className="flex justify-between items-center mb-2">
                <span className="text-[10px] font-bold text-pink-400 uppercase tracking-tighter">Day {d.day}</span>
              </div>
              <p className="text-sm text-gray-300 font-light leading-relaxed">{d.meal}</p>
            </div>
          ))
        )}
      </div>

      <div className="p-4 bg-pink-500/10 rounded-2xl border border-pink-500/30">
        <h4 className="text-pink-400 font-bold text-sm mb-1">PRO TIP</h4>
        <p className="text-xs text-gray-400">Hydration is key! Drink at least 3 liters of water daily during this 7-day plan.</p>
      </div>
    </div>
  );
};

export default PlansScreen;
