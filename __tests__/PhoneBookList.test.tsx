import React, {useState} from 'react';
import {TextInput} from 'react-native';

const PhoneBookList = () => {
  const [name, setname] = useState('');

  return (
    <TextInput placeholder="Search Name" value={name} onChangeText={setname} />
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
});
