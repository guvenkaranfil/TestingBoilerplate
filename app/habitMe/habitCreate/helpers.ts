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

interface LocalHabit extends Omit<IHabit, 'createdDate'> {
  createdDate: string;
}

const saveHabitToStorage = (habit: IHabit): Promise<boolean> => {
  return new Promise(resolve => {
    const localHabit: LocalHabit = {
      ...habit,
      createdDate: habit.createdDate.toISOString(),
    };
    let habits = JSON.parse(get(habitsKey) ?? '[]');
    habits.push(localHabit);
    store.dispatch({type: 'habits/setHabits', payload: {habits: habits}});
    set(habitsKey, JSON.stringify(habits));
    return resolve(true);
  });
};
