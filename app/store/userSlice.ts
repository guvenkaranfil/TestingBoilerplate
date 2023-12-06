import {createSlice, PayloadAction} from '@reduxjs/toolkit';

export interface IUser {
  token?: string;
  refreshToken?: string;
  userName?: string;
}

export const initialState: IUser = {
  token: undefined,
  refreshToken: undefined,
  userName: undefined,
};

export const userSlice = createSlice({
  name: 'user',
  initialState: initialState,
  reducers: {
    setUser: (state, action: PayloadAction<IUser>) => {
      return {...state, ...action.payload};
    },
  },
});

export const {setUser} = userSlice.actions;

export default userSlice.reducer;
