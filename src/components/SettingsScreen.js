import React, { PropTypes } from 'react';
import { connect } from 'react-redux';
import { View, Button } from 'react-native';

const SettingsScreen = ({ onPressLogout, onPressBack }) => (
  <View style={{ paddingTop: 30 }}>
    <Button onPress={onPressBack} title="Back" />
    <Button onPress={onPressLogout} title="Logout" />
  </View>
);

SettingsScreen.propTypes = {
  onPressLogout: PropTypes.func.isRequired,
  onPressBack: PropTypes.func.isRequired
};

const mapDispatchToProps = (dispatch) => ({
  onPressLogout: () => dispatch({ type: 'LOGOUT' }),
  onPressBack: () => dispatch({ type: 'MAIN_NAV_BACK' })
});

export default connect(null, mapDispatchToProps)(SettingsScreen);
