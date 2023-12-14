import React from 'react';
import {render, screen, userEvent} from '../.jest/helper/testUtils';
import List from '../app/components/List';

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

  test('should be shown a message on empty or undefined list data', () => {
    render(<List data={undefined} />);

    expect(screen.getByText('No Data')).toBeTruthy();

    screen.rerender(<List data={[]} />);
    expect(screen.getByText('No Data')).toBeTruthy();
  });

  test('should show loader while data is loading and hide when is finished', () => {
    render(<List data={undefined} isLoading={true} />);

    expect(screen.getByTestId('loader')).toBeOnTheScreen();

    screen.rerender(<List data={undefined} isLoading={false} />);
    expect(screen.queryByTestId('loader')).not.toBeOnTheScreen();
  });

  test('should show data on non-empty data list with handling loading', () => {
    const names = [{name: 'test'}, {name: 'test2'}];
    render(<List data={names} isLoading={true} />);

    expect(screen.getByTestId('loader')).toBeOnTheScreen();
    expect(screen.queryByText(/test/i)).not.toBeOnTheScreen();

    screen.rerender(<List data={names} isLoading={false} />);
    expect(screen.queryByTestId('loader')).not.toBeOnTheScreen();

    names.forEach(({name}) => {
      const textElement = screen.getByText(name);
      expect(textElement.props.children).toEqual(name);
    });
    expect(screen.queryAllByText(/test/i)).toHaveLength(2);
  });
});
