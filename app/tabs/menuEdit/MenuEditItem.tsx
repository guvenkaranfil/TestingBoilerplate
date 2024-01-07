import {StyleSheet, Text, View} from 'react-native';
import React from 'react';
import {IMenuItem} from '.';

interface IMenuEditItemProps {
  item: IMenuItem;
}

const CheckBox = ({isActive}: {isActive: boolean}) => {
  return (
    <View
      testID={isActive ? 'checked' : 'unChecked'}
      style={styles.checkboxContainer}>
      {isActive && <Text>✅</Text>}
    </View>
  );
};

export default function MenuEditItem({item}: IMenuEditItemProps) {
  return (
    <View style={styles.container}>
      <CheckBox isActive={item.isActive} />
      <Text style={styles.label}>{item.name}</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    padding: 10,
  },
  label: {
    fontSize: 14,
    fontWeight: '400',
    color: '#000',
  },
  checkboxContainer: {
    width: 30,
    height: 30,
  },
  checkedBoxBackground: {
    backgroundColor: '#fff',
  },
  unCheckedBoxBackground: {
    backgroundColor: '#000',
  },
});
