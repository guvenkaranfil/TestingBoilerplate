import {StyleSheet, TextInput, TextInputProps, View} from 'react-native';
import React, {useEffect} from 'react';
import {useAppDispatch, useAppSelector} from '../../store';
import {IInputState, updateInput} from '../../store/inputsSlice';
import HabitText, {TextTypes} from '../habitText';
import colors from '../../utils/colors';

interface IOptionalInput {
  mt?: number;
}

interface IInput {
  label: string;
  inputName: keyof IInputState;
}

type InputProps = Partial<Omit<TextInputProps, keyof IInput>> &
  Required<IInput>;

export default function Input({
  mt,
  label,
  inputName,
  ...otherProps
}: InputProps & IOptionalInput) {
  const inputs = useAppSelector(store => store.inputs);
  const dispatch = useAppDispatch();

  useEffect(() => {
    return () => {
      dispatch(updateInput({name: inputName, value: ''}));
    };
  }, [inputName, dispatch]);

  return (
    <View style={{marginTop: mt}}>
      <HabitText text={label} type={TextTypes.caption} color="blueTertiary" />
      <TextInput
        style={styles.input}
        onChangeText={(text: string) =>
          dispatch(updateInput({name: inputName, value: text}))
        }
        value={inputs[inputName]}
        {...otherProps}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  input: {
    paddingHorizontal: 8,
    marginTop: 4,
    width: '100%',
    height: 45,
    borderRadius: 8,
    backgroundColor: '#fff',
    color: colors.bluePrimary,
    fontFamily: 'Roboto-Regular',
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 1,
    },
    shadowOpacity: 0.18,
    shadowRadius: 1.0,

    elevation: 1,
  },
});
