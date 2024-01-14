import {createSlice, PayloadAction} from '@reduxjs/toolkit';
import {IMenuItem} from '../tabs/menuEdit';
import {MOCK_MENU_ITEMS} from '../../__mocks__';

export interface IUser {
  menus?: IMenuItem[];
}

const sortedMenus = [...MOCK_MENU_ITEMS]?.sort((a, b) =>
  a.name.localeCompare(b.name),
);
export const initialState: IUser = {
  menus: sortedMenus,
};

export const userSlice = createSlice({
  name: 'user',
  initialState: initialState,
  reducers: {
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

export const {setMenus, checkMenuItem} = userSlice.actions;

export default userSlice.reducer;
