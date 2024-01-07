import {FlatList, Text} from 'react-native';
import React from 'react';

export interface IMenuItem {
  id: string;
  name: string;
  isActive: boolean;
}

interface IMenuEditProps {
  menus?: IMenuItem[];
}

export default function MenuEdit({menus}: IMenuEditProps) {
  if (menus && menus.length > 0) {
    return (
      <FlatList
        data={menus}
        renderItem={({item}) => <Text>{item.name}</Text>}
      />
    );
  }

  return null;
}
