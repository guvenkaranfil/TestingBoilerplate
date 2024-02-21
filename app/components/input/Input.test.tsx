import React from 'react';

import Input from '.';
import {fireEvent, render, screen} from '../../../.jest/helper/testUtils';
import store from '../../store';

describe('Input', () => {
  test('should be able set and get texts', () => {
    render(
      <Input
        inputName="name"
        label="Enter Habit Name"
        placeholder="enter name"
      />,
    );

    const nameInput = screen.getByPlaceholderText(/enter name/i);
    expect(nameInput).toBeOnTheScreen();

    fireEvent.changeText(nameInput, 'Test Habit Name');
    expect(nameInput.props.value).toBe('Test Habit Name');
    expect(store.getState().inputs.name).toEqual('Test Habit Name');

    screen.unmount();
    expect(store.getState().inputs.name).toEqual('');
  });
});
