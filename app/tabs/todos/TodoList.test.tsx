import React from 'react';
import TodoList from '.';
import {render, screen, userEvent} from '../../../.jest/helper/testUtils';

const mockTodo = {
  userId: 1,
  id: 1,
  title: 'Test Todo',
  completed: false,
};

jest.mock('./service', () => {
  return {
    ...jest.requireActual('./service'),
    getTodos: jest.fn(() => Promise.resolve(mockTodo)), // Assuming getTodos returns a Promise
  };
});

describe('TodoList', () => {
  beforeEach(() => jest.useFakeTimers());

  test('should list todo items', async () => {
    const service = require('./service');
    const spyTrackTodo = jest
      .spyOn(require('./service'), 'trackTodo')
      .mockReturnValue(false);
    render(<TodoList />);

    expect(await screen.findByText('Test Todo')).toBeOnTheScreen();
    expect(spyTrackTodo).not.toHaveBeenCalled();
    expect(service.getTodos).toHaveBeenCalledTimes(1);

    const todoItem = await screen.findByText('Test Todo');
    await userEvent.press(todoItem);

    expect(spyTrackTodo).toHaveBeenCalledWith(mockTodo);
    expect(spyTrackTodo).toHaveBeenCalledTimes(1);
  });
});
