import React from 'react';
import {NavigationContainer} from '@react-navigation/native';
import {createNativeStackNavigator} from '@react-navigation/native-stack';
const Stack = createNativeStackNavigator();

import Login from '../auth/Login';
import Home from '../tabs/Home';
import {useAppSelector} from '../store';

const Navigation = () => {
  const isLoggedIn = useAppSelector(state => state.user.token);

  return (
    <NavigationContainer>
      <Stack.Navigator>
        {isLoggedIn ? (
          <Stack.Screen name={'home'} component={Home} />
        ) : (
          <Stack.Screen name={'login'} component={Login} />
        )}
      </Stack.Navigator>
    </NavigationContainer>
  );
};

export default Navigation;
