import {useNavigation} from '@react-navigation/native';
import React, {useEffect} from 'react';
import {Pressable, StyleSheet, Text, View} from 'react-native';
import {createHabit} from './helpers';
import Input from '../../components/input';

export default function HabitCreate() {
  const navigation = useNavigation();

  console.log('HabitCreate:');

  const submitButton = () => (
    <Pressable onPress={() => createHabit()}>
      <Text>Save</Text>
    </Pressable>
  );

  useEffect(() => {
    navigation.setOptions({
      headerLeft: () => (
        <Pressable onPress={() => navigation.goBack()}>
          <Text>Vazgeç</Text>
        </Pressable>
      ),
      headerRight: () => submitButton(),
      title: 'Create Habit',
      presentation: 'modal',
    });
  }, [navigation]);

  const renderSubmitButtonForTesting = () => submitButton();

  return (
    <View style={styles.container}>
      <View style={{}}>
        <Input
          mt={16}
          label="Name"
          placeholder={'Enter Name'}
          inputName="name"
        />
        <Input
          mt={16}
          label="Description"
          placeholder={'Enter Description'}
          inputName="description"
        />
      </View>

      {process.env.NODE_ENV === 'test' && renderSubmitButtonForTesting()}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    backgroundColor: '#F6F6F9',
    flex: 1,
    paddingHorizontal: 16,
  },
});

/*

  UI
    - Show name, description inputs and submit button

  UI  Logic
    - Input validation
    - Error validation messages

  Business Logic
    - Create Habit Object
    - Save Habit to Storage
      - If successfull;
        - Update Habit List
      - IF error happens
        - Show error Message

*/

/*
  Spacing
  xLarge: 32,
  large: 16
  medium: 8
  small: 4

*/

/*
  h1:
  h2:
  h3:
  h4:
  caption:

*/
