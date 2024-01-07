import React from 'react';
import {render, screen, userEvent} from '../.jest/helper/testUtils';

import MenuEdit, {IMenuItem} from '../app/tabs/menuEdit';

describe('Menu Edit Page', () => {
  beforeEach(() => jest.useFakeTimers());
  afterEach(() => jest.useRealTimers());

  test('should render MenuEdit', () => {
    render(<MenuEdit menus={MOCK_MENU_ITEMS} />);
  });

  test('should render all menu names in a sorted way', () => {
    const sortedMenus = [...MOCK_MENU_ITEMS].sort((a, b) =>
      a.name.localeCompare(b.name),
    );
    render(<MenuEdit menus={MOCK_MENU_ITEMS} />);

    const allItemNames = screen.queryAllByText(/item/i);

    expect(allItemNames).toHaveLength(sortedMenus.length);
    sortedMenus.map((item, index) => {
      expect(allItemNames[index].props.children).toEqual(item.name);
    });
  });

  test('should render all checkboxes checked/unchecked state', () => {
    const checkedItems = MOCK_MENU_ITEMS.filter(item => item.isActive);
    const uncheckedItems = MOCK_MENU_ITEMS.filter(item => !item.isActive);
    render(<MenuEdit menus={MOCK_MENU_ITEMS} />);

    MenuEditTestHelpers.expectCheckedBoxes(checkedItems);
    MenuEditTestHelpers.expecUncheckedBoxes(uncheckedItems);
  });

  test('should mark as checked when press unchecked item', async () => {
    const checkedItems = MOCK_MENU_ITEMS.filter(item => item.isActive);
    const uncheckedItem = MOCK_MENU_ITEMS.filter(item => !item.isActive)[0];
    render(<MenuEdit menus={MOCK_MENU_ITEMS} />);

    MenuEditTestHelpers.expectCheckedBoxes(checkedItems);

    const unCheckedItemElement = screen.getByTestId(uncheckedItem.id);
    expect(unCheckedItemElement).toBeOnTheScreen();

    await userEvent.press(unCheckedItemElement);
    MenuEditTestHelpers.expectCheckedBoxes(
      checkedItems,
      checkedItems.length + 1,
    );
    const uncheckedItemChecbox = screen.getByTestId(
      `checked-${uncheckedItem.id}`,
    );
    expect(uncheckedItemChecbox).toBeOnTheScreen();
  });
});

class MenuEditTestHelpers {
  static expectCheckedBoxes = (
    checkedItems: IMenuItem[],
    expectedCount?: number,
  ) => {
    const checkedBoxes = screen.queryAllByText(/✅/i);
    expect(checkedBoxes).toHaveLength(expectedCount ?? checkedItems.length);
  };

  static expecUncheckedBoxes = (uncheckedItems: IMenuItem[]) => {
    const unCheckedBoxes = screen.queryAllByText(/❌/i);
    expect(unCheckedBoxes).toHaveLength(uncheckedItems.length);
  };
}

export const MOCK_MENU_ITEMS: IMenuItem[] = [
  {
    id: '7a379770-0524-4ab2-91a9-fcd9fe119999',
    name: 'a-Item 1',
    isActive: true,
  },
  {
    id: '7a379770-0524-4ab2-91a9-fcd9fe120121',
    name: 'f-Item 2',
    isActive: false,
  },
  {
    id: '7a379770-0524-4ab2-91a9-fcd9fe132131',
    name: 'e-Item 3',
    isActive: true,
  },
  {
    id: '7a379770-0524-4ab2-91a9-fcd9fe1191231',
    name: 'b-Item 4',
    isActive: true,
  },
  {
    id: '7a379770-0524-4ab2-91a9-fcd9fe141901',
    name: 'g-Item 5',
    isActive: true,
  },
  {
    id: '7a379770-0524-4ab2-91a9-fcd9fe119912',
    name: 'p-Item 6',
    isActive: true,
  },
  {
    id: '7a379770-0524-4ab2-91a9-fcd9fe14324',
    name: 'Item 7',
    isActive: true,
  },
  {
    id: '7a379770-0524-4ab2-91a9-fcd9fe11943',
    name: 'd-Item 8',
    isActive: false,
  },
];
