import React, { PropTypes } from 'react';
import { connect } from 'react-redux';
import { addNavigationHelpers, StackNavigator } from 'react-navigation';

import LoginScreen from '../components/LoginScreen';
import MainNavigator from './MainNavigator';

export const AppNavigator = StackNavigator({
  Login: { screen: LoginScreen },
  Secured: { screen: MainNavigator },
}, {
  navigationOptions: { header: null }
});

const AppWithNavigationState = ({ dispatch, nav, auth }) => (
  <AppNavigator
    navigation={addNavigationHelpers({ dispatch, state: nav })}
    screenProps={{ auth }}
  />
);

AppWithNavigationState.propTypes = {
  dispatch: PropTypes.func.isRequired,
  nav: PropTypes.object.isRequired,
  auth: PropTypes.object.isRequired
};

const mapStateToProps = state => ({
  dispatch: state.dispatch,
  nav: state.nav,
  auth: state.auth
});

export default connect(mapStateToProps)(AppWithNavigationState);
