import React from 'react';
import {NavigationContainer} from '@react-navigation/native';
import {createNativeStackNavigator} from '@react-navigation/native-stack';

import HabitCreate from '../habitMe/habitCreate';

const Stack = createNativeStackNavigator();
const Navigation = () => {
  return (
    <NavigationContainer>
      <Stack.Navigator>
        <Stack.Screen
          name={'habitCreate'}
          options={{
            title: 'Create Habit',
            presentation: 'modal',
          }}
          component={HabitCreate}
        />
      </Stack.Navigator>
    </NavigationContainer>
  );
};

export default Navigation;
