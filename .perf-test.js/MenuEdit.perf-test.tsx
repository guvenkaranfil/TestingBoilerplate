import React from 'react';
import {measurePerformance} from 'reassure';

import MenuEdit from '../app/tabs/menuEdit';
import AllProviders from '../.jest/helper/AllProviders';

import {MOCK_MENU_ITEMS} from '../__tests__/MenuEdit.test';

test('MenuEdit Component Performance', async () => {
  await measurePerformance(<MenuEdit menus={MOCK_MENU_ITEMS} />, {
    wrapper: AllProviders,
  });
});
