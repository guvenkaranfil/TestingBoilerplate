import React, {useState} from 'react';
import {NavigationContainer} from '@react-navigation/native';
import {createNativeStackNavigator} from '@react-navigation/native-stack';
const Stack = createNativeStackNavigator();

import Login from '../auth/Login';
import Home from '../tabs/Home';

interface INavigation {
  isLoggedIn: boolean;
}

const Navigation = ({isLoggedIn}: INavigation) => {
  const [loggedIn, setloggedIn] = useState(isLoggedIn);

  return (
    <NavigationContainer>
      <Stack.Navigator>
        {loggedIn ? (
          <Stack.Screen name={'home'} component={Home} />
        ) : (
          <Stack.Screen name={'login'}>
            {props => (
              <Login {...props} setUserLoggedIn={() => setloggedIn(true)} />
            )}
          </Stack.Screen>
        )}
      </Stack.Navigator>
    </NavigationContainer>
  );
};

export default Navigation;
