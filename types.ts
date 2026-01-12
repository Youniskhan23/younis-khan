
export interface UserStats {
  totalReps: number;
  dailyGoal: number;
  history: { date: string; count: number }[];
}

export interface WorkoutPlan {
  day: number;
  title: string;
  description: string;
}

export interface DietPlan {
  day: number;
  breakfast: string;
  lunch: string;
  dinner: string;
}

export enum AppScreen {
  LOGIN,
  DASHBOARD,
  WORKOUT,
  PLANS,
  PREMIUM
}
