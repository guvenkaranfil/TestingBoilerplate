import React from 'react';

import {Provider} from 'react-redux';
import store from './app/store';
import MenuEdit from './app/tabs/menuEdit';
import {SafeAreaView} from 'react-native';

export default function App() {
  return (
    <Provider store={store}>
      <SafeAreaView style={{flex: 1}}>
        <MenuEdit />
      </SafeAreaView>
    </Provider>
  );
}
