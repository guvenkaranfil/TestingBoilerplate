import React, {useEffect} from 'react';
import {FlatList} from 'react-native';
import MenuEditItem from './MenuEditItem';
import {MOCK_MENU_ITEMS} from '../../../__mocks__';
import {useAppDispatch} from '../../store';
import {setMenus} from '../../store/userSlice';

export interface IMenuItem {
  id: string;
  name: string;
  isActive: boolean;
}

interface IMenuEditProps {
  menus?: IMenuItem[];
  onRenderItemCallback?: () => void;
}

export default function MenuEdit({
  menus = MOCK_MENU_ITEMS,
  onRenderItemCallback,
}: IMenuEditProps) {
  const dispatch = useAppDispatch();
  const sortedMenus = [...menus]?.sort((a, b) => a.name.localeCompare(b.name));

  useEffect(() => {
    dispatch(setMenus(sortedMenus));
  }, [dispatch, sortedMenus]);

  if (sortedMenus && sortedMenus.length > 0) {
    return (
      <FlatList
        data={sortedMenus}
        renderItem={({item}) => (
          <MenuEditItem
            id={item.id}
            onRenderItemCallback={onRenderItemCallback}
          />
        )}
      />
    );
  }

  return null;
}
