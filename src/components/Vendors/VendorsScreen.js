import React from 'react';
import { connect } from 'react-redux';
import { ScrollView, View, StyleSheet, Dimensions, RefreshControl } from 'react-native';

import { HEADER_HEIGHT, TABBAR_HEIGHT } from '../../constants';
import VendorsTable from './VendorsTable';
import VendorModal from './VendorModal';
import VendorSendMessageModal from './VendorSendMessageModal';
import PaymentModal from './PaymentModal';
import PaymentFinalModal from './PaymentFinalModal';
import { getVendors } from '../../api';

const { height: windowHeight } = Dimensions.get('window');

const styles = StyleSheet.create({
  scrollView: {
    height: windowHeight - HEADER_HEIGHT - TABBAR_HEIGHT
  }
});

class VendorsScreen extends React.Component {
  constructor() {
    super();
    this.state = {
      refreshing: false
    };
  }

  _onRefresh = async () => {
    this.setState({ refreshing: true });
    await getVendors(this.props.dispatch, this.props.authToken);
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
          <VendorsTable />
        </ScrollView>
        <VendorModal />
        <VendorSendMessageModal />
        <PaymentModal />
        <PaymentFinalModal />
      </View>
    );
  }
}

const mapStateToProps = state => ({
  authToken: state.auth.token
});

export default connect(mapStateToProps)(VendorsScreen);
