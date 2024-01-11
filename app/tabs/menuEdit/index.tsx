import React, {useCallback, useState} from 'react';
import {FlatList} from 'react-native';
import MenuEditItem from './MenuEditItem';
import {MOCK_MENU_ITEMS} from '../../../__mocks__';

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
  const _sortedMenus = menus?.sort((a, b) => a.name.localeCompare(b.name));
  const [sortedMenus, setsortedMenus] = useState(_sortedMenus);

  const checkItem = useCallback((id: string, status: boolean) => {
    const updatedMenus = sortedMenus?.map(menu => {
      if (menu.id === id) {
        return {
          ...menu,
          isActive: status,
        };
      }
      return menu;
    });
    setsortedMenus(updatedMenus);

    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  if (sortedMenus && sortedMenus.length > 0) {
    return (
      <FlatList
        data={sortedMenus}
        renderItem={({item}) => (
          <MenuEditItem
            {...item}
            onPress={checkItem}
            onRenderItemCallback={onRenderItemCallback}
          />
        )}
      />
    );
  }

  return null;
}
