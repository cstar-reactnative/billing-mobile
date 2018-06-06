import React, { PropTypes } from 'react';
import { connect } from 'react-redux';
import {
  ScrollView,
  Text,
  TextInput,
  View,
  Button,
  StyleSheet
} from 'react-native';
import { API_BASE_URL } from 'react-native-dotenv';
import Spinner from 'react-native-loading-spinner-overlay';
import { alert } from '../utils';

import Header from './Header';

class LoginScreen extends React.Component {
  constructor() {
    super();
    this.state = {
      email: '',
      password: ''
    };
  }

  render() {
    const { auth, spinnerVisible, onLoginPress } = this.props;

    return (
      <View>
        <Header screenProps={{ auth }} />
        <ScrollView style={{ padding: 20 }}>
          <Text style={{ fontSize: 17, marginTop: 20 }}>
            Enter your login information below to log in.
          </Text>
          <View style={{ margin: 20 }}>
            <TextInput
              keyboardType="email-address" style={styles.textInput} placeholder="E-Mail Address"
              onChangeText={email => this.setState({ email })}
              autoCorrect={false}
            />
            <TextInput
              secureTextEntry style={styles.textInput} placeholder="Password"
              onChangeText={password => this.setState({ password })}
            />
          </View>
          <Button onPress={() => onLoginPress(this.state)} title="Log In" />
          <Spinner visible={spinnerVisible} />
        </ScrollView>
      </View>
    );
  }
}

const mapStateToProps = state => ({
  auth: state.auth,
  spinnerVisible: state.workInProgress
});

const mapDispatchToProps = (dispatch, ownProps) => ({
  onLoginPress: async (ownState) => {
    dispatch({ type: 'SET_WIP_INDICATOR' });
    try {
      const response = await fetch(`${API_BASE_URL}/login`, {
        method: 'POST',
        headers: {
          'Accept': 'application/json',
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({
          email: ownState.email,
          password: ownState.password
        })
      });
      const resBody = await response.json();
      if (resBody.success === 'true') {
        dispatch({ type: 'LOGIN', user: resBody.user, token: resBody.token });
      } else {
        alert('Error', 'Invalid login credentials!');
      }
    } catch (err) {
      console.log(err);
      alert('Error', 'An error occured while processing your request!');
    }
    dispatch({ type: 'CLEAR_WIP_INDICATOR' });
  }
});

export default connect(mapStateToProps, mapDispatchToProps)(LoginScreen);

const styles = StyleSheet.create({
  textInput: {
    borderColor: 'grey',
    borderWidth: 1,
    height: 44,
    marginTop: 10,
    padding: 13
  }
});
