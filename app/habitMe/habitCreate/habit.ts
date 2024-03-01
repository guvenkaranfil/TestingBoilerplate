export enum StreakGoal {
  daily,
}

export interface IHabit {
  createdDate: Date;
  name: string;
  description?: string;
  streakGoal: StreakGoal;
  completedDates: Date[];
}

export interface ILocalHabit
  extends Omit<IHabit, 'createdDate' | 'completedDates'> {
  createdDate: string;
  completedDates: string[];
}
