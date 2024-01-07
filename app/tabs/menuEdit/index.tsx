import React, {useState} from 'react';
import {FlatList} from 'react-native';
import MenuEditItem from './MenuEditItem';

export interface IMenuItem {
  id: string;
  name: string;
  isActive: boolean;
}

interface IMenuEditProps {
  menus?: IMenuItem[];
}

export default function MenuEdit({menus}: IMenuEditProps) {
  const _sortedMenus = menus?.sort((a, b) => a.name.localeCompare(b.name));
  const [sortedMenus, setsortedMenus] = useState(_sortedMenus);

  const checkItem = (item: IMenuItem, status: boolean) => {
    const updatedMenus = sortedMenus?.map(menu => {
      if (menu.id === item.id) {
        return {
          ...menu,
          isActive: status,
        };
      }
      return menu;
    });
    setsortedMenus(updatedMenus);
  };

  if (sortedMenus && sortedMenus.length > 0) {
    return (
      <FlatList
        data={sortedMenus}
        renderItem={({item}) => (
          <MenuEditItem item={item} onPress={checkItem} />
        )}
      />
    );
  }

  return null;
}
