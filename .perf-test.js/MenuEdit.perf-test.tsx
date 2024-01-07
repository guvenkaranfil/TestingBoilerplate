import React from 'react';
import {measurePerformance} from 'reassure';

import MenuEdit from '../app/tabs/menuEdit';
import AllProviders from '../.jest/helper/AllProviders';

import {MOCK_MENU_ITEMS} from '../__tests__/MenuEdit.test';
import {fireEvent, screen} from '@testing-library/react-native';

test('MenuEdit Component Performance', async () => {
  const scenario = async (componentScreen: typeof screen) => {
    const checkedItem = MOCK_MENU_ITEMS.filter(item => item.isActive)[0];
    const checkedItemElement = componentScreen.getByTestId(checkedItem.id);

    await fireEvent.press(checkedItemElement);
  };

  await measurePerformance(<MenuEdit menus={MOCK_MENU_ITEMS} />, {
    scenario,
    wrapper: AllProviders,
  });
});
