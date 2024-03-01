import React from 'react';

import Navigation from './app/navigation';
import {Provider} from 'react-redux';
import store from './app/store';
import Toast from 'react-native-toast-message';

export default function App() {
  return (
    <Provider store={store}>
      <Navigation />
    </Provider>
  );
}
