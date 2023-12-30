import React from 'react';
import {render, screen, waitFor} from '@testing-library/react-native';
import PhoneBook from '../app/tabs/phoneBook';

import * as api from '../app/api';
import {TestHelpers} from './PhoneBookList.test';

describe('PhoneBook page', () => {
  test('should fetch phone book data with showing loading', async () => {
    const names = [
      {name: 'user1', phoneNumber: '0555 555 5555'},
      {name: 'user2', phoneNumber: '0444 444 44444'},
    ];
    const mockListData = jest
      .spyOn(api, 'getList')
      .mockResolvedValue({data: names});
    render(<PhoneBook />);

    await waitFor(() => {
      expect(screen.getByTestId('loader')).toBeOnTheScreen();
    });
    await waitFor(() => {
      expect(mockListData).toBeCalledTimes(1);
    });
    await waitFor(() => {
      expect(screen.queryByTestId('loader')).not.toBeOnTheScreen();
      TestHelpers.expectMatchesText(names);
    });
  });
});
