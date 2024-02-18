import {StyleSheet, Text, TextInput, TextInputProps, View} from 'react-native';
import React from 'react';
import {useAppDispatch, useAppSelector} from '../../store';
import {IInputState, updateInput} from '../../store/inputsSlice';

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

  return (
    <View style={{marginTop: mt}}>
      <Text>{label}</Text>
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
