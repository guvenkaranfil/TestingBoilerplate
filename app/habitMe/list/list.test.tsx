import React from 'react';
import {fireEvent, render, screen} from '../../../.jest/helper/testUtils';
import Navigation from '../../navigation';
import {clearAllStorage} from '../../storage/localStorage';
import {setGlobalState} from '../../storage/globalStorage';

jest.mock('@react-navigation/native', () => {
  const actualNav = jest.requireActual('@react-navigation/native');
  return {
    ...actualNav,
  };
});

const nameInputText = 'Test Habit Name';
const descriptionInputText = 'Test Habit Description';
describe('Habit List', () => {
  beforeAll(clearAllStorage);
  afterAll(clearAllStorage);

  test('should create a habit and render on the list', async () => {
    render(<Navigation />);

    fireEvent.press(screen.getByText('Create'));

    const nameInput = screen.getByPlaceholderText(/enter name/i);
    const descriptionInput = screen.getByPlaceholderText(/enter description/i);
    const saveButton = await screen.findByText(/habitme/i);
    expect(saveButton).toBeOnTheScreen();

    fireEvent.changeText(nameInput, nameInputText);
    fireEvent.changeText(descriptionInput, descriptionInputText);
    fireEvent.press(saveButton);

    expect(await screen.findByText(nameInputText)).toBeOnTheScreen();

    screen.unmount();

    setGlobalState('habits/setHabits', {habits: []});
    render(<Navigation />);
    expect(await screen.findByText(nameInputText)).toBeOnTheScreen();
  });
});
