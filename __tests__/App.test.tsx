import React from 'react';
import {render} from '@testing-library/react-native';
import App from '../App';

describe('NavigationFlow', () => {
  test('renders app.tsx correctly', () => {
    render(<App />);
  });
});
