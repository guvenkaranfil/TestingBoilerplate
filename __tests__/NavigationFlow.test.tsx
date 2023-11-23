import React from 'react';
import {render, screen} from '@testing-library/react-native';
import Navigation from '../app/navigation';

describe('NavigationFlow', () => {
  test('renders login screen if user is not signed in', () => {
    render(<Navigation isLoggedIn={false} />);

    expect(screen.getByText('Login')).toBeOnTheScreen();
    expect(screen.queryByText('Home')).toBeNull();
  });

  test('renders home screen if user is signed in', () => {
    render(<Navigation isLoggedIn={true} />);

    expect(screen.getByText('Home')).toBeOnTheScreen();
    expect(screen.queryByText('Login')).not.toBeOnTheScreen();
  });
});
