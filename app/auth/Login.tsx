import React from 'react';
import {View, Text, Button, StyleSheet} from 'react-native';
import {useAppDispatch} from '../store';
import {setUser} from '../store/userSlice';

const Login = () => {
  const dispatch = useAppDispatch();

  return (
    <View style={styles.container}>
      <Text>Login</Text>
      <Button
        title={'Go to Home'}
        onPress={() => {
          dispatch(
            setUser({
              token: 'token',
              refreshToken: 'refreshToken',
              userName: 'userName',
            }),
          );
        }}
      />
    </View>
  );
};

export default Login;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
});
