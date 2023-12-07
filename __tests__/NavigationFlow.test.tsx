import React from 'react';
import {render, screen} from '../.jest/helper/testUtils';
import Navigation from '../app/navigation';
import store from '../app/store';
import {setUser} from '../app/store/userSlice';

describe('NavigationFlow', () => {
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
});
