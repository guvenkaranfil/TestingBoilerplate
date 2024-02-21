import {createSlice} from '@reduxjs/toolkit';
import {IHabit} from '../habitMe/habitCreate/habit';

export interface IHabitsState {
  habits: IHabit[];
}

const initialState: IHabitsState = {
  habits: [],
};

const habitsSlice = createSlice({
  name: 'habits',
  initialState,
  reducers: {
    setHabits: (state, action: {payload: {habits: IHabit[]}}) => {
      return {
        ...state,
        habits: action.payload.habits,
      };
    },
  },
});

export const {setHabits} = habitsSlice.actions;

export default habitsSlice.reducer;
