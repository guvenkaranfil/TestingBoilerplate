import React from 'react';
import {Pressable, StyleSheet, Text, View} from 'react-native';

interface IMenuEditItemProps {
  id: string;
  name: string;
  isActive: boolean;
  onPress: (item: string, status: boolean) => void;
  onRenderItemCallback?: () => void;
}

const CheckBox = ({isActive, id}: {isActive: boolean; id: string}) => {
  return (
    <View
      testID={(isActive ? 'checked' : 'unChecked') + '-' + id}
      style={styles.checkboxContainer}>
      <Text>{isActive ? '✅' : '❌'}</Text>
    </View>
  );
};

function MenuEditItem({
  id,
  isActive,
  name,
  onPress,
  onRenderItemCallback,
}: IMenuEditItemProps) {
  if (process.env.NODE_ENV === 'test') {
    onRenderItemCallback?.();
  }

  return (
    <Pressable testID={id} onPress={() => onPress(id, !isActive)}>
      <View style={styles.container}>
        <CheckBox id={id} isActive={isActive} />
        <Text style={styles.label}>{name}</Text>
      </View>
    </Pressable>
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

export default React.memo(MenuEditItem);
