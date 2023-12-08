import React from 'react';
import {render, screen, userEvent} from '../.jest/helper/testUtils';
import Navigation from '../app/navigation';
import store from '../app/store';
import {setUser} from '../app/store/userSlice';
import {act} from 'react-test-renderer';

describe('NavigationFlow', () => {
  beforeAll(() => {
    jest.useFakeTimers();
  });

  afterEach(() => {
    act(() => {
      store.dispatch(setUser({token: undefined}));
    });
  });

  test('renders login screen if user is not signed in', () => {
    store.dispatch(setUser({token: undefined}));
    render(<Navigation />);

    expect(screen.getByText('Login')).toBeOnTheScreen();
    expect(screen.queryByText('Home')).toBeNull();
  });

  test('renders home screen if user is signed in', () => {
    store.dispatch(setUser({token: 'token'}));
    render(<Navigation />);

    expect(screen.getByText('Home')).toBeOnTheScreen();
    expect(screen.queryByText('Login')).not.toBeOnTheScreen();
  });

  test('should render home page after successfull login', async () => {
    render(<Navigation />);

    expect(screen.getByText('Login')).toBeOnTheScreen();
    await userEvent.press(screen.getByText('Go to Home'));
    expect(screen.queryByText('Login')).not.toBeOnTheScreen();
    expect(screen.getByText('Home')).toBeOnTheScreen();
  });

  test('should render login page after successfull login and can log out', async () => {
    render(<Navigation />);

    expect(screen.getByText('Login')).toBeOnTheScreen();

    await userEvent.press(screen.getByText('Go to Home'));
    expect(screen.queryByText('Login')).not.toBeOnTheScreen();
    expect(screen.getByText('Home')).toBeOnTheScreen();

    await userEvent.press(screen.getByText('Logout'));
    expect(screen.getByText('Login')).toBeOnTheScreen();
    expect(screen.queryByText('Home')).not.toBeOnTheScreen();
  });
});
