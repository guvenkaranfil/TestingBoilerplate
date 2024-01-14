import {createSlice, PayloadAction} from '@reduxjs/toolkit';
import {IMenuItem} from '../tabs/menuEdit';

export interface IUser {
  token?: string;
  refreshToken?: string;
  userName?: string;
  menus?: IMenuItem[];
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
    setMenus: (state, action: PayloadAction<IMenuItem[]>) => {
      return {...state, menus: action.payload};
    },
    checkMenuItem: (
      state,
      action: PayloadAction<{id: string; status: boolean}>,
    ) => {
      const {id, status} = action.payload;
      const updatedMenus = state.menus?.map(menu => {
        if (menu.id === id) {
          return {
            ...menu,
            isActive: status,
          };
        }
        return menu;
      });

      return {...state, menus: updatedMenus};
    },
  },
});

export const {setUser, setMenus, checkMenuItem} = userSlice.actions;

export default userSlice.reducer;
