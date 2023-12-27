import React, {useState} from 'react';
import {Text, TextInput, View} from 'react-native';

interface PhoneBookUser {
  name: string;
  phoneNumber: string;
}
interface IPhoneBookList {
  data?: Array<PhoneBookUser>;
}

const PhoneBookList = ({data}: IPhoneBookList) => {
  const [name, setname] = useState('');

  return (
    <View>
      <TextInput
        placeholder="Search Name"
        value={name}
        onChangeText={setname}
      />
      {(!data || data?.length === 0) && <Text>No Data</Text>}
    </View>
  );
};

import {render, screen, userEvent} from '../.jest/helper/testUtils';
describe('PhoneBook List with Search functionality', () => {
  test('should component render correctly', () => {
    render(<PhoneBookList />);
  });

  test('should be able to type to input', async () => {
    render(<PhoneBookList />);

    const input = screen.getByPlaceholderText('Search Name');
    expect(input.props.value).toBe('');

    await userEvent.type(input, 'test');
    expect(input.props.value).toBe('test');

    await userEvent.clear(input);
    expect(input.props.value).toBe('');

    await userEvent.type(input, 'test with clear');
    expect(input.props.value).toBe('test with clear');
  });

  test('should show a message on empty list', () => {
    render(<PhoneBookList data={undefined} />);

    expect(screen.getByText('No Data')).toBeTruthy();

    screen.rerender(<PhoneBookList data={[]} />);
    expect(screen.getByText('No Data')).toBeTruthy();
  });
});
