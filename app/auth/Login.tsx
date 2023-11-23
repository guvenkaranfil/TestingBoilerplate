import React from 'react';
import {useNavigation} from '@react-navigation/native';
import {View, Text, Button, StyleSheet} from 'react-native';

const Login = () => {
  const navigation = useNavigation();
  return (
    <View style={styles.container}>
      <Text>Login</Text>
      <Button
        title={'Home'}
        onPress={() => {
          navigation.navigate('home');
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
