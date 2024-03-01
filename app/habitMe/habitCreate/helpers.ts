import Toast from 'react-native-toast-message';
import {habitsKey} from '../../constants/storageVariables';
import {get, set} from '../../storage/localStorage';
import store from '../../store';
import {IHabit, ILocalHabit, StreakGoal} from './habit';
import {getCurrentTime} from '../../DateHelper';

export const createHabit = (): Promise<boolean> => {
  const inputs = store.getState().inputs;

  if (inputs.name.length === 0) {
    Toast.show({
      text1: 'name is required',
      type: 'error',
      position: 'top',
      autoHide: true,
    });
    return new Promise(resolve => resolve(false));
  }

  const habit: IHabit = {
    createdDate: getCurrentTime(),
    name: inputs.name,
    description: inputs.description,
    streakGoal: StreakGoal.daily,
    completedDates: [],
  };

  return saveHabitToStorage(habit);
};

const saveHabitToStorage = (habit: IHabit): Promise<boolean> => {
  return new Promise(resolve => {
    const localHabit: ILocalHabit = {
      ...habit,
      createdDate: habit.createdDate.toISOString(),
      completedDates: habit.completedDates.map(date => date.toISOString()),
    };
    let habits = JSON.parse(get(habitsKey) ?? '[]');
    habits.push(localHabit);
    store.dispatch({type: 'habits/setHabits', payload: {habits: habits}});
    set(habitsKey, JSON.stringify(habits));
    return resolve(true);
  });
};
