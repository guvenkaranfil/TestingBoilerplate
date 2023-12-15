import React from 'react';
import {act, render, screen, userEvent} from '../.jest/helper/testUtils';
import List from '../app/components/List';

describe('List component with search functionality use cases', () => {
  test('should List component render correctly', () => {
    render(<List />);
  });

  test('should be able to type to input', async () => {
    render(<List />);

    const input = screen.getByPlaceholderText('Search Name');
    expect(input.props.value).toBe('');

    await userEvent.type(input, 'test');
    expect(input.props.value).toBe('test');

    await userEvent.clear(input);
    expect(input.props.value).toBe('');

    await userEvent.type(input, 'test with clear');
    expect(input.props.value).toBe('test with clear');
  });

  test('should be shown a message on empty or undefined list data', () => {
    render(<List data={undefined} />);

    expect(screen.getByText('No Data')).toBeTruthy();

    screen.rerender(<List data={[]} />);
    expect(screen.getByText('No Data')).toBeTruthy();
  });

  test('should show loader while data is loading and hide when is finished', () => {
    render(<List data={undefined} isLoading={true} />);

    expect(screen.getByTestId('loader')).toBeOnTheScreen();

    screen.rerender(<List data={undefined} isLoading={false} />);
    expect(screen.queryByTestId('loader')).not.toBeOnTheScreen();
  });

  test('should show data on non-empty data list with handling loading', () => {
    const names = [{name: 'test'}, {name: 'test2'}];
    render(<List data={names} isLoading={true} />);

    expect(screen.getByTestId('loader')).toBeOnTheScreen();
    expect(screen.queryByText(/test/i)).not.toBeOnTheScreen();

    screen.rerender(<List data={names} isLoading={false} />);
    expect(screen.queryByTestId('loader')).not.toBeOnTheScreen();

    TestHelpers.expectMatcheses(names);
  });

  test('should user be able to refresh data with pull-to-refresh action', async () => {
    const names = [{name: 'test'}, {name: 'test2'}];
    const handleRefresh = jest.fn();
    render(
      <List
        data={names}
        isLoading={false}
        onRefresh={() => {
          handleRefresh();
          names.push({name: 'test3'});
        }}
      />,
    );

    TestHelpers.pullToRefresh();

    expect(handleRefresh).toHaveBeenCalledTimes(1);

    screen.rerender(<List data={names} isLoading={false} />);

    TestHelpers.expectMatcheses(names);
  });
});

test('should show loader on load more and hide it with rendering with more items if data has been updated successfully', async () => {
  const names = [{name: 'test'}, {name: 'test2'}];
  const handleLoadMore = jest.fn();
  render(
    <List
      data={names}
      onEndReached={() => {
        handleLoadMore();
        names.push({name: 'test3'});
      }}
    />,
  );

  const list = screen.getByTestId('list');
  await userEvent.scrollTo(list, {
    y: 1000,
    momentumY: 200,
  });

  await act(() => {
    list.props.onEndReached();
  });
  screen.rerender(<List data={names} isLoading={false} isFetching={true} />);

  expect(handleLoadMore).toHaveBeenCalledTimes(1);
  expect(screen.getByTestId('loadMore')).toBeOnTheScreen();

  screen.rerender(<List data={names} isLoading={false} />);
  TestHelpers.expectMatcheses(names);

  screen.rerender(<List data={names} isLoading={false} isFetching={false} />);

  expect(handleLoadMore).toHaveBeenCalledTimes(1);
  expect(screen.queryByTestId('loadMore')).not.toBeOnTheScreen();
});

class TestHelpers {
  static async pullToRefresh() {
    const list = screen.getByTestId('list');
    const {refreshControl} = list.props;

    await act(async () => {
      refreshControl.props.onRefresh();
    });
  }

  static async expectMatcheses(names: Array<{name: string}>) {
    names.forEach(({name}) => {
      const textElement = screen.getByText(name);
      expect(textElement.props.children).toEqual(name);
    });
    expect(screen.queryAllByText(/test/i)).toHaveLength(names.length);
  }
}
