import React from 'react';
import {FlatList, Pressable, Text, View} from 'react-native';
import dayjs from 'dayjs';

import {useAppDispatch, useAppSelector} from '../../store';
import {getCurrentTime} from '../../DateHelper';
import {completeDay} from '../../store/habitsSlice';

export default function List({}) {
  const habits = useAppSelector(state => state.habitsSlice.habits);
  const dispatch = useAppDispatch();

  const onPressComplete = (index: number) => {
    const currentDate = getCurrentTime();

    dispatch(completeDay({habitIndex: index, date: currentDate.toISOString()}));
    console.log(`habits[${index}]: `, habits[index]);
  };

  return (
    <View>
      <FlatList
        data={habits}
        renderItem={({item, index}) => (
          <Pressable onPress={() => onPressComplete(index)}>
            <Text>{item.name}</Text>
            <Text>{dayjs(getCurrentTime()).toString()}</Text>
            <Text>--------------------------</Text>
          </Pressable>
        )}
      />
    </View>
  );
}
