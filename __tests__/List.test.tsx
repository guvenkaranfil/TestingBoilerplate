import React, {useState} from 'react';
import {render, screen, userEvent} from '../.jest/helper/testUtils';
import {TextInput} from 'react-native';

const List = () => {
  const [name, setname] = useState('');

  return (
    <TextInput placeholder="Search Name" value={name} onChangeText={setname} />
  );
};

describe('List component with search functionality use cases', () => {
  test('should List component render correctly', () => {
    render(<List />);
  });

  test('should be able to type to input', async () => {
    render(<List />);

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
