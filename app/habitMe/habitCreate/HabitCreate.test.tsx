import React from 'react';
import HabitCreate from '.';
import {render, screen, fireEvent} from '../../../.jest/helper/testUtils';
import * as helpers from './helpers';
import {clearAllStorage, get} from '../../storage/localStorage';
import {IHabit, StreakGoal} from './habit';
import Toast from 'react-native-toast-message';
import * as DateHelper from '../../DateHelper';
import * as HabitsSlice from '../../store/habitsSlice';

const nameInputText = 'Test Habit Name';
const descriptionInputText = 'Test Habit Description';

describe('Habit Create Page', () => {
  beforeAll(clearAllStorage);

  test('should createHabit return false on empty name', async () => {
    const status = await helpers.createHabit();
    expect(status).toBe(false);
  });

  test('should show warning message on empty name input', async () => {
    const alertSpy = jest.spyOn(Toast, 'show');
    render(<HabitCreate />);

    const saveButton = screen.getByText(/habitme/i);
    fireEvent.press(saveButton);

    expect(alertSpy).toHaveBeenCalledTimes(1);
  });

  test('should create a new habit with a name and description', async () => {
    const currentDate = new Date('2021-01-01');
    jest.spyOn(DateHelper, 'getCurrentTime').mockReturnValue(currentDate);
    jest.spyOn(HabitsSlice, 'completeDay');
    const createHabitSpy = jest.spyOn(helpers, 'createHabit');
    render(<HabitCreate />);

    fulFillHabitInputs(nameInputText, descriptionInputText);
    const saveButton = screen.getByText(/habitme/i);
    fireEvent.press(saveButton);

    expect(createHabitSpy).toHaveBeenCalledTimes(1);

    // const localHabits = JSON.parse(get(habitsKey) ?? '[]') as IHabit[];
    // expect(localHabits.length).toBe(1);
    // expect(localHabits[0].name).toBe(nameInputText);
    // expect(localHabits[0].description).toBe(descriptionInputText);

    assertHabitsFromStorage({
      name: nameInputText,
      description: descriptionInputText,
      completedDates: [],
      createdDate: currentDate,
      streakGoal: StreakGoal.daily,
    });
  });
});

export const fulFillHabitInputs = (name: string, description?: string) => {
  const nameInput = screen.getByPlaceholderText(/enter name/i);
  const descriptionInput = screen.getByPlaceholderText(/enter description/i);

  fireEvent.changeText(nameInput, name);
  fireEvent.changeText(descriptionInput, description ?? '');
};

const assertHabitsFromStorage = (habits: IHabit) => {
  let habitsKey = 'testHabits';
  const localHabits = JSON.parse(get(habitsKey) ?? '[]') as IHabit[];
  expect(localHabits.length).toBe(1);
  expect(localHabits[0].name).toBe(habits.name);
  expect(localHabits[0].description).toBe(habits.description);
  expect(localHabits[0].completedDates).toStrictEqual(habits.completedDates);
  expect(localHabits[0].streakGoal).toBe(habits.streakGoal);
  expect(localHabits[0].createdDate).toBe(habits.createdDate.toISOString());
};
