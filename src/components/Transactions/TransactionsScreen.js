import React from 'react';
import { connect } from 'react-redux';
import { ScrollView, View, StyleSheet, Dimensions, RefreshControl } from 'react-native';

import { HEADER_HEIGHT, TABBAR_HEIGHT } from '../../constants';
import TransactionsTable from './TransactionsTable';
import { getLogs } from '../../api';

const { height: windowHeight } = Dimensions.get('window');

const styles = StyleSheet.create({
  scrollView: {
    height: windowHeight - HEADER_HEIGHT - TABBAR_HEIGHT
  }
});

class TransactionsScreen extends React.Component {
  constructor() {
    super();
    this.state = {
      refreshing: false
    };
  }

  _onRefresh = async () => {
    this.setState({ refreshing: true });
    await getLogs(this.props.dispatch, this.props.authToken);
    this.setState({ refreshing: false });
  }

  render() {
    const { refreshing } = this.state;

    return (
      <View>
        <ScrollView
          style={styles.scrollView}
          refreshControl={<RefreshControl refreshing={refreshing} onRefresh={this._onRefresh} />}
        >
          <TransactionsTable />
        </ScrollView>
      </View>
    );
  }
}

const mapStateToProps = state => ({
  authToken: state.auth.token
});

export default connect(mapStateToProps)(TransactionsScreen);
