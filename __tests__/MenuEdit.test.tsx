import React from 'react';
import {act, render, screen, userEvent} from '../.jest/helper/testUtils';

import MenuEdit, {IMenuItem} from '../app/tabs/menuEdit';
import {MOCK_MENU_ITEMS} from '../__mocks__';
import store from '../app/store';
import {setMenus} from '../app/store/userSlice';

describe('Menu Edit Page', () => {
  beforeEach(() => jest.useFakeTimers());
  afterEach(() => {
    jest.useRealTimers();

    act(() => {
      const sortedMenus = [...MOCK_MENU_ITEMS]?.sort((a, b) =>
        a.name.localeCompare(b.name),
      );
      store.dispatch(setMenus(sortedMenus));
    });
  });

  test('should not re-render list items unncessarily', async () => {
    const spyOnRenderItemCallback = jest.fn();
    const uncheckedItem1 = MOCK_MENU_ITEMS.filter(
      listItem => !listItem.isActive,
    )[0];
    const uncheckedItem2 = MOCK_MENU_ITEMS.filter(
      listItem => !listItem.isActive,
    )[1];

    const totalListItem = MOCK_MENU_ITEMS.length;

    render(
      <MenuEdit
        menus={MOCK_MENU_ITEMS}
        onRenderItemCallback={spyOnRenderItemCallback}
      />,
    );
    expect(spyOnRenderItemCallback).toHaveBeenCalledTimes(totalListItem);

    const unCheckedItems = screen.queryAllByText(unCheckItemLabel);
    await MenuEditTestHelpers.checkItem(uncheckedItem1);
    await MenuEditTestHelpers.checkItem(uncheckedItem2);

    expect(screen.queryAllByText(unCheckItemLabel).length).toEqual(
      unCheckedItems.length - 2,
    );

    expect(spyOnRenderItemCallback).toHaveBeenCalledTimes(totalListItem + 2);
  });
});

const unCheckItemLabel = /❌/i;
class MenuEditTestHelpers {
  static checkItem = async (item?: IMenuItem) => {
    const uncheckedItem =
      item ?? MOCK_MENU_ITEMS.filter(listItem => !listItem.isActive)[0];

    const unCheckedItemElement = screen.getByTestId(uncheckedItem.id);
    expect(unCheckedItemElement).toBeOnTheScreen();

    await userEvent.press(unCheckedItemElement);

    const uncheckedItemChecbox = screen.getByTestId(
      `checked-${uncheckedItem.id}`,
    );
    expect(uncheckedItemChecbox).toBeOnTheScreen();
  };
}
