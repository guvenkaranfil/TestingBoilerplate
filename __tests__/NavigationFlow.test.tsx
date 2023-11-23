import {View, Text} from 'react-native';
import React from 'react';
import {render, screen} from '@testing-library/react-native';

function NavigationFlowtest() {
  return (
    <View>
      <Text>NavigationFlowtest</Text>
    </View>
  );
}

describe('NavigationFlow', () => {
  test('NavigationFlowtest renders correctly', () => {
    render(<NavigationFlowtest />);

    expect(screen.getByText('NavigationFlowtest')).toBeOnTheScreen();
  });
});
