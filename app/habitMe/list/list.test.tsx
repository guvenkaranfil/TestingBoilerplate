import React from 'react';
import {
  fireEvent,
  render,
  screen,
  userEvent,
} from '../../../.jest/helper/testUtils';

import Navigation from '../../navigation';
import {clearAllStorage} from '../../storage/localStorage';
import {setGlobalState} from '../../storage/globalStorage';
import store from '../../store';
import * as DateHelper from '../../DateHelper';
import * as HabitsSlice from '../../store/habitsSlice';

jest.mock('@react-navigation/native', () => {
  const actualNav = jest.requireActual('@react-navigation/native');
  return {
    ...actualNav,
  };
});

const nameInputText = 'Test Habit Name';
describe('Habit List', () => {
  beforeEach(() => {
    clearAllStorage();
  });
  beforeAll(() => {
    clearAllStorage();
    jest.useFakeTimers();
  });

  test('should create a habit and show on the list', async () => {
    render(<Navigation />);

    await createAnyHabit(nameInputText);

    expect(await screen.findByText(nameInputText)).toBeOnTheScreen();

    screen.unmount();

    setGlobalState('habits/setHabits', {habits: []});
    render(<Navigation />);
    expect(await screen.findByText(nameInputText)).toBeOnTheScreen();
  });

  test('should complete a habit for the day', async () => {
    const currentDate = new Date('2021-01-01');
    jest.spyOn(DateHelper, 'getCurrentTime').mockReturnValue(currentDate);
    const spyOnHabitsSlice = jest.spyOn(HabitsSlice, 'completeDay');
    render(<Navigation />);

    await createAnyHabit('Read 30 Pages');

    const habitButton = await screen.findByText('Read 30 Pages');
    expect(habitButton).toBeOnTheScreen();
    await userEvent.press(habitButton);

    const habit = store.getState().habitsSlice.habits[0];
    expect(habit.name).toEqual('Read 30 Pages');
    expect(habit.completedDates.length).toEqual(1);
    expect(habit.completedDates[0]).toEqual(currentDate.toISOString());
    expect(spyOnHabitsSlice).toHaveBeenCalledTimes(1);
  });
});

const createAnyHabit = async (name: string) => {
  fireEvent.press(screen.getByText('Create'));

  const nameInput = screen.getByPlaceholderText(/enter name/i);
  const saveButton = await screen.findByText(/habitme/i);
  expect(saveButton).toBeOnTheScreen();

  fireEvent.changeText(nameInput, name);

  await userEvent.press(saveButton);
};
