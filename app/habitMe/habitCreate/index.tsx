import {useNavigation} from '@react-navigation/native';
import React, {useEffect} from 'react';
import {Pressable, StyleSheet, Text, View} from 'react-native';
import {createHabit} from './helpers';
import Input from '../../components/input';
import HabitText, {TextTypes} from '../../components/habitText';
import colors from '../../utils/colors';

export default function HabitCreate() {
  const navigation = useNavigation();

  useEffect(() => {
    navigation.setOptions({
      headerLeft: () => (
        <Pressable onPress={navigation.goBack}>
          <Text>Vazgeç</Text>
        </Pressable>
      ),
      title: 'Create Habit',
      presentation: 'modal',
    });
  }, [navigation]);

  return (
    <View style={styles.container}>
      <Input mt={16} label="Name" placeholder={'Enter Name'} inputName="name" />
      <Input
        mt={16}
        label="Description"
        placeholder={'Enter Description'}
        inputName="description"
      />

      <Pressable style={styles.submitButton} onPress={createHabit}>
        <HabitText
          text="HabitME"
          fontWeight="500"
          color="white"
          type={TextTypes.h3}
        />
      </Pressable>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    backgroundColor: '#F6F6F9',
    flex: 1,
    paddingHorizontal: 16,
  },
  submitButton: {
    marginTop: 32,
    alignItems: 'center',
    justifyContent: 'center',
    height: 40,
    backgroundColor: colors.greenSecondary,
    opacity: 0.9,
    borderRadius: 32,
  },
});
