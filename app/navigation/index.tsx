import React from 'react';
import {NavigationContainer} from '@react-navigation/native';
import {createNativeStackNavigator} from '@react-navigation/native-stack';
const Stack = createNativeStackNavigator();

import Login from '../auth/Login';
import Home from '../tabs/Home';
import {useAppSelector} from '../store';

interface INavigation {}

const Navigation = ({}: INavigation) => {
  const isLoggedIn = useAppSelector(state => state.user.token);

  return (
    <NavigationContainer>
      <Stack.Navigator>
        {isLoggedIn ? (
          <Stack.Screen name={'home'} component={Home} />
        ) : (
          <Stack.Screen name={'login'}>
            {props => <Login {...props} setUserLoggedIn={() => {}} />}
          </Stack.Screen>
        )}
      </Stack.Navigator>
    </NavigationContainer>
  );
};

export default Navigation;
