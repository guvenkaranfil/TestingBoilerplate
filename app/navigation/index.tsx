import React, {useEffect} from 'react';
import {NavigationContainer} from '@react-navigation/native';
import {createNativeStackNavigator} from '@react-navigation/native-stack';

import HabitCreate from '../habitMe/habitCreate';
import List from '../habitMe/list';
import {habitsKey} from '../constants/storageVariables';
import {IHabit} from '../habitMe/habitCreate/habit';
import {get} from '../storage/localStorage';
import {useDispatch} from 'react-redux';
import HabitButton from '../components/habitButton';

const Stack = createNativeStackNavigator();

export type RouteParams = {
  list: undefined;
  habitCreate: undefined;
};

const Navigation = () => {
  const dispatch = useDispatch();

  useEffect(() => {
    const getHabitList = (): IHabit[] => {
      return JSON.parse(get(habitsKey) ?? '[]');
    };

    dispatch({type: 'habits/setHabits', payload: {habits: getHabitList()}});
  }, [dispatch]);

  return (
    <NavigationContainer>
      <Stack.Navigator>
        <Stack.Screen
          name={'list'}
          options={{
            title: 'HabitME',
            headerRight: () => (
              <HabitButton
                type="navigate"
                screen="habitCreate"
                labelProps={{text: 'Create'}}
              />
            ),
          }}
          component={List}
        />
        <Stack.Screen
          name={'habitCreate'}
          options={{
            title: 'Create Habit',
            presentation: 'modal',
            headerLeft: () => (
              <HabitButton
                type="goBack"
                screen="list"
                labelProps={{text: 'Vazgeç'}}
              />
            ),
          }}
          component={HabitCreate}
        />
      </Stack.Navigator>
    </NavigationContainer>
  );
};

export default Navigation;
