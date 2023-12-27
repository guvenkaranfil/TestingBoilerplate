import React from 'react';
import {View, Text, StyleSheet, Button} from 'react-native';
import {useAppDispatch} from '../store';
import {setUser} from '../store/userSlice';
import {useNavigation} from '@react-navigation/native';

const Home = () => {
  const dispatch = useAppDispatch();
  const navigation = useNavigation<any>();

  return (
    <View style={styles.container}>
      <Text>Home</Text>
      <Button
        title={'Phone Book'}
        onPress={() => navigation.navigate('phonebook')}
      />

      <Button
        title={'Logout'}
        onPress={() => {
          dispatch(
            setUser({
              token: undefined,
              refreshToken: undefined,
              userName: undefined,
            }),
          );
        }}
      />
    </View>
  );
};

export default Home;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
});
