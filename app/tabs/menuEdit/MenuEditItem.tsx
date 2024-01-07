import {StyleSheet, Text} from 'react-native';
import React from 'react';
import {IMenuItem} from '.';

interface IMenuEditItemProps {
  item: IMenuItem;
}

export default function MenuEditItem({item}: IMenuEditItemProps) {
  return <Text style={styles.label}>{item.name}</Text>;
}

const styles = StyleSheet.create({
  label: {
    fontSize: 14,
    fontWeight: '400',
    color: '#000',
  },
});
