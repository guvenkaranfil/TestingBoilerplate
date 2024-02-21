import {jest} from '@jest/globals';

import '@testing-library/react-native/extend-expect';

// Silence the warning: Animated: `useNativeDriver` is not supported because the native animated module is missing
jest.mock('react-native/Libraries/Animated/NativeAnimatedHelper');

jest.mock('@react-navigation/native', () => {
  const actualNav = jest.requireActual('@react-navigation/native');
  return {
    ...actualNav,
    useNavigation: () => ({
      dispatch: jest.fn(),
      setOptions: jest.fn(),
      goBack: jest.fn(),
    }),
    useRoute: jest.fn(),
    useIsFocused: jest.fn(),
  };
});
