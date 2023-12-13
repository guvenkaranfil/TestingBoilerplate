import React from 'react';
import {measurePerformance} from 'reassure';

import Navigation from '../app/navigation';
import AllProviders from '../.jest/helper/AllProviders';

test('Navigation Component Performance', async () => {
  await measurePerformance(<Navigation />, {wrapper: AllProviders});
});
