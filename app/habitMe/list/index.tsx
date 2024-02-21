import React from 'react';
import {FlatList, Text, View} from 'react-native';

import {useAppSelector} from '../../store';

export default function List() {
  const habits = useAppSelector(state => state.habitsSlice.habits);

  return (
    <View>
      <FlatList
        data={habits}
        renderItem={({item}) => <Text>{item.name}</Text>}
      />
    </View>
  );
}
