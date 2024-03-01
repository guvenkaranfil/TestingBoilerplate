import {PayloadAction, createSlice} from '@reduxjs/toolkit';
import {ILocalHabit} from '../habitMe/habitCreate/habit';
import dayjs from 'dayjs';

export interface IHabitsState {
  habits: ILocalHabit[];
}

const initialState: IHabitsState = {
  habits: [],
};

const habitsSlice = createSlice({
  name: 'habits',
  initialState,
  reducers: {
    setHabits: (state, action: {payload: {habits: ILocalHabit[]}}) => {
      state.habits = action.payload.habits;
    },

    completeDay: (
      state,
      action: PayloadAction<{habitIndex: number; date: string}>,
    ) => {
      const {habitIndex, date} = action.payload;
      const habit = state.habits[habitIndex];
      if (habit && !habit.completedDates.includes(date)) {
        const newCompletedDates = [...habit.completedDates, date];
        state.habits[habitIndex] = {
          ...habit,
          completedDates: newCompletedDates,
        };
      }
    },
  },
});

export const {setHabits, completeDay} = habitsSlice.actions;

export default habitsSlice.reducer;
