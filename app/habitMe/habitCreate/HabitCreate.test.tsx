import React from 'react';
import HabitCreate from '.';
import {render, screen, fireEvent} from '../../../.jest/helper/testUtils';
import * as helpers from './helpers';
import {clearAllStorage, get} from '../../storage/localStorage';
import {IHabit} from './habit';

const nameInputText = 'Test Habit Name';
const descriptionInputText = 'Test Habit Description';
describe('Habit Create Page', () => {
  let habitsKey = 'testHabits';

  beforeAll(() => {
    clearAllStorage();
  });

  test('should be able to type name and description inputs', () => {
    render(<HabitCreate />);

    const nameInput = screen.getByPlaceholderText(/enter name/i);
    const descriptionInput = screen.getByPlaceholderText(/enter description/i);
    expect(nameInput).toBeOnTheScreen();
    expect(descriptionInput).toBeOnTheScreen();

    fireEvent.changeText(nameInput, nameInputText);
    fireEvent.changeText(descriptionInput, descriptionInputText);

    expect(nameInput.props.value).toBe(nameInputText);
    expect(descriptionInput.props.value).toBe(descriptionInputText);
  });

  test('should create a new habit', async () => {
    const createHabitSpy = jest.spyOn(helpers, 'createHabit');
    render(<HabitCreate />);

    const nameInput = screen.getByPlaceholderText(/enter name/i);
    const descriptionInput = screen.getByPlaceholderText(/enter description/i);
    const saveButton = await screen.findByText(/habitme/i);
    expect(saveButton).toBeOnTheScreen();

    fireEvent.changeText(nameInput, nameInputText);
    fireEvent.changeText(descriptionInput, descriptionInputText);
    fireEvent.press(saveButton);

    expect(createHabitSpy).toHaveBeenCalledTimes(1);

    const localHabits = JSON.parse(get(habitsKey) ?? '[]') as IHabit[];
    expect(localHabits.length).toBe(1);
    expect(localHabits[0].name).toBe(nameInputText);
    expect(localHabits[0].description).toBe(descriptionInputText);
  });
});
