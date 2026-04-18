export interface Mission {
  id: number;
  title: string;
  description: string;
  points: number;
  completed: boolean;
  locked: boolean;
}

export interface UserProgress {
  points: number;
  missions: Mission[];
}