import {createSlice} from '@reduxjs/toolkit';

export interface IInputState {
  name: string;
  description: string;
}

const initialState: IInputState = {
  name: '',
  description: '',
};

const inputSlice = createSlice({
  name: 'inputs',
  initialState,
  reducers: {
    updateInput: (state, action: {payload: {name: string; value: string}}) => {
      const {name, value} = action.payload;

      return {
        ...state,
        [name]: value,
      };
    },

    resetInputs: () => {
      return initialState;
    },
  },
});

export const {updateInput, resetInputs} = inputSlice.actions;

export default inputSlice.reducer;
