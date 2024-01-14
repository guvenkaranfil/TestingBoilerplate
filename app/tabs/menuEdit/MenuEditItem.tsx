import React from 'react';
import {Pressable, StyleSheet, Text, View} from 'react-native';
import {useAppDispatch, useAppSelector} from '../../store';
import {checkMenuItem} from '../../store/userSlice';

interface IMenuEditItemProps {
  id: string;
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

function MenuEditItem({id, onRenderItemCallback}: IMenuEditItemProps) {
  if (process.env.NODE_ENV === 'test') {
    onRenderItemCallback?.();
  }

  const dispatch = useAppDispatch();
  const item = useAppSelector(state =>
    state.user.menus?.find(menuItem => menuItem.id === id),
  );

  const onPressItem = () => {
    dispatch(checkMenuItem({id: id, status: !item!.isActive}));
  };

  if (!item) {
    return null;
  }

  return (
    <Pressable testID={id} onPress={onPressItem}>
      <View style={styles.container}>
        <CheckBox id={id} isActive={item.isActive} />
        <Text style={styles.label}>{item.name}</Text>
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

export default MenuEditItem;
