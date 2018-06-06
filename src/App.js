import React from 'react';
import { createStore, compose } from 'redux';
import { Provider } from 'react-redux';
import { persistStore, autoRehydrate } from 'redux-persist';
import { AsyncStorage } from 'react-native';

import reducers from './reducers';
import AppWithNavigationState from './navigators/AppNavigator';

const configureStore = () => {
  const store = createStore(
    reducers,
    undefined,
    compose(autoRehydrate())
  );

  if (module.hot) {
    module.hot.accept(() => {
      const nextReducers = require('./reducers');
      store.replaceReducer(combineReducers(nextReducers));
    });
  }

  persistStore(store, { storage: AsyncStorage });

  return store;
};

export default () => (
  <Provider store={configureStore()}>
    <AppWithNavigationState />
  </Provider>
);
