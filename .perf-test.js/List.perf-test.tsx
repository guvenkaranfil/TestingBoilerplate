import React from 'react';
import {measurePerformance} from 'reassure';
import {screen, userEvent} from '../.jest/helper/testUtils';

import List from '../app/components/List';
import AllProviders from '../.jest/helper/AllProviders';

test('List Component Performance', async () => {
  const scenario = async () => {
    const input = screen.getByPlaceholderText('Search Name');
    await userEvent.type(input, 'test');
  };

  await measurePerformance(<List />, {
    wrapper: AllProviders,
    scenario: scenario,
  });
});
