import Dexie, { Table } from 'dexie';

export interface Mission {
  id: number;
  completed: boolean;
}

export interface UserProgress {
  userId: string;
  points: number;
  missions: Mission[];
}

export class MiAppDB extends Dexie {
  progress!: Table<UserProgress, string>;

  constructor() {
    super('MiAppDB');
    this.version(1).stores({
      progress: 'userId, points'
    });
  }
}

export const db = new MiAppDB();