import Dexie, { Table } from 'dexie';

export interface Fruit {
  id?: number;
  name: string;
}

export class AppDatabase extends Dexie {
  fruits!: Table<Fruit, number>;

  constructor() {
    super('Challenge06DB');
    this.version(1).stores({
      fruits: '++id, name' // Primary key auto-incrementada
    });
  }
}

export const dbDexie = new AppDatabase();