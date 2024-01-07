import React from 'react';
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
  const sortedMenus = menus?.sort((a, b) => a.name.localeCompare(b.name));

  if (sortedMenus && sortedMenus.length > 0) {
    return (
      <FlatList
        data={sortedMenus}
        renderItem={({item}) => <MenuEditItem item={item} />}
      />
    );
  }

  return null;
}
