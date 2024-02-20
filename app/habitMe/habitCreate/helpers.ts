import {habitsKey} from '../../constants/storageVariables';
import {get, set} from '../../storage/localStorage';
import store from '../../store';
import {IHabit, StreakGoal} from './habit';

export const createHabit = (): Promise<boolean> => {
  const inputs = store.getState().inputs;

  const habit: IHabit = {
    createdDate: new Date(),
    name: inputs.name,
    description: inputs.description,
    streakGoal: StreakGoal.daily,
    completedDates: [],
  };

  return saveHabitToStorage(habit);
};

const saveHabitToStorage = (habit: IHabit): Promise<boolean> => {
  return new Promise(resolve => {
    let habits = JSON.parse(get(habitsKey) ?? '[]');
    habits.push(habit);
    set(habitsKey, JSON.stringify(habits));
    return resolve(true);
  });
};
