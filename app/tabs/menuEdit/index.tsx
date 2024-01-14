import React from 'react';
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
  if (menus && menus.length > 0) {
    return (
      <FlatList
        data={menus}
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
