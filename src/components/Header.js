import React from 'react';
import {
  StyleSheet,
  View,
  StatusBar,
  Image,
  TouchableOpacity
} from 'react-native';

const styles = StyleSheet.create({
  container: {
    alignItems: 'center',
    backgroundColor: '#4a4a4a',
    height: 88,
    justifyContent: 'center',
    paddingTop: 10
  },
  cogButton: {
    position: 'absolute',
    right: 8,
    top: 20
  }
});

const Header = ({ screenProps, navigation }) => {
  const cogButton = screenProps.auth.isLoggedIn
    ? <TouchableOpacity style={styles.cogButton} onPress={() => navigation.dispatch({ type: 'GOTO_SETTINGS' })}>
        <Image source={require('../assets/images/cog.png')} />
      </TouchableOpacity>
    : null;

  return (
    <View style={styles.container}>
      <StatusBar barStyle="light-content" />
      <Image source={require('../assets/images/logo-header.png')} />
      {cogButton}
    </View>
  );
};

export default Header;
