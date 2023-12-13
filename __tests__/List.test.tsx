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
});
