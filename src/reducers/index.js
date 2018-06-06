import { combineReducers } from 'redux';
import { NavigationActions } from 'react-navigation';
import { AppNavigator } from '../navigators/AppNavigator';

import * as customerReducers from './customers';
import * as vendorReducers from './vendors';
import * as logReducers from './logs';
import * as productReducers from './products';

// React Navigation state
const initialNavState = AppNavigator.router.getStateForAction(AppNavigator.router.getActionForPathAndParams('Login'));
const nav = (state = initialNavState, action) => {
  switch (action.type) {
    case 'MAIN_NAV_BACK':
      return AppNavigator.router.getStateForAction(NavigationActions.back(), state);
    case 'LOGIN':
      return AppNavigator.router.getStateForAction(NavigationActions.navigate({ routeName: 'Secured' }), state);
    case 'LOGOUT':
      return initialNavState;
    case 'GOTO_SETTINGS':
      return AppNavigator.router.getStateForAction(NavigationActions.navigate({ routeName: 'Settings' }), state);
    default:
      return state;
  }
};

// WIP (Work In Progress) indicator
const workInProgress = (state = false, action) => {
  switch (action.type) {
    case 'SET_WIP_INDICATOR':
      return true;
    case 'CLEAR_WIP_INDICATOR':
      return false;
    default:
      return state;
  }
};

// Authentication state
const initialAuthState = {
  isLoggedIn: false,
  user: {},
  token: null
};
const auth = (state = initialAuthState, action) => {
  switch (action.type) {
    case 'LOGIN':
      return { ...state, isLoggedIn: true, user: action.user, token: action.token };
    case 'LOGOUT':
      return initialAuthState;
    default:
      return state;
  }
};

// Custom tab bar screen state
const tabbar = (state = { page: 'Customers' }, action) => {
  switch (action.type) {
    case 'SET_TAB':
      return { ...state, page: action.tab };
    default:
      return state;
  }
};

export default combineReducers({
  nav,
  workInProgress,
  auth,
  tabbar,
  ...customerReducers,
  ...vendorReducers,
  ...logReducers,
  ...productReducers,
});
