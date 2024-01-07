import React from 'react';
import {render, screen} from '../.jest/helper/testUtils';

import MenuEdit, {IMenuItem} from '../app/tabs/MenuEdit';

describe('Menu Edit Page', () => {
  test('should render MenuEdit', () => {
    render(<MenuEdit menus={MOCK_MENU_ITEMS} />);
  });
  test('should render all menu names', () => {
    render(<MenuEdit menus={MOCK_MENU_ITEMS} />);

    const allItemNames = screen.queryAllByText(/Item/i);

    expect(allItemNames).toHaveLength(8);
    MOCK_MENU_ITEMS.map((item, index) => {
      expect(allItemNames[index].props.children).toEqual(item.name);
    });
  });
});

const MOCK_MENU_ITEMS: IMenuItem[] = [
  {
    id: '7a379770-0524-4ab2-91a9-fcd9fe119999',
    name: 'Item 1',
    isActive: true,
  },
  {
    id: '7a379770-0524-4ab2-91a9-fcd9fe120121',
    name: 'Item 2',
    isActive: false,
  },
  {
    id: '7a379770-0524-4ab2-91a9-fcd9fe132131',
    name: 'Item 3',
    isActive: true,
  },
  {
    id: '7a379770-0524-4ab2-91a9-fcd9fe1191231',
    name: 'Item 4',
    isActive: true,
  },
  {
    id: '7a379770-0524-4ab2-91a9-fcd9fe141901',
    name: 'Item 5',
    isActive: true,
  },
  {
    id: '7a379770-0524-4ab2-91a9-fcd9fe119912',
    name: 'Item 6',
    isActive: true,
  },
  {
    id: '7a379770-0524-4ab2-91a9-fcd9fe14324',
    name: 'Item 7',
    isActive: true,
  },
  {
    id: '7a379770-0524-4ab2-91a9-fcd9fe11943',
    name: 'Item 8',
    isActive: false,
  },
];
