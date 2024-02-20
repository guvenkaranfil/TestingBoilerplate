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
