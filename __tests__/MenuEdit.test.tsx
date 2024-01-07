import React from 'react';
import {render} from '../.jest/helper/testUtils';

import MenuEdit from '../app/tabs/MenuEdit';

describe('Menu Edit Page', () => {
  test('should render MenuEdit', () => {
    render(<MenuEdit />);
  });
});
