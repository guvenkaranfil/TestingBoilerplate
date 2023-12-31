import React from 'react';
import {act, render, screen, userEvent} from '../.jest/helper/testUtils';
import PhoneBookList, {
  PhoneBookUser,
} from '../app/tabs/phoneBook/PhoneBookList';

describe('PhoneBook List with Search functionality', () => {
  test('should component render correctly', () => {
    render(<PhoneBookList />);
  });

  test('should be able to type to input', async () => {
    render(<PhoneBookList />);

    const input = screen.getByPlaceholderText('Search Name');
    expect(input.props.value).toBe('');

    await userEvent.type(input, 'test');
    expect(input.props.value).toBe('test');

    await userEvent.clear(input);
    expect(input.props.value).toBe('');

    await userEvent.type(input, 'test with clear');
    expect(input.props.value).toBe('test with clear');
  });

  test('should show a message on empty list', () => {
    render(<PhoneBookList data={undefined} />);

    expect(screen.getByText('No Data')).toBeTruthy();

    screen.rerender(<PhoneBookList data={[]} />);
    expect(screen.getByText('No Data')).toBeTruthy();
  });

  test('should show loader while data is loading and hide when is finished', () => {
    render(<PhoneBookList data={undefined} isLoading={true} />);

    expect(screen.getByTestId('loader')).toBeOnTheScreen();
    expect(screen.queryByText('No Data')).not.toBeOnTheScreen();

    screen.rerender(<PhoneBookList data={undefined} isLoading={false} />);
    expect(screen.queryByTestId('loader')).not.toBeOnTheScreen();
    expect(screen.getByText('No Data')).toBeOnTheScreen();
  });

  test('should show users on non-empty data list with handling loading', () => {
    const names = TestHelpers.makeMockData();
    render(<PhoneBookList data={names} isLoading={true} />);

    expect(screen.getByTestId('loader')).toBeOnTheScreen();
    expect(screen.queryByText(/user/i)).not.toBeOnTheScreen();

    screen.rerender(<PhoneBookList data={names} isLoading={false} />);
    expect(screen.queryByTestId('loader')).not.toBeOnTheScreen();

    TestHelpers.expectMatchesText(names);
  });

  test('should user be able to refresh data with pull-to-refresh action', async () => {
    const names = TestHelpers.makeMockData();
    const handleRefresh = jest.fn();
    render(
      <PhoneBookList
        data={names}
        isLoading={false}
        onRefresh={() => {
          handleRefresh();
          names.push({name: 'user3', phoneNumber: '0333 333 3333'});
        }}
      />,
    );

    TestHelpers.pullToRefresh();
    expect(handleRefresh).toHaveBeenCalledTimes(1);

    screen.rerender(<PhoneBookList data={names} isLoading={false} />);

    TestHelpers.expectMatchesText(names);
  });

  test('should show loader on load more and hide it with rendering with more items if data has been updated successfully', async () => {
    const names = TestHelpers.makeMockData();
    const handleLoadMore = jest.fn();
    render(
      <PhoneBookList
        isLoading={false}
        data={names}
        onEndReached={() => {
          handleLoadMore();
          names.push({name: 'user3', phoneNumber: '0333 333 3333'});
        }}
      />,
    );

    await TestHelpers.simulateLoadMore();
    screen.rerender(
      <PhoneBookList data={names} isLoading={false} isFetching={true} />,
    );

    expect(handleLoadMore).toHaveBeenCalledTimes(1);
    expect(screen.getByTestId('loadMore')).toBeOnTheScreen();

    screen.rerender(<PhoneBookList data={names} isLoading={false} />);
    TestHelpers.expectMatchesText(names);

    screen.rerender(
      <PhoneBookList data={names} isLoading={false} isFetching={false} />,
    );
    expect(handleLoadMore).toHaveBeenCalledTimes(1);
    expect(screen.queryByTestId('loadMore')).not.toBeOnTheScreen();
  });

  test('should filter list based on user search', async () => {
    const names = TestHelpers.makeMockData();
    render(<PhoneBookList isLoading={false} data={names} />);
    const input = screen.getByPlaceholderText('Search Name');
    await userEvent.type(input, 'user1');

    TestHelpers.expectMatchesText([names[0]]);

    await userEvent.clear(input);
    TestHelpers.expectMatchesText(names);
  });

  test('should component update the list after setting data', () => {
    const names = TestHelpers.makeMockData();
    render(<PhoneBookList isLoading={true} data={undefined} />);
    expect(screen.getByTestId('loader')).toBeOnTheScreen();

    screen.rerender(
      <PhoneBookList data={names} isLoading={false} isFetching={false} />,
    );

    TestHelpers.expectMatchesText(names);
  });
});

export class TestHelpers {
  static makeMockData(): PhoneBookUser[] {
    return [
      {name: 'user1', phoneNumber: '0555 555 5555'},
      {name: 'user2', phoneNumber: '0444 444 44444'},
    ];
  }

  static expectMatchesText(names: Array<PhoneBookUser>) {
    names.forEach(({name, phoneNumber}) => {
      const textElement = screen.getByText(name);
      expect(textElement.props.children).toEqual(name);

      const phoneElement = screen.getByText(phoneNumber);
      expect(phoneElement.props.children).toEqual(phoneNumber);
    });
    expect(screen.queryAllByText(/user/i)).toHaveLength(names.length);
    expect(screen.queryAllByText(/0/i)).toHaveLength(names.length);
  }

  static async pullToRefresh() {
    const list = screen.getByTestId('list');
    const {refreshControl} = list.props;

    await act(async () => {
      refreshControl.props.onRefresh();
    });
  }

  static async simulateLoadMore() {
    const list = screen.getByTestId('list');
    await userEvent.scrollTo(list, {
      y: 1000,
      momentumY: 200,
    });

    await act(() => {
      list.props.onEndReached();
    });
  }
}
