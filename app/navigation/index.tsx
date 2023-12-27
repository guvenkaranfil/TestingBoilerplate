import React from 'react';
import {NavigationContainer} from '@react-navigation/native';
import {createNativeStackNavigator} from '@react-navigation/native-stack';
import {useAppSelector} from '../store';

import Login from '../auth/Login';
import Home from '../tabs/Home';
import PhoneBook from '../tabs/phoneBook';

const Stack = createNativeStackNavigator();
const Navigation = () => {
  const isLoggedIn = useAppSelector(state => state.user.token);

  return (
    <NavigationContainer>
      <Stack.Navigator>
        {isLoggedIn ? (
          <>
            <Stack.Screen name={'home'} component={Home} />
            <Stack.Screen name={'phonebook'} component={PhoneBook} />
          </>
        ) : (
          <Stack.Screen name={'login'} component={Login} />
        )}
      </Stack.Navigator>
    </NavigationContainer>
  );
};

export default Navigation;
