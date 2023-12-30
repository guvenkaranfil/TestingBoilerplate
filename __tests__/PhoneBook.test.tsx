import React from 'react';
import {render} from '@testing-library/react-native';
import PhoneBook from '../app/tabs/phoneBook';

describe('PhoneBook page', () => {
  test('should render PhoneBook component correctly', async () => {
    render(<PhoneBook />);
  });
});
