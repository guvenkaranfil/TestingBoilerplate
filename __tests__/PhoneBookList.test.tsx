import React from 'react';
import {render, screen, userEvent} from '../.jest/helper/testUtils';
import PhoneBookList from '../app/tabs/phoneBook/PhoneBookList';

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

  test('should show loader while data is loading and hide when is finished', () => {
    render(<PhoneBookList data={undefined} isLoading={true} />);

    expect(screen.getByTestId('loader')).toBeOnTheScreen();
    expect(screen.queryByText('No Data')).not.toBeOnTheScreen();

    screen.rerender(<PhoneBookList data={undefined} isLoading={false} />);
    expect(screen.queryByTestId('loader')).not.toBeOnTheScreen();
    expect(screen.getByText('No Data')).toBeOnTheScreen();
  });
});
