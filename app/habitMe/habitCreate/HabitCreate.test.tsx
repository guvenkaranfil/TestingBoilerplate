import React from 'react';

import HabitCreate from '.';
import {render, screen, fireEvent} from '../../../.jest/helper/testUtils';
import * as helpers from './helpers'; // Assuming createHabit is imported from a file named helpers.js

describe('Habit Create Page', () => {
  test('should be able to type name and description inputs', () => {
    render(<HabitCreate />);

    const nameInput = screen.getByPlaceholderText(/enter name/i);
    const descriptionInput = screen.getByPlaceholderText(/enter description/i);
    expect(nameInput).toBeOnTheScreen();
    expect(descriptionInput).toBeOnTheScreen();

    fireEvent.changeText(nameInput, 'Test Habit Name');
    fireEvent.changeText(descriptionInput, 'Test Habit Description');

    expect(nameInput.props.value).toBe('Test Habit Name');
    expect(descriptionInput.props.value).toBe('Test Habit Description');
  });
  test('should create a new habit', async () => {
    const createHabitSpy = jest.spyOn(helpers, 'createHabit');
    render(<HabitCreate />);

    const nameInput = screen.getByPlaceholderText(/enter name/i);
    const descriptionInput = screen.getByPlaceholderText(/enter description/i);
    const saveButton = await screen.findByText(/habitme/i);
    expect(saveButton).toBeOnTheScreen();

    fireEvent.changeText(nameInput, 'Test Habit Name');
    fireEvent.changeText(descriptionInput, 'Test Habit Description');
    fireEvent.press(saveButton);

    expect(createHabitSpy).toHaveBeenCalledTimes(1);
  });
});
