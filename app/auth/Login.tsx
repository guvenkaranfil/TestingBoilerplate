import React from 'react';
import {View, Text, Button, StyleSheet} from 'react-native';

const Login = ({setUserLoggedIn}: {setUserLoggedIn: () => void}) => {
  return (
    <View style={styles.container}>
      <Text>Login</Text>
      <Button
        title={'Go to Home'}
        onPress={() => {
          setUserLoggedIn();
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
