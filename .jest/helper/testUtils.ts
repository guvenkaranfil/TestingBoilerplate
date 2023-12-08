import {NavigationContainer} from '@react-navigation/native';
import React from 'react';
import {
  RenderOptions,
  render as rtlRender,
} from '@testing-library/react-native';
import AllProviders from './AllProviders';

function customRender(ui: React.ReactElement, options?: RenderOptions) {
  return rtlRender(ui, {wrapper: AllProviders, ...options});
}

// re-export everything
export * from '@testing-library/react-native';

// override render method
export {customRender as render};
